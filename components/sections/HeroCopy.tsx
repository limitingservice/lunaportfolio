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
            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl md:text-hero font-black leading-none sm:leading-none md:leading-none break-words">
                <span className="text-white">MIXED-METHODS</span>
                <br />
                <span className="metallic-text pb-1">UX RESEARCH</span>
            </motion.h1>



            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-col xl:flex-row flex-wrap gap-2 md:gap-4 pt-2 md:pt-4">
                <motion.button
                    className="px-3 py-2 md:px-8 md:py-4 text-xs md:text-base metallic-bg text-[#0a0a0a] font-black rounded-xl hover:brightness-110 transition-all shadow-glow text-center"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 32px rgba(250, 188, 5, 0.4)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    VIEW CASE STUDIES
                </motion.button>

                <motion.button
                    className="px-3 py-2 md:px-8 md:py-4 text-xs md:text-base bg-transparent text-white font-bold rounded-xl border-2 border-white/30 hover:border-iridium-500 hover:text-iridium-500 transition-colors text-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.open('https://www.linkedin.com/in/fernandojluna/', '_blank')}
                >
                    VIEW LINKEDIN
                </motion.button>
            </motion.div>

            {/* Stats or highlights */}
            <motion.div variants={fadeInUp} className="hidden md:flex flex-col md:flex-row gap-3 md:gap-8 pt-4 md:pt-8">
                <div>
                    <div className="text-xl md:text-3xl font-bold metallic-text">5+</div>
                    <div className="text-[10px] md:text-sm text-gray-400 leading-tight">Mixed-Methods<br className="md:hidden" /> Studies</div>
                </div>
                <div>
                    <div className="text-xl md:text-3xl font-bold metallic-text">50+</div>
                    <div className="text-[10px] md:text-sm text-gray-400 leading-tight">Participants<br className="md:hidden" /> Interviewed</div>
                </div>
                <div>
                    <div className="text-xl md:text-3xl font-bold metallic-text">HCI</div>
                    <div className="text-[10px] md:text-sm text-gray-400 leading-tight">Master&apos;s<br className="md:hidden" /> Degree</div>
                </div>
            </motion.div>
        </motion.div>
    );
}
