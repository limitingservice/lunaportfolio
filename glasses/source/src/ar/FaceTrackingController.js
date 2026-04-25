/**
 * FaceTrackingController — 5-state machine for Snapchat-like AR try-on
 *
 * States:
 *   PERMISSION      — Requesting camera access
 *   FIND_FACE       — Guided face acquisition with confidence gating
 *   LOCK            — "Face Found" confirmation (500ms)
 *   TRACKING        — Active glasses rendering with full landmark tracking
 *   LOST            — Face lost, attempting re-acquisition
 *
 * Thresholds (tunable):
 *   CONFIDENCE_THRESHOLD    — Min confidence to count as "detected" (0.85)
 *   STABLE_LOCK_WINDOW_MS   — Continuous detection required to lock (700ms)
 *   LOCK_DISPLAY_MS         — "Face Found" display duration (500ms)
 *   LOST_TIMEOUT_MS         — Time before showing re-acquire overlay (400ms)
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import { FaceTracker } from './FaceTracker';

// ---- STATES ----
export const AR_STATE = {
    IDLE: 'idle',
    PERMISSION: 'permission',
    FIND_FACE: 'find_face',
    LOCK: 'lock',
    TRACKING: 'tracking',
    LOST: 'lost',
    ERROR: 'error',
    DENIED: 'denied',
};

// ---- TUNABLE THRESHOLDS ----
export const THRESHOLDS = {
    CONFIDENCE_THRESHOLD: 0.70,      // Min confidence to count as "detected"
    STABLE_LOCK_WINDOW_MS: 700,      // Must detect face for this long to lock
    LOCK_DISPLAY_MS: 500,            // "Face Found" shown for this long
    LOST_TIMEOUT_MS: 400,            // Face must be lost for this long to show re-acquire
    FACE_TOO_CLOSE: 0.65,            // bbox width > this = too close
    FACE_TOO_FAR: 0.15,              // bbox width < this = too far
    FACE_OFF_CENTER: 0.18,           // center offset > this = off center
    FACE_ANGLE_MAX: 0.45,            // yaw > this = too angled
};

export function useFaceTracking() {
    const [state, setState] = useState(AR_STATE.IDLE);
    const [detectionData, setDetectionData] = useState(null);
    const [trackingData, setTrackingData] = useState(null);
    const [confidence, setConfidence] = useState(0);
    const [guidance, setGuidance] = useState('');
    const [fps, setFps] = useState(0);
    const [facingMode, setFacingMode] = useState('user');
    const [error, setError] = useState(null);

    const trackerRef = useRef(null);
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const rafRef = useRef(null);
    const activeRef = useRef(false);

    // Timing refs for state transitions
    const stableStartRef = useRef(null);     // When stable detection started
    const lockStartRef = useRef(null);       // When LOCK state started
    const lostStartRef = useRef(null);       // When face was last lost
    const smoothConfRef = useRef(0);         // Smoothed confidence

    // ---- START CAMERA ----
    const startCamera = useCallback(async (videoElement, facing) => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((t) => t.stop());
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: facing,
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    frameRate: { ideal: 30, max: 60 },
                },
                audio: false,
            });

            streamRef.current = stream;
            videoElement.srcObject = stream;

            await new Promise((resolve, reject) => {
                videoElement.onloadeddata = resolve;
                videoElement.onerror = reject;
                setTimeout(resolve, 5000);
            });

            await videoElement.play();
            return true;
        } catch (err) {
            if (err.name === 'NotAllowedError') {
                setState(AR_STATE.DENIED);
                setError('Camera access denied.');
            } else {
                setState(AR_STATE.ERROR);
                setError(`Camera error: ${err.message}`);
            }
            return false;
        }
    }, []);

    // ---- INIT TRACKER ----
    const initTracker = useCallback(async () => {
        if (trackerRef.current) return true;

        const tracker = new FaceTracker();
        const ok = await tracker.initialize();
        if (!ok) {
            setState(AR_STATE.ERROR);
            setError('Failed to initialize face tracking.');
            return false;
        }
        trackerRef.current = tracker;
        return true;
    }, []);

    // ---- MAIN FRAME LOOP ----
    const processFrame = useCallback(() => {
        if (!activeRef.current || !videoRef.current || !trackerRef.current) return;

        const video = videoRef.current;
        if (video.readyState < 2) {
            rafRef.current = requestAnimationFrame(processFrame);
            return;
        }

        const currentState = stateRef.current;

        if (currentState === AR_STATE.FIND_FACE) {
            // ---- DETECTION MODE ----
            const data = trackerRef.current.detectFace(video);

            if (data) {
                setDetectionData(data);
                setFps(data.fps);

                // Smooth the confidence value
                smoothConfRef.current =
                    smoothConfRef.current * 0.7 + (data.detected ? data.confidence : 0) * 0.3;
                setConfidence(smoothConfRef.current);

                // Set guidance
                if (!data.detected) {
                    setGuidance('Move into frame');
                    stableStartRef.current = null;
                } else if (data.guidance === 'too_close') {
                    setGuidance('Move farther');
                    stableStartRef.current = null;
                } else if (data.guidance === 'too_far') {
                    setGuidance('Move closer');
                    stableStartRef.current = null;
                } else if (data.guidance === 'angle') {
                    setGuidance('Face forward');
                    stableStartRef.current = null;
                } else if (data.guidance === 'off_center') {
                    setGuidance('Center your face');
                    stableStartRef.current = null;
                } else if (smoothConfRef.current >= THRESHOLDS.CONFIDENCE_THRESHOLD) {
                    setGuidance('Hold still...');

                    // Start or continue stable timer
                    if (!stableStartRef.current) {
                        stableStartRef.current = performance.now();
                    }

                    // Check if we've been stable long enough
                    const elapsed = performance.now() - stableStartRef.current;
                    if (elapsed >= THRESHOLDS.STABLE_LOCK_WINDOW_MS) {
                        // TRANSITION: FIND_FACE → LOCK
                        stateRef.current = AR_STATE.LOCK;
                        setState(AR_STATE.LOCK);
                        lockStartRef.current = performance.now();

                        // Haptic feedback on mobile
                        if (navigator.vibrate) {
                            navigator.vibrate(50);
                        }
                    }
                } else {
                    setGuidance('Center your face in the frame');
                    stableStartRef.current = null;
                }
            }
        } else if (currentState === AR_STATE.LOCK) {
            // ---- LOCK CONFIRMATION (500ms) ----
            // Keep detecting to show it's working
            trackerRef.current.detectFace(video);

            const elapsed = performance.now() - lockStartRef.current;
            if (elapsed >= THRESHOLDS.LOCK_DISPLAY_MS) {
                // TRANSITION: LOCK → TRACKING
                stateRef.current = AR_STATE.TRACKING;
                setState(AR_STATE.TRACKING);
                lostStartRef.current = null;
            }
        } else if (currentState === AR_STATE.TRACKING) {
            // ---- FULL TRACKING MODE ----
            const data = trackerRef.current.trackFace(video);

            if (data) {
                setTrackingData(data);
                setFps(data.fps);
                lostStartRef.current = null;
            } else {
                // Face lost — start lost timer
                if (!lostStartRef.current) {
                    lostStartRef.current = performance.now();
                }

                const lostElapsed = performance.now() - lostStartRef.current;
                if (lostElapsed >= THRESHOLDS.LOST_TIMEOUT_MS) {
                    // TRANSITION: TRACKING → LOST
                    stateRef.current = AR_STATE.LOST;
                    setState(AR_STATE.LOST);
                    stableStartRef.current = null;
                    smoothConfRef.current = 0;
                    setConfidence(0);
                }
            }
        } else if (currentState === AR_STATE.LOST) {
            // ---- LOST / RE-ACQUIRE MODE ----
            const data = trackerRef.current.detectFace(video);

            if (data && data.detected && data.confidence >= THRESHOLDS.CONFIDENCE_THRESHOLD) {
                // Quick re-lock — skip full FIND_FACE, go straight to LOCK
                stateRef.current = AR_STATE.LOCK;
                setState(AR_STATE.LOCK);
                lockStartRef.current = performance.now();
                smoothConfRef.current = data.confidence;
                setConfidence(data.confidence);

                if (navigator.vibrate) {
                    navigator.vibrate(30);
                }
            } else {
                // Still lost — keep trying
                setFps(data?.fps || 0);
            }
        }

        rafRef.current = requestAnimationFrame(processFrame);
    }, []);

    // State ref to avoid stale closures in the frame loop
    const stateRef = useRef(AR_STATE.IDLE);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    // ---- START SESSION ----
    const startSession = useCallback(async (videoElement) => {
        if (!videoElement) return false;

        videoRef.current = videoElement;
        activeRef.current = true;

        // 1. Request camera
        setState(AR_STATE.PERMISSION);
        stateRef.current = AR_STATE.PERMISSION;

        const cameraOk = await startCamera(videoElement, facingMode);
        if (!cameraOk) return false;

        // 2. Init tracker
        const trackerOk = await initTracker();
        if (!trackerOk) return false;

        // 3. Enter FIND_FACE
        setState(AR_STATE.FIND_FACE);
        stateRef.current = AR_STATE.FIND_FACE;
        stableStartRef.current = null;
        smoothConfRef.current = 0;

        // 4. Start frame loop
        rafRef.current = requestAnimationFrame(processFrame);

        return true;
    }, [facingMode, startCamera, initTracker, processFrame]);

    // ---- FLIP CAMERA ----
    const flipCamera = useCallback(async () => {
        const newFacing = facingMode === 'user' ? 'environment' : 'user';
        setFacingMode(newFacing);

        if (videoRef.current && activeRef.current) {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);

            const ok = await startCamera(videoRef.current, newFacing);
            if (ok) {
                // Return to FIND_FACE after camera flip
                setState(AR_STATE.FIND_FACE);
                stateRef.current = AR_STATE.FIND_FACE;
                stableStartRef.current = null;
                smoothConfRef.current = 0;
                setConfidence(0);
                rafRef.current = requestAnimationFrame(processFrame);
            }
        }
    }, [facingMode, startCamera, processFrame]);

    // ---- RECALIBRATE ----
    const recalibrate = useCallback(() => {
        setState(AR_STATE.FIND_FACE);
        stateRef.current = AR_STATE.FIND_FACE;
        stableStartRef.current = null;
        smoothConfRef.current = 0;
        setConfidence(0);
        setTrackingData(null);
        setGuidance('Center your face in the frame');
    }, []);

    // ---- STOP SESSION ----
    const stopSession = useCallback(() => {
        activeRef.current = false;

        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }
        if (trackerRef.current) {
            trackerRef.current.destroy();
            trackerRef.current = null;
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((t) => t.stop());
            streamRef.current = null;
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
            videoRef.current = null;
        }

        setState(AR_STATE.IDLE);
        stateRef.current = AR_STATE.IDLE;
        setDetectionData(null);
        setTrackingData(null);
        setConfidence(0);
        setFps(0);
        setGuidance('');
        setError(null);
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            activeRef.current = false;
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            if (trackerRef.current) trackerRef.current.destroy();
            if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
        };
    }, []);

    return {
        state,
        detectionData,
        trackingData,
        confidence,
        guidance,
        fps,
        error,
        facingMode,
        startSession,
        stopSession,
        flipCamera,
        recalibrate,
    };
}

export default useFaceTracking;
