import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '@/data/projects';
import FeaturedShoeViewer from '@/components/viewer/FeaturedShoeViewer';

interface HighlightedProjectProps {
    project: Project;
    onViewDetails: () => void;
}

export default function HighlightedProject({ project, onViewDetails }: HighlightedProjectProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-obsidian-800/50 rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 border border-obsidian-700 shadow-2xl mb-16 overflow-hidden"
        >
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left: Project Info */}
                <div className="space-y-6 order-2 lg:order-1">
                    <div>
                        <div className="text-xs text-gray-500 font-medium mb-2 uppercase tracking-wider">{project.year}</div>
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight break-words">{project.name}</h3>

                        {/* Research Specs — recruiter scan signal */}
                        {project.details && (
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-mono text-iridium-400/80 uppercase tracking-wider">
                                {project.details.role && (
                                    <span><span className="text-gray-500">Role:</span> {project.details.role}</span>
                                )}
                                {project.details.team && (
                                    <span><span className="text-gray-500">Team:</span> {project.details.team}</span>
                                )}
                                {project.details.participants && project.details.participants.length > 0 && (
                                    <span><span className="text-gray-500">Groups:</span> n={project.details.participants.length}</span>
                                )}
                            </div>
                        )}

                        {/* Method names — at-a-glance methodological breadth */}
                        {project.details?.researchMethods && project.details.researchMethods.length > 0 && (
                            <div className="text-xs font-mono text-iridium-400/80 uppercase tracking-wider mt-2 leading-relaxed">
                                <span className="text-gray-500">Methods:</span>{' '}
                                {project.details.researchMethods.map((m) => m.name).join(' · ')}
                            </div>
                        )}

                        {/* Stakeholder note — names who the research was for */}
                        {project.details?.stakeholderNote && (
                            <p className="text-xs text-gray-400 italic mt-2">{project.details.stakeholderNote}</p>
                        )}
                    </div>

                    {/* THE PROBLEM — primary visual anchor */}
                    {project.details?.problemStatement && (
                        <div className="p-5 bg-obsidian-900/60 border-l-4 border-gray-500 rounded-r-lg">
                            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">The Problem</div>
                            <p className="text-base text-gray-200 line-clamp-3">{project.details.problemStatement}</p>
                        </div>
                    )}

                    {/* THE OUTCOME — primary visual anchor */}
                    {project.details?.impact && project.details.impact.length > 0 && (
                        <div className="p-5 bg-iridium-500/5 border-l-4 border-iridium-500 rounded-r-lg">
                            <div className="text-[11px] font-bold text-iridium-500 uppercase tracking-wider mb-2">The Outcome</div>
                            <p className="text-base text-gray-200">{project.details.impact[0]}</p>
                        </div>
                    )}

                    <div className="pt-2">
                        <motion.button
                            onClick={onViewDetails}
                            className="px-8 py-4 metallic-bg text-[#0a0a0a] rounded-full font-black transition-all shadow-lg hover:brightness-110 flex items-center gap-3"
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
        </motion.div>
    );
}
