'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/data/projects';
import FeaturedShoeViewer from '@/components/viewer/FeaturedShoeViewer';

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
    initialView?: 'brief' | 'full';
}

export default function ProjectModal({ project, isOpen, onClose, initialView = 'brief' }: ProjectModalProps) {
    const [showFullDetails, setShowFullDetails] = React.useState(false);

    // Reset state when modal opens/closes
    useEffect(() => {
        if (isOpen) setShowFullDetails(initialView === 'full');
    }, [isOpen, project?.id, initialView]);

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
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                                className="relative w-full max-w-5xl bg-obsidian-900 rounded-2xl shadow-2xl border border-obsidian-700 max-h-[90vh] overflow-hidden"
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
                                    {!showFullDetails ? (
                                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                                            {/* Left: Project Info */}
                                            <div className="space-y-8 order-2 lg:order-1">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <span className="px-3 py-1 bg-iridium-500/20 text-iridium-500 text-sm font-bold rounded-full uppercase tracking-wider">
                                                            {project.category}
                                                        </span>
                                                        <span className="text-gray-400 font-medium">{project.year}</span>
                                                    </div>
                                                    <h3 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">{project.name}</h3>
                                                    <p className="text-xl text-gray-300 leading-relaxed">
                                                        {project.description}
                                                    </p>
                                                </div>

                                                {project.details?.keyFindings && project.details.keyFindings.length > 0 && (
                                                    <div className="space-y-4">
                                                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Key Highlights</h4>
                                                        <ul className="space-y-3">
                                                            {project.details.keyFindings.slice(0, 3).map((finding, idx) => (
                                                                <li key={idx} className="flex items-start gap-3 text-gray-300">
                                                                    <svg className="w-5 h-5 text-iridium-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                    </svg>
                                                                    <span><strong className="text-white">{finding.category}:</strong> {finding.insights[0]}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                <div className="flex flex-wrap gap-2 pt-2">
                                                    {project.tools.map((tool) => (
                                                        <span
                                                            key={tool}
                                                            className="px-3 py-1 bg-iridium-500/10 border border-iridium-500/15 text-iridium-400/80 rounded-lg text-sm"
                                                        >
                                                            {tool}
                                                        </span>
                                                    ))}
                                                </div>

                                                <div className="pt-4">
                                                    <motion.button
                                                        onClick={() => setShowFullDetails(true)}
                                                        className="px-8 py-4 metallic-bg text-obsidian-950 rounded-full font-black transition-all shadow-lg hover:brightness-110 flex items-center gap-3"
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                    >
                                                        <span>Explore Full Case Study</span>
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                        </svg>
                                                    </motion.button>
                                                </div>
                                            </div>

                                            {/* Right: 3D Viewer */}
                                            <div className="order-1 lg:order-2 w-full">
                                                <FeaturedShoeViewer 
                                                    projects={[project]} 
                                                    showHUD={false}
                                                    className="!mb-0" 
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-10">
                                            <motion.button
                                                onClick={() => setShowFullDetails(false)}
                                                className="flex items-center gap-2 text-gray-400 hover:text-iridium-500 transition-colors mb-6 group"
                                                whileHover={{ x: -4 }}
                                            >
                                                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                                </svg>
                                                <span className="font-medium">Back to Overview</span>
                                            </motion.button>

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
                                                    <p className="text-xl text-gray-300 mb-2">
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
                                                    <p className="text-gray-300 text-lg">{project.details.context}</p>
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
                                                                <p className="text-sm text-gray-400">{participant.description}</p>
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
                                                                <p className="text-gray-300 text-sm">{opportunity}</p>
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
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
