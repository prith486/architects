# Process Section Part 2: Premium CSS Architecture (`9_process_css.md`)

**AGENT INSTRUCTION:** Add these styles to the main stylesheet. This code styles the `#process-timeline` section introduced in the previous step. It utilizes the premium CSS variables (`--color-accent-gold`, `--font-serif`, etc.) established earlier and sets up the initial hidden states for the scroll animation.

## 1. Section Header & Spacing
```css
/* =========================================
   PROCESS & APPROACH SECTION STYLES
========================================= */

.process-section {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 120px 4vw 160px;
  position: relative;
}

.process-header-container {
  text-align: center;
  margin-bottom: 100px;
}

.process-main-title {
  font-family: var(--font-serif);
  font-size: clamp(3rem, 6vw, 5rem);
  color: var(--color-text-main);
  margin-bottom: 24px;
}

.process-subtitle {
  font-family: var(--font-sans);
  font-size: 1.2rem;
  color: var(--color-text-muted);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
2. The Timeline Core (The Track & Alternating Grid)
This sets up the invisible central track and ensures the left/right cards take up exactly half the screen width without overlapping the center line.

CSS
.timeline-container {
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
}

/* The central invisible track that the gold line will draw down */
.timeline-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1); /* Faint guide line */
}

/* The actual Gold Line (Starts at height 0, JS will animate it) */
.timeline-progress-line {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 0%; /* JS will change this based on scroll */
  background-color: var(--color-accent-gold);
  z-index: 5;
  box-shadow: 0 0 10px rgba(183, 149, 91, 0.5); /* Glowing effect */
}
3. The Alternating Cards & Animation Start States
CSS
.timeline-item {
  position: relative;
  width: 100%;
  display: flex;
  margin-bottom: 80px;
  opacity: 0; /* Hidden initially for scroll reveal */
}

/* Left side elements */
.timeline-item.left {
  justify-content: flex-start;
  transform: translateX(-40px); /* Pushed left initially */
  transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Right side elements */
.timeline-item.right {
  justify-content: flex-end;
  transform: translateX(40px); /* Pushed right initially */
  transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

/* When JS adds the .visible class, they slide into place */
.timeline-item.visible {
  opacity: 1;
  transform: translateX(0);
}

.timeline-content {
  width: 45%; /* Leaves 10% gap in the middle for the line */
  position: relative;
  z-index: 10;
}
4. The Glowing Nodes & Content Styling
CSS
/* The golden dots on the central line */
.timeline-node {
  position: absolute;
  top: 40px; /* Aligns with the top of the card */
  left: 50%;
  transform: translateX(-50%) scale(0); /* Starts scaled down to 0 */
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--color-bg-base);
  border: 2px solid var(--color-accent-gold);
  z-index: 10;
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s;
}

/* Node pops in when card becomes visible */
.timeline-item.visible .timeline-node {
  transform: translateX(-50%) scale(1);
}

/* Glassmorphism Alt Panel */
.glass-panel-alt {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  padding: 40px;
  border-radius: 2px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.05);
}

.timeline-phase {
  font-family: var(--font-sans);
  color: var(--color-accent-gold);
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  display: block;
  margin-bottom: 12px;
}

.timeline-title {
  font-family: var(--font-serif);
  font-size: 2rem;
  color: var(--color-text-main);
  margin-bottom: 16px;
}

.timeline-body {
  font-family: var(--font-sans);
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--color-text-muted);
}
5. Mobile Responsiveness (Line moves to the left)
CSS
@media (max-width: 768px) {
  /* Move line to the far left edge */
  .timeline-container::before,
  .timeline-progress-line {
    left: 0;
    transform: none;
  }
  
  .timeline-item.left,
  .timeline-item.right {
    justify-content: flex-end; /* All content pushes right */
    transform: translateY(30px); /* Both slide up instead of sideways */
  }

  .timeline-item.visible {
    transform: translateY(0);
  }

  .timeline-content {
    width: 90%; /* Take up most of the screen */
  }

  /* Move nodes to the left line */
  .timeline-node {
    left: -6px; /* Half of the 12px width */
    transform: scale(0);
  }

  .timeline-item.visible .timeline-node {
    transform: scale(1);
  }
}