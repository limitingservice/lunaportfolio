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
    logoFit?: 'cover' | 'contain'; // How the logo image should fit in the card thumbnail (default: cover)
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
        stakeholderNote?: string;
        context?: string;
        problemStatement?: string;
        researchGoals?: string[];
        researchMethods?: {
            name: string;
            description: string;
            rationale?: string;
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
        timeline?: {
            weeks: number;
            activities: {
                name: string;
                track: 'qualitative' | 'quantitative' | 'synthesis';
                startWeek: number;
                endWeek: number;
                milestone?: boolean;
            }[];
        };
        persona?: {
            name: string;
            age?: number;
            occupation?: string;
            location?: string;
            tagline?: string;
            bio?: string;
            userNeeds?: string[];
            userMindsets?: string[];
        };
        journeyMap?: {
            phases: {
                name: string;
                userActions?: string[];
                goals?: string[];
                thoughts?: string[];
                feelings?: { text: string; emoji: '😡' | '😠' | '😟' | '😐' | '🙂' | '😊' }[];
                painPoints?: string[];
                touchpoints?: string[];
                opportunities?: string[];
            }[];
        };
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
        id: 'darzy-ai',
        name: 'Darzy.ai — Founding Product Research in Sustainable Fashion',
        year: 2025,
        category: 'Research',
        description: 'Founding product research at Darzy.ai, a remote-first sustainable-fashion startup with no defined product yet. Started by aligning with the founder on company vision, then ran qualitative interviews across three distinct user groups — retail store owners, graphic designers, and textile/clothing designers — plus potential customers. Designed and managed a pilot program that paired a local designer with a secondhand retail store to test the upcycled-fashion concept with real local brands.',
        shortDescription: 'Lead Product Researcher at a pre-product sustainable-fashion startup',
        tools: ['Stakeholder Alignment', 'Qualitative User Interviews', 'Community Research', 'Pilot Program Design', 'Partner Coordination'],
        tags: ['Product Research', 'Sustainable Fashion', 'Startup', 'Pilot Program', 'Team Leadership'],
        featured: true,
        logo: '/images/darzy-logo.avif',
        logoFit: 'contain',
        images: {
            thumbnail: '',
            hero: '',
        },
        viewer: {
            type: 'image',
            screens: [],
        },
        details: {
            role: 'Lead Product Researcher',
            team: '4-person team',
            stakeholderNote: 'Worked directly with the founder and co-founding product designer on company vision; managed retail and designer partnerships through the pilot program.',
            context: 'A pre-product, remote-first startup in sustainable fashion — a niche but difficult industry to enter without scaling correctly. The founder had a vision but no defined product yet, so the research had to define what the product would be more than how it would work. That made this product research first and UX research second.',
            problemStatement: 'An early-stage sustainable-fashion startup needed to define a product from a founder vision, in an industry with high barriers to entry. The audience was fragmented across three distinct user groups — retail store owners, graphic designers, and textile/clothing designers — each with different incentives, plus a separate community of potential customers. Without aligning all four around a single value proposition, the product would not scale.',
            researchGoals: [
                'Align with the founder on company vision through structured stakeholder meetings',
                'Identify a viable market-entry strategy for the sustainable-fashion space',
                'Understand the distinct needs of retail store owners, graphic designers, and textile/clothing designers',
                'Validate community appetite for a recycling-focused product for local brands',
                'Design and run a pilot program that tested the concept in real partnerships'
            ],
            researchMethods: [
                {
                    name: 'Stakeholder Alignment Meetings',
                    description: 'Recurring meetings with the founder to clarify the company vision, surface assumptions, and translate ambiguity into research questions the team could act on. Co-creating the research plan with the founder before running studies.',
                    rationale: 'In a pre-product startup, ambiguity is the first research problem. Founder alignment before any user research kept the studies from chasing the wrong question.'
                },
                {
                    name: 'Qualitative User Interviews (3 User Groups)',
                    description: 'Semi-structured interviews across three distinct user groups: retail store owners, graphic designers, and textile/clothing designers. Each group asked about workflows, frustrations, and how a sustainable upcycling concept might fit.',
                    rationale: 'A fashion product that needs three audiences to adopt it requires research that listens to each group on its own terms before assuming they share incentives.'
                },
                {
                    name: 'Customer & Community Interviews',
                    description: 'Qualitative interviews with potential customers and members of local creative communities to gauge appetite for a recycling-focused product supporting local brands.',
                    rationale: 'A pilot can only succeed if the community it serves actually wants what it offers. Community research validated demand before the pilot ran.'
                },
                {
                    name: 'Pilot Program Design & Management',
                    description: 'Designed and managed a pilot program that paired a local designer with a secondhand retail store to test the upcycling concept on real local brands. Recruited brand participants, structured the program, negotiated the designer-retailer agreement, and coordinated the rollout end-to-end.',
                    rationale: 'A pilot turns a research-grounded concept into a defensible product hypothesis. Running it was the only way to test whether the three user groups would actually transact with each other.'
                },
                {
                    name: 'Intern Hiring Interviews',
                    description: 'Interviewed prospective research interns to assess alignment with team values and collaboration style before bringing them onto the practice.',
                    rationale: 'Multiplying research throughput at a small startup depends on hiring people the team can actually work with. Interviews were as much about culture-fit research as capability.'
                }
            ],
            participants: [
                {
                    role: 'Founder',
                    description: 'Vision-setter for the company; primary stakeholder in alignment meetings.'
                },
                {
                    role: 'Retail Store Owners',
                    description: 'Owners of secondhand and small retail spaces — a key user group for the upcycling concept.'
                },
                {
                    role: 'Graphic Designers',
                    description: 'Independent graphic designers explored as a creative collaborator audience.'
                },
                {
                    role: 'Textile & Clothing Designers',
                    description: 'Designers working in textiles and apparel — the production-side user group.'
                },
                {
                    role: 'Potential Customers & Community',
                    description: 'Local creative-community members interviewed about appetite for sustainable upcycling and supporting local brands.'
                },
                {
                    role: 'Pilot Program Partners',
                    description: 'A local designer and a secondhand retail store paired through the pilot; plus the local brands recruited as program participants.'
                }
            ],
            impact: [
                'Translated a founder vision into a defined product through stakeholder alignment + cross-group research',
                'Identified scale as the key constraint for entering the sustainable-fashion industry and aligned methods around it',
                'Surfaced where the three distinct user groups (retail / graphic / textile-clothing designers) shared incentives, and where they diverged',
                'Designed and ran a pilot program pairing a local designer with a secondhand retail store and local brand participants',
                'Established the research practice from zero — stakeholder cadences, multi-group interview protocols, partner coordination, and intern hiring',
                'Maintained direct co-creation with the founder and co-founding product designer on company vision throughout'
            ],
            skillsApplied: [
                'Product Research',
                'Stakeholder Alignment',
                'Qualitative User Interviews',
                'Multi-Audience Research',
                'Community Research',
                'Pilot Program Design',
                'Partner Coordination',
                'Founder Collaboration',
                'Hiring & Team Building',
                'Research Operations'
            ]
        }
    },
    {
        id: 'energy-systems-network',
        name: 'Energy Insights Network (ESN)',
        year: 2024,
        category: 'Research',
        description: 'UX research and validation project focused on refining an energy insights platform for manufacturing teams. Conducted field research at Smart Manufacturing Roadshow plus in-depth interviews with program stakeholders and systems-integration engineers — including a Director of Business Development and a Solutions Architect — to ground dashboard design in the broader Industry 4.0 manufacturing ecosystem.',
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
            role: 'UX Researcher',
            team: '4-person team',
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
                },
                {
                    name: 'Stakeholder & Engineer Interviews',
                    description: 'Conducted in-depth interviews with program stakeholders and systems-integration engineers in the manufacturing space — including a Director of Business Development at a systems integrator firm and a Solutions Architect on the software-engineering side. Captured how the dashboard fits into the broader Industry 4.0 ecosystem, the variance in manufacturer needs, hardware-installation complexity, and the flexibility-vs-customization tradeoff the platform has to resolve.'
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
                },
                {
                    role: 'Systems Integrator (Business Development)',
                    description: 'Director of Business Development at a systems integrator firm partnered with the Energy Insights program — connects manufacturers to ESN, configures the standard 5 energy dashboards, and identifies custom insights per client.'
                },
                {
                    role: 'Solutions Architect (Software Engineering)',
                    description: 'Solutions Architect at an automation firm building software solutions for manufacturing clients — designs the data architecture connecting Opto 22 hardware, Ignition software, and MQTT data flows that power the ESN dashboards.'
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
        name: 'Canvas AI-Assisted Quiz Creation',
        year: 2024,
        category: 'Research',
        description: 'Mixed-methods UX research on Canvas LMS focused on the faculty quiz creation flow. The original concept was a preset-based quiz builder; mid-study, a user-testing participant suggested integrating AI to generate quiz questions, and that suggestion drove a research-driven pivot to a "Build with AI" feature. Combined user interviews, observational task analysis with time-on-task and click-count measurement, heuristic evaluation, persona synthesis (John Davis — Associate Professor) and user journey mapping, longitudinal low → mid → high fidelity prototype testing, and a Likert survey on faculty AI comfort.',
        shortDescription: 'AI-assisted quiz creation research for Canvas faculty',
        tools: ['User Interviews', 'Observational Studies', 'Heuristic Evaluation', 'Time-on-Task Measurement', 'Click Count Analysis', 'Multi-Fidelity Prototype Testing', 'Likert Surveys'],
        tags: ['Canvas LMS', 'AI', 'Mixed-Methods', 'Faculty Workflows', 'EdTech'],
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
            team: '4-person team',
            stakeholderNote: 'Coordinated with a 4-person research team across multi-stage testing with faculty, students, and academic staff who use Canvas LMS daily.',
            context: 'A Canvas LMS research and redesign project. Discovery interviews and observational sessions surfaced that creating quizzes was the most cumbersome and time-consuming task faculty performed on Canvas. The team initially designed a preset-based quiz builder using past quizzes as templates, but low-fidelity testing revealed Canvas already had a "Duplicate" feature serving a similar purpose. A user-testing participant suggested integrating AI to generate quiz questions — that suggestion drove a research-driven pivot to a "Build with AI" feature, which carried through the mid and high fidelity rounds.',
            problemStatement: 'Faculty members spend disproportionate time creating quizzes in Canvas LMS. A 9-respondent survey of professors found 44% rate the current quiz creation flow as time-consuming, 33% neutral, only 22% efficient, and zero respondents rated it very efficient. Observational sessions confirmed the friction — quiz creation had the highest time-on-task of any faculty workflow observed. The research question became: can AI-assisted question generation, integrated into the existing Canvas authoring flow, meaningfully reduce the time and click cost for faculty without compromising assessment quality or faculty trust?',
            researchGoals: [
                'Identify the most cumbersome faculty workflow in Canvas LMS through observational research',
                'Measure baseline time-on-task and click counts on the existing quiz creation flow',
                'Evaluate the existing flow against Nielsen usability heuristics',
                'Design and iteratively test an AI-assisted quiz creation flow across low, mid, and high fidelity',
                'Survey faculty on AI comfort and perceived improvement to validate the AI-integration direction'
            ],
            researchMethods: [
                {
                    name: 'User Interviews',
                    description: 'Each team member conducted user interviews with faculty, students, and academic staff using Canvas LMS. Sessions ran ~30 minutes in facilitator + note-taker pairs using a structured 10–15 question outline for consistency across facilitators.',
                    rationale: 'Chose paired interviews because consistency across facilitators matters more than volume — the same outline run by 4 facilitators produces comparable data, while solo interviewers introduce facilitator drift across roles.'
                },
                {
                    name: 'Observational Interviews',
                    description: 'Faculty completed 5 predefined Canvas tasks (quiz creation among them) while researchers tracked time-on-task, click count, errors, and task completion. Sessions ran 30–45 minutes with a dedicated facilitator, note-taker, and metric-tracker. Quiz creation surfaced as the most cumbersome task.',
                    rationale: 'Chose observation over self-reported surveys because Canvas users systematically underestimate workflow friction they have normalized after years of use. The interview said "it works fine"; the click-count and time-on-task said otherwise.'
                },
                {
                    name: 'Heuristic Evaluation',
                    description: 'Independent heuristic evaluation on the existing Canvas quiz creation flow using Nielsen Ten Heuristics — focus on error prevention, system status visibility, consistency and standards, and recognition over recall.',
                    rationale: 'Layered heuristic evaluation onto user data to surface usability violations long-tenured faculty had habituated to — the workarounds long-time Canvas users no longer notice as problems.'
                },
                {
                    name: 'Persona Synthesis',
                    description: 'Synthesized interview and observation data into a primary faculty persona — John Davis, Associate Professor, 47, Indianapolis — capturing core user needs (efficiency, flexibility, third-party integration, user-friendly quiz editing) and mindsets (focused on necessity, adaptive to limitations, oriented by student experience, desires assessment automation). The persona anchored every subsequent design decision.',
                    rationale: 'A persona built from real interview and observation data — not a stock template — kept the team honest. When a design choice could not be justified against John\'s needs and mindsets, it got cut.'
                },
                {
                    name: 'User Journey Mapping',
                    description: 'Mapped John Davis\'s quiz-creation journey across user steps, actions, goals & experiences, feelings & thoughts, pain points, and opportunities — from onboarding into the quiz authoring flow through publication. Identified where friction and emotional dips clustered and where design intervention could move the needle most.',
                    rationale: 'A persona on its own is a snapshot; a journey map turns it into a sequence. Mapping the journey made it possible to prioritize which moments of friction mattered most to redesign — and which were tolerable noise.'
                },
                {
                    name: 'Low / Mid / High Fidelity Usability Testing',
                    description: 'Multi-stage prototype testing on the redesigned quiz creation flow. Low fidelity validated the initial preset-based concept (and surfaced the AI suggestion from a participant). Mid fidelity tested the "Build with AI" feature. High fidelity integrated the details / configuration section into the flow for end-to-end measurement.',
                    rationale: 'Iterative testing at three fidelities lets the team verify whether each design change actually moved baseline metrics. The preset → AI pivot only emerged because low-fidelity testing forced the team to confront an existing Canvas feature (Duplicate) doing what their prototype attempted.'
                },
                {
                    name: 'Faculty AI Survey',
                    description: 'Likert-scale survey of professors (9 respondents) measuring current quiz creation efficiency, comfort with AI integration in Canvas, and perceived impact of AI on assessment quality. Anchored the team\'s confidence to pursue the AI direction.',
                    rationale: 'Needed quantitative validation that faculty would actually accept AI-assisted quiz creation. The survey complemented the qualitative pivot signal from user testing with broader sentiment data.'
                }
            ],
            participants: [
                {
                    role: 'Faculty (Primary)',
                    description: 'Instructors across multiple disciplines who regularly create quizzes in Canvas. The primary research focus and target audience for the AI-assisted quiz creation flow.'
                },
                {
                    role: 'Students',
                    description: 'Undergraduate and graduate students with 5–10+ years of Canvas experience. Studied for downstream assessment-taking context.'
                },
                {
                    role: 'Academic Staff',
                    description: 'Advisors, librarians, and CTLA staff supporting faculty Canvas use. Contributed observations on faculty training gaps and complementary tool patterns.'
                },
                {
                    role: 'Faculty Survey Cohort',
                    description: '9-respondent Likert-scale survey on AI comfort, current quiz creation efficiency, and perceived AI impact on assessment quality.'
                }
            ],
            keyFindings: [
                {
                    category: 'Faculty Sentiment & AI Comfort (Survey)',
                    insights: [
                        '44% of professors rated current Canvas quiz creation as time-consuming; zero rated it very efficient',
                        'Faculty AI comfort split 33/33/33 between uncomfortable, neutral, and comfortable — no respondent strongly endorsed AI integration',
                        '56% of faculty believed AI-generated quizzes would likely improve assessment quality; 33% neutral',
                        'Validated the AI-integration direction quantitatively while flagging trust calibration as a downstream design problem'
                    ]
                },
                {
                    category: 'Low Fidelity — The Preset Pivot',
                    insights: [
                        'Original concept was a preset-based quiz builder using past quizzes as templates',
                        'Testing surfaced that Canvas already had a "Duplicate" feature serving the same purpose — the preset concept was redundant',
                        'A user-testing participant suggested integrating AI to generate quiz questions instead',
                        'Participant-driven pivot to "Build with AI" feature — research-driven scope change, not team-driven'
                    ]
                },
                {
                    category: 'Mid Fidelity — "Build with AI" Validation',
                    insights: [
                        'Vertical layout for the Build-with-AI options aligned better with Canvas\'s native conventions than horizontal',
                        'Users wanted clear button consistency across each step to know where to navigate next',
                        'Hierarchy of details: users needed to complete a section before being allowed to proceed',
                        'Autosave replacing the Save button was not welcomed — "Why is it a button if it has already been saved?"'
                    ]
                },
                {
                    category: 'High Fidelity — Integration & Trust Gaps',
                    insights: [
                        'Delays in navigating the calendar / date section of the details page',
                        'Users delayed finding the "new quiz" button; saw the table of assigned quizzes first',
                        '"Mastery Path" feature lacked context — users did not know what it was or why it was there',
                        'Users wanted clearer separation between "Build with AI" and manual creation — suggested adding "OR" between options',
                        'Faculty wanted explicit confirmation that a quiz had been published'
                    ]
                }
            ],
            designIterations: [
                {
                    area: 'Lo-Fi → Mid-Fi: Preset Builder → "Build with AI"',
                    improvements: [
                        'Initial Lo-Fi concept: preset-based quiz builder using past quizzes as templates',
                        'Lo-Fi testing surfaced Canvas already had a "Duplicate" feature serving the same purpose',
                        'A user-testing participant suggested integrating AI for question generation',
                        'Mid-Fi pivoted to a "Build with AI" feature — research-driven, participant-suggested'
                    ]
                },
                {
                    area: 'Mid-Fi Refinements — Layout & Hierarchy',
                    improvements: [
                        'Restructured "Build with AI" options vertically to align with Canvas conventions (was horizontal in Mid-Fi v1)',
                        'Standardized button styling across all steps for clearer next-action signaling',
                        'Enforced sequential completion: users must finish a section before proceeding to the next',
                        'Reverted autosave-only pattern after users explicitly rejected the loss of an explicit Save button'
                    ]
                },
                {
                    area: 'Hi-Fi: Details Section Integration',
                    improvements: [
                        'Integrated the details / configuration page into the quiz creation task flow for end-to-end measurement',
                        'Without details integrated, Mid-Fi metrics were undercounting the real click cost',
                        'Hi-Fi enabled accurate before/after time-on-task and click-count comparison against the baseline'
                    ]
                },
                {
                    area: 'Hi-Fi Refinements — Affordance & Confirmation',
                    improvements: [
                        'Added "OR" separator between Build-with-AI and manual creation to clarify the choice',
                        'Surfaced the new-quiz button more prominently — users were finding the assigned-quizzes table first',
                        'Added explicit publication confirmation message addressing faculty\'s request for clearer status feedback',
                        'Flagged design inconsistencies (rounded vs. angular boxes) breaking Canvas\'s visual consistency standard'
                    ]
                }
            ],
            impact: [
                'Identified quiz creation as the most cumbersome and time-consuming faculty workflow — confirmed in survey: 44% of professors rated it time-consuming, zero very efficient',
                'Validated the AI-integration direction quantitatively: 56% of surveyed faculty believed AI-generated quizzes would likely improve assessment quality',
                'Demonstrated a research-driven, participant-suggested pivot: preset builder → "Build with AI" — the user testing surfaced the AI direction, not the team',
                'Surfaced AI trust as a downstream design problem: faculty AI comfort split 33/33/33 — the redesign had to earn that trust through interaction patterns, not promise it',
                'Established a measurement baseline (time-on-task + click count) on the existing Canvas quiz creation flow against which any future AI-assisted redesign can be evaluated',
                'Strengthened muscle in mixed-methods research, observational methodology, heuristic evaluation, multi-fidelity usability testing, and survey instrumentation'
            ],
            futureOpportunities: [
                'Production pilot of the "Build with AI" feature with a faculty cohort across a full semester',
                'Quantitative A/B test of AI-assisted vs. manual quiz creation measuring time-on-task and assessment quality',
                'Investigate AI trust calibration patterns for faculty (transparency, source citations, editability of AI output)',
                'Extend the AI-assisted authoring lens to other high-friction Canvas faculty workflows (course setup, module organization, content imports)',
                'Study downstream student experience impact of AI-generated assessments — does AI-authored content read differently to students?'
            ],
            skillsApplied: [
                'Mixed-Methods Research',
                'Longitudinal Usability Testing',
                'User Interviews',
                'Observational Studies (Time-on-Task + Click Count)',
                'Heuristic Evaluation',
                'Likert-Scale Post-Task Surveys',
                'Measurement Planning',
                'Iterative Prototype Testing',
                'Stakeholder Communication',
                'Cross-Role Synthesis'
            ],
            timeline: {
                weeks: 14,
                activities: [
                    { name: 'User Interviews', track: 'qualitative', startWeek: 2, endWeek: 4 },
                    { name: 'Persona Synthesis', track: 'qualitative', startWeek: 5, endWeek: 6 },
                    { name: 'Observational Interviews', track: 'quantitative', startWeek: 2, endWeek: 4 },
                    { name: 'Heuristic Eval', track: 'quantitative', startWeek: 3, endWeek: 5 },
                    { name: 'Measurement Plan', track: 'quantitative', startWeek: 5, endWeek: 6 },
                    { name: 'Lo-Fi Testing', track: 'synthesis', startWeek: 8, endWeek: 8 },
                    { name: 'Mid-Fi Testing', track: 'synthesis', startWeek: 10, endWeek: 10 },
                    { name: 'Hi-Fi Testing', track: 'synthesis', startWeek: 12, endWeek: 12 },
                    { name: 'Final', track: 'synthesis', startWeek: 14, endWeek: 14, milestone: true }
                ]
            },
            persona: {
                name: 'John Davis',
                age: 47,
                occupation: 'Associate Professor',
                location: 'Indianapolis, IN',
                bio: 'Tenured faculty who creates and edits quizzes in Canvas every semester. Enjoys participating in conferences and research relevant to his own work. Treats Canvas as a necessary tool, not a destination — he wants it to get out of his way so he can focus on teaching.',
                userNeeds: [
                    'Efficiency when navigating courses',
                    'Flexibility and customization',
                    'Speed and performance',
                    'Seamless third-party integration',
                    'User-friendly quiz editing',
                    'Support and training resources'
                ],
                userMindsets: [
                    'Focused on necessity',
                    'Adaptive to limitations',
                    'Oriented by student experience',
                    'Desires automation regarding assessment'
                ]
            },
            journeyMap: {
                phases: [
                    {
                        name: 'On-board',
                        userActions: ['Logs in to Canvas with university credentials'],
                        goals: ['Successfully log in to access courses and tools'],
                        feelings: [{ text: 'Routine entry — neither friction nor delight', emoji: '😐' }],
                        painPoints: ['Typical onboarding steps; nothing broken'],
                        opportunities: ['Onboarding is necessary; loading times could be optimized for slower networks']
                    },
                    {
                        name: 'Course Selection',
                        userActions: ['Navigates from the dashboard to the desired course'],
                        goals: ['Get into the course to start work'],
                        feelings: [{ text: 'Tenured user does this daily — fully familiar with the interface', emoji: '🙂' }],
                        painPoints: ['No friction at this step; tenured faculty are habituated'],
                        opportunities: ['Already intuitive; no redesign needed here']
                    },
                    {
                        name: "Select 'Quiz'",
                        userActions: ['Navigates to the side-nav', 'Selects the "Quizzes" feature', 'Clicks the button to create a new quiz'],
                        goals: ['Reach the quiz authoring environment quickly'],
                        feelings: [{ text: 'Quick navigation in a known location', emoji: '🙂' }],
                        painPoints: ['Intuitive and clearly labeled'],
                        opportunities: ['No issues at this step — keep the affordances clear']
                    },
                    {
                        name: 'Create Quiz & Content',
                        userActions: [
                            'Customizes quiz settings',
                            'Creates the quiz content',
                            'Adds questions one at a time, selecting type for each',
                            'Repeats steps for each new question'
                        ],
                        goals: ['Build a complete, well-configured quiz that fits the assessment plan'],
                        feelings: [
                            { text: 'Settings feel intricate; many options to track', emoji: '😟' },
                            { text: 'Adding new content is simple, but settings are complex', emoji: '😠' }
                        ],
                        painPoints: [
                            'Intricate settings per quiz — many options to evaluate',
                            'Various ways to add new questions; complex to choose well',
                            'Having to repeat similar steps across many questions',
                            'Constantly having to update a question to save content corrections'
                        ],
                        opportunities: [
                            'Reduce repeated steps across questions (template, duplicate, bulk-edit)',
                            'Surface defaults that map to most common assessment patterns',
                            'Use existing quizzes or templates as starting points',
                            'AI-assisted question generation to reduce manual repetition'
                        ]
                    },
                    {
                        name: 'Publish Quiz',
                        userActions: ['Saves the quiz', 'Previews the quiz', 'Clicks Publish on the quiz page'],
                        goals: ['Ensure the quiz is complete and visible to students at the right time'],
                        feelings: [{ text: 'Necessary final task to ensure progress is saved', emoji: '🙂' }],
                        painPoints: ['Tenured users follow the necessary final steps without resistance'],
                        opportunities: [
                            'Preview integrated before publishing catches errors before students see them',
                            'Confirm successful publication with clear status feedback'
                        ]
                    }
                ]
            }
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
                },
                {
                    role: 'Primary Persona: Manny Delgado (23, NYC student)',
                    description: '"Music sets the vibe, and I\'m here to make sure it\'s always fresh and full of energy." Socially driven listener who creates collaborative playlists, discovers music through social media + charts, and shares actively through Instagram Stories and iMessage because Spotify\'s native sharing falls short. The persona anchored design priorities throughout the study.'
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
                        'Quantitative metrics showed error rates as high as 57% on rearranging songs',
                        'Finding a friend\'s profile averaged 13.25 clicks (range up to 25) with a 36-second standard deviation in time-on-task',
                        'Post-task satisfaction for playlist rearrangement bottomed at 2 out of 5, confirming the frustration observed in think-aloud sessions',
                        'High error rates clustered around playlist organization and friend discovery — not playback'
                    ]
                },
                {
                    category: 'Below-Benchmark Usability (SUS)',
                    insights: [
                        'The System Usability Scale produced an average score of 53.13 (standard deviation 17.84), well below the 70 industry benchmark',
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
        category: 'Research',
        description: 'Mixed-methods access-technology research for a user living with Postural Orthostatic Tachycardia Syndrome (POTS). Combined in-depth interviews and contextual inquiry with a primary user, affinity mapping into 8 cross-cutting themes, competitive analysis of existing wearable health platforms, and secondary research across medical literature and online POTS / dysautonomia / chronic-illness communities. Synthesized findings drove an integrated companion app + smart cane system tested across low and high fidelity.',
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
            team: '4-person team',
            duration: 'Full semester',
            stakeholderNote: 'Co-designed with a primary user living with POTS; grounded in medical literature and triangulated against community insights from POTS, dysautonomia, and chronic-illness forums.',
            context: 'Access-technology research for a user living with POTS — a chronic condition causing rapid heart rate spikes, dizziness, fatigue, and fainting upon standing. The research went deeper than a single product brief: thematic coding across interview data surfaced that POTS rarely shows up alone — cognitive, sensory, and social-navigation needs mattered as much as the physical episodes themselves. Findings shaped an integrated companion app + smart cane system designed to be both functional and socially discreet.',
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
                    description: 'Conducted in-depth interviews with the primary user to understand daily routines, episode triggers, coping strategies, multi-condition navigation, and frustrations with current tools. Observed how they navigate daily activities and identified moments where technology could provide the most value.',
                    rationale: 'Chose direct co-design with a real user over proxy research because chronic illness is deeply personal and lab-only conditions miss the lived texture of moving through a day with POTS.'
                },
                {
                    name: 'Affinity Mapping & Thematic Coding',
                    description: 'Clustered observations and quotes into 8 cross-cutting themes — Cognitive Accessibility, Sensory Preferences, Mobility & POTS, Medication Management, Communication & Memory, Interface Preferences, Social Navigation, and Tools & Hacks. Each theme grounded in specific user examples and traced through to design recommendations.',
                    rationale: 'Affinity mapping revealed that POTS rarely shows up alone. Coding into 8 themes prevented the design from over-indexing on the dramatic moments (episodes) while ignoring the quieter friction (cognitive load, social masking, sensory regulation) that shaped daily life equally.'
                },
                {
                    name: 'Persona Synthesis',
                    description: 'Synthesized interview and observational data into a primary persona capturing the user\'s multi-condition profile, daily patterns, coping strategies, and design needs. The persona anchored design decisions in real lived experience and traveled with the team into every iteration.',
                    rationale: 'A persona built from real data — not stock templates — kept the design honest. When a feature could not be justified against the persona, it got cut.'
                },
                {
                    name: 'Competitive Analysis',
                    description: 'Reviewed existing wearable health platforms (Pirilik, TachyMon, mainstream fitness trackers) and accessibility-focused apps to map current paradigms, identify gaps for chronic-illness contexts, and surface conventions worth keeping or breaking.',
                    rationale: 'Fitness-tracker conventions assume increase-activity goals. Chronic-illness pacing inverts that assumption. Competitive analysis surfaced where the genre conventions actively harmed our user.'
                },
                {
                    name: 'Secondary Research & Community Insights',
                    description: 'Reviewed medical literature on POTS pathophysiology, heart rate monitoring, and assistive technology. Triangulated against user discussions in POTS, dysautonomia, engineer-with-chronic-illness, and broader chronic-illness online communities to broaden understanding beyond a single user.',
                    rationale: 'Single-user research risks over-fitting. Community discussions surfaced patterns (frustration with healthcare dismissal, pacing strategies, wearable repurposing) that recurred across many users with POTS — validating which findings to generalize and which to keep specific.'
                },
                {
                    name: 'Low- & High-Fidelity Prototyping & Usability Testing',
                    description: 'Iterated through hand-drawn low-fidelity sketches into a complete high-fidelity Figma prototype covering episode alerts, breathing exercises, symptom logging, vibration settings, and the integrated cane hardware. Tested at each fidelity with the primary user; refined interactions and visual design based on feedback.',
                    rationale: 'Multi-fidelity testing let the team verify whether each design change actually solved the friction surfaced in affinity mapping. Findings that recurred across fidelities were real; findings that disappeared were noise.'
                }
            ],
            participants: [
                {
                    role: 'Primary User (Co-Design Partner)',
                    description: 'Individual living with POTS plus overlapping conditions (ADHD, dyslexia); participated across interviews, low-fi and hi-fi testing.'
                },
                {
                    role: 'Online Chronic-Illness Communities',
                    description: 'POTS, dysautonomia, and broader chronic-illness forums (including engineer- and doctor-with-chronic-illness threads) reviewed for recurring patterns around pacing, wearable use, and healthcare communication.'
                },
                {
                    role: 'Medical Literature Sources',
                    description: 'Peer-reviewed sources on POTS pathophysiology, heart rate monitoring, and assistive technology paradigms.'
                }
            ],
            keyFindings: [
                {
                    category: 'Mobility, POTS & Episode Management',
                    insights: [
                        'Heart rate escalates noticeably when standing for extended periods — a leading indicator of an episode',
                        'The user already uses a cane and heart rate tracker during flare-ups; design should extend the existing toolkit, not replace it',
                        'Multiple response options needed since episode severity varies — single-state alerts are not enough',
                        'Real-time monitoring via watch or cane sensor provides the fastest, most reliable detection'
                    ]
                },
                {
                    category: 'Cognitive Accessibility & Communication',
                    insights: [
                        'POTS rarely shows up alone — ADHD, dyslexia, and POTS overlap meaningfully for many users',
                        'Cognitive load shapes interaction preferences: minimal steps, simple layouts, longer-form media with captions',
                        'Memory & communication workarounds are already in use: screenshots as reminders, spellcheck for misspellings, instant-send messaging to avoid forgetting',
                        'Difficulty switching tasks is common — interfaces should reduce mode-switching, not introduce it'
                    ]
                },
                {
                    category: 'Sensory Preferences',
                    insights: [
                        'Screen contrast matters more than layout — contrast is the load-bearing accessibility variable',
                        'Font choice and brightness affect prolonged reading',
                        'Auditory distractions break focus — quiet environments preferred, tactile notifications preferred over audio',
                        'Interface design must respect sensory regulation, not assume neurotypical processing'
                    ]
                },
                {
                    category: 'Medication Management',
                    insights: [
                        'Pills are often forgotten at home when daily routines change',
                        'A weekly portable pill box is the user-validated solution to forgotten-medication friction',
                        'Alarms and reminder routines support consistent dosing — but only when they fit the user\'s existing notification preferences',
                        'Connecting medication to symptom logging surfaces correlations the user would otherwise miss'
                    ]
                },
                {
                    category: 'Social Navigation & Invisible Disability',
                    insights: [
                        'The cane causes unwanted attention — a visible marker of an otherwise invisible condition',
                        'Social masking is energy-draining; designing for discretion preserves the user\'s limited daily energy budget',
                        'Avoids video calls (FaceTime) to conserve energy — an unexpected design constraint',
                        'Discretion must be designed in, not added as a setting — the device should default to socially comfortable'
                    ]
                },
                {
                    category: 'User-Driven Tools & Coping Hacks',
                    insights: [
                        'Users already extend tools beyond intended use: AI tools to fix indentation in code, captions to support comprehension across media',
                        'Repurposing of mainstream tech (fitness trackers, photo apps as memory aids) is constant — design should honor and extend these patterns',
                        'Healthcare-system frustration recurs in community discussions: users feel dismissed when presenting wearable data to providers',
                        'Pacing strategies (diagnosis-based, real-time, preventative) cluster across the community — a paradigm shift fitness trackers do not support natively'
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
            ],
            persona: {
                name: 'Abby Godsen',
                occupation: 'Junior in college',
                bio: 'A junior in college living with POTS, ADHD, dyslexia, and Hashimoto\'s. Tech-aware and detail-oriented, but easily overwhelmed by cognitive load. Abby uses a cane during flare-ups and relies on screenshots and reminders to manage daily tasks. A typical day involves attending classes, managing medications, and navigating social and cognitive challenges while monitoring and responding to her body\'s symptoms.',
                userNeeds: [
                    'Minimize sensory overload and UI complexity',
                    'Get real-time, subtle heart rate alerts',
                    'Maintain routines without heavy interaction',
                    'Access tools that support memory, comprehension, and fatigue pacing'
                ],
                userMindsets: [
                    'Tech-aware and detail-oriented',
                    'Easily overwhelmed by cognitive load',
                    'Adaptive — uses screenshots and reminders to compensate',
                    'Pacing-focused; values autonomy over alarms'
                ]
            },
            journeyMap: {
                phases: [
                    {
                        name: 'Morning Routine',
                        userActions: ['Wakes up, navigates brain fog, takes medications, checks hydration and heart rate'],
                        thoughts: ['"Where\'s my pill box again? Did I take my meds yet?"'],
                        feelings: [{ text: 'Foggy, sluggish, anxious to avoid a bad start', emoji: '😟' }],
                        painPoints: [
                            'Easily forgets if medication was taken due to disrupted routines',
                            'Standard alarm apps don\'t offer helpful context to follow up',
                            'Reading pill labels is difficult due to dyslexia; written reminders can be confusing'
                        ],
                        touchpoints: ['Haptic medication reminders on wearable with checklist interface and audio confirmation'],
                        opportunities: [
                            'Introduce a tactile or haptic-based pill confirmation feature (e.g., long-press to confirm meds taken)',
                            'Provide voice-based prompts and confirmations instead of text-based reminders to support cognitive accessibility'
                        ]
                    },
                    {
                        name: 'Commute & Class Transition',
                        userActions: ['Walks to class; heart rate fluctuates with movement and temperature'],
                        thoughts: ['"Is this spike from walking or is something off?"'],
                        feelings: [{ text: 'Alert, occasionally overwhelmed, cautious', emoji: '😟' }],
                        painPoints: [
                            'Heart rate changes can go unnoticed or be misinterpreted',
                            'Standard apps offer numeric data but no context for symptoms',
                            'Pulling out a phone while walking or using a cane is impractical'
                        ],
                        touchpoints: ['Smartwatch vibrates uniquely for moderate vs. high spikes; uses contextual prompts like "pause + hydrate"'],
                        opportunities: [
                            'Develop distinct vibration patterns for heart rate thresholds (gentle pulse for caution, double-tap for alert)',
                            'Use context-aware prompts like "Rest soon?" instead of just numeric feedback'
                        ]
                    },
                    {
                        name: 'In-Class Focus',
                        userActions: ['Attends lectures; takes notes using screenshots, notebook, or voice memos'],
                        thoughts: ['"I hope I don\'t miss anything while zoning out."'],
                        feelings: [{ text: 'Focused but cognitively fatigued', emoji: '😟' }],
                        painPoints: [
                            'Gets easily distracted or overwhelmed by cluttered screens or popups',
                            'Visual cues (like flashing notifications) often go unnoticed',
                            'Typing and writing fatigue due to dyslexia and mental load'
                        ],
                        touchpoints: ['Wearable provides non-intrusive nudges/reminders for hydration and stretch breaks; allows tagging lecture moments via voice cue or simple tap'],
                        opportunities: [
                            'Offer voice-based bookmarking via the smartwatch for moments when focus drops or information feels important',
                            'Introduce focus mode with reduced distractions and gentle pacing reminders'
                        ]
                    },
                    {
                        name: 'Midday Reset & Medication',
                        userActions: ['Eats lunch, takes second round of medication, tries to rest or pace herself'],
                        thoughts: ['"Was that spike from skipping salt or just walking too much?"'],
                        feelings: [{ text: 'Drained, anxious about triggering a flare', emoji: '😐' }],
                        painPoints: [
                            'Lack of insight into cause-effect of symptoms like dizziness or elevated HR',
                            'Forgetfulness around medication or hydration when routine changes (e.g., grabbing lunch off campus)',
                            'Alarms add stress rather than support'
                        ],
                        touchpoints: ['Smartwatch uses vibration pattern + context ("Did you hydrate?"); pill reminders embedded into the activity timeline'],
                        opportunities: [
                            'Create a secondary check-in vibration 10–15 minutes after a high HR if no action is detected',
                            'Include "Did you hydrate?" follow-ups that are non-intrusive and optional, respecting autonomy'
                        ]
                    },
                    {
                        name: 'Afternoon Movement & Study',
                        userActions: ['Heads to study area, attends club meetings or runs errands'],
                        thoughts: ['"My heart\'s racing, but I\'ve been sitting — what\'s causing it?"'],
                        feelings: [{ text: 'Tired and a bit frustrated, trying to stay productive', emoji: '😟' }],
                        painPoints: [
                            'Disconnected tools don\'t show a complete picture (HR data, symptom triggers)',
                            'Physical fatigue builds unpredictably, leading to emotional fatigue'
                        ],
                        touchpoints: ['Wearable flags symptoms and suggests action (e.g., "Consider break or salty snack"); user can log symptoms via voice'],
                        opportunities: [
                            'Enable manual symptom tagging with voice or single-tap input ("dizzy," "low energy")',
                            'Provide a pacing-assistant feature: gentle alerts when heart rate trends high over time, not just at a spike'
                        ]
                    },
                    {
                        name: 'Evening Wind Down',
                        userActions: ['Reviews the day, logs energy level, preps for bed, checks trends'],
                        thoughts: ['"Was today better than yesterday? What worked?"'],
                        feelings: [{ text: 'Reflective, slightly empowered if symptoms were managed well', emoji: '🙂' }],
                        painPoints: [
                            'Reviewing app data can be cognitively tiring and hard to synthesize',
                            'Standard interfaces are text-heavy or graph-driven — not neurodivergent-friendly'
                        ],
                        touchpoints: ['App displays voice summary + visual trendline (energy, HR, hydration); recommendations use plain language ("Your afternoon dip may be due to low salt")'],
                        opportunities: [
                            'Display voice-based summaries or simple trends like "Your hydration was lower than usual today" instead of full graphs',
                            'Offer compassionate, non-judgmental language in reflections (e.g., "You managed well today, despite challenges")'
                        ]
                    }
                ]
            }
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
        featured: false,
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
        featured: false,
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
