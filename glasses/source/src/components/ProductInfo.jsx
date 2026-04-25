import React, { useState } from 'react';

export default function ProductInfo({ product, selectedVariant, onVariantChange }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [descOpen, setDescOpen] = useState(false);
    const [detailsOpen, setDetailsOpen] = useState(true);
    const [fitOpen, setFitOpen] = useState(false);
    const [addedToBag, setAddedToBag] = useState(false);

    const handleAddToBag = () => {
        setAddedToBag(true);
        setTimeout(() => setAddedToBag(false), 2000);
    };

    return (
        <div className="product-info">
            {/* Header */}
            <div className="product-info__header">
                <span className="product-info__category">{product.category}</span>
                <h1 className="product-info__name">{product.name}</h1>
                <div className="product-info__price-row">
                    <span className="product-info__price">${product.price}</span>
                </div>
            </div>

            {/* Rating */}
            <div className="product-info__rating">
                <div className="product-info__stars">
                    {[...Array(5)].map((_, i) => (
                        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                    ))}
                </div>
                <span>{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            {/* Variant selector */}
            <div className="product-info__variants">
                <div className="product-info__variant-label">
                    Color: <span>{selectedVariant.name}</span>
                </div>
                <div className="product-info__swatches">
                    {product.variants.map((v) => (
                        <button
                            key={v.id}
                            className={`variant-swatch ${v.id === selectedVariant.id ? 'variant-swatch--active' : ''}`}
                            style={{ background: v.color }}
                            onClick={() => onVariantChange(v)}
                            aria-label={v.name}
                            title={v.name}
                        />
                    ))}
                </div>
            </div>

            {/* Scarcity */}
            <div className="product-info__scarcity">
                <span className="product-info__scarcity-dot" />
                {product.scarcity}
            </div>

            {/* CTA */}
            <div className="product-info__cta">
                <button
                    className="btn-add-to-bag"
                    onClick={handleAddToBag}
                    id="add-to-bag-btn"
                >
                    {addedToBag ? '✓ Added to Bag' : 'Add to Bag'}
                </button>
                <button
                    className={`btn-favorite ${isFavorite ? 'btn-favorite--active' : ''}`}
                    onClick={() => setIsFavorite(!isFavorite)}
                    id="favorite-btn"
                >
                    Favorite
                    <svg width="18" height="18" viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                </button>
            </div>

            {/* Shipping */}
            <div className="product-info__shipping">
                <div className="product-info__shipping-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="1" y="3" width="15" height="13" />
                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                        <circle cx="5.5" cy="18.5" r="2.5" />
                        <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                    <span>{product.shipping.free ? 'Free shipping' : 'Standard shipping'} — {product.shipping.estimated}</span>
                </div>
                <div className="product-info__shipping-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 11 12 14 22 4" />
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                    <span>{product.shipping.returns}</span>
                </div>
            </div>

            {/* Product Description (expandable) */}
            <div className="product-info__description">
                <button
                    className={`product-info__desc-toggle ${descOpen ? 'product-info__desc-toggle--open' : ''}`}
                    onClick={() => setDescOpen(!descOpen)}
                >
                    Product Description
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </button>
                <div className={`product-info__desc-content ${descOpen ? 'product-info__desc-content--open' : ''}`}>
                    <p className="product-info__desc-text">{product.description}</p>
                </div>
            </div>

            {/* Product Details (expandable) */}
            <div className="product-info__description">
                <button
                    className={`product-info__desc-toggle ${detailsOpen ? 'product-info__desc-toggle--open' : ''}`}
                    onClick={() => setDetailsOpen(!detailsOpen)}
                >
                    Product Details
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </button>
                <div className={`product-info__desc-content ${detailsOpen ? 'product-info__desc-content--open' : ''}`}>
                    <ul className="product-info__details-list">
                        {product.details.map((d, i) => (
                            <li key={i}>{d}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Fit Info (expandable) */}
            <div className="product-info__description">
                <button
                    className={`product-info__desc-toggle ${fitOpen ? 'product-info__desc-toggle--open' : ''}`}
                    onClick={() => setFitOpen(!fitOpen)}
                >
                    Fit & Sizing
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </button>
                <div className={`product-info__desc-content ${fitOpen ? 'product-info__desc-content--open' : ''}`}>
                    <div className="product-info__fit">
                        <span className="product-info__fit-title">Recommended Fit</span>
                        <div className="product-info__fit-grid">
                            <div className="product-info__fit-item">
                                <strong>Fit:</strong> {product.fit.recommended}
                            </div>
                            <div className="product-info__fit-item">
                                <strong>Bridge:</strong> {product.fit.bridgeWidth}
                            </div>
                            <div className="product-info__fit-item">
                                <strong>Lens:</strong> {product.fit.lensWidth}
                            </div>
                            <div className="product-info__fit-item">
                                <strong>Temple:</strong> {product.fit.templeLength}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
