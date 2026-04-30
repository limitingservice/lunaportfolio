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
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={inter.variable}>
            <body className={inter.className}>
                {children}
            </body>
        </html>
    );
}
