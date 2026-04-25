# AR Virtual Glasses Try-On — Portfolio Package

## Contents

```
portfolio-package/
├── Case_Study_AR_Glasses_TryOn.md    ← In-depth rationale & analysis document
├── README.md                          ← This file
├── screens/                           ← Key screens (numbered, start to finish)
│   ├── SCREEN_INDEX.md                ← Screen guide with descriptions
│   ├── 01_Product_Page_Hero.png
│   ├── 02_Product_Details_Expanded.png
│   ├── 03_Color_Variant_Selection.png
│   ├── 04_3D_Angle_View.png
│   ├── 05_AR_Permission_Modal.png
│   ├── 06_AR_Virtual_TryOn_Permission.png
│   ├── 07_AR_Find_Face_Guided.png
│   ├── 08_AR_Face_Locked_Confirmation.png
│   └── 09_AR_Live_TryOn_Tracking.png
└── source/                            ← Full project source code
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── index.css
        ├── data/product.js
        ├── components/
        │   ├── ARTryOn.jsx
        │   ├── FindFaceOverlay.jsx
        │   ├── GlassesIllustration.jsx
        │   ├── ProductGallery.jsx
        │   └── ProductInfo.jsx
        └── ar/
            ├── FaceTracker.js
            ├── FaceTrackingController.js
            ├── GlassesRenderer.jsx
            ├── smoothing.js
            └── useARSession.js
```

## Quick Start (Source Code)

```bash
cd source
npm install
npm run dev
```

Opens at `http://localhost:3000`. Click "Try On in AR" to experience the full AR flow (requires a webcam).

## About This Project

An end-to-end UX/UI design and development project that solves the #1 problem in online eyewear shopping: **not knowing how glasses will look on your face before buying.** 

This browser-based AR solution uses real-time face tracking (MediaPipe) and 3D rendering (Three.js) to let users virtually try on glasses — no app download required. It reduces return rates, increases purchase confidence, and delivers a premium experience that rivals native AR apps.

See `Case_Study_AR_Glasses_TryOn.md` for the full analysis.
