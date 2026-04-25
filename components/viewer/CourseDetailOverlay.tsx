'use client';

import React, { useRef, useEffect } from 'react';

interface CourseDetailOverlayProps {
    isVisible: boolean;
    onClose: () => void;
}

export default function CourseDetailOverlay({ isVisible, onClose }: CourseDetailOverlayProps) {
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

                    {/* Back Button Header */}
                    <div className="bg-[#8C1515] p-4 flex items-center">
                        <button className="flex items-center gap-2 text-white">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="text-sm font-medium">Back</span>
                        </button>
                    </div>

                    {/* Course Header */}
                    <div className="bg-gradient-to-b from-purple-300 to-purple-400 p-8 text-center">
                        <h1 className="text-white text-xl font-bold mb-1">FA24: CLASS #1</h1>
                        <p className="text-white/90 text-sm">Fall 2024</p>
                    </div>

                    {/* Navigation Menu */}
                    <div className="bg-white">
                        {/* Home */}
                        <button className="w-full flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                <div className="text-left">
                                    <div className="text-[#8C1515] font-medium text-sm">Home</div>
                                    <div className="text-gray-500 text-xs">Front Page</div>
                                </div>
                            </div>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Announcements */}
                        <button className="w-full flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                </svg>
                                <div className="text-left">
                                    <div className="text-[#8C1515] font-medium text-sm">Announcements</div>
                                </div>
                            </div>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Syllabus */}
                        <button className="w-full flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <div className="text-left">
                                    <div className="text-[#8C1515] font-medium text-sm">Syllabus</div>
                                </div>
                            </div>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Modules */}
                        <button className="w-full flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                                <div className="text-left">
                                    <div className="text-[#8C1515] font-medium text-sm">Modules</div>
                                </div>
                            </div>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Assignments */}
                        <button className="w-full flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <div className="text-left">
                                    <div className="text-[#8C1515] font-medium text-sm">Assignments</div>
                                </div>
                            </div>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Grades */}
                        <button className="w-full flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                                <div className="text-left">
                                    <div className="text-[#8C1515] font-medium text-sm">Grades</div>
                                </div>
                            </div>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Discussions */}
                        <button className="w-full flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <div className="text-left">
                                    <div className="text-[#8C1515] font-medium text-sm">Discussions</div>
                                </div>
                            </div>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Quizzes */}
                        <button className="w-full flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <div className="text-left">
                                    <div className="text-[#8C1515] font-medium text-sm">Quizzes</div>
                                </div>
                            </div>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* People */}
                        <button className="w-full flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                <div className="text-left">
                                    <div className="text-[#8C1515] font-medium text-sm">People</div>
                                </div>
                            </div>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Pages */}
                        <button className="w-full flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <div className="text-left">
                                    <div className="text-[#8C1515] font-medium text-sm">Pages</div>
                                </div>
                            </div>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* View as Student */}
                        <button className="w-full flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <div className="text-left">
                                    <div className="text-[#8C1515] font-medium text-sm">View as Student</div>
                                </div>
                            </div>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

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
