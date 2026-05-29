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
                <div className="space-y-8 order-2 lg:order-1">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 bg-iridium-500/20 text-iridium-500 text-sm font-bold rounded-full uppercase tracking-wider">
                                Featured Highlight
                            </span>
                            <span className="text-gray-400 font-medium">{project.category} • {project.year}</span>
                        </div>
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight break-words">{project.name}</h3>
                        <p className="text-base text-gray-300 leading-relaxed">
                            {project.description}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Key Highlights</h4>
                        <ul className="space-y-3">
                            {project.details?.keyFindings?.slice(0, 3).map((finding, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-gray-300">
                                    <svg className="w-5 h-5 text-iridium-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span><strong className="text-white">{finding.category}:</strong> {finding.insights[0]}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

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
