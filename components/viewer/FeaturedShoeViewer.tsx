'use client';

import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Project } from '@/data/projects';
import ViewerHUD from './ViewerHUD';
import ProjectGalleryModal from './ProjectGalleryModal';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const ThreeModelViewer = dynamic(() => import('./ThreeModelViewer'), {
    ssr: false,
    loading: () => <ViewerSkeleton />,
});

function ViewerSkeleton() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-zinc-900/50 rounded-[40px] md:border border-white/5">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-[#FABC05] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-400 font-medium tracking-wide text-sm">Loading Hero Device...</p>
            </div>
        </div>
    );
}

interface FeaturedShoeViewerProps {
    projects: Project[];
    className?: string;
    showHUD?: boolean;
    showExploreButton?: boolean;
    showDragHint?: boolean;
}

export default function FeaturedShoeViewer({ projects, className = '', showHUD = true, showExploreButton = true, showDragHint }: FeaturedShoeViewerProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [initialGalleryDevice, setInitialGalleryDevice] = useState<'phone'|'watch'|'laptop'|'tablet'|null>(null);

    const currentProject = projects[currentIndex];

    const handlePrevProject = () => {
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

    const handleNextProject = () => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    };

    return (
        // Device viewer always renders in dark — it presents product mockups, not site chrome
        <div data-theme="dark" className={`relative w-full max-w-full ${className}`}>
            {/* Background embellishment */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-full max-w-full bg-gradient-radial from-[#ffffff05] to-transparent rounded-full blur-3xl opacity-50"></div>
            </div>

            {/* Main viewer area */}
            <div className="relative">
                {/* 3D Viewer Container */}
                <div className="relative h-[420px] sm:h-[480px] md:h-[650px] mb-6 group cursor-grab active:cursor-grabbing rounded-[28px] md:rounded-[40px] overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#121212] border border-white/5 shadow-2xl">
                    <Suspense fallback={<ViewerSkeleton />}>
                        {currentProject.viewer.type === '3d' ? (
                            <ThreeModelViewer
                                screens={currentProject.viewer.screens}
                                watchScreens={currentProject.viewer.watchScreens}
                                deviceType={currentProject.viewer.deviceType || 'phone'}
                                onScreenClick={(clickedDeviceType) => {
                                    setInitialGalleryDevice(clickedDeviceType as any || null);
                                    setIsGalleryOpen(true);
                                }}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center p-10">
                                <img
                                    src={currentProject.images.hero}
                                    alt={currentProject.name}
                                    className="max-w-full max-h-full object-contain filter drop-shadow-2xl rounded-2xl"
                                />
                            </div>
                        )}
                    </Suspense>

                    {/* Explore Mockups Button */}
                    {showExploreButton && (
                    <div className="absolute bottom-14 md:bottom-20 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center opacity-90 hover:opacity-100 transition-opacity max-w-[calc(100%-1.5rem)]">
                        <motion.button
                            onClick={() => {
                                setInitialGalleryDevice(null);
                                setIsGalleryOpen(true);
                            }}
                            className="px-5 py-3 md:px-8 md:py-4 metallic-bg text-[#0a0a0a] rounded-full font-black transition-all shadow-glow flex items-center gap-2 hover:brightness-110"
                            whileHover={{ scale: 1.05, boxShadow: '0 0 32px rgba(250, 188, 5, 0.4)' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <svg className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                            <span className="whitespace-nowrap uppercase tracking-widest text-[11px] md:text-[13px]">EXPLORE MOCKUPS</span>
                        </motion.button>
                        <span className="text-[10px] text-gray-300 mt-3 md:mt-4 uppercase tracking-[0.2em] font-medium flex items-center gap-2 drop-shadow-md text-center">
                            <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" />
                            </svg>
                            Drag device to rotate
                        </span>
                    </div>
                    )}

                    {/* Standalone drag hint (no explore button) */}
                    {!showExploreButton && showDragHint && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
                        <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-medium flex items-center gap-2 drop-shadow-md">
                            <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                            </svg>
                            Click screen to expand
                        </span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-medium flex items-center gap-2 drop-shadow-md">
                            <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" />
                            </svg>
                            Drag device to rotate
                        </span>
                    </div>
                    )}

                    {/* Project navigation arrows */}
                    {projects.length > 1 && (
                        <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                             <span className="text-[10px] font-bold uppercase tracking-wider text-[#FABC05] bg-[#FABC05]/10 px-3 py-1 rounded-full border border-[#FABC05]/20 w-fit">
                                Projects {currentIndex + 1} / {projects.length}
                            </span>
                        </div>
                    )}
                    
                    {projects.length > 1 && (
                        <>
                            <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10">
                                <motion.button
                                    onClick={handlePrevProject}
                                    className="w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-[#FABC05] transition-colors border border-white/10 backdrop-blur-sm"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </motion.button>
                            </div>

                            <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10">
                                <motion.button
                                    onClick={handleNextProject}
                                    className="w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-[#FABC05] transition-colors border border-white/10 backdrop-blur-sm"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </motion.button>
                            </div>
                        </>
                    )}
                </div>

                {/* Project metadata HUD */}
                {showHUD && <ViewerHUD project={currentProject} />}
            </div>

            {/* Immersive Screens Gallery */}
            <ProjectGalleryModal
                isOpen={isGalleryOpen}
                onClose={() => setIsGalleryOpen(false)}
                project={currentProject}
                initialDevice={initialGalleryDevice}
            />
        </div>
    );
}
