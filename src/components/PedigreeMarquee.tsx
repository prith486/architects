"use client";

import { motion } from "framer-motion";

// List of publications/awards for social proof
const publications = [
  "ARCHITECTURAL DIGEST",
  "DEZEEN",
  "ARCHDAILY",
  "DWELL",
  "THE TIMES OF INDIA",
  "VOGUE LIVING",
  "WALLPAPER*"
];

// We duplicate the array to ensure the infinite scroll never has a visual break
const marqueeItems = [...publications, ...publications, ...publications];

export default function PedigreeMarquee() {
  return (
    <section className="relative w-full py-16 border-y border-black/5 overflow-hidden flex flex-col items-center z-10">
      
      <div className="absolute inset-0 bg-[#f7f6f2] -z-10" />

      <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#b7955b] mb-10 block text-center">
        Recognized & Featured In
      </span>

      <div className="relative w-full flex overflow-x-hidden">
        
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#f7f6f2] to-transparent z-10" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#f7f6f2] to-transparent z-10" />

        <motion.div
          className="flex whitespace-nowrap items-center flex-nowrap"
          animate={{ x: ["0%", "-33.3333%"] }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 25 // Adjust for slower/faster scrolling
          }}
        >
          {marqueeItems.map((item, index) => (
            <div 
              key={index}
              className="flex items-center justify-center px-16 group cursor-default"
            >
              <h3 className="font-serif text-2xl md:text-3xl tracking-wide text-[#1a1a1a]/30 transition-colors duration-500 group-hover:text-[#1a1a1a]">
                {item}
              </h3>
              
              <div className="w-1.5 h-1.5 rounded-full bg-[#b7955b]/40 ml-16" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
