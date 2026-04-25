'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/utils/animations';

const processSteps = [
    {
        icon: '📊',
        label: 'User & Performance Data',
        description: 'Biomechanical testing, user interviews, and performance benchmarking',
    },
    {
        icon: '⚖️',
        label: 'Constraints',
        description: 'Weight limits, cost thresholds, manufacturing feasibility, sustainability goals',
    },
    {
        icon: '🔬',
        label: 'Material Evaluation',
        description: 'Testing material properties against performance requirements',
    },
    {
        icon: '🛠️',
        label: 'Prototyping',
        description: 'Iterative design with multiple material combinations',
    },
    {
        icon: '✓',
        label: 'Validation',
        description: 'Wear testing, A/B comparisons, and user feedback loops',
    },
];


export default function MaterialsSection() {
    return (
        <section id="materials" className="py-8 md:py-12 px-4 md:px-8 lg:px-16 bg-navy-900/30">
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
            >
                {/* Section Header */}
                <motion.div variants={fadeInUp} className="mb-6 md:mb-8">
                    <h2 className="text-4xl md:text-display font-bold text-white mb-3 md:mb-4">
                        Research & Design <span className="text-orange-500">Process</span>
                    </h2>
                    <p className="text-gray-400 max-w-3xl text-base md:text-lg">
                        How research insights, testing data, and performance constraints inform design decisions.
                    </p>
                </motion.div>

                {/* Process Boxes */}
                <motion.div variants={fadeInUp} className="mb-6 md:mb-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
                        {processSteps.map((step, index) => (
                            <motion.div
                                key={step.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-navy-800 border-2 border-navy-700 rounded-xl p-4 md:p-6"
                            >
                                {/* Icon */}
                                <div className="w-10 h-10 md:w-12 md:h-12 mb-2 md:mb-3 bg-navy-700 rounded-lg flex items-center justify-center text-xl md:text-2xl">
                                    {step.icon}
                                </div>

                                {/* Label */}
                                <div className="text-xs md:text-sm font-bold text-white mb-1 md:mb-2">
                                    {step.label}
                                </div>

                                {/* Description */}
                                <div className="text-[10px] md:text-xs text-gray-400 leading-relaxed">
                                    {step.description}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Why This Matters - Research/Design Scope */}
                <motion.div
                    variants={fadeInUp}
                    className="p-6 md:p-8 bg-navy-800/50 border-2 border-navy-700 rounded-2xl"
                >
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
                        Why This <span className="text-orange-500">Matters</span>
                    </h3>
                    <div className="space-y-3 md:space-y-4 text-gray-300 leading-relaxed">
                        <p className="text-base md:text-lg">
                            <strong className="text-white">Research-driven design</strong> transforms assumptions into evidence.
                            Every material choice represents a series of validated decisions—balancing user needs,
                            performance requirements, and real-world constraints.
                        </p>
                        <p className="text-sm md:text-base">
                            This process demonstrates <strong className="text-orange-500">UX research methodology</strong> applied
                            to product design: gathering data through biomechanical testing and user feedback, identifying constraints,
                            evaluating options against criteria, prototyping solutions, and validating outcomes through iterative testing.
                        </p>
                        <p className="text-sm md:text-base">
                            The result is <strong className="text-white">evidence-based design decisions</strong> that directly impact
                            user experience—from comfort and performance to durability and satisfaction.
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
