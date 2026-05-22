'use client';

import React, { useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { Photo } from '@/data/photos';

interface PhotoLightboxProps {
    photos: Photo[];
    activeIndex: number | null;
    onClose: () => void;
    onNavigate: (next: number) => void;
}

export default function PhotoLightbox({ photos, activeIndex, onClose, onNavigate }: PhotoLightboxProps) {
    const isOpen = activeIndex !== null;
    const photo = isOpen ? photos[activeIndex!] : null;
    const lightboxRef = useRef<HTMLDivElement>(null);

    const handleKey = useCallback(
        (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') onNavigate((activeIndex! + 1) % photos.length);
            if (e.key === 'ArrowLeft') onNavigate((activeIndex! - 1 + photos.length) % photos.length);
        },
        [isOpen, activeIndex, photos.length, onClose, onNavigate]
    );

    useEffect(() => {
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [handleKey]);

    useEffect(() => {
        if (isOpen) {
            const prev = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = prev;
            };
        }
    }, [isOpen]);

    // Focus management: move focus into the lightbox and restore it on close
    useEffect(() => {
        if (!isOpen) return;
        const previouslyFocused = document.activeElement as HTMLElement | null;
        lightboxRef.current?.focus();
        return () => previouslyFocused?.focus();
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && photo && (
                <motion.div
                    ref={lightboxRef}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Photo viewer — ${photo.alt}`}
                    tabIndex={-1}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12 focus:outline-none"
                    onClick={onClose}
                >
                    <button
                        onClick={(e) => { e.stopPropagation(); onClose(); }}
                        className="absolute top-4 right-4 md:top-6 md:right-6 text-white/80 hover:text-white text-sm tracking-wider z-10"
                        aria-label="Close"
                    >
                        CLOSE ✕
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); onNavigate((activeIndex! - 1 + photos.length) % photos.length); }}
                        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-3xl md:text-4xl px-3 py-2 z-10"
                        aria-label="Previous"
                    >
                        ‹
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); onNavigate((activeIndex! + 1) % photos.length); }}
                        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-3xl md:text-4xl px-3 py-2 z-10"
                        aria-label="Next"
                    >
                        ›
                    </button>

                    <motion.div
                        key={photo.src}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.25 }}
                        className="relative max-w-full max-h-full flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={photo.src}
                            alt={photo.alt}
                            width={photo.width}
                            height={photo.height}
                            sizes="100vw"
                            priority
                            className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
                        />
                    </motion.div>

                    <div className="absolute bottom-4 left-0 right-0 text-center text-white/60 text-xs tracking-widest font-mono">
                        {photo.alt.toUpperCase()} · {activeIndex! + 1} / {photos.length}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
