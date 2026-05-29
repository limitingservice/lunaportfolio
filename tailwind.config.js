/** @type {import('tailwindcss').Config} */
module.exports = {
    future: {
        hoverOnlyWhenSupported: true,
    },
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Theme-aware text tokens (flip with [data-theme])
                white: 'rgb(var(--color-white) / <alpha-value>)',
                gray: {
                    200: 'rgb(var(--gray-200) / <alpha-value>)',
                    300: 'rgb(var(--gray-300) / <alpha-value>)',
                    400: 'rgb(var(--gray-400) / <alpha-value>)',
                },
                silver: {
                    50: '#f8f9fa',
                    100: '#f1f3f5',
                    200: '#e9ecef',
                    300: '#dee2e6',
                    400: '#ced4da',
                    500: '#adb5bd',
                    600: '#868e96',
                    700: '#495057',
                    800: '#343a40',
                    900: '#212529',
                },
                // Theme-aware neutral surface scale (flips with [data-theme])
                obsidian: {
                    50: 'rgb(var(--obsidian-50) / <alpha-value>)',
                    100: 'rgb(var(--obsidian-100) / <alpha-value>)',
                    200: 'rgb(var(--obsidian-200) / <alpha-value>)',
                    300: 'rgb(var(--obsidian-300) / <alpha-value>)',
                    400: 'rgb(var(--obsidian-400) / <alpha-value>)',
                    500: 'rgb(var(--obsidian-500) / <alpha-value>)',
                    600: 'rgb(var(--obsidian-600) / <alpha-value>)',
                    700: 'rgb(var(--obsidian-700) / <alpha-value>)',
                    800: 'rgb(var(--obsidian-800) / <alpha-value>)',
                    900: 'rgb(var(--obsidian-900) / <alpha-value>)',
                    950: 'rgb(var(--obsidian-950) / <alpha-value>)',
                },
                iridium: {
                    50: '#fffbf0',
                    100: '#fef2d6',
                    200: '#fde0a8',
                    300: '#fcc871',
                    400: '#fbaa3a',
                    500: '#FABC05',
                    600: '#E09B00',
                    700: '#bb4b02',
                    800: '#953908',
                    900: '#78300b',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Inter', 'system-ui', 'sans-serif'],
            },
            fontSize: {
                'hero': 'clamp(2.5rem, 5vw, 6rem)',
                'display': 'clamp(2rem, 4vw, 4rem)',
            },
            borderRadius: {
                'xl': '1rem',
                '2xl': '1.5rem',
                '3xl': '2rem',
            },
            boxShadow: {
                'soft': '0 4px 24px rgba(0, 0, 0, 0.08)',
                'glow': '0 0 24px rgba(250, 188, 5, 0.3)',
                'inner-soft': 'inset 0 2px 8px rgba(0, 0, 0, 0.1)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'blob': 'blob 7s infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                blob: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' },
                },
            },
        },
    },
    plugins: [],
}
