'use client';

import { useEffect, useRef } from 'react';

export default function AboutUs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const contentPanels = containerRef.current.querySelectorAll('.content-block');
    const stickyImages = containerRef.current.querySelectorAll('.sticky-img');

    if (contentPanels.length === 0 || stickyImages.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activePanelId = entry.target.id;
          const targetImageId = activePanelId.replace('content-', 'img-');
          
          stickyImages.forEach(img => {
            img.classList.remove('active');
          });

          const activeImage = document.getElementById(targetImageId);
          if (activeImage) {
            activeImage.classList.add('active');
          }
        }
      });
    };

    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

    contentPanels.forEach(panel => {
      scrollObserver.observe(panel);
    });

    if (stickyImages.length > 0) {
      stickyImages[0].classList.add('active');
    }

    return () => scrollObserver.disconnect();
  }, []);

  return (
    <section id="about-us" className="about-section" ref={containerRef}>
      <div className="about-header-container">
        <h2 className="about-main-title text-[#111111]">Spaces that elevate. <br />Experiences that endure.</h2>
      </div>

      <div className="about-grid-container">
        
        {/* Left Column: Sticky Image Wrapper */}
        <div className="sticky-visual-column">
          <div className="sticky-image-wrapper">
            <img src="/assets/about-vision.webp" alt="Architectural Drafting Process" className="sticky-img" id="img-vision" />
            <img src="/assets/about-precision.webp" alt="Structural Precision in Architecture" className="sticky-img" id="img-precision" />
            <img src="/assets/about-reality.webp" alt="Modern Living Space Harmony" className="sticky-img" id="img-reality" />
          </div>
        </div>

        {/* Right Column: Scrolling Narrative */}
        <div className="scrolling-text-column">
          
          <article className="glass-panel content-block" id="content-vision">
            <div className="panel-header">
              <span className="phase-number">01</span>
              <h3 className="panel-title">Cadrage & Intention</h3>
            </div>
            <p className="panel-body">
              Every millimeter is calculated. Every angle is deliberate. Our philosophy begins with deep listening and conceptual drafting. We believe that true harmony in design starts at the intersection of raw imagination and meticulous planning on the drafting table.
            </p>
          </article>

          <article className="glass-panel content-block" id="content-precision">
            <div className="panel-header">
              <span className="phase-number">02</span>
              <h3 className="panel-title">Absolute Precision</h3>
            </div>
            <p className="panel-body">
              We bridge the gap between the drafted line and the built environment. Through advanced 3D rendering and rigorous engineering, we ensure that the structural integrity of our spaces matches their aesthetic ambition. Precision is not an option; it is our foundation.
            </p>
          </article>

          <article className="glass-panel content-block" id="content-reality">
            <div className="panel-header">
              <span className="phase-number">03</span>
              <h3 className="panel-title">Living Reality</h3>
            </div>
            <p className="panel-body">
              We do not just build structures; we curate spaces designed for the human experience. By blending sustainable materials with intuitive layouts, we craft enduring environments that inspire for generations. This is architecture shaped by true stories.
            </p>
          </article>

        </div>
      </div>
    </section>
  );
}
