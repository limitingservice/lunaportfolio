import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

export const metadata: Metadata = {
    title: 'Fernando Luna - Design & Research',
    description: 'Portfolio of Fernando Luna — design and research work.',
    authors: [{ name: 'Fernando Luna' }],
    openGraph: {
        title: 'Fernando Luna - Design & Research',
        description: 'Portfolio of Fernando Luna — design and research work.',
        type: 'website',
        url: 'https://fernandojluna.com',
        images: [
            {
                url: 'https://fernandojluna.com/images/og-cover.png',
                width: 2052,
                height: 2048,
                alt: 'Fernando Luna - UX Researcher & Designer',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Fernando Luna - Design & Research',
        description: 'Portfolio of Fernando Luna — design and research work.',
        images: ['https://fernandojluna.com/images/og-cover.png'],
    },
};

// Applied before paint so the stored theme never flashes the wrong way.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" data-theme="dark" className={inter.variable}>
            <body className={inter.className}>
                <script dangerouslySetInnerHTML={{ __html: themeScript }} />
                {children}
            </body>
        </html>
    );
}
