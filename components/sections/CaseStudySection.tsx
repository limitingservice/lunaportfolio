'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/utils/animations';
import { projects, Project } from '@/data/projects';
import FeaturedShoeViewer from '@/components/viewer/FeaturedShoeViewer';

interface CaseStudySectionProps {
    onViewDetails?: (project: Project) => void;
}

export default function CaseStudySection({ onViewDetails }: CaseStudySectionProps) {
    const featuredCaseStudies = projects.filter(p => p.poster);

    return (
        <section id="case-studies" className="py-20 px-4 md:px-8 lg:px-16">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={fadeInUp}
            >
                <h2 className="text-4xl md:text-display font-bold text-white mb-4">
                    Case <span className="metallic-text">Studies</span>
                </h2>
                <p className="text-gray-400 mb-12 max-w-2xl text-base">
                    Deep dives into my research process. Click the poster to explore, or view the full case study.
                </p>

                <div className="space-y-16">
                    {featuredCaseStudies.map((project, index) => {
                        // Create a virtual project config for the 3D tablet viewer
                        const tabletProject: Project = {
                            ...project,
                            viewer: {
                                type: '3d' as const,
                                deviceType: 'tablet' as const,
                                screens: project.poster ? [project.poster] : [],
                            },
                        };

                        return (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className="bg-obsidian-800/50 rounded-3xl p-6 md:p-8 lg:p-12 border border-obsidian-700 shadow-2xl overflow-hidden"
                            >
                                <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 items-center">
                                    {/* Left: Project Info */}
                                    <div className="space-y-6 order-2 lg:order-1">
                                        <div>
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="px-3 py-1 bg-iridium-500/20 text-iridium-500 text-sm font-bold rounded-full uppercase tracking-wider">
                                                    {project.category}
                                                </span>
                                                <span className="text-gray-400 font-medium">{project.year}</span>
                                            </div>
                                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight break-words">
                                                {project.name}
                                            </h3>
                                            <p className="text-gray-300 text-base leading-relaxed">
                                                {project.shortDescription}
                                            </p>
                                        </div>

                                        {/* Tool tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {project.tools.slice(0, 5).map((tool) => (
                                                <span
                                                    key={tool}
                                                    className="px-3 py-1 bg-iridium-500/10 border border-iridium-500/15 text-iridium-400/80 rounded-lg text-sm"
                                                >
                                                    {tool}
                                                </span>
                                            ))}
                                        </div>

                                        {/* CTA Button */}
                                        <div className="pt-2">
                                            <motion.button
                                                onClick={() => onViewDetails?.(project)}
                                                className="px-8 py-4 metallic-bg text-[#0a0a0a] rounded-full font-black transition-all shadow-lg hover:brightness-110 flex items-center gap-3"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <span>View Full Case Study</span>
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </motion.button>
                                        </div>
                                    </div>

                                    {/* Right: 3D Tablet Viewer with poster */}
                                    <div className="order-1 lg:order-2 w-full">
                                        <FeaturedShoeViewer
                                            projects={[tabletProject]}
                                            showHUD={false}
                                            showExploreButton={false}
                                            showDragHint={true}
                                            className="!mb-0"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        </section>
    );
}
