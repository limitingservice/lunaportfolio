/**
 * FaceTracker — MediaPipe Face Landmarker wrapper
 *
 * Dual-mode operation:
 *   DETECTION: Lightweight — returns bounding box, confidence, guidance cues
 *   TRACKING:  Full — returns 478 landmarks, head pose, IPD, anchor points
 *
 * Both modes use the same FaceLandmarker instance, but the detection phase
 * only processes a subset of the data for speed.
 */

import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

// Key landmark indices from the 478-point MediaPipe Face Mesh
const LANDMARKS = {
    NOSE_BRIDGE: 6,
    NOSE_TIP: 1,
    LEFT_EYE_INNER: 133,
    LEFT_EYE_OUTER: 33,
    LEFT_EYE_CENTER: 468,
    RIGHT_EYE_INNER: 362,
    RIGHT_EYE_OUTER: 263,
    RIGHT_EYE_CENTER: 473,
    LEFT_EAR: 234,
    RIGHT_EAR: 454,
    CHIN: 152,
    FOREHEAD: 10,
    LEFT_TEMPLE: 127,
    RIGHT_TEMPLE: 356,
    LEFT_CHEEK: 234,
    RIGHT_CHEEK: 454,
};

export class FaceTracker {
    constructor() {
        this.faceLandmarker = null;
        this.lastFrameTime = -1;
        this.fps = 0;
        this.frameCount = 0;
        this.fpsInterval = null;
    }

    async initialize() {
        try {
            const vision = await FilesetResolver.forVisionTasks(
                'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
            );

            this.faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath:
                        'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
                    delegate: 'GPU',
                },
                outputFaceBlendshapes: false,
                outputFacialTransformationMatrixes: true,
                runningMode: 'VIDEO',
                numFaces: 1,
            });

            this.fpsInterval = setInterval(() => {
                this.fps = this.frameCount;
                this.frameCount = 0;
            }, 1000);

            return true;
        } catch (err) {
            console.error('Failed to initialize FaceLandmarker:', err);
            return false;
        }
    }

    /**
     * DETECTION MODE — lightweight processing for Find Face phase.
     * Returns: confidence, bounding box, center, guidance cues.
     */
    detectFace(videoElement) {
        if (!this.faceLandmarker || !videoElement) return null;

        const now = performance.now();
        if (now === this.lastFrameTime) return null;
        this.lastFrameTime = now;

        try {
            const results = this.faceLandmarker.detectForVideo(videoElement, now);
            this.frameCount++;

            if (!results.faceLandmarks || results.faceLandmarks.length === 0) {
                return { detected: false, confidence: 0 };
            }

            const landmarks = results.faceLandmarks[0];
            return this._computeDetectionData(landmarks, videoElement);
        } catch (err) {
            return { detected: false, confidence: 0 };
        }
    }

    /**
     * TRACKING MODE — full landmark processing for try-on phase.
     * Returns: all landmarks, head pose, IPD, anchor, etc.
     */
    trackFace(videoElement) {
        if (!this.faceLandmarker || !videoElement) return null;

        const now = performance.now();
        if (now === this.lastFrameTime) return null;
        this.lastFrameTime = now;

        try {
            const results = this.faceLandmarker.detectForVideo(videoElement, now);
            this.frameCount++;

            if (!results.faceLandmarks || results.faceLandmarks.length === 0) {
                return null;
            }

            const landmarks = results.faceLandmarks[0];
            const transformMatrix = results.facialTransformationMatrixes?.[0];
            return this._computeTrackingData(landmarks, transformMatrix, videoElement);
        } catch (err) {
            return null;
        }
    }

    /**
     * Lightweight detection data — for FIND_FACE state
     */
    _computeDetectionData(landmarks, videoElement) {
        const w = videoElement.videoWidth;
        const h = videoElement.videoHeight;

        // Bounding box from key points
        let minX = 1, maxX = 0, minY = 1, maxY = 0;
        for (const lm of landmarks) {
            if (lm.x < minX) minX = lm.x;
            if (lm.x > maxX) maxX = lm.x;
            if (lm.y < minY) minY = lm.y;
            if (lm.y > maxY) maxY = lm.y;
        }

        const bboxWidth = maxX - minX;
        const bboxHeight = maxY - minY;
        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;

        // Face confidence — based on landmark spread and face size
        // MediaPipe doesn't give a direct confidence score for VIDEO mode,
        // so we estimate it from the landmark distribution
        const leftEye = landmarks[LANDMARKS.LEFT_EYE_OUTER];
        const rightEye = landmarks[LANDMARKS.RIGHT_EYE_OUTER];
        const noseBridge = landmarks[LANDMARKS.NOSE_BRIDGE];
        const chin = landmarks[LANDMARKS.CHIN];
        const forehead = landmarks[LANDMARKS.FOREHEAD];

        // Check IPD — if eyes are too close or too far, face is likely not well-detected
        const ipd = Math.sqrt(
            (rightEye.x - leftEye.x) ** 2 +
            (rightEye.y - leftEye.y) ** 2
        );

        // Face symmetry — how centered the nose is between the eyes
        const eyeMidX = (leftEye.x + rightEye.x) / 2;
        const noseOffset = Math.abs(noseBridge.x - eyeMidX);
        const symmetry = 1 - Math.min(noseOffset / ipd, 1);

        // Confidence: combines face size, symmetry, and proportions
        // Higher confidence = face is well-centered, right size, frontal
        const sizeScore = Math.min(bboxWidth / 0.3, 1); // Good if face is ~30% of frame
        const confidence = Math.min(
            (sizeScore * 0.4 + symmetry * 0.6) * 1.1,
            1.0
        );

        // Yaw estimation (for "face forward" guidance)
        const yaw = Math.atan2(
            rightEye.z - leftEye.z,
            rightEye.x - leftEye.x
        );

        // Guidance cues
        let guidance = 'center'; // default
        if (bboxWidth > 0.65) guidance = 'too_close';
        else if (bboxWidth < 0.15) guidance = 'too_far';
        else if (Math.abs(centerX - 0.5) > 0.18) guidance = 'off_center';
        else if (Math.abs(yaw) > 0.45) guidance = 'angle';
        else if (confidence < 0.5) guidance = 'no_face';
        else guidance = 'centering';

        return {
            detected: true,
            confidence,
            centerX,
            centerY,
            bboxWidth,
            bboxHeight,
            yaw,
            guidance,
            fps: this.fps,
        };
    }

    /**
     * Full tracking data — for TRACKING state
     */
    _computeTrackingData(landmarks, transformMatrix, videoElement) {
        // Key points
        const noseBridge = landmarks[LANDMARKS.NOSE_BRIDGE];
        const noseTip = landmarks[LANDMARKS.NOSE_TIP];
        const leftEyeInner = landmarks[LANDMARKS.LEFT_EYE_INNER];
        const leftEyeOuter = landmarks[LANDMARKS.LEFT_EYE_OUTER];
        const rightEyeInner = landmarks[LANDMARKS.RIGHT_EYE_INNER];
        const rightEyeOuter = landmarks[LANDMARKS.RIGHT_EYE_OUTER];
        const leftTemple = landmarks[LANDMARKS.LEFT_TEMPLE];
        const rightTemple = landmarks[LANDMARKS.RIGHT_TEMPLE];
        const leftEar = landmarks[LANDMARKS.LEFT_EAR];
        const rightEar = landmarks[LANDMARKS.RIGHT_EAR];
        const chin = landmarks[LANDMARKS.CHIN];
        const forehead = landmarks[LANDMARKS.FOREHEAD];

        // Iris centers
        const leftEyeCenter = landmarks[LANDMARKS.LEFT_EYE_CENTER] || {
            x: (leftEyeInner.x + leftEyeOuter.x) / 2,
            y: (leftEyeInner.y + leftEyeOuter.y) / 2,
            z: (leftEyeInner.z + leftEyeOuter.z) / 2,
        };
        const rightEyeCenter = landmarks[LANDMARKS.RIGHT_EYE_CENTER] || {
            x: (rightEyeInner.x + rightEyeOuter.x) / 2,
            y: (rightEyeInner.y + rightEyeOuter.y) / 2,
            z: (rightEyeInner.z + rightEyeOuter.z) / 2,
        };

        // 2D IPD (stable for scaling)
        const ipdFlat = Math.sqrt(
            (rightEyeCenter.x - leftEyeCenter.x) ** 2 +
            (rightEyeCenter.y - leftEyeCenter.y) ** 2
        );

        // 3D IPD
        const ipd = Math.sqrt(
            (rightEyeCenter.x - leftEyeCenter.x) ** 2 +
            (rightEyeCenter.y - leftEyeCenter.y) ** 2 +
            (rightEyeCenter.z - leftEyeCenter.z) ** 2
        );

        // Face width & height
        const faceWidth = Math.sqrt(
            (rightTemple.x - leftTemple.x) ** 2 +
            (rightTemple.y - leftTemple.y) ** 2
        );
        const faceHeight = Math.sqrt(
            (forehead.x - chin.x) ** 2 +
            (forehead.y - chin.y) ** 2
        );

        // Head pose — prefer transformation matrix, fall back to landmarks
        const headPose = this._computeHeadPose(landmarks, transformMatrix);

        return {
            noseBridge,
            noseTip,
            leftEyeCenter,
            rightEyeCenter,
            leftEyeOuter,
            rightEyeOuter: landmarks[LANDMARKS.RIGHT_EYE_OUTER],
            leftTemple,
            rightTemple,
            leftEar,
            rightEar,
            ipd,
            ipdFlat,
            faceWidth,
            faceHeight,
            headPose,
            transformMatrix,
            landmarks,
            fps: this.fps,
        };
    }

    _computeHeadPose(landmarks, transformMatrix) {
        // ---- PRIMARY: Extract from MediaPipe's 4×4 transformation matrix ----
        // This is far more accurate than landmark-based estimation, especially
        // for yaw (side-to-side) which is the main problem area.
        if (transformMatrix && transformMatrix.data && transformMatrix.data.length >= 16) {
            const m = transformMatrix.data;
            // MediaPipe returns a column-major 4×4 matrix
            // Layout: [m0 m4 m8  m12]
            //         [m1 m5 m9  m13]
            //         [m2 m6 m10 m14]
            //         [m3 m7 m11 m15]

            const m00 = m[0], m01 = m[4], m02 = m[8];
            const m10 = m[1], m11 = m[5], m12 = m[9];
            const m20 = m[2], m21 = m[6], m22 = m[10];

            // Extract Euler angles (XYZ convention)
            let pitch, yaw, roll;

            if (Math.abs(m20) < 0.9999) {
                // Normal case
                yaw = Math.asin(-m20);                               // Y rotation
                pitch = Math.atan2(m21, m22);                        // X rotation
                roll = Math.atan2(m10, m00);                         // Z rotation
            } else {
                // Gimbal lock
                yaw = m20 < 0 ? Math.PI / 2 : -Math.PI / 2;
                pitch = Math.atan2(m12, m11);
                roll = 0;
            }

            return { yaw, pitch, roll };
        }

        // ---- FALLBACK: Landmark-based estimation ----
        const leftOuter = landmarks[LANDMARKS.LEFT_EYE_OUTER];
        const rightOuter = landmarks[LANDMARKS.RIGHT_EYE_OUTER];
        const noseBridgePt = landmarks[LANDMARKS.NOSE_BRIDGE];
        const noseTipPt = landmarks[LANDMARKS.NOSE_TIP];

        const dx = rightOuter.x - leftOuter.x;
        const dz = rightOuter.z - leftOuter.z;
        const yaw = Math.atan2(dz, dx);

        const pitchDz = noseTipPt.z - noseBridgePt.z;
        const pitchDy = noseTipPt.y - noseBridgePt.y;
        const pitch = Math.atan2(pitchDz, Math.abs(pitchDy)) * 0.6;

        const roll = Math.atan2(
            rightOuter.y - leftOuter.y,
            rightOuter.x - leftOuter.x
        );

        return { yaw, pitch, roll };
    }

    destroy() {
        if (this.fpsInterval) {
            clearInterval(this.fpsInterval);
            this.fpsInterval = null;
        }
        if (this.faceLandmarker) {
            this.faceLandmarker.close();
            this.faceLandmarker = null;
        }
    }
}

export { LANDMARKS };
export default FaceTracker;
