import React, { useState, lazy, Suspense } from 'react';
import { product } from './data/product';
import ProductGallery from './components/ProductGallery';
import ProductInfo from './components/ProductInfo';

// Lazy load AR component — don't load 3D/MediaPipe until needed
const ARTryOn = lazy(() => import('./components/ARTryOn'));

export default function App() {
    const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
    const [showAR, setShowAR] = useState(false);

    return (
        <>
            {/* Header */}
            <header className="site-header">
                <div className="site-header__logo">
                    NIKE<span>VISION</span>
                </div>
                <nav>
                    <ul className="site-header__nav">
                        <li><a href="#" id="nav-men">Men</a></li>
                        <li><a href="#" id="nav-women">Women</a></li>
                        <li><a href="#" id="nav-sport">Sport</a></li>
                        <li><a href="#" id="nav-new">New Arrivals</a></li>
                    </ul>
                </nav>
                <div className="site-header__actions">
                    <button className="site-header__icon-btn" aria-label="Search" id="search-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </button>
                    <button className="site-header__icon-btn" aria-label="Favorites" id="favorites-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                    </button>
                    <button className="site-header__icon-btn" aria-label="Cart" id="cart-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                        <span className="site-header__badge">2</span>
                    </button>
                </div>
            </header>

            {/* Breadcrumb */}
            <div className="breadcrumb">
                <a href="#">Home</a>
                <span className="breadcrumb__separator">›</span>
                <a href="#">Sunglasses</a>
                <span className="breadcrumb__separator">›</span>
                <a href="#">{product.category}</a>
                <span className="breadcrumb__separator">›</span>
                <span className="breadcrumb__current">{product.name}</span>
            </div>

            {/* Product Page */}
            <main className="product-page">
                <ProductGallery
                    variant={selectedVariant}
                    onTryOn={() => setShowAR(true)}
                />
                <ProductInfo
                    product={product}
                    selectedVariant={selectedVariant}
                    onVariantChange={setSelectedVariant}
                />
            </main>

            {/* AR Overlay (lazy loaded) */}
            {showAR && (
                <Suspense fallback={
                    <div className="ar-modal">
                        <div className="ar-modal__loading">
                            <div className="ar-modal__loading-spinner" />
                            <p className="ar-modal__loading-text">Loading AR Experience...</p>
                        </div>
                    </div>
                }>
                    <ARTryOn
                        product={product}
                        selectedVariant={selectedVariant}
                        onVariantChange={setSelectedVariant}
                        onClose={() => setShowAR(false)}
                    />
                </Suspense>
            )}
        </>
    );
}
