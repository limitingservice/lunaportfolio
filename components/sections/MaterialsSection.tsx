'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import ScrollStack, { ScrollStackItem } from '@/components/effects/ScrollStack';

const processSteps = [
    {
        number: '01',
        icon: '📊',
        label: 'User & Performance Data',
        headline: 'Understanding the Problem Space',
        description:
            'Every design begins with understanding. I conduct biomechanical testing, user interviews, and performance benchmarking to uncover the real needs behind the brief.',
        highlights: ['User Interviews', 'Competitive Analysis', 'Data Synthesis'],
    },
    {
        number: '02',
        icon: '⚖️',
        label: 'Constraints & Requirements',
        headline: 'Defining the Boundaries',
        description:
            'Great design works within constraints. I map weight limits, cost thresholds, manufacturing feasibility, and sustainability goals to define the solution space.',
        highlights: ['Feasibility Mapping', 'Requirement Analysis', 'Stakeholder Alignment'],
    },
    {
        number: '03',
        icon: '🔬',
        label: 'Evaluation & Ideation',
        headline: 'Exploring Possibilities',
        description:
            'I evaluate material properties, interaction patterns, and design options against the established requirements — turning data into informed creative directions.',
        highlights: ['Heuristic Evaluation', 'Design Exploration', 'Criteria Scoring'],
    },
    {
        number: '04',
        icon: '🛠️',
        label: 'Prototyping & Iteration',
        headline: 'Building to Learn',
        description:
            'Through rapid prototyping and iterative refinement, I test multiple approaches — each cycle informed by real feedback and measurable outcomes.',
        highlights: ['Rapid Prototyping', 'A/B Testing', 'Iterative Refinement'],
    },
    {
        number: '05',
        icon: '✓',
        label: 'Validation & Delivery',
        headline: 'Proving the Solution',
        description:
            'The final stage validates every decision through user testing, feedback loops, and real-world performance — ensuring evidence backs every design choice.',
        highlights: ['Usability Testing', 'User Feedback Loops', 'Impact Measurement'],
    },
];

export default function MaterialsSection() {
    return (
        <section id="materials" className="bg-navy-900/30">
            {/* Section Header - outside the scroll stack */}
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                className="px-4 md:px-8 lg:px-16 pt-12 md:pt-20 pb-4"
            >
                <motion.div variants={fadeInUp} className="mb-4">
                    <h2 className="text-4xl md:text-display font-bold text-white mb-4">
                        Research & Design <span className="text-orange-500">Process</span>
                    </h2>
                    <p className="text-gray-400 max-w-3xl text-base md:text-lg">
                        How research insights, testing data, and performance constraints inform design decisions.
                        Scroll to explore each phase.
                    </p>
                </motion.div>
            </motion.div>

            {/* ScrollStack cards */}
            <ScrollStack
                itemDistance={80}
                itemScale={0.04}
                itemStackDistance={35}
                stackPosition="25%"
                scaleEndPosition="12%"
                baseScale={0.88}
                scaleDuration={0.5}
                rotationAmount={0}
                blurAmount={2}
                useWindowScroll={true}
            >
                {processSteps.map((step, index) => (
                    <ScrollStackItem key={step.number}>
                        <div className="bg-navy-800 border border-navy-700 rounded-3xl lg:rounded-[40px] h-full w-full p-8 md:p-12 flex flex-col justify-center">
                            <div className="grid md:grid-cols-[auto_1fr] gap-8 items-center">
                                {/* Left: Number + Icon */}
                                <div className="flex md:flex-col items-center gap-4">
                                    <div className="text-6xl md:text-7xl font-black text-orange-500/20 leading-none">
                                        {step.number}
                                    </div>
                                    <div className="w-14 h-14 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-center justify-center text-2xl">
                                        {step.icon}
                                    </div>
                                </div>

                                {/* Right: Content */}
                                <div className="space-y-4">
                                    <div>
                                        <span className="text-orange-400/80 text-sm font-bold uppercase tracking-wider">
                                            {step.label}
                                        </span>
                                        <h3 className="text-2xl md:text-3xl font-bold text-white mt-1">
                                            {step.headline}
                                        </h3>
                                    </div>

                                    <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl">
                                        {step.description}
                                    </p>

                                    {/* Highlights as tags */}
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {step.highlights.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 bg-orange-500/10 border border-orange-500/15 text-orange-400/80 rounded-lg text-sm"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollStackItem>
                ))}

                {/* Final "Why This Matters" card */}
                <ScrollStackItem>
                    <div className="bg-navy-800 border border-orange-500/20 rounded-3xl lg:rounded-[40px] h-full w-full p-8 md:p-12 flex flex-col justify-center">
                        <div className="max-w-3xl mx-auto text-center space-y-6">
                            <h3 className="text-3xl md:text-4xl font-bold text-white">
                                Why This <span className="text-orange-500">Matters</span>
                            </h3>
                            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                                <strong className="text-white">Research-driven design</strong> transforms assumptions into evidence.
                                Every design choice represents validated decisions — balancing user needs,
                                performance requirements, and real-world constraints.
                            </p>
                            <p className="text-base text-gray-400 leading-relaxed">
                                This process demonstrates <strong className="text-orange-500">UX research methodology</strong> applied
                                to product design: gathering data, identifying constraints, evaluating options,
                                prototyping solutions, and validating outcomes through iterative testing.
                            </p>
                            <div className="pt-4">
                                <span className="inline-block px-6 py-3 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-full text-sm font-bold uppercase tracking-wider">
                                    Evidence-Based Design Decisions
                                </span>
                            </div>
                        </div>
                    </div>
                </ScrollStackItem>
            </ScrollStack>
        </section>
    );
}
