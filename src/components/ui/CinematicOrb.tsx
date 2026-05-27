'use client';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CinematicOrb() {
  const { scrollYProgress } = useScroll();
  
  // Fade out orb when camera enters the doorway/interior sequence (e.g. progress ~0.4 to 0.5)
  const orbOpacity = useTransform(scrollYProgress, [0.35, 0.45], [1, 0]);
  const orbScaleScroll = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  
  // Mouse position for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const parallaxX = useSpring(mouseX, springConfig);
  const parallaxY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20; // Max 10px shift
      const y = (e.clientY / innerHeight - 0.5) * 20;
      mouseX.set(x);
      mouseY.set(y);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        opacity: orbOpacity,
        scale: orbScaleScroll,
        x: parallaxX,
        y: parallaxY
      }}
      className="absolute bottom-[24px] right-[84px] z-50 pointer-events-auto"
    >
      <motion.button
        initial="idle"
        whileHover="hover"
        animate="idle"
        variants={{
          idle: { scale: 1 },
          hover: { scale: 1.05 }
        }}
        className="relative flex items-center justify-center w-16 h-16 rounded-full group outline-none"
      >
        {/* Core obsidian glass body */}
        <div className="absolute inset-0 rounded-full bg-black/60 backdrop-blur-xl border border-white/5 overflow-hidden transition-all duration-700 group-hover:bg-black/40 group-hover:backdrop-blur-2xl">
          
          {/* Subtle noise texture */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
          
          {/* Internal soft gold glow */}
          <motion.div 
            variants={{
              idle: { opacity: 0.3, scale: 1 },
              hover: { opacity: 0.6, scale: 1.2 }
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 rounded-full bg-radial from-primary/30 to-transparent" 
          />
          
          {/* Shimmer sweep effect (idle animation) */}
          <motion.div
            animate={{ 
              x: ['-100%', '200%'],
              opacity: [0, 0.5, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 4, 
              ease: "easeInOut",
              times: [0, 0.5, 1] 
            }}
            className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-primary/20 to-transparent skew-x-12"
          />
        </div>

        {/* Golden rim lighting highlight */}
        <div className="absolute inset-[-1px] rounded-full bg-gradient-to-br from-primary/40 via-transparent to-transparent opacity-50 blur-[1px] group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Outer ambient bloom */}
        <motion.div
          variants={{
            idle: { opacity: 0.1, scale: 1 },
            hover: { opacity: 0.3, scale: 1.5 }
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 rounded-full bg-primary/20 blur-xl pointer-events-none"
        />

        {/* Minimal soundwave icon */}
        <div className="relative z-10 flex items-center justify-center gap-1 h-full w-full">
          {[1, 2, 3].map((bar) => (
            <motion.div
              key={bar}
              variants={{
                idle: { height: bar === 2 ? '12px' : '6px' },
                hover: { 
                  height: ['6px', '16px', '6px'],
                  transition: { 
                    repeat: Infinity, 
                    duration: 1,
                    delay: bar * 0.1,
                    ease: "easeInOut"
                  }
                }
              }}
              className="w-[2px] rounded-full bg-gradient-to-b from-white/90 to-primary/80"
            />
          ))}
        </div>
      </motion.button>
    </motion.div>
  );
}
