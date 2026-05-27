'use client';
import { useRef, useEffect } from 'react';
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import CinematicOrb from '@/components/ui/CinematicOrb';

function ScrollWritingText({
  text,
  positionClasses,
  widthTransform,
  opacityTransform,
  extraClasses = ""
}: {
  text: string;
  positionClasses: string;
  widthTransform: MotionValue<string>;
  opacityTransform: MotionValue<number>;
  extraClasses?: string;
}) {
  return (
    <motion.div
      style={{ opacity: opacityTransform }}
      className={`absolute z-30 pointer-events-none flex ${positionClasses}`}
    >
      <motion.div
        style={{ width: widthTransform }}
        className="overflow-hidden whitespace-nowrap"
      >
        <span className={`font-[family-name:var(--font-great-vibes)] text-primary drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] pr-4 ${extraClasses}`}>
          {text}
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function HeroScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Load all 226 frames sequentially
  const { images, loaded } = useImagePreloader('/images', 226, {
    prefix: 'ezgif-frame-',
    extension: 'jpg',
    padLength: 3,
    offset: 0
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map the scroll to all 226 frames (index 0 to 225)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, 225]);
  
  // Fade out blackout overlays completely by the 20th frame
  const overlayOpacity = useTransform(frameIndex, [0, 20], [1, 0]);

  // Fade out hero content by the 30th frame
  const contentOpacity = useTransform(frameIndex, [0, 30], [1, 0]);

  // Scene 2: "Designed for the senses."
  const scene2Width = useTransform(frameIndex, [50, 75], ["0%", "100%"]);
  const scene2Opacity = useTransform(frameIndex, [80, 90], [1, 0]);

  // Scene 3: "Where light flows..."
  const scene3Width = useTransform(frameIndex, [110, 140], ["0%", "100%"]);
  const scene3Opacity = useTransform(frameIndex, [150, 160], [1, 0]);

  // Scene 4: "Your Sanctuary."
  const scene4Width = useTransform(frameIndex, [190, 215], ["0%", "100%"]);
  const scene4Opacity = useTransform(frameIndex, [225, 226], [1, 1]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const renderFrame = (index: number) => {
      if (images[index] && images[index].complete && ctx && canvas) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.scale(dpr, dpr);
        
        const img = images[index];
        const hRatio = window.innerWidth / img.width;
        const vRatio = window.innerHeight / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (window.innerWidth - img.width * ratio) / 2;
        const centerShift_y = (window.innerHeight - img.height * ratio) / 2;  
        
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.drawImage(img, 0,0, img.width, img.height,
                           centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);
      }
    };

    // Try rendering first frame immediately if ready
    if (images[0]) {
      if (images[0].complete) {
        renderFrame(0);
      } else {
        images[0].addEventListener('load', () => renderFrame(0));
      }
    }

    // Subscribe to framer motion value
    const unsubscribe = frameIndex.on("change", (latest) => {
      renderFrame(Math.round(latest));
    });

    return () => unsubscribe();
  }, [frameIndex, images]);

  return (
    <div ref={containerRef} className="h-[800vh] relative bg-background">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas background */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0" />
        
        {/* Cinematic Dark Overlays (Fade out by frame 20) */}
        <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />
          <div className="absolute inset-0 bg-black/20 mix-blend-overlay" />
          
          {/* Micro Atmospheric Effects */}
          <div className="absolute inset-0 opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] mix-blend-screen" />
        </motion.div>

        {/* Hero Content Composition */}
        <motion.div style={{ opacity: contentOpacity }} className="absolute inset-0 z-20 flex flex-col justify-end pb-32 px-6 md:px-16 lg:px-32 max-w-[1600px] mx-auto w-full">
          
          {/* Main Typography */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-playfair leading-[1.15] text-white tracking-tight">
              Architecture <br />
              <span className="font-light">is an</span> <span className="text-primary italic">Experience.</span>
            </h1>
          </motion.div>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-white/70 font-inter text-sm md:text-base max-w-md leading-relaxed tracking-wide mb-12"
          >
            We craft environments that elevate everyday moments into timeless experiences.
          </motion.p>

          {/* Call to Action */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="group flex items-center gap-4 w-fit"
          >
            <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all duration-500">
              <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-1 group-hover:border-l-primary transition-colors duration-500" />
            </div>
            <span className="text-white text-xs font-inter uppercase tracking-[0.2em] group-hover:text-primary transition-colors duration-500">
              Explore Our World
            </span>
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div style={{ opacity: contentOpacity }} className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent opacity-50" />
          <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center p-1">
            <motion.div 
              animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-1 h-1 bg-primary rounded-full mt-1"
            />
          </div>
          <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] mt-2">Scroll To Experience</span>
        </motion.div>

        {/* Scene 2: The Approach */}
        <ScrollWritingText
          text="Designed for the senses."
          positionClasses="top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center"
          extraClasses="text-5xl md:text-7xl lg:text-8xl"
          widthTransform={scene2Width}
          opacityTransform={scene2Opacity}
        />

        {/* Scene 3: The Interior */}
        <ScrollWritingText
          text="Where light flows..."
          positionClasses="bottom-32 left-8 md:left-24 lg:left-32 justify-start"
          extraClasses="text-5xl md:text-7xl lg:text-[6rem]"
          widthTransform={scene3Width}
          opacityTransform={scene3Opacity}
        />

        {/* Scene 4: The Reveal */}
        <ScrollWritingText
          text="Your Sanctuary."
          positionClasses="bottom-48 left-1/2 -translate-x-1/2 justify-center"
          extraClasses="text-6xl md:text-8xl lg:text-[8rem]"
          widthTransform={scene4Width}
          opacityTransform={scene4Opacity}
        />

        <CinematicOrb />
      </div>
    </div>
  );
}
