'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useImagePreloader } from '@/hooks/useImagePreloader';

// Register GSAP Plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function HeroScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameObj = useRef({ index: 0 });
  
  // Load all 252 frames sequentially
  const { images, loaded } = useImagePreloader('/img_new', 252, {
    prefix: 'ezgif-frame-',
    extension: 'jpg',
    padLength: 3,
    offset: 0
  });

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Ensure index is within bounds
    const safeIndex = Math.min(Math.max(Math.round(index), 0), images.length - 1);
    const img = images[safeIndex];
    
    if (img && img.complete) {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      // We scale the context by dpr to ensure crisp rendering on high-DPI screens
      ctx.scale(dpr, dpr);
      
      const hRatio = window.innerWidth / img.width;
      const vRatio = window.innerHeight / img.height;
      const ratio = Math.max(hRatio, vRatio);
      
      const centerShift_x = (window.innerWidth - img.width * ratio) / 2;
      const centerShift_y = (window.innerHeight - img.height * ratio) / 2;  
      
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.drawImage(
        img,
        0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
      );
    }
  };

  useGSAP(() => {
    if (!images || images.length === 0) return;

    // Create the main scrubbing timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=1200%', // Extended Pin for sequential logo -> nav stagger
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
      }
    });

    // Animate the frame index from 0 to 251 (252 total frames)
    // The duration of 252 allows mapping 'time' in the timeline 1:1 with frame numbers
    tl.to(frameObj.current, {
      index: 251,
      snap: 'index',
      ease: 'none',
      duration: 252,
      onUpdate: () => renderFrame(frameObj.current.index),
    }, 0);

    // ==========================================
    // STORYTELLING LAYERS (Phase 1 to Phase 4)
    // ==========================================
    
    // Phase 1 (Frames 1 - 40)
    tl.fromTo('.phase-1', 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 10, ease: 'power2.out' }, 
      5 // Starts at frame 5
    );
    tl.to('.phase-1', 
      { opacity: 0, duration: 5, ease: 'power2.in' }, 
      30 // Fades out by 35 (starts at 30, takes 5 frames)
    );

    // Phase 2 (Frames 45 - 100)
    tl.fromTo('.phase-2', 
      { opacity: 0, x: -50 }, 
      { opacity: 1, x: 0, duration: 15, ease: 'power2.out' }, 
      50 // Starts at frame 50
    );
    tl.to('.phase-2', 
      { opacity: 0, duration: 5, ease: 'power2.in' }, 
      90 // Fades out by 95 (starts at 90, takes 5 frames)
    );

    // Phase 3 (Frames 105 - 160)
    tl.fromTo('.phase-3', 
      { opacity: 0, x: 50 }, 
      { opacity: 1, x: 0, duration: 15, ease: 'power2.out' }, 
      110 // Starts at frame 110
    );
    tl.to('.phase-3', 
      { opacity: 0, duration: 5, ease: 'power2.in' }, 
      150 // Fades out by 155 (starts at 150, takes 5 frames)
    );

    // Phase 4 (Frames 165 - 240)
    tl.fromTo('.phase-4', 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 20, ease: 'power2.out' }, 
      170 // Starts at frame 170
    );
    tl.to('.phase-4', 
      { opacity: 0, duration: 10, ease: 'power2.in' }, 
      225 // Fades out by 235 (starts at 225, takes 10 frames)
    );

    // ==========================================
    // FINAL LOGO REVEAL (Post-Frames)
    // ==========================================
    
    // 1. Slide up the blank white panel
    tl.to('.final-logo-panel',
      { yPercent: -100, duration: 80, ease: 'power2.inOut' },
      252 // Starts precisely when the final frame finishes
    );

    // 2. The Unified Page Reveal (All elements fade and slide up in sync)
    tl.from([
      '.final-logo',
      '.nav-item',
      '.mid-gold-line',
      '.hero-statement',
      '.supporting-copy',
      '.meta-left',
      '.meta-right',
      '.vertical-guide',
      '.bottom-divider',
      '.scroll-indicator'
    ], {
      opacity: 0,
      y: 40,
      duration: 40,
      ease: 'power2.out'
    }, 332);


  }, { dependencies: [images], scope: containerRef });

  // Render the initial frame when the first image loads
  useEffect(() => {
    if (images.length > 0) {
      if (images[0].complete) {
        renderFrame(0);
      } else {
        images[0].addEventListener('load', () => renderFrame(0));
      }
    }
  }, [images]);

  // Recalculate ScrollTrigger positions once all 252 frames are loaded
  useEffect(() => {
    if (loaded) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  // Design Variables
  const headingStyle: React.CSSProperties = {
    fontFamily: 'var(--font-playfair), "Playfair Display", serif',
    fontWeight: 600,
    marginBottom: '0.5rem',
  };
  
  const bodyStyle: React.CSSProperties = {
    fontFamily: '"Lato", sans-serif',
    fontWeight: 400,
    fontSize: '1.125rem',
  };

  return (
    <div ref={containerRef} className="h-screen w-full relative bg-[#111] overflow-hidden">
      {/* Canvas Layer */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full object-cover z-0" 
      />

      {/* 
        Storytelling Overlays
        Opacity is set to 0 by default to prevent layout flashing before GSAP takes over.
      */}
      
      {/* Phase 1: Top-Center (Shifted up to avoid house) */}
      <div 
        className="phase-1 absolute top-[15%] left-0 right-0 flex flex-col items-center text-center z-10 p-6 pointer-events-none"
        style={{ opacity: 0 }}
      >
        {/* Bright glow underlay for absolute contrast against dark fonts */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0)_60%)] -z-10 scale-[1.5]" />

        <h1 className="text-4xl md:text-6xl lg:text-7xl bg-gradient-to-r from-[#7D7F82] via-[#2A2826] to-[#050505] text-transparent bg-clip-text drop-shadow-[0_4px_8px_rgba(255,255,255,0.7)]" style={headingStyle}>
          Raw Vision.
        </h1>
        <p style={bodyStyle} className="max-w-md text-[#2A2826] drop-shadow-[0_2px_5px_rgba(255,255,255,0.9)] mt-2 font-medium">
          Form preceding function in its purest state.
        </p>
      </div>

      {/* Phase 2: Left-aligned (Shifted up) */}
      <div 
        className="phase-2 absolute left-[10%] top-[18%] flex flex-col items-start text-left z-10 p-6 pointer-events-none"
        style={{ opacity: 0 }}
      >
        {/* Bright glow underlay for absolute contrast against dark fonts */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0)_60%)] -z-10 scale-[1.5]" />

        <h1 className="text-4xl md:text-5xl lg:text-6xl max-w-xl bg-gradient-to-r from-[#7D7F82] via-[#2A2826] to-[#050505] text-transparent bg-clip-text drop-shadow-[0_4px_8px_rgba(255,255,255,0.7)]" style={headingStyle}>
          Absolute Precision.
        </h1>
        <p style={bodyStyle} className="max-w-md text-[#2A2826] drop-shadow-[0_2px_5px_rgba(255,255,255,0.9)] mt-2 font-medium">
          Every millimeter calculated. Every angle deliberate.
        </p>
      </div>

      {/* Phase 3: Right-aligned (Shifted up) */}
      <div 
        className="phase-3 absolute right-[10%] top-[18%] flex flex-col items-end text-right z-10 p-6 pointer-events-none"
        style={{ opacity: 0 }}
      >
        {/* Black glow underlay for absolute contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0)_60%)] -z-10 scale-[1.5]" />
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl max-w-xl bg-gradient-to-r from-[#FDE8AE] via-[#C4A47C] to-[#8A6A40] text-transparent bg-clip-text drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]" style={headingStyle}>
          Living Reality.
        </h1>
        <p style={bodyStyle} className="max-w-md text-[#E8D4B4] drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)] mt-2">
          Bridging the gap between the drafted line and the built environment.
        </p>
      </div>

      {/* Phase 4: Bottom-Center (Shifted up slightly or kept with shadow) */}
      <div 
        className="phase-4 absolute bottom-[25%] left-1/2 -translate-x-1/2 flex flex-col items-center text-center z-10 p-6 pointer-events-none"
        style={{ opacity: 0 }}
      >
        {/* Black glow underlay for absolute contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0)_60%)] -z-10 scale-[1.5]" />

        <h1 className="text-5xl md:text-6xl lg:text-8xl w-max bg-gradient-to-r from-[#FDE8AE] via-[#C4A47C] to-[#8A6A40] text-transparent bg-clip-text drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]" style={headingStyle}>
          Curated Spaces.
        </h1>
        <p style={bodyStyle} className="max-w-xl text-lg md:text-xl text-[#E8D4B4] drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)] mt-2">
          Interiors designed for the human experience.
        </p>
      </div>

      {/* 
        Final Logo Reveal Panel
        This slides up from the bottom exactly after the image scrubbing finishes.
      */}
      <div 
        className="final-logo-panel absolute top-full left-0 w-full h-full z-40 flex flex-col items-center justify-between py-12 px-6 md:px-20 pointer-events-auto select-none overflow-hidden"
        style={{ 
          isolation: 'isolate',
          background: 'radial-gradient(circle at center, #FCFAF7 0%, #F1EBE0 100%)'
        }}
      >
        {/* Grain Layer */}
        <div 
          className="pointer-events-none absolute inset-0 z-50"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperAndGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='4' result='bump'/%3E%3CfeDiffuseLighting in='bump' lighting-color='%23ffffff' surfaceScale='2' result='light'%3E%3CfeDistantLight azimuth='45' elevation='60'/%3E%3C/feDiffuseLighting%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' result='grain'/%3E%3CfeColorMatrix type='matrix' values='0.77 0 0 0 0   0 0.64 0 0 0   0 0 0.48 0 0   0 0 0 0.18 0' result='coloredGrain'/%3E%3CfeBlend mode='multiply' in='light' in2='coloredGrain'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperAndGrain)'/%3E%3C/svg%3E")`,
            opacity: 0.45,
            mixBlendMode: 'multiply'
          }}
        />

        {/* Vertical Guide Lines */}
        <div className="vertical-guide absolute left-6 md:left-20 top-[140px] bottom-[80px] w-[1px] bg-[rgba(196,164,124,0.38)] pointer-events-none" />
        <div className="vertical-guide absolute right-6 md:right-20 top-[140px] bottom-[80px] w-[1px] bg-[rgba(196,164,124,0.38)] pointer-events-none" />

        {/* Vertical Architectural Metadata - Left Side */}
        <div className="meta-left absolute top-10 left-6 md:left-20 -translate-x-1/2 flex flex-col items-center text-center font-lato text-[11px] md:text-[12px] font-light tracking-[0.25em] text-[#C4A47C] opacity-80 leading-relaxed pointer-events-none">
          <div>EST.</div>
          <div>2020</div>
          <div className="w-4 h-[1px] bg-[#C4A47C]/40 mt-4" />
        </div>

        {/* Vertical Architectural Metadata - Right Side */}
        <div className="meta-right absolute top-10 right-6 md:right-20 translate-x-1/2 flex flex-col items-center text-center font-lato text-[11px] md:text-[12px] font-light tracking-[0.25em] text-[#C4A47C] opacity-80 leading-relaxed pointer-events-none">
          <div>PUNE</div>
          <div>INDIA</div>
          <div className="w-4 h-[1px] bg-[#C4A47C]/40 mt-4" />
        </div>

        {/* Central Content Area (Focal Point) */}
        <div className="absolute top-0 bottom-[100px] left-1/2 -translate-x-1/2 w-full max-w-[1100px] flex flex-col items-center justify-center z-10 px-6 md:px-16">
          {/* Logo Container */}
          <img 
            src="https://res.cloudinary.com/dcryxjtb3/image/upload/f_auto,q_auto,e_make_transparent/v1780135525/ChatGPT_Image_May_30_2026_03_34_07_PM_vddnww.png"
            alt="VAΛSTU Logo"
            className="final-logo w-full max-w-[340px] md:max-w-[380px] h-auto object-contain select-none flex-shrink-0"
            style={{ 
              mixBlendMode: 'multiply'
            }}
          />

          {/* Navigation Links */}
          <div 
            className="flex items-center flex-wrap justify-center gap-6 md:gap-[72px] text-[#2A2826] uppercase mt-8 text-[16px] md:text-[18px] tracking-[0.12em] flex-shrink-0"
            style={{
              fontFamily: 'var(--font-lato), sans-serif',
              fontWeight: 300,
            }}
          >
            {['Philosophy', 'Projects', 'Process', 'Contact'].map((item) => (
              <div 
                key={item} 
                className="nav-item relative cursor-pointer py-2 group text-[#2A2826]/92 hover:text-[#C4A47C]" 
                onClick={() => {
                  const el = document.getElementById(item.toLowerCase());
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {item}
                <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-[#C4A47C] -translate-x-1/2 transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              </div>
            ))}
          </div>

          {/* Small Horizontal Golden Line centered below navigation */}
          <div 
            className="mid-gold-line w-20 flex-shrink-0 mt-6"
            style={{ 
              height: '2px', 
              background: 'linear-gradient(to right, #B5946B 0%, #F1DAB7 50%, #B5946B 100%)',
              boxShadow: '0 0.5px 3px rgba(181, 148, 107, 0.45)',
            }}
          />

          {/* Hero Statement */}
          <h1 
            className="hero-statement text-center font-light leading-[0.95] max-w-[1100px] mt-6 md:mt-[36px] tracking-tight flex-shrink-0 bg-gradient-to-r from-[#1A1817] via-[#4E4742] to-[#1A1817] bg-clip-text text-transparent"
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: 'clamp(32px, 4.5vw, 68px)',
            }}
          >
            Spaces that elevate.<br />
            Experiences that endure.
          </h1>

          {/* Supporting Copy */}
          <p 
            className="supporting-copy text-center max-w-[700px] mt-4 md:mt-6 px-4 text-[15px] md:text-[18px] leading-[1.8] flex-shrink-0 bg-gradient-to-r from-[#4A4744] via-[#65615D] to-[#4A4744] bg-clip-text text-transparent"
            style={{
              fontFamily: 'var(--font-lato), sans-serif',
              fontWeight: 300,
            }}
          >
            We design with intention, craft with precision<br className="hidden md:inline" /> and build places that inspire for generations.
          </p>
        </div>


        {/* Scroll Indicator */}
        <div 
          className="scroll-indicator absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center text-center text-[#C4A47C] pointer-events-none select-none z-20"
          style={{
            fontFamily: 'var(--font-lato), sans-serif',
            fontSize: '11px',
            fontWeight: 300,
            letterSpacing: '0.3em',
          }}
        >
          {/* Vertical Golden Line */}
          <div 
            className="mb-6"
            style={{ 
              width: '2px', 
              height: '40px', 
              background: 'linear-gradient(to bottom, #B5946B 0%, #F1DAB7 50%, #B5946B 100%)',
              boxShadow: '0.5px 0 3px rgba(181, 148, 107, 0.45)',
            }}
          />
          <div>SCROLL TO EXPLORE</div>
          <svg 
            className="w-5 h-5 mt-2 text-[#C4A47C] animate-float-arrow" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={1}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  );
}
