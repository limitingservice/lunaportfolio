'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
    Html,
    PerspectiveCamera,
    Environment,
    ContactShadows,
    RoundedBox,
} from '@react-three/drei';
import * as THREE from 'three';

interface AnnotationProps {
    position: [number, number, number];
    label: string;
    description?: string;
    offset?: [number, number];
}

function Annotation({ position, label, description, offset = [12, 0] }: AnnotationProps) {
    return (
        <Html position={position} center zIndexRange={[100, 0]}>
            <div
                className="pointer-events-none flex items-center gap-2 select-none"
                style={{ transform: `translate(${offset[0]}px, ${offset[1]}px)` }}
            >
                <div className="w-2.5 h-2.5 rounded-full bg-white border-[2px] border-orange-500 shadow-[0_0_10px_rgba(255,140,0,0.7)] shrink-0" />
                <div className="bg-zinc-900/95 backdrop-blur-sm text-white text-[10px] md:text-[11px] leading-tight rounded-md px-2 py-1 whitespace-nowrap border border-zinc-700 shadow-lg">
                    <div className="font-semibold text-orange-400">{label}</div>
                    {description && <div className="text-zinc-300 text-[9px] md:text-[10px]">{description}</div>}
                </div>
            </div>
        </Html>
    );
}

function PotsCaneMesh() {
    return (
        <group>
            {/* Handle — horizontal grip body */}
            <RoundedBox args={[0.9, 0.18, 0.18]} radius={0.05} smoothness={4} position={[0.05, 0.6, 0]} castShadow>
                <meshStandardMaterial color="#1e1e1e" roughness={0.45} metalness={0.35} />
            </RoundedBox>

            {/* Sensor cap at right tip of handle */}
            <mesh position={[0.52, 0.6, 0]} castShadow>
                <cylinderGeometry args={[0.1, 0.1, 0.04, 32]} />
                <meshStandardMaterial color="#0a0a0a" roughness={0.15} metalness={0.9} />
            </mesh>
            {/* Sensor inner glow ring */}
            <mesh position={[0.54, 0.6, 0]}>
                <torusGeometry args={[0.06, 0.012, 12, 32]} />
                <meshStandardMaterial color="#ff6b35" emissive="#ff5a1f" emissiveIntensity={0.6} roughness={0.4} />
            </mesh>

            {/* SOS button — red, on the front face of the handle */}
            <mesh position={[0.15, 0.6, 0.1]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                <cylinderGeometry args={[0.055, 0.055, 0.03, 32]} />
                <meshStandardMaterial color="#dc2626" roughness={0.3} metalness={0.1} emissive="#7f1d1d" emissiveIntensity={0.4} />
            </mesh>
            {/* SOS button "S O S" disc */}
            <mesh position={[0.15, 0.6, 0.116]} rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.038, 0.05, 32]} />
                <meshStandardMaterial color="#fff" />
            </mesh>

            {/* Pill box compartment — front of handle */}
            <RoundedBox args={[0.22, 0.08, 0.025]} radius={0.012} smoothness={4} position={[-0.2, 0.6, 0.105]} castShadow>
                <meshStandardMaterial color="#2a2a2a" roughness={0.55} metalness={0.2} />
            </RoundedBox>
            {/* Pill box seam line */}
            <mesh position={[-0.2, 0.6, 0.119]}>
                <boxGeometry args={[0.2, 0.005, 0.001]} />
                <meshStandardMaterial color="#444" />
            </mesh>

            {/* Upper shaft section */}
            <mesh position={[-0.42, 0.18, 0]} castShadow>
                <cylinderGeometry args={[0.042, 0.042, 0.85, 24]} />
                <meshStandardMaterial color="#a8a8ad" roughness={0.18} metalness={0.95} />
            </mesh>

            {/* Telescoping joint collars */}
            {[0.38, 0.08, -0.22].map((y, i) => (
                <mesh key={i} position={[-0.42, y, 0]} castShadow>
                    <cylinderGeometry args={[0.05, 0.05, 0.035, 24]} />
                    <meshStandardMaterial color="#3a3a3a" roughness={0.5} metalness={0.4} />
                </mesh>
            ))}

            {/* Lower shaft section */}
            <mesh position={[-0.42, -0.45, 0]} castShadow>
                <cylinderGeometry args={[0.038, 0.038, 0.5, 24]} />
                <meshStandardMaterial color="#a8a8ad" roughness={0.18} metalness={0.95} />
            </mesh>

            {/* Rubber foot */}
            <mesh position={[-0.42, -0.78, 0]} castShadow>
                <cylinderGeometry args={[0.085, 0.06, 0.11, 24]} />
                <meshStandardMaterial color="#0a0a0a" roughness={0.95} metalness={0.05} />
            </mesh>
        </group>
    );
}

interface AnimatedCaneProps {
    targetRotationY: React.MutableRefObject<number>;
    targetRotationX: React.MutableRefObject<number>;
    isDraggingRef: React.MutableRefObject<boolean>;
}

function AnimatedCane({ targetRotationY, targetRotationX, isDraggingRef }: AnimatedCaneProps) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!groupRef.current) return;
        if (!isDraggingRef.current) {
            const t = state.clock.elapsedTime;
            groupRef.current.position.y = Math.sin(t * 1.0) * 0.04;
            targetRotationY.current = THREE.MathUtils.lerp(
                targetRotationY.current,
                Math.sin(t * 0.45) * 0.45,
                0.02,
            );
            targetRotationX.current = THREE.MathUtils.lerp(
                targetRotationX.current,
                Math.sin(t * 0.35) * 0.04,
                0.02,
            );
        }
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
            groupRef.current.rotation.y,
            targetRotationY.current,
            0.1,
        );
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
            groupRef.current.rotation.x,
            targetRotationX.current,
            0.1,
        );
    });

    return (
        <group position={[0.35, 0, 0]}>
            <group ref={groupRef}>
                <PotsCaneMesh />

                <Annotation position={[0.54, 0.74, 0]} label="Heart rate sensor" description="Passive monitoring" offset={[16, -10]} />
                <Annotation position={[0.15, 0.66, 0.16]} label="SOS button" description="Emergency alert" offset={[16, -22]} />
                <Annotation position={[-0.2, 0.56, 0.16]} label="Pill box" description="Medication storage" offset={[-16, 22]} />
                <Annotation position={[0.3, 0.5, -0.1]} label="Ergonomic handle" description="Game-grip inspired" offset={[16, 22]} />
                <Annotation position={[-0.48, 0.08, 0]} label="Collapsible shaft" description="Portable & discreet" offset={[-16, 0]} />
                <Annotation position={[-0.48, -0.78, 0]} label="Rubber foot" description="Stability on all surfaces" offset={[-16, 10]} />
            </group>
        </group>
    );
}

interface PotsCane3DViewerProps {
    className?: string;
}

export default function PotsCane3DViewer({ className = '' }: PotsCane3DViewerProps) {
    const [isDragging, setIsDragging] = useState(false);
    const isDraggingRef = useRef(false);
    const targetRotationY = useRef(0);
    const targetRotationX = useRef(0);
    const dragStart = useRef({ x: 0, y: 0 });
    const rotationOnDragStart = useRef({ x: 0, y: 0 });

    const handlePointerDown = (e: React.PointerEvent) => {
        isDraggingRef.current = true;
        setIsDragging(true);
        dragStart.current = { x: e.clientX, y: e.clientY };
        rotationOnDragStart.current = {
            x: targetRotationX.current,
            y: targetRotationY.current,
        };
    };

    useEffect(() => {
        const handleMove = (e: PointerEvent) => {
            if (!isDraggingRef.current) return;
            const dx = e.clientX - dragStart.current.x;
            const dy = e.clientY - dragStart.current.y;
            targetRotationY.current = rotationOnDragStart.current.y + dx * 0.01;
            targetRotationX.current = rotationOnDragStart.current.x + dy * 0.008;
            targetRotationX.current = Math.max(-0.5, Math.min(0.5, targetRotationX.current));
        };
        const handleUp = () => {
            if (isDraggingRef.current) {
                isDraggingRef.current = false;
                setIsDragging(false);
            }
        };
        window.addEventListener('pointermove', handleMove);
        window.addEventListener('pointerup', handleUp);
        window.addEventListener('pointercancel', handleUp);
        return () => {
            window.removeEventListener('pointermove', handleMove);
            window.removeEventListener('pointerup', handleUp);
            window.removeEventListener('pointercancel', handleUp);
        };
    }, []);

    return (
        <div
            className={`relative w-full h-full bg-gradient-to-b from-zinc-200 to-zinc-300 cursor-grab active:cursor-grabbing touch-none select-none ${className}`}
            onPointerDown={handlePointerDown}
        >
            <Canvas shadows gl={{ antialias: true }} style={{ touchAction: 'none' }}>
                <PerspectiveCamera makeDefault position={[0.6, 0.2, 3.2]} fov={32} />
                <ambientLight intensity={0.55} />
                <spotLight position={[4, 6, 4]} angle={0.35} penumbra={1} intensity={1.1} castShadow />
                <spotLight position={[-4, 3, -3]} angle={0.35} penumbra={1} intensity={0.45} />
                <pointLight position={[2, -2, 2]} intensity={0.4} color="#ffb482" />
                <Environment preset="studio" />

                <AnimatedCane
                    targetRotationY={targetRotationY}
                    targetRotationX={targetRotationX}
                    isDraggingRef={isDraggingRef}
                />

                <ContactShadows position={[0, -0.9, 0]} opacity={0.55} scale={3} blur={2.8} far={2} color="#000000" />
            </Canvas>

            {/* Header label */}
            <div className="absolute top-3 left-3 pointer-events-none">
                <div className="bg-zinc-900/85 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-md border border-zinc-700">
                    <div className="font-semibold">Smart Cane — Hardware Concept</div>
                    <div className="text-zinc-400 text-[10px]">Drag to rotate</div>
                </div>
            </div>

            {/* Interaction hint — shown when not actively dragging */}
            <div
                className={`absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none transition-opacity duration-200 ${isDragging ? 'opacity-0' : 'opacity-100 animate-pulse'}`}
            >
                <div className="bg-orange-500/90 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 11V6a2 2 0 1 1 4 0v5" />
                        <path d="M9 11V9a2 2 0 1 0-4 0v6a6 6 0 0 0 6 6h2a4 4 0 0 0 4-4v-3a2 2 0 0 0-4 0" />
                    </svg>
                    Drag to rotate
                </div>
            </div>
        </div>
    );
}
