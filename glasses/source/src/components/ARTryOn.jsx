/**
 * ARTryOn — Premium retail AR overlay modal
 *
 * KEY FIX: The <video> element is ALWAYS rendered (hidden when needed)
 * so the ref is available when "Enable Camera" is clicked.
 *
 * Orchestrates the 5-state machine:
 *   IDLE → PERMISSION → FIND_FACE → LOCK → TRACKING → LOST
 */

import React, { useState, useRef, useCallback, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useFaceTracking, AR_STATE } from '../ar/FaceTrackingController';
import FindFaceOverlay from './FindFaceOverlay';
import GlassesRenderer from '../ar/GlassesRenderer';

export default function ARTryOn({ product, selectedVariant, onVariantChange, onClose }) {
    const {
        state,
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
    } = useFaceTracking();

    const [arVariant, setArVariant] = useState(selectedVariant);
    const [showFlash, setShowFlash] = useState(false);
    const videoRef = useRef(null);
    const containerRef = useRef(null);

    // Start AR — video ref is always available now
    const handleStartAR = useCallback(() => {
        if (videoRef.current) {
            startSession(videoRef.current);
        }
    }, [startSession]);

    // Close AR
    const handleClose = useCallback(() => {
        stopSession();
        onClose();
    }, [stopSession, onClose]);

    // Variant switch
    const handleVariantSwitch = useCallback((v) => {
        setArVariant(v);
        onVariantChange(v);
    }, [onVariantChange]);

    // Screenshot
    const handleScreenshot = useCallback(async () => {
        if (!containerRef.current) return;
        setShowFlash(true);
        setTimeout(() => setShowFlash(false), 400);

        try {
            const html2canvas = (await import('html2canvas')).default;
            const canvas = await html2canvas(containerRef.current, { useCORS: true, scale: 2 });
            const link = document.createElement('a');
            link.download = `glasses-tryon-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (err) {
            console.error('Screenshot failed:', err);
        }
    }, []);

    // Escape key
    useEffect(() => {
        const handleKey = (e) => { if (e.key === 'Escape') handleClose(); };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [handleClose]);

    const isMirrored = facingMode === 'user';
    const isTracking = state === AR_STATE.TRACKING;
    const isFinding = state === AR_STATE.FIND_FACE;
    const isLocking = state === AR_STATE.LOCK;
    const isLost = state === AR_STATE.LOST;
    const isLoading = state === AR_STATE.PERMISSION;
    const isError = state === AR_STATE.ERROR || state === AR_STATE.DENIED;
    const isIdle = state === AR_STATE.IDLE;

    // Video should be visible once we're past IDLE+PERMISSION
    const showVideo = !isIdle && !isError;

    return (
        <div className="ar-modal ar-modal--active" ref={containerRef}>
            {showFlash && <div className="ar-modal__flash" />}

            {/* PERSISTENT video element — always in DOM so ref is available */}
            <video
                ref={videoRef}
                className="ar-modal__video"
                playsInline
                muted
                autoPlay
                style={{
                    opacity: showVideo ? 1 : 0,
                    pointerEvents: showVideo ? 'auto' : 'none',
                    transform: isMirrored ? 'scaleX(-1)' : 'none',
                }}
            />

            {/* ---- PERMISSION SCREEN (IDLE state) ---- */}
            {isIdle && (
                <div className="ar-modal__permission" style={{ zIndex: 20 }}>
                    <div className="ar-modal__permission-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                            <circle cx="12" cy="13" r="4" />
                        </svg>
                    </div>
                    <h2 className="ar-modal__permission-title">Virtual Try-On</h2>
                    <p className="ar-modal__permission-desc">
                        See how these glasses look on you in real-time using your camera.
                    </p>
                    <div className="ar-modal__permission-privacy">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        Camera is used only for virtual try-on. No photos are stored.
                    </div>
                    <div className="ar-modal__permission-actions">
                        <button className="ar-modal__btn ar-modal__btn--ghost" onClick={handleClose}>
                            Cancel
                        </button>
                        <button className="ar-modal__btn ar-modal__btn--primary" onClick={handleStartAR}>
                            Enable Camera
                        </button>
                    </div>
                </div>
            )}

            {/* ---- ERROR SCREEN ---- */}
            {isError && (
                <div className="ar-modal__permission">
                    <div className="ar-modal__permission-icon ar-modal__permission-icon--error">⚠️</div>
                    <h2 className="ar-modal__permission-title">
                        {state === AR_STATE.DENIED ? 'Camera Access Required' : 'Something Went Wrong'}
                    </h2>
                    <p className="ar-modal__permission-desc">{error}</p>
                    <div className="ar-modal__permission-actions">
                        <button className="ar-modal__btn ar-modal__btn--primary" onClick={handleClose}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* ---- LOADING (camera initializing) ---- */}
            {isLoading && (
                <div className="ar-modal__loading">
                    <div className="ar-modal__loading-spinner" />
                    <p className="ar-modal__loading-text">Initializing camera...</p>
                </div>
            )}

            {/* ---- FIND FACE / LOCK / LOST overlay ---- */}
            {(isFinding || isLocking || isLost) && (
                <FindFaceOverlay
                    confidence={confidence}
                    guidance={guidance}
                    isLocked={isLocking}
                    isLost={isLost}
                />
            )}

            {/* ---- Three.js canvas — TRACKING only ---- */}
            {isTracking && (
                <div
                    className="ar-modal__canvas"
                    style={{ transform: isMirrored ? 'scaleX(-1)' : 'none' }}
                >
                    <Canvas
                        camera={{ position: [0, 0, 2], fov: 50 }}
                        style={{ background: 'transparent' }}
                        gl={{ alpha: true, antialias: true }}
                    >
                        <Suspense fallback={null}>
                            <GlassesRenderer
                                faceData={trackingData}
                                variant={arVariant}
                                fadeIn={true}
                            />
                        </Suspense>
                    </Canvas>
                </div>
            )}

            {/* ---- Top info bar (visible once past idle) ---- */}
            {!isIdle && !isError && (
                <div className="ar-modal__top-bar">
                    <span className="ar-modal__product-name">{product.name}</span>
                    <span className="ar-modal__fps">{fps} FPS</span>
                </div>
            )}

            {/* Color swatches — TRACKING only */}
            {isTracking && (
                <div className="ar-modal__swatches">
                    <span className="ar-modal__swatches-label">COLOR</span>
                    {product.variants.map((v) => (
                        <button
                            key={v.id}
                            className={`ar-modal__swatch ${v.id === arVariant.id ? 'ar-modal__swatch--active' : ''}`}
                            style={{ background: v.color }}
                            onClick={() => handleVariantSwitch(v)}
                            aria-label={v.name}
                            title={v.name}
                        />
                    ))}
                </div>
            )}

            {/* Bottom control bar */}
            <div className={`ar-modal__controls ${isTracking ? 'ar-modal__controls--visible' : ''}`}>
                <button className="ar-modal__ctrl ar-modal__ctrl--close" onClick={handleClose} title="Close">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
                <div className="ar-modal__ctrl-divider" />
                <button className="ar-modal__ctrl" onClick={flipCamera} title="Flip camera">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M11 19H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" />
                        <path d="M13 5h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5" />
                        <polyline points="16 3 19 6 16 9" />
                        <polyline points="8 21 5 18 8 15" />
                    </svg>
                </button>
                <div className="ar-modal__ctrl-divider" />
                <button className="ar-modal__ctrl ar-modal__ctrl--capture" onClick={handleScreenshot} title="Capture">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" r="4" fill="currentColor" />
                    </svg>
                </button>
                <div className="ar-modal__ctrl-divider" />
                <button className="ar-modal__ctrl" onClick={recalibrate} title="Recalibrate">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <polyline points="23 4 23 10 17 10" />
                        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                    </svg>
                </button>
                <div className="ar-modal__ctrl-divider" />
                <button
                    className="ar-modal__ctrl"
                    onClick={() => {
                        const idx = product.variants.findIndex((v) => v.id === arVariant.id);
                        const next = product.variants[(idx + 1) % product.variants.length];
                        handleVariantSwitch(next);
                    }}
                    title="Next color"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="8" cy="10" r="2" fill="currentColor" />
                        <circle cx="16" cy="10" r="2" fill="currentColor" />
                        <circle cx="12" cy="16" r="2" fill="currentColor" />
                    </svg>
                </button>
            </div>

            {/* Exit button — always visible (top-left) once past idle */}
            {!isIdle && (
                <button className="ar-modal__exit" onClick={handleClose} title="Close Try-On">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            )}
        </div>
    );
}
