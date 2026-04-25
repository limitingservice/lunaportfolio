import React from 'react';

/**
 * High-fidelity SVG sunglasses illustration.
 * Renders different angles: front, angle, side, detail.
 * Colors are customizable via props to match variant swatches.
 */
export default function GlassesIllustration({
    angle = 'front',
    frameColor = '#111111',
    lensColor = '#2a2a2a',
    width = '100%',
    height = '100%',
}) {
    const illustrations = {
        front: (
            <svg viewBox="0 0 600 300" width={width} height={height} xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="lensGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor={lensColor} stopOpacity="0.9" />
                        <stop offset="40%" stopColor={lensColor} />
                        <stop offset="100%" stopColor={lensColor} stopOpacity="0.85" />
                    </linearGradient>
                    <linearGradient id="lensSheen" x1="0" y1="0" x2="0.6" y2="0.4">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
                        <stop offset="50%" stopColor="#ffffff" stopOpacity="0.05" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="frameGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={frameColor} />
                        <stop offset="50%" stopColor={frameColor} stopOpacity="0.95" />
                        <stop offset="100%" stopColor={frameColor} stopOpacity="0.8" />
                    </linearGradient>
                    <filter id="frameShadow">
                        <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.15" />
                    </filter>
                    <filter id="innerShadow">
                        <feOffset dx="0" dy="2" />
                        <feGaussianBlur stdDeviation="3" />
                        <feComposite operator="out" in="SourceGraphic" />
                        <feComponentTransfer><feFuncA type="linear" slope="0.2" /></feComponentTransfer>
                        <feComposite operator="over" in2="SourceGraphic" />
                    </filter>
                </defs>

                <g filter="url(#frameShadow)">
                    {/* Bridge */}
                    <path
                        d="M 268 148 Q 300 135 332 148"
                        fill="none"
                        stroke="url(#frameGrad)"
                        strokeWidth="7"
                        strokeLinecap="round"
                    />

                    {/* Left lens frame */}
                    <path
                        d="M 268 138 Q 265 110 220 100 Q 150 88 110 105 Q 75 120 70 155 Q 65 195 95 215 Q 130 240 185 235 Q 235 230 255 200 Q 270 175 268 148 Z"
                        fill="url(#lensGrad)"
                        stroke="url(#frameGrad)"
                        strokeWidth="6"
                    />
                    {/* Left lens sheen */}
                    <path
                        d="M 268 138 Q 265 110 220 100 Q 150 88 110 105 Q 75 120 70 155 Q 65 195 95 215 Q 130 240 185 235 Q 235 230 255 200 Q 270 175 268 148 Z"
                        fill="url(#lensSheen)"
                    />

                    {/* Right lens frame */}
                    <path
                        d="M 332 138 Q 335 110 380 100 Q 450 88 490 105 Q 525 120 530 155 Q 535 195 505 215 Q 470 240 415 235 Q 365 230 345 200 Q 330 175 332 148 Z"
                        fill="url(#lensGrad)"
                        stroke="url(#frameGrad)"
                        strokeWidth="6"
                    />
                    {/* Right lens sheen */}
                    <path
                        d="M 332 138 Q 335 110 380 100 Q 450 88 490 105 Q 525 120 530 155 Q 535 195 505 215 Q 470 240 415 235 Q 365 230 345 200 Q 330 175 332 148 Z"
                        fill="url(#lensSheen)"
                    />

                    {/* Left temple hinge */}
                    <rect x="62" y="133" width="18" height="28" rx="4" fill="url(#frameGrad)" />
                    {/* Right temple hinge */}
                    <rect x="520" y="133" width="18" height="28" rx="4" fill="url(#frameGrad)" />

                    {/* Left temple arm (partial) */}
                    <path d="M 62 143 Q 40 140 20 145" stroke="url(#frameGrad)" strokeWidth="6" strokeLinecap="round" fill="none" />
                    {/* Right temple arm (partial) */}
                    <path d="M 538 143 Q 560 140 580 145" stroke="url(#frameGrad)" strokeWidth="6" strokeLinecap="round" fill="none" />
                </g>
            </svg>
        ),

        angle: (
            <svg viewBox="0 0 600 300" width={width} height={height} xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="lensGrad2" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor={lensColor} stopOpacity="0.9" />
                        <stop offset="100%" stopColor={lensColor} />
                    </linearGradient>
                    <linearGradient id="lensSheen2" x1="0.2" y1="0" x2="0.8" y2="0.6">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="frameGrad2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={frameColor} />
                        <stop offset="100%" stopColor={frameColor} stopOpacity="0.8" />
                    </linearGradient>
                    <filter id="frameShadow2">
                        <feDropShadow dx="2" dy="6" stdDeviation="10" floodOpacity="0.12" />
                    </filter>
                </defs>

                <g filter="url(#frameShadow2)" transform="rotate(-5, 300, 150)">
                    {/* Bridge */}
                    <path d="M 290 148 Q 310 132 340 145" fill="none" stroke="url(#frameGrad2)" strokeWidth="6" strokeLinecap="round" />

                    {/* Left lens (larger, closer) */}
                    <path
                        d="M 290 138 Q 285 108 240 98 Q 170 86 120 105 Q 80 122 75 160 Q 70 200 100 222 Q 140 248 200 242 Q 255 236 275 205 Q 292 178 290 138 Z"
                        fill="url(#lensGrad2)" stroke="url(#frameGrad2)" strokeWidth="6"
                    />
                    <path d="M 290 138 Q 285 108 240 98 Q 170 86 120 105 Q 80 122 75 160 Q 70 200 100 222 Q 140 248 200 242 Q 255 236 275 205 Q 292 178 290 138 Z" fill="url(#lensSheen2)" />

                    {/* Right lens (smaller, farther, perspective) */}
                    <path
                        d="M 340 140 Q 342 115 375 108 Q 420 98 455 112 Q 480 122 482 148 Q 485 180 462 198 Q 435 218 400 215 Q 365 212 350 190 Q 338 168 340 140 Z"
                        fill="url(#lensGrad2)" stroke="url(#frameGrad2)" strokeWidth="5"
                    />
                    <path d="M 340 140 Q 342 115 375 108 Q 420 98 455 112 Q 480 122 482 148 Q 485 180 462 198 Q 435 218 400 215 Q 365 212 350 190 Q 338 168 340 140 Z" fill="url(#lensSheen2)" />

                    {/* Hinges */}
                    <rect x="64" y="138" width="18" height="26" rx="4" fill="url(#frameGrad2)" />
                    <rect x="478" y="130" width="14" height="22" rx="3" fill="url(#frameGrad2)" />

                    {/* Temples */}
                    <path d="M 64 148 Q 40 145 15 150" stroke="url(#frameGrad2)" strokeWidth="6" strokeLinecap="round" fill="none" />
                    <path d="M 492 138 Q 530 130 570 128 Q 580 127 585 132" stroke="url(#frameGrad2)" strokeWidth="5" strokeLinecap="round" fill="none" />
                </g>
            </svg>
        ),

        side: (
            <svg viewBox="0 0 600 300" width={width} height={height} xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="frameGrad3" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor={frameColor} />
                        <stop offset="100%" stopColor={frameColor} stopOpacity="0.7" />
                    </linearGradient>
                    <linearGradient id="lensGrad3" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor={lensColor} stopOpacity="0.9" />
                        <stop offset="100%" stopColor={lensColor} />
                    </linearGradient>
                    <filter id="frameShadow3">
                        <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.15" />
                    </filter>
                </defs>

                <g filter="url(#frameShadow3)">
                    {/* Temple arm (full length) */}
                    <path
                        d="M 500 150 Q 400 142 300 140 Q 200 138 130 148 Q 90 155 70 170"
                        stroke="url(#frameGrad3)" strokeWidth="7" strokeLinecap="round" fill="none"
                    />

                    {/* Temple tip curve */}
                    <path
                        d="M 70 170 Q 55 185 50 210 Q 48 225 55 230"
                        stroke="url(#frameGrad3)" strokeWidth="6" strokeLinecap="round" fill="none"
                    />

                    {/* Lens (side view - thin) */}
                    <path
                        d="M 500 120 Q 510 118 520 125 Q 535 140 535 165 Q 535 195 520 210 Q 510 220 500 218 Q 492 216 490 200 Q 488 170 490 140 Q 492 125 500 120 Z"
                        fill="url(#lensGrad3)" stroke="url(#frameGrad3)" strokeWidth="4"
                    />

                    {/* Hinge detail */}
                    <circle cx="500" cy="150" r="6" fill={frameColor} />
                    <circle cx="500" cy="150" r="3" fill={lensColor} opacity="0.5" />
                </g>
            </svg>
        ),

        detail: (
            <svg viewBox="0 0 600 300" width={width} height={height} xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="lensGrad4" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor={lensColor} stopOpacity="0.85" />
                        <stop offset="30%" stopColor={lensColor} />
                        <stop offset="100%" stopColor={lensColor} stopOpacity="0.9" />
                    </linearGradient>
                    <linearGradient id="sheenGrad4" x1="0.1" y1="0.1" x2="0.9" y2="0.9">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                        <stop offset="30%" stopColor="#ffffff" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="frameGrad4" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={frameColor} />
                        <stop offset="100%" stopColor={frameColor} stopOpacity="0.8" />
                    </linearGradient>
                    <filter id="frameShadow4">
                        <feDropShadow dx="0" dy="6" stdDeviation="12" floodOpacity="0.18" />
                    </filter>
                </defs>

                <g filter="url(#frameShadow4)">
                    {/* Single large lens close-up */}
                    <path
                        d="M 380 90 Q 280 70 180 95 Q 100 120 80 180 Q 60 245 120 275 Q 200 310 310 290 Q 400 270 430 220 Q 460 170 440 120 Q 420 95 380 90 Z"
                        fill="url(#lensGrad4)" stroke="url(#frameGrad4)" strokeWidth="8"
                    />
                    {/* Lens sheen */}
                    <path
                        d="M 380 90 Q 280 70 180 95 Q 100 120 80 180 Q 60 245 120 275 Q 200 310 310 290 Q 400 270 430 220 Q 460 170 440 120 Q 420 95 380 90 Z"
                        fill="url(#sheenGrad4)"
                    />

                    {/* Hinge area */}
                    <rect x="448" y="120" width="28" height="38" rx="6" fill="url(#frameGrad4)" />

                    {/* Temple start */}
                    <path d="M 476 135 Q 510 130 550 128" stroke="url(#frameGrad4)" strokeWidth="8" strokeLinecap="round" fill="none" />

                    {/* Bridge partial */}
                    <path d="M 445 105 Q 470 95 500 100" stroke="url(#frameGrad4)" strokeWidth="7" strokeLinecap="round" fill="none" />

                    {/* Nose pad detail */}
                    <ellipse cx="468" cy="188" rx="8" ry="14" fill={frameColor} opacity="0.6" />
                </g>
            </svg>
        ),
    };

    return (
        <div className="product-img-placeholder" style={{ background: 'transparent' }}>
            {illustrations[angle] || illustrations.front}
        </div>
    );
}
