'use client';

import React, { useRef, useEffect } from 'react';

interface QuizzesOverlayProps {
    isVisible: boolean;
    onClose: () => void;
}

export default function QuizzesOverlay({ isVisible, onClose }: QuizzesOverlayProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Reset scroll position when overlay becomes visible
        if (isVisible && scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = 0;
        }
    }, [isVisible]);

    if (!isVisible) return null;

    const quizzes = [
        { title: 'M1 | Syllabus Quiz', status: 'completed', due: 'Aug 29 at 11:59 PM', points: '10 pts', questions: '10 Questions' },
        { title: 'Quiz 2 Online', status: 'pending', due: 'Aug 29 at 11:59 PM', points: '10 pts', questions: '10 Questions' },
        { title: 'M2 | Course Quiz', status: 'completed', due: 'Aug 29 at 11:59 PM', points: '10 pts', questions: '10 Questions' },
        { title: 'Quiz 3 Online', status: 'pending', due: 'Aug 29 at 11:59 PM', points: '10 pts', questions: '10 Questions' },
        { title: 'Quiz 4 Online', status: 'pending', due: 'Aug 29 at 11:59 PM', points: '10 pts', questions: '10 Questions' },
        { title: 'M3 | Course Quiz', status: 'completed', due: 'Aug 29 at 11:59 PM', points: '10 pts', questions: '10 Questions' },
        { title: 'M4 | Course Quiz', status: 'completed', due: 'Aug 29 at 11:59 PM', points: '10 pts', questions: '10 Questions' },
        { title: 'M5 | Course Quiz', status: 'completed', due: 'Aug 29 at 11:59 PM', points: '10 pts', questions: '10 Questions' },
        { title: 'M6 | Course Quiz', status: 'pending', due: 'Aug 29 at 11:59 PM', points: '10 pts', questions: '10 Questions' },
        { title: 'M7 | Course Quiz', status: 'completed', due: 'Aug 29 at 11:59 PM', points: '10 pts', questions: '10 Questions' },
    ];

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

                    {/* Header */}
                    <div className="bg-gray-500 p-4">
                        <button className="flex items-center gap-2 text-white mb-3">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="text-sm font-medium">Back</span>
                        </button>
                        <h1 className="text-white text-xl font-bold text-center">Quizzes</h1>
                        <p className="text-white/90 text-sm text-center">FA24: Class #1</p>
                    </div>

                    {/* Assignment Quizzes Section */}
                    <div className="bg-white p-4">
                        <h2 className="text-gray-700 font-semibold text-sm mb-3">Assignment Quizzes</h2>

                        {/* Create Quiz Button */}
                        <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 px-4 rounded-lg mb-4 flex items-center justify-center gap-2 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span className="font-medium">Create Quiz</span>
                        </button>

                        {/* Quiz List */}
                        {quizzes.map((quiz, index) => (
                            <div key={index} className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg mb-3 hover:bg-gray-50 transition-colors">
                                {/* Radio/Checkbox */}
                                <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0 mt-1"></div>

                                {/* Quiz Info */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-[#8C1515] font-semibold text-sm mb-1">{quiz.title}</h3>
                                    <p className="text-gray-600 text-xs mb-1">Closed • Due {quiz.due}</p>
                                    <p className="text-gray-500 text-xs">{quiz.points} • {quiz.questions}</p>
                                </div>

                                {/* Status Icon */}
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    {quiz.status === 'completed' ? (
                                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                    <button className="text-gray-400">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}

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
