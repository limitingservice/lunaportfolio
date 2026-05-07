'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

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

export default function HeroAboutCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full bg-obsidian-900/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative"
        >
            {/* Top decorative gradient glow */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-iridium-500/0 via-iridium-500 to-iridium-500/0 opacity-50" />
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-iridium-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="p-6 md:p-8 relative z-10 flex flex-col h-full">
                {/* Header: Photo + Title */}
                <div className="flex flex-col xl:flex-row items-center xl:items-start gap-3 sm:gap-6 mb-4 md:mb-8 text-center xl:text-left">
                    <div className="relative w-16 h-16 sm:w-24 sm:h-24 md:w-56 md:h-56 rounded-full xl:rounded-3xl overflow-hidden border-2 md:border-4 border-iridium-500/30 flex-shrink-0 shadow-[0_0_30px_rgba(250,188,5,0.2)]">
                        <Image
                            src="/images/profile.jpg"
                            alt="Fernando Luna"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="flex flex-col justify-center min-w-0 flex-1">
                        <h2 className="text-lg sm:text-2xl md:text-4xl font-bold text-white mb-0.5 md:mb-1.5 leading-tight break-words">
                            Fernando <span className="text-iridium-500">Luna</span>
                        </h2>
                        <p className="text-gray-400 text-[10px] sm:text-xs md:text-base font-semibold tracking-wider uppercase">UX Researcher</p>
                    </div>
                </div>

                {/* Bio text */}
                <div className="space-y-2 md:space-y-4 text-gray-300 text-[10px] sm:text-sm md:text-lg leading-tight md:leading-relaxed mb-4 md:mb-8 flex-grow">
                    <p>
                        Designing human-centered experiences through research, blending tech, culture, and history—pulling from HCI, AI, and fashion to create accessible, thoughtful, and real-world impact.
                    </p>
                </div>

                {/* Expertise */}
                <div className="mb-4 md:mb-8">
                    <h3 className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 md:mb-3 hidden sm:block">Core Expertise</h3>
                    <div className="flex flex-wrap gap-1 md:gap-2">
                        {expertise.slice(0, 4).map((skill) => (
                            <span
                                key={skill}
                                className="px-1.5 py-1 md:px-3 md:py-1.5 bg-obsidian-800 text-gray-300 text-[9px] md:text-xs rounded border border-obsidian-700 hover:border-iridium-500 hover:text-white transition-colors"
                            >
                                {skill}
                            </span>
                        ))}
                        <span className="px-1.5 py-1 md:hidden bg-obsidian-800 text-gray-300 text-[9px] rounded border border-obsidian-700">+4 more</span>
                        {expertise.slice(4).map((skill) => (
                            <span
                                key={skill}
                                className="hidden md:inline-flex px-3 py-1.5 bg-obsidian-800 text-gray-300 text-xs rounded-lg border border-obsidian-700 hover:border-iridium-500 hover:text-white transition-colors"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Quick Contact Footer */}
                <div className="pt-3 md:pt-6 border-t border-white/10 flex flex-col xl:flex-row xl:items-center justify-between gap-3 md:gap-4">
                    <div className="text-[10px] md:text-sm text-gray-400 font-medium hidden sm:block">Quick Contact</div>
                    <div className="flex items-center gap-2 md:gap-3 justify-center xl:justify-end w-full">
                        <motion.a
                            href="https://www.linkedin.com/in/fernandojluna/"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-8 h-8 md:w-10 md:h-10 bg-obsidian-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-iridium-500 transition-colors shadow-sm"
                            title="LinkedIn"
                        >
                            <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </motion.a>
                        <motion.a
                            href="https://www.instagram.com/oldamericangoods/"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-8 h-8 md:w-10 md:h-10 bg-obsidian-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-iridium-500 transition-colors shadow-sm"
                            title="Instagram"
                        >
                            <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                        </motion.a>
                        <motion.a
                            href="mailto:lunajfernando@gmail.com"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-3 py-1.5 md:px-5 md:py-2.5 metallic-bg text-obsidian-950 text-[10px] md:text-sm font-black rounded-full hover:brightness-110 transition-all flex items-center gap-1.5 md:gap-2 shadow-[0_0_15px_rgba(250,188,5,0.3)]"
                        >
                            <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Email
                        </motion.a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
