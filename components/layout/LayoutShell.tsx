'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LayoutShellProps {
    children: React.ReactNode;
}

export default function LayoutShell({ children }: LayoutShellProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-silver-200 via-silver-100 to-silver-50 relative overflow-hidden">
            {/* Animated background blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 left-10 w-96 h-96 bg-iridium-400/30 rounded-full blur-3xl"
                    animate={{
                        x: [0, 30, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <motion.div
                    className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-iridium-300/20 rounded-full blur-3xl"
                    animate={{
                        x: [0, -40, 0],
                        y: [0, 30, 0],
                        scale: [1, 0.9, 1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 1,
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/3 w-64 h-64 bg-silver-400/40 rounded-full blur-3xl"
                    animate={{
                        x: [0, 20, 0],
                        y: [0, 40, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 9,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 2,
                    }}
                />
            </div>

            {/* Main container */}
            <div className="relative z-10 container mx-auto px-0 py-0 sm:px-4 sm:py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-gradient-to-br from-obsidian-900 to-obsidian-950 rounded-none sm:rounded-3xl shadow-2xl overflow-hidden min-h-screen sm:min-h-0"
                >
                    {children}
                </motion.div>
            </div>
        </div>
    );
}
