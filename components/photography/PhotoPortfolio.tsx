'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { filmPhotos, digitalPhotos, textilesPhotos, type Photo } from '@/data/photos';
import PhotoTile from './PhotoTile';
import PhotoLightbox from './PhotoLightbox';

type Filter = 'digital' | 'film' | 'textiles';

interface PhotoPortfolioProps {
    onSwitchToUX: () => void;
}

export default function PhotoPortfolio({ onSwitchToUX }: PhotoPortfolioProps) {
    const [filter, setFilter] = useState<Filter>('digital');
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const visible = useMemo<Photo[]>(() => {
        if (filter === 'film') return filmPhotos;
        if (filter === 'textiles') return textilesPhotos;
        return digitalPhotos;
    }, [filter]);

    const filters: { id: Filter; label: string }[] = [
        { id: 'digital', label: 'digital' },
        { id: 'film', label: 'film' },
        { id: 'textiles', label: 'textiles' },
    ];

    const isTextiles = filter === 'textiles';

    return (
        <div data-theme="dark" className="min-h-screen bg-white text-neutral-900 font-mono">
            {/* Top nav */}
            <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-neutral-200/60">
                <div className="px-4 md:px-12 py-4 md:py-6 flex items-center gap-4 md:gap-6">
                    <h1 className="shrink-0 flex items-center text-base md:text-xl tracking-[0.25em] uppercase">
                        {isTextiles ? (
                            <span className="relative block w-10 h-10 md:w-12 md:h-12">
                                <Image
                                    src="/photos/logos/OAG.jpeg"
                                    alt="Old American Goods"
                                    fill
                                    sizes="48px"
                                    className="object-contain"
                                    priority
                                />
                            </span>
                        ) : (
                            <>
                                <span className="md:hidden">F.L.</span>
                                <span className="hidden md:inline">Fernando&nbsp;Luna</span>
                            </>
                        )}
                    </h1>

                    <nav
                        className="flex-1 min-w-0 overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        style={{ WebkitOverflowScrolling: 'touch' }}
                    >
                        <div className="flex items-center justify-end gap-5 md:gap-10 text-xs md:text-sm tracking-widest lowercase whitespace-nowrap pl-2 pr-1 w-max ml-auto">
                            <button
                                onClick={onSwitchToUX}
                                className="shrink-0 inline-flex items-center gap-1.5 text-neutral-400 hover:text-neutral-900 transition-colors"
                                aria-label="Back to UX portfolio"
                            >
                                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
                                </svg>
                                ux
                            </button>

                            {filters.map((f) => (
                                <button
                                    key={f.id}
                                    onClick={() => setFilter(f.id)}
                                    className={`shrink-0 relative transition-colors ${
                                        filter === f.id ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-700'
                                    }`}
                                >
                                    {f.label}
                                    {filter === f.id && (
                                        <motion.span
                                            layoutId="photoFilterUnderline"
                                            className="absolute -bottom-1 left-0 right-0 h-px bg-neutral-900"
                                        />
                                    )}
                                </button>
                            ))}

                            <a
                                href="https://www.instagram.com/el.luna"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="shrink-0 text-neutral-400 hover:text-neutral-900 transition-colors"
                                aria-label="Instagram — @el.luna"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                                    <rect x="3" y="3" width="18" height="18" rx="4" />
                                    <circle cx="12" cy="12" r="4" />
                                    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
                                </svg>
                            </a>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Textiles header */}
            {isTextiles && (
                <motion.section
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="px-4 md:px-8 lg:px-12 pt-6 md:pt-16 pb-6 md:pb-12"
                >
                    <div className="flex md:grid md:grid-cols-2 gap-4 md:gap-12 items-start md:items-center">
                        {/* Photo — small thumbnail on mobile, hero on desktop */}
                        <div className="order-1 md:order-2 shrink-0 w-40 md:w-auto relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-neutral-100">
                            <Image
                                src="/photos/textiles/me.jpeg"
                                alt="Old American Goods at the flea market"
                                fill
                                sizes="(max-width: 768px) 160px, 50vw"
                                priority
                                className="object-cover"
                            />
                        </div>

                        {/* Text */}
                        <div className="order-2 md:order-1 min-w-0 flex-1">
                            <p className="text-[10px] md:text-xs tracking-[0.3em] text-neutral-400 lowercase mb-2 md:mb-4">
                                a side project
                            </p>
                            <h2 className="text-xl md:text-5xl tracking-[0.05em] uppercase mb-3 md:mb-6 leading-tight">
                                Old American<br />Goods
                            </h2>
                            <p className="text-base text-neutral-600 leading-relaxed max-w-md mb-3 md:mb-6">
                                An antique clothing wholesale specializing in American casual and
                                military apparel from the late 1800s to today. Operating from a
                                private showroom in Bloomington, IN — sourcing rare reference
                                pieces for modern brands, private collectors, and stylists across
                                the U.S. and Japan, including NFL talent.
                            </p>
                            <a
                                href="https://www.instagram.com/oldamericangoods"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-[10px] md:text-sm tracking-[0.2em] lowercase text-neutral-900 border-b border-neutral-900 pb-1 hover:text-neutral-500 hover:border-neutral-500 transition-colors"
                                aria-label="Old American Goods on Instagram"
                            >
                                <svg className="w-3.5 h-3.5 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                                    <rect x="3" y="3" width="18" height="18" rx="4" />
                                    <circle cx="12" cy="12" r="4" />
                                    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
                                </svg>
                                @oldamericangoods
                            </a>
                        </div>
                    </div>
                </motion.section>
            )}

            {/* Grid */}
            <main className="px-4 md:px-8 lg:px-12 py-6 md:py-10">
                {isTextiles && (
                    <div className="mb-6 md:mb-10 flex items-center gap-4">
                        <span className="text-[10px] md:text-xs tracking-[0.3em] text-neutral-400 lowercase">
                            the catalogue
                        </span>
                        <span className="flex-1 h-px bg-neutral-200" />
                        <span className="text-[10px] md:text-xs tracking-[0.3em] text-neutral-400 lowercase">
                            {textilesPhotos.length} pieces
                        </span>
                    </div>
                )}

                <motion.div
                    key={filter}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="columns-1 md:columns-2 gap-4 md:gap-6"
                >
                    {visible.map((photo, i) => (
                        <PhotoTile
                            key={photo.src}
                            photo={photo}
                            index={i}
                            onClick={() => setActiveIndex(i)}
                        />
                    ))}
                </motion.div>
            </main>

            {/* Footer */}
            <footer className="px-6 md:px-12 py-10 border-t border-neutral-200 mt-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs tracking-widest text-neutral-500 lowercase">
                    <span>© 2026 fernando luna</span>
                    <span>photography &nbsp;·&nbsp; film + digital + textiles</span>
                </div>
            </footer>

            <PhotoLightbox
                photos={visible}
                activeIndex={activeIndex}
                onClose={() => setActiveIndex(null)}
                onNavigate={setActiveIndex}
            />
        </div>
    );
}
