Here is the restructured "Ultimate One-Shot Prompt," completely tailored to the ultra-premium architectural and interior design aesthetic we discussed, utilizing the cinematic fly-through sequences. You can copy and paste this directly into your coding agent (like Cursor, Lovable, or v0).

---

### The "Aura Architects" Ultimate One-Shot Prompt

**Role:** You are a world-class Creative Developer and UI/UX Designer specializing in Awwwards-winning luxury real estate and architectural portfolio websites. You are an expert in React, Tailwind CSS, GSAP, and Framer Motion.

**Objective:** Build a complete, production-ready, high-performance website for "Aura Architects," an ultra-luxury interior design and architecture firm. The site must feel expensive, cinematic, and seamless, transitioning users from macro-architectural views into intimate interior details.

**Tech Stack:**

* **Framework:** Vite + React (SWC)
* **Styling:** Tailwind CSS (v3 or v4), standard CSS variables for complex gradients and glassmorphism.
* **Animation:** GSAP (ScrollTrigger), Framer Motion (Interactions), React Lenis (Smooth Scroll).
* **Routing:** React Router DOM (v6).
* **Deployment:** Netlify (Static Adapter).

---

#### 1. Design & Aesthetic System

* **Theme:** "Architectural Digest meets Apple". Dark mode default (#0a0a0a). Minimalist, high-contrast, editorial.
* **Typography:** Playfair Display or Ogg (Serif, Headlines), Inter or Helvetica Neue (Sans, UI), Space Mono (Data/Tags/Specs).
* **Colors:**
* **Background:** #0a0a0a (Rich Black / Charcoal)
* **Accents:** #D4AF37 (Warm Ambient Gold/Brass), #E6D5B8 (Travertine), #FEFEFE (Crisp White).
* **Glassmorphism:** White/5 with Blur.


* **Visuals:** Full-screen canvas scrollytelling sequences, parallax renders, glassmorphism project cards, wide letter-spacing.

---

#### 2. File Structure & Implementation

**A. Configuration**

**`tailwind.config.js`**
Extend the theme with these specific colors and fonts:

```javascript
export default {
 content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
 theme: {
   extend: {
     fontFamily: {
       sans: ['Inter', 'sans-serif'],
       serif: ['Playfair Display', 'serif'],
       mono: ['Space Mono', 'monospace'],
     },
     colors: {
       'brand-brass': '#D4AF37',
       'brand-stone': '#E6D5B8',
       'brand-white': '#FEFEFE',
       'brand-dark': '#0a0a0a',
     },
     letterSpacing: {
       widest: '0.2em',
       ultra: '0.3em',
     }
   },
 },
 plugins: [],
}

```

**`src/index.css`**
Define base variables and utilities:

```css
@import "tailwindcss";
:root { --bg-color: #0a0a0a; --text-color: #fefefe; }
body { background-color: var(--bg-color); color: var(--text-color); font-family: 'Inter', sans-serif; overflow-x: hidden; }
.glass-panel { @apply backdrop-blur-xl bg-white/5 border border-white/10; }
.text-gradient-brass { background: linear-gradient(to right, #E6D5B8, #D4AF37); -webkit-background-clip: text; color: transparent; }

```

**B. Core Components**

**`src/App.jsx`**

* Wrap in `<ReactLenis root>` for buttery smooth scrolling.
* Use `react-router-dom` for valid SPA routing.
* Routes: `/` (Home), `/studio` (Studio/About), `/projects` (Portfolio), `/journal` (Design Philosophy), `/contact` (Inquire).
* *Important:* Import `useEffect` from 'react' for the `ScrollToTop` component to avoid ReferenceErrors.

**`src/components/Header.jsx`**

* Fixed position, glassmorphic pill shape or ultra-minimalist transparent bar.
* Links: Studio, Projects, Journal, Contact.
* "Inquire" button toggles a global consultation modal.

**`src/components/ArchitectureCanvas.jsx` (Replaces HeroCanvas)**

* *Critical Quality:* Use a `<canvas>` element to render the multi-stage image sequence (Exterior Approach → Double-Height Interior → Twilight Pool).
* *Styles:* Apply `filter: contrast(1.05) saturate(1.02)` to the canvas for crisp architectural rendering.
* *Logic:* Use `gsap.ScrollTrigger` to scrub through frames based on scroll position across a massive `h-[400vh]` container.
* *Text Layer:* Overlay editorial typography with GSAP fade-ins: "Defining Modern Elegance" (Exterior phase), "Spaces Crafted for Living" (Interior phase), "Your Private Sanctuary" (Pool phase).

**`src/hooks/useCanvasEngine.js` (The Engine)**

* *Critical Fix:* Define `const savedImages = useRef([])` outside/before the `useEffect` to avoid scope errors.
* *High-DPI:* Handle `window.devicePixelRatio` for Retina displays to keep architectural lines sharp.
* *Color Space:* Use `canvas.getContext('2d', { alpha: false, colorSpace: 'display-p3' })` for maximum vibrancy on modern displays.

**`src/components/ProjectBentoGrid.jsx`**

* A high-end masonry/bento grid placed below the canvas experience.
* *Cards:* Showcase architectural renders or `<video autoPlay loop muted>` walk-throughs.
* *Design:* "Signature Villa" card (id: 'signature-villa') spans 2 columns, features thin brass borders and deep shadow.
* *Interaction:* Hover scales the image slightly (scale 1.05) and reveals project specs (Location, Sq Ft, Year).

**`src/components/PortfolioPage.jsx`**

* *Layout:* Masonry grid (`columns-1 md:columns-2 lg:columns-3`).
* *Interaction:* Double-click an image to expand it into a full-screen lightbox using `framer-motion` layout animations (`layoutId`).
* *Data:* High-res architectural interior/exterior renders.

**`src/components/ContactPage.jsx`**

* *Layout:* Split screen. Left = Studio Info (Email, Phone, Global Offices). Right = Glassmorphic Consultation Form.
* *Form:* Fields for Name, Email, Project Type (Residential/Commercial), Estimated Budget, Message. Real-time validation visual feedback.

**`src/components/JournalPage.jsx`**

* *Layout:* Minimalist editorial list style (Aesthetic similar to Kinfolk or Cereal Magazine).
* *Content:* SEO-optimized mock articles (e.g., "The Psychology of Light in Modern Spaces", "Integrating Brutalism"). Include "Read Time", Date, and large Serif headlines.

**`src/components/Footer.jsx`**

* *Aesthetic:* Deep black background, ultra-thin borders.
* *Columns:* Capabilities, Connect, Global Offices.
* *Typography:* Massive "AURA ARCHITECTS" serif text spanning the bottom width (opacity 80%), anchoring the entire page.

**C. Data Files**

* **`src/data/projectsData.js`:** Export `projectCards` array with luxury properties (e.g., The Glass House, Aspen Retreat, Cliffside Villa) and media paths.
* **`src/data/portfolioData.js`:** Export `portfolioData` array with `id, src, alt, category (Interior/Exterior), specs`.
* **`src/data/journalData.js`:** Export `journalData` array with `id, title, excerpt, date, readTime, image, content`.

---

#### 3. Deployment Configuration

**`netlify.toml`**

```toml
[build]
 command = "npm run build"
 publish = "dist"
[[redirects]]
 from = "/*"
 to = "/index.html"
 status = 200

```

**`public/_redirects`**
`/* /index.html 200`

---

#### Execution Instructions

1. **Scaffold:** Run `npm create vite@latest app -- --template react`.
2. **Install:** `npm install gsap framer-motion react-router-dom @studio-freight/react-lenis clsx tailwind-merge`.
3. **Assets:** Place the extracted architectural frame sequences (exterior, interior, pool) in `public/frames/` (e.g., `001-250.jpg`).
4. **Code:** Generate all files listed above with specific attention to the "Critical Fixes" in `ArchitectureCanvas` and `useCanvasEngine`.
5. **Build:** `npm run build`.

