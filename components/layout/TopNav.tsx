'use client';

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { useActiveSection } from '@/hooks/useActiveSection';

const navItems = [
    { id: 'about', label: 'ABOUT' },
    { id: 'work', label: 'WORK' },
    { id: 'process', label: 'PROCESS' },
    { id: 'contact', label: 'CONTACT' },
];

export default function TopNav() {
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
                        aria-label="Menu"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <span className={`w-6 h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`w-6 h-0.5 bg-white transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                        <span className={`w-6 h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </button>

                    <div className="text-lg md:text-xl font-bold text-white tracking-wide leading-tight">
                        <span className="text-iridium-500">Fernando</span><br className="md:hidden" /> Luna
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
                    <button
                        className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                        aria-label="Search"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>

                    <motion.a
                        href="/Fernando-Luna-Resume.pdf"
                        download="Fernando-Luna-Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 md:px-4 md:py-2 bg-iridium-500 text-white text-xs md:text-sm font-medium rounded-lg hover:bg-iridium-600 transition-colors flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
