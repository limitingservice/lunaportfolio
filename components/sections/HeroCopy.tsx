'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/utils/animations';

export default function HeroCopy() {
    return (
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-6"
        >
            {/* Main headline */}
            <motion.h1 variants={fadeInUp} className="text-hero font-black leading-none break-words">
                <span className="text-white">DATA-</span>
                <br />
                <span className="text-white">DRIVEN</span>
                <br />
                <span className="text-orange-500">RESEARCH & DESIGN</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p variants={fadeInUp} className="text-xl text-gray-300 max-w-lg">
                Let me help you research and design it.
                <br />
                <span className="text-gray-400">
                    Specialized in UX research, accessible design, and human-computer interaction.
                </span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-4">
                <motion.button
                    className="px-8 py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-glow"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 32px rgba(255, 77, 46, 0.4)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    VIEW CASE STUDIES
                </motion.button>

                <motion.button
                    className="px-8 py-4 bg-transparent text-white font-bold rounded-xl border-2 border-white/30 hover:border-orange-500 hover:text-orange-500 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.open('https://www.linkedin.com/in/fernandojluna/', '_blank')}
                >
                    VIEW LINKEDIN
                </motion.button>
            </motion.div>

            {/* Stats or highlights */}
            <motion.div variants={fadeInUp} className="flex gap-8 pt-8">
                <div>
                    <div className="text-3xl font-bold text-orange-500">5+</div>
                    <div className="text-sm text-gray-400">Research Projects</div>
                </div>
                <div>
                    <div className="text-3xl font-bold text-orange-500">4+</div>
                    <div className="text-sm text-gray-400">Combined Years of Experience</div>
                </div>
                <div>
                    <div className="text-3xl font-bold text-orange-500">HCI</div>
                    <div className="text-sm text-gray-400">Master's Degree</div>
                </div>
            </motion.div>
        </motion.div>
    );
}
