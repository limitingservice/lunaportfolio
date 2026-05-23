'use client';

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { useActiveSection } from '@/hooks/useActiveSection';
import ThemeToggle from './ThemeToggle';

const navItems = [
    { id: 'about', label: 'ABOUT' },
    { id: 'work', label: 'WORK' },
    { id: 'process', label: 'PROCESS' },
    { id: 'contact', label: 'CONTACT' },
];

interface TopNavProps {
    onSwitchToPhoto?: () => void;
}

export default function TopNav({ onSwitchToPhoto }: TopNavProps = {}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollToSection } = useSmoothScroll();
    const ids = useMemo(() => navItems.map((i) => i.id), []);
    const activeSection = useActiveSection(ids);

    const handleNavClick = (id: string) => {
        scrollToSection(id);
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="sticky top-0 z-50 bg-obsidian-900/80 backdrop-blur-lg border-b border-obsidian-800">
            <div className="px-4 md:px-8 py-4 flex items-center justify-between relative z-10">
                {/* Left: Menu + Logo */}
                <div className="flex items-center gap-3 md:gap-4">
                    <button
                        className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 hover:opacity-70 transition-opacity"
                        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-menu"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <span className={`w-6 h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`w-6 h-0.5 bg-white transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                        <span className={`w-6 h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </button>

                    {/* Mobile: favicon logo */}
                    <svg
                        viewBox="0 0 64 64"
                        xmlns="http://www.w3.org/2000/svg"
                        className="md:hidden w-9 h-9"
                        role="img"
                        aria-label="Fernando Luna"
                    >
                        <defs>
                            <linearGradient id="navGoldShimmer" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#F59E0B" />
                                <stop offset="20%" stopColor="#FBBF24" />
                                <stop offset="50%" stopColor="#FEF08A">
                                    <animate attributeName="stop-color" values="#FBBF24;#FFFFFF;#FBBF24" dur="2s" repeatCount="indefinite" />
                                </stop>
                                <stop offset="80%" stopColor="#F59E0B" />
                                <stop offset="100%" stopColor="#D97706" />
                                <animate attributeName="x1" values="-100%;100%" dur="2.5s" repeatCount="indefinite" />
                                <animate attributeName="x2" values="0%;200%" dur="2.5s" repeatCount="indefinite" />
                            </linearGradient>
                            <radialGradient id="navCraterGrad" cx="35%" cy="35%" r="65%">
                                <stop offset="0%" stopColor="#000000" stopOpacity="0.8" />
                                <stop offset="40%" stopColor="#000000" stopOpacity="0.2" />
                                <stop offset="80%" stopColor="#FBBF24" stopOpacity="0.1" />
                                <stop offset="100%" stopColor="#FEF08A" stopOpacity="0.7" />
                            </radialGradient>
                            <clipPath id="navMoonClip">
                                <circle cx="40" cy="32" r="14" />
                            </clipPath>
                        </defs>
                        <rect width="64" height="64" rx="14" fill="transparent" />
                        {/* F */}
                        <path d="M 10 18 L 22 18 L 22 22 L 14 22 L 14 28 L 20 28 L 20 32 L 14 32 L 14 46 L 10 46 Z" fill="url(#navGoldShimmer)" />

                        {/* Rotating Full Moon */}
                        <g>
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                from="0 40 32"
                                to="360 40 32"
                                dur="40s"
                                repeatCount="indefinite"
                            />
                            {/* Full Moon base */}
                            <circle cx="40" cy="32" r="14" fill="url(#navGoldShimmer)" />

                            {/* Moon textures & craters */}
                            <g clipPath="url(#navMoonClip)">
                                <path d="M 32 18 Q 42 16 50 26 T 38 40 Q 28 32 32 18 Z" fill="#000000" opacity="0.12" />
                                <path d="M 34 42 Q 44 48 48 38 Q 38 36 34 42 Z" fill="#000000" opacity="0.15" />
                                <path d="M 28 26 Q 34 22 36 28 Q 30 32 28 26 Z" fill="#000000" opacity="0.12" />
                                <circle cx="34" cy="24" r="3" fill="url(#navCraterGrad)" />
                                <circle cx="46" cy="28" r="4" fill="url(#navCraterGrad)" />
                                <circle cx="39" cy="41" r="3.5" fill="url(#navCraterGrad)" />
                                <circle cx="39" cy="31" r="1.5" fill="url(#navCraterGrad)" />
                                <circle cx="51" cy="36" r="2.5" fill="url(#navCraterGrad)" />
                                <circle cx="31" cy="33" r="1.5" fill="url(#navCraterGrad)" />
                                <circle cx="44" cy="35" r="2" fill="url(#navCraterGrad)" />
                                <circle cx="48" cy="25" r="1.2" fill="url(#navCraterGrad)" />
                                <circle cx="35" cy="45" r="2" fill="url(#navCraterGrad)" />
                            </g>
                        </g>
                    </svg>

                    {/* Desktop: name */}
                    <div className="hidden md:block text-lg md:text-xl font-bold text-white tracking-wide leading-tight">
                        <span className="text-iridium-500">Fernando</span> Luna
                    </div>
                </div>

                {/* Center: Main navigation */}
                <div className="hidden lg:flex items-center gap-8">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleNavClick(item.id)}
                            className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors"
                        >
                            {item.label}
                            {activeSection === item.id && (
                                <motion.div
                                    layoutId="activeNav"
                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-iridium-500"
                                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Right: Icons */}
                <div className="flex items-center gap-2 md:gap-4">
                    <ThemeToggle />

                    {onSwitchToPhoto && (
                        <motion.button
                            onClick={onSwitchToPhoto}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-iridium-500/40 text-iridium-500 hover:text-white hover:bg-iridium-500/15 hover:border-iridium-500 transition-colors text-[10px] md:text-xs font-medium tracking-widest uppercase"
                            aria-label="Switch to creative portfolio"
                            title="Creative portfolio"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l1.8 5.4 5.4 1.8-5.4 1.8L12 17.4l-1.8-5.4-5.4-1.8 5.4-1.8L12 3z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 16l.7 2.3 2.3.7-2.3.7L19 22l-.7-2.3-2.3-.7 2.3-.7L19 16z" />
                            </svg>
                            <span className="hidden sm:inline">Creative</span>
                        </motion.button>
                    )}

                    <motion.a
                        href="/FerLuna-Resume.pdf"
                        download="FerLuna-Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 md:px-4 md:py-2 bg-iridium-500 text-white text-xs md:text-sm font-medium rounded-lg hover:bg-iridium-600 transition-colors flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="hidden sm:inline">Download </span>CV
                    </motion.a>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        id="mobile-menu"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="lg:hidden absolute top-full left-0 w-full bg-obsidian-900 border-b border-obsidian-800 shadow-xl"
                    >
                        <div className="flex flex-col py-4 px-4 gap-4">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavClick(item.id)}
                                    className={`text-left text-sm font-medium transition-colors ${
                                        activeSection === item.id ? 'text-iridium-500' : 'text-gray-300 hover:text-white'
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
