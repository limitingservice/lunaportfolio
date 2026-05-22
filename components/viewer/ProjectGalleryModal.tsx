'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/data/projects';
import dynamic from 'next/dynamic';

const PotsCane3DViewer = dynamic(() => import('./PotsCane3DViewer'), { ssr: false });

interface ProjectGalleryModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: Project | null;
    initialDevice?: 'phone' | 'watch' | 'laptop' | 'tablet' | null;
}

export default function ProjectGalleryModal({ isOpen, onClose, project, initialDevice }: ProjectGalleryModalProps) {
    useEffect(() => {
        if (isOpen && project) {
            document.body.style.overflow = 'hidden';
            
            // Build the virtual gallery items strictly to find target index
            const items: { type: string }[] = [];
            const mainType = project.viewer?.deviceType === 'laptop' ? 'laptop' : project.viewer?.deviceType === 'tablet' ? 'tablet' : project.viewer?.deviceType === 'watch' ? 'watch' : 'phone';
            const numScreens = Array.isArray(project.viewer?.screens) ? project.viewer.screens.length : 0;
            for(let i=0; i < numScreens; i++) items.push({ type: mainType });
            
            if (project.viewer?.deviceType === 'phone-watch' && Array.isArray(project.viewer?.watchScreens)) {
                for(let i=0; i < project.viewer.watchScreens.length; i++) items.push({ type: 'watch' });
            }

            if (Array.isArray(project.viewer?.tabletScreens)) {
                for(let i=0; i < project.viewer.tabletScreens.length; i++) items.push({ type: 'tablet' });
            }

            if (Array.isArray(project.viewer?.tablet3dModels)) {
                for(let i=0; i < project.viewer.tablet3dModels.length; i++) items.push({ type: 'tablet' });
            }
            
            let targetIndex = 0;
            if (initialDevice) {
                const found = items.findIndex(item => item.type === initialDevice);
                if (found !== -1) targetIndex = found;
            }

            // Use a short timeout so the DOM has rendered the gallery items
            requestAnimationFrame(() => {
                setTimeout(() => {
                    if (scrollContainerRef.current) {
                        const container = scrollContainerRef.current;
                        // Get only the snap-center elements (the slides)
                        const children = Array.from(container.children).filter(child => child.classList.contains('snap-center')) as HTMLElement[];
                        
                        if (children.length > targetIndex && targetIndex > 0) {
                            const targetChild = children[targetIndex];
                            // Center the item
                            const scrollPos = targetChild.offsetLeft - (container.clientWidth / 2) + (targetChild.clientWidth / 2);
                            container.scrollTo({ left: scrollPos, behavior: 'instant' });
                            
                            const maxScroll = container.scrollWidth - container.clientWidth;
                            setScrollProgress(maxScroll > 0 ? scrollPos / maxScroll : 0);
                        } else {
                            container.scrollTo({ left: 0, behavior: 'instant' });
                            setScrollProgress(0);
                        }
                    }
                }, 50); // slight delay to ensure flex layout finishes calculating widths
            });
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen, initialDevice, project]);

    // Ensure hooks are called unconditionally

    // Support mixed devices (phone + watch + tablet)
    const galleryItems: { src: string | null; type: 'phone' | 'laptop' | 'watch' | 'tablet'; modelId?: string }[] = [];
    const mainType = project?.viewer?.deviceType === 'laptop' ? 'laptop' : project?.viewer?.deviceType === 'tablet' ? 'tablet' : project?.viewer?.deviceType === 'watch' ? 'watch' : 'phone';
    
    const screens = Array.isArray(project?.viewer?.screens) ? project.viewer.screens : [];
    screens.forEach(src => galleryItems.push({ src, type: mainType }));
    
    if (project?.viewer?.deviceType === 'phone-watch' && Array.isArray(project.viewer?.watchScreens)) {
        project.viewer.watchScreens.forEach(src => galleryItems.push({ src, type: 'watch' }));
    }

    if (Array.isArray(project?.viewer?.tabletScreens)) {
        project.viewer.tabletScreens.forEach(src => galleryItems.push({ src, type: 'tablet' }));
    }

    if (Array.isArray(project?.viewer?.tablet3dModels)) {
        project.viewer.tablet3dModels.forEach(m => galleryItems.push({ src: null, type: 'tablet', modelId: m.id }));
    }
    
    // Show 3 placeholder slots only when there are no real screens to display.
    // Otherwise honor the actual screen count (e.g., a single poster shows one device).
    if (galleryItems.length === 0) {
        for (let i = 0; i < 3; i++) {
            galleryItems.push({ src: null, type: mainType });
        }
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

    // Translate vertical wheel/trackpad scrolling into horizontal scroll on the gallery.
    // Attach as a non-passive listener so we can preventDefault — React's onWheel is passive in some browsers.
    useEffect(() => {
        if (!isOpen) return;
        const el = scrollContainerRef.current;
        if (!el) return;

        const onWheel = (e: WheelEvent) => {
            const target = e.target as HTMLElement;
            const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX);
            
            // e.target might be a text node or not have closest method
            const element = target.nodeType === Node.TEXT_NODE ? target.parentElement : target;
            const scrollableContainer = element?.closest ? element.closest('.overflow-y-auto') : null;

            // If the user is scrolling vertically inside a scrollable container,
            // let the browser handle the scroll natively instead of translating it to horizontal scroll.
            if (isVerticalScroll && scrollableContainer) {
                return;
            }

            // If the user is already scrolling horizontally (e.g., shift+wheel or trackpad swipe),
            // let the browser handle it natively.
            const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
            if (horizontal === 0) return;
            e.preventDefault();
            // Disable snap during a wheel gesture so motion is smooth, not stepped.
            el.style.scrollSnapType = 'none';
            el.scrollLeft += horizontal;
        };

        el.addEventListener('wheel', onWheel, { passive: false });
        return () => el.removeEventListener('wheel', onWheel);
    }, [isOpen, galleryItems.length]);

    // Re-enable snap shortly after the user stops scrolling so the gallery settles on a screen.
    useEffect(() => {
        if (!isOpen) return;
        const el = scrollContainerRef.current;
        if (!el) return;

        let timeout: ReturnType<typeof setTimeout> | null = null;
        const onScrollEnd = () => {
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (!isDraggingRef.current) {
                    el.style.scrollSnapType = 'x mandatory';
                }
            }, 150);
        };

        el.addEventListener('scroll', onScrollEnd);
        return () => {
            el.removeEventListener('scroll', onScrollEnd);
            if (timeout) clearTimeout(timeout);
        };
    }, [isOpen]);

    const thumbWidthPct = Math.max(10, 100 / galleryItems.length);
    const thumbLeftPct = scrollProgress * (100 - thumbWidthPct);

    return (
        <AnimatePresence>
            {isOpen && project && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex flex-col bg-black/80 backdrop-blur-xl"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 md:p-10 shrink-0">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-light text-white mb-2">{project?.name}</h2>
                            <p className="text-gray-400 text-sm md:text-base max-w-2xl">{project?.shortDescription}</p>
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
                        className={`flex-1 overflow-x-auto overflow-y-hidden px-10 md:px-64 pb-24 pt-10 flex items-center gap-16 md:gap-32 snap-x snap-mandatory ${galleryItems.length === 1 ? 'justify-center' : ''}`}
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
                                    <div className="relative w-[320px] h-[210px] sm:w-[500px] sm:h-[320px] md:w-[640px] md:h-[420px] lg:w-[800px] lg:h-[520px] bg-[#d0d0d0] rounded-t-[10px] md:rounded-t-[20px] rounded-b-md border-[2px] md:border-[4px] border-[#999] shadow-[0_20px_80px_rgba(0,0,0,0.8)] flex flex-col items-center overflow-hidden">
                                        
                                        {/* Screen Bezel */}
                                        <div className="w-full h-[calc(100%-12px)] md:h-[calc(100%-18px)] bg-[#0a0a0a] flex flex-col items-center justify-center p-2 relative shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                                            
                                            {/* Camera notch slightly styled */}
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(100%+250px)] md:-translate-y-[calc(100%+230px)] w-2 h-2 rounded-full bg-[#111] flex items-center justify-center border border-[#222]">
                                                <div className="w-1 h-1 bg-[#1a2b5e] rounded-full drop-shadow-sm blur-[0.5px]"></div>
                                            </div>

                                            {item.src ? (
                                                <div 
                                                    className="w-full h-full bg-zinc-900 overflow-y-auto overflow-x-hidden overscroll-contain"
                                                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                                    data-lenis-prevent="true"
                                                >
                                                    <img 
                                                        src={item.src} 
                                                        alt={`${project?.name} Screen ${index + 1}`} 
                                                        className="w-full h-auto object-top pointer-events-auto"
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
                                    /* CSS Watch Frame (Dynamic sizing) */
                                    <div className="relative shrink-0 h-[30vh] min-h-[220px] max-h-[400px] aspect-[4/5] bg-[#222] rounded-[2rem] md:rounded-[3rem] border-[4px] md:border-[8px] border-[#333] shadow-[0_0_40px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-visible">
                                        {/* Digital Crown */}
                                        <div className="absolute right-[-8px] md:right-[-16px] top-[22%] w-[6px] md:w-[8px] h-[20%] bg-[#444] rounded-r-md shadow-[inset_-2px_0_4px_rgba(0,0,0,0.5)] z-[-1]"></div>
                                        {/* Side Button */}
                                        <div className="absolute right-[-6px] md:right-[-10px] top-[55%] w-[4px] md:w-[5px] h-[25%] bg-[#333] rounded-r-sm shadow-[inset_-1px_0_2px_rgba(0,0,0,0.5)] z-[-1]"></div>
                                        
                                        <div className="w-[92%] h-[92%] rounded-[1.5rem] md:rounded-[2.4rem] bg-black border-[3px] md:border-[6px] border-black overflow-hidden relative">
                                            {item.src ? (
                                                <div 
                                                    className="w-full h-full overflow-y-auto overflow-x-hidden overscroll-contain"
                                                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                                    data-lenis-prevent="true"
                                                >
                                                    <img 
                                                        src={item.src} 
                                                        alt={`${project?.name} Watch Screen ${index + 1}`} 
                                                        className="w-full h-auto pointer-events-auto object-top"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-center">
                                                    <span className="text-[10px] text-zinc-500 font-medium">WATCH</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : item.type === 'tablet' ? (
                                    /* CSS Tablet Frame (iPad Pro style — landscape) */
                                    <div className="relative w-[480px] h-[340px] md:w-[640px] md:h-[460px] lg:w-[760px] lg:h-[540px] bg-[#2c2c2e] rounded-[24px] md:rounded-[32px] border-[4px] md:border-[6px] border-[#3a3a3c] shadow-[0_20px_80px_rgba(0,0,0,0.7)] flex items-center justify-center overflow-hidden">
                                        {/* Front camera (right side in landscape) */}
                                        <div className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#111] border border-[#222] z-20">
                                            <div className="w-1.5 h-1.5 bg-[#1a2b5e] rounded-full blur-[0.5px] mx-auto mt-[1px]"></div>
                                        </div>
                                        
                                        {item.modelId === 'pots-cane' ? (
                                            <div
                                                className="w-[95%] h-[94%] rounded-[16px] md:rounded-[22px] overflow-hidden bg-black border-[2px] md:border-[3px] border-black"
                                                data-lenis-prevent="true"
                                            >
                                                <PotsCane3DViewer />
                                            </div>
                                        ) : item.src ? (
                                            <div
                                                className="w-[95%] h-[94%] rounded-[16px] md:rounded-[22px] overflow-y-auto overflow-x-hidden bg-black border-[2px] md:border-[3px] border-black overscroll-contain"
                                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                                data-lenis-prevent="true"
                                            >
                                                <img
                                                    src={item.src}
                                                    alt={`${project?.name} Poster`}
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
                                    /* CSS Phone Frame (iPhone Pro style with dynamic sizing) */
                                    <div className="relative shrink-0 h-[65vh] min-h-[450px] max-h-[820px] aspect-[393/852] bg-black rounded-[2.5rem] md:rounded-[3.2rem] border-[3px] md:border-[4px] border-[#444] shadow-[0_0_50px_rgba(0,0,0,0.6)] flex items-center justify-center">
                                        {/* Outer aluminum band effect */}
                                        <div className="absolute inset-[-4px] md:inset-[-6px] rounded-[2.6rem] md:rounded-[3.4rem] bg-gradient-to-br from-[#666] via-[#222] to-[#444] -z-10 shadow-[0_20px_40px_rgba(0,0,0,0.8)]"></div>

                                        {/* Hardware Buttons */}
                                        <div className="absolute left-[-7px] md:left-[-10px] top-[15%] w-[3px] md:w-[4px] h-[4%] bg-[#555] rounded-l-md shadow-[-1px_0_2px_rgba(0,0,0,0.5)]"></div> {/* Mute */}
                                        <div className="absolute left-[-7px] md:left-[-10px] top-[22%] w-[3px] md:w-[4px] h-[7%] bg-[#555] rounded-l-md shadow-[-1px_0_2px_rgba(0,0,0,0.5)]"></div> {/* Vol Up */}
                                        <div className="absolute left-[-7px] md:left-[-10px] top-[31%] w-[3px] md:w-[4px] h-[7%] bg-[#555] rounded-l-md shadow-[-1px_0_2px_rgba(0,0,0,0.5)]"></div> {/* Vol Down */}
                                        <div className="absolute right-[-7px] md:right-[-10px] top-[26%] w-[3px] md:w-[4px] h-[10%] bg-[#555] rounded-r-md shadow-[1px_0_2px_rgba(0,0,0,0.5)]"></div> {/* Power */}

                                        {/* Screen Bezel Area */}
                                        <div className="w-[calc(100%-12px)] h-[calc(100%-12px)] md:w-[calc(100%-16px)] md:h-[calc(100%-16px)] bg-black rounded-[2rem] md:rounded-[2.8rem] relative overflow-hidden flex flex-col items-center">
                                            
                                            {/* Dynamic Island */}
                                            <div className="absolute top-2 md:top-3 left-1/2 -translate-x-1/2 w-[32%] h-[3.5%] min-h-[22px] bg-black rounded-full z-20 flex justify-end items-center pr-2 md:pr-3 shadow-[0_0_2px_rgba(255,255,255,0.15)]">
                                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#0a0a0a] shadow-[inset_0_0_2px_rgba(255,255,255,0.2)]"></div>
                                            </div>

                                            {/* Scrollable Content */}
                                            {item.src ? (
                                                <div 
                                                    className="w-full h-full overflow-y-auto overflow-x-hidden overscroll-contain bg-zinc-900"
                                                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                                    data-lenis-prevent="true"
                                                >
                                                    <img 
                                                        src={item.src} 
                                                        alt={`${project?.name} Screen ${index + 1}`} 
                                                        className="w-full h-auto pointer-events-auto block"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-full h-full bg-zinc-900 flex flex-col items-center justify-center text-center p-8">
                                                    <div className="w-12 h-12 border-2 border-dashed border-zinc-600 rounded-xl mb-3 flex items-center justify-center opacity-50">
                                                        <svg className="w-6 h-6 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                    <h3 className="text-zinc-500 font-medium text-xs md:text-sm">SCREEN {index + 1}</h3>
                                                </div>
                                            )}

                                            {/* Home Bar */}
                                            <div className="absolute bottom-1.5 md:bottom-2 left-1/2 -translate-x-1/2 w-[35%] h-[4px] md:h-[5px] bg-white/40 rounded-full z-20 mix-blend-difference"></div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Interactive Custom Progress Control Bar — Fully Draggable */}
                    {galleryItems.length > 1 && (
                    <div className="absolute flex flex-col items-center bottom-6 left-1/2 -translate-x-1/2 w-[80%] max-w-lg z-50">
                        <div className="flex justify-between w-full text-zinc-400 text-xs font-mono mb-2 uppercase px-1">
                            <span>Start</span>
                            <span>{galleryItems.length} Screens</span>
                            <span>End</span>
                        </div>
                        <div 
                            ref={barTrackRef}
                            className={`w-full h-4 bg-white/5 rounded-full backdrop-blur-md border border-white/10 cursor-grab active:cursor-grabbing shadow-[0_4px_20px_rgba(0,0,0,0.5)] group relative select-none touch-none ${isDragging ? 'ring-1 ring-[#FABC05]/40' : ''}`}
                            onPointerDown={handlePointerDown}
                            onPointerMove={handlePointerMove}
                            onPointerUp={handlePointerUp}
                            onPointerCancel={handlePointerUp}
                        >
                            {/* Thumb — no CSS transition so it tracks the pointer 1:1 */}
                            <div
                                className={`absolute top-0.5 bottom-0.5 bg-gradient-to-r from-[#FABC05] to-[#E09B00] rounded-full pointer-events-none ${isDragging ? 'brightness-125 shadow-[0_0_12px_rgba(250,188,5,0.6)]' : 'group-hover:brightness-110'}`}
                                style={{
                                    width: `${thumbWidthPct}%`,
                                    left: `${thumbLeftPct}%`,
                                }}
                            />
                        </div>
                    </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
