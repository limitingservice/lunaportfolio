'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Photo } from '@/data/photos';

interface PhotoTileProps {
    photo: Photo;
    index: number;
    onClick: () => void;
}

export default function PhotoTile({ photo, index, onClick }: PhotoTileProps) {
    const [loaded, setLoaded] = useState(false);

    return (
        <motion.button
            type="button"
            onClick={onClick}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.4), ease: [0.22, 1, 0.36, 1] }}
            className="group relative block w-full overflow-hidden bg-neutral-100 cursor-zoom-in mb-4 md:mb-6 break-inside-avoid"
            aria-label={photo.alt}
        >
            {!loaded && <div className="absolute inset-0 bg-neutral-100 animate-pulse" aria-hidden />}
            <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index < 2}
                loading={index < 2 ? undefined : 'lazy'}
                onLoad={() => setLoaded(true)}
                className={`w-full h-auto block transition-all duration-700 ease-out group-hover:scale-[1.02] ${loaded ? 'opacity-100' : 'opacity-0'}`}
            />
        </motion.button>
    );
}
