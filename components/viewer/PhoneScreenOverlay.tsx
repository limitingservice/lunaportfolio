'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';

interface PhoneScreenOverlayProps {
    isVisible: boolean;
    onClose: () => void;
}

export default function PhoneScreenOverlay({ isVisible, onClose }: PhoneScreenOverlayProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Reset scroll position when overlay becomes visible
        if (isVisible && scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = 0;
        }
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            {/* Phone Frame Container */}
            <div className="relative w-[375px] h-[812px] bg-black rounded-[40px] shadow-2xl overflow-hidden border-8 border-gray-900">
                {/* Status Bar */}
                <div className="absolute top-0 left-0 right-0 h-11 bg-[#8C1515] z-20 flex items-center justify-between px-6 text-white text-sm">
                    <span>9:18 🌙</span>
                    <span className="flex items-center gap-2">
                        <span>5G</span>
                        <span className="bg-yellow-400 text-black px-1.5 rounded text-xs font-bold">74</span>
                    </span>
                </div>

                {/* Scrollable Content Area */}
                <div
                    ref={scrollContainerRef}
                    className="absolute top-11 left-0 right-0 bottom-16 overflow-y-auto bg-white"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        WebkitOverflowScrolling: 'touch'
                    }}
                >
                    {/* Hide scrollbar */}
                    <style jsx>{`
                        div::-webkit-scrollbar {
                            display: none;
                        }
                    `}</style>

                    {/* Canvas App Header */}
                    <div className="bg-[#8C1515] p-4 flex items-center justify-between">
                        <button className="text-white">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <img src="/images/iu-logo.png" alt="IU" className="h-8 w-auto object-contain" style={{ backgroundColor: '#8C1515' }} />
                        <button className="text-white">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                        </button>
                    </div>

                    {/* Courses Section */}
                    <div className="p-4 bg-white">
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-black text-lg font-semibold">Classes</h2>
                            <a href="#" className="text-red-600 text-sm font-medium">All Classes</a>
                        </div>

                        {/* Course Card 1 - Purple */}
                        <div className="mb-3 rounded-lg overflow-hidden bg-white shadow-sm border border-gray-200">
                            <div className="h-20 bg-gradient-to-br from-purple-500 to-purple-600 relative">
                                <button className="absolute top-2 right-2 text-white">⋮</button>
                            </div>
                            <div className="p-3">
                                <h3 className="text-black font-semibold text-sm mb-0.5">FA24: Class #1</h3>
                                <p className="text-gray-600 text-xs mb-1">FA24-TS-COUR-1000</p>
                                <p className="text-gray-500 text-xs">45 students</p>
                            </div>
                        </div>

                        {/* Course Card 2 - Iridium/Red Gradient */}
                        <div className="mb-3 rounded-lg overflow-hidden bg-white shadow-sm border border-gray-200">
                            <div className="h-20 bg-gradient-to-r from-red-500 to-iridium-500 relative">
                                <button className="absolute top-2 right-2 text-white">⋮</button>
                            </div>
                            <div className="p-3">
                                <h3 className="text-black font-semibold text-sm mb-0.5">FA24: Class #2</h3>
                                <p className="text-gray-600 text-xs mb-1">FA24-TS-COUR-1000</p>
                                <p className="text-gray-500 text-xs">38 students</p>
                            </div>
                        </div>

                        {/* Course Card 3 - Pink */}
                        <div className="mb-3 rounded-lg overflow-hidden bg-white shadow-sm border border-gray-200">
                            <div className="h-20 bg-gradient-to-br from-pink-500 to-pink-600 relative">
                                <button className="absolute top-2 right-2 text-white">⋮</button>
                            </div>
                            <div className="p-3">
                                <h3 className="text-black font-semibold text-sm mb-0.5">FA24: Class #3</h3>
                                <p className="text-gray-600 text-xs mb-1">FA24-TS-COUR-1000</p>
                                <p className="text-gray-500 text-xs">52 students</p>
                            </div>
                        </div>
                    </div>

                    {/* To Do Section */}
                    <div className="p-4 pt-3 bg-white">
                        <h2 className="text-black text-lg font-semibold mb-3">To Do</h2>

                        {/* To Do Item 1 */}
                        <div className="flex items-start gap-3 mb-3 pb-3 border-b border-gray-200">
                            <div className="w-10 h-10 rounded-full bg-gray-700 text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">45</div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-medium text-black mb-0.5">Grade M1 | Syllabus Quiz</h3>
                                <p className="text-xs text-gray-600">10 points • Aug 24 at 11:59pm</p>
                            </div>
                            <button className="text-gray-400 flex-shrink-0">×</button>
                        </div>

                        {/* To Do Item 2 */}
                        <div className="flex items-start gap-3 mb-3 pb-3 border-b border-gray-200">
                            <div className="w-10 h-10 rounded-full bg-gray-700 text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">38</div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-medium text-black mb-0.5">Grade M1 | Syllabus Quiz</h3>
                                <p className="text-xs text-gray-600">10 points • Aug 24 at 11:59pm</p>
                            </div>
                            <button className="text-gray-400 flex-shrink-0">×</button>
                        </div>

                        {/* To Do Item 3 */}
                        <div className="flex items-start gap-3 mb-3 pb-3 border-b border-gray-200">
                            <div className="w-10 h-10 rounded-full bg-gray-700 text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">52</div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-medium text-black mb-0.5">Grade M1 | Syllabus Quiz</h3>
                                <p className="text-xs text-gray-600">10 points • Aug 29 at 11:59pm</p>
                            </div>
                            <button className="text-gray-400 flex-shrink-0">×</button>
                        </div>

                        {/* To Do Item 4 */}
                        <div className="flex items-start gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-gray-700 text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">41</div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-medium text-black mb-0.5">Grade M2 | Discussion Post</h3>
                                <p className="text-xs text-gray-600">5 points • Sep 5 at 11:59pm</p>
                            </div>
                            <button className="text-gray-400 flex-shrink-0">×</button>
                        </div>
                    </div>

                    {/* Coming Up Section */}
                    <div className="p-4 pt-3 bg-white">
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-black text-lg font-semibold">Coming Up</h2>
                            <a href="#" className="text-red-600 text-sm font-medium">View Calendar</a>
                        </div>

                        {/* Coming Up Item 1 */}
                        <div className="flex items-start gap-3 mb-3 pb-3 border-b border-gray-200">
                            <div className="w-10 h-10 rounded-full bg-gray-700 text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">45</div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-medium text-black mb-0.5">Grade M1 | Final Project</h3>
                                <p className="text-xs text-gray-600">50 points • Sep 15 at 11:59pm</p>
                            </div>
                            <button className="text-gray-400 flex-shrink-0">×</button>
                        </div>

                        {/* Coming Up Item 2 */}
                        <div className="flex items-start gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-gray-700 text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">38</div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-medium text-black mb-0.5">Grade M1 | Midterm Exam</h3>
                                <p className="text-xs text-gray-600">100 points • Sep 15 at 2:00pm</p>
                            </div>
                            <button className="text-gray-400 flex-shrink-0">×</button>
                        </div>

                        {/* Add padding at bottom for scroll */}
                        <div className="h-8"></div>
                    </div>
                </div>

                {/* Bottom Navigation Bar - Fixed */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#1a1a1a] border-t border-gray-800 flex items-center justify-around z-20">
                    <button className="flex flex-col items-center gap-1 text-red-500">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                        </svg>
                        <span className="text-xs">Dashboard</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 text-gray-400">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                        </svg>
                        <span className="text-xs">Calendar</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 text-gray-400 relative">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                        </svg>
                        <span className="text-xs">To-do</span>
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">6</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 text-gray-400">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
                        </svg>
                        <span className="text-xs">Notifications</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 text-gray-400">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                        </svg>
                        <span className="text-xs">Inbox</span>
                    </button>
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-14 right-4 z-30 w-10 h-10 rounded-full bg-gray-800/90 backdrop-blur-sm text-white flex items-center justify-center hover:bg-gray-700 transition-colors shadow-lg"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Home Indicator */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full"></div>
            </div>
        </div>
    );
}
