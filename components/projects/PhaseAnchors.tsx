'use client';

import React from 'react';

interface PhaseAnchorsProps {
    onJump: (phaseId: 'plan' | 'process' | 'synthesis' | 'outcomes') => void;
}

const PHASES: { id: 'plan' | 'process' | 'synthesis' | 'outcomes'; icon: string; label: string }[] = [
    { id: 'plan', icon: '🎯', label: 'Plan' },
    { id: 'process', icon: '🔍', label: 'Process' },
    { id: 'synthesis', icon: '🧩', label: 'Synthesis' },
    { id: 'outcomes', icon: '⭐', label: 'Outcomes' },
];

export default function PhaseAnchors({ onJump }: PhaseAnchorsProps) {
    return (
        <div className="sticky top-0 z-20 -mx-4 sm:-mx-5 md:-mx-8 lg:-mx-10 pl-4 sm:pl-5 md:pl-8 lg:pl-10 pr-16 md:pr-20 bg-obsidian-900/95 backdrop-blur-sm border-b border-obsidian-700">
            <div className="flex items-center gap-2 py-3 overflow-x-auto">
                <span className="text-[11px] font-mono text-gray-500 uppercase tracking-wider mr-1 flex-shrink-0">
                    Skip to
                </span>
                {PHASES.map((phase) => (
                    <button
                        key={phase.id}
                        type="button"
                        onClick={() => onJump(phase.id)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-obsidian-800 border border-obsidian-700 hover:border-iridium-500/50 text-sm text-gray-300 hover:text-white transition-colors whitespace-nowrap flex-shrink-0"
                    >
                        <span aria-hidden="true">{phase.icon}</span>
                        <span>{phase.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
