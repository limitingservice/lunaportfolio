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
            className="w-full bg-navy-900/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative"
        >
            {/* Top decorative gradient glow */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500/0 via-orange-500 to-orange-500/0 opacity-50" />
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="p-6 md:p-8 relative z-10 flex flex-col h-full">
                {/* Header: Photo + Title */}
                <div className="flex items-center gap-6 mb-6 md:mb-8">
                    <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-2xl md:rounded-3xl overflow-hidden border-2 border-orange-500/30 flex-shrink-0 shadow-[0_0_20px_rgba(255,77,46,0.2)]">
                        <Image
                            src="/images/profile.jpg"
                            alt="Fernando Luna"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-1.5">
                            Fernando <span className="text-orange-500">Luna</span>
                        </h2>
                        <p className="text-gray-400 text-sm md:text-base font-semibold tracking-wider uppercase">UX Researcher & Designer</p>
                    </div>
                </div>

                {/* Bio text */}
                <div className="space-y-3 text-gray-300 text-sm md:text-base leading-relaxed mb-8 flex-grow">
                    <p>
                        I'm a UX researcher and designer holding a Master's in Human-Computer Interaction
                        from Indiana University. My work focuses on accessible design, user research, and creating
                        inclusive digital experiences that address real user needs.
                    </p>
                    <p>
                        With experience as a Product Researcher at Darzy.ai and Research Assistant at Indiana University,
                        I specialize in conducting user interviews, usability testing, and data analysis to inform
                        design decisions. I've worked on projects ranging from voice assistants for older adults to
                        museum interactive systems.
                    </p>
                </div>

                {/* Expertise */}
                <div className="mb-8">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Core Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                        {expertise.map((skill) => (
                            <span
                                key={skill}
                                className="px-3 py-1.5 bg-navy-800 text-gray-300 text-xs rounded-lg border border-navy-700 hover:border-orange-500 hover:text-white transition-colors"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Quick Contact Footer */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-sm text-gray-400 font-medium">Quick Contact</div>
                    <div className="flex items-center gap-3">
                        <motion.a
                            href="https://www.linkedin.com/in/fernandojluna/"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 bg-navy-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-orange-500 transition-colors shadow-sm"
                            title="LinkedIn"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </motion.a>
                        <motion.a
                            href="https://www.instagram.com/oldamericangoods/"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 bg-navy-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-orange-500 transition-colors shadow-sm"
                            title="Instagram"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </motion.a>
                        <motion.a
                            href="mailto:lunajfernando@gmail.com"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-orange-500 text-white text-sm font-bold rounded-full hover:bg-orange-600 transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(255,77,46,0.3)]"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Email Me
                        </motion.a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
