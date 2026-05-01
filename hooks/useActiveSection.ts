'use client';

import { useEffect, useState } from 'react';

export function useActiveSection(ids: string[]): string | null {
    const [activeSection, setActiveSection] = useState<string | null>(ids[0] ?? null);

    useEffect(() => {
        const sections = ids
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null);

        if (sections.length === 0) return;

        const updateActive = () => {
            const viewportMid = window.scrollY + window.innerHeight / 2;
            let bestId: string | null = null;
            let bestDistance = Infinity;

            for (const el of sections) {
                const rect = el.getBoundingClientRect();
                const top = rect.top + window.scrollY;
                const bottom = top + rect.height;
                if (viewportMid >= top && viewportMid <= bottom) {
                    bestId = el.id;
                    bestDistance = 0;
                    break;
                }
                const distance = Math.min(
                    Math.abs(viewportMid - top),
                    Math.abs(viewportMid - bottom)
                );
                if (distance < bestDistance) {
                    bestDistance = distance;
                    bestId = el.id;
                }
            }

            setActiveSection(bestId);
        };

        updateActive();
        window.addEventListener('scroll', updateActive, { passive: true });
        window.addEventListener('resize', updateActive);

        return () => {
            window.removeEventListener('scroll', updateActive);
            window.removeEventListener('resize', updateActive);
        };
    }, [ids]);

    return activeSection;
}
