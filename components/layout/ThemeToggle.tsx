'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type Theme = 'dark' | 'light';

/**
 * Light/dark theme toggle. The initial theme is applied pre-paint by the
 * inline script in app/layout.tsx; this component reads it back, lets the
 * user flip it, and persists the choice to localStorage.
 */
export default function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>('dark');

    useEffect(() => {
        const current = (document.documentElement.getAttribute('data-theme') as Theme) || 'dark';
        setTheme(current);
    }, []);

    const toggle = () => {
        const next: Theme = theme === 'dark' ? 'light' : 'dark';
        setTheme(next);
        document.documentElement.setAttribute('data-theme', next);
        try {
            localStorage.setItem('theme', next);
        } catch {
            /* storage unavailable — toggle still works for the session */
        }
    };

    return (
        <motion.button
            onClick={toggle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-obsidian-700 text-gray-300 hover:text-white hover:border-iridium-500/50 transition-colors"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            {theme === 'dark' ? (
                /* Sun — click to go light */
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <circle cx="12" cy="12" r="4" />
                    <path strokeLinecap="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
            ) : (
                /* Moon — click to go dark */
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
            )}
        </motion.button>
    );
}
