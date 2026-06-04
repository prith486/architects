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
    
    // VAASTU Initial Hero UI (Fades out when scrolling begins)
    tl.to(['.fade-layer', '.hero-overlay'], 
      { opacity: 0, y: -20, duration: 25, ease: 'power2.inOut' }, 
      0 // Starts fading out immediately on scroll
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
      '.cta-module',
      '.social-module',
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
    <div 
      ref={containerRef} 
      className="h-screen w-full relative bg-[#111] overflow-hidden"
    >
      {/* Canvas Layer */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full object-cover z-0" 
      />

      {/* Watch Showreel FAB - Replaces the white watermark cover */}
      <div className="absolute bottom-[4%] right-[2vw] z-20 pointer-events-auto">
        <button className="flex items-center gap-4 px-6 py-[14px] rounded-[30px] bg-black/30 backdrop-blur-md border border-white/10 hover:bg-black/50 transition-colors group shadow-2xl">
          <div className="w-8 h-8 rounded-full border border-[#D4AF37]/50 flex items-center justify-center group-hover:scale-110 transition-transform bg-black/20">
            <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-[2px]">
              <path d="M9 5.26795C9.66667 5.65285 9.66667 6.61489 9 6.99979L1.5 11.33C0.833334 11.7149 0 11.2339 0 10.4641L0 1.80363C0 1.03383 0.833333 0.552802 1.5 0.937703L9 5.26795Z" fill="#D4AF37"/>
            </svg>
          </div>
          <span className="font-lato text-[11px] tracking-[0.2em] font-medium text-[#F8F4EC] uppercase mt-[1px]">Watch Showreel</span>
        </button>
      </div>

      {/* 
        VAASTU HERO UI (Visible at start, fades out on scroll)
      */}
      <div className="hero-overlay pointer-events-none"></div>

      <div className="hero-top-bar fade-layer pointer-events-none !justify-center" data-speed="1.5">
        <div className="brand-center">
          <div className="brand-logo">V<span className="gold-a">AA</span>STU</div>
          <div className="brand-tagline">ARCHITECTURE . INTERIORS . HARMONY</div>
        </div>
        
        <div className="absolute top-10 right-[2vw] pr-[40px] pointer-events-auto z-50">
          <button className="group flex flex-col items-end justify-center gap-[6px] w-[36px] h-[24px] cursor-pointer focus:outline-none">
            <div className="h-[1px] w-full bg-[#EAE3D5] transition-all duration-300 opacity-90"></div>
            <div className="h-[1px] w-[60%] bg-[#EAE3D5] group-hover:w-full transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] opacity-90"></div>
          </button>
        </div>
      </div>

        {/* Protective dark gradient behind the text */}
        <div className="absolute top-0 left-0 w-full md:w-[60%] h-[80%] bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-black/80 via-black/30 to-transparent pointer-events-none z-[5]" />

        <div className="hero-main-content fade-layer pointer-events-none relative z-10" data-speed="1">
          <h1 className="hero-title" style={{ color: '#F8F4EC', textShadow: '0 4px 12px rgba(0,0,0,0.4)' }}>
            Spaces that <span className="gold-a" style={{ fontFamily: 'var(--font-pinyon), cursive', fontSize: '1.6em', fontStyle: 'normal', textTransform: 'lowercase', margin: '0 2px', paddingRight: '12px', filter: 'drop-shadow(0 2px 4px rgba(212,175,55,0.3))' }}>elevate</span>.<br />
            Experiences that <span className="gold-a" style={{ fontFamily: 'var(--font-pinyon), cursive', fontSize: '1.6em', fontStyle: 'normal', textTransform: 'lowercase', margin: '0 2px', paddingRight: '12px', filter: 'drop-shadow(0 2px 4px rgba(212,175,55,0.3))' }}>endure</span>.
          </h1>
          
          <p className="hero-subtitle" style={{ color: '#EAE3D5', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
            We design with <span style={{ fontFamily: 'var(--font-pinyon), cursive', color: '#C9A96E', fontSize: '1.6em', fontStyle: 'normal', textTransform: 'lowercase', margin: '0 2px', paddingRight: '10px' }}>intention</span>, craft with <span style={{ fontFamily: 'var(--font-pinyon), cursive', color: '#C9A96E', fontSize: '1.6em', fontStyle: 'normal', textTransform: 'lowercase', margin: '0 2px', paddingRight: '10px' }}>precision</span><br />
            and build places that <span style={{ fontFamily: 'var(--font-pinyon), cursive', color: '#C9A96E', fontSize: '1.6em', fontStyle: 'normal', textTransform: 'lowercase', margin: '0 2px', paddingRight: '10px' }}>inspire</span> for generations.
          </p>
        <div className="hero-explore pointer-events-auto">
          <span className="explore-text">EXPLORE OUR PHILOSOPHY</span>
          <div className="explore-line"></div>
        </div>
        <div className="hero-slider-indicator">
          <span className="slider-num">01</span>
          <div className="slider-track"><div className="slider-fill"></div></div>
          <span className="slider-num">04</span>
        </div>
      </div>

      {/* Addition 01: Social Presence Rail */}
      <div className="absolute right-[2vw] top-1/2 -translate-y-1/2 translate-x-1/2 flex flex-col items-center gap-[42px] z-20 pointer-events-auto fade-layer" data-speed="1">
        <a href="#" className="text-[#C4A47C] drop-shadow-[0_0px_6px_rgba(196,164,124,0.7)] hover:text-[#F8F6F2] hover:drop-shadow-[0_0px_12px_rgba(248,246,242,0.9)] hover:scale-110 transition-all duration-[350ms]">
          <InstagramIcon size={28} />
        </a>
        <a href="#" className="text-[#C4A47C] drop-shadow-[0_0px_6px_rgba(196,164,124,0.7)] hover:text-[#F8F6F2] hover:drop-shadow-[0_0px_12px_rgba(248,246,242,0.9)] hover:scale-110 transition-all duration-[350ms]">
          <LinkedinIcon size={28} />
        </a>
        <a href="mailto:contact@vaastu.com" className="text-[#C4A47C] drop-shadow-[0_0px_6px_rgba(196,164,124,0.7)] hover:text-[#F8F6F2] hover:drop-shadow-[0_0px_12px_rgba(248,246,242,0.9)] hover:scale-110 transition-all duration-[350ms]">
          <EmailIcon size={28} />
        </a>
      </div>

      <div className="hero-scroll-indicator fade-layer pointer-events-none" data-speed="1.2">
        <div className="scroll-arrow-container">
          <div className="scroll-line-vertical"></div>
          <svg className="arrow-down" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
        </div>
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
        <div 
          className="vertical-guide absolute left-6 md:left-20 top-[140px] bottom-[80px] w-[2px] pointer-events-none" 
          style={{
            background: 'linear-gradient(to bottom, rgba(181, 148, 107, 0) 0%, rgba(181, 148, 107, 0.7) 15%, #9c7b50 50%, rgba(181, 148, 107, 0.7) 85%, rgba(181, 148, 107, 0) 100%)',
            boxShadow: '0 0 4px rgba(181, 148, 107, 0.6)'
          }}
        />
        <div 
          className="vertical-guide absolute right-6 md:right-20 top-[140px] bottom-[80px] w-[2px] pointer-events-none" 
          style={{
            background: 'linear-gradient(to bottom, rgba(181, 148, 107, 0) 0%, rgba(181, 148, 107, 0.7) 15%, #9c7b50 50%, rgba(181, 148, 107, 0.7) 85%, rgba(181, 148, 107, 0) 100%)',
            boxShadow: '0 0 4px rgba(181, 148, 107, 0.6)'
          }}
        />

        {/* Vertical Architectural Metadata - Left Side */}
        <div className="meta-left absolute top-10 left-6 md:left-20 -translate-x-1/2 flex flex-col items-center text-center font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] text-[#8c6200] leading-relaxed pointer-events-none">
          <div>EST.</div>
          <div>2020</div>
          <div className="w-4 h-[2px] bg-[#8c6200]/40 mt-4" />
        </div>

        {/* Vertical Architectural Metadata - Right Side */}
        <div className="meta-right absolute top-10 right-6 md:right-20 translate-x-1/2 flex flex-col items-center text-center font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] text-[#8c6200] leading-relaxed pointer-events-none">
          <div>PUNE</div>
          <div>INDIA</div>
          <div className="w-4 h-[2px] bg-[#8c6200]/40 mt-4" />
        </div>

        {/* Central Content Area (Focal Point) */}
        <div className="absolute top-12 md:top-20 bottom-[120px] left-1/2 -translate-x-1/2 w-full max-w-[1100px] flex flex-col items-center justify-center z-10 px-6 md:px-16">
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
            className="flex items-center flex-wrap justify-center gap-6 md:gap-[72px] text-[#111111] uppercase mt-8 text-[15px] md:text-[16px] tracking-[0.15em] flex-shrink-0"
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
            }}
          >
            {['Philosophy', 'Projects', 'Process', 'Contact'].map((item) => (
              <div 
                key={item} 
                className="nav-item relative cursor-pointer py-2 group text-[#1a1a1a] hover:text-[#8c6200] transition-colors" 
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
            className="hero-statement text-center font-light leading-[0.95] max-w-[1100px] mt-6 md:mt-[36px] tracking-tight flex-shrink-0"
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: 'clamp(32px, 4.5vw, 68px)',
              background: 'linear-gradient(135deg, #0a0a0a 0%, #3a3a3a 35%, #1a1a1a 65%, #2a2a2a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
              filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15))'
            }}
          >
            Silent Strength. Enduring Design.
          </h1>

          {/* Supporting Copy */}
          <p 
            className="supporting-copy text-center max-w-[700px] mt-4 md:mt-6 px-4 text-[15px] md:text-[18px] leading-[1.8] flex-shrink-0"
            style={{
              fontFamily: 'var(--font-lato), sans-serif',
              fontWeight: 300,
              background: 'linear-gradient(135deg, #333333 0%, #555555 50%, #333333 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
              letterSpacing: '0.02em',
              filter: 'drop-shadow(0 1px 4px rgba(0, 0, 0, 0.08))'
            }}
          >
            Forging the intersection of raw materiality and natural harmony. We sculpt light, shadow, and geometry to create uncompromising architectural statements.
          </p>

          {/* Architectural Divider */}
          <div 
            className="cta-module w-[1px] h-[36px] bg-[#C4A47C] opacity-25 mx-auto mt-[20px] flex-shrink-0"
          />

          {/* CTA Module */}
          <div className="cta-module flex flex-row items-center justify-center gap-[28px] mt-[20px] flex-shrink-0 pointer-events-auto">
            <button className="w-[240px] h-[52px] bg-[#232220] text-[#F8F6F2] font-lato font-normal text-[12px] uppercase tracking-[0.12em] rounded-none flex items-center justify-center gap-2 transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#2A2826] group">
              EXPLORE PROJECTS
              <span className="transition-transform duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[6px]">→</span>
            </button>
            <button className="w-[240px] h-[52px] bg-transparent border border-[#C4A47C]/60 text-[#C4A47C] font-lato font-normal text-[12px] uppercase tracking-[0.12em] rounded-none flex items-center justify-center gap-2 transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#C4A47C]/[0.06] group">
              START A PROJECT
              <span className="transition-transform duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[6px]">→</span>
            </button>
          </div>

          {/* Social Presence Module */}
          <div className="social-module flex flex-row items-center justify-center gap-[48px] mt-[30px] flex-shrink-0 pointer-events-auto">
            <a href="#" className="text-[#C4A47C] hover:text-[#F8F6F2] transition-all duration-[350ms] group drop-shadow-[0_2px_6px_rgba(196,164,124,0.3)] hover:drop-shadow-[0_0px_10px_rgba(248,246,242,0.5)]">
              <InstagramIcon size={32} className="group-hover:scale-110 transition-transform duration-[350ms]" />
            </a>
            <a href="#" className="text-[#C4A47C] hover:text-[#F8F6F2] transition-all duration-[350ms] group drop-shadow-[0_2px_6px_rgba(196,164,124,0.3)] hover:drop-shadow-[0_0px_10px_rgba(248,246,242,0.5)]">
              <LinkedinIcon size={32} className="group-hover:scale-110 transition-transform duration-[350ms]" />
            </a>
            <a href="#" className="text-[#C4A47C] hover:text-[#F8F6F2] transition-all duration-[350ms] group drop-shadow-[0_2px_6px_rgba(196,164,124,0.3)] hover:drop-shadow-[0_0px_10px_rgba(248,246,242,0.5)]">
              <TwitterIcon size={32} className="group-hover:scale-110 transition-transform duration-[350ms]" />
            </a>
          </div>
        </div>


        {/* Scroll Indicator */}
        <div 
          className="scroll-indicator absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center text-center pointer-events-none select-none z-20"
          style={{
            fontFamily: 'var(--font-lato), sans-serif',
            fontSize: '12px',
            fontWeight: 300,
            letterSpacing: '0.35em',
            color: 'rgba(196, 164, 124, 0.75)'
          }}
        >
          <svg 
            className="w-5 h-5 text-[#8c6200]" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={1}
            style={{
              animation: 'floatArrow 2.5s ease-in-out infinite'
            }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes floatArrow {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(8px); }
            }
          `}} />
        </div>
      </div>
    </div>
  );
}

// Custom SVGs since Lucide removed brand icons
const InstagramIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const TwitterIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const EmailIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
