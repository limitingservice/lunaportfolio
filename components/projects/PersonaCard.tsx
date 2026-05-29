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

            <div className="bg-obsidian-800/60 border border-obsidian-700 rounded-2xl p-6 md:p-8">
                <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-8">
                    {/* Left: identity */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-iridium-500/20 to-iridium-700/30 border border-iridium-500/30 flex items-center justify-center mb-3">
                            <span className="text-3xl md:text-4xl font-black text-iridium-400/70">
                                {persona.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                            </span>
                        </div>
                        <div className="text-xl md:text-2xl font-bold text-white leading-tight">{persona.name}</div>
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
            </div>
        </section>
    );
}
