'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

export default function SideRailNav() {
    const [activeSection, setActiveSection] = useState('case-studies');
    const { scrollToSection } = useSmoothScroll();

    const navItems = [
        { id: 'case-studies', label: 'CASE STUDIES' },
        { id: 'materials', label: 'MATERIALS' },
        { id: 'prototyping', label: 'PROTOTYPING' },
        { id: 'faq', label: 'FAQ' },
    ];

    const handleNavClick = (id: string) => {
        setActiveSection(id);
        scrollToSection(id);
    };

    return (
        <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
            <div className="flex flex-col gap-8">
                {navItems.map((item, index) => (
                    <motion.button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className="group relative"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div
                            className="text-xs font-medium tracking-wider text-gray-500 hover:text-iridium-500 transition-colors"
                            style={{
                                writingMode: 'vertical-rl',
                                textOrientation: 'mixed',
                            }}
                        >
                            {item.label}
                        </div>

                        {activeSection === item.id && (
                            <motion.div
                                layoutId="activeSideNav"
                                className="absolute -right-2 top-0 bottom-0 w-0.5 bg-iridium-500"
                                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                            />
                        )}
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
