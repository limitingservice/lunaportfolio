# Immersive Shoe Designer Portfolio

A premium, Nike-inspired portfolio website featuring an interactive 360° shoe viewer, built with Next.js, Three.js, and Framer Motion.

## 🚀 Features

- **360° Interactive Shoe Viewer** - Three.js powered 3D viewer with rotation scrubber
- **Accessible Controls** - Full keyboard navigation (arrows, Home, End, Shift for faster rotation)
- **Premium Design** - Nike-inspired UI with warm beige background, deep navy container, and orange accents
- **Smooth Animations** - Framer Motion powered transitions and microinteractions
- **Responsive Layout** - Desktop-first design that works beautifully on all devices
- **Accessibility** - ARIA labels, semantic HTML, keyboard navigation, reduced motion support
- **Data-Driven** - Easy to add new projects via TypeScript data model

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager

## 🛠️ Installation

1. **Navigate to the project directory:**
   ```bash
   cd "c:\Users\lunaf\Documents\Side Projects\Immersive"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

## 🎯 Running the Development Server

Start the development server:

```bash
npm run dev
```

or

```bash
yarn dev
```

The application will be available at **http://localhost:3000**

## 🏗️ Building for Production

To create a production build:

```bash
npm run build
npm start
```

## 📁 Project Structure

```
Immersive/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx            # Root layout with fonts and metadata
│   └── page.tsx              # Main page composing all sections
├── components/
│   ├── layout/
│   │   ├── LayoutShell.tsx   # Main container with animated blobs
│   │   ├── TopNav.tsx        # Horizontal navigation
│   │   └── SideRailNav.tsx   # Vertical side navigation
│   ├── viewer/
│   │   ├── ThreeModelViewer.tsx      # 3D viewer with Three.js
│   │   ├── RotationScrubber.tsx      # Accessible rotation control
│   │   ├── ViewerHUD.tsx             # Project metadata display
│   │   └── FeaturedShoeViewer.tsx    # Main viewer component
│   ├── projects/
│   │   └── ProjectCardRow.tsx        # Floating project cards
│   └── sections/
│       ├── HeroCopy.tsx              # Hero headline and CTAs
│       ├── CaseStudySection.tsx      # Case study details
│       ├── MaterialsSection.tsx      # Materials grid
│       ├── AboutSection.tsx          # Bio and expertise
│       └── ContactSection.tsx        # Contact form
├── data/
│   └── projects.ts           # Project data model
├── hooks/
│   ├── useReducedMotion.ts   # Detect motion preferences
│   └── useSmoothScroll.ts    # Smooth scroll utility
├── utils/
│   └── animations.ts         # Framer Motion variants
└── public/
    ├── models/               # Place .glb 3D models here
    └── images/               # Place project images here
```

## 🎨 Customization

### Adding New Projects

Edit `data/projects.ts` and add a new project object:

```typescript
{
  id: 'your-project-id',
  name: 'Project Name',
  year: 2024,
  category: 'Performance', // or 'Lifestyle', 'Orthopedic', 'Concept', 'Sustainable'
  description: 'Full project description',
  shortDescription: 'Brief one-liner',
  tools: ['CLO3D', 'Rhino', 'KeyShot'],
  tags: ['Performance', 'Running'],
  featured: true, // Show in featured carousel
  images: {
    thumbnail: '/images/your-thumb.jpg',
    hero: '/images/your-hero.jpg',
  },
  viewer: {
    type: '3d',
    glbModelPath: '/models/your-model.glb',
  },
  caseStudy: {
    problem: 'The challenge...',
    approach: 'How you solved it...',
    outcome: 'Results achieved...',
  },
}
```

### Adding 3D Models

1. Place your `.glb` files in the `public/models/` directory
2. Update the `glbModelPath` in your project data
3. The viewer will automatically load and display the model

**Note:** The current implementation uses placeholder geometry. To use real models, ensure they are optimized for web (< 5MB recommended).

### Customizing Colors

Edit `tailwind.config.js` to change the color scheme:

```javascript
colors: {
  beige: { /* your beige palette */ },
  navy: { /* your navy palette */ },
  orange: { /* your accent color */ },
}
```

## ⌨️ Keyboard Controls

- **← →** - Rotate shoe by 3°
- **Shift + ← →** - Rotate shoe by 15° (faster)
- **Home** - Reset to 0°
- **End** - Jump to 360°
- **Tab** - Navigate between interactive elements

## 🎭 Design System

- **Background:** Warm beige gradient with animated orange blobs
- **Container:** Deep navy (#121826 to #0b1220) with rounded corners
- **Accent:** Orange (#ff4d2e) for buttons, highlights, and active states
- **Typography:** Inter font family, bold condensed headlines
- **Animations:** Framer Motion with reduced motion support

## 📱 Responsive Breakpoints

- **Desktop:** 1024px+ (reference layout)
- **Tablet:** 768px - 1023px (stacked viewer)
- **Mobile:** < 768px (full-width viewer, collapsed nav)

## ♿ Accessibility Features

- Semantic HTML5 structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus visible states
- Reduced motion support
- Screen reader friendly

## 🚀 Deployment

This is a standard Next.js application. Deploy to:

- **Vercel** (recommended): `vercel deploy`
- **Netlify**: Connect your Git repository
- **Custom server**: `npm run build && npm start`

## 📝 License

This project is for portfolio demonstration purposes.

## 🤝 Support

For questions or issues, please contact: designer@shoeportfolio.com

---

**Built with ❤️ using Next.js, Three.js, and Framer Motion**
