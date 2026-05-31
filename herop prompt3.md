# Hero Section Part 3: The Premium Reveal Preloader (`14_premium_preloader.md`)

**AGENT INSTRUCTION:** Inject this HTML at the absolute top of the `<body>`, before the `#hero-landing`. Add the CSS to the main stylesheet and the JavaScript to the main script. This creates a high-end, percentage-based loading screen that ensures assets are ready before revealing the hero section.

## 1. HTML Structure

```html
<div id="site-preloader" class="preloader-container">
  <div class="preloader-content">
    <div class="preloader-brand">VASTU.</div>
    <div class="preloader-counter">
      <span id="load-percentage">0</span>%
    </div>
  </div>
  <div class="preloader-progress-bar">
    <div id="load-progress-line" class="progress-line"></div>
  </div>
</div>
2. CSS Styling
CSS
/* =========================================
   PRELOADER STYLES
========================================= */

.preloader-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--color-bg-base); /* Uses the warm sand color */
  z-index: 9999; /* Stays above absolutely everything */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: opacity 1s cubic-bezier(0.77, 0, 0.175, 1), transform 1s cubic-bezier(0.77, 0, 0.175, 1);
}

.preloader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 40px;
}

.preloader-brand {
  font-family: var(--font-serif);
  font-size: 2rem;
  letter-spacing: 0.15em;
  color: var(--color-text-main);
}

.preloader-counter {
  font-family: var(--font-sans);
  font-size: 1rem;
  letter-spacing: 0.1em;
  color: var(--color-accent-gold);
}

.preloader-progress-bar {
  width: 200px;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.progress-line {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0%; /* JS will animate this */
  background-color: var(--color-accent-gold);
  transition: width 0.1s ease;
}

/* Class added by JS to hide the loader */
.preloader-container.loaded {
  opacity: 0;
  pointer-events: none;
  transform: translateY(-5%); /* Slight upward drift as it fades */
}
3. JavaScript Logic
JavaScript
/* =========================================
   PRELOADER & REVEAL JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById('site-preloader');
  const percentageText = document.getElementById('load-percentage');
  const progressLine = document.getElementById('load-progress-line');
  
  if (!preloader || !percentageText || !progressLine) return;

  // Prevent scrolling while loading
  document.body.style.overflow = 'hidden';

  let loadProgress = 0;
  
  // Fake loading sequence for that cinematic wait time
  // In a real production app, you'd tie this to actual image load events
  const loadInterval = setInterval(() => {
    // Increment randomly to feel like a real network load
    loadProgress += Math.floor(Math.random() * 10) + 1;
    
    if (loadProgress >= 100) {
      loadProgress = 100;
      clearInterval(loadInterval);
      
      // Update final DOM states
      percentageText.textContent = loadProgress;
      progressLine.style.width = `${loadProgress}%`;
      
      // Add a slight delay at 100% before dissolving
      setTimeout(() => {
        preloader.classList.add('loaded');
        // Restore scrolling
        document.body.style.overflow = 'auto';
        
        // Remove from DOM after fade out completes
        setTimeout(() => {
          preloader.remove();
        }, 1000);
      }, 500);
      
    } else {
      percentageText.textContent = loadProgress;
      progressLine.style.width = `${loadProgress}%`;
    }
  }, 150); // Speed of the fake load (adjust as needed)
});