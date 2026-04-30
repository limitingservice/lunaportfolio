'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/utils/animations';

const expertise = [
    'User Research',
    'Interaction Design',
    'Usability Testing',
    'Accessible Design',
    'Data Analysis',
    'Prototyping',
    'Wireframing',
    'User Interviews',
];

export default function AboutSection() {
    return (
        <section id="about" className="py-20 px-8 lg:px-16">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={staggerContainer}
                className="grid lg:grid-cols-2 gap-12 items-center"
            >
                {/* Left: Portrait */}
                <motion.div variants={fadeInUp} className="relative">
                    <div className="aspect-square bg-obsidian-800 rounded-2xl overflow-hidden border border-obsidian-700 relative">
                        <Image
                            src="/images/profile.jpg"
                            alt="Fernando Luna"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Decorative element */}
                    <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-iridium-500/20 rounded-full blur-2xl" />
                </motion.div>

                {/* Right: Bio */}
                <motion.div variants={fadeInUp} className="space-y-6">
                    <h2 className="text-display font-bold text-white">
                        About <span className="text-iridium-500">Me</span>
                    </h2>

                    <div className="space-y-4 text-gray-300">
                        <p>
                            I&apos;m a UX researcher and designer currently pursuing a Master&apos;s in Human-Computer Interaction
                            at Indiana University. My work focuses on accessible design, user research, and creating
                            inclusive digital experiences that address real user needs.
                        </p>
                        <p>
                            With experience as a Product Researcher at Darzy.ai and Research Assistant at Indiana University,
                            I specialize in conducting user interviews, usability testing, and data analysis to inform
                            design decisions. I&apos;ve worked on projects ranging from voice assistants for older adults to
                            museum interactive systems.
                        </p>
                        <p>
                            My approach combines quantitative and qualitative research methods with a deep understanding
                            of human factors, cognitive psychology, and accessibility compliance to create user-centered
                            solutions that make a meaningful impact.
                        </p>
                    </div>

                    {/* Expertise badges */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-400 uppercase mb-4">Core Expertise</h3>
                        <div className="flex flex-wrap gap-3">
                            {expertise.map((skill) => (
                                <motion.span
                                    key={skill}
                                    whileHover={{ scale: 1.05 }}
                                    className="px-4 py-2 bg-iridium-500/10 text-iridium-400/80 rounded-lg border border-iridium-500/15 hover:border-iridium-500/40 hover:bg-iridium-500/15 transition-colors"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </div>

                    {/* Social links */}
                    <div className="flex gap-4 pt-4">
                        <motion.a
                            href="https://www.linkedin.com/in/fernandojluna/"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 bg-obsidian-800 rounded-full flex items-center justify-center text-gray-400 hover:text-iridium-500 hover:bg-obsidian-700 transition-colors"
                        >
                            <span className="text-xs font-bold">L</span>
                        </motion.a>
                        <motion.a
                            href="https://lunafernando.myportfolio.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 bg-obsidian-800 rounded-full flex items-center justify-center text-gray-400 hover:text-iridium-500 hover:bg-obsidian-700 transition-colors"
                        >
                            <span className="text-xs font-bold">P</span>
                        </motion.a>
                        <motion.a
                            href="mailto:lunafernando@gmail.com"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 bg-obsidian-800 rounded-full flex items-center justify-center text-gray-400 hover:text-iridium-500 hover:bg-obsidian-700 transition-colors"
                        >
                            <span className="text-xs font-bold">E</span>
                        </motion.a>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
