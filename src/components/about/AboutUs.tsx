'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import CinematicShowreel from '@/components/CinematicShowreel';
import {
  ABOUT_PHILOSOPHY_FALLBACK,
  mapAboutPhilosophyData,
  type AboutPhilosophyData,
  type SanityAboutPhilosophyDocument,
} from '@/sanity/lib/aboutPhilosophyMapper';
import { client } from '@/sanity/lib/client';
import { aboutPhilosophyQuery } from '@/sanity/lib/queries';

export default function AboutUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [aboutContent, setAboutContent] = useState<AboutPhilosophyData>(ABOUT_PHILOSOPHY_FALLBACK);

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
  }, [aboutContent.panels]);

  useEffect(() => {
    let isMounted = true;

    client
      .fetch<SanityAboutPhilosophyDocument | null>(aboutPhilosophyQuery)
      .then((document) => {
        if (isMounted) {
          setAboutContent(mapAboutPhilosophyData(document));
        }
      })
      .catch((error) => {
        console.warn('Sanity about/philosophy fetch failed. Using hardcoded fallback.', error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="about-us" className="about-section" ref={containerRef}>
      <div className="about-header-container flex flex-col items-center">
        <h2 className="about-main-title text-[#111111] text-center">
          {aboutContent.headingLines.map((line, index) => (
            <Fragment key={`${line.prefix}-${line.accent}-${index}`}>
              {line.prefix && `${line.prefix} `}
              <span className="gold-text-premium">{line.accent}</span>
              {index < aboutContent.headingLines.length - 1 && <br />}
            </Fragment>
          ))}
        </h2>
        <p className="about-subtitle text-center max-w-[800px] mt-2 mb-8 text-[16px] md:text-[20px] leading-[1.8] text-[#5c5c5c] font-light font-lato">
          {aboutContent.subtitle}
        </p>
        <CinematicShowreel content={aboutContent.showreel} />
      </div>

      <div className="about-grid-container">
        
        {/* Left Column: Sticky Image Wrapper */}
        <div className="sticky-visual-column">
          <div className="sticky-image-wrapper">
            {aboutContent.panels.map((panel) => (
              <img key={panel.key} src={panel.image} alt={panel.alt} className="sticky-img" id={`img-${panel.key}`} />
            ))}
          </div>
        </div>

        {/* Right Column: Scrolling Narrative */}
        <div className="scrolling-text-column">
          {aboutContent.panels.map((panel) => (
            <article key={panel.key} className="glass-panel content-block" id={`content-${panel.key}`}>
              <div className="panel-header">
                <span className="phase-number">{panel.number}</span>
                <h3 className="panel-title">{panel.title}</h3>
              </div>
              <p className="panel-body">
                {panel.description}
              </p>
            </article>
          ))}

        </div>
      </div>
    </section>
  );
}
