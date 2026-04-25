/**
 * GlassesRenderer v6 — One Euro smoothed, with fade-in/out
 *
 * Changes from v5:
 * - One Euro Filter for position, rotation, and scale
 * - Fade-in when transitioning from LOCK to TRACKING
 * - Fade-out when entering LOST state
 * - Stable IPD-based scale with shrink resistance
 */

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { OneEuroFilterGroup, EMA } from './smoothing';

function toScene(nx, ny, cam, vp) {
    const d = cam.position.z;
    const vFov = (cam.fov * Math.PI) / 180;
    const h = 2 * Math.tan(vFov / 2) * d;
    const w = h * vp.aspect;
    return { x: (nx - 0.5) * w, y: -(ny - 0.5) * h };
}

function toSceneDist(nd, cam, vp) {
    const d = cam.position.z;
    const vFov = (cam.fov * Math.PI) / 180;
    const h = 2 * Math.tan(vFov / 2) * d;
    return nd * h * vp.aspect;
}

/**
 * Sport sunglasses model. Front width = 1.0.
 */
function createGlassesGeometry(frameColor, lensColor) {
    const group = new THREE.Group();

    const frameMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(frameColor),
        roughness: 0.28,
        metalness: 0.6,
        transparent: true,
        opacity: 1,
    });

    const lensMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(lensColor),
        transparent: true,
        opacity: 0.72,
        roughness: 0.06,
        metalness: 0.25,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        reflectivity: 0.85,
        side: THREE.DoubleSide,
    });

    const halfWidth = 0.5;
    const halfBridge = 0.022;
    const endpiece = 0.028;
    const lensW = halfWidth - halfBridge - endpiece;
    const lensH = 0.19;
    const frameT = 0.007;

    const llCx = -(halfBridge + lensW / 2);
    const rlCx = (halfBridge + lensW / 2);
    const llL = -(halfBridge + lensW);
    const llR = -halfBridge;
    const rlL = halfBridge;
    const rlR = halfBridge + lensW;

    // Left lens
    const leftShape = new THREE.Shape();
    leftShape.moveTo(llR, lensH * 0.35);
    leftShape.bezierCurveTo(llR - 0.01, lensH * 0.48, llCx + 0.06, lensH * 0.50, llCx, lensH * 0.50);
    leftShape.bezierCurveTo(llCx - 0.06, lensH * 0.50, llL + 0.06, lensH * 0.42, llL, lensH * 0.28);
    leftShape.bezierCurveTo(llL - 0.01, lensH * 0.10, llL - 0.01, -lensH * 0.15, llL, -lensH * 0.35);
    leftShape.bezierCurveTo(llL + 0.06, -lensH * 0.52, llCx - 0.04, -lensH * 0.50, llCx, -lensH * 0.48);
    leftShape.bezierCurveTo(llCx + 0.06, -lensH * 0.46, llR - 0.03, -lensH * 0.38, llR, -lensH * 0.25);
    leftShape.bezierCurveTo(llR + 0.004, -lensH * 0.05, llR + 0.004, lensH * 0.15, llR, lensH * 0.35);
    group.add(new THREE.Mesh(new THREE.ShapeGeometry(leftShape, 32), lensMat));

    // Right lens
    const rightShape = new THREE.Shape();
    rightShape.moveTo(rlL, lensH * 0.35);
    rightShape.bezierCurveTo(rlL - 0.004, lensH * 0.15, rlL - 0.004, -lensH * 0.05, rlL, -lensH * 0.25);
    rightShape.bezierCurveTo(rlL + 0.03, -lensH * 0.38, rlCx - 0.06, -lensH * 0.46, rlCx, -lensH * 0.48);
    rightShape.bezierCurveTo(rlCx + 0.04, -lensH * 0.50, rlR - 0.06, -lensH * 0.52, rlR, -lensH * 0.35);
    rightShape.bezierCurveTo(rlR + 0.01, -lensH * 0.15, rlR + 0.01, lensH * 0.10, rlR, lensH * 0.28);
    rightShape.bezierCurveTo(rlR - 0.06, lensH * 0.42, rlCx + 0.06, lensH * 0.50, rlCx, lensH * 0.50);
    rightShape.bezierCurveTo(rlCx - 0.06, lensH * 0.50, rlL + 0.01, lensH * 0.48, rlL, lensH * 0.35);
    group.add(new THREE.Mesh(new THREE.ShapeGeometry(rightShape, 32), lensMat));

    // Frame outlines
    function frameOutline(shape) {
        const pts = [];
        for (let i = 0; i <= 80; i++) {
            const p = shape.getPoint(i / 80);
            pts.push(new THREE.Vector3(p.x, p.y, 0));
        }
        return new THREE.Mesh(
            new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, true), 64, frameT, 6, true),
            frameMat
        );
    }
    group.add(frameOutline(leftShape));
    group.add(frameOutline(rightShape));

    // Bridge
    const bridgeCurve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-halfBridge, lensH * 0.15, 0),
        new THREE.Vector3(0, lensH * 0.30, 0.008),
        new THREE.Vector3(halfBridge, lensH * 0.15, 0)
    );
    group.add(new THREE.Mesh(new THREE.TubeGeometry(bridgeCurve, 10, frameT * 0.85, 6, false), frameMat));

    // Brow bar
    const browCurve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(llL + 0.03, lensH * 0.30, 0),
        new THREE.Vector3(llCx, lensH * 0.52, 0),
        new THREE.Vector3(rlCx, lensH * 0.52, 0),
        new THREE.Vector3(rlR - 0.03, lensH * 0.30, 0)
    );
    group.add(new THREE.Mesh(new THREE.TubeGeometry(browCurve, 32, frameT * 0.55, 5, false), frameMat));

    // Endpieces
    const epGeo = new THREE.BoxGeometry(endpiece, lensH * 0.28, 0.012);
    const lep = new THREE.Mesh(epGeo, frameMat);
    lep.position.set(-(halfWidth - endpiece / 2), lensH * 0.03, 0);
    group.add(lep);
    const rep = lep.clone();
    rep.position.set(halfWidth - endpiece / 2, lensH * 0.03, 0);
    group.add(rep);

    // TEMPLE ARMS — long arms that wrap around the head behind the ears
    const templeThickness = frameT * 1.2;
    const templeY = lensH * 0.04;

    // Arms curve inward toward the skull and hook down behind the ear
    const leftTemplePts = [
        new THREE.Vector3(-halfWidth, templeY, 0),                          // endpiece junction
        new THREE.Vector3(-halfWidth - 0.005, templeY, -0.04),              // slight outward flare
        new THREE.Vector3(-halfWidth - 0.008, templeY, -0.10),              // straight back
        new THREE.Vector3(-halfWidth - 0.006, templeY, -0.18),              // keep level height
        new THREE.Vector3(-halfWidth + 0.005, templeY * 0.9, -0.28),        // start curving inward
        new THREE.Vector3(-halfWidth + 0.025, templeY * 0.7, -0.40),        // curve inward toward skull
        new THREE.Vector3(-halfWidth + 0.045, templeY * 0.4, -0.54),        // wrapping around head
        new THREE.Vector3(-halfWidth + 0.055, templeY * 0.1, -0.66),        // behind the ear area
        new THREE.Vector3(-halfWidth + 0.055, -0.015, -0.76),               // ear hook starts
        new THREE.Vector3(-halfWidth + 0.050, -0.045, -0.82),               // hooking downward
        new THREE.Vector3(-halfWidth + 0.042, -0.075, -0.85),               // ear hook tip
    ];
    group.add(new THREE.Mesh(
        new THREE.TubeGeometry(new THREE.CatmullRomCurve3(leftTemplePts, false, 'centripetal'), 48, templeThickness, 6, false),
        frameMat
    ));

    const tipGeo = new THREE.SphereGeometry(templeThickness * 1.3, 6, 6);
    const leftTip = new THREE.Mesh(tipGeo, frameMat);
    leftTip.position.copy(leftTemplePts[leftTemplePts.length - 1]);
    group.add(leftTip);

    const rightTemplePts = leftTemplePts.map(p => new THREE.Vector3(-p.x, p.y, p.z));
    group.add(new THREE.Mesh(
        new THREE.TubeGeometry(new THREE.CatmullRomCurve3(rightTemplePts, false, 'centripetal'), 48, templeThickness, 6, false),
        frameMat
    ));
    const rightTip = new THREE.Mesh(tipGeo, frameMat);
    rightTip.position.copy(rightTemplePts[rightTemplePts.length - 1]);
    group.add(rightTip);

    // Nose pads
    const padGeo = new THREE.SphereGeometry(0.005, 6, 6);
    const lp = new THREE.Mesh(padGeo, frameMat);
    lp.position.set(-halfBridge - 0.008, -lensH * 0.12, 0.008);
    lp.scale.set(1, 1.4, 0.5);
    group.add(lp);
    const rp = lp.clone();
    rp.position.set(halfBridge + 0.008, -lensH * 0.12, 0.008);
    group.add(rp);

    return { group, frameMat, lensMat };
}

export default function GlassesRenderer({ faceData, variant, fadeIn }) {
    const groupRef = useRef();
    const materialsRef = useRef({ frameMat: null, lensMat: null });
    const hasInit = useRef(false);
    const stableScale = useRef(0);
    const frameCount = useRef(0);
    const opacityRef = useRef(0);

    // One Euro Filters for smooth tracking
    const posFilter = useRef(new OneEuroFilterGroup(2, 30, 1.5, 0.01));
    const rotFilter = useRef(new OneEuroFilterGroup(3, 30, 0.8, 0.02));
    const scaleFilter = useRef(new EMA(0.15));

    const { camera, viewport } = useThree();

    const glassesGroup = useMemo(() => {
        const { group, frameMat, lensMat } = createGlassesGeometry(
            variant?.frameColor || '#111111',
            variant?.lensColor || '#2a2a2a'
        );
        materialsRef.current = { frameMat, lensMat };
        return group;
    }, []);

    useEffect(() => {
        if (materialsRef.current.frameMat && variant) {
            materialsRef.current.frameMat.color.set(variant.frameColor);
            materialsRef.current.lensMat.color.set(variant.lensColor);
        }
    }, [variant]);

    useFrame((_, delta) => {
        if (!groupRef.current) return;

        // Fade-in animation
        if (fadeIn && opacityRef.current < 1) {
            opacityRef.current = Math.min(opacityRef.current + delta * 3, 1);
            if (materialsRef.current.frameMat) {
                materialsRef.current.frameMat.opacity = opacityRef.current;
                materialsRef.current.lensMat.opacity = 0.72 * opacityRef.current;
            }
        }

        if (!faceData) {
            // Fade out when no face data
            if (opacityRef.current > 0) {
                opacityRef.current = Math.max(opacityRef.current - delta * 4, 0);
                if (materialsRef.current.frameMat) {
                    materialsRef.current.frameMat.opacity = opacityRef.current;
                    materialsRef.current.lensMat.opacity = 0.72 * opacityRef.current;
                }
            }
            if (opacityRef.current <= 0) {
                groupRef.current.visible = false;
            }
            return;
        }

        groupRef.current.visible = true;
        frameCount.current++;

        const { leftEyeCenter, rightEyeCenter, noseBridge, ipd, ipdFlat, headPose } = faceData;

        const now = performance.now() / 1000; // seconds

        // ---- POSITION ----
        const eyeMidX = (leftEyeCenter.x + rightEyeCenter.x) / 2;
        const eyeMidY = (leftEyeCenter.y + rightEyeCenter.y) / 2;
        const anchorY = eyeMidY * 0.8 + noseBridge.y * 0.2;
        const rawPos = toScene(eyeMidX, anchorY, camera, viewport);

        const [sx, sy] = posFilter.current.filter([rawPos.x, rawPos.y], now);

        // ---- SCALE ----
        // Use 3D IPD so the glasses don't shrink when head rotates
        const ipdScene = toSceneDist(ipd || ipdFlat, camera, viewport);
        const rawScale = ipdScene * 2.4;

        if (frameCount.current < 5) {
            stableScale.current = rawScale;
        } else {
            if (rawScale > stableScale.current) {
                stableScale.current += (rawScale - stableScale.current) * 0.25;
            } else {
                stableScale.current += (rawScale - stableScale.current) * 0.02;
            }
        }
        const smoothScale = scaleFilter.current.filter(stableScale.current);

        // ---- ROTATION ----
        // Amplify yaw slightly — a flat 2D overlay needs more visual yaw
        // to match the perceived rotation of a 3D head
        const yawGain = 1.25;
        const rawRot = [headPose.pitch, headPose.yaw * yawGain, headPose.roll];
        const [rx, ry, rz] = rotFilter.current.filter(rawRot, now);

        // ---- YAW-BASED LATERAL OFFSET ----
        // When head rotates, the nose bridge shifts laterally in 2D.
        // Compensate so glasses stay centered on the face.
        const yawOffset = Math.sin(ry) * smoothScale * 0.18;

        // ---- APPLY ----
        const g = groupRef.current;

        if (!hasInit.current) {
            g.position.set(sx + yawOffset, sy, 0);
            g.scale.setScalar(smoothScale);
            g.rotation.set(rx, ry, rz);
            hasInit.current = true;
            return;
        }

        g.position.set(sx + yawOffset, sy, 0);
        g.scale.setScalar(smoothScale);
        g.rotation.set(rx, ry, rz);
    });

    return (
        <>
            <ambientLight intensity={0.8} />
            <directionalLight position={[2, 3, 5]} intensity={0.9} />
            <directionalLight position={[-2, 1, 3]} intensity={0.4} />
            <pointLight position={[0, 0, 4]} intensity={0.25} />

            <group ref={groupRef} visible={false}>
                <primitive object={glassesGroup} />
            </group>
        </>
    );
}
