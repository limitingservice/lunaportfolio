'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/utils/animations';

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        alert('Thank you for your message! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
        setIsSubmitting(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <section id="contact" className="py-20 px-8 lg:px-16 bg-navy-900/30">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={fadeInUp}
                className="max-w-4xl mx-auto"
            >
                <h2 className="text-display font-bold text-white mb-4 text-center">
                    Let's <span className="text-orange-500">Connect</span>
                </h2>
                <p className="text-gray-400 mb-12 text-center max-w-2xl mx-auto">
                    Interested in collaborating on UX research or design projects? Let's discuss how we can create user-centered solutions together.
                </p>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                                placeholder="Your name"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                                placeholder="your@email.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                                placeholder="Tell me about your project..."
                            />
                        </div>

                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full px-8 py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </motion.button>
                    </form>

                    {/* Contact info */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">Get in Touch</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-navy-800 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-400">Email</div>
                                        <div className="text-white">lunajfernando@gmail.com</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-navy-800 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-400">Location</div>
                                        <div className="text-white">Indianapolis / Bloomington, IN</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">Follow Me</h3>
                            <div className="flex gap-3">
                                <motion.a
                                    href="https://www.linkedin.com/in/fernandojluna/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-12 h-12 bg-navy-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-orange-500 transition-colors"
                                    title="LinkedIn"
                                >
                                    <span className="font-bold">L</span>
                                </motion.a>
                                <motion.a
                                    href="https://lunafernando.myportfolio.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-12 h-12 bg-navy-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-orange-500 transition-colors"
                                    title="Portfolio"
                                >
                                    <span className="font-bold">P</span>
                                </motion.a>
                                <motion.a
                                    href="mailto:lunajfernando@gmail.com"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-12 h-12 bg-navy-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-orange-500 transition-colors"
                                    title="Email"
                                >
                                    <span className="font-bold">E</span>
                                </motion.a>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
