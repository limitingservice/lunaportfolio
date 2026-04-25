/**
 * FindFaceOverlay — Snapchat-like guided face acquisition UI
 *
 * Shows:
 *   - Animated oval face silhouette guide
 *   - Circular confidence progress ring
 *   - Real-time guidance text
 *   - "Face Found" snap-in animation
 *   - Premium fade transitions
 */

import React, { useEffect, useState } from 'react';

export default function FindFaceOverlay({
    confidence,
    guidance,
    isLocked,
    isLost,
}) {
    const [showFound, setShowFound] = useState(false);

    // Show "Face Found" briefly on lock
    useEffect(() => {
        if (isLocked) {
            setShowFound(true);
        } else {
            setShowFound(false);
        }
    }, [isLocked]);

    // Progress ring parameters
    const radius = 120;
    const strokeWidth = 3;
    const circumference = 2 * Math.PI * radius;
    const progress = Math.min(confidence, 1);
    const dashOffset = circumference * (1 - progress);

    // Guidance text
    const getGuidanceText = () => {
        if (isLost) return 'Face lost — move back into frame';
        if (showFound) return 'Face Found';
        return guidance || 'Center your face in the frame';
    };

    const getSubtext = () => {
        if (isLost) return 'We\'ll re-lock automatically';
        if (showFound) return '';
        if (confidence > 0.7) return 'Hold still...';
        return 'Position your face within the guide';
    };

    return (
        <div className={`find-face ${isLocked ? 'find-face--locked' : ''} ${isLost ? 'find-face--lost' : ''}`}>
            {/* Dark vignette overlay */}
            <div className="find-face__vignette" />

            {/* Face guide with progress ring */}
            <div className="find-face__guide-container">
                <svg
                    className={`find-face__ring ${showFound ? 'find-face__ring--locked' : ''}`}
                    viewBox={`0 0 ${(radius + strokeWidth) * 2} ${(radius + strokeWidth) * 2}`}
                    width={(radius + strokeWidth) * 2}
                    height={(radius + strokeWidth) * 2}
                >
                    {/* Background ring */}
                    <ellipse
                        cx={radius + strokeWidth}
                        cy={radius + strokeWidth}
                        rx={radius}
                        ry={radius * 1.25}
                        fill="none"
                        stroke="rgba(255,255,255,0.15)"
                        strokeWidth={strokeWidth}
                    />
                    {/* Progress ring */}
                    <ellipse
                        cx={radius + strokeWidth}
                        cy={radius + strokeWidth}
                        rx={radius}
                        ry={radius * 1.25}
                        fill="none"
                        stroke={showFound ? '#00e676' : 'rgba(255,255,255,0.8)'}
                        strokeWidth={showFound ? strokeWidth + 1 : strokeWidth}
                        strokeDasharray={circumference * 1.25}
                        strokeDashoffset={circumference * 1.25 * (1 - progress)}
                        strokeLinecap="round"
                        className="find-face__progress"
                    />
                </svg>

                {/* Face silhouette inside the ring */}
                <div className={`find-face__silhouette ${showFound ? 'find-face__silhouette--found' : ''}`}>
                    <svg viewBox="0 0 100 130" fill="none" width="80" height="104">
                        {/* Simple face outline */}
                        <ellipse cx="50" cy="58" rx="38" ry="48" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeDasharray="4 4" />
                        {/* Eyes */}
                        <ellipse cx="35" cy="50" rx="7" ry="3.5" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                        <ellipse cx="65" cy="50" rx="7" ry="3.5" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                        {/* Nose */}
                        <path d="M50 55 L48 68 L52 68 Z" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
                        {/* Mouth */}
                        <path d="M40 80 Q50 86 60 80" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
                    </svg>
                </div>
            </div>

            {/* Text */}
            <div className="find-face__text-container">
                <h2 className={`find-face__title ${showFound ? 'find-face__title--found' : ''}`}>
                    {showFound ? '✓ ' : ''}{isLost ? 'Find Face' : (showFound ? 'Face Found' : 'Find Face')}
                </h2>
                <p className="find-face__guidance">{getGuidanceText()}</p>
                {getSubtext() && (
                    <p className="find-face__subtext">{getSubtext()}</p>
                )}
            </div>

            {/* Confidence bar (subtle, at bottom) */}
            {!showFound && !isLost && (
                <div className="find-face__confidence-bar">
                    <div
                        className="find-face__confidence-fill"
                        style={{ width: `${progress * 100}%` }}
                    />
                </div>
            )}
        </div>
    );
}
