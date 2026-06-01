'use client';

import React from 'react';
import Image from 'next/image';

export interface ResearchArtifact {
    image: string;
    alt: string;
    title?: string;
    caption: string;
    width?: number;
    height?: number;
}

interface ResearchArtifactsProps {
    artifacts: ResearchArtifact[];
    sectionTitle?: string;
    sectionDescription?: string;
}

export default function ResearchArtifacts({
    artifacts,
    sectionTitle = 'Research Artifacts',
    sectionDescription = 'Process artifacts from the research sessions — synthesis boards, journey maps, and workshop outputs.',
}: ResearchArtifactsProps) {
    if (!artifacts || artifacts.length === 0) return null;

    return (
        <section className="mb-10">
            <h3 className="text-2xl font-bold text-white mb-2">{sectionTitle}</h3>
            <p className="text-base text-gray-400 mb-6">{sectionDescription}</p>

            <div className="space-y-6">
                {artifacts.map((artifact, idx) => (
                    <figure
                        key={idx}
                        className="bg-obsidian-800/50 border border-obsidian-700 rounded-xl overflow-hidden"
                    >
                        <Image
                            src={artifact.image}
                            alt={artifact.alt}
                            width={artifact.width ?? 1800}
                            height={artifact.height ?? 1000}
                            className="block w-full h-auto"
                            sizes="(max-width: 768px) 100vw, 720px"
                        />
                        <figcaption className="px-5 py-4 md:px-6 md:py-5 border-t border-obsidian-700">
                            {artifact.title && (
                                <div className="text-[11px] font-mono text-iridium-400/80 uppercase tracking-wider mb-1.5">
                                    {artifact.title}
                                </div>
                            )}
                            <p className="text-base text-gray-300 leading-relaxed">{artifact.caption}</p>
                        </figcaption>
                    </figure>
                ))}
            </div>
        </section>
    );
}
