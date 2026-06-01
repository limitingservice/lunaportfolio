'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/data/projects';
import ResearchTimeline from '@/components/projects/ResearchTimeline';
import PersonaCard from '@/components/projects/PersonaCard';
import UserJourneyMap from '@/components/projects/UserJourneyMap';
import ThematicCodingTable from '@/components/projects/ThematicCodingTable';
import ResearchArtifacts from '@/components/projects/ResearchArtifacts';
import CaseStudyAccordion from '@/components/projects/CaseStudyAccordion';
import PhaseAnchors from '@/components/projects/PhaseAnchors';

type Phase = 'plan' | 'process' | 'synthesis' | 'outcomes';

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    const modalRef = React.useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Accordion open state — all collapsed by default for recruiter-scan
    const [openSections, setOpenSections] = useState<Record<Phase, boolean>>({
        plan: false,
        process: false,
        synthesis: false,
        outcomes: false,
    });

    // Refs for each phase accordion for scroll-to behavior
    const phaseRefs = {
        plan: useRef<HTMLDivElement>(null),
        process: useRef<HTMLDivElement>(null),
        synthesis: useRef<HTMLDivElement>(null),
        outcomes: useRef<HTMLDivElement>(null),
    };

    // Reset accordions when modal opens/changes project
    useEffect(() => {
        if (isOpen) {
            setOpenSections({ plan: false, process: false, synthesis: false, outcomes: false });
        }
    }, [isOpen, project?.id]);

    const toggleSection = (phase: Phase) => {
        setOpenSections((prev) => ({ ...prev, [phase]: !prev[phase] }));
    };

    const handleJump = (phase: Phase) => {
        setOpenSections((prev) => ({ ...prev, [phase]: true }));
        // Defer the scroll a frame so the accordion content renders before measuring
        requestAnimationFrame(() => {
            const target = phaseRefs[phase].current;
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    };

    // Focus management: move focus into the dialog, trap it, and restore on close
    useEffect(() => {
        if (!isOpen) return;
        const previouslyFocused = document.activeElement as HTMLElement | null;
        const node = modalRef.current;
        node?.focus();

        const handleTab = (e: KeyboardEvent) => {
            if (e.key !== 'Tab' || !node) return;
            const focusables = node.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
            );
            if (focusables.length === 0) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };
        document.addEventListener('keydown', handleTab);
        return () => {
            document.removeEventListener('keydown', handleTab);
            previouslyFocused?.focus();
        };
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 overflow-y-auto" data-lenis-prevent="true">
                        <div className="min-h-screen px-3 sm:px-4 py-4 sm:py-8 flex items-center justify-center">
                            <motion.div
                                ref={modalRef}
                                role="dialog"
                                aria-modal="true"
                                aria-label={`${project.name} — project details`}
                                tabIndex={-1}
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                                className="relative w-full max-w-5xl bg-obsidian-900 rounded-2xl shadow-2xl border border-obsidian-700 max-h-[90vh] overflow-hidden focus:outline-none"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Close button — z-40 keeps it above the sticky phase-anchor bar at z-20 */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 bg-obsidian-800 ring-2 ring-obsidian-900 hover:bg-iridium-500 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors z-40 shadow-lg"
                                    aria-label="Close modal"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                {/* Scrollable content */}
                                <div ref={scrollContainerRef} className="overflow-y-auto max-h-[90vh] p-4 sm:p-5 md:p-8 lg:p-10" data-lenis-prevent="true">

                                    {/* Hero — always visible: header + Problem + Outcome callouts.
                                        pr-14 reserves space on the right so the close button (at top-4/top-6 right-4/right-6, w-10)
                                        never visually overlaps with the hero text on any viewport. */}
                                    <div className="mb-6 pr-14 md:pr-12">
                                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                                            <span className="px-3 py-1 bg-iridium-500/20 text-iridium-500 rounded-lg text-sm font-bold">
                                                {project.category}
                                            </span>
                                            <span className="text-gray-400">{project.year}</span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight break-words">{project.name}</h2>

                                        {/* Specs strip */}
                                        {project.details && (
                                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-mono text-iridium-400/80 uppercase tracking-wider mb-5">
                                                {project.details.role && (
                                                    <span><span className="text-gray-500">Role:</span> {project.details.role}</span>
                                                )}
                                                {project.details.team && (
                                                    <span><span className="text-gray-500">Team:</span> {project.details.team}</span>
                                                )}
                                                {project.details.researchMethods && project.details.researchMethods.length > 0 && (
                                                    <span><span className="text-gray-500">Methods:</span> {project.details.researchMethods.length}</span>
                                                )}
                                                {project.details.participants && project.details.participants.length > 0 && (
                                                    <span><span className="text-gray-500">Groups:</span> n={project.details.participants.length}</span>
                                                )}
                                            </div>
                                        )}

                                        {/* Problem callout */}
                                        {project.details?.problemStatement && (
                                            <div className="p-4 md:p-5 bg-obsidian-900/60 border-l-4 border-gray-500 rounded-r-lg mb-3">
                                                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">The Problem</div>
                                                <p className="text-base text-gray-200 line-clamp-3">{project.details.problemStatement}</p>
                                            </div>
                                        )}

                                        {/* Outcome callout */}
                                        {project.details?.impact && project.details.impact.length > 0 && (
                                            <div className="p-4 md:p-5 bg-iridium-500/5 border-l-4 border-iridium-500 rounded-r-lg">
                                                <div className="text-[11px] font-bold text-iridium-500 uppercase tracking-wider mb-2">The Outcome</div>
                                                <p className="text-base text-gray-200">{project.details.impact[0]}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Sticky phase anchors */}
                                    <PhaseAnchors onJump={handleJump} />

                                    {/* 4 collapsible phase accordions */}
                                    <div className="space-y-4 pt-4">

                                        {/* 🎯 The Plan */}
                                        <CaseStudyAccordion
                                            id="plan"
                                            ref={phaseRefs.plan}
                                            icon="🎯"
                                            title="The Plan"
                                            preview={[
                                                project.details?.context && 'Context',
                                                project.details?.problemStatement && 'Problem statement',
                                                project.details?.researchGoals?.length && 'Research plan',
                                                project.details?.timeline && 'Timeline',
                                            ].filter(Boolean).join(' · ') || 'Framing, problem definition, and research plan'}
                                            isOpen={openSections.plan}
                                            onToggle={() => toggleSection('plan')}
                                        >
                                            <div className="space-y-8 pt-4">
                                                {/* Context */}
                                                {project.details?.context && (
                                                    <div>
                                                        <p className="text-gray-300 text-base">{project.details.context}</p>
                                                    </div>
                                                )}

                                                {/* Problem Statement */}
                                                {project.details?.problemStatement && (
                                                    <section>
                                                        <h3 className="text-2xl font-bold text-white mb-4">Problem Statement</h3>
                                                        <div className="bg-obsidian-800/50 border border-obsidian-700 rounded-xl p-6">
                                                            <p className="text-gray-300 leading-relaxed">{project.details.problemStatement}</p>
                                                        </div>
                                                    </section>
                                                )}

                                                {/* Research Plan */}
                                                {project.details?.researchGoals && project.details.researchGoals.length > 0 && (
                                                    <section>
                                                        <h3 className="text-2xl font-bold text-white mb-2">Research Plan</h3>
                                                        <p className="text-sm text-gray-400 mb-4">Documented with named methods, target groups, and timeline before execution.</p>
                                                        <ul className="space-y-3">
                                                            {project.details.researchGoals.map((goal, idx) => (
                                                                <li key={idx} className="flex items-start gap-3">
                                                                    <span className="w-6 h-6 bg-iridium-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                                                                        {idx + 1}
                                                                    </span>
                                                                    <span className="text-gray-300">{goal}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </section>
                                                )}

                                                {/* Research Timeline */}
                                                {project.details?.timeline && (
                                                    <ResearchTimeline
                                                        weeks={project.details.timeline.weeks}
                                                        activities={project.details.timeline.activities}
                                                    />
                                                )}
                                            </div>
                                        </CaseStudyAccordion>

                                        {/* 🔍 The Process */}
                                        <CaseStudyAccordion
                                            id="process"
                                            ref={phaseRefs.process}
                                            icon="🔍"
                                            title="The Process"
                                            preview={[
                                                project.details?.researchMethods?.length && `${project.details.researchMethods.length} methods`,
                                                project.details?.participants?.length && `${project.details.participants.length} groups`,
                                                project.details?.persona && 'persona',
                                                project.details?.journeyMap && 'journey map',
                                            ].filter(Boolean).join(' · ') || 'Methods, participants, persona, and journey'}
                                            isOpen={openSections.process}
                                            onToggle={() => toggleSection('process')}
                                        >
                                            <div className="space-y-8 pt-4">
                                                {/* Research Methods */}
                                                {project.details?.researchMethods && project.details.researchMethods.length > 0 && (
                                                    <section>
                                                        <h3 className="text-2xl font-bold text-white mb-4">Research Methods</h3>
                                                        <div className="grid gap-4">
                                                            {project.details.researchMethods.map((method, idx) => (
                                                                <div key={idx} className="bg-obsidian-800/50 border border-obsidian-700 rounded-xl p-6">
                                                                    <h4 className="text-lg font-bold metallic-text mb-2">{method.name}</h4>
                                                                    <p className="text-base text-gray-300 mb-3">{method.description}</p>
                                                                    {method.rationale && (
                                                                        <div className="mt-3 pt-3 border-t border-obsidian-700">
                                                                            <div className="text-[11px] font-mono text-iridium-400/80 uppercase tracking-wider mb-1">
                                                                                Why this method
                                                                            </div>
                                                                            <p className="text-base text-gray-300 italic leading-relaxed">{method.rationale}</p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </section>
                                                )}

                                                {/* Participants */}
                                                {project.details?.participants && project.details.participants.length > 0 && (
                                                    <section>
                                                        <h3 className="text-2xl font-bold text-white mb-4">Participants</h3>
                                                        <div className="grid md:grid-cols-3 gap-4">
                                                            {project.details.participants.map((participant, idx) => (
                                                                <div key={idx} className="bg-obsidian-800/50 border border-obsidian-700 rounded-xl p-5">
                                                                    <h4 className="font-bold text-white mb-2">{participant.role}</h4>
                                                                    <p className="text-base text-gray-400">{participant.description}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </section>
                                                )}

                                                {/* Persona */}
                                                {project.details?.persona && (
                                                    <PersonaCard persona={project.details.persona} />
                                                )}

                                                {/* Journey Map */}
                                                {project.details?.journeyMap && (
                                                    <UserJourneyMap
                                                        journey={project.details.journeyMap}
                                                        personaName={project.details.persona?.name}
                                                    />
                                                )}
                                            </div>
                                        </CaseStudyAccordion>

                                        {/* 🧩 The Synthesis */}
                                        <CaseStudyAccordion
                                            id="synthesis"
                                            ref={phaseRefs.synthesis}
                                            icon="🧩"
                                            title="The Synthesis"
                                            preview={[
                                                project.details?.personaArtifacts?.length && 'Personas & journeys',
                                                project.details?.cognitiveWalkthroughs?.length && 'Cognitive walkthrough',
                                                project.details?.researchArtifacts?.length && 'Research artifacts',
                                                project.details?.thematicCoding && 'Thematic coding',
                                                project.details?.testingResults?.length && 'Testing results',
                                            ].filter(Boolean).join(' · ') || 'Synthesis boards, coding, and testing outputs'}
                                            isOpen={openSections.synthesis}
                                            onToggle={() => toggleSection('synthesis')}
                                        >
                                            <div className="space-y-8 pt-4">
                                                {/* Personas & Journey Maps (synthesized user-group artifacts) */}
                                                {project.details?.personaArtifacts && project.details.personaArtifacts.length > 0 && (
                                                    <ResearchArtifacts
                                                        artifacts={project.details.personaArtifacts}
                                                        sectionTitle="Personas & Journey Maps"
                                                        sectionDescription="Synthesized personas and journey maps for each distinct user group surfaced in research — one set per group so design decisions can trace back to the right user."
                                                    />
                                                )}

                                                {/* Cognitive Walkthrough */}
                                                {project.details?.cognitiveWalkthroughs && project.details.cognitiveWalkthroughs.length > 0 && (
                                                    <ResearchArtifacts
                                                        artifacts={project.details.cognitiveWalkthroughs}
                                                        sectionTitle="Cognitive Walkthrough"
                                                        sectionDescription="Mapped end-to-end workflow of the lab and research team the product would serve — surfacing stakeholders, activities, pain points, and tooling at each stage to ground design decisions in real practice."
                                                    />
                                                )}

                                                {/* Research Artifacts */}
                                                {project.details?.researchArtifacts && project.details.researchArtifacts.length > 0 && (
                                                    <ResearchArtifacts artifacts={project.details.researchArtifacts} />
                                                )}

                                                {/* Thematic Coding */}
                                                {project.details?.thematicCoding && (
                                                    <ThematicCodingTable data={project.details.thematicCoding} />
                                                )}

                                                {/* Testing & Measurement Results */}
                                                {project.details?.testingResults && project.details.testingResults.length > 0 && (
                                                    <ResearchArtifacts
                                                        artifacts={project.details.testingResults}
                                                        sectionTitle="Testing & Measurement Results"
                                                        sectionDescription="Quantitative test data captured across testing rounds — time-on-task, click count, error rate, and task completion — translated into the design's measurable improvements."
                                                    />
                                                )}
                                            </div>
                                        </CaseStudyAccordion>

                                        {/* ⭐ The Outcomes */}
                                        <CaseStudyAccordion
                                            id="outcomes"
                                            ref={phaseRefs.outcomes}
                                            icon="⭐"
                                            title="The Outcomes"
                                            preview={[
                                                project.details?.keyFindings?.length && `${project.details.keyFindings.length} finding ${project.details.keyFindings.length === 1 ? 'category' : 'categories'}`,
                                                project.details?.designIterations?.length && 'Design iterations',
                                                project.details?.impact?.length && 'Impact',
                                                project.details?.skillsApplied?.length && 'Skills',
                                            ].filter(Boolean).join(' · ') || 'Findings, iterations, impact, and skills'}
                                            isOpen={openSections.outcomes}
                                            onToggle={() => toggleSection('outcomes')}
                                        >
                                            <div className="space-y-8 pt-4">
                                                {/* Key Findings */}
                                                {project.details?.keyFindings && project.details.keyFindings.length > 0 && (
                                                    <section>
                                                        <h3 className="text-2xl font-bold text-white mb-4">Key Findings</h3>
                                                        <div className="space-y-6">
                                                            {project.details.keyFindings.map((finding, idx) => (
                                                                <div key={idx} className="bg-obsidian-800/50 border border-obsidian-700 rounded-xl p-6">
                                                                    <h4 className="text-lg font-bold metallic-text mb-3">{finding.category}</h4>
                                                                    {finding.images && finding.images.length > 0 && (
                                                                        <div className="space-y-3 mb-4">
                                                                            {finding.images.map((img, imgIdx) => (
                                                                                <figure key={imgIdx} className="rounded-lg overflow-hidden border border-obsidian-700 bg-white">
                                                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                                                    <img
                                                                                        src={img.image}
                                                                                        alt={img.alt}
                                                                                        width={img.width}
                                                                                        height={img.height}
                                                                                        className="block w-full h-auto"
                                                                                    />
                                                                                    {img.caption && (
                                                                                        <figcaption className="px-4 py-2 text-xs text-gray-400 bg-obsidian-800/60 border-t border-obsidian-700">
                                                                                            {img.caption}
                                                                                        </figcaption>
                                                                                    )}
                                                                                </figure>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                    <ul className="space-y-2">
                                                                        {finding.insights.map((insight, insightIdx) => (
                                                                            <li key={insightIdx} className="flex items-start gap-2">
                                                                                <span className="text-iridium-500 mt-1.5">•</span>
                                                                                <span className="text-gray-300">{insight}</span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </section>
                                                )}

                                                {/* Design Iterations */}
                                                {project.details?.designIterations && project.details.designIterations.length > 0 && (
                                                    <section>
                                                        <h3 className="text-2xl font-bold text-white mb-4">Design Iterations</h3>
                                                        <div className="grid md:grid-cols-2 gap-4">
                                                            {project.details.designIterations.map((iteration, idx) => (
                                                                <div key={idx} className="bg-obsidian-800/50 border border-obsidian-700 rounded-xl p-6">
                                                                    <h4 className="text-lg font-bold text-white mb-3">{iteration.area}</h4>
                                                                    <ul className="space-y-2">
                                                                        {iteration.improvements.map((improvement, impIdx) => (
                                                                            <li key={impIdx} className="flex items-start gap-2">
                                                                                <span className="text-iridium-500 mt-1">✓</span>
                                                                                <span className="text-gray-300 text-sm">{improvement}</span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </section>
                                                )}

                                                {/* Impact */}
                                                {project.details?.impact && project.details.impact.length > 0 && (
                                                    <section>
                                                        <h3 className="text-2xl font-bold text-white mb-4">Impact & Learnings</h3>
                                                        <div className="bg-gradient-to-br from-iridium-500/10 to-iridium-500/5 border border-iridium-500/30 rounded-xl p-6">
                                                            <ul className="space-y-3">
                                                                {project.details.impact.map((item, idx) => (
                                                                    <li key={idx} className="flex items-start gap-3">
                                                                        <span className="text-iridium-500 text-xl">★</span>
                                                                        <span className="text-gray-200">{item}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </section>
                                                )}

                                                {/* Future Opportunities */}
                                                {project.details?.futureOpportunities && project.details.futureOpportunities.length > 0 && (
                                                    <section>
                                                        <h3 className="text-2xl font-bold text-white mb-4">Future Opportunities</h3>
                                                        <div className="grid md:grid-cols-2 gap-3">
                                                            {project.details.futureOpportunities.map((opportunity, idx) => (
                                                                <div key={idx} className="bg-obsidian-800/30 border border-obsidian-700 rounded-lg p-4">
                                                                    <p className="text-gray-300 text-base">{opportunity}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </section>
                                                )}

                                                {/* Skills Applied */}
                                                {project.details?.skillsApplied && project.details.skillsApplied.length > 0 && (
                                                    <section>
                                                        <h3 className="text-2xl font-bold text-white mb-4">Skills & Methods Applied</h3>
                                                        <div className="flex flex-wrap gap-2">
                                                            {project.details.skillsApplied.map((skill, idx) => (
                                                                <span
                                                                    key={idx}
                                                                    className="px-4 py-2 bg-iridium-500/10 text-iridium-400/80 rounded-lg border border-iridium-500/15 hover:border-iridium-500/40 hover:bg-iridium-500/15 transition-colors text-sm"
                                                                >
                                                                    {skill}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </section>
                                                )}
                                            </div>
                                        </CaseStudyAccordion>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
