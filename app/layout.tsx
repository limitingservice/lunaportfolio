import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

export const metadata: Metadata = {
    title: 'Shoe Designer Portfolio | Innovative Footwear Design',
    description: 'Explore cutting-edge footwear designs spanning performance, lifestyle, and orthopedic solutions. 8+ years of experience in shoe design and prototyping.',
    keywords: 'shoe designer, footwear design, sneaker design, performance footwear, orthopedic shoes',
    authors: [{ name: 'Shoe Designer' }],
    openGraph: {
        title: 'Shoe Designer Portfolio',
        description: 'Innovative footwear design portfolio',
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
