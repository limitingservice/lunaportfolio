'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import PhotoPortfolio from '@/components/photography/PhotoPortfolio';
import { getFeaturedProjects, projects, Project } from '@/data/projects';
import LiquidEther from '@/components/effects/ether';

type PortfolioMode = 'ux' | 'photo';

export default function Home() {
    const featuredProjects = getFeaturedProjects();
    const potsProject = featuredProjects.find(p => p.id === 'pots-access-technology');
    const otherFeaturedProjects = featuredProjects.filter(p => p.id !== 'pots-access-technology');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState<PortfolioMode>('ux');

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedProject(null), 300);
    };

    if (mode === 'photo') {
        return (
            <AnimatePresence mode="wait">
                <motion.div
                    key="photo"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                    <PhotoPortfolio onSwitchToUX={() => setMode('ux')} />
                </motion.div>
            </AnimatePresence>
        );
    }

    return (
        <LayoutShell>
            <TopNav onSwitchToPhoto={() => setMode('photo')} />
            <SideRailNav />

            <main className="relative">
                {/* Hero Section */}
                <section id="about" className="relative md:min-h-screen px-4 md:px-8 lg:px-16 pt-20 pb-16 md:py-20 flex items-center overflow-x-hidden">
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
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 lg:gap-12 items-center w-full">
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
                            onViewDetails={() => handleProjectClick(potsProject)}
                        />
                    )}

                    <div className="pt-8 border-t border-obsidian-800">
                        <h3 className="text-xl font-bold text-gray-300 mb-6">More Projects</h3>
                        <ProjectCardRow projects={otherFeaturedProjects} onProjectClick={handleProjectClick} />
                    </div>
                </section>

                {/* Case Studies */}
                <CaseStudySection onViewDetails={(project) => handleProjectClick(project)} />

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
            />
        </LayoutShell>
    );
}
