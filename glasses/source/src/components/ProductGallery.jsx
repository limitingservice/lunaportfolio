import React, { useState } from 'react';
import GlassesIllustration from './GlassesIllustration';

const angles = ['front', 'angle', 'side', 'detail'];
const angleLabels = {
    front: 'Front View',
    angle: '3/4 View',
    side: 'Side Profile',
    detail: 'Lens Detail',
};

export default function ProductGallery({ variant, onTryOn }) {
    const [activeAngle, setActiveAngle] = useState(0);

    return (
        <div className="product-gallery">
            {/* Thumbnail strip */}
            <div className="product-gallery__thumbnails">
                {angles.map((angle, i) => (
                    <button
                        key={angle}
                        className={`product-gallery__thumb ${i === activeAngle ? 'product-gallery__thumb--active' : ''}`}
                        onClick={() => setActiveAngle(i)}
                        aria-label={angleLabels[angle]}
                        title={angleLabels[angle]}
                    >
                        <GlassesIllustration
                            angle={angle}
                            frameColor={variant.frameColor}
                            lensColor={variant.lensColor}
                        />
                    </button>
                ))}
            </div>

            {/* Main image viewport */}
            <div className="product-gallery__main">
                <GlassesIllustration
                    angle={angles[activeAngle]}
                    frameColor={variant.frameColor}
                    lensColor={variant.lensColor}
                />

                {/* Try On AR Button */}
                <button className="try-on-btn" onClick={onTryOn} id="try-on-ar-btn">
                    <span className="try-on-btn__icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    </span>
                    Try On in AR
                    <span className="try-on-btn__pulse" />
                </button>
            </div>
        </div>
    );
}
