'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const navItems = [
    { id: 'case-studies', label: 'CASE STUDIES' },
    { id: 'materials', label: 'MATERIALS' },
    { id: 'prototyping', label: 'PROTOTYPING' },
    { id: 'faq', label: 'FAQ' },
];

export default function SideRailNav() {
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const { scrollToSection } = useSmoothScroll();

    useEffect(() => {
        const sections = navItems
            .map(({ id }) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null);

        if (sections.length === 0) return;

        const updateActive = () => {
            const viewportMid = window.scrollY + window.innerHeight / 2;
            let bestId: string | null = null;
            let bestDistance = Infinity;

            for (const el of sections) {
                const rect = el.getBoundingClientRect();
                const top = rect.top + window.scrollY;
                const bottom = top + rect.height;
                if (viewportMid >= top && viewportMid <= bottom) {
                    bestId = el.id;
                    bestDistance = 0;
                    break;
                }
                const distance = Math.min(
                    Math.abs(viewportMid - top),
                    Math.abs(viewportMid - bottom)
                );
                if (distance < bestDistance) {
                    bestDistance = distance;
                    bestId = el.id;
                }
            }

            setActiveSection(bestId);
        };

        updateActive();
        window.addEventListener('scroll', updateActive, { passive: true });
        window.addEventListener('resize', updateActive);

        return () => {
            window.removeEventListener('scroll', updateActive);
            window.removeEventListener('resize', updateActive);
        };
    }, []);

    const handleNavClick = (id: string) => {
        scrollToSection(id);
    };

    return (
        <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
            <div className="flex flex-col gap-8">
                {navItems.map((item, index) => {
                    const isActive = activeSection === item.id;
                    return (
                        <motion.button
                            key={item.id}
                            onClick={() => handleNavClick(item.id)}
                            className="group relative"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <motion.span
                                aria-hidden
                                className="absolute -right-2 top-0 bottom-0 w-0.5 bg-iridium-500 rounded-full origin-center"
                                initial={false}
                                animate={{
                                    scaleY: isActive ? 1 : 0,
                                    opacity: isActive ? 1 : 0,
                                }}
                                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                            />
                            <div
                                className={`text-xs font-medium tracking-wider transition-colors ${
                                    isActive
                                        ? 'text-iridium-500'
                                        : 'text-gray-500 hover:text-iridium-400'
                                }`}
                                style={{
                                    writingMode: 'vertical-rl',
                                    textOrientation: 'mixed',
                                }}
                            >
                                {item.label}
                            </div>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
