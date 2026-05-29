'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '@/data/projects';
import Image from 'next/image';

interface ProjectCardRowProps {
    projects: Project[];
    className?: string;
    onProjectClick?: (project: Project) => void;
}

export default function ProjectCardRow({ projects, className = '', onProjectClick }: ProjectCardRowProps) {
    return (
        <div className={`${className}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        onClick={() => onProjectClick?.(project)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                onProjectClick?.(project);
                            }
                        }}
                        role="button"
                        tabIndex={0}
                        aria-label={`View details for ${project.name}`}
                        className="group relative bg-obsidian-800 rounded-2xl overflow-hidden cursor-pointer border border-obsidian-700 hover:border-iridium-500/50 transition-all"
                    >
                        {/* Thumbnail */}
                        <div className="aspect-square bg-obsidian-700 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-iridium-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            {/* Logo or placeholder */}
                            {project.logo ? (
                                <div className="absolute inset-0">
                                    <Image
                                        src={project.logo}
                                        alt={`${project.name} logo`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <svg className="w-16 h-16 text-obsidian-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 3.6v8.72c0 4.35-3 8.38-7 9.67V4.18z" />
                                    </svg>
                                </div>
                            )}


                        </div>

                        {/* Content */}
                        <div className="p-4 space-y-2">
                            <h3 className="font-bold text-white group-hover:text-iridium-500 transition-colors">
                                {project.name}
                            </h3>

                            <p className="text-base text-gray-400 line-clamp-2">
                                {project.shortDescription}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 pt-2">
                                {project.tags.slice(0, 2).map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-1 text-xs bg-iridium-500/10 text-iridium-400/80 rounded border border-iridium-500/15"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                            <span className="metallic-text font-medium text-sm">View Details →</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
