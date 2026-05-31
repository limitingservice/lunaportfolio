'use client';

import React from 'react';

export interface ThematicTheme {
    theme: string;
    subthemes: string[];
    examples: string[];
}

export interface ThematicCodingData {
    description?: string;
    themes: ThematicTheme[];
}

interface ThematicCodingTableProps {
    data: ThematicCodingData;
}

export default function ThematicCodingTable({ data }: ThematicCodingTableProps) {
    return (
        <section className="mb-10">
            <h3 className="text-2xl font-bold text-white mb-2">Affinity Mapping & Thematic Coding</h3>
            <p className="text-base text-gray-400 mb-6">
                {data.description ?? `Interview data clustered into ${data.themes.length} cross-cutting themes that traced through to design recommendations.`}
            </p>

            <div className="bg-obsidian-800/50 border border-obsidian-700 rounded-xl overflow-hidden">
                {/* Desktop: 3-column table */}
                <div className="hidden md:block">
                    {/* Header row */}
                    <div
                        className="grid gap-4 px-6 py-3 border-b border-obsidian-700 bg-obsidian-900/40"
                        style={{ gridTemplateColumns: '1.2fr 1fr 2fr' }}
                    >
                        <div className="text-[11px] font-mono text-iridium-400/80 uppercase tracking-wider">Theme</div>
                        <div className="text-[11px] font-mono text-iridium-400/80 uppercase tracking-wider">Sub-themes</div>
                        <div className="text-[11px] font-mono text-iridium-400/80 uppercase tracking-wider">Examples</div>
                    </div>

                    {data.themes.map((theme, idx) => (
                        <div
                            key={theme.theme}
                            className={`grid gap-4 px-6 py-5 ${idx !== data.themes.length - 1 ? 'border-b border-obsidian-700' : ''}`}
                            style={{ gridTemplateColumns: '1.2fr 1fr 2fr' }}
                        >
                            <div className="text-base font-bold text-white leading-tight">{theme.theme}</div>
                            <div className="flex flex-wrap gap-1.5 self-start">
                                {theme.subthemes.map((sub) => (
                                    <span
                                        key={sub}
                                        className="px-2.5 py-1 bg-iridium-500/10 border border-iridium-500/20 text-iridium-400/90 rounded text-[11px] leading-tight"
                                    >
                                        {sub}
                                    </span>
                                ))}
                            </div>
                            <ul className="space-y-1.5">
                                {theme.examples.map((example, eidx) => (
                                    <li key={eidx} className="flex items-start gap-2 text-base text-gray-300 leading-snug">
                                        <span className="text-iridium-500 mt-1 flex-shrink-0">•</span>
                                        <span>{example}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Mobile: stacked cards */}
                <div className="md:hidden divide-y divide-obsidian-700">
                    {data.themes.map((theme) => (
                        <div key={theme.theme} className="p-5">
                            <h4 className="text-base font-bold text-white mb-2 leading-tight">{theme.theme}</h4>
                            <div className="flex flex-wrap gap-1.5 mb-3">
                                {theme.subthemes.map((sub) => (
                                    <span
                                        key={sub}
                                        className="px-2 py-0.5 bg-iridium-500/10 border border-iridium-500/20 text-iridium-400/90 rounded text-[10px] leading-tight"
                                    >
                                        {sub}
                                    </span>
                                ))}
                            </div>
                            <div className="text-[11px] font-mono text-iridium-400/80 uppercase tracking-wider mb-2">
                                Examples
                            </div>
                            <ul className="space-y-1.5">
                                {theme.examples.map((example, eidx) => (
                                    <li key={eidx} className="flex items-start gap-2 text-base text-gray-300 leading-snug">
                                        <span className="text-iridium-500 mt-1 flex-shrink-0">•</span>
                                        <span>{example}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
