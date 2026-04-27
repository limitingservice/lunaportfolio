'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/data/projects';

interface ProjectGalleryModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: Project | null;
}

export default function ProjectGalleryModal({ isOpen, onClose, project }: ProjectGalleryModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Reset scroll position and progress bar to the start
            setScrollProgress(0);
            // Use a short timeout so the DOM has rendered before resetting scrollLeft
            requestAnimationFrame(() => {
                if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollLeft = 0;
                }
            });
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!project) return null;

    // Support mixed devices (phone + watch + tablet)
    const galleryItems: { src: string | null; type: 'phone' | 'laptop' | 'watch' | 'tablet' }[] = [];
    const mainType = project.viewer?.deviceType === 'laptop' ? 'laptop' : project.viewer?.deviceType === 'tablet' ? 'tablet' : 'phone';
    
    const screens = Array.isArray(project.viewer?.screens) ? project.viewer.screens : [];
    screens.forEach(src => galleryItems.push({ src, type: mainType }));
    
    if (project.viewer?.deviceType === 'phone-watch' && Array.isArray(project.viewer?.watchScreens)) {
        project.viewer.watchScreens.forEach(src => galleryItems.push({ src, type: 'watch' }));
    }
    
    // Ensure we have at least 3 slots to show the layout even if empty
    while (galleryItems.length < 3) {
        galleryItems.push({ src: null, type: mainType });
    }

    // Custom Scrollbar Logic
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Drag state — refs for zero-latency updates during drag
    const barTrackRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);
    const [isDragging, setIsDragging] = useState(false);
    const rafRef = useRef<number | null>(null);

    const handleScroll = () => {
        // Don't update from scroll events while dragging — the drag is the source of truth
        if (isDraggingRef.current) return;
        if (!scrollContainerRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        const maxScroll = scrollWidth - clientWidth;
        setScrollProgress(maxScroll > 0 ? scrollLeft / maxScroll : 0);
    };

    // Given a pointer X position, compute the scroll ratio and scroll the gallery
    const scrubToPointer = useCallback((clientX: number) => {
        if (!barTrackRef.current || !scrollContainerRef.current) return;
        const rect = barTrackRef.current.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));

        const { scrollWidth, clientWidth } = scrollContainerRef.current;
        const maxScroll = scrollWidth - clientWidth;
        scrollContainerRef.current.scrollLeft = maxScroll * ratio;
        setScrollProgress(ratio);
    }, []);

    // Pointer handlers for drag
    const handlePointerDown = useCallback((e: React.PointerEvent) => {
        e.preventDefault();
        e.stopPropagation();
        isDraggingRef.current = true;
        setIsDragging(true);

        // Disable snap during drag so the scroll follows the thumb exactly
        if (scrollContainerRef.current) {
            scrollContainerRef.current.style.scrollSnapType = 'none';
        }

        // Capture pointer so we get move/up even outside the element
        (e.target as HTMLElement).setPointerCapture(e.pointerId);

        // Immediately scrub to where the user clicked
        scrubToPointer(e.clientX);
    }, [scrubToPointer]);

    const handlePointerMove = useCallback((e: React.PointerEvent) => {
        if (!isDraggingRef.current) return;
        e.preventDefault();

        // Use rAF to throttle updates to display refresh rate
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
            scrubToPointer(e.clientX);
            rafRef.current = null;
        });
    }, [scrubToPointer]);

    const handlePointerUp = useCallback((e: React.PointerEvent) => {
        if (!isDraggingRef.current) return;
        isDraggingRef.current = false;
        setIsDragging(false);

        // Re-enable snap scroll so the gallery settles to the nearest screen
        if (scrollContainerRef.current) {
            scrollContainerRef.current.style.scrollSnapType = 'x mandatory';
        }

        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    }, []);

    // Cleanup rAF on unmount
    useEffect(() => {
        return () => {
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    const thumbWidthPct = Math.max(10, 100 / galleryItems.length);
    const thumbLeftPct = scrollProgress * (100 - thumbWidthPct);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex flex-col bg-black/80 backdrop-blur-xl"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 md:p-10 shrink-0">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-light text-white mb-2">{project.name}</h2>
                            <p className="text-gray-400 text-sm md:text-base max-w-2xl">{project.shortDescription}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-4 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Horizontal Scroll Gallery */}
                    <div 
                        ref={scrollContainerRef}
                        onScroll={handleScroll}
                        className="flex-1 overflow-x-auto overflow-y-hidden px-10 md:px-64 pb-24 pt-10 flex items-center gap-16 md:gap-32 snap-x snap-mandatory"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
                    >
                        
                        <style jsx>{`
                            div::-webkit-scrollbar { display: none; }
                        `}</style>
                        
                        {galleryItems.map((item, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: Math.min(index * 0.1 + 0.2, 0.8) }}
                                className="snap-center shrink-0 h-full flex flex-col justify-center"
                            >
                                {item.type === 'laptop' ? (
                                    /* CSS Laptop Frame (Macbook style) */
                                    <div className="relative w-[320px] h-[210px] sm:w-[600px] sm:h-[380px] md:w-[800px] md:h-[520px] bg-[#d0d0d0] rounded-t-[10px] md:rounded-t-[20px] rounded-b-md border-[2px] md:border-[4px] border-[#999] shadow-[0_20px_80px_rgba(0,0,0,0.8)] flex flex-col items-center overflow-hidden">
                                        
                                        {/* Screen Bezel */}
                                        <div className="w-full h-[calc(100%-12px)] md:h-[calc(100%-18px)] bg-[#0a0a0a] flex flex-col items-center justify-center p-2 relative shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                                            
                                            {/* Camera notch slightly styled */}
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(100%+250px)] md:-translate-y-[calc(100%+230px)] w-2 h-2 rounded-full bg-[#111] flex items-center justify-center border border-[#222]">
                                                <div className="w-1 h-1 bg-[#1a2b5e] rounded-full drop-shadow-sm blur-[0.5px]"></div>
                                            </div>

                                            {item.src ? (
                                                <div className="w-full h-full bg-zinc-900 overflow-hidden">
                                                    <img 
                                                        src={item.src} 
                                                        alt={`${project.name} Screen ${index + 1}`} 
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-b from-zinc-800 to-zinc-900 flex flex-col items-center justify-center p-8 text-center">
                                                    <div className="w-16 h-16 border-2 border-dashed border-zinc-600 rounded-2xl mb-4 flex items-center justify-center opacity-50">
                                                        <svg className="w-8 h-8 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                    <h3 className="text-zinc-400 font-medium tracking-wide">SCREEN {index + 1}</h3>
                                                    <p className="text-zinc-500 text-sm mt-2 max-w-[200px]">Add your mockup images here later.</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Laptop Base (Aluminum lip) */}
                                        <div className="absolute bottom-0 w-full h-[12px] md:h-[18px] bg-gradient-to-b from-[#f0f0f0] to-[#a0a0a0] flex justify-center z-20 shadow-[0_-2px_10px_rgba(0,0,0,0.8)] border-t border-white/20">
                                            {/* Finger indentation */}
                                            <div className="w-[50px] md:w-[120px] h-[4px] md:h-[6px] bg-gradient-to-b from-[#808080] to-[#c0c0c0] rounded-b-md shadow-inner mt-px"></div>
                                        </div>
                                    </div>
                                ) : item.type === 'watch' ? (
                                    /* CSS Watch Frame */
                                    <div className="relative w-[220px] h-[260px] md:w-[280px] md:h-[340px] bg-[#222] rounded-[48px] md:rounded-[60px] border-[6px] md:border-[8px] border-[#333] shadow-[0_0_60px_rgba(0,0,0,0.4)] flex items-center justify-center overflow-visible">
                                        {/* Digital Crown */}
                                        <div className="absolute right-[-12px] md:right-[-16px] top-[22%] w-[8px] md:w-[10px] h-[36px] md:h-[44px] bg-[#444] rounded-r-md shadow-[inset_-2px_0_4px_rgba(0,0,0,0.5)] z-[-1]"></div>
                                        {/* Side Button */}
                                        <div className="absolute right-[-8px] md:right-[-10px] top-[55%] w-[4px] md:w-[6px] h-[40px] md:h-[50px] bg-[#333] rounded-r-sm shadow-[inset_-1px_0_2px_rgba(0,0,0,0.5)] z-[-1]"></div>
                                        
                                        {item.src ? (
                                            <div 
                                                className="w-[92%] h-[92%] rounded-[38px] md:rounded-[48px] overflow-y-auto overflow-x-hidden bg-black border-[4px] md:border-[6px] border-black overscroll-contain"
                                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                            >
                                                <img 
                                                    src={item.src} 
                                                    alt={`${project.name} Watch Screen ${index + 1}`} 
                                                    className="w-full h-auto object-top pointer-events-auto"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-[92%] h-[92%] rounded-[38px] md:rounded-[48px] overflow-hidden bg-zinc-900 border-[4px] md:border-[6px] border-black flex flex-col items-center justify-center">
                                                <h3 className="text-zinc-500 font-medium tracking-wide text-[10px] md:text-xs text-center">WATCH SCREEN</h3>
                                            </div>
                                        )}
                                    </div>
                                ) : item.type === 'tablet' ? (
                                    /* CSS Tablet Frame (iPad Pro style — landscape) */
                                    <div className="relative w-[560px] h-[400px] md:w-[720px] md:h-[520px] bg-[#2c2c2e] rounded-[24px] md:rounded-[32px] border-[4px] md:border-[6px] border-[#3a3a3c] shadow-[0_20px_80px_rgba(0,0,0,0.7)] flex items-center justify-center overflow-hidden">
                                        {/* Front camera (right side in landscape) */}
                                        <div className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#111] border border-[#222] z-20">
                                            <div className="w-1.5 h-1.5 bg-[#1a2b5e] rounded-full blur-[0.5px] mx-auto mt-[1px]"></div>
                                        </div>
                                        
                                        {item.src ? (
                                            <div 
                                                className="w-[95%] h-[94%] rounded-[16px] md:rounded-[22px] overflow-y-auto overflow-x-hidden bg-black border-[2px] md:border-[3px] border-black overscroll-contain"
                                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                            >
                                                <img 
                                                    src={item.src} 
                                                    alt={`${project.name} Poster`} 
                                                    className="w-full h-auto object-top pointer-events-auto"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-[95%] h-[94%] rounded-[16px] md:rounded-[22px] overflow-hidden bg-gradient-to-b from-zinc-800 to-zinc-900 flex flex-col items-center justify-center p-8 text-center border-[2px] md:border-[3px] border-black">
                                                <div className="w-16 h-16 border-2 border-dashed border-zinc-600 rounded-2xl mb-4 flex items-center justify-center opacity-50">
                                                    <svg className="w-8 h-8 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <h3 className="text-zinc-400 font-medium tracking-wide">POSTER</h3>
                                                <p className="text-zinc-500 text-sm mt-2 max-w-[200px]">Add your poster image here.</p>
                                            </div>
                                        )}

                                        {/* Home bar */}
                                        <div className="absolute bottom-2 md:bottom-3 left-1/2 -translate-x-1/2 w-[100px] md:w-[130px] h-[4px] md:h-[5px] bg-white/30 rounded-full z-20"></div>
                                    </div>
                                ) : (
                                    /* CSS Phone Frame (iPhone Pro Max style) */
                                    <div className="relative w-[320px] h-[680px] md:w-[410px] md:h-[880px] bg-black rounded-[45px] md:rounded-[60px] border-[6px] md:border-[10px] border-[#222] shadow-[0_0_80px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden">
                                        {/* Dynamic Island / Pill */}
                                        <div className="absolute top-3 md:top-4 left-1/2 -translate-x-1/2 w-24 md:w-32 h-7 md:h-9 bg-black rounded-full z-20 flex justify-end items-center pr-4">
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#0a0a0a] shadow-[inset_0_0_2px_rgba(255,255,255,0.1)]"></div>
                                        </div>
                                        
                                        {item.src ? (
                                            <div className="w-full h-full rounded-[38px] md:rounded-[48px] overflow-hidden bg-zinc-900 border-[3px] md:border-[5px] border-black">
                                                <img 
                                                    src={item.src} 
                                                    alt={`${project.name} Screen ${index + 1}`} 
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-full h-full rounded-[38px] md:rounded-[48px] bg-gradient-to-b from-zinc-800 to-zinc-900 flex flex-col items-center justify-center p-8 text-center border-[3px] md:border-[5px] border-black">
                                                <div className="w-16 h-16 border-2 border-dashed border-zinc-600 rounded-2xl mb-4 flex items-center justify-center opacity-50">
                                                    <svg className="w-8 h-8 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <h3 className="text-zinc-400 font-medium tracking-wide">SCREEN {index + 1}</h3>
                                                <p className="text-zinc-500 text-sm mt-2 max-w-[200px]">Add your mockup images here later.</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Interactive Custom Progress Control Bar — Fully Draggable */}
                    <div className="absolute flex flex-col items-center bottom-6 left-1/2 -translate-x-1/2 w-[80%] max-w-lg z-50">
                        <div className="flex justify-between w-full text-zinc-400 text-xs font-mono mb-2 uppercase px-1">
                            <span>Start</span>
                            <span>{galleryItems.length} Screens</span>
                            <span>End</span>
                        </div>
                        <div 
                            ref={barTrackRef}
                            className={`w-full h-4 bg-white/5 rounded-full backdrop-blur-md border border-white/10 cursor-grab active:cursor-grabbing shadow-[0_4px_20px_rgba(0,0,0,0.5)] group relative select-none touch-none ${isDragging ? 'ring-1 ring-[#ff4d2e]/40' : ''}`}
                            onPointerDown={handlePointerDown}
                            onPointerMove={handlePointerMove}
                            onPointerUp={handlePointerUp}
                            onPointerCancel={handlePointerUp}
                        >
                            {/* Thumb — no CSS transition so it tracks the pointer 1:1 */}
                            <div 
                                className={`absolute top-0.5 bottom-0.5 bg-gradient-to-r from-[#ff4d2e] to-[#ff2a00] rounded-full pointer-events-none ${isDragging ? 'brightness-125 shadow-[0_0_12px_rgba(255,77,46,0.6)]' : 'group-hover:brightness-110'}`}
                                style={{ 
                                    width: `${thumbWidthPct}%`, 
                                    left: `${thumbLeftPct}%`,
                                }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
