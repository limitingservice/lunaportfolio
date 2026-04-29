'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '@/data/projects';

interface ViewerHUDProps {
    project: Project;
    className?: string;
}

export default function ViewerHUD({ project, className = '' }: ViewerHUDProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`${className}`}
        >
            <div className="space-y-2">
                {/* Project name */}
                <h3 className="text-xl md:text-2xl font-bold text-white">{project.name}</h3>

                {/* Metadata row */}
                <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="px-2 py-1 bg-obsidian-800 rounded text-iridium-500 font-medium">
                        {project.category}
                    </span>
                    <span>{project.year}</span>
                </div>

                {/* Tools used */}
                <div className="flex flex-wrap gap-2 mt-3">
                    {project.tools.map((tool) => (
                        <span
                            key={tool}
                            className="px-2 py-1 text-xs bg-obsidian-700/50 text-gray-300 rounded border border-obsidian-600"
                        >
                            {tool}
                        </span>
                    ))}
                </div>

                {/* Short description */}
                <p className="text-sm text-gray-400 mt-2 max-w-md">
                    {project.shortDescription}
                </p>
            </div>
        </motion.div>
    );
}
