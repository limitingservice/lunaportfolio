'use client';

import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CaseStudyAccordionProps {
    id: string;
    icon: string;
    title: string;
    preview: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}

const CaseStudyAccordion = forwardRef<HTMLDivElement, CaseStudyAccordionProps>(function CaseStudyAccordion(
    { id, icon, title, preview, isOpen, onToggle, children },
    ref,
) {
    return (
        <div
            id={id}
            ref={ref}
            className="bg-obsidian-800/40 border border-obsidian-700 rounded-2xl overflow-hidden scroll-mt-24"
        >
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={isOpen}
                aria-controls={`${id}-content`}
                className="w-full flex items-center gap-4 px-5 md:px-6 py-5 text-left transition-colors hover:bg-obsidian-800/60"
            >
                <span className="text-2xl md:text-3xl flex-shrink-0 leading-none" aria-hidden="true">
                    {icon}
                </span>
                <div className="flex-1 min-w-0">
                    <div className="text-xl md:text-2xl font-bold text-white leading-tight">{title}</div>
                    <div className="text-sm text-gray-400 mt-1 leading-snug">{preview}</div>
                </div>
                <motion.svg
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="w-5 h-5 text-iridium-400 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content"
                        id={`${id}-content`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 md:px-6 pb-6 pt-2 border-t border-obsidian-700/60">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
});

export default CaseStudyAccordion;
