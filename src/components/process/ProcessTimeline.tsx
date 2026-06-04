'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  PROCESS_SECTION_FALLBACK,
  mapProcessSectionData,
  type ProcessSectionData,
  type ProcessStepData,
  type SanityProcessSectionDocument,
} from '@/sanity/lib/processSectionMapper';
import { client } from '@/sanity/lib/client';
import { processSectionQuery } from '@/sanity/lib/queries';

function TimelineStep({ step }: { step: ProcessStepData }) {
  const content = (
    <div className="timeline-content glass-panel-alt">
      <span className="timeline-phase">{step.number}. {step.phaseLabel}</span>
      <h3 className="timeline-title">{step.title}</h3>
      <p className="timeline-body">
        {step.description}
      </p>
    </div>
  );

  const image = (
    <div className="timeline-image">
      <img src={step.image} alt={step.alt} />
    </div>
  );

  return (
    <article className={`timeline-item ${step.side} timeline-has-image`}>
      <div className="timeline-node"></div>
      {step.side === 'left' ? (
        <>
          {content}
          {image}
        </>
      ) : (
        <>
          {image}
          {content}
        </>
      )}
    </article>
  );
}

export default function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [processContent, setProcessContent] = useState<ProcessSectionData>(PROCESS_SECTION_FALLBACK);

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
  }, [processContent.steps]);

  useEffect(() => {
    let isMounted = true;

    client
      .fetch<SanityProcessSectionDocument | null>(processSectionQuery)
      .then((document) => {
        if (isMounted) {
          setProcessContent(mapProcessSectionData(document));
        }
      })
      .catch((error) => {
        console.warn('Sanity process section fetch failed. Using hardcoded fallback.', error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="process" ref={sectionRef} className="process-section relative z-10 w-full">
      <div className="process-header-container">
        <h2 className="process-main-title">{processContent.sectionTitle}</h2>
        <p className="process-subtitle">{processContent.sectionSubtitle}</p>
      </div>

      <div className="timeline-container">
        
        <div className="timeline-progress-line" ref={lineRef} id="timeline-line"></div>

        {processContent.steps.map((step) => (
          <TimelineStep key={step.key} step={step} />
        ))}

      </div>
    </section>
  );
}
