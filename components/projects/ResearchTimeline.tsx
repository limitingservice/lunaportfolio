'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface TimelineActivity {
    name: string;
    track: 'qualitative' | 'quantitative' | 'synthesis';
    startWeek: number;
    endWeek: number;
    milestone?: boolean;
}

interface ResearchTimelineProps {
    weeks: number;
    activities: TimelineActivity[];
    title?: string;
}

const TRACK_STYLES: Record<TimelineActivity['track'], { label: string; color: string; bar: string }> = {
    qualitative: {
        label: 'Qualitative',
        color: 'text-blue-300',
        bar: 'bg-blue-400/70 border-blue-300/60',
    },
    quantitative: {
        label: 'Quantitative',
        color: 'text-iridium-400',
        bar: 'bg-iridium-500/70 border-iridium-400/60',
    },
    synthesis: {
        label: 'Synthesis',
        color: 'text-purple-300',
        bar: 'bg-purple-400/70 border-purple-300/60',
    },
};

export default function ResearchTimeline({ weeks, activities, title = 'Research Timeline' }: ResearchTimelineProps) {
    const tracks: TimelineActivity['track'][] = ['qualitative', 'quantitative', 'synthesis'];
    const weekColumns = Array.from({ length: weeks }, (_, i) => i + 1);

    return (
        <section className="mb-10">
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <p className="text-base text-gray-400 mb-6">
                Parallel qualitative and quantitative tracks over the {weeks}-week study, with synthesis points where the streams converged into design recommendations.
            </p>

            <div className="bg-obsidian-800/50 border border-obsidian-700 rounded-xl p-4 md:p-6">
                {/* Week header */}
                <div className="grid gap-1 mb-4" style={{ gridTemplateColumns: `120px repeat(${weeks}, minmax(0, 1fr))` }}>
                    <div className="text-[11px] font-mono text-gray-500 uppercase tracking-wider self-end pb-1">
                        Track
                    </div>
                    {weekColumns.map((w) => (
                        <div key={w} className="text-[10px] font-mono text-gray-500 uppercase tracking-wider text-center pb-1 border-b border-obsidian-700">
                            W{w}
                        </div>
                    ))}
                </div>

                {/* Tracks */}
                <div className="space-y-3">
                    {tracks.map((trackKey) => {
                        const trackStyle = TRACK_STYLES[trackKey];
                        const trackActivities = activities.filter((a) => a.track === trackKey);
                        return (
                            <div key={trackKey} className="grid gap-1 items-center" style={{ gridTemplateColumns: `120px repeat(${weeks}, minmax(0, 1fr))` }}>
                                <div className={`text-[11px] font-mono ${trackStyle.color} uppercase tracking-wider`}>
                                    {trackStyle.label}
                                </div>
                                {weekColumns.map((w) => {
                                    const activeActivity = trackActivities.find(
                                        (a) => w >= a.startWeek && w <= a.endWeek
                                    );
                                    const isStart = activeActivity?.startWeek === w;
                                    return (
                                        <div key={w} className="relative h-10 flex items-center">
                                            {activeActivity && (
                                                <motion.div
                                                    initial={{ opacity: 0, scaleX: 0 }}
                                                    whileInView={{ opacity: 1, scaleX: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: w * 0.05 }}
                                                    className={`absolute inset-y-1 left-0 right-0 border rounded ${trackStyle.bar} origin-left`}
                                                    style={{ transformOrigin: 'left center' }}
                                                />
                                            )}
                                            {isStart && activeActivity && (
                                                <span
                                                    className="absolute left-1.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-white whitespace-nowrap pointer-events-none z-20"
                                                    style={{ textShadow: '0 1px 3px rgba(0,0,0,0.95), 0 0 6px rgba(0,0,0,0.7)' }}
                                                >
                                                    {activeActivity.name}
                                                </span>
                                            )}
                                            {activeActivity?.milestone && isStart && (
                                                <div className="absolute -top-1 left-0 text-iridium-400 text-xs z-30">★</div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>

                {/* Legend */}
                <div className="mt-6 pt-4 border-t border-obsidian-700 flex flex-wrap gap-4 text-[11px] font-mono text-gray-500 uppercase tracking-wider">
                    {tracks.map((t) => (
                        <div key={t} className="flex items-center gap-2">
                            <span className={`w-3 h-3 rounded ${TRACK_STYLES[t].bar}`} />
                            <span>{TRACK_STYLES[t].label}</span>
                        </div>
                    ))}
                    <div className="flex items-center gap-2">
                        <span className="text-iridium-400">★</span>
                        <span>Milestone</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
