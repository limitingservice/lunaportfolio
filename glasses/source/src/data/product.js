/* ===========================
   PRODUCT DATA — SWAPPABLE PER SKU
   =========================== */

export const product = {
    id: 'NK-VISION-001',
    name: 'Nike Windshield Elite',
    category: 'Running Sunglasses',
    price: 199,
    rating: 4.7,
    reviewCount: 342,
    scarcity: 'Only 3 left in stock',

    variants: [
        {
            id: 'matte-black',
            name: 'Matte Black',
            color: '#1a1a1a',
            lensColor: '#2a2a2a',
            frameColor: '#111111',
        },
        {
            id: 'tortoise',
            name: 'Tortoise Shell',
            color: '#8B6914',
            lensColor: '#5C4033',
            frameColor: '#6B4226',
        },
        {
            id: 'crystal-clear',
            name: 'Crystal Clear',
            color: '#C0C0C0',
            lensColor: '#87CEEB',
            frameColor: '#D3D3D3',
        },
        {
            id: 'midnight-blue',
            name: 'Midnight Blue',
            color: '#1a237e',
            lensColor: '#283593',
            frameColor: '#0d1652',
        },
    ],

    description:
        'Engineered for elite athletes who demand uncompromising optical clarity and lightweight comfort. The Windshield Elite features a wraparound design with ventilated lenses that eliminate fogging during intense workouts.',

    details: [
        'Polycarbonate lenses with 100% UV protection',
        'Lightweight TR-90 nylon frame (28g)',
        'Non-slip Grip Tips temple ends',
        'Ventilated lens design prevents fogging',
        'Meets ASTM F803 impact standards',
        'Includes hard case and microfiber pouch',
    ],

    shipping: {
        free: true,
        estimated: '3–5 business days',
        returns: 'Free 30-day returns',
    },

    fit: {
        recommended: 'Medium to Wide',
        bridgeWidth: '18mm',
        lensWidth: '65mm',
        templeLength: '130mm',
    },
};
