/**
 * useARSession — Custom React hook for AR session lifecycle
 *
 * Manages:
 * - Camera stream (getUserMedia) with front/back switching
 * - FaceTracker initialization and frame processing
 * - State: status, face data, FPS
 * - Cleanup on unmount
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import { FaceTracker } from './FaceTracker';

export const AR_STATUS = {
    IDLE: 'idle',
    REQUESTING_PERMISSION: 'requesting_permission',
    LOADING: 'loading',
    ACTIVE: 'active',
    ERROR: 'error',
    DENIED: 'denied',
};

export function useARSession() {
    const [status, setStatus] = useState(AR_STATUS.IDLE);
    const [faceData, setFaceData] = useState(null);
    const [fps, setFps] = useState(0);
    const [error, setError] = useState(null);
    const [facingMode, setFacingMode] = useState('user'); // 'user' = front, 'environment' = back

    const videoRef = useRef(null);
    const trackerRef = useRef(null);
    const streamRef = useRef(null);
    const rafRef = useRef(null);
    const activeRef = useRef(false);

    // Start camera stream for a given facing mode
    const startCameraStream = useCallback(async (videoElement, facing) => {
        // Stop existing stream first
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((t) => t.stop());
            streamRef.current = null;
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

            // Wait for video to be ready
            await new Promise((resolve, reject) => {
                videoElement.onloadeddata = resolve;
                videoElement.onerror = reject;
                // Safety timeout
                setTimeout(resolve, 5000);
            });

            await videoElement.play();
            return true;
        } catch (err) {
            if (err.name === 'NotAllowedError') {
                setStatus(AR_STATUS.DENIED);
                setError('Camera access denied. Please allow camera access to use AR Try-On.');
            } else {
                setStatus(AR_STATUS.ERROR);
                setError(`Camera error: ${err.message}`);
            }
            return false;
        }
    }, []);

    // Initialize face tracker (only once)
    const initTracker = useCallback(async () => {
        if (trackerRef.current) return trackerRef.current;

        const tracker = new FaceTracker();
        const success = await tracker.initialize();

        if (!success) {
            setStatus(AR_STATUS.ERROR);
            setError('Failed to initialize face tracking. Please try again.');
            return null;
        }

        trackerRef.current = tracker;
        return tracker;
    }, []);

    // Start frame processing loop
    const startProcessingLoop = useCallback((tracker, videoElement) => {
        // Cancel any existing loop
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
        }

        activeRef.current = true;

        const processLoop = () => {
            if (!activeRef.current) return;

            if (videoElement.readyState >= 2) { // HAVE_CURRENT_DATA
                const result = tracker.processFrame(videoElement);
                if (result) {
                    setFaceData(result);
                    setFps(result.fps);
                }
            }

            rafRef.current = requestAnimationFrame(processLoop);
        };

        rafRef.current = requestAnimationFrame(processLoop);
    }, []);

    // Start AR session
    const startSession = useCallback(async (videoElement) => {
        if (!videoElement) {
            console.error('No video element provided');
            return false;
        }

        videoRef.current = videoElement;
        setStatus(AR_STATUS.REQUESTING_PERMISSION);

        // 1. Start camera
        const cameraOk = await startCameraStream(videoElement, facingMode);
        if (!cameraOk) return false;

        // 2. Initialize tracker
        setStatus(AR_STATUS.LOADING);
        const tracker = await initTracker();
        if (!tracker) return false;

        // 3. Start processing loop
        setStatus(AR_STATUS.ACTIVE);
        startProcessingLoop(tracker, videoElement);

        return true;
    }, [facingMode, startCameraStream, initTracker, startProcessingLoop]);

    // Flip camera (front <-> back)
    const flipCamera = useCallback(async () => {
        const newFacing = facingMode === 'user' ? 'environment' : 'user';
        setFacingMode(newFacing);

        if (videoRef.current && activeRef.current) {
            // Pause processing
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }

            // Restart camera with new facing
            const ok = await startCameraStream(videoRef.current, newFacing);
            if (ok && trackerRef.current) {
                // Resume processing
                startProcessingLoop(trackerRef.current, videoRef.current);
            }
        }
    }, [facingMode, startCameraStream, startProcessingLoop]);

    // Stop AR session
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

        setFaceData(null);
        setFps(0);
        setStatus(AR_STATUS.IDLE);
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
        status,
        faceData,
        fps,
        error,
        facingMode,
        startSession,
        stopSession,
        flipCamera,
    };
}

export default useARSession;
