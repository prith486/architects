# Refinement Part 1: Premium Typography & Grain Texture (`6_premium_design_system.md`)

**AGENT INSTRUCTION:** This is a global CSS update. Inject these font imports at the very top of the main stylesheet, and update the global `:root` and `body` rules to establish a luxury architectural design system. Do not alter the HTML structure.

## 1. Font Imports (Google Fonts)
We are moving away from basic system fonts. We need a luxurious Serif for headings and a clean, wide Sans-Serif for the body text. 

```css
/* Inject at the very top of style.css */
@import url('[https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Manrope:wght@200;300;400;500&display=swap](https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Manrope:wght@200;300;400;500&display=swap)');
2. Global CSS Variables & Grain Texture
Update the root variables to include our warm, golden architectural palette and apply a CSS-based noise/grain texture to the background.

CSS
:root {
  /* Premium Color Palette */
  --color-bg-base: #f4f2ee; /* Warm, off-white sand */
  --color-text-main: #1a1a1a;
  --color-text-muted: #5c5c5c;
  --color-accent-gold: #b7955b; /* The authentic architectural gold */
  
  /* Typography System */
  --font-serif: 'Playfair Display', serif;
  --font-sans: 'Manrope', sans-serif;
}

body {
  font-family: var(--font-sans);
  color: var(--color-text-main);
  background-color: var(--color-bg-base);
  
  /* The "Grainy Golden Texture" */
  /* This uses a data URI to generate an instant, lightweight SVG noise texture over the background color */
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='[http://www.w3.org/2000/svg'%3E%3Cfilter](http://www.w3.org/2000/svg'%3E%3Cfilter) id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E");
  background-attachment: fixed;
}

---

### File 2: True Glassmorphism & Layout Polish

Give this to the agent second. This specifically targets the "About Us" section to fix the opaque panels and flat typography you saw in the video.

```markdown
# Refinement Part 2: True Glassmorphism & Typography Polish (`7_premium_about_us_css.md`)

**AGENT INSTRUCTION:** Overwrite the existing CSS for the `.about-section`, `.glass-panel`, and internal text elements with these refined styles. This transforms the flat layout into a high-end, editorial glassmorphic experience. 

## 1. Section & Header Enhancements
```css
.about-section {
  width: 100%;
  max-width: 1600px; /* Widen the layout slightly for a more cinematic feel */
  margin: 0 auto;
  padding: 120px 4vw; /* More breathing room */
}

.about-main-title {
  font-family: var(--font-serif); /* Apply luxury serif */
  font-size: clamp(3rem, 6vw, 5.5rem);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--color-text-main);
  margin-bottom: 80px;
}
2. True Glassmorphism Panels
The current implementation in the video is a solid white box. Replace it with this to achieve a deep, frosted aesthetic that lets the background grain and shadows bleed through.

CSS
.glass-panel {
  /* True Frosted Glass Effect */
  background: rgba(255, 255, 255, 0.25); /* Much more transparent */
  backdrop-filter: blur(24px) saturate(120%);
  -webkit-backdrop-filter: blur(24px) saturate(120%);
  
  /* Subtle light reflection edges */
  border-top: 1px solid rgba(255, 255, 255, 0.7);
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  
  border-radius: 2px; /* Sharper edges fit architecture better than rounded ones */
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.08); /* Deeper, softer shadow */
  padding: 60px 50px;
}
3. High-End Editorial Typography
Fixing the font weights, line heights, and introducing the golden accent color.

CSS
.phase-number {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-accent-gold); /* Inject the premium golden tone */
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Add a delicate horizontal line next to the phase number */
.phase-number::after {
  content: '';
  display: block;
  width: 40px;
  height: 1px;
  background-color: var(--color-accent-gold);
}

.panel-title {
  font-family: var(--font-serif);
  font-size: 2.5rem;
  font-weight: 400;
  margin: 0 0 24px 0;
  color: var(--color-text-main);
  letter-spacing: -0.01em;
}

.panel-body {
  font-family: var(--font-sans);
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--color-text-muted);
  font-weight: 300;
}