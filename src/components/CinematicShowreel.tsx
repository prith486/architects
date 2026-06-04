"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

export default function CinematicShowreel() {
  const [isOpen, setIsOpen] = useState(false);
  
  // State for the Magnetic Hover Effect
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    
    // Calculate distance from center of button
    // The multiplier (0.3) dictates the "strength" of the magnetic pull
    const x = (e.clientX - (left + width / 2)) * 0.3;
    const y = (e.clientY - (top + height / 2)) * 0.3;
    
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    // Snap back to center when mouse leaves
    setPosition({ x: 0, y: 0 });
  };

  return (
    <>
      <div className="flex items-center gap-6 mt-12 mb-16">
        <motion.button
          ref={buttonRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => setIsOpen(true)}
          animate={{ x: position.x, y: position.y }}
          transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
          className="w-20 h-20 rounded-full border border-black/10 flex items-center justify-center relative overflow-hidden group hover:border-[#b7955b]/50 transition-colors bg-white/50 backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-[#b7955b]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          <Play className="text-[#1a1a1a] group-hover:text-[#b7955b] relative z-10 ml-1 transition-colors" size={24} />
        </motion.button>
        
        <div className="flex flex-col">
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#b7955b] mb-1">
            Immersion
          </span>
          <span className="font-serif text-xl text-[#1a1a1a]">
            Watch the Showreel
          </span>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-[#050505]"
              onClick={() => setIsOpen(false)}
            />

            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
            >
              <X size={20} />
            </motion.button>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="relative w-[90vw] h-[80vh] max-w-7xl bg-black rounded-sm overflow-hidden border border-white/10 shadow-2xl"
            >
              <video 
                src="https://www.w3schools.com/html/mov_bbb.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline
                controls={false}
                className="w-full h-full object-cover opacity-90"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
              
              <div className="absolute bottom-8 left-8 pointer-events-none">
                <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/50 block mb-2">
                  Featured Project
                </span>
                <h3 className="font-serif text-3xl text-white">The Khandala Retreat</h3>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
