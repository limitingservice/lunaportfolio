'use client';

import React from 'react';

export type FeelingEmoji = '😡' | '😠' | '😟' | '😐' | '🙂' | '😊';

export interface JourneyPhase {
    name: string;
    userActions?: string[];
    goals?: string[];
    thoughts?: string[];
    feelings?: { text: string; emoji: FeelingEmoji }[];
    painPoints?: string[];
    touchpoints?: string[];
    opportunities?: string[];
}

export interface JourneyMapData {
    phases: JourneyPhase[];
}

interface UserJourneyMapProps {
    journey: JourneyMapData;
    personaName?: string;
}

const ALL_ROWS = [
    { key: 'userActions' as const, label: 'User Actions', accent: 'text-amber-300', sticky: 'bg-amber-200/15 border-amber-300/30 text-amber-100' },
    { key: 'goals' as const, label: 'Goals & Experiences', accent: 'text-blue-300', sticky: 'bg-blue-400/15 border-blue-300/30 text-blue-100' },
    { key: 'thoughts' as const, label: 'Thoughts', accent: 'text-purple-300', sticky: 'bg-purple-400/15 border-purple-300/30 text-purple-100' },
    { key: 'feelings' as const, label: 'Feelings', accent: 'text-pink-300', sticky: 'bg-pink-400/15 border-pink-300/30 text-pink-100' },
    { key: 'painPoints' as const, label: 'Pain Points', accent: 'text-red-300', sticky: 'bg-red-400/15 border-red-300/30 text-red-100' },
    { key: 'touchpoints' as const, label: 'Touchpoints', accent: 'text-teal-300', sticky: 'bg-teal-400/15 border-teal-300/30 text-teal-100' },
    { key: 'opportunities' as const, label: 'Opportunities', accent: 'text-green-300', sticky: 'bg-green-400/15 border-green-300/30 text-green-100' },
];

function FeelingChip({ text, emoji, className }: { text: string; emoji: FeelingEmoji; className: string }) {
    return (
        <div className={`rounded-lg border p-3 ${className}`}>
            <div className="text-xl mb-1.5">{emoji}</div>
            <div className="text-xs leading-snug">{text}</div>
        </div>
    );
}

function StickyChip({ text, className }: { text: string; className: string }) {
    return (
        <div className={`rounded-lg border p-3 text-xs leading-snug ${className}`}>
            {text}
        </div>
    );
}

export default function UserJourneyMap({ journey, personaName }: UserJourneyMapProps) {
    const phases = journey.phases;
    // Only render rows that have at least one non-empty entry across all phases.
    const ROWS = ALL_ROWS.filter((row) =>
        phases.some((phase) => {
            const items = phase[row.key];
            return items && items.length > 0;
        })
    );

    return (
        <section className="mb-10">
            <h3 className="text-2xl font-bold text-white mb-2">User Journey Map</h3>
            <p className="text-base text-gray-400 mb-6">
                {personaName ? `${personaName}'s ` : ''}journey through the experience — broken down into phases with actions, goals, feelings, friction, and opportunities to intervene.
            </p>

            <div className="bg-obsidian-800/50 border border-obsidian-700 rounded-xl p-4 md:p-6">
                {/* Desktop: grid view with phases as columns */}
                <div className="hidden md:block overflow-x-auto">
                    <div
                        className="grid gap-3 min-w-full"
                        style={{ gridTemplateColumns: `160px repeat(${phases.length}, minmax(180px, 1fr))` }}
                    >
                        {/* Phase header row */}
                        <div className="text-[11px] font-mono text-gray-500 uppercase tracking-wider self-end pb-2">
                            Phase
                        </div>
                        {phases.map((phase) => (
                            <div
                                key={phase.name}
                                className="text-sm font-bold text-white pb-2 border-b border-iridium-500/30 text-center"
                            >
                                {phase.name}
                            </div>
                        ))}

                        {/* Each row */}
                        {ROWS.map((row) => (
                            <React.Fragment key={row.key}>
                                <div
                                    className={`text-[11px] font-mono uppercase tracking-wider ${row.accent} pt-3 pb-2`}
                                >
                                    {row.label}
                                </div>
                                {phases.map((phase) => {
                                    const items = phase[row.key];
                                    return (
                                        <div key={phase.name + row.key} className="space-y-2 pt-2">
                                            {items && items.length > 0 ? (
                                                items.map((item, idx) => {
                                                    if (row.key === 'feelings') {
                                                        const feeling = item as { text: string; emoji: FeelingEmoji };
                                                        return (
                                                            <FeelingChip
                                                                key={idx}
                                                                text={feeling.text}
                                                                emoji={feeling.emoji}
                                                                className={row.sticky}
                                                            />
                                                        );
                                                    }
                                                    return (
                                                        <StickyChip
                                                            key={idx}
                                                            text={item as string}
                                                            className={row.sticky}
                                                        />
                                                    );
                                                })
                                            ) : (
                                                <div className="text-xs text-gray-600 italic px-3 py-2">—</div>
                                            )}
                                        </div>
                                    );
                                })}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Mobile: stacked by phase, each phase a vertical card with rows */}
                <div className="md:hidden space-y-6">
                    {phases.map((phase, phaseIdx) => (
                        <div key={phase.name}>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-[11px] font-mono text-gray-500 uppercase tracking-wider">
                                    Phase {phaseIdx + 1}
                                </span>
                                <span className="h-px flex-1 bg-iridium-500/20" />
                            </div>
                            <h4 className="text-lg font-bold text-white mb-3">{phase.name}</h4>
                            <div className="space-y-4">
                                {ROWS.map((row) => {
                                    const items = phase[row.key];
                                    if (!items || items.length === 0) return null;
                                    return (
                                        <div key={row.key}>
                                            <div className={`text-[11px] font-mono uppercase tracking-wider ${row.accent} mb-2`}>
                                                {row.label}
                                            </div>
                                            <div className="space-y-2">
                                                {items.map((item, idx) => {
                                                    if (row.key === 'feelings') {
                                                        const feeling = item as { text: string; emoji: FeelingEmoji };
                                                        return (
                                                            <FeelingChip
                                                                key={idx}
                                                                text={feeling.text}
                                                                emoji={feeling.emoji}
                                                                className={row.sticky}
                                                            />
                                                        );
                                                    }
                                                    return (
                                                        <StickyChip
                                                            key={idx}
                                                            text={item as string}
                                                            className={row.sticky}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
