'use client';

import React, { useState } from 'react';
import LayoutShell from '@/components/layout/LayoutShell';
import TopNav from '@/components/layout/TopNav';
import SideRailNav from '@/components/layout/SideRailNav';
import HeroCopy from '@/components/sections/HeroCopy';
import HeroAboutCard from '@/components/sections/HeroAboutCard';
import ProjectCardRow from '@/components/projects/ProjectCardRow';
import ProjectModal from '@/components/projects/ProjectModal';
import CaseStudySection from '@/components/sections/CaseStudySection';
import MaterialsSection from '@/components/sections/MaterialsSection';
import ContactSection from '@/components/sections/ContactSection';
import HighlightedProject from '@/components/sections/HighlightedProject';
import { getFeaturedProjects, projects, Project } from '@/data/projects';
import LiquidEther from '@/components/effects/ether';

export default function Home() {
    const featuredProjects = getFeaturedProjects();
    const potsProject = featuredProjects.find(p => p.id === 'pots-access-technology');
    const otherFeaturedProjects = featuredProjects.filter(p => p.id !== 'pots-access-technology');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [initialModalView, setInitialModalView] = useState<'brief' | 'full'>('brief');

    const handleProjectClick = (project: Project, view: 'brief' | 'full' = 'brief') => {
        setSelectedProject(project);
        setInitialModalView(view);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        // Delay clearing the project to allow exit animation
        setTimeout(() => setSelectedProject(null), 300);
    };

    return (
        <LayoutShell>
            <TopNav />
            <SideRailNav />

            <main className="relative">
                {/* Hero Section */}
                <section id="about" className="relative min-h-screen px-4 md:px-8 lg:px-16 py-12 md:py-20 flex items-center overflow-x-hidden">
                    <div className="absolute inset-0 z-0 opacity-40">
                        <LiquidEther
                            colors={['#FABC05', '#fbaa3a', '#1a1a1a']}
                            mouseForce={15}
                            cursorSize={80}
                            resolution={0.4}
                            autoDemo={true}
                            autoSpeed={0.3}
                            autoIntensity={1.8}
                            autoResumeDelay={2000}
                            autoRampDuration={0.8}
                        />
                    </div>
                    <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Hero copy */}
                        <div className="relative z-10">
                            <HeroCopy />
                        </div>

                        {/* Right: Integrated About Me & Quick Contact */}
                        <div className="lg:pl-8 overflow-hidden flex items-center justify-center">
                            <HeroAboutCard />
                        </div>
                    </div>
                </section>

                {/* Featured Projects */}
                <section id="work" className="px-4 md:px-8 lg:px-16 py-12 md:py-20 bg-obsidian-950 overflow-x-hidden">
                    <h2 className="text-3xl font-bold text-white mb-10 text-center">
                        Featured <span className="metallic-text">Projects</span>
                    </h2>
                    
                    {potsProject && (
                        <HighlightedProject 
                            project={potsProject} 
                            onViewDetails={() => handleProjectClick(potsProject, 'full')} 
                        />
                    )}

                    <div className="pt-8 border-t border-obsidian-800">
                        <h3 className="text-xl font-bold text-gray-300 mb-6">More Projects</h3>
                        <ProjectCardRow projects={otherFeaturedProjects} onProjectClick={handleProjectClick} />
                    </div>
                </section>

                {/* Case Studies */}
                <CaseStudySection onViewDetails={(project) => handleProjectClick(project, 'full')} />

                {/* Materials */}
                <section id="process">
                    <MaterialsSection />
                </section>


                {/* Contact */}
                <ContactSection />

                {/* Footer */}
                <footer className="py-8 px-4 md:px-8 lg:px-16 border-t border-obsidian-800">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                        <div>
                            © 2026 Fernando Luna. All rights reserved.
                        </div>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-iridium-500 transition-colors">Privacy</a>
                            <a href="#" className="hover:text-iridium-500 transition-colors">Terms</a>
                            <a href="#" className="hover:text-iridium-500 transition-colors">Sitemap</a>
                        </div>
                    </div>
                </footer>
            </main>

            {/* Project Detail Modal */}
            <ProjectModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                initialView={initialModalView}
            />
        </LayoutShell>
    );
}
