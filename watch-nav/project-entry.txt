// =============================================================
// WAVE & WATCH — Gesture-Controlled Smartwatch
// Copy this entire object and paste it into your projects array
// in data/projects.ts (before the freelance-photography entry)
// =============================================================

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
            hero: '/images/wave-watch/weather-screen.png',
        },
        viewer: {
            type: '3d',
            glbModelPath: '/models/wave-watch.glb',
            deviceType: 'phone-watch',
            screens: [
                '/images/wave-watch/weather-screen.png',
                '/images/wave-watch/heartrate-screen.png',
                '/images/wave-watch/music-screen.png',
                '/images/wave-watch/notifications-screen.png',
                '/images/wave-watch/call-screen.png',
            ],
            watchScreens: [
                '/images/wave-watch/weather-screen.png',
                '/images/wave-watch/heartrate-screen.png',
                '/images/wave-watch/music-screen.png',
                '/images/wave-watch/notifications-screen.png',
                '/images/wave-watch/call-screen.png',
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
