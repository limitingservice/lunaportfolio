'use client';

import React from 'react';

export interface PersonaData {
    name: string;
    age?: number;
    occupation?: string;
    location?: string;
    tagline?: string;
    bio?: string;
    userNeeds?: string[];
    userMindsets?: string[];
    goals?: string[];
    motivations?: string[];
    hobbies?: string[];
    experiences?: string[];
    concerns?: string[];
    frustrations?: string[];
}

const SECTION_STYLES: Record<string, { label: string; header: string; chip: string }> = {
    goals: {
        label: 'Goals',
        header: 'bg-green-500/15 border-green-400/30 text-green-200',
        chip: 'bg-green-400/15 border-green-400/30 text-green-100',
    },
    motivations: {
        label: 'Motivation',
        header: 'bg-pink-500/15 border-pink-400/30 text-pink-200',
        chip: 'bg-pink-400/15 border-pink-400/30 text-pink-100',
    },
    hobbies: {
        label: 'Hobbies',
        header: 'bg-amber-500/15 border-amber-400/30 text-amber-200',
        chip: 'bg-amber-400/15 border-amber-400/30 text-amber-100',
    },
    experiences: {
        label: 'Experiences',
        header: 'bg-blue-500/15 border-blue-400/30 text-blue-200',
        chip: 'bg-blue-400/15 border-blue-400/30 text-blue-100',
    },
    concerns: {
        label: 'Concerns',
        header: 'bg-yellow-500/15 border-yellow-400/30 text-yellow-200',
        chip: 'bg-yellow-400/15 border-yellow-400/30 text-yellow-100',
    },
    frustrations: {
        label: 'Frustration',
        header: 'bg-orange-500/15 border-orange-400/30 text-orange-200',
        chip: 'bg-orange-400/15 border-orange-400/30 text-orange-100',
    },
};

function PersonaSection({ items, sectionKey }: { items: string[]; sectionKey: keyof typeof SECTION_STYLES }) {
    const style = SECTION_STYLES[sectionKey];
    return (
        <div>
            <div className={`inline-flex items-center px-3 py-1 mb-3 rounded-md border text-xs font-bold uppercase tracking-wider ${style.header}`}>
                {style.label}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {items.map((item, idx) => (
                    <div
                        key={idx}
                        className={`rounded-md border px-3 py-2.5 text-xs leading-snug ${style.chip}`}
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
}

interface PersonaCardProps {
    persona: PersonaData;
}

export default function PersonaCard({ persona }: PersonaCardProps) {
    return (
        <section className="mb-10">
            <h3 className="text-2xl font-bold text-white mb-2">Primary Persona</h3>
            <p className="text-base text-gray-400 mb-6">
                The user this research and design centered on — synthesized from interview and observational data.
            </p>

            <div className="bg-obsidian-800/60 border border-obsidian-700 rounded-2xl p-4 sm:p-6 md:p-8">
                <div className="grid md:grid-cols-[auto_1fr] gap-5 md:gap-8">
                    {/* Left: identity */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-iridium-500/20 to-iridium-700/30 border border-iridium-500/30 flex items-center justify-center mb-3">
                            <span className="text-2xl sm:text-3xl md:text-4xl font-black text-iridium-400/70">
                                {persona.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                            </span>
                        </div>
                        <div className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight break-words">{persona.name}</div>
                        <div className="mt-1 space-y-0.5 text-[11px] font-mono text-gray-500 uppercase tracking-wider">
                            {persona.age && <div>Age {persona.age}</div>}
                            {persona.occupation && <div>{persona.occupation}</div>}
                            {persona.location && <div>{persona.location}</div>}
                        </div>
                    </div>

                    {/* Right: content */}
                    <div className="space-y-5">
                        {persona.tagline && (
                            <blockquote className="text-base italic text-gray-200 border-l-4 border-iridium-500/60 pl-4">
                                &ldquo;{persona.tagline}&rdquo;
                            </blockquote>
                        )}

                        {persona.bio && (
                            <p className="text-base text-gray-300 leading-relaxed">{persona.bio}</p>
                        )}

                        {persona.userNeeds && persona.userNeeds.length > 0 && (
                            <div>
                                <div className="text-[11px] font-mono text-iridium-400/80 uppercase tracking-wider mb-2">
                                    User Needs
                                </div>
                                <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1.5">
                                    {persona.userNeeds.map((need) => (
                                        <li key={need} className="flex items-start gap-2 text-base text-gray-300">
                                            <span className="text-iridium-500 mt-1 flex-shrink-0">•</span>
                                            <span>{need}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {persona.userMindsets && persona.userMindsets.length > 0 && (
                            <div>
                                <div className="text-[11px] font-mono text-iridium-400/80 uppercase tracking-wider mb-2">
                                    User Mindsets
                                </div>
                                <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1.5">
                                    {persona.userMindsets.map((mindset) => (
                                        <li key={mindset} className="flex items-start gap-2 text-base text-gray-300">
                                            <span className="text-iridium-500 mt-1 flex-shrink-0">•</span>
                                            <span>{mindset}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sticky-note style sections (Goals / Motivation / Hobbies / Experiences / Concerns / Frustration) */}
                {(persona.goals || persona.motivations || persona.hobbies || persona.experiences || persona.concerns || persona.frustrations) && (
                    <div className="mt-8 pt-8 border-t border-obsidian-700 space-y-6">
                        {persona.goals && persona.goals.length > 0 && (
                            <PersonaSection items={persona.goals} sectionKey="goals" />
                        )}
                        {persona.motivations && persona.motivations.length > 0 && (
                            <PersonaSection items={persona.motivations} sectionKey="motivations" />
                        )}
                        {persona.hobbies && persona.hobbies.length > 0 && (
                            <PersonaSection items={persona.hobbies} sectionKey="hobbies" />
                        )}
                        {persona.experiences && persona.experiences.length > 0 && (
                            <PersonaSection items={persona.experiences} sectionKey="experiences" />
                        )}
                        {persona.concerns && persona.concerns.length > 0 && (
                            <PersonaSection items={persona.concerns} sectionKey="concerns" />
                        )}
                        {persona.frustrations && persona.frustrations.length > 0 && (
                            <PersonaSection items={persona.frustrations} sectionKey="frustrations" />
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
