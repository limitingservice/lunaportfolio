'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface RotationScrubberProps {
    rotation: number;
    onChange: (rotation: number) => void;
    showReadout?: boolean;
    className?: string;
}

export default function RotationScrubber({
    rotation,
    onChange,
    showReadout = true,
    className = '',
}: RotationScrubberProps) {
    const [isDragging, setIsDragging] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);

    const updateRotation = useCallback((e: PointerEvent | React.PointerEvent) => {
        if (!trackRef.current) return;

        const rect = trackRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const percentage = x / rect.width;
        const newRotation = Math.round(percentage * 360);

        onChange(newRotation);
    }, [onChange]);

    const handlePointerDown = (e: React.PointerEvent) => {
        setIsDragging(true);
        updateRotation(e);
    };

    const handlePointerMove = useCallback((e: PointerEvent) => {
        if (isDragging) {
            updateRotation(e);
        }
    }, [isDragging, updateRotation]);

    const handlePointerUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        let newRotation = rotation;

        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            newRotation = Math.max(0, rotation - (e.shiftKey ? 15 : 3));
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            newRotation = Math.min(360, rotation + (e.shiftKey ? 15 : 3));
        } else if (e.key === 'Home') {
            e.preventDefault();
            newRotation = 0;
        } else if (e.key === 'End') {
            e.preventDefault();
            newRotation = 360;
        }

        if (newRotation !== rotation) {
            onChange(newRotation);
        }
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('pointermove', handlePointerMove);
            window.addEventListener('pointerup', handlePointerUp);

            return () => {
                window.removeEventListener('pointermove', handlePointerMove);
                window.removeEventListener('pointerup', handlePointerUp);
            };
        }
    }, [isDragging, handlePointerMove, handlePointerUp]);

    const percentage = (rotation / 360) * 100;

    return (
        <div className={`w-full max-w-full ${className}`}>
            <div className="flex items-center gap-3 md:gap-4">
                {/* Scrub track */}
                <div
                    ref={trackRef}
                    className="relative flex-1 min-w-0 h-2 bg-obsidian-700 rounded-full cursor-pointer group"
                    onPointerDown={handlePointerDown}
                    role="slider"
                    aria-valuemin={0}
                    aria-valuemax={360}
                    aria-valuenow={rotation}
                    aria-label="Shoe rotation control"
                    tabIndex={0}
                    onKeyDown={handleKeyDown}
                >
                    {/* Progress fill */}
                    <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-iridium-500 to-iridium-400 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                    />

                    {/* Tick marks (optional) */}
                    <div className="absolute inset-0 flex justify-between items-center px-1 pointer-events-none">
                        {[0, 90, 180, 270, 360].map((tick) => (
                            <div
                                key={tick}
                                className="w-px h-3 bg-obsidian-500 opacity-50"
                                style={{ marginLeft: tick === 0 ? 0 : -1 }}
                            />
                        ))}
                    </div>

                    {/* Thumb */}
                    <motion.div
                        className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-lg border-2 border-iridium-500 cursor-grab active:cursor-grabbing touch-none"
                        style={{ left: `${percentage}%`, marginLeft: '-10px' }}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 1.1 }}
                        animate={{ scale: isDragging ? 1.15 : 1 }}
                    >
                        <div className="absolute inset-1 bg-iridium-500 rounded-full" />
                    </motion.div>
                </div>

                {/* Rotation readout */}
                {showReadout && (
                    <div className="text-sm font-mono text-gray-300 w-12 md:min-w-[80px] text-right shrink-0">
                        <span className="text-iridium-500">{rotation}°</span>
                    </div>
                )}
            </div>

            {/* Keyboard hints */}
            <div className="mt-2 text-xs text-gray-500 text-center">
                Use ← → arrows to rotate • Shift for faster • Home/End for 0°/360°
            </div>
        </div>
    );
}
