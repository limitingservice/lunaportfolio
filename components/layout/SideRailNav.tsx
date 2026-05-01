'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { useActiveSection } from '@/hooks/useActiveSection';

const navItems = [
    { id: 'about', label: 'ABOUT' },
    { id: 'work', label: 'WORK' },
    { id: 'process', label: 'PROCESS' },
    { id: 'contact', label: 'CONTACT' },
];

export default function SideRailNav() {
    const { scrollToSection } = useSmoothScroll();
    const ids = useMemo(() => navItems.map((i) => i.id), []);
    const activeSection = useActiveSection(ids);

    return (
        <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
            <div className="flex flex-col gap-8">
                {navItems.map((item, index) => {
                    const isActive = activeSection === item.id;
                    return (
                        <motion.button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
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
