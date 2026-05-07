# Wave & Watch — Portfolio Integration Package

## Quick Setup

### Step 1: Copy Images
Copy these files to your portfolio's `public/` directory:

```
public/
├── images/
│   ├── wave-watch-logo-opt.png          ← from this package
│   └── wave-watch/
│       ├── weather-screen.png           ← from this package
│       ├── heartrate-screen.png         ← from this package
│       ├── music-screen.png             ← from this package
│       ├── notifications-screen.png     ← from this package
│       └── call-screen.png             ← from this package
└── models/
    └── wave-watch.glb                   ← your 3D model
```

### Step 2: Add Project Entry
Copy the contents of `project-entry.ts` and paste it into your `data/projects.ts` file, inside the `projects` array (before the freelance-photography entry).

### Step 3: Add Your 3D Model
Place your smartwatch `.glb` model at `public/models/wave-watch.glb`.

### Step 4: Verify
Run `npm run dev` and check the "More Projects" section.

---

## Package Contents

| File | Purpose |
|------|---------|
| `wave-watch-logo-opt.png` | Project card thumbnail (goes to `/public/images/`) |
| `weather-screen.png` | Smartwatch Weather UI screen |
| `heartrate-screen.png` | Smartwatch Heart Rate UI screen |
| `music-screen.png` | Smartwatch Music Player UI screen |
| `notifications-screen.png` | Smartwatch Notifications UI screen |
| `call-screen.png` | Smartwatch Incoming Call UI screen |
| `project-entry.ts` | Full project data to paste into `projects.ts` |
| `new_wave_v2.py` | Original Python source code |
| `README.md` | This file |
