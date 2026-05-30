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
  const { images } = useImagePreloader('/img_new', 252, {
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

    // 2. The Logo Reveal
    tl.from('.final-logo',
      { opacity: 0, y: 50, duration: 40, ease: 'power2.out' },
      332 // Starts AFTER the white panel has fully settled
    );

    // 3. The Staggered Navbar Reveal
    tl.from('.nav-item',
      { opacity: 0, y: 30, stagger: 20, duration: 30, ease: 'power2.out' },
      372 // Starts strictly AFTER the logo finishes its reveal
    );

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
        className="final-logo-panel absolute top-full left-0 w-full h-full z-40 bg-white flex flex-col items-center justify-center pointer-events-auto"
      >
        <div 
          className="final-logo w-full max-w-[450px] h-48 md:h-64 bg-no-repeat bg-center bg-contain mb-[80px]"
          style={{ 
            backgroundImage: `url('https://res.cloudinary.com/dcryxjtb3/image/upload/q_auto/f_auto/v1780135525/ChatGPT_Image_May_30_2026_03_34_07_PM_vddnww.png')`
          }}
        />
        
        {/* Navbar Items that appear below the logo */}
        <div 
          className="flex items-center flex-wrap justify-center gap-8 md:gap-16 text-[#2A2826] uppercase"
          style={{
            fontFamily: '"Lato", sans-serif',
            fontWeight: 400,
            fontSize: '14px',
            letterSpacing: '0.15em'
          }}
        >
          {['Philosophy', 'Projects', 'Process', 'Contact'].map((item) => (
            <div 
              key={item} 
              className="nav-item group relative cursor-pointer" 
              style={{ perspective: '800px', height: '1.2em' }}
            >
              <div 
                className="relative w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:[transform:rotateX(90deg)]" 
                style={{ transformStyle: 'preserve-3d', transformOrigin: '50% 50% -0.6em' }}
              >
                {/* Front Face */}
                <div 
                  className="relative text-[#2A2826] h-full flex items-center" 
                  style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
                >
                  {item}
                </div>
                {/* Bottom Face (Rotated underneath, becomes front on hover) */}
                <div 
                  className="absolute inset-0 text-[#C4A47C] flex items-center" 
                  style={{ transform: 'rotateX(-90deg) translateY(100%)', transformOrigin: 'top center', backfaceVisibility: 'hidden' }}
                >
                  {item}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
