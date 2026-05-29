'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/data/projects';

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    const modalRef = React.useRef<HTMLDivElement>(null);

    // Focus management: move focus into the dialog, trap it, and restore on close
    useEffect(() => {
        if (!isOpen) return;
        const previouslyFocused = document.activeElement as HTMLElement | null;
        const node = modalRef.current;
        node?.focus();

        const handleTab = (e: KeyboardEvent) => {
            if (e.key !== 'Tab' || !node) return;
            const focusables = node.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
            );
            if (focusables.length === 0) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };
        document.addEventListener('keydown', handleTab);
        return () => {
            document.removeEventListener('keydown', handleTab);
            previouslyFocused?.focus();
        };
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 overflow-y-auto" data-lenis-prevent="true">
                        <div className="min-h-screen px-4 py-8 flex items-center justify-center">
                            <motion.div
                                ref={modalRef}
                                role="dialog"
                                aria-modal="true"
                                aria-label={`${project.name} — project details`}
                                tabIndex={-1}
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                                className="relative w-full max-w-5xl bg-obsidian-900 rounded-2xl shadow-2xl border border-obsidian-700 max-h-[90vh] overflow-hidden focus:outline-none"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Close button */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-6 right-6 w-10 h-10 bg-obsidian-800 hover:bg-iridium-500 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors z-10"
                                    aria-label="Close modal"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                {/* Scrollable content */}
                                <div className="overflow-y-auto max-h-[90vh] p-8 lg:p-12" data-lenis-prevent="true">
                                    <div className="space-y-10">
                                            {/* Header */}
                                            <div className="mb-8">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="px-3 py-1 bg-iridium-500/20 text-iridium-500 rounded-lg text-sm font-bold">
                                                        {project.category}
                                                    </span>
                                                    <span className="text-gray-400">{project.year}</span>
                                                </div>
                                                <h2 className="text-4xl font-bold text-white mb-4">{project.name}</h2>
                                                {project.details?.role && (
                                                    <p className="text-base text-gray-300 mb-2">
                                                        <span className="text-iridium-500 font-semibold">Role:</span> {project.details.role}
                                                    </p>
                                                )}
                                                {project.details?.team && (
                                                    <p className="text-gray-400">
                                                        <span className="font-semibold">Team:</span> {project.details.team}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Context */}
                                            {project.details?.context && (
                                                <div className="mb-8">
                                                    <p className="text-gray-300 text-base">{project.details.context}</p>
                                                </div>
                                            )}

                                            {/* Problem Statement */}
                                            {project.details?.problemStatement && (
                                                <section className="mb-10">
                                                    <h3 className="text-2xl font-bold text-white mb-4">Problem Statement</h3>
                                                    <div className="bg-obsidian-800/50 border border-obsidian-700 rounded-xl p-6">
                                                        <p className="text-gray-300 leading-relaxed">{project.details.problemStatement}</p>
                                                    </div>
                                                </section>
                                            )}

                                            {/* Research Goals */}
                                            {project.details?.researchGoals && project.details.researchGoals.length > 0 && (
                                                <section className="mb-10">
                                                    <h3 className="text-2xl font-bold text-white mb-4">Research Goals</h3>
                                                    <ul className="space-y-3">
                                                        {project.details.researchGoals.map((goal, idx) => (
                                                            <li key={idx} className="flex items-start gap-3">
                                                                <span className="w-6 h-6 bg-iridium-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                                                                    {idx + 1}
                                                                </span>
                                                                <span className="text-gray-300">{goal}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </section>
                                            )}

                                            {/* Research Methods */}
                                            {project.details?.researchMethods && project.details.researchMethods.length > 0 && (
                                                <section className="mb-10">
                                                    <h3 className="text-2xl font-bold text-white mb-4">Research Methods</h3>
                                                    <div className="grid gap-4">
                                                        {project.details.researchMethods.map((method, idx) => (
                                                            <div key={idx} className="bg-obsidian-800/50 border border-obsidian-700 rounded-xl p-6">
                                                                <h4 className="text-lg font-bold metallic-text mb-2">{method.name}</h4>
                                                                <p className="text-gray-300">{method.description}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </section>
                                            )}

                                            {/* Participants */}
                                            {project.details?.participants && project.details.participants.length > 0 && (
                                                <section className="mb-10">
                                                    <h3 className="text-2xl font-bold text-white mb-4">Participants</h3>
                                                    <div className="grid md:grid-cols-3 gap-4">
                                                        {project.details.participants.map((participant, idx) => (
                                                            <div key={idx} className="bg-obsidian-800/50 border border-obsidian-700 rounded-xl p-5">
                                                                <h4 className="font-bold text-white mb-2">{participant.role}</h4>
                                                                <p className="text-base text-gray-400">{participant.description}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </section>
                                            )}

                                            {/* Key Findings */}
                                            {project.details?.keyFindings && project.details.keyFindings.length > 0 && (
                                                <section className="mb-10">
                                                    <h3 className="text-2xl font-bold text-white mb-4">Key Findings</h3>
                                                    <div className="space-y-6">
                                                        {project.details.keyFindings.map((finding, idx) => (
                                                            <div key={idx} className="bg-obsidian-800/50 border border-obsidian-700 rounded-xl p-6">
                                                                <h4 className="text-lg font-bold metallic-text mb-3">{finding.category}</h4>
                                                                <ul className="space-y-2">
                                                                    {finding.insights.map((insight, insightIdx) => (
                                                                        <li key={insightIdx} className="flex items-start gap-2">
                                                                            <span className="text-iridium-500 mt-1.5">•</span>
                                                                            <span className="text-gray-300">{insight}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </section>
                                            )}

                                            {/* Design Iterations */}
                                            {project.details?.designIterations && project.details.designIterations.length > 0 && (
                                                <section className="mb-10">
                                                    <h3 className="text-2xl font-bold text-white mb-4">Design Iterations</h3>
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        {project.details.designIterations.map((iteration, idx) => (
                                                            <div key={idx} className="bg-obsidian-800/50 border border-obsidian-700 rounded-xl p-6">
                                                                <h4 className="text-lg font-bold text-white mb-3">{iteration.area}</h4>
                                                                <ul className="space-y-2">
                                                                    {iteration.improvements.map((improvement, impIdx) => (
                                                                        <li key={impIdx} className="flex items-start gap-2">
                                                                            <span className="text-iridium-500 mt-1">✓</span>
                                                                            <span className="text-gray-300 text-sm">{improvement}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </section>
                                            )}

                                            {/* Impact */}
                                            {project.details?.impact && project.details.impact.length > 0 && (
                                                <section className="mb-10">
                                                    <h3 className="text-2xl font-bold text-white mb-4">Impact & Learnings</h3>
                                                    <div className="bg-gradient-to-br from-iridium-500/10 to-iridium-500/5 border border-iridium-500/30 rounded-xl p-6">
                                                        <ul className="space-y-3">
                                                            {project.details.impact.map((item, idx) => (
                                                                <li key={idx} className="flex items-start gap-3">
                                                                    <span className="text-iridium-500 text-xl">★</span>
                                                                    <span className="text-gray-200">{item}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </section>
                                            )}

                                            {/* Future Opportunities */}
                                            {project.details?.futureOpportunities && project.details.futureOpportunities.length > 0 && (
                                                <section className="mb-10">
                                                    <h3 className="text-2xl font-bold text-white mb-4">Future Opportunities</h3>
                                                    <div className="grid md:grid-cols-2 gap-3">
                                                        {project.details.futureOpportunities.map((opportunity, idx) => (
                                                            <div key={idx} className="bg-obsidian-800/30 border border-obsidian-700 rounded-lg p-4">
                                                                <p className="text-gray-300 text-base">{opportunity}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </section>
                                            )}

                                            {/* Skills Applied */}
                                            {project.details?.skillsApplied && project.details.skillsApplied.length > 0 && (
                                                <section className="mb-4">
                                                    <h3 className="text-2xl font-bold text-white mb-4">Skills & Methods Applied</h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {project.details.skillsApplied.map((skill, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="px-4 py-2 bg-iridium-500/10 text-iridium-400/80 rounded-lg border border-iridium-500/15 hover:border-iridium-500/40 hover:bg-iridium-500/15 transition-colors text-sm"
                                                            >
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </section>
                                            )}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
