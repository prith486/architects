# Final Polish: Custom Cursor & Scrollbar (`15_premium_cursor_scroll.md`)

**AGENT INSTRUCTION:** This is the ultimate UI/UX polish layer. Inject the HTML at the very top of the `<body>`, add the CSS to the global stylesheet, and append the JavaScript. This replaces the standard system cursor with a custom, physics-based glassmorphic cursor and themes the browser scrollbar to match the golden architectural aesthetic.

## 1. HTML Structure

```html
<!-- =========================================
     CUSTOM PREMIUM CURSOR
     CRITICAL PLACEMENT: Just inside <body>
========================================= -->
<div class="cursor-dot" id="cursor-dot"></div>
<div class="cursor-outline" id="cursor-outline"></div>
2. CSS Styling
CSS
/* =========================================
   GLOBAL SCROLLBAR & CURSOR STYLES
========================================= */

/* --- Custom Scrollbar --- */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-bg-base); 
}

::-webkit-scrollbar-thumb {
  background: rgba(183, 149, 91, 0.5); /* Muted version of the accent gold */
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-accent-gold); 
}

/* --- Hide Default Cursor (Desktop Only) --- */
@media (hover: hover) and (pointer: fine) {
  body {
    cursor: none;
  }
  
  a, button, input, .project-card, .timeline-item {
    cursor: none;
  }
}

/* --- Custom Cursor Elements --- */
.cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  background-color: var(--color-accent-gold);
  border-radius: 50%;
  pointer-events: none;
  z-index: 10000;
  transform: translate(-50%, -50%);
  transition: width 0.2s ease, height 0.2s ease, background-color 0.2s ease;
}

.cursor-outline {
  position: fixed;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(183, 149, 91, 0.5); /* Gold glassmorphic ring */
  background-color: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: width 0.2s ease, height 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
  will-change: transform;
}

/* --- Cursor Hover States --- */
/* When hovering over clickable elements, the outline expands and the dot disappears */
.cursor-outline.hover-state {
  width: 60px;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.1);
  border-color: var(--color-accent-gold);
}

.cursor-dot.hover-state {
  width: 0;
  height: 0;
  opacity: 0;
}
3. JavaScript Logic
JavaScript
/* =========================================
   CUSTOM CURSOR PHYSICS JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const dot = document.getElementById("cursor-dot");
  const outline = document.getElementById("cursor-outline");
  
  if (!dot || !outline) return;

  // Track mouse coordinates
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  
  // Track outline coordinates for the lagging physics effect
  let outlineX = window.innerWidth / 2;
  let outlineY = window.innerHeight / 2;

  // Update mouse coordinates on move
  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // The dot follows instantly
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  // Animation loop for the outline (creates the smooth trailing physics)
  const animateOutline = () => {
    let distX = mouseX - outlineX;
    let distY = mouseY - outlineY;
    
    // Adjust this decimal to change the "lag" speed (lower = slower)
    outlineX = outlineX + (distX * 0.15); 
    outlineY = outlineY + (distY * 0.15);
    
    outline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
    
    requestAnimationFrame(animateOutline);
  };
  animateOutline();

  // Add hover states to interactive elements
  const interactives = document.querySelectorAll('a, button, input, .project-card');
  
  interactives.forEach(el => {
    el.addEventListener("mouseenter", () => {
      dot.classList.add("hover-state");
      outline.classList.add("hover-state");
    });
    
    el.addEventListener("mouseleave", () => {
      dot.classList.remove("hover-state");
      outline.classList.remove("hover-state");
    });
  });
});