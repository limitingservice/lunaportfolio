'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/utils/animations';
import { projects } from '@/data/projects';

export default function CaseStudySection() {
    const featuredCaseStudies = projects.filter(p => p.caseStudy);

    return (
        <section id="case-studies" className="py-20 px-8 lg:px-16">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={fadeInUp}
            >
                <h2 className="text-display font-bold text-white mb-4">
                    Case <span className="text-orange-500">Studies</span>
                </h2>
                <p className="text-gray-400 mb-12 max-w-2xl">
                    Deep dives into my design process, from initial concept to final product.
                </p>

                <div className="space-y-16">
                    {featuredCaseStudies.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-navy-800/50 rounded-2xl p-8 border border-navy-700"
                        >
                            <div className="grid lg:grid-cols-2 gap-8">
                                {/* Left: Project info */}
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-3xl font-bold text-white mb-2">{project.name}</h3>
                                        <p className="text-orange-500 font-medium">{project.category} • {project.year}</p>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-bold text-gray-400 uppercase mb-2">The Challenge</h4>
                                        <p className="text-gray-300">{project.caseStudy?.problem}</p>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-bold text-gray-400 uppercase mb-2">Approach</h4>
                                        <p className="text-gray-300">{project.caseStudy?.approach}</p>
                                    </div>

                                    {project.caseStudy?.outcome && (
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-400 uppercase mb-2">Outcome</h4>
                                            <p className="text-gray-300">{project.caseStudy.outcome}</p>
                                        </div>
                                    )}

                                    <div className="flex flex-wrap gap-2">
                                        {project.tools.map((tool) => (
                                            <span
                                                key={tool}
                                                className="px-3 py-1 bg-orange-500/10 border border-orange-500/15 text-orange-400/80 rounded-lg text-sm"
                                            >
                                                {tool}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Right: Visual */}
                                <div className="bg-navy-700 rounded-xl aspect-square relative overflow-hidden">
                                    {project.caseStudyImage || project.logo ? (
                                        <Image
                                            src={project.caseStudyImage || project.logo!}
                                            alt={`${project.name} preview`}
                                            fill
                                            className={`${project.caseStudyImage ? 'object-contain' : 'object-cover'} hover:scale-105 transition-transform duration-500`}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-navy-600">
                                            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 3.6v8.72c0 4.35-3 8.38-7 9.67V4.18z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
