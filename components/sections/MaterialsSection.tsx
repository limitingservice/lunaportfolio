'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import ScrollStack, { ScrollStackItem } from '@/components/effects/ScrollStack';

const processSteps = [
    {
        number: '01',
        icon: '🧠',
        label: 'Understanding People & Context',
        headline: 'Understanding People & Context',
        description:
            'Every meaningful design begins with people. I investigate user behaviors, lived experiences, and the systems surrounding them—grounding insights in both qualitative and quantitative data. At the same time, I map real-world constraints to ensure solutions are not just desirable, but viable and responsible.',
        highlights: ['User Interviews', 'Behavioral Research', 'Data Synthesis', 'Constraint Mapping', 'Stakeholder Alignment', 'Feasibility Analysis'],
    },
    {
        number: '02',
        icon: '💡',
        label: 'Framing & Exploring Solutions',
        headline: 'Framing & Exploring Solutions',
        description:
            'With a clear understanding of needs and constraints, I translate insights into opportunities. I explore interaction patterns, evaluate design directions, and test ideas against defined criteria—turning ambiguity into intentional, informed concepts.',
        highlights: ['Design Exploration', 'Heuristic Evaluation', 'Criteria Scoring', 'Interaction Modeling', 'Concept Validation'],
    },
    {
        number: '03',
        icon: '🔄',
        label: 'Prototyping, Testing & Iteration',
        headline: 'Prototyping, Testing & Iteration',
        description:
            'I bring ideas to life through rapid prototyping and continuous testing. Each iteration is shaped by real user feedback and measurable outcomes—ensuring the final solution is not only usable, but meaningful and effective in context.',
        highlights: ['Rapid Prototyping', 'Usability Testing', 'A/B Testing', 'Iterative Refinement', 'Impact Measurement'],
    },
];

export default function MaterialsSection() {
    return (
        <section id="materials" className="bg-obsidian-900/30">
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
                        Research & Design <span className="text-iridium-500">Process</span>
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
                        <div className="bg-obsidian-800 border border-obsidian-700 rounded-3xl lg:rounded-[40px] h-full w-full p-8 md:p-12 flex flex-col justify-center">
                            <div className="grid md:grid-cols-[auto_1fr] gap-8 items-center">
                                {/* Left: Number + Icon */}
                                <div className="flex md:flex-col items-center gap-4">
                                    <div className="text-6xl md:text-7xl font-black text-iridium-500/20 leading-none">
                                        {step.number}
                                    </div>
                                    <div className="w-14 h-14 bg-iridium-500/10 border border-iridium-500/20 rounded-2xl flex items-center justify-center text-2xl">
                                        {step.icon}
                                    </div>
                                </div>

                                {/* Right: Content */}
                                <div className="space-y-4">
                                    <div>
                                        <span className="text-iridium-400/80 text-sm font-bold uppercase tracking-wider">
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
                                                className="px-3 py-1 bg-iridium-500/10 border border-iridium-500/15 text-iridium-400/80 rounded-lg text-sm"
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
                    <div className="bg-obsidian-800 border border-iridium-500/20 rounded-3xl lg:rounded-[40px] h-full w-full p-8 md:p-12 flex flex-col justify-center">
                        <div className="max-w-3xl mx-auto text-center space-y-6">
                            <h3 className="text-3xl md:text-4xl font-bold text-white">
                                Why This <span className="text-iridium-500">Matters</span>
                            </h3>
                            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                                <strong className="text-white">Great design isn&apos;t just about solving problems</strong>—it&apos;s about
                                solving the right problems, for the people most affected.
                            </p>
                            <p className="text-base text-gray-400 leading-relaxed">
                                This approach ensures every decision is grounded in real human needs, shaped by constraints,
                                and validated through evidence. By balancing empathy with rigor, I create solutions that are
                                not only functional, but <strong className="text-iridium-500">responsible, scalable, and impactful</strong> in the real world.
                            </p>
                            <div className="flex flex-wrap justify-center gap-3 pt-4">
                                <span className="inline-block px-6 py-3 bg-iridium-500/10 border border-iridium-500/20 text-iridium-400 rounded-full text-sm font-bold uppercase tracking-wider">
                                    Human-Centered
                                </span>
                                <span className="inline-block px-6 py-3 bg-iridium-500/10 border border-iridium-500/20 text-iridium-400 rounded-full text-sm font-bold uppercase tracking-wider">
                                    Evidence-Driven
                                </span>
                                <span className="inline-block px-6 py-3 bg-iridium-500/10 border border-iridium-500/20 text-iridium-400 rounded-full text-sm font-bold uppercase tracking-wider">
                                    Outcome-Focused
                                </span>
                            </div>
                        </div>
                    </div>
                </ScrollStackItem>
            </ScrollStack>
        </section>
    );
}
