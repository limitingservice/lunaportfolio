'use client';

import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, PerspectiveCamera, RoundedBox } from '@react-three/drei';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import * as THREE from 'three';

// Generates a canvas texture from a loaded HTML/image URL.
// For .html files: fetches the HTML, renders it via SVG foreignObject into a canvas.
// Falls back to a styled placeholder if fetch or rendering fails.
function useHtmlCanvasTexture(htmlUrl: string | undefined): THREE.CanvasTexture | null {
    const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

    useEffect(() => {
        if (!htmlUrl || !htmlUrl.endsWith('.html')) return;

        let cancelled = false;

        async function build() {
            try {
                const res = await fetch(htmlUrl!);
                const html = await res.text();

                // Strip <script> tags so SVG foreignObject renders without errors
                const cleaned = html.replace(/<script[\s\S]*?<\/script>/gi, '');

                const W = 1024, H = 768;
                const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <foreignObject width="${W}" height="${H}">
    ${cleaned}
  </foreignObject>
</svg>`;
                const blob = new Blob([svg], { type: 'image/svg+xml' });
                const url = URL.createObjectURL(blob);

                const img = new Image();
                img.onload = () => {
                    if (cancelled) { URL.revokeObjectURL(url); return; }
                    const canvas = document.createElement('canvas');
                    canvas.width = W * 2;
                    canvas.height = H * 2;
                    const ctx = canvas.getContext('2d')!;
                    ctx.scale(2, 2);
                    ctx.drawImage(img, 0, 0, W, H);
                    URL.revokeObjectURL(url);
                    const tex = new THREE.CanvasTexture(canvas);
                    tex.anisotropy = 16;
                    setTexture(tex);
                };
                img.onerror = () => {
                    URL.revokeObjectURL(url);
                    setTexture(buildFallbackTexture());
                };
                img.src = url;
            } catch {
                if (!cancelled) setTexture(buildFallbackTexture());
            }
        }

        build();
        return () => { cancelled = true; };
    }, [htmlUrl]);

    return texture;
}

function buildFallbackTexture(): THREE.CanvasTexture {
    const W = 1024, H = 768;
    const canvas = document.createElement('canvas');
    canvas.width = W * 2; canvas.height = H * 2;
    const ctx = canvas.getContext('2d')!;
    const s = 2;

    function rr(x: number, y: number, w: number, h: number, r: number) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
    }

    // Body
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W * s, H * s);

    // Chrome bar
    ctx.fillStyle = '#f5f5f7';
    ctx.fillRect(0, 0, W * s, 40 * s);
    ctx.fillStyle = '#d1d5db';
    ctx.fillRect(0, 40 * s, W * s, 1 * s);
    // URL pill
    ctx.fillStyle = '#e3e3e8';
    rr((W / 2 - 160) * s, 8 * s, 320 * s, 24 * s, 8 * s);
    ctx.fill();
    ctx.fillStyle = '#6b7280';
    ctx.font = `${13 * s}px -apple-system, BlinkMacSystemFont, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('iu.edu/research/hci-portfolio', W / 2 * s, 20 * s);

    // IU crimson header
    const hY = 41, hH = 68;
    ctx.fillStyle = '#990000';
    ctx.fillRect(0, hY * s, W * s, hH * s);
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${26 * s}px Georgia, 'Times New Roman', serif`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('Ψ', 28 * s, (hY + hH / 2) * s);
    ctx.font = `bold ${17 * s}px -apple-system, sans-serif`;
    ctx.fillText('INDIANA UNIVERSITY', 72 * s, (hY + hH / 2 - 9) * s);
    ctx.font = `${11 * s}px -apple-system, sans-serif`;
    ctx.fillStyle = 'rgba(255,255,255,0.88)';
    ctx.fillText('Indianapolis', 72 * s, (hY + hH / 2 + 11) * s);
    ctx.textAlign = 'right';
    ctx.font = `bold ${14 * s}px -apple-system, sans-serif`;
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Bring On Tomorrow', (W - 28) * s, (hY + hH / 2 - 8) * s);
    ctx.font = `${10 * s}px -apple-system, sans-serif`;
    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    ctx.fillText("Solving tomorrow's problems today.", (W - 28) * s, (hY + hH / 2 + 10) * s);

    // Main content area
    const mY = hY + hH + 16, mX = 28, mW = W - 56;
    // Left border + title
    ctx.fillStyle = '#990000';
    ctx.fillRect(mX * s, mY * s, 4 * s, 90 * s);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.font = `bold ${10 * s}px -apple-system, sans-serif`;
    ctx.fillStyle = '#6b7280';
    ctx.fillText("HCI Master's Program  •  2024", (mX + 14) * s, mY * s + 2 * s);
    ctx.font = `bold ${26 * s}px -apple-system, sans-serif`;
    ctx.fillStyle = '#111827';
    ctx.fillText('Research Assistant', (mX + 14) * s, (mY + 16) * s);
    ctx.font = `${12 * s}px -apple-system, sans-serif`;
    ctx.fillStyle = '#374151';
    ctx.fillText('Worked across two research labs focusing on interactive data visualization,', (mX + 14) * s, (mY + 52) * s);
    ctx.fillText('AI-assisted qualitative analysis, and human-centered AI research with older adults.', (mX + 14) * s, (mY + 68) * s);

    // Three columns
    const cY = mY + 102, cH = 210, cGap = 10;
    const cW = (mW - cGap * 2) / 3;
    const cols = [
        { title: 'Lab 1: Data Viz & Museums', items: ['Goal: Evaluate interactive museum visual deployment.', 'Methods: Field studies at Indiana State Museum with Kinect.', 'Findings: Metaphors supported learning effectively.'] },
        { title: 'Lab 1: AI & CMT', items: ['Goal: Investigate LLMs for qualitative analysis via CMT.', 'Methods: Scraped 5K+ Reddit posts. Refined via Gemini.', 'Findings: High-confidence outputs aligned with experts.'] },
        { title: 'Lab 2: AI for Older Adults', items: ['Goal: Examine AI perceptions for health info seeking.', 'Methods: 20 usability testing sessions on trust/utility.', 'Findings: Transparency about limits increased trust.'] },
    ];
    cols.forEach((col, i) => {
        const x = mX + i * (cW + cGap);
        ctx.fillStyle = '#f9fafb';
        ctx.fillRect(x * s, cY * s, cW * s, cH * s);
        ctx.fillStyle = '#990000';
        ctx.fillRect(x * s, cY * s, cW * s, 4 * s);
        ctx.fillStyle = '#111827';
        ctx.font = `bold ${11 * s}px -apple-system, sans-serif`;
        ctx.textBaseline = 'top';
        ctx.fillText(col.title, (x + 10) * s, (cY + 12) * s);
        col.items.forEach((item, j) => {
            ctx.fillStyle = '#990000';
            ctx.font = `bold ${11 * s}px -apple-system, sans-serif`;
            ctx.fillText('→', (x + 10) * s, (cY + 36 + j * 56) * s);
            ctx.fillStyle = '#374151';
            ctx.font = `${10 * s}px -apple-system, sans-serif`;
            const words = item.split(' ');
            let line = '', lineY = (cY + 36 + j * 56);
            words.forEach(w => {
                const test = line + w + ' ';
                if (ctx.measureText(test).width > (cW - 30) * s && line) {
                    ctx.fillText(line.trim(), (x + 22) * s, lineY * s);
                    line = w + ' '; lineY += 14;
                } else { line = test; }
            });
            ctx.fillText(line.trim(), (x + 22) * s, lineY * s);
        });
    });

    // Dark bottom section
    const bY = cY + cH + 10, bH = H - bY - 16;
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(mX * s, bY * s, mW * s, bH * s);
    ctx.strokeStyle = '#990000';
    ctx.lineWidth = 2 * s;
    ctx.strokeRect((mX - 5) * s, (bY - 5) * s, (mW - 10) * s, (bH - 10) * s);
    const bCols = [
        { title: 'Impact & Synthesis', items: ['Supported real-world deployment of interactive installations.', 'Demonstrated AI augments—not replaces—human research.', 'Embodied cognition principles apply physically and digitally.'] },
        { title: 'Skills & Methods Applied', pills: ['Qualitative Research', 'Field Studies', 'Usability Testing', 'Thematic Analysis', 'CMT', 'AI-Assisted Analysis', 'Prompt Engineering'] },
    ];
    const bHalfW = mW / 2 - 8;
    bCols.forEach((col, i) => {
        const x = mX + i * (bHalfW + 16);
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${13 * s}px -apple-system, sans-serif`;
        ctx.textBaseline = 'top';
        ctx.fillText(col.title, (x + 12) * s, (bY + 12) * s);
        ctx.fillStyle = '#4b5563';
        ctx.fillRect((x + 12) * s, (bY + 30) * s, (bHalfW - 24) * s, 1 * s);
        if (col.items) {
            col.items.forEach((item, j) => {
                ctx.fillStyle = '#990000';
                ctx.font = `${11 * s}px -apple-system, sans-serif`;
                ctx.fillText('★', (x + 12) * s, (bY + 38 + j * 20) * s);
                ctx.fillStyle = '#d1d5db';
                ctx.fillText(item, (x + 26) * s, (bY + 38 + j * 20) * s);
            });
        }
        if (col.pills) {
            let px = x + 12, py = bY + 38;
            ctx.font = `${10 * s}px -apple-system, sans-serif`;
            col.pills.forEach(pill => {
                const pw = ctx.measureText(pill).width / s + 20;
                if ((px + pw) > (x + bHalfW - 12)) { px = x + 12; py += 22; }
                ctx.fillStyle = '#2d2d2d';
                rr(px * s, (py - 2) * s, pw * s, 20 * s, 10 * s);
                ctx.fill();
                ctx.strokeStyle = '#4b5563';
                ctx.lineWidth = 1 * s;
                ctx.stroke();
                ctx.fillStyle = '#d1d5db';
                ctx.textBaseline = 'middle';
                ctx.textAlign = 'left';
                ctx.fillText(pill, (px + 10) * s, (py + 8) * s);
                px += pw + 6;
            });
        }
    });

    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 16;
    return tex;
}

// Helper to create a rounded rectangle THREE.Shape (for the phone screen glass & texture)
function createRoundedRectShape(width: number, height: number, radius: number): THREE.Shape {
    const shape = new THREE.Shape();
    const x = -width / 2;
    const y = -height / 2;
    shape.moveTo(x + radius, y);
    shape.lineTo(x + width - radius, y);
    shape.quadraticCurveTo(x + width, y, x + width, y + radius);
    shape.lineTo(x + width, y + height - radius);
    shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    shape.lineTo(x + radius, y + height);
    shape.quadraticCurveTo(x, y + height, x, y + height - radius);
    shape.lineTo(x, y + radius);
    shape.quadraticCurveTo(x, y, x + radius, y);
    return shape;
}

// iPhone 16 Pro — Triple Camera Module (back of phone)
function CameraModule() {
    // Single camera lens with ring + glass
    function CameraLens({ position }: { position: [number, number, number] }) {
        return (
            <group position={position}>
                {/* Outer lens ring */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.06, 0.007, 16, 32]} />
                    <meshStandardMaterial color="#3a3a3c" roughness={0.15} metalness={0.95} />
                </mesh>
                {/* Lens glass */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.052, 0.052, 0.006, 32]} />
                    <meshStandardMaterial color="#0a0a1e" roughness={0.05} metalness={1.0} envMapIntensity={4} />
                </mesh>
                {/* Inner lens detail */}
                <mesh position={[0, 0, -0.004]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.03, 0.03, 0.002, 24]} />
                    <meshStandardMaterial color="#060612" roughness={0.05} metalness={1.0} envMapIntensity={2} />
                </mesh>
            </group>
        );
    }

    return (
        <group position={[0.18, 0.55, -0.04]}>
            {/* Camera module square housing */}
            <RoundedBox args={[0.42, 0.42, 0.025]} radius={0.07} smoothness={4}>
                <meshStandardMaterial color="#1c1c1e" roughness={0.35} metalness={0.85} />
            </RoundedBox>

            {/* Main camera (48MP Wide) — top left */}
            <CameraLens position={[-0.09, 0.09, -0.014]} />
            {/* Ultra Wide (12MP) — top right */}
            <CameraLens position={[0.09, 0.09, -0.014]} />
            {/* Telephoto (12MP) — bottom left */}
            <CameraLens position={[-0.09, -0.09, -0.014]} />

            {/* Flash — bottom right */}
            <mesh position={[0.09, -0.09, -0.014]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.022, 0.022, 0.005, 16]} />
                <meshStandardMaterial color="#e8e0c8" roughness={0.4} metalness={0.3} emissive="#e8e0c8" emissiveIntensity={0.05} />
            </mesh>

            {/* LiDAR Scanner — center */}
            <mesh position={[0, 0, -0.014]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.013, 0.013, 0.005, 12]} />
                <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={0.9} />
            </mesh>
        </group>
    );
}

// iPhone 16 Pro — Dynamic Island (front of phone)
function DynamicIsland() {
    const geometry = useMemo(() => {
        const shape = createRoundedRectShape(0.24, 0.075, 0.037);
        return new THREE.ShapeGeometry(shape, 16);
    }, []);

    return (
        <mesh position={[0, 0.93, 0.043]} geometry={geometry}>
            <meshStandardMaterial color="#000000" roughness={0.4} metalness={0.3} />
        </mesh>
    );
}

// iPhone 16 Pro — Side Buttons
function SideButtons() {
    return (
        <>
            {/* Power button — right side */}
            <RoundedBox position={[0.51, 0.25, 0]} args={[0.015, 0.18, 0.025]} radius={0.005} smoothness={2}>
                <meshStandardMaterial color="#3a3a3c" roughness={0.25} metalness={0.9} />
            </RoundedBox>

            {/* Volume Up — left side */}
            <RoundedBox position={[-0.51, 0.4, 0]} args={[0.015, 0.12, 0.025]} radius={0.005} smoothness={2}>
                <meshStandardMaterial color="#3a3a3c" roughness={0.25} metalness={0.9} />
            </RoundedBox>
            {/* Volume Down — left side */}
            <RoundedBox position={[-0.51, 0.2, 0]} args={[0.015, 0.12, 0.025]} radius={0.005} smoothness={2}>
                <meshStandardMaterial color="#3a3a3c" roughness={0.25} metalness={0.9} />
            </RoundedBox>

            {/* Action Button — left side, above volume */}
            <mesh position={[-0.51, 0.58, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.025, 0.025, 0.015, 16]} />
                <meshStandardMaterial color="#3a3a3c" roughness={0.25} metalness={0.9} />
            </mesh>
        </>
    );
}

// Screen Glass overlay
function ScreenGlass({ color, opacity }: { color: string; opacity: number }) {
    const geometry = useMemo(() => {
        const shape = createRoundedRectShape(0.98, 2.08, 0.11);
        return new THREE.ShapeGeometry(shape, 32);
    }, []);

    return (
        <mesh position={[0, 0, 0.041]} geometry={geometry}>
            <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} opacity={opacity} transparent={opacity < 1} />
        </mesh>
    );
}

// Interactive Screen Texture
function ScreenTexture({ screenImage, position, width, height, cornerRadius, onScreenClick }: { screenImage: string; position: [number, number, number]; width: number; height: number; cornerRadius: number; onScreenClick?: () => void }) {
    const texture = useLoader(THREE.TextureLoader, screenImage);
    const meshRef = useRef<THREE.Mesh>(null);
    const scrollOffsetRef = useRef(0);
    const targetScrollRef = useRef(0);
    const maxScrollRef = useRef(0);
    const { gl, camera } = useThree();
    const raycaster = useMemo(() => new THREE.Raycaster(), []);
    const pointer = useMemo(() => new THREE.Vector2(), []);

    // Track pointer for click-vs-drag detection on the screen mesh
    const screenPointerDown = useRef<{ x: number; y: number } | null>(null);

    const { geometry } = useMemo(() => {
        const shape = createRoundedRectShape(width, height, cornerRadius);
        const geo = new THREE.ShapeGeometry(shape, 32);
        const pos = geo.attributes.position;
        const uvs = new Float32Array(pos.count * 2);
        for (let i = 0; i < pos.count; i++) {
            uvs[i * 2] = (pos.getX(i) + width / 2) / width;
            uvs[i * 2 + 1] = (pos.getY(i) + height / 2) / height;
        }
        geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
        return { geometry: geo };
    }, [width, height, cornerRadius]);

    useMemo(() => {
        if (texture && texture.image) {
            const imgAspect = texture.image.width / texture.image.height;
            const planeAspect = width / height;

            if (imgAspect >= planeAspect) {
                const scale = planeAspect / imgAspect;
                texture.offset.set((1 - scale) / 2, 0);
                texture.repeat.set(scale, 1);
                maxScrollRef.current = 0;
            } else {
                const visibleFraction = imgAspect / planeAspect;
                texture.repeat.set(1, visibleFraction);
                texture.offset.set(0, 1 - visibleFraction);
                maxScrollRef.current = 1 - visibleFraction;
            }
            texture.needsUpdate = true;
        }
    }, [texture, width, height]);

    useFrame(() => {
        if (texture && maxScrollRef.current > 0) {
            scrollOffsetRef.current = THREE.MathUtils.lerp(scrollOffsetRef.current, targetScrollRef.current, 0.12);
            texture.offset.y = maxScrollRef.current - scrollOffsetRef.current;
        }
    });

    useEffect(() => {
        const canvas = gl.domElement;
        const handleWheel = (e: WheelEvent) => {
            if (!meshRef.current || maxScrollRef.current <= 0) return;
            meshRef.current.updateWorldMatrix(true, false);
            const rect = canvas.getBoundingClientRect();
            pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            raycaster.setFromCamera(pointer, camera);
            const intersects = raycaster.intersectObject(meshRef.current, true);
            if (intersects.length > 0) {
                e.preventDefault();
                e.stopPropagation();
                const delta = e.deltaY * 0.003;
                targetScrollRef.current = THREE.MathUtils.clamp(targetScrollRef.current + delta, 0, maxScrollRef.current);
            }
        };
        canvas.addEventListener('wheel', handleWheel, { passive: false });
        return () => canvas.removeEventListener('wheel', handleWheel);
    }, [gl, camera, raycaster, pointer]);

    // Handle click on the screen mesh — only fires if pointer barely moved (not a drag)
    const handlePointerDown = (e: any) => {
        screenPointerDown.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = (e: any) => {
        if (!screenPointerDown.current || !onScreenClick) return;
        const dx = e.clientX - screenPointerDown.current.x;
        const dy = e.clientY - screenPointerDown.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 5) {
            onScreenClick();
        }
        screenPointerDown.current = null;
    };

    return (
        <mesh
            ref={meshRef}
            position={position}
            geometry={geometry}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerOver={() => { if (onScreenClick) gl.domElement.style.cursor = 'pointer'; }}
            onPointerOut={() => { gl.domElement.style.cursor = ''; }}
        >
            <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
    );
}

// Device: iPhone 16 Pro
function PhoneModel({ position, rotation, scale, screenImage, groupRef, hovered, setHovered, onScreenClick }: any) {
    const backGlassGeo = useMemo(() => {
        const shape = createRoundedRectShape(0.96, 2.06, 0.10);
        return new THREE.ShapeGeometry(shape, 32);
    }, []);

    const homeBarGeo = useMemo(() => {
        const shape = createRoundedRectShape(0.28, 0.025, 0.012);
        return new THREE.ShapeGeometry(shape, 12);
    }, []);

    useFrame(() => {
        if (groupRef.current) {
            const targetScale = hovered ? 1.02 : 1;
            groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        }
    });

    return (
        <group
            ref={groupRef} position={position} rotation={rotation} scale={scale}
            onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}
        >
            {/* Titanium frame body (Space Black) */}
            <RoundedBox args={[1.0, 2.1, 0.08]} radius={0.12} smoothness={5} castShadow receiveShadow>
                <meshStandardMaterial color="#2c2c2e" roughness={0.35} metalness={0.85} />
            </RoundedBox>

            {/* Subtle frame edge highlight for titanium look */}
            <RoundedBox args={[1.01, 2.11, 0.075]} radius={0.12} smoothness={5}>
                <meshStandardMaterial color="#48484a" roughness={0.3} metalness={0.9} transparent opacity={0.15} />
            </RoundedBox>

            {/* Back glass panel */}
            <mesh position={[0, 0, -0.041]} rotation={[0, Math.PI, 0]} geometry={backGlassGeo}>
                <meshStandardMaterial color="#1a1a1c" roughness={0.6} metalness={0.4} />
            </mesh>

            {/* Screen glass overlay */}
            <ScreenGlass color="#ffffff" opacity={0} />

            {/* Screen content */}
            {screenImage ? (
                <ScreenTexture screenImage={screenImage} position={[0, 0, 0.042]} width={0.98} height={2.08} cornerRadius={0.11} onScreenClick={() => onScreenClick?.('phone')} />
            ) : (
                <group position={[0, 0, 0.042]}>
                    <mesh position={[0, 0.9, 0]}><planeGeometry args={[1.0, 0.15]} /><meshStandardMaterial color="#2e3c62" /></mesh>
                    <mesh position={[0, 0.3, 0]}><planeGeometry args={[0.9, 0.8]} /><meshStandardMaterial color="#FABC05" /></mesh>
                </group>
            )}

            {/* Dynamic Island */}
            <DynamicIsland />

            {/* Home indicator bar */}
            <mesh position={[0, -0.98, 0.043]} geometry={homeBarGeo}>
                <meshStandardMaterial color="#ffffff" roughness={0.5} metalness={0.2} opacity={0.5} transparent />
            </mesh>

            {/* Triple camera system (back) */}
            <CameraModule />

            {/* Side buttons */}
            <SideButtons />
        </group>
    );
}

// Device: Laptop
function LaptopModel({ position, rotation, scale, screenImage, groupRef, hovered, setHovered, onScreenClick }: any) {
    useFrame(() => {
        if (groupRef.current) {
            const targetScale = hovered ? 1.02 : 1;
            groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        }
    });

    const baseW = 2.6, baseD = 1.7, baseH = 0.04;
    const screenW = baseW, screenH = 1.7, screenD = 0.03;
    const bezelX = 0.1, bezelY = 0.12;
    const texW = screenW - bezelX * 2;
    const texH = screenH - bezelY * 2;

            // Generate a sleek keyboard texture procedurally to look like a real keyboard
            const keyboardTexture = useMemo(() => {
        if (typeof document === 'undefined') return null;
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 400;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            // Keyboard well background
            ctx.fillStyle = '#171717';
            ctx.fillRect(0, 0, 1024, 400);
            
            // Draw keys
            ctx.fillStyle = '#0a0a0a';
            const cols = 15;
            const rows = 6;
            const padX = 12;
            const padY = 12;
            const keyW = (1024 / cols) - padX;
            const keyH = (400 / rows) - padY;
            
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    if (r === rows - 1 && c > 3 && c < 11) continue; // Spacebar cutout
                    ctx.beginPath();
                    const x = (c * (keyW + padX)) + padX/2;
                    const y = (r * (keyH + padY)) + padY/2;
                    const rds = 8;
                    ctx.moveTo(x + rds, y);
                    ctx.lineTo(x + keyW - rds, y);
                    ctx.quadraticCurveTo(x + keyW, y, x + keyW, y + rds);
                    ctx.lineTo(x + keyW, y + keyH - rds);
                    ctx.quadraticCurveTo(x + keyW, y + keyH, x + keyW - rds, y + keyH);
                    ctx.lineTo(x + rds, y + keyH);
                    ctx.quadraticCurveTo(x, y + keyH, x, y + keyH - rds);
                    ctx.lineTo(x, y + rds);
                    ctx.quadraticCurveTo(x, y, x + rds, y);
                    ctx.fill();
                }
            }
            // Spacebar
            ctx.beginPath();
            const sx = (4 * (keyW + padX)) + padX/2;
            const sy = (5 * (keyH + padY)) + padY/2;
            const sw = keyW * 7 + padX * 6;
            const rds = 8;
            ctx.moveTo(sx + rds, sy);
            ctx.lineTo(sx + sw - rds, sy);
            ctx.quadraticCurveTo(sx + sw, sy, sx + sw, sy + rds);
            ctx.lineTo(sx + sw, sy + keyH - rds);
            ctx.quadraticCurveTo(sx + sw, sy + keyH, sx + sw - rds, sy + keyH);
            ctx.lineTo(sx + rds, sy + keyH);
            ctx.quadraticCurveTo(sx, sy + keyH, sx, sy + keyH - rds);
            ctx.lineTo(sx, sy + rds);
            ctx.quadraticCurveTo(sx, sy, sx + rds, sy);
            ctx.fill();
        }
        const tex = new THREE.CanvasTexture(canvas);
        tex.anisotropy = 16;
        return tex;
    }, []);

    return (
        <group
            ref={groupRef} position={position} rotation={rotation} scale={scale}
            onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}
        >
            {/* Laptop Base */}
            <RoundedBox position={[0, -0.6, 0]} args={[baseW, baseH, baseD]} radius={0.02} smoothness={2} castShadow receiveShadow>
                <meshStandardMaterial color="#c0c4c8" roughness={0.3} metalness={0.7} />
            </RoundedBox>
            
            {/* Keyboard */}
            <mesh position={[0, -0.579, -0.1]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[2.2, 0.9]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.8} map={keyboardTexture || undefined} />
            </mesh>
            
            {/* Trackpad */}
            <mesh position={[0, -0.58, 0.5]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.7, 0.35]} />
                <meshStandardMaterial color="#a0a0a0" roughness={0.4} metalness={0.6} />
            </mesh>

            {/* Laptop Screen Lid */}
            <group position={[0, -0.6, -baseD / 2]}>
                <group rotation={[-0.2, 0, 0]}>
                    <RoundedBox position={[0, screenH / 2, 0]} args={[screenW, screenH, screenD]} radius={0.03} smoothness={3} castShadow receiveShadow>
                        <meshStandardMaterial color="#c0c4c8" roughness={0.3} metalness={0.7} />
                    </RoundedBox>
                    <mesh position={[0, screenH / 2, 0.016]}>
                        <planeGeometry args={[texW + 0.04, texH + 0.04]} />
                        <meshStandardMaterial color="#050505" />
                    </mesh>

                    {screenImage && (
                        <ScreenTexture screenImage={screenImage} position={[0, screenH / 2, 0.017]} width={texW} height={texH} cornerRadius={0.01} onScreenClick={() => onScreenClick?.('laptop')} />
                    )}
                </group>
            </group>
        </group>
    );
}

// Device: Apple Watch
function AppleWatchModel({ position, rotation, scale, screenImage, groupRef, hovered, setHovered, onScreenClick }: any) {
    const watchGlassGeo = useMemo(() => {
        const shape = createRoundedRectShape(0.3, 0.36, 0.05);
        return new THREE.ShapeGeometry(shape, 24);
    }, []);

    useFrame(() => {
        if (groupRef.current) {
            const targetScale = hovered ? 1.05 : 1;
            groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        }
    });

    return (
        <group
            ref={groupRef} position={position} rotation={rotation} scale={scale}
            onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}
        >
            {/* Watch Case (Aluminum/Steel) */}
            <RoundedBox args={[0.32, 0.38, 0.1]} radius={0.06} smoothness={4} castShadow receiveShadow>
                <meshStandardMaterial color="#b0b5b9" roughness={0.3} metalness={0.8} />
            </RoundedBox>

            {/* Watch Screen Glass */}
            <mesh position={[0, 0, 0.051]} geometry={watchGlassGeo}>
                <meshStandardMaterial color="#050505" roughness={0.1} metalness={0.9} />
            </mesh>

            {/* Screen Content */}
            {screenImage && (
                <ScreenTexture screenImage={screenImage} position={[0, 0, 0.052]} width={0.28} height={0.34} cornerRadius={0.04} onScreenClick={() => onScreenClick?.('watch')} />
            )}

            {/* Digital Crown */}
            <mesh position={[0.165, 0.08, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.04, 0.04, 0.02, 24]} />
                <meshStandardMaterial color="#c0c5c9" roughness={0.2} metalness={0.9} />
                {/* Crown ridges (simplified) */}
                <mesh position={[0, 0, 0]}>
                    <cylinderGeometry args={[0.042, 0.042, 0.015, 12]} />
                    <meshStandardMaterial color="#a0a5a9" roughness={0.3} metalness={0.8} />
                </mesh>
            </mesh>

            {/* Side Button */}
            <RoundedBox position={[0.16, -0.06, 0]} args={[0.01, 0.1, 0.02]} radius={0.004} smoothness={2}>
                <meshStandardMaterial color="#a0a5a9" roughness={0.3} metalness={0.8} />
            </RoundedBox>
            
            {/* Watch Band Attachments (top and bottom) */}
            <mesh position={[0, 0.19, 0]}>
                <boxGeometry args={[0.22, 0.02, 0.06]} />
                <meshStandardMaterial color="#222" roughness={0.8} />
            </mesh>
            <mesh position={[0, -0.19, 0]}>
                <boxGeometry args={[0.22, 0.02, 0.06]} />
                <meshStandardMaterial color="#222" roughness={0.8} />
            </mesh>
        </group>
    );
}

// Renders an HTML poster URL as a canvas texture on the tablet screen
function TabletHtmlScreen({ htmlUrl, position, width, height }: { htmlUrl: string; position: [number, number, number]; width: number; height: number }) {
    const texture = useHtmlCanvasTexture(htmlUrl);
    const { geometry } = useMemo(() => {
        const shape = createRoundedRectShape(width, height, 0.03);
        const geo = new THREE.ShapeGeometry(shape, 32);
        const pos = geo.attributes.position;
        const uvs = new Float32Array(pos.count * 2);
        for (let i = 0; i < pos.count; i++) {
            uvs[i * 2] = (pos.getX(i) + width / 2) / width;
            uvs[i * 2 + 1] = (pos.getY(i) + height / 2) / height;
        }
        geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
        return { geometry: geo };
    }, [width, height]);

    if (!texture) {
        return (
            <mesh position={position} geometry={geometry}>
                <meshStandardMaterial color="#111111" roughness={0.4} />
            </mesh>
        );
    }

    return (
        <mesh position={position} geometry={geometry}>
            <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
    );
}

// Device: iPad-style Tablet (landscape, for poster display)
function TabletModel({ position, rotation, scale, screenImage, groupRef, hovered, setHovered, onScreenClick }: any) {
    // Landscape orientation: wider than tall
    const bodyW = 2.6, bodyH = 1.75, bodyD = 0.055;
    const bezelX = 0.07, bezelY = 0.06;
    const texW = bodyW - bezelX * 2;
    const texH = bodyH - bezelY * 2;

    const bezelGeo = useMemo(() => {
        const shape = createRoundedRectShape(bodyW - 0.02, bodyH - 0.02, 0.05);
        return new THREE.ShapeGeometry(shape, 32);
    }, [bodyW, bodyH]);

    const homeBarGeo = useMemo(() => {
        const shape = createRoundedRectShape(0.3, 0.02, 0.01);
        return new THREE.ShapeGeometry(shape, 12);
    }, []);

    useFrame(() => {
        if (groupRef.current) {
            const targetScale = hovered ? 1.02 : 1;
            groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        }
    });

    return (
        <group
            ref={groupRef} position={position} rotation={rotation} scale={scale}
            onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}
        >
            {/* Tablet Body (Aluminum) */}
            <RoundedBox args={[bodyW, bodyH, bodyD]} radius={0.06} smoothness={5} castShadow receiveShadow>
                <meshStandardMaterial color="#2c2c2e" roughness={0.3} metalness={0.85} />
            </RoundedBox>

            {/* Subtle edge highlight */}
            <RoundedBox args={[bodyW + 0.01, bodyH + 0.01, bodyD - 0.005]} radius={0.06} smoothness={5}>
                <meshStandardMaterial color="#48484a" roughness={0.3} metalness={0.9} transparent opacity={0.15} />
            </RoundedBox>

            {/* Screen bezel (black) */}
            <mesh position={[0, 0, bodyD / 2 + 0.001]} geometry={bezelGeo}>
                <meshStandardMaterial color="#0a0a0a" roughness={0.4} metalness={0.3} />
            </mesh>

            {/* Screen content */}
            {screenImage && (
                screenImage.endsWith('.html') ? (
                    <TabletHtmlScreen
                        htmlUrl={screenImage}
                        position={[0, 0, bodyD / 2 + 0.002]}
                        width={texW}
                        height={texH}
                    />
                ) : (
                    <ScreenTexture
                        screenImage={screenImage}
                        position={[0, 0, bodyD / 2 + 0.002]}
                        width={texW}
                        height={texH}
                        cornerRadius={0.03}
                        onScreenClick={() => onScreenClick?.('tablet')}
                    />
                )
            )}

            {/* Front camera (centered on right bezel in landscape) */}
            <mesh position={[bodyW / 2 - 0.04, 0, bodyD / 2 + 0.001]} rotation={[0, 0, 0]}>
                <circleGeometry args={[0.012, 16]} />
                <meshStandardMaterial color="#111" roughness={0.1} metalness={0.9} />
            </mesh>

            {/* Home bar indicator (horizontal, centered bottom) */}
            <mesh position={[0, -bodyH / 2 + 0.04, bodyD / 2 + 0.002]} geometry={homeBarGeo}>
                <meshStandardMaterial color="#ffffff" roughness={0.5} metalness={0.2} opacity={0.4} transparent />
            </mesh>

            {/* Power button — top edge */}
            <RoundedBox position={[bodyW / 4, bodyH / 2 + 0.008, 0]} args={[0.12, 0.012, 0.02]} radius={0.004} smoothness={2}>
                <meshStandardMaterial color="#3a3a3c" roughness={0.25} metalness={0.9} />
            </RoundedBox>

            {/* Volume buttons — right side */}
            <RoundedBox position={[bodyW / 2 + 0.008, bodyH / 4, 0]} args={[0.012, 0.08, 0.02]} radius={0.004} smoothness={2}>
                <meshStandardMaterial color="#3a3a3c" roughness={0.25} metalness={0.9} />
            </RoundedBox>
            <RoundedBox position={[bodyW / 2 + 0.008, bodyH / 4 - 0.15, 0]} args={[0.012, 0.08, 0.02]} radius={0.004} smoothness={2}>
                <meshStandardMaterial color="#3a3a3c" roughness={0.25} metalness={0.9} />
            </RoundedBox>
        </group>
    );
}

// Main Interactive Hero Device
function SingleHeroDevice({ screenImage, watchScreenImage, deviceType = 'phone', onScreenClick }: { screenImage?: string; watchScreenImage?: string; deviceType?: 'phone' | 'laptop' | 'phone-watch' | 'tablet' | 'watch'; onScreenClick?: (deviceType?: string) => void }) {
    const groupRef = useRef<THREE.Group>(null);
    const watchGroupRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);
    const prefersReducedMotion = useReducedMotion();
    const { size } = useThree();
    // Narrow viewports cannot fit the wide phone+watch layout or a full-size laptop/tablet.
    // Scale the whole device group down and tighten phone+watch spacing so the scene stays inside the card.
    const isNarrow = size.width < 640;
    const groupScale = isNarrow
        ? deviceType === 'phone-watch'
            ? 0.7
            : deviceType === 'laptop' || deviceType === 'tablet'
                ? 0.75
                : deviceType === 'watch'
                    ? 1.6
                    : 0.85
        : deviceType === 'watch'
            ? 2
            : 1;
    const phonePos: [number, number, number] = deviceType === 'phone-watch'
        ? (isNarrow ? [-0.45, 0.15, 0] : [-0.4, 0, 0])
        : [0, 0, 0];
    const watchPos: [number, number, number] = isNarrow ? [0.65, -0.35, 0.2] : [0.6, -0.2, 0.2];

    const isDragging = useRef(false);
    const targetRotationY = useRef(0);
    const targetRotationX = useRef(0);
    const rotationOnDragStart = useRef({ x: 0, y: 0 });
    const dragStart = useRef({ x: 0, y: 0 });

    const handlePointerDown = (e: any) => {
        isDragging.current = true;
        dragStart.current = { x: e.clientX, y: e.clientY };
        if (groupRef.current) {
            rotationOnDragStart.current = { x: groupRef.current.rotation.x, y: groupRef.current.rotation.y };
        }
    };

    const handlePointerMove = (e: any) => {
        if (!isDragging.current || !groupRef.current) return;
        const deltaX = e.clientX - dragStart.current.x;
        const deltaY = e.clientY - dragStart.current.y;

        targetRotationY.current = rotationOnDragStart.current.y + (deltaX * 0.01);
        targetRotationX.current = rotationOnDragStart.current.x + (deltaY * 0.01);
        
        targetRotationX.current = Math.max(-0.5, Math.min(0.5, targetRotationX.current));
    };

    const handlePointerUp = () => { isDragging.current = false; };

    useEffect(() => {
        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        };
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            if (!isDragging.current && !hovered && !prefersReducedMotion) {
               // Increase float amplitude and speed slightly for more noticeable floating
               const floatY = Math.sin(state.clock.elapsedTime * 1.5) * 0.12;
               
               if (deviceType === 'phone' || deviceType === 'phone-watch') {
                   groupRef.current.position.y = floatY;
                   // Increase rotation amplitude for more noticeable idle movement
                   targetRotationY.current = THREE.MathUtils.lerp(targetRotationY.current, Math.sin(state.clock.elapsedTime * 0.8) * 0.25, 0.02);
                   targetRotationX.current = THREE.MathUtils.lerp(targetRotationX.current, Math.sin(state.clock.elapsedTime * 0.6) * 0.05, 0.02);

                   if (watchGroupRef.current) {
                       // Make the watch float independently and more noticeably
                       watchGroupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.8 + 1) * 0.08 - 0.2;
                   }
               } else if (deviceType === 'watch') {
                   groupRef.current.position.y = floatY * 0.9;
                   targetRotationY.current = THREE.MathUtils.lerp(targetRotationY.current, Math.sin(state.clock.elapsedTime * 0.7) * 0.22, 0.02);
                   targetRotationX.current = THREE.MathUtils.lerp(targetRotationX.current, Math.sin(state.clock.elapsedTime * 0.5) * 0.06, 0.02);
               } else if (deviceType === 'tablet') {
                   groupRef.current.position.y = floatY * 0.8;
                   targetRotationY.current = THREE.MathUtils.lerp(targetRotationY.current, Math.sin(state.clock.elapsedTime * 0.6) * 0.18, 0.02);
                   targetRotationX.current = THREE.MathUtils.lerp(targetRotationX.current, Math.sin(state.clock.elapsedTime * 0.4) * 0.04, 0.02);
               } else {
                   groupRef.current.position.y = floatY * 0.6;
                   targetRotationY.current = THREE.MathUtils.lerp(targetRotationY.current, Math.sin(state.clock.elapsedTime * 0.5) * 0.15, 0.02);
                   targetRotationX.current = THREE.MathUtils.lerp(targetRotationX.current, 0.1 + Math.sin(state.clock.elapsedTime * 0.4) * 0.05, 0.02); 
               }
            }

            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY.current, 0.1);
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX.current, 0.1);
            
            if (watchGroupRef.current) {
                watchGroupRef.current.rotation.y = THREE.MathUtils.lerp(watchGroupRef.current.rotation.y, targetRotationY.current * 1.2, 0.1);
                watchGroupRef.current.rotation.x = THREE.MathUtils.lerp(watchGroupRef.current.rotation.x, targetRotationX.current * 1.2, 0.1);
            }
        }
    });

    return (
        <group onPointerDown={handlePointerDown} position={[0, 0.4, 0]} scale={groupScale}>
            {deviceType === 'laptop' ? (
                <LaptopModel screenImage={screenImage} groupRef={groupRef} hovered={hovered} setHovered={setHovered} onScreenClick={onScreenClick} />
            ) : deviceType === 'tablet' ? (
                <TabletModel screenImage={screenImage} groupRef={groupRef} hovered={hovered} setHovered={setHovered} onScreenClick={onScreenClick} />
            ) : deviceType === 'phone-watch' ? (
                <>
                    <PhoneModel position={phonePos} screenImage={screenImage} groupRef={groupRef} hovered={hovered} setHovered={setHovered} onScreenClick={() => onScreenClick?.('phone')} />
                    <AppleWatchModel position={watchPos} rotation={[0, -0.2, 0]} scale={1.2} screenImage={watchScreenImage} groupRef={watchGroupRef} hovered={hovered} setHovered={setHovered} onScreenClick={() => onScreenClick?.('watch')} />
                </>
            ) : deviceType === 'watch' ? (
                <AppleWatchModel position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1} screenImage={screenImage} groupRef={groupRef} hovered={hovered} setHovered={setHovered} onScreenClick={() => onScreenClick?.('watch')} />
            ) : (
                <PhoneModel screenImage={screenImage} groupRef={groupRef} hovered={hovered} setHovered={setHovered} onScreenClick={() => onScreenClick?.('phone')} />
            )}
        </group>
    );
}

export interface ThreeModelViewerProps {
    className?: string;
    screens?: string[];
    watchScreens?: string[];
    deviceType?: 'phone' | 'laptop' | 'phone-watch' | 'tablet' | 'watch';
    onScreenClick?: (deviceType?: string) => void;
}

export default function ThreeModelViewer({ className = '', screens, watchScreens, deviceType = 'phone', onScreenClick }: ThreeModelViewerProps) {
    return (
        <div className={`w-full h-full relative cursor-grab active:cursor-grabbing ${className}`}>
            <Canvas shadows>
                <PerspectiveCamera makeDefault position={[0, 0, 4.4]} fov={45} />
                <ambientLight intensity={0.5} />
                <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={1} castShadow />
                <spotLight position={[-5, 3, -5]} angle={0.3} penumbra={1} intensity={0.5} />
                <pointLight position={[-2, 2, -2]} intensity={0.8} color="#FABC05" />
                <Environment preset="city" />

                <SingleHeroDevice screenImage={screens?.[0]} watchScreenImage={watchScreens?.[0]} deviceType={deviceType} onScreenClick={onScreenClick} />

                <ContactShadows position={[0, -1.0, 0]} opacity={0.85} scale={7} blur={3} far={3} color="#000000" />
            </Canvas>
        </div>
    );
}
