'use client';

import React, { useEffect, useRef } from 'react';

export default function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const processSection = sectionRef.current;
    const progressLine = lineRef.current;
    
    if (!processSection || !progressLine) return;
    
    const timelineItems = processSection.querySelectorAll('.timeline-item');

    // --- 1. The Golden Line Drawing Animation ---
    const drawLineOnScroll = () => {
      const sectionRect = processSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      const triggerPoint = viewportHeight / 2;
      let scrollPercentage = 0;

      if (sectionRect.top < triggerPoint) {
        const distanceScrolled = triggerPoint - sectionRect.top;
        const totalDistance = sectionRect.height;
        scrollPercentage = (distanceScrolled / totalDistance) * 100;
      }

      scrollPercentage = Math.max(0, Math.min(100, scrollPercentage));
      progressLine.style.height = `${scrollPercentage}%`;
    };

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          drawLineOnScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    drawLineOnScroll(); // Trigger initially in case it's already in view

    // --- 2. The Glassmorphic Card Reveal ---
    const cardObserverOptions = {
      root: null,
      rootMargin: '0px 0px -25% 0px', 
      threshold: 0
    };

    const cardObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, cardObserverOptions);

    timelineItems.forEach(item => {
      cardObserver.observe(item);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cardObserver.disconnect();
    };
  }, []);

  return (
    <section id="process" ref={sectionRef} className="process-section relative z-10 w-full">
      <div className="process-header-container">
        <h2 className="process-main-title">The Blueprint.</h2>
        <p className="process-subtitle">A rigorous approach from conceptual sketch to built reality.</p>
      </div>

      <div className="timeline-container">
        
        <div className="timeline-progress-line" ref={lineRef} id="timeline-line"></div>

        <article className="timeline-item left timeline-has-image">
          <div className="timeline-node"></div>
          <div className="timeline-content glass-panel-alt">
            <span className="timeline-phase">01. Discovery</span>
            <h3 className="timeline-title">Site & Feasibility</h3>
            <p className="timeline-body">
              Before a single line is drawn, we analyze the topography, climate, and zoning. We listen to your vision to establish a robust architectural brief that harmonizes with the environment.
            </p>
          </div>
          <div className="timeline-image">
            <img src="https://res.cloudinary.com/dcryxjtb3/image/upload/q_auto/f_auto/v1780250744/1_uksekv.png" alt="Site & Feasibility Image" />
          </div>
        </article>

        <article className="timeline-item right timeline-has-image">
          <div className="timeline-node"></div>
          <div className="timeline-image">
            <img src="https://res.cloudinary.com/dcryxjtb3/image/upload/q_auto/f_auto/v1780250742/2_ad2lxb.png" alt="Architectural Drafting Image" />
          </div>
          <div className="timeline-content glass-panel-alt">
            <span className="timeline-phase">02. Conception</span>
            <h3 className="timeline-title">Architectural Drafting</h3>
            <p className="timeline-body">
              Translating vision into geometry. We develop initial sketches, massing studies, and spatial flows, ensuring every square meter is optimized for light, movement, and purpose.
            </p>
          </div>
        </article>

        <article className="timeline-item left timeline-has-image">
          <div className="timeline-node"></div>
          <div className="timeline-content glass-panel-alt">
            <span className="timeline-phase">03. Engineering</span>
            <h3 className="timeline-title">Precision Rendering</h3>
            <p className="timeline-body">
              The concept becomes tangible. Through hyper-realistic 3D rendering and rigorous structural engineering, we bridge the gap between imagination and physical reality.
            </p>
          </div>
          <div className="timeline-image">
            <img src="https://res.cloudinary.com/dcryxjtb3/image/upload/q_auto/f_auto/v1780250743/4_wejqgt.png" alt="Precision Rendering Image" />
          </div>
        </article>

        <article className="timeline-item right timeline-has-image">
          <div className="timeline-node"></div>
          <div className="timeline-image">
            <img src="https://res.cloudinary.com/dcryxjtb3/image/upload/q_auto/f_auto/v1780250743/3_c4nihg.png" alt="Construction & Handover Image" />
          </div>
          <div className="timeline-content glass-panel-alt">
            <span className="timeline-phase">04. Execution</span>
            <h3 className="timeline-title">Construction & Handover</h3>
            <p className="timeline-body">
              Absolute control over the build. We act as the guardian of the design during construction, ensuring the final structure is a flawless execution of the initial intent.
            </p>
          </div>
        </article>

      </div>
    </section>
  );
}
