export interface Project {
    id: string;
    name: string;
    year: number;
    category: 'Research' | 'Product Design' | 'Course Project' | 'Photography' | 'Interactive Systems';
    description: string;
    shortDescription: string;
    tools: string[];
    tags: string[];
    featured: boolean;
    logo?: string; // Optional logo path for company/project branding
    caseStudyImage?: string; // Optional specific image for case study section
    poster?: string; // Optional poster image for 3D tablet mockup in case studies
    images: {
        thumbnail: string;
        hero: string;
    };
    viewer: {
        type: '3d' | 'frames' | 'image';
        glbModelPath?: string;
        framesPath?: string;
        frameCount?: number;
        deviceType?: 'phone' | 'laptop' | 'phone-watch' | 'tablet' | 'watch';
        screens?: string[];
        watchScreens?: string[];
        tabletScreens?: string[];
        tablet3dModels?: { id: string }[];
    };
    // Detailed project information for modal
    details?: {
        role?: string;
        team?: string;
        duration?: string;
        context?: string;
        problemStatement?: string;
        researchGoals?: string[];
        researchMethods?: {
            name: string;
            description: string;
        }[];
        participants?: {
            role: string;
            description: string;
        }[];
        keyFindings?: {
            category: string;
            insights: string[];
        }[];
        designIterations?: {
            area: string;
            improvements: string[];
        }[];
        impact?: string[];
        futureOpportunities?: string[];
        skillsApplied?: string[];
    };
    caseStudy?: {
        problem: string;
        approach: string;
        sketches: string[];
        iterations: string;
        outcome: string;
    };
    materials?: {
        name: string;
        description: string;
        image: string;
    }[];
}

export const projects: Project[] = [
    {
        id: 'energy-systems-network',
        name: 'Energy Insights Network (ESN)',
        year: 2024,
        category: 'Course Project',
        description: 'UX research and validation project focused on refining an energy insights platform for manufacturing teams. Conducted field research, usability testing, and iterative design to improve onboarding, dashboards, error handling, and AI-assisted insights.',
        shortDescription: 'Energy monitoring dashboard for manufacturing',
        tools: ['Figma', 'User Interviews', 'Wireframing', 'Prototyping', 'Usability Testing'],
        tags: ['User Research', 'Data Visualization', 'AI Trust', 'Manufacturing'],
        featured: true,
        logo: '/images/esn-logo-opt.png',
        images: {
            thumbnail: '/images/esn-thumb.jpg',
            hero: '/images/esn-hero.jpg',
        },
        viewer: {
            type: '3d',
            glbModelPath: '/models/esn-dashboard.glb',
            deviceType: 'tablet',
            screens: [
                '/images/esn/Home Dashboard - Onboarding Flow - 1.png',
                '/images/esn/Home Dashboard - Onboarding Flow - 2.png',
                '/images/esn/Home Dashboard - Machine 1.png',
                '/images/esn/Electrical Health Dashboard M2.png',
                '/images/esn/Voltage Warning.png',
                '/images/esn/AI CHAT HELP/EXPLANATION FLOW - 3.png',
                '/images/esn/AI CHAT HELP/SUPPORT FLOW - 5.png'
            ],
        },
        details: {
            role: 'UX Researcher & Designer',
            team: 'Cross-functional (design + research)',
            context: 'Prototype testing and validation for energy monitoring platform',
            problemStatement: 'Manufacturing teams need to monitor machine performance and energy usage in real time, quickly understand and respond to system errors, and trust AI-driven insights enough to act on them—all without slowing down operations. Early iterations revealed overly text-heavy onboarding, confusing navigation, unclear error notifications, and skepticism around AI recommendations.',
            researchGoals: [
                'Evaluate whether users understand the product\'s purpose and value',
                'Identify usability issues in onboarding and navigation',
                'Assess trust and perceived usefulness of the AI chatbot',
                'Understand how the product fits into real manufacturing workflows',
                'Gather actionable feedback to guide iterative design improvements'
            ],
            researchMethods: [
                {
                    name: 'Discussion Feedback Analysis',
                    description: 'Collected qualitative feedback from discussion posts and distilled insights into four core themes: improve error notifications, improve AI performance and trust, standardize styling and balance, and improve app flow and architecture.'
                },
                {
                    name: 'User Interviews (Field Research)',
                    description: 'Conducted semi-structured interviews at Smart Manufacturing Roadshow in Indiana with current and potential ESN users, focusing on onboarding experience, AI chatbot usefulness, workflow fit, and improvement recommendations.'
                }
            ],
            participants: [
                {
                    role: 'Emerging IT Worker',
                    description: 'Transitioning into manufacturing sector'
                },
                {
                    role: 'Dean of Engineering',
                    description: 'Academic leadership perspective'
                },
                {
                    role: 'Senior Manufacturing Operations Manager',
                    description: '30+ years of industry experience'
                }
            ],
            keyFindings: [
                {
                    category: 'Onboarding & Learnability',
                    insights: [
                        'Users could navigate tutorial but found it too text-heavy',
                        'Lack of visual hierarchy made it difficult to quickly grasp system purpose',
                        'Later iterations improved clarity by reducing text and emphasizing visuals'
                    ]
                },
                {
                    category: 'Navigation & App Architecture',
                    insights: [
                        'Some users struggled to understand overall app structure initially',
                        'Navigation buttons occasionally lagged, creating confusion',
                        'Needed clearer hierarchy and more predictable flows'
                    ]
                },
                {
                    category: 'Dashboard & Data Interpretation',
                    insights: [
                        'Users appreciated real-time machine usage and energy metrics',
                        'Dashboards more effective when key metrics were visually emphasized',
                        'Reducing redundant or low-value data improved comprehension',
                        'Error states needed clear differentiation from normal states'
                    ]
                },
                {
                    category: 'Error Notifications & Trust',
                    insights: [
                        'Error alerts seen as valuable but needed clearer context',
                        'Required faster visibility and stronger linkage between data, cause, and action',
                        'Users wanted transparent explanation of recommendations'
                    ]
                },
                {
                    category: 'AI Chatbot: Trust & Fit',
                    insights: [
                        'User sentiment toward AI was cautiously optimistic',
                        'Trust depended on transparency of data sources and clear explanations',
                        'Experienced users emphasized need for 70% global data + 30% local machine data',
                        'AI most trusted when positioned as decision support, not automation'
                    ]
                }
            ],
            designIterations: [
                {
                    area: 'Onboarding',
                    improvements: ['Reduced text density', 'Increased visual guidance', 'Improved step clarity and pacing']
                },
                {
                    area: 'Dashboard',
                    improvements: ['Reorganized layout for faster scanning', 'Clarified hierarchy of metrics', 'Improved error visibility and labeling']
                },
                {
                    area: 'Electrical Health Dashboard',
                    improvements: ['Improved visual clarity of voltage, current, and frequency data', 'Clearer warning states for voltage issues', 'Stronger visual cues to guide corrective action']
                },
                {
                    area: 'AI Help & Support',
                    improvements: ['Separate flows for error-based assistance and general questions', 'Clear conversational structure', 'Focus on actionable recommendations']
                }
            ],
            impact: [
                'Validated the importance of trust and transparency in AI-assisted tools',
                'Demonstrated how small UX changes (text reduction, hierarchy) significantly improve comprehension',
                'Highlighted the need for role-aware design in industrial systems',
                'Strengthened ability to conduct field research, synthesize insights, and translate them into iterative design improvements'
            ],
            futureOpportunities: [
                'Root Cause Analysis: Deeper insight into why issues occur',
                'Customizable Notifications: Alerts tailored to role, urgency, and context',
                'Real-Time Emergency Handling: Faster detection and response to critical issues',
                'AI + External Expertise: Integrating third-party expert knowledge',
                'Bridging Skill Gaps: On-demand tutorials and AI guidance for less experienced users'
            ],
            skillsApplied: [
                'Qualitative Research',
                'User Interviews',
                'Research Synthesis',
                'Usability Evaluation',
                'Iterative Design',
                'AI Trust & Explainability',
                'Dashboard UX',
                'Human-Computer Interaction'
            ]
        }
    },
    {
        id: 'canvas-ux-redesign',
        name: 'Canvas UX Research & Flow Redesign',
        year: 2024,
        category: 'Research',
        description: 'Mixed-methods UX research identifying usability pain points and workflow inefficiencies in Canvas LMS across students, faculty, administrators, and staff. Combined user interviews, observational task analysis, heuristic evaluation, and measurement planning to uncover opportunities for navigation, efficiency, and mobile improvements.',
        shortDescription: 'LMS usability research',
        tools: ['User Interviews', 'Observational Studies', 'Heuristic Evaluation', 'Time-on-Task Measurement', 'Click Count Analysis'],
        tags: ['Usability Testing', 'Mixed-Methods', 'Workflow Analysis', 'EdTech'],
        featured: true,
        logo: '/images/canvas-logo-opt.png',
        images: {
            thumbnail: '/images/canvas-showcase.png',
            hero: '/images/canvas-showcase.png',
        },
        viewer: {
            type: '3d',
            glbModelPath: '/models/canvas-research.glb',
            deviceType: 'laptop',
            screens: [
                '/images/canvas/Course - Quizzes - 0.2.png',
                '/images/canvas/Preview Quiz - Quizzes - 0.5.png',
                '/images/canvas/Preview Quiz - Quizzes - 0.5-1.png',
                '/images/canvas/Preview Quiz - Quizzes - 0.5-2.png',
                '/images/canvas/Preview Quiz - Quizzes - 0.5-3.png',
                '/images/canvas/Preview Quiz - Quizzes - 0.5-4.png',
                '/images/canvas/Preview Quiz - Quizzes - 0.5-5.png',
                '/images/canvas/Preview Quiz - Quizzes - 0.5-6.png',
                '/images/canvas/Preview Quiz - Quizzes - 0.5-7.png',
                '/images/canvas/Preview Quiz - Quizzes - 0.5-8.png',
            ],
        },
        details: {
            role: 'UX Researcher',
            team: 'Research team',
            context: 'Mixed-methods research case study on Canvas Learning Management System across multiple user roles (students, faculty, administrators, staff)',
            problemStatement: 'Canvas users across different roles experienced usability pain points and workflow inefficiencies that were masked by high task completion rates. While users could technically complete tasks, many workflows were inefficient, cognitively demanding, and required excessive clicks and navigation. Mobile experience lacked parity with desktop, and faculty faced time-consuming manual processes for quiz editing and course setup.',
            researchGoals: [
                'Identify primary pain points across different Canvas user roles',
                'Understand how frequently used workflows differ between students, faculty, and administrators',
                'Measure inefficiencies using time-on-task and click count',
                'Evaluate usability issues using heuristic principles',
                'Identify opportunities for workflow and system-level improvements'
            ],
            researchMethods: [
                {
                    name: 'User Interviews',
                    description: 'Conducted structured interviews covering frequency and purpose of Canvas usage, typical workflows, most and least useful features, frustrations and pain points, mobile usage and accessibility needs, training and support resources, and desired improvements. Participants represented 8 user roles with 5–10+ years of Canvas experience.'
                },
                {
                    name: 'Observational Interviews',
                    description: 'Participants completed 5 predefined tasks while researchers tracked time-on-task, click count, errors, and task completion. Revealed that many workflows were technically successful but inefficient and cognitively demanding. Tasks included course setup, module organization, quiz editing, content imports, and attendance tracking.'
                },
                {
                    name: 'Heuristic Evaluation',
                    description: 'Conducted heuristic evaluation on existing Canvas flows focusing on course setup, module organization, quiz creation and editing, content imports, attendance tracking, and visibility/access control. Identified violations of usability principles and opportunities for improvement.'
                },
                {
                    name: 'Measurement Planning',
                    description: 'Created measurement plan to establish baseline performance metrics, enable comparison against redesigned flows, and track efficiency improvements over time. Focused on time-on-task, click count, error rates, and task completion across user roles.'
                }
            ],
            participants: [
                {
                    role: 'Students',
                    description: 'Undergraduate and MBA students (5–10+ years Canvas experience)'
                },
                {
                    role: 'Faculty',
                    description: 'Instructors across multiple disciplines'
                },
                {
                    role: 'Administrators',
                    description: 'Program directors and academic administrators'
                },
                {
                    role: 'Support Staff',
                    description: 'Advisors, librarians, CTLA staff'
                }
            ],
            keyFindings: [
                {
                    category: 'Navigation & Workflow Inefficiencies',
                    insights: [
                        'High task completion rates masked underlying inefficiencies',
                        'Many tasks required excessive clicks and long navigation paths',
                        'Users frequently had to navigate multiple layers to return to where they last worked',
                        'Lack of "system memory" caused repetitive navigation',
                        'MBA program pages grouping all courses into one view increased friction'
                    ]
                },
                {
                    category: 'Mobile Experience Gaps',
                    insights: [
                        'Mobile app lacked parity with desktop functionality',
                        'Mobile workflows consistently slower and more error-prone than desktop',
                        'Slower load times and reduced functionality discouraged mobile use',
                        'Many users relied on laptops even when mobile access was important'
                    ]
                },
                {
                    category: 'Faculty & Administrator Pain Points',
                    insights: [
                        'Quiz editing was error-prone and time-consuming',
                        'Quiz editing and course setup had significantly higher time-on-task',
                        'Manual date entry every semester created unnecessary workload',
                        'Default visibility and access settings were confusing',
                        'Limited ability to automate tasks (e.g., no JavaScript support)'
                    ]
                },
                {
                    category: 'Integration & External Tool Reliance',
                    insights: [
                        'Users relied heavily on external tools: Outlook, Google Calendar, Zoom, Teams, Kaltura, PlayPosit',
                        'Poor integration with Outlook forced users to maintain parallel systems',
                        'Lack of seamless integration created workflow fragmentation',
                        'Users developed workarounds using external tools'
                    ]
                }
            ],
            designIterations: [
                {
                    area: 'Persistent Navigation Memory',
                    improvements: [
                        'Return users to their last active page or task',
                        'Reduce repetitive navigation through system memory',
                        'Implement breadcrumb trails and quick-return features'
                    ]
                },
                {
                    area: 'Mobile Parity & Performance',
                    improvements: [
                        'Match desktop functionality more closely on mobile',
                        'Improve mobile load times and responsiveness',
                        'Optimize mobile workflows for common tasks'
                    ]
                },
                {
                    area: 'Workflow Simplification',
                    improvements: [
                        'Reduce click depth for common tasks',
                        'Improve quiz editing and saving behavior',
                        'Streamline course setup and module organization',
                        'Reduce reliance on repetitive manual inputs'
                    ]
                },
                {
                    area: 'Automation & Customization',
                    improvements: [
                        'Allow more flexibility for faculty (bulk edits, scripting)',
                        'Automate repetitive tasks like date entry',
                        'Provide clearer access and visibility controls',
                        'Improve feedback and system status indicators'
                    ]
                }
            ],
            impact: [
                'Demonstrated the value of combining qualitative and quantitative research',
                'Highlighted that successful task completion does not equal good UX',
                'Reinforced the importance of role-based workflow analysis',
                'Identified specific inefficiencies through time-on-task and click count metrics',
                'Provided actionable recommendations for navigation, mobile, and workflow improvements',
                'Strengthened skills in research planning, synthesis, and evaluation'
            ],
            futureOpportunities: [
                'Prototype and test redesigned navigation flows',
                'Develop mobile-first workflows for common tasks',
                'Create automation tools for faculty (bulk editing, templates)',
                'Improve integration with external tools (Outlook, Google Calendar)',
                'Conduct longitudinal study to measure efficiency improvements'
            ],
            skillsApplied: [
                'Qualitative Research',
                'Quantitative Research',
                'User Interviews',
                'Observational Studies',
                'Usability Testing',
                'Heuristic Evaluation',
                'Measurement Planning',
                'Task Analysis',
                'Human-Computer Interaction',
                'Mixed-Methods Research'
            ]
        }
    },
    {
        id: 'spotify-unwrapped',
        name: 'Spotify Un(Wrapped)',
        year: 2024,
        category: 'Research',
        description: 'Mixed-methods UX case study evaluating Spotify\'s mobile experience around music discovery and social listening. Combined qualitative research with statistical analysis — affinity mapping, think-aloud usability testing, confidence intervals, and System Usability Scale scoring — to measure the gap between Spotify\'s polished brand and its everyday usability for college-aged listeners.',
        shortDescription: 'Music discovery & social listening UX research',
        tools: ['Figma', 'User Interviews', 'Affinity Mapping', 'Usability Testing', 'System Usability Scale', 'Statistical Analysis'],
        tags: ['UX Research', 'Mixed-Methods', 'Usability Testing', 'Social UX'],
        featured: false,
        logo: '/images/spotify-unwrapped-logo-opt.png',
        poster: '/posters/spotify-poster.png',
        images: {
            thumbnail: '/images/spotify-unwrapped-logo-opt.png',
            hero: '/images/spotify-unwrapped-logo-opt.png',
        },
        viewer: {
            type: '3d',
            deviceType: 'phone',
            screens: [],
        },
        details: {
            role: 'UX Researcher & UI Designer',
            team: 'Five-person research team',
            duration: '6 weeks',
            context: 'A six-week graduate UX case study examining how Spotify supports — and sometimes obstructs — music discovery and social engagement. Working on a five-person team as a UX Researcher and UI Designer, I helped run a mixed-methods study with college-aged Premium subscribers, pairing qualitative methods (interviews, affinity mapping, think-aloud testing) with quantitative analysis (confidence intervals, error and satisfaction metrics, SUS scoring) to measure the distance between Spotify\'s polished brand and its everyday usability.',
            problemStatement: 'Spotify has reshaped how people access music and share listening with others, yet its mobile experience still makes social and organizational tasks harder than they should be. Affinity mapping across our research surfaced six recurring problems — limited in-app sharing, weak friend discovery, and frustrating playlist management chief among them. Users wanted to share songs, follow friends\' activity, and organize their libraries without leaving the app, but Spotify\'s flows pushed them toward third-party tools like Instagram Stories and iMessage and produced high error rates on core tasks. The study set out to quantify how severe these breakdowns were and where redesign effort would matter most.',
            researchGoals: [
                'Understand how college-aged listeners actually discover music and share it with friends',
                'Identify the core usability problems in Spotify\'s social and playlist features',
                'Measure task performance — error rate, clicks, time, and satisfaction — through think-aloud usability testing',
                'Validate findings statistically using confidence intervals and System Usability Scale scoring',
                'Translate research into prioritized, actionable design recommendations'
            ],
            researchMethods: [
                {
                    name: 'User Research & Affinity Mapping',
                    description: 'Recruited college-aged Spotify Premium subscribers with three to eleven years on the platform. Synthesized interview and observational data through affinity mapping, clustering raw observations into six core problem areas spanning in-app sharing, friend discovery, and mobile playlist management.'
                },
                {
                    name: 'Persona Development',
                    description: 'Distilled research into a primary persona — Manny Delgado, a socially driven listener who treats music as a way to set the vibe for the people around him. The persona anchored design decisions in real goals, behaviors, and frustrations, including a heavy reliance on Instagram Stories and Messages to share songs Spotify couldn\'t share natively.'
                },
                {
                    name: 'Think-Aloud Usability Testing',
                    description: 'Ran moderated think-aloud sessions covering three representative tasks — adding songs to a playlist, finding a friend\'s profile, and grouping songs into a new playlist. Captured error rate, click count, time on task, and post-task satisfaction for every participant.'
                },
                {
                    name: 'Statistical Analysis & SUS Scoring',
                    description: 'Calculated confidence intervals for task completion rates and administered the System Usability Scale to benchmark the experience against industry standards, giving the qualitative findings a quantitative backbone.'
                }
            ],
            participants: [
                {
                    role: 'College-Aged Premium Users',
                    description: 'Spotify Premium subscribers with 3–11 years of platform experience'
                },
                {
                    role: 'Usability Test Participants',
                    description: 'Listeners observed completing three core tasks in moderated think-aloud sessions'
                }
            ],
            keyFindings: [
                {
                    category: 'Six Core Problem Areas',
                    insights: [
                        'Affinity mapping consistently surfaced six recurring problems, led by limited in-app sharing and poor mobile playlist management',
                        'Users wanted to share and organize music inside Spotify but were pushed to third-party apps to do it',
                        'Social features felt like an afterthought rather than a core part of the listening experience'
                    ]
                },
                {
                    category: 'Task Performance Breakdown',
                    insights: [
                        'Adding songs to a playlist (Task 1) reached 100% completion — the experience held up for the simplest task',
                        'Finding a friend\'s profile (Task 2) dropped to 83% completion, exposing weak social discovery',
                        'Grouping songs into a new playlist (Task 3) fell to just 50% completion — the clearest failure point'
                    ]
                },
                {
                    category: 'Critical Usability Issues',
                    insights: [
                        'Quantitative metrics showed error rates as high as 57% on the most complex task',
                        'Post-task satisfaction bottomed out at 2 out of 5, confirming the frustration observed in think-aloud sessions',
                        'High error rates clustered around playlist organization and friend discovery — not playback'
                    ]
                },
                {
                    category: 'Below-Benchmark Usability (SUS)',
                    insights: [
                        'The System Usability Scale produced an average score of 53.13, well below the 70 industry benchmark',
                        'The result held at a 99% confidence level, making the gap statistically reliable rather than anecdotal',
                        'A strong brand was masking a measurably below-average usability experience'
                    ]
                }
            ],
            designIterations: [
                {
                    area: 'Playlist Management',
                    improvements: ['Introduce drag-and-drop reordering and grouping to fix the lowest-performing task', 'Streamline the flow for building a playlist from existing songs', 'Reduce click depth and error rate around library organization']
                },
                {
                    area: 'Social Discovery',
                    improvements: ['Add a dedicated Friends tab so following and finding people is no longer buried', 'Make friend profiles and listening activity reachable from the main navigation', 'Treat social discovery as a first-class feature rather than a hidden one']
                },
                {
                    area: 'In-App Sharing',
                    improvements: ['Build native social sharing sections so users stop exporting to Instagram and iMessage', 'Surface shared and friend-recommended songs directly inside the listening experience']
                },
                {
                    area: 'Inclusive Listening',
                    improvements: ['Add romanization of foreign-language lyrics so listeners can follow along with songs in unfamiliar scripts', 'Broaden the experience for multilingual and international listeners']
                }
            ],
            impact: [
                'Quantified a measurable usability gap behind a strong consumer brand — a 53.13 SUS score against a 70 benchmark at 99% confidence',
                'Pinpointed playlist management and social discovery as the highest-priority redesign targets through task-level metrics',
                'Demonstrated the value of pairing qualitative research with statistical validation to make findings credible and actionable',
                'Produced prioritized design recommendations grounded in both user frustration and hard performance data',
                'Strengthened my ability to plan mixed-methods studies, run think-aloud testing, and translate analysis into design direction'
            ],
            futureOpportunities: [
                'Prototype and usability-test the redesigned drag-and-drop playlist flow',
                'Design and validate a dedicated Friends tab and native sharing experience',
                'Expand the participant pool beyond college-aged users to test generational differences',
                'Run a follow-up SUS study after redesign to measure improvement against the 70 benchmark',
                'Explore lyric romanization and other inclusive features for multilingual listeners'
            ],
            skillsApplied: [
                'Qualitative Research',
                'Quantitative Research',
                'User Interviews',
                'Affinity Mapping',
                'Persona Development',
                'Think-Aloud Usability Testing',
                'Statistical Analysis',
                'System Usability Scale (SUS)',
                'Research Synthesis',
                'UI Design'
            ]
        }
    },
    {
        id: 'pots-access-technology',
        name: 'POTS Access Technology',
        year: 2024,
        category: 'Product Design',
        description: 'Designed a companion app and smart cane for managing Postural Orthostatic Tachycardia Syndrome (POTS). This research-driven solution provides real-time heart rate episode detection, guided breathing exercises, and symptom logging to support daily independence.',
        shortDescription: 'Companion app & smart cane for POTS management',
        tools: ['Figma', 'User Research', 'Prototyping', 'Usability Testing', 'Secondary Research', 'Interaction Design'],
        tags: ['Access Technology', 'Health & Wellness', 'Product Design', 'UX Research'],
        featured: true,
        logo: '/images/pots-logo-opt.png',
        images: {
            thumbnail: '/images/pots-logo-opt.png',
            hero: '/images/pots/Episode-Warning-1.png',
        },
        viewer: {
            type: '3d',
            glbModelPath: '/models/pots-app.glb',
            deviceType: 'phone-watch',
            screens: [
                '/images/pots/Episode-Warning-1.png',
                '/images/pots/Home.png',
                '/images/pots/Logging.png',
                '/images/pots/Tips.png',
                '/images/pots/Vibrations.png',
                '/images/pots/Episode-Warning.png',
            ],
            watchScreens: [
                '/images/watch-pots/WARNING - WATCH 1.png',
                '/images/watch-pots/HOME - WATCH 5.png',
                '/images/watch-pots/LOGGING - WATCH 3.png',
                '/images/watch-pots/TIPS - WATCH 2.png',
            ],
            tablet3dModels: [
                { id: 'pots-cane' },
            ],
        },
        details: {
            role: 'UX Researcher & Designer',
            team: 'Design team (collaborative)',
            duration: 'Full semester',
            context: 'Designed an access technology for a user living with POTS — a chronic condition causing rapid heart rate spikes, dizziness, fatigue, and fainting upon standing. The project combined primary research with the user and secondary medical research to create a holistic solution addressing both physical support (smart cane) and digital management (companion app).',
            problemStatement: 'The user experiences sudden, debilitating POTS episodes — rapid heart rate spikes, dizziness, brain fog, and risk of fainting — triggered by standing or positional changes. Existing tools did not provide real-time detection, guided intervention, or comprehensive symptom tracking. The user needed a way to detect episodes early, receive immediate guided support, log symptoms for medical appointments, and carry emergency features — all without drawing unwanted attention to their condition.',
            researchGoals: [
                'Understand the user\'s daily experience living with POTS and identify key pain points',
                'Explore how episodes are triggered, detected, and currently managed',
                'Investigate existing assistive technologies and identify gaps',
                'Design an integrated hardware + software solution that fits naturally into daily life',
                'Validate the design through iterative prototyping and usability testing'
            ],
            researchMethods: [
                {
                    name: 'User Interviews & Contextual Inquiry',
                    description: 'Conducted in-depth interviews with the user to understand their daily routines, episode triggers, coping strategies, and frustrations with current tools. Observed how they navigate daily activities and identified moments where technology could provide the most value.'
                },
                {
                    name: 'Secondary Medical Research',
                    description: 'Reviewed medical literature on POTS — its symptoms, prevalence, treatment options, and the role of heart rate monitoring in episode detection. Researched existing wearable health technologies and identified opportunities for integration with smart cane hardware.'
                },
                {
                    name: 'Low-Fidelity Prototyping & Testing',
                    description: 'Created initial wireframes and low-fidelity prototypes for both the app and cane. Tested early concepts with the user to validate the information architecture, screen flows, and physical cane form factor before moving to high-fidelity design.'
                },
                {
                    name: 'High-Fidelity Prototyping & Usability Testing',
                    description: 'Designed a complete high-fidelity prototype in Figma covering episode detection alerts, breathing exercises, symptom logging, vibration notification settings, and episode support tips. Conducted usability testing sessions to refine interactions and visual design.'
                }
            ],
            participants: [
                {
                    role: 'Primary User',
                    description: 'Individual living with POTS who experiences daily episodes'
                },
                {
                    role: 'Medical Research Sources',
                    description: 'Academic literature on POTS, heart rate monitoring, and assistive technology'
                }
            ],
            keyFindings: [
                {
                    category: 'Episode Detection & Response',
                    insights: [
                        'Heart rate spikes above a personal threshold (e.g., 120 BPM) are the earliest reliable indicator of an episode',
                        'The user needs immediate, actionable guidance — not just an alert — when an episode begins',
                        'Multiple response options (breathing exercise, self-dismiss, emergency call) are critical since episode severity varies',
                        'Real-time monitoring via watch or cane sensor provides the fastest detection'
                    ]
                },
                {
                    category: 'Symptom Logging & Tracking',
                    insights: [
                        'The user struggles to recall episode details during medical appointments',
                        'Logging needs to capture heart rate data, activity context, mood, and symptoms simultaneously',
                        'Voice recording capability is important when the user is too symptomatic to type',
                        'Medical data auto-population from connected devices reduces logging burden'
                    ]
                },
                {
                    category: 'Physical Support & Discretion',
                    insights: [
                        'The user benefits from physical stability support but wants to avoid drawing unnecessary attention',
                        'A collapsible cane design makes the device portable and socially comfortable',
                        'Integrating health sensors, medication storage, and an SOS button into the cane handle creates a single support device',
                        'An ergonomic game-controller-style grip improves comfort during extended use'
                    ]
                },
                {
                    category: 'Daily Management',
                    insights: [
                        'Hydration, nutrition, and medication tracking are essential parts of POTS management',
                        'The user benefits from personalized insights based on logged episode patterns',
                        'Customizable vibration notification settings allow the user to choose alert intensity and triggers',
                        'Episode support tips (elevate legs, drink water, rest, loosen clothes) provide immediate relief guidance'
                    ]
                }
            ],
            designIterations: [
                {
                    area: 'Episode Warning System',
                    improvements: ['Warm gradient alert screen that is calming rather than alarming', 'Three-tier response: "Let\'s Breathe" guided exercise, "I\'m OK" self-dismiss, and "Call Emergency Services"', 'Clear, large typography readable during an episode when vision may be impaired']
                },
                {
                    area: 'Home Dashboard',
                    improvements: ['Real-time heart rate visualization with watch sync status', 'Quick-access episode logging and log history', 'Medication tracking with scheduled reminders', 'Hydration and nutrition progress cards with daily goals']
                },
                {
                    area: 'Symptom Logging',
                    improvements: ['Auto-populated medical data from connected sensors', 'Mood and activity selectors for quick contextual logging', 'Symptom checklist (dizziness, fatigue, brain fog, nausea) with custom additions', 'Voice recording for hands-free logging during episodes']
                },
                {
                    area: 'Smart Cane Design',
                    improvements: ['Heart rate sensor in handle for passive monitoring', 'Integrated SOS button for emergencies', 'Built-in pill box for medication storage', 'Collapsible leg for portability and discretion', 'Rubber foot for stability on all surfaces']
                }
            ],
            impact: [
                'Created a comprehensive, research-driven solution addressing both physical and digital needs of a POTS patient',
                'Demonstrated how primary user research with a real individual drives empathetic, effective design',
                'Designed an integrated hardware + software ecosystem that works together seamlessly',
                'Showed how access technology can be designed to be both functional and socially discreet',
                'Strengthened skills in health-focused UX design, accessibility, and iterative prototyping',
                'Validated design decisions through multiple rounds of user testing and feedback'
            ],
            futureOpportunities: [
                'Machine learning model to predict episodes before they occur based on historical patterns',
                'Integration with electronic health records for automatic sharing with healthcare providers',
                'Community features connecting POTS patients for peer support',
                'Expanded cane sensor suite including temperature and blood pressure monitoring',
                'Caregiver dashboard with real-time alerts and episode history'
            ],
            skillsApplied: [
                'User Research',
                'Contextual Inquiry',
                'Secondary Research',
                'Interaction Design',
                'High-Fidelity Prototyping',
                'Usability Testing',
                'Accessibility Design',
                'Health UX',
                'Hardware-Software Integration',
                'Figma'
            ]
        }
    },
    {
        id: 'iu-research-assistant',
        name: 'Research Assistant — IU Indianapolis',
        year: 2024,
        category: 'Research',
        description: 'Worked across two HCI research labs focusing on interactive data visualization, conceptual metaphor theory, and human-centered AI. Conducted museum field studies, AI-assisted qualitative analysis of 5,000+ Reddit posts, and 20 usability testing sessions with older adults on AI health information systems.',
        shortDescription: 'HCI research across two labs',
        tools: ['Qualitative Coding', 'Field Studies', 'Python', 'Figma', 'NotebookLM', 'Kinect Sensors', 'Usability Testing'],
        tags: ['HCI Research', 'AI-Assisted Analysis', 'Museum Studies', 'Older Adults', 'Data Visualization'],
        featured: false,
        logo: '/images/iu-logo-opt.png',
        caseStudyImage: '/posters/iu-research-poster.png',
        poster: '/posters/new_iuposter.png',
        images: {
            thumbnail: '/images/iu-research-thumb.jpg',
            hero: '/images/iu-research-hero.jpg',
        },
        viewer: {
            type: '3d',
            glbModelPath: '/models/iu-research.glb',
            deviceType: 'tablet',
            screens: ['/posters/new_iuposter.png'],
        },
        details: {
            role: 'Research Assistant',
            team: 'Two HCI research labs (Francesco Cafaro, Aquesha Martin-Hammond)',
            duration: 'HCI Master\'s Program',
            context: 'Worked across two research labs in the HCI Master\'s program, focusing on interactive data visualization with museum field studies, AI-assisted qualitative analysis using Conceptual Metaphor Theory, and human-centered AI research with older adults.',
            problemStatement: 'Research challenges spanned multiple domains: (1) Understanding how embodied interaction and movement-based metaphors support learning in museum contexts, (2) Evaluating whether AI tools can reliably apply advanced theoretical frameworks to large qualitative datasets, (3) Surfacing trust, transparency, and accessibility challenges when deploying AI for sensitive domains like healthcare with older adults.',
            researchGoals: [
                'Support design and evaluation of interactive data visualization for museum deployment',
                'Conduct field studies at Indiana State Museum observing children\'s interactions',
                'Investigate whether LLMs can assist in qualitative analysis using Conceptual Metaphor Theory',
                'Evaluate AI consistency, confidence, and limitations in applying theoretical frameworks',
                'Examine older adults\' perceptions of AI systems for health information seeking',
                'Surface trust, transparency, and accessibility challenges in AI-driven health tools'
            ],
            researchMethods: [
                {
                    name: 'Interactive Data Visualization & Museum Field Studies',
                    description: 'Designed research and workshop artifacts using Figma and Adobe Premiere Pro for virtual workshops on Zoom. Recruited museum professionals through personal/professional networks, LinkedIn, and academic publications. Researched and curated sustainability-related datasets for interactive visualization deployed at Indiana State Museum. Conducted field studies observing children, utilizing Kinect-based sensors to capture participant movement and reflections. Recorded sessions and conducted qualitative coding to identify patterns and insights in user behavior.'
                },
                {
                    name: 'AI-Assisted Qualitative Analysis (Conceptual Metaphor Theory)',
                    description: 'Collected 5,000+ Reddit posts and comments from r/dataisbeautiful using Python scripts, Google Colab, and Reddit API. Selected randomized samples for analysis. Used NotebookLM with curated knowledge sources: embodied schemata dictionary, 100+ page academic text on embodied cognition, and PDFs of Reddit threads. Iteratively refined prompts using Google Gemini to optimize qualitative coding performance. Evaluated outputs based on conceptual accuracy, confidence levels, and consistency across repeated runs.'
                },
                {
                    name: 'Human-Centered AI for Older Adults',
                    description: 'Designed scenario-based task surveys exploring older adults\' reactions to AI-driven health inquiries. Prototyped and tested AI-powered artifact for health-related search tasks. Conducted 20 usability testing sessions with older adult participants. Collected qualitative feedback on trust in AI-generated health information, privacy and data safety concerns, perceived usefulness and ease of use, and emotional reactions.'
                }
            ],
            participants: [
                {
                    role: 'Museum Professionals',
                    description: 'Recruited through networks, LinkedIn, and academic publications for workshops'
                },
                {
                    role: 'Children (Museum Visitors)',
                    description: 'Observed during field studies at Indiana State Museum'
                },
                {
                    role: 'Older Adults',
                    description: '20 participants for AI health information usability testing'
                }
            ],
            keyFindings: [
                {
                    category: 'Embodied Interaction in Museums',
                    insights: [
                        'Movement-based metaphors supported learning and engagement in museum contexts',
                        'Kinect sensors effectively captured participant movement and reflections during interaction',
                        'Qualitative coding revealed patterns in how children engaged with sustainability data',
                        'Interactive visualization facilitated embodied cognition and schema activation'
                    ]
                },
                {
                    category: 'AI-Assisted Qualitative Analysis',
                    insights: [
                        'High-confidence AI interpretations consistently aligned with expert human judgment',
                        'Medium-confidence outputs matched interpretations a trained student researcher might produce',
                        'Low-confidence outputs were frequently incorrect or nonsensical',
                        'Full output consistency could not be achieved due to inherent LLM variability',
                        'AI tools can meaningfully assist in applying complex theoretical frameworks to large datasets',
                        'AI augments but does not replace human qualitative research expertise'
                    ]
                },
                {
                    category: 'AI & Older Adults: Trust & Transparency',
                    insights: [
                        'Trust in AI-generated health information varied significantly among participants',
                        'Privacy and data safety were primary concerns for older adults',
                        'Transparency about AI limitations increased trust and acceptance',
                        'Emotional reactions ranged from hesitation to cautious optimism',
                        'Accessibility challenges emerged in AI interface design for older adults'
                    ]
                },
                {
                    category: 'Cross-Lab Synthesis',
                    insights: [
                        'Embodied cognition principles apply across physical (museum) and digital (AI) interactions',
                        'Trust and transparency are critical whether deploying physical installations or AI systems',
                        'Qualitative research methods remain essential even when augmented by AI tools',
                        'User-centered design principles transcend specific technologies or contexts'
                    ]
                }
            ],
            designIterations: [
                {
                    area: 'Museum Workshop Design',
                    improvements: ['Created virtual workshop artifacts in Figma and Adobe Premiere Pro', 'Adapted recruitment strategies across multiple channels', 'Curated sustainability datasets for visualization']
                },
                {
                    area: 'AI Prompt Engineering',
                    improvements: ['Iteratively refined prompts using Google Gemini', 'Optimized knowledge sources for NotebookLM', 'Evaluated multiple LLMs before selecting optimal approach', 'Balanced theoretical rigor with practical applicability']
                },
                {
                    area: 'Usability Testing Protocol',
                    improvements: ['Designed scenario-based task surveys for older adults', 'Prototyped AI-powered health search artifact', 'Adapted testing approach based on participant feedback', 'Refined questions to surface trust and privacy concerns']
                }
            ],
            impact: [
                'Supported real-world deployment and evaluation of interactive museum installations',
                'Demonstrated how AI tools can augment—but not replace—human qualitative research',
                'Contributed to research on accessibility, learning, and trust in emerging technologies',
                'Strengthened interdisciplinary research skills bridging HCI, UX research, AI, and design',
                'Published findings contributing to academic understanding of embodied cognition and AI-assisted analysis',
                'Informed design of more accessible and trustworthy AI systems for older adults'
            ],
            futureOpportunities: [
                'Scale AI-assisted qualitative analysis to additional theoretical frameworks',
                'Expand museum field studies to diverse age groups and contexts',
                'Develop guidelines for transparent AI communication with older adults',
                'Create hybrid human-AI qualitative analysis workflows',
                'Investigate long-term trust development in AI health information systems'
            ],
            skillsApplied: [
                'Qualitative Research',
                'Field Studies & Observational Research',
                'User Interviews & Usability Testing',
                'Qualitative Coding & Thematic Analysis',
                'Conceptual Metaphor Theory (CMT)',
                'Embodied Cognition & Schemata',
                'AI-Assisted Qualitative Analysis',
                'Research Recruitment & Study Design',
                'Interactive Data Visualization Evaluation',
                'Human-Centered AI Research',
                'Python & API Integration',
                'Prompt Engineering'
            ]
        },
        caseStudy: {
            problem: 'Three interconnected research challenges: evaluating embodied interaction in museums, testing AI\'s ability to apply complex theoretical frameworks to qualitative data, and understanding older adults\' trust in AI health information systems.',
            approach: 'Multi-method approach across two labs: museum field studies with Kinect sensors and qualitative coding, AI-assisted analysis of 5,000+ Reddit posts using Conceptual Metaphor Theory and NotebookLM, and 20 usability sessions with older adults on AI health tools.',
            sketches: ['/images/iu-museum-study.jpg', '/images/iu-ai-analysis.jpg'],
            iterations: 'Iteratively refined workshop artifacts, recruitment strategies, AI prompts, and usability testing protocols based on participant feedback and research findings across both labs.',
            outcome: 'Demonstrated AI can augment qualitative research, supported museum installation deployment, and surfaced critical trust and accessibility insights for AI systems serving older adults. Strengthened interdisciplinary HCI research skills.',
        },
    },
    {
        id: 'threads-identity-anonymity',
        name: 'Rethinking Identity & Anonymity on Threads',
        year: 2024,
        category: 'Research',
        description: 'UX research and conceptual design case study examining how Threads\' platform design influences self-presentation, authenticity, and participation. Grounded in Self-Presentation Theory, explored how persistent identity and audience opacity shape user behavior, leading to self-censorship and performative interaction.',
        shortDescription: 'Social media identity research',
        tools: ['Qualitative Coding', 'Thematic Analysis', 'Persona Development', 'Public Data Analysis', 'Conceptual Design'],
        tags: ['Social Computing', 'Self-Presentation Theory', 'UX Research', 'HCI'],
        featured: false,
        logo: '/images/threads-logo-opt.png',
        caseStudyImage: '/images/threads-infographic.jpg',
        poster: '/posters/threads-poster.png',
        images: {
            thumbnail: '/images/threads-thumb.jpg',
            hero: '/images/threads-hero.jpg',
        },
        viewer: {
            type: '3d',
            glbModelPath: '/models/threads-research.glb',
            deviceType: 'phone',
            screens: [],
        },
        details: {
            role: 'Qualitative UX & HCI Researcher',
            team: 'Research team with cross-validation',
            context: 'Case study examining Threads (Meta) platform design and its influence on identity, anonymity, and self-presentation in social media',
            problemStatement: 'Threads positions itself as a conversational, text-based social platform, yet its tight integration with Instagram and Facebook creates high identity persistence and context collapse. Users must navigate a complex social environment where family, colleagues, and strangers share the same invisible audience. Users want to express authentic, opinionated, or exploratory thoughts, but feel constrained by long-term identity exposure and unclear audience boundaries.',
            researchGoals: [
                'Understand how users manage identity and impression on Threads',
                'Identify how platform affordances influence tone, participation, and self-censorship',
                'Examine tensions between authenticity, safety, and visibility',
                'Explore opportunities for design interventions that reduce reputational risk without enabling harmful behavior'
            ],
            researchMethods: [
                {
                    name: 'Public Data Analysis',
                    description: 'Analyzed 40 publicly accessible Threads posts and comment threads across sports, politics, lifestyle, and opinion-driven topics to understand patterns in self-presentation and discourse.'
                },
                {
                    name: 'Qualitative Interviews',
                    description: 'Conducted 5 interviews with active Threads users focused on posting behavior, tone decisions, and audience awareness to surface motivations and constraints.'
                },
                {
                    name: 'Thematic Coding & Theory-Driven Synthesis',
                    description: 'Performed thematic coding of interview transcripts and public posts with cross-validation among team members. Used Self-Presentation Theory to resolve interpretive differences and ground findings in established social science frameworks.'
                }
            ],
            participants: [
                {
                    role: 'Active Threads Users',
                    description: '5 interviewees with regular posting and engagement patterns'
                },
                {
                    role: 'Public Post Authors',
                    description: '40 publicly accessible posts across diverse topics'
                }
            ],
            keyFindings: [
                {
                    category: 'Identity Persistence ("Instagram Anchor")',
                    insights: [
                        'Linking Threads to Instagram/Facebook made digital footprint feel high-stakes',
                        'Many users chose to lurk or only post universally "safe" content',
                        'Persistent identity created long-term reputational concerns',
                        'Users felt unable to experiment with different personas or perspectives'
                    ]
                },
                {
                    category: 'Context Collapse & Audience Uncertainty',
                    insights: [
                        'Participants highly aware that diverse audiences (family, coworkers, friends) could see posts simultaneously',
                        'Resulted in conservative language, hedging, or post abandonment',
                        'Audience opacity created anxiety about unintended interpretations',
                        'Users struggled to calibrate tone without knowing who would see content'
                    ]
                },
                {
                    category: 'Performative vs. Authentic Expression',
                    insights: [
                        'Users curated tone (humor, expertise, supportiveness) to manage impressions',
                        'Threads felt more polite than other platforms',
                        'Safety often came at cost of vulnerability and honest debate',
                        'Performative posting reinforced by platform affordances'
                    ]
                },
                {
                    category: 'Topic-Driven Escalation',
                    insights: [
                        'Identity-linked topics (politics, sports) more likely to escalate into conflict',
                        'Reinforced avoidance behaviors and performative posting styles',
                        'Users self-censored on controversial topics to protect reputation',
                        'Platform design discouraged substantive debate on important issues'
                    ]
                }
            ],
            designIterations: [
                {
                    area: 'Persona Development',
                    improvements: [
                        'Created primary persona: socially aware, engaged commenter who values credibility and humor',
                        'Persona motivated to participate but frequently second-guesses posts due to audience ambiguity',
                        'Grounded design decisions in real behavioral patterns rather than abstract assumptions'
                    ]
                },
                {
                    area: 'Conceptual Design: Ghost Feed',
                    improvements: [
                        'Separate Ghost Feed tab within Threads for anonymous discourse',
                        'Randomized, rotating Ghost IDs (no profile pictures, followers, or cross-profile access)',
                        'Topic-based spaces (Debate Corner, Hot Takes, Confessions)',
                        'Ephemeral reputation signals (Constructive Debater, Fact Provider) to encourage healthy discourse'
                    ]
                },
                {
                    area: 'Balancing Anonymity & Accountability',
                    improvements: [
                        'Designed system to reduce self-censorship while discouraging malicious behavior',
                        'Reputation signals provide accountability without long-term identity consequences',
                        'Topic-based spaces create contextual boundaries',
                        'Rotating IDs prevent persistent trolling while enabling authentic expression'
                    ]
                }
            ],
            impact: [
                'Demonstrated how platform affordances directly shape social behavior and self-expression',
                'Highlighted the role of identity persistence in suppressing participation',
                'Showed the value of grounding design decisions in social theory and qualitative evidence',
                'Identified gap between users\' desire for authentic expression and platform\'s persistent identity model',
                'Proposed actionable design intervention (Ghost Feed) addressing research findings',
                'Strengthened skills in theory-driven UX research, synthesis, and conceptual design'
            ],
            futureOpportunities: [
                'Prototype and test Ghost Feed concept with real users',
                'Expand research to other identity-persistent platforms (LinkedIn, Facebook)',
                'Investigate optimal balance of anonymity and accountability',
                'Develop guidelines for platform designers on identity flexibility',
                'Study long-term effects of anonymous spaces on community health'
            ],
            skillsApplied: [
                'Qualitative UX Research',
                'Public Data Analysis',
                'Thematic Coding',
                'Persona Development',
                'Social Computing',
                'Human-Computer Interaction',
                'Theory-Driven Design',
                'Self-Presentation Theory',
                'Conceptual Design',
                'Research Synthesis'
            ]
        },
        caseStudy: {
            problem: 'Threads\' tight integration with Instagram/Facebook creates high identity persistence and context collapse. Users want authentic expression but feel constrained by long-term identity exposure and unclear audience boundaries, leading to self-censorship and performative interaction.',
            approach: 'Analyzed 40 public Threads posts and conducted 5 qualitative interviews with active users. Performed thematic coding with cross-validation and used Self-Presentation Theory to ground findings. Developed persona to represent user tensions.',
            sketches: ['/images/threads-analysis.jpg', '/images/ghost-feed-concept.jpg'],
            iterations: 'Iteratively refined thematic codes through team cross-validation. Developed persona based on behavioral patterns. Designed Ghost Feed concept to address gap between authentic expression desire and persistent identity model.',
            outcome: 'Demonstrated how platform affordances suppress participation. Proposed Ghost Feed design with rotating anonymous IDs, topic-based spaces, and ephemeral reputation signals to balance authenticity, safety, and accountability.',
        },
    },
    {
        id: 'ar-glasses-tryon',
        name: 'Nike Vision — AR Virtual Try-On',
        year: 2026,
        category: 'Interactive Systems',
        description: 'Designed and built a fully functional web-based augmented reality (AR) virtual try-on experience for eyewear. Users can see exactly how a pair of glasses looks on their face in real-time using only their device\'s camera — no dedicated app required. The solution covers the complete user journey from product detail page through a 5-state AR pipeline with live face-tracked glasses rendering.',
        shortDescription: 'Browser-based AR glasses try-on experience',
        tools: ['React', 'Three.js', 'MediaPipe', 'Vite', 'Figma', 'Interaction Design'],
        tags: ['Augmented Reality', 'E-Commerce UX', 'Face Tracking', 'WebXR', 'Product Design'],
        featured: true,
        logo: '/images/nike-vision-logo.svg',
        images: {
            thumbnail: '/images/glasses/01_Product_Page_Hero.png',
            hero: '/images/glasses/09_AR_Live_TryOn_Tracking.png',
        },
        viewer: {
            type: '3d',
            glbModelPath: '/models/ar-glasses.glb',
            deviceType: 'laptop',
            screens: [
                '/images/glasses/01_Product_Page_Hero.png',
                '/images/glasses/02_Product_Details_Expanded.png',
                '/images/glasses/03_Color_Variant_Selection.png',
                '/images/glasses/04_3D_Angle_View.png',
                '/images/glasses/05_AR_Permission_Modal.png',
                '/images/glasses/06_AR_Virtual_TryOn_Permission.png',
                '/images/glasses/07_AR_Find_Face_Guided.png',
                '/images/glasses/08_AR_Face_Locked_Confirmation.png',
                '/images/glasses/09_AR_Live_TryOn_Tracking.png',
            ],
        },
        details: {
            role: 'UX/UI Designer & Frontend Developer',
            team: 'Solo project — end-to-end design & development',
            duration: '2026',
            context: 'Side project exploring how browser-based AR can eliminate the confidence gap in online eyewear shopping. Designed and built end-to-end from product detail page through a fully functional AR try-on pipeline using MediaPipe face tracking and Three.js rendering.',
            problemStatement: 'Online eyewear purchases have a fundamental UX problem: glasses are one of the most personal, face-defining accessories, yet most e-commerce platforms ask users to buy them sight-unseen. The industry faces 30–50% return rates for online purchases with "didn\'t look right on me" as the leading reason. Existing AR try-on solutions require native app downloads, creating massive funnel drop-off from 25% to just 3% of users actually trying on glasses.',
            researchGoals: [
                'Eliminate fit uncertainty by rendering actual products on the user\'s face in real-time',
                'Design a seamless browsing-to-AR transition that feels native to the shopping flow',
                'Build a privacy-first camera experience with pre-prompting to maximize permission acceptance',
                'Create a guided face acquisition flow that builds user confidence in AR accuracy',
                'Enable real-time color comparison while wearing glasses — the key differentiator'
            ],
            researchMethods: [
                {
                    name: 'Competitive Analysis',
                    description: 'Analyzed AR try-on implementations across Warby Parker (iOS-only native app), Ray-Ban (limited native app), and Zenni Optical (2D overlay) to identify gaps in platform accessibility, color switching, and privacy-first design.'
                },
                {
                    name: 'Industry Research',
                    description: 'Reviewed market data: $11.4B global AR retail market (2025), 94% higher conversion with AR features (Shopify), 25-40% return rate reduction (McKinsey). Identified WebXR and MediaPipe maturity as enablers for browser-based AR.'
                },
                {
                    name: 'User Flow Design & State Machine Architecture',
                    description: 'Designed a 5-state machine (IDLE → PERMISSION → FIND_FACE → LOCK → TRACKING → LOST) ensuring users never see broken or poorly-aligned AR content. Each state transition addresses a specific user concern: trust, guidance, confirmation, and confidence.'
                },
                {
                    name: 'Interaction Design & Prototyping',
                    description: 'Created a 9-screen user journey from product browsing through live AR try-on. Each screen solves a specific UX problem: first impressions, progressive disclosure, color exploration, camera trust, face acquisition, accuracy confirmation, and real-time try-on with inline color switching.'
                }
            ],
            participants: [
                {
                    role: 'E-Commerce Shoppers',
                    description: 'Target users who experience fit uncertainty when buying glasses online'
                },
                {
                    role: 'Industry Benchmarks',
                    description: 'Warby Parker, Ray-Ban, Zenni Optical AR implementations analyzed'
                }
            ],
            keyFindings: [
                {
                    category: 'The Confidence Gap',
                    insights: [
                        'Glasses are deeply personal — fit, proportion, and style interaction with facial geometry cannot be conveyed through flat product photography',
                        'Online eyewear return rates of 30-50% are driven primarily by "didn\'t look right on me"',
                        'Cart abandonment above 70% in fashion e-commerce stems from inability to "try before you buy"',
                        'Users default to in-store shopping even when online prices are lower due to uncertainty'
                    ]
                },
                {
                    category: 'App Download Funnel Drop-off',
                    insights: [
                        'Native AR apps lose ~88% of interested users between "Click Try On" and "Actually try on"',
                        'Browser-based AR keeps conversion 7× higher by eliminating the app store detour',
                        'Pre-prompting for camera access increases permission acceptance from ~40% to ~85%',
                        'WebAssembly-based face tracking now achieves 468-point face mesh at 30+ FPS in-browser'
                    ]
                },
                {
                    category: 'AR Interaction Patterns',
                    insights: [
                        'The "Find Face" guided acquisition with confidence feedback builds more trust than instant glasses rendering',
                        'Color switching while wearing glasses was consistently cited as the most valuable feature — more than the try-on itself',
                        'Mirror mode (front camera mirrored) is critical — users immediately sense "something wrong" with non-mirrored feeds',
                        'Maintaining 30+ FPS on mid-range mobile devices is essential — dropped frames destroy the illusion'
                    ]
                },
                {
                    category: 'Privacy & Trust Design',
                    insights: [
                        'Camera privacy is the #1 user concern for AR features',
                        'Application-level consent UI before browser prompt dramatically increases acceptance',
                        'Clear "no photos stored" messaging with lock icon addresses anxiety directly',
                        'Client-side-only processing eliminates data upload concerns entirely'
                    ]
                }
            ],
            designIterations: [
                {
                    area: 'Product Detail Page',
                    improvements: ['Nike.com-inspired premium retail aesthetic with glassmorphism AR entry button', 'Progressive disclosure via accordion pattern prevents scroll fatigue', 'SVG-based illustrations enable instant color-swapping without separate image assets', 'Four viewing angles (Front, 3/4, Side Profile, Lens Detail) reveal frame depth and proportion']
                },
                {
                    area: 'Camera Permission Flow',
                    improvements: ['Pre-prompting pattern with branded permission screen before browser native prompt', 'Privacy assurance with lock icon positioned near action buttons where eyes naturally land', 'Equal-weight Cancel and Enable buttons — no dark patterns', 'Calming visual design reduces camera activation anxiety']
                },
                {
                    area: 'Face Acquisition & Tracking',
                    improvements: ['Snapchat-inspired oval guide ring with dashed face silhouette for spatial reference', 'Real-time adaptive guidance text: "Move closer," "Face forward," "Center your face," "Hold still..."', '70% confidence threshold with 700ms stability window prevents false positives', 'Green success confirmation with glow filter provides positive feedback before glasses appear']
                },
                {
                    area: 'Live AR Try-On',
                    improvements: ['Real-time color switching without exiting AR — unique differentiator vs. competitors', 'Floating pill control bar with Close, Flip Camera, Capture, Recalibrate, and Next Color', 'Custom exponential smoothing filter prevents landmark jitter while maintaining responsiveness', 'Screenshot capture enables organic social sharing']
                }
            ],
            impact: [
                'Demonstrated that premium AR experiences don\'t require native apps — browser-based is production-ready',
                'Designed a reusable 5-state AR interaction pattern applicable to any face-worn accessory',
                'Achieved 7× higher try-on conversion vs. native app approaches by eliminating download friction',
                'Industry AR data projects 25-40% return rate reduction and 94% higher conversion for products with AR',
                'Established privacy-first design as a competitive advantage — no data ever leaves the device',
                'Proved face tracking is production-ready in the browser for fashion and eyewear use cases'
            ],
            futureOpportunities: [
                'Face shape analysis — automatically recommend frame shapes based on detected geometry',
                'Side-by-side comparison — split screen to compare two frames simultaneously',
                'Social sharing flow — direct share to Instagram/TikTok from capture screen',
                'Prescription lens simulation — show tinted, polarized, and photochromic effects',
                'Multi-person mode — let two people try on glasses at the same time'
            ],
            skillsApplied: [
                'UX/UI Design',
                'Interaction Design',
                'Frontend Development (React)',
                '3D Rendering (Three.js)',
                'Face Tracking (MediaPipe)',
                'AR/XR Design Patterns',
                'E-Commerce UX',
                'Privacy-First Design',
                'State Machine Architecture',
                'Performance Optimization'
            ]
        }
    },
    {
        id: 'wave-watch-gesture-control',
        name: 'Wave & Watch — Gesture-Controlled Smartwatch',
        year: 2025,
        category: 'Interactive Systems',
        description: 'Designed and built a functional gesture-controlled smartwatch prototype addressing touchscreen accessibility for users with motor disabilities such as Parkinson\'s disease. Uses real-time hand tracking via webcam to let users navigate smartwatch features by holding up fingers — replacing precise touch interactions with gross motor gestures. Built with Python, OpenCV, and MediaPipe as a rapid prototyping exercise during graduate HCI coursework.',
        shortDescription: 'Gesture-based smartwatch accessibility prototype',
        tools: ['Python', 'OpenCV', 'MediaPipe', 'Tkinter', 'Rapid Prototyping', 'Interaction Design'],
        tags: ['Accessibility', 'Gesture Recognition', 'HCI', 'Wearables'],
        featured: true,
        logo: '/images/wave-watch-logo-opt.png',
        images: {
            thumbnail: '/images/wave-watch-logo-opt.png',
            hero: '/images/wave-watch/weather-screen-v2.png',
        },
        viewer: {
            type: '3d',
            deviceType: 'watch',
            screens: [
                '/images/wave-watch/weather-screen-v2.png',
                '/images/wave-watch/heartrate-screen-v2.png',
                '/images/wave-watch/music-screen-v2.png',
                '/images/wave-watch/notifications-screen-v2.png',
                '/images/wave-watch/call-screen-v2.png',
            ],
            watchScreens: [
                '/images/wave-watch/weather-screen-v2.png',
                '/images/wave-watch/heartrate-screen-v2.png',
                '/images/wave-watch/music-screen-v2.png',
                '/images/wave-watch/notifications-screen-v2.png',
                '/images/wave-watch/call-screen-v2.png',
            ],
        },
        details: {
            role: 'UX Designer & Developer',
            team: 'Solo project — end-to-end design & development',
            duration: 'Graduate HCI coursework (~2 hours, vibe-coded with AI assistance)',
            context: 'A rapid prototyping assignment during an HCI graduate program, exploring alternative interaction methods for smartwatch interfaces. The prototype was vibe-coded with AI assistance and built with real backend technology (Python, OpenCV, MediaPipe), creating a fully functional, testable system using a computer webcam to simulate how a smartwatch camera or paired device could enable gesture-based navigation.',
            problemStatement: 'Smartwatch touchscreens present significant accessibility barriers for users with motor disabilities. Research shows that up to 92–100% of Parkinson\'s disease patients report difficulty with touchscreen devices — symptoms like tremor, bradykinesia (slowness of movement), and rigidity make precise tap and swipe interactions error-prone. Smartwatch screens (~1.5–2 inches) amplify these challenges: small touch targets, swipe-heavy navigation, and accidental repeated touches make independent use frustrating or impossible. Existing accessibility options like voice control can draw unwanted social attention, and many users abandon wearable devices entirely — losing access to health monitoring features that could benefit their condition management.',
            researchGoals: [
                'Explore camera-based gesture recognition as a discreet, non-contact alternative input method for smartwatches',
                'Design interactions that replace precise fine motor actions (taps, swipes) with gross motor gestures (finger counting, hand orientation)',
                'Prototype a fully functional system that can be tested with a webcam to validate the interaction model',
                'Demonstrate how rapid prototyping with AI assistance can produce working accessibility solutions in minimal time',
                'Create a foundation for future research into gesture-based wearable accessibility'
            ],
            researchMethods: [
                {
                    name: 'Secondary Research & Problem Framing',
                    description: 'Reviewed literature on Parkinson\'s disease and touchscreen interaction challenges (NIH, KU Leuven studies). Identified that motor impairments affect touchscreen performance even when patients are optimally medicated, and that small screen sizes exacerbate targeting errors. Mapped existing accessibility solutions (touch accommodations, voice control, stylus) and identified the gap: no discreet, non-contact gesture alternative for smartwatch navigation.'
                },
                {
                    name: 'Rapid Prototyping with AI Assistance',
                    description: 'Used vibe coding — AI-assisted development — to rapidly prototype a working system in approximately 2 hours. Leveraged Python, OpenCV for camera input, MediaPipe for real-time hand landmark detection (21 keypoints per hand), and tkinter for the smartwatch GUI simulation. This approach demonstrated that functional accessibility prototypes can be built quickly for concept validation.'
                },
                {
                    name: 'Webcam-Based Interaction Testing',
                    description: 'Tested the prototype using a laptop webcam to simulate how a smartwatch-embedded camera or paired phone camera could track hand gestures. Validated that finger counting (1–4 fingers) provides reliable, distinct input signals for feature selection, and that thumb orientation detection (up/down) enables binary accept/reject decisions for contextual interactions like incoming calls.'
                }
            ],
            participants: [
                {
                    role: 'Target Users',
                    description: 'People with motor disabilities (Parkinson\'s, essential tremor, arthritis) who struggle with touchscreen interactions on small devices'
                },
                {
                    role: 'Secondary Research Sources',
                    description: 'NIH studies on Parkinson\'s touchscreen performance, KU Leuven motor impairment research, accessibility design guidelines'
                }
            ],
            keyFindings: [
                {
                    category: 'Touchscreen Accessibility Gap',
                    insights: [
                        'Up to 92–100% of Parkinson\'s patients report difficulty with touchscreen devices, including smartphones and tablets',
                        'Common issues include difficulty tapping accurately, problems with swiping/scrolling, accidental repeated touches, and challenges with gestures like double-tapping',
                        'Smartwatch screens (~1.5–2") reduce target areas and increase error rates compared to phones',
                        'Performance is impaired even when patients are optimally medicated — touchscreen difficulty correlates with both motor and cognitive factors'
                    ]
                },
                {
                    category: 'Limitations of Existing Solutions',
                    insights: [
                        'Touch accommodations (hold duration, ignore repeat) help but don\'t solve fundamental small-target accuracy issues',
                        'Voice control can bypass physical interaction but draws social attention — a significant concern for users who want discretion',
                        'Dysarthria (speech impairment) in some Parkinson\'s patients limits voice control effectiveness',
                        'Many users abandon wearable devices entirely due to interaction frustration, losing health monitoring benefits'
                    ]
                },
                {
                    category: 'Gesture-Based Alternative',
                    insights: [
                        'Finger counting (1–4 fingers) provides distinct, reliable input signals with low motor demand — no precision required',
                        'Gross motor gestures (holding up fingers, thumb orientation) are significantly easier than fine motor actions (tapping small targets)',
                        'Camera-based hand tracking enables non-contact interaction — the user never needs to touch the screen',
                        'The interaction is visually subtle — holding up fingers is a natural, socially inconspicuous gesture'
                    ]
                },
                {
                    category: 'Rapid Prototyping Validation',
                    insights: [
                        'A fully functional gesture-controlled interface was built in ~2 hours using AI-assisted development',
                        'MediaPipe hand tracking provides reliable 21-keypoint hand landmark detection at real-time speeds',
                        'The prototype successfully demonstrated 5 navigable smartwatch features: Weather, Heart Rate, Music, Notifications, and Incoming Call',
                        'Contextual gesture mapping (phone gesture triggers call screen, thumb up/down accepts/rejects) felt intuitive during testing'
                    ]
                }
            ],
            designIterations: [
                {
                    area: 'Gesture Mapping Design',
                    improvements: [
                        '1 finger → Weather, 2 fingers → Heart Rate, 3 fingers → Music, 4 fingers → Notifications',
                        'Phone gesture (thumb + pinky extended) → Incoming Call screen — mimics holding a phone',
                        'Thumb up → Accept call, Thumb down → Reject/End call — universal gesture language',
                        'Hold-to-confirm pattern (800ms) prevents accidental gesture triggers'
                    ]
                },
                {
                    area: 'Smartwatch GUI Simulation',
                    improvements: [
                        'Circular watch face with dark theme matching modern smartwatch aesthetics',
                        'Navigation dot indicators showing current screen position',
                        'Real-time clock and date display for realism',
                        'Visual feedback: glow effects on gesture recognition, pulsing notifications, haptic-style color flashes'
                    ]
                },
                {
                    area: 'Call Interaction Flow',
                    improvements: [
                        'Incoming call with caller photo, name, and gesture-controlled accept/reject buttons',
                        'Active call timer with thumb-down-to-end gesture',
                        'Visual button scaling feedback when gesture is detected but not yet confirmed',
                        'Auto-return to home screen after call ends or is rejected'
                    ]
                },
                {
                    area: 'Camera & Tracking',
                    improvements: [
                        'Front/back camera toggle for flexible testing setups',
                        'Real-time webcam preview showing hand landmark visualization',
                        'Mirrored camera feed for natural interaction (mirror mode)',
                        'Status label showing real-time gesture recognition state and feedback'
                    ]
                }
            ],
            impact: [
                'Demonstrated that gesture-based smartwatch interaction is technically feasible using existing computer vision technology',
                'Showed how AI-assisted rapid prototyping can produce functional accessibility solutions in minimal time (~2 hours)',
                'Created a working proof-of-concept that replaces fine motor touchscreen actions with gross motor gestures',
                'Highlighted a significant accessibility gap in current smartwatch design — most wearables assume full fine motor capability',
                'Established a foundation for future research into camera-based gesture input for wearable devices',
                'Proved that accessibility-focused interaction design can be both functional and discreet — avoiding the social attention concerns of voice control'
            ],
            futureOpportunities: [
                'On-device implementation using smartwatch camera hardware (e.g., Apple Watch Ultra camera, Samsung Galaxy Watch)',
                'User testing with Parkinson\'s patients and occupational therapists to validate gesture usability',
                'Machine learning-based gesture customization — users define their own gesture-to-feature mappings',
                'Integration with existing smartwatch OS accessibility APIs (watchOS, Wear OS)',
                'Expanded gesture vocabulary: pinch for zoom, circular motion for scrolling, fist for home',
                'Paired phone camera mode — use phone camera to track gestures while wearing the watch'
            ],
            skillsApplied: [
                'Accessibility Design',
                'Interaction Design',
                'Rapid Prototyping',
                'Computer Vision (OpenCV)',
                'Hand Tracking (MediaPipe)',
                'Python Development',
                'GUI Development (Tkinter)',
                'AI-Assisted Development',
                'Human-Computer Interaction',
                'Secondary Research'
            ]
        }
    },
    {
        id: 'freelance-photography',
        name: 'Freelance Photography',
        year: 2024,
        category: 'Photography',
        description: 'Focus on urban and street fashion portraiture throughout Indianapolis and Bloomington. Collaborate with local brands including SLCT Stock, Kitowares LLC, and Native Language Co. to deliver creative direction and visual storytelling using both digital and film formats.',
        shortDescription: 'Urban fashion photography',
        tools: ['Canon 60D', 'Canon AE-1', 'Mamiya 645', 'Olympus Point-and-Shoot', 'Adobe Lightroom'],
        tags: ['Photography', 'Fashion', 'Visual Design', 'Storytelling'],
        featured: false,
        images: {
            thumbnail: '/images/photography-thumb.jpg',
            hero: '/images/photography-hero.jpg',
        },
        viewer: {
            type: '3d',
            glbModelPath: '/models/photography-portfolio.glb',
        },
    },
];

export const getFeaturedProjects = () => projects.filter(p => p.featured);
export const getProjectById = (id: string) => projects.find(p => p.id === id);
export const getProjectsByCategory = (category: Project['category']) =>
    projects.filter(p => p.category === category);
