# Process Section Part 3: Interactive Scroll JavaScript (`10_process_js.md`)

**AGENT INSTRUCTION:** Add this logic to the main JavaScript file. This code brings the `#process-timeline` to life. It handles the dynamic height calculation of the central golden line based on scroll depth, and triggers the staggered CSS animations for the glassmorphic cards.

```javascript
/* =========================================
   PROCESS & APPROACH SECTION JS
   Handles the drawing line and staggered card reveals
========================================= */

document.addEventListener('DOMContentLoaded', () => {
  const processSection = document.getElementById('process-timeline');
  const progressLine = document.getElementById('timeline-line');
  const timelineItems = document.querySelectorAll('.timeline-item');

  if (!processSection || !progressLine || timelineItems.length === 0) return;

  // --- 1. The Golden Line Drawing Animation ---
  const drawLineOnScroll = () => {
    // Get the section's position relative to the viewport
    const sectionRect = processSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // We want the line to start drawing when the top of the section hits the middle of the screen
    const triggerPoint = viewportHeight / 2;
    
    let scrollPercentage = 0;

    // If the top of the section has reached the trigger point
    if (sectionRect.top < triggerPoint) {
      // Calculate how far past the trigger point we have scrolled
      const distanceScrolled = triggerPoint - sectionRect.top;
      // Calculate the total distance the line needs to travel
      const totalDistance = sectionRect.height;
      
      scrollPercentage = (distanceScrolled / totalDistance) * 100;
    }

    // Clamp the percentage strictly between 0 and 100
    scrollPercentage = Math.max(0, Math.min(100, scrollPercentage));
    
    // Apply the height to the line element
    progressLine.style.height = `${scrollPercentage}%`;
  };

  // Attach the scroll listener (using requestAnimationFrame for smooth 60fps performance)
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        drawLineOnScroll();
        ticking = false;
      });
      ticking = true;
    }
  });


  // --- 2. The Glassmorphic Card Reveal ---
  // Setup the Intersection Observer for the timeline items
  const cardObserverOptions = {
    root: null,
    // Trigger the animation when the element is 25% from the bottom of the viewport
    rootMargin: '0px 0px -25% 0px', 
    threshold: 0
  };

  const cardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add the visible class to trigger the CSS transforms and opacity fade
        entry.target.classList.add('visible');
        
        // Optional: Stop observing once revealed so it doesn't animate out when scrolling back up
        // (Removing the line below makes it re-animate every time you scroll past)
        observer.unobserve(entry.target);
      }
    });
  }, cardObserverOptions);

  // Attach the observer to each timeline card
  timelineItems.forEach(item => {
    cardObserver.observe(item);
  });
});