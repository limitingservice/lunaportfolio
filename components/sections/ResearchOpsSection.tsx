'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/utils/animations';

const stackPillars = [
    {
        category: 'Qualitative Depth',
        accent: 'Where I lead',
        items: [
            'Semi-structured user interviews',
            'Contextual inquiry & field research',
            'Think-aloud usability testing',
            'Heuristic evaluation',
            'Affinity mapping & thematic coding',
            'Stakeholder & expert interviews',
        ],
    },
    {
        category: 'Quantitative Validation',
        accent: 'In service of the qualitative',
        items: [
            'Time-on-task & click-count analysis',
            'System Usability Scale (SUS)',
            'Confidence intervals',
            'Task completion rates',
            'Measurement planning',
        ],
    },
    {
        category: 'AI-Augmented Research',
        accent: 'Augmented, not automated',
        items: [
            'NotebookLM for qualitative synthesis',
            'Gemini for theoretical-framework application',
            'Confidence-band reliability framework',
            'AI trust & explainability validation',
            'Agentic AI feature testing',
        ],
    },
    {
        category: 'Operations & Ethics',
        accent: 'Research people can trust',
        items: [
            'IRB-aware research protocols',
            'IU research lab coordination',
            'Cross-role participant recruiting',
            'Multi-stakeholder facilitation',
            'GDPR-aware data handling',
        ],
    },
];

export default function ResearchOpsSection() {
    return (
        <section id="research-stack" className="py-20 px-4 md:px-8 lg:px-16 bg-obsidian-950">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={staggerContainer}
                className="max-w-7xl mx-auto"
            >
                <motion.div variants={fadeInUp} className="mb-12">
                    <h2 className="text-4xl md:text-display font-bold text-white mb-4">
                        Research <span className="metallic-text">Stack & Operations</span>
                    </h2>
                    <p className="text-base text-gray-400 max-w-3xl">
                        Qualitative-led mixed methods. I lead with depth — interviews, observation, synthesis — and bring quantitative methods in to validate, not to lead.
                    </p>
                </motion.div>

                <motion.div
                    variants={fadeInUp}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
                >
                    {stackPillars.map((pillar) => (
                        <div
                            key={pillar.category}
                            className="bg-obsidian-800/60 border border-obsidian-700 rounded-2xl p-6"
                        >
                            <div className="mb-4">
                                <div className="text-[11px] font-mono text-iridium-400/80 uppercase tracking-wider mb-1">
                                    {pillar.accent}
                                </div>
                                <h3 className="text-lg font-bold text-white leading-tight">{pillar.category}</h3>
                            </div>
                            <ul className="space-y-2">
                                {pillar.items.map((item) => (
                                    <li key={item} className="flex items-start gap-2 text-base text-gray-300">
                                        <span className="text-iridium-500 mt-1 flex-shrink-0">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}
