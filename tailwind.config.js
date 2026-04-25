/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                beige: {
                    50: '#fdf8f3',
                    100: '#f9ede0',
                    200: '#f3d6b5',
                    300: '#edc08a',
                    400: '#e7aa5f',
                    500: '#e19434',
                },
                navy: {
                    50: '#e6e8ec',
                    100: '#c0c5d0',
                    200: '#969fb1',
                    300: '#6c7892',
                    400: '#4d5a7a',
                    500: '#2e3c62',
                    600: '#29365a',
                    700: '#232e4f',
                    800: '#1d2745',
                    900: '#121826',
                    950: '#0b1220',
                },
                orange: {
                    50: '#fff3f0',
                    100: '#ffe4dd',
                    200: '#ffc5b5',
                    300: '#ffa68d',
                    400: '#ff8765',
                    500: '#ff4d2e',
                    600: '#ff3d1a',
                    700: '#e62d0a',
                    800: '#b32308',
                    900: '#801906',
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
                'glow': '0 0 24px rgba(255, 77, 46, 0.3)',
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
