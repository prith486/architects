'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HOMEPAGE_FALLBACK, type HomepageData } from '@/sanity/lib/homepageMapper';
import {
  PORTFOLIO_PROJECT_CARD_FALLBACK,
  type PortfolioProjectCardData,
} from '@/sanity/lib/portfolioShowcaseMapper';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface PortfolioShowcaseProps {
  introContent?: Pick<HomepageData, 'portfolioIntroTitle' | 'portfolioHelperText'>
  projects?: PortfolioProjectCardData[]
}

export default function PortfolioShowcase({
  introContent = HOMEPAGE_FALLBACK,
  projects = PORTFOLIO_PROJECT_CARD_FALLBACK,
}: PortfolioShowcaseProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const gridShellRef = useRef<HTMLDivElement>(null);
  
  // Refs to measure placeholders and cards
  const placeholderRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Split projects into 3 columns for a true interlocking masonry layout
  const col1 = projects.filter((_, i) => i % 3 === 0);
  const col2 = projects.filter((_, i) => i % 3 === 1);
  const col3 = projects.filter((_, i) => i % 3 === 2);

  const handleProjectClick = (slug: string) => {
    router.push(`/projects/${slug}`);
  };

  const renderProjectCard = (project: PortfolioProjectCardData, index: number) => {
    return (
      <div 
        key={project.id}
        ref={(el) => { placeholderRefs.current[index] = el; }}
        className={`relative w-full ${project.aspect} bg-transparent rounded-lg pointer-events-none`}
      >
        {/* The actual morphing card */}
        <div
          ref={(el) => { cardRefs.current[index] = el; }}
          className="group absolute inset-0 w-full h-full overflow-hidden pointer-events-auto cursor-pointer"
          style={{
            transformOrigin: 'center center',
          }}
          onClick={() => handleProjectClick(project.slug)}
        >
          {/* Background Project Image */}
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Subtle Overlay Shadow */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-85 pointer-events-none" />

          {/* 
            The Slide-Up Lower-Third Banner
            Fills bottom 25%-30% of the image on hover.
          */}
          <div 
            className="absolute bottom-0 left-0 w-full h-[30%] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between px-6 py-4 pointer-events-none overflow-hidden"
            style={{ 
              backgroundColor: project.color,
            }}
          >
            {/* Project details inside */}
            <div className="flex flex-col justify-between h-full z-10 text-white select-none">
              <div>
                <h4 className="font-playfair text-lg md:text-xl font-light tracking-wide leading-tight text-white/95">
                  {project.title}
                </h4>
              </div>
              <div>
                <p className="font-lato text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-white/70">
                  {project.category}
                </p>
              </div>
            </div>

            {/* 
              Embossed Stylized Logo (VAÎ›STU)
              3D textural background stamped into the colored block.
            */}
            <div 
              className="absolute right-[-10px] bottom-[-15px] font-cormorant text-[48px] md:text-[68px] text-white/5 select-none pointer-events-none leading-none tracking-widest font-extrabold uppercase"
              style={{
                fontFamily: 'var(--font-cormorant), serif',
                textShadow: '1px 1px 1px rgba(255, 255, 255, 0.08), -1px -1px 2px rgba(0, 0, 0, 0.45)',
                mixBlendMode: 'overlay',
              }}
            >
              {project.logoText}
            </div>
          </div>
        </div>
      </div>
    );
  };

  useGSAP(() => {
    if (!containerRef.current || !triggerRef.current) return;

    let tl: gsap.core.Timeline | null = null;
    let refreshTimer: NodeJS.Timeout | null = null;

    const reserveFinalGridHeight = () => {
      const trigger = triggerRef.current;
      const gridShell = gridShellRef.current;
      if (!trigger || !gridShell) return;

      const finalCardBottom = placeholderRefs.current.reduce((maxBottom, placeholder) => {
        if (!placeholder) return maxBottom;
        return Math.max(maxBottom, placeholder.offsetTop + placeholder.offsetHeight);
      }, 0);

      const bottomPadding = window.innerWidth < 768 ? 72 : 96;
      const reservedHeight = Math.max(
        window.innerHeight,
        Math.ceil(gridShell.offsetTop + finalCardBottom + bottomPadding)
      );

      trigger.style.minHeight = `${reservedHeight}px`;
    };

    const scheduleRefresh = () => {
      if (refreshTimer) clearTimeout(refreshTimer);
      refreshTimer = setTimeout(() => {
        reserveFinalGridHeight();
        ScrollTrigger.refresh();
      }, 80);
    };

    // We need to wait for layout and measurements
    const runMorphAnimation = () => {
      if (tl) {
        tl.kill();
        tl = null;
      }
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === triggerRef.current) {
          t.kill();
        }
      });
      reserveFinalGridHeight();

      const viewportW = window.innerWidth;
      const viewportH = window.innerHeight;

      // Determine carousel card dimensions based on screen size
      const isMobile = viewportW < 768;
      const carouselCardW = isMobile ? 180 : 300;
      const carouselCardH = isMobile ? 260 : 420;
      const gap = isMobile ? 12 : 24;

      const totalCards = projects.length;
      const trackWidth = (totalCards * carouselCardW) + ((totalCards - 1) * gap);
      const trackStart = (viewportW / 2) - (trackWidth / 2);
      const trackY = (viewportH / 2) - (carouselCardH / 2);

      // We set up the GSAP timeline linked to ScrollTrigger
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      // Animate the main introduction text
      tl.fromTo('.portfolio-intro-text', 
        { opacity: 1, y: 0, scale: 1 }, 
        { opacity: 0, y: -50, scale: 0.95, duration: 0.3 }
      );

      // Animate each card from the horizontal carousel row layout to the 3-column grid layout
      projects.forEach((project, index) => {
        const placeholder = placeholderRefs.current[index];
        const card = cardRefs.current[index];
        if (!placeholder || !card) return;

        // Reset any inline styles first to measure correctly
        gsap.set(card, { clearProps: 'all' });

        // Calculate card's grid position relative to the grid container using getBoundingClientRect
        const placeholderRect = placeholder.getBoundingClientRect();
        const containerRect = containerRef.current!.getBoundingClientRect();

        const gridX = placeholderRect.left - containerRect.left;
        const gridY = placeholderRect.top - containerRect.top;

        // Calculate card's starting carousel track position relative to the grid container
        const carouselX = trackStart + index * (carouselCardW + gap);
        const carouselY = trackY;

        // Calculate the initial offsets to simulate the carousel layout
        const startX = carouselX - gridX;
        const startY = carouselY - gridY;

        // Configure the initial absolute sizing & positioning of the card
        gsap.set(card, {
          position: 'absolute',
          left: 0,
          top: 0,
          width: carouselCardW,
          height: carouselCardH,
          x: startX,
          y: startY,
          zIndex: 20,
          borderRadius: '12px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
        });

        // Animate from carousel layout to grid layout
        tl!.to(card, {
          x: 0,
          y: 0,
          width: '100%',
          height: '100%',
          borderRadius: '4px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          ease: 'power2.inOut',
          duration: 1
        }, 0.1);
      });

      scheduleRefresh();
    };

    // Run after a short delay to ensure browser layout is ready
    const timers: NodeJS.Timeout[] = [];
    
    timers.push(setTimeout(() => {
      runMorphAnimation();
    }, 100));

    // Failsafe for slower image loads shifting the layout above this section
    timers.push(setTimeout(() => {
      runMorphAnimation();
      ScrollTrigger.refresh();
    }, 1000));
    
    timers.push(setTimeout(() => {
      runMorphAnimation();
      ScrollTrigger.refresh();
    }, 2500));

    // Handle resize and layout shifts
    const handleResizeOrLoad = () => {
      runMorphAnimation();
      scheduleRefresh();
    };

    window.addEventListener('resize', handleResizeOrLoad);
    window.addEventListener('load', handleResizeOrLoad);

    const watchedImages = Array.from(containerRef.current.querySelectorAll('img'));
    watchedImages.forEach((img) => {
      if (!img.complete) {
        img.addEventListener('load', scheduleRefresh, { once: true });
        img.addEventListener('error', scheduleRefresh, { once: true });
      }
    });

    // Optional: Setup a ResizeObserver on the document body to catch image load layout shifts
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        // Debounce the observer slightly to avoid thrashing
        clearTimeout(timers[timers.length - 1]);
        const debounced = setTimeout(() => {
          runMorphAnimation();
          scheduleRefresh();
        }, 150);
        timers.push(debounced);
      });
      resizeObserver.observe(document.body);
    }

    return () => {
      timers.forEach(clearTimeout);
      if (refreshTimer) clearTimeout(refreshTimer);
      window.removeEventListener('resize', handleResizeOrLoad);
      window.removeEventListener('load', handleResizeOrLoad);
      watchedImages.forEach((img) => {
        img.removeEventListener('load', scheduleRefresh);
        img.removeEventListener('error', scheduleRefresh);
      });
      if (resizeObserver) resizeObserver.disconnect();
      
      if (tl) {
        tl.kill();
        tl = null;
      }
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === triggerRef.current) {
          t.kill();
        }
      });
    };
  }, { dependencies: [projects], scope: containerRef, revertOnUpdate: true });

  return (
    <div ref={triggerRef} className="relative w-full min-h-screen bg-[#111111] overflow-x-clip overflow-y-visible">
      {/* 
        SMUDGE TRANSITION LAYER AT THE TOP 
        Blends the cream background of the HeroScroll panel smoothly into this section's dark background.
      */}
      <div 
        className="absolute top-0 left-0 w-full h-[350px] bg-gradient-to-b from-[#F1EBE0] to-[#111111] pointer-events-none z-10 opacity-100"
      />

      <div 
        ref={containerRef} 
        className="relative w-full h-full min-h-screen pt-20 pb-20 px-6 md:px-16"
      >
        {/* Intro text visible during the horizontal state */}
        <div className="portfolio-intro-text absolute top-[10%] left-1/2 -translate-x-1/2 text-center z-30 pointer-events-none flex flex-col items-center justify-center w-[90%] md:w-auto">
          <div className="relative inline-flex flex-col items-center justify-center px-12 py-8 overflow-hidden rounded-2xl">
            {/* Elegant glassmorphism backdrop */}
            <div className="absolute inset-0 bg-[#111111]/40 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"></div>
            
            {/* Glow effect behind text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-1/2 bg-[#C4A47C]/20 blur-[50px] rounded-full"></div>

            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-[#C4A47C] font-lato text-xs md:text-sm tracking-[0.5em] uppercase mb-3 font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Portfolio
              </h2>
              <h3 className="text-white text-4xl md:text-6xl font-playfair font-light tracking-wide leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                {introContent.portfolioIntroTitle}
              </h3>
              
              <div className="flex items-center gap-4 mt-6">
                <div className="h-[1px] w-8 md:w-12 bg-gradient-to-r from-transparent to-[#C4A47C]/50"></div>
                <p className="text-white/90 font-lato text-[9px] md:text-[11px] tracking-[0.3em] uppercase drop-shadow-md">
                  {introContent.portfolioHelperText}
                </p>
                <div className="h-[1px] w-8 md:w-12 bg-gradient-to-l from-transparent to-[#C4A47C]/50"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation filter menu removed */}

        {/* 
          Masonry Grid Container
          This is the destination layout. The placeholders define the grid, 
          while the actual cards animate on top of them.
        */}
        <div ref={gridShellRef} className="w-full max-w-[1280px] mx-auto mt-12 md:mt-16 z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
            {/* Column 1 */}
            <div className="flex flex-col gap-6 md:gap-8">
              {col1.map((project) => {
                const originalIndex = projects.findIndex(p => p.id === project.id);
                return renderProjectCard(project, originalIndex);
              })}
            </div>
            {/* Column 2 */}
            <div className="flex flex-col gap-6 md:gap-8">
              {col2.map((project) => {
                const originalIndex = projects.findIndex(p => p.id === project.id);
                return renderProjectCard(project, originalIndex);
              })}
            </div>
            {/* Column 3 */}
            <div className="flex flex-col gap-6 md:gap-8">
              {col3.map((project) => {
                const originalIndex = projects.findIndex(p => p.id === project.id);
                return renderProjectCard(project, originalIndex);
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
