'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import ScrollStack, { ScrollStackItem } from '@/components/effects/ScrollStack';

const processSteps = [
    {
        number: '01',
        icon: '🎯',
        eyebrow: 'Phase · Framing',
        headline: 'Plan the Question',
        description:
            "Good research starts with the right question, not the right method. I work with the team to frame what we're trying to learn, agree on scope and what success looks like, and pick methods that fit — qualitative for the why, quantitative for the how much.",
        highlights: ['Research Planning', 'Stakeholder Alignment', 'Method Selection', 'Success Criteria'],
    },
    {
        number: '02',
        icon: '🔍',
        eyebrow: 'Phase · Fieldwork',
        headline: 'Gather Evidence',
        description:
            "Mixed-methods studies designed to fit the question — interviews, observational task analysis, think-aloud testing, heuristic evaluation, and field research with people who don't use products the way designers do. Recruitment is intentional. Ethics are upstream of the protocol, not after.",
        highlights: ['Mixed-Methods Studies', 'Observational Task Analysis', 'Think-Aloud Testing', 'Ethical Recruitment'],
    },
    {
        number: '03',
        icon: '🧩',
        eyebrow: 'Phase · Translation',
        headline: 'Synthesize & Share',
        description:
            "Raw data isn't insight. I cluster observations through affinity mapping, code findings thematically, and translate patterns into recommendations the team can move on. Then I share the findings the way they'll actually land — workshops, readouts, and stories instead of static decks.",
        highlights: ['Affinity Mapping', 'Thematic Analysis', 'Stakeholder Readouts', 'Actionable Recommendations'],
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
                        UX Research <span className="text-iridium-500">Process</span>
                    </h2>
                    <p className="text-gray-400 max-w-3xl text-base">
                        How I move from a fuzzy question to something a team can act on — three phases, designed to fit how research actually shows up in product work.
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
                                            {step.eyebrow}
                                        </span>
                                        <h3 className="text-2xl md:text-3xl font-bold text-white mt-1">
                                            {step.headline}
                                        </h3>
                                    </div>

                                    <p className="text-gray-300 text-base leading-relaxed max-w-2xl">
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

                {/* Final closer card — Why Research Earns Its Place */}
                <ScrollStackItem>
                    <div className="bg-obsidian-800 border border-iridium-500/20 rounded-3xl lg:rounded-[40px] h-full w-full p-8 md:p-12 flex flex-col justify-center">
                        <div className="max-w-3xl mx-auto text-center space-y-6">
                            <h3 className="text-3xl md:text-4xl font-bold text-white">
                                What it&apos;s <span className="text-iridium-500">all for</span>
                            </h3>
                            <p className="text-base text-gray-300 leading-relaxed">
                                <strong className="text-white">A researcher&apos;s portfolio should reveal how they think</strong>, not just what they shipped.
                            </p>
                            <p className="text-base text-gray-400 leading-relaxed">
                                Every phase here is built to <strong className="text-iridium-500">make the next product decision a little better than the last one</strong> — methods chosen to fit the question, findings translated into actions a team can defend, impact measured against a real baseline.
                            </p>
                            <div className="flex flex-wrap justify-center gap-3 pt-4">
                                <span className="inline-block px-6 py-3 bg-iridium-500/10 border border-iridium-500/20 text-iridium-400 rounded-full text-sm font-bold uppercase tracking-wider">
                                    Question-First
                                </span>
                                <span className="inline-block px-6 py-3 bg-iridium-500/10 border border-iridium-500/20 text-iridium-400 rounded-full text-sm font-bold uppercase tracking-wider">
                                    Mixed-Methods
                                </span>
                                <span className="inline-block px-6 py-3 bg-iridium-500/10 border border-iridium-500/20 text-iridium-400 rounded-full text-sm font-bold uppercase tracking-wider">
                                    Decision-Ready
                                </span>
                            </div>
                        </div>
                    </div>
                </ScrollStackItem>
            </ScrollStack>
        </section>
    );
}
