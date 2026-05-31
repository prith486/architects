# Hero Section Part 2: Styling & Scroll Animation (`13_hero_css_js.md`)

**AGENT INSTRUCTION:** Add this CSS to the main stylesheet and this JavaScript to the main script file. This code styles the `#hero-landing` section to achieve a "crazy premium" editorial look and implements a scroll-based staggered fade out so the hero content disappears as the user begins to scroll.

## 1. CSS Styling

```css
/* =========================================
   HERO SECTION STYLES (PREMIUM EDITORIAL)
========================================= */

.hero-section {
  position: relative;
  width: 100%;
  height: 100vh; /* Takes up exactly the full screen initially */
  min-height: 700px;
  overflow: hidden; /* Prevents scroll overflow from absolute elements */
  background-color: #000;
}

/* --- Layer 1: Background Image --- */
.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Slight scale to allow for a subtle zoom effect if desired later */
  transform: scale(1.02); 
}

/* --- Layer 2: Vignette Overlay --- */
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  /* Creates a dark gradient from the bottom and edges to make text pop against the bright sky */
  background: 
    linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 40%),
    linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 50%);
}

/* --- Layer 3: Content & Typography --- */
.hero-content-wrapper {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 0 6vw; /* Aligns with the wide cinematic margins */
}

/* The structural layers we will animate with JS */
.fade-layer {
  will-change: opacity, transform; /* Hardware acceleration for buttery smooth scrolling */
}

/* 1. The Badge */
.hero-badge {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.badge-line {
  width: 40px;
  height: 1px;
  background-color: var(--color-accent-gold);
}

.badge-text {
  font-family: var(--font-sans);
  font-size: 0.9rem;
  letter-spacing: 0.2em;
  color: #fff;
  text-transform: uppercase;
}

/* 2. Massive Title */
.hero-title {
  font-family: var(--font-serif);
  font-size: clamp(4rem, 9vw, 8rem);
  line-height: 0.95;
  color: #fff;
  margin: 0 0 32px 0;
  letter-spacing: -0.02em;
}

/* 3. Subtitle */
.hero-subtitle {
  font-family: var(--font-sans);
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: rgba(255, 255, 255, 0.75);
  max-width: 500px;
  line-height: 1.6;
  font-weight: 300;
}

/* --- Layer 4: Scroll Indicator --- */
.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 6vw; /* Aligned with the left text */
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 16px;
}

.scroll-text {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.5);
  writing-mode: vertical-rl; /* Turns the text sideways */
  transform: rotate(180deg); /* Flips it to read top-to-bottom */
}

.scroll-line-container {
  width: 1px;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
}

/* CSS Animation for the glowing line dropping down continuously */
.scroll-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background-color: var(--color-accent-gold);
  animation: dropScroll 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
}

@keyframes dropScroll {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(200%); }
}
2. JavaScript: The "15-Frame" Fade Out Animation
This logic calculates how far the user has scrolled. Because we want it to vanish quickly (within the first ~250px of scrolling, essentially the first fraction of a second), it maps the scroll depth to the element's opacity. The data-speed makes the title, subtitle, and badge vanish at slightly different rates, creating a highly premium parallax depth effect.

JavaScript
/* =========================================
   HERO SECTION JS
   Handles the rapid staggered fade-out on scroll
========================================= */

document.addEventListener('DOMContentLoaded', () => {
  const fadeLayers = document.querySelectorAll('.fade-layer');
  
  if (fadeLayers.length === 0) return;

  // The maximum scroll distance (in pixels) before elements are completely invisible.
  // 250px is very quick (roughly your "first 15 frames" of scroll).
  const maxScrollFade = 250; 

  const handleHeroScroll = () => {
    const scrollY = window.scrollY;

    fadeLayers.forEach(layer => {
      // Get the custom speed attribute from the HTML (defaults to 1 if missing)
      const speed = parseFloat(layer.getAttribute('data-speed')) || 1;
      
      // Calculate opacity: starts at 1, goes to 0 as you scroll down
      let opacity = 1 - ((scrollY * speed) / maxScrollFade);
      
      // Clamp opacity between 0 and 1 so it doesn't go negative
      opacity = Math.max(0, Math.min(1, opacity));
      
      // Calculate a slight upward push as it fades (parallax)
      const translateY = scrollY * speed * 0.3;

      // Apply the styles
      layer.style.opacity = opacity;
      layer.style.transform = `translateY(-${translateY}px)`;
      
      // Optimization: If opacity is 0, hide it from screen readers/pointer events
      if (opacity === 0) {
        layer.style.pointerEvents = 'none';
      } else {
        layer.style.pointerEvents = 'auto';
      }
    });
  };

  // Run efficiently on scroll
  let tickingHero = false;
  window.addEventListener('scroll', () => {
    if (!tickingHero) {
      window.requestAnimationFrame(() => {
        handleHeroScroll();
        tickingHero = false;
      });
      tickingHero = true;
    }
  });
});