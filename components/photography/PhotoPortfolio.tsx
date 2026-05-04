'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { filmPhotos, digitalPhotos, textilesPhotos, type Photo } from '@/data/photos';
import PhotoTile from './PhotoTile';
import PhotoLightbox from './PhotoLightbox';

type Filter = 'all' | 'digital' | 'film' | 'textiles';

interface PhotoPortfolioProps {
    onSwitchToUX: () => void;
}

export default function PhotoPortfolio({ onSwitchToUX }: PhotoPortfolioProps) {
    const [filter, setFilter] = useState<Filter>('all');
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const visible = useMemo<Photo[]>(() => {
        if (filter === 'digital') return digitalPhotos;
        if (filter === 'film') return filmPhotos;
        if (filter === 'textiles') return textilesPhotos;
        return [...digitalPhotos, ...filmPhotos];
    }, [filter]);

    const filters: { id: Filter; label: string }[] = [
        { id: 'all', label: 'photos' },
        { id: 'digital', label: 'digital' },
        { id: 'film', label: 'film' },
        { id: 'textiles', label: 'textiles' },
    ];

    const isTextiles = filter === 'textiles';

    return (
        <div className="min-h-screen bg-white text-neutral-900 font-mono">
            {/* Top nav */}
            <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-neutral-200/60">
                <div className="px-6 md:px-12 py-6 flex items-center justify-between">
                    <h1 className="text-base md:text-xl tracking-[0.25em] uppercase">
                        Fernando&nbsp;Luna
                    </h1>

                    <nav className="flex items-center gap-6 md:gap-10 text-xs md:text-sm tracking-widest lowercase">
                        {filters.map((f) => (
                            <button
                                key={f.id}
                                onClick={() => setFilter(f.id)}
                                className={`relative transition-colors ${
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
                            className="text-neutral-400 hover:text-neutral-900 transition-colors"
                            aria-label="Instagram — @el.luna"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                                <rect x="3" y="3" width="18" height="18" rx="4" />
                                <circle cx="12" cy="12" r="4" />
                                <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
                            </svg>
                        </a>

                        <button
                            onClick={onSwitchToUX}
                            className="ml-2 md:ml-4 px-3 py-1.5 border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors text-[10px] md:text-xs tracking-[0.2em] uppercase"
                            aria-label="Switch to UX portfolio"
                        >
                            ux ↗
                        </button>
                    </nav>
                </div>
            </header>

            {/* Textiles header */}
            {isTextiles && (
                <motion.section
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="px-4 md:px-8 lg:px-12 pt-10 md:pt-16 pb-6 md:pb-12"
                >
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <p className="text-[10px] md:text-xs tracking-[0.3em] text-neutral-400 lowercase mb-4">
                                a side project
                            </p>
                            <h2 className="text-3xl md:text-5xl tracking-[0.05em] uppercase mb-6 leading-tight">
                                Old American<br />Goods
                            </h2>
                            <p className="text-sm md:text-base text-neutral-600 leading-relaxed max-w-md mb-6">
                                A curated vintage textile and clothing label — sourcing one-of-one
                                pieces from estate sales, flea markets, and forgotten corners of
                                America. Each piece is photographed, catalogued, and resold to find
                                its next chapter.
                            </p>
                            <a
                                href="https://www.instagram.com/oldamericangoods"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-xs md:text-sm tracking-[0.2em] lowercase text-neutral-900 border-b border-neutral-900 pb-1 hover:text-neutral-500 hover:border-neutral-500 transition-colors"
                                aria-label="Old American Goods on Instagram"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                                    <rect x="3" y="3" width="18" height="18" rx="4" />
                                    <circle cx="12" cy="12" r="4" />
                                    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
                                </svg>
                                @oldamericangoods
                            </a>
                        </div>

                        <div className="order-1 md:order-2 relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-neutral-100">
                            <Image
                                src="/photos/textiles/me.jpeg"
                                alt="Old American Goods at the flea market"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                                className="object-cover"
                            />
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
