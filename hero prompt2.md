# Hero Section Redesign Part 2: CSS Overwrite (`17_hero_redesign_css.md`)

**AGENT INSTRUCTION:** Overwrite the previous `.hero-section` styles with this updated CSS. This perfectly maps the new HTML structure to the four corners of the screen, utilizing the premium typography system (`var(--font-serif)` and `var(--font-sans)`). 

## CSS Overwrite

```css
/* =========================================
   HERO SECTION (VAASTU PREMIUM LAYOUT)
========================================= */

.hero-section {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 800px;
  overflow: hidden;
  background-color: #000;
  color: #fff;
}

/* --- Layer 1 & 2: Background and Overlay --- */
.hero-background, .hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.02); /* Slight zoom for premium feel */
}

.hero-overlay {
  z-index: 2;
  /* Deepens the shadows at the bottom and top so white text pops */
  background: 
    linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 40%),
    linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 30%);
}

/* --- Layer 3: Top Navigation / Branding (Absolute Top) --- */
.hero-top-bar {
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  padding: 0 4vw;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 10;
}

/* Meta Data (EST 2020 & PUNE INDIA) */
.meta-left, .meta-right {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.meta-right {
  text-align: right;
}

.meta-text {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  letter-spacing: 0.25em;
  color: rgba(255, 255, 255, 0.8);
}

.meta-line {
  width: 1px;
  height: 20px;
  background-color: var(--color-accent-gold);
  margin-top: 8px;
}

/* Central Brand */
.brand-center {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.brand-logo {
  font-family: var(--font-serif);
  font-size: 3rem;
  letter-spacing: 0.1em;
  line-height: 1;
}

.gold-a {
  color: var(--color-accent-gold);
  font-style: italic; /* Mimics the stylized 'A' in the reference */
}

.brand-tagline {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  color: rgba(255, 255, 255, 0.6);
}

/* --- Layer 4: Bottom Left Main Content --- */
.hero-main-content {
  position: absolute;
  bottom: 80px;
  left: 4vw;
  z-index: 10;
  max-width: 800px;
}

.hero-title {
  font-family: var(--font-serif);
  font-size: clamp(3rem, 6vw, 5.5rem);
  line-height: 1.1;
  letter-spacing: -0.01em;
  margin-bottom: 24px;
}

.hero-subtitle {
  font-family: var(--font-sans);
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 60px;
  font-weight: 300;
}

/* Explore Link */
.hero-explore {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
  cursor: pointer;
}

.explore-text {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  color: #fff;
}

.explore-line {
  width: 60px;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.3);
  transition: width 0.3s ease, background-color 0.3s ease;
}

.hero-explore:hover .explore-line {
  width: 100px;
  background-color: var(--color-accent-gold);
}

/* Slider Indicator */
.hero-slider-indicator {
  display: flex;
  align-items: center;
  gap: 16px;
}

.slider-num {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: #fff;
  letter-spacing: 0.1em;
}

.slider-track {
  width: 120px;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.2);
  position: relative;
}

.slider-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 25%; /* Represents 01 out of 04 */
  background-color: var(--color-accent-gold);
}

/* --- Layer 5: Bottom Right Scroll Indicator --- */
.hero-scroll-indicator {
  position: absolute;
  bottom: 80px;
  right: 4vw;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
}

.scroll-text {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  color: #fff;
}

.scroll-arrow-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px; /* Aligns with the center of the text above it */
}

.scroll-line-vertical {
  width: 1px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.4);
  margin-bottom: 8px;
}

.arrow-down {
  color: #fff;
  /* Optional: Gentle bounce animation */
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(6px); }
  60% { transform: translateY(3px); }
}