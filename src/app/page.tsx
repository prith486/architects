'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import HeroScroll from '@/components/canvas/HeroScroll';
import ConsultationForm from '@/components/ui/ConsultationForm';
import TypewriterText from '@/components/ui/TypewriterText';

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <main className="bg-background min-h-screen text-foreground font-inter">
      {/* Single seamless canvas experience for all frames */}
      <HeroScroll />
      
      {/* Philosophy Section */}
      <section id="philosophy" className="min-h-screen flex items-center justify-center bg-background py-24 px-6 relative z-10">
         <div className="max-w-4xl mx-auto text-center space-y-12">
            <h2 className="text-4xl md:text-6xl font-playfair tracking-widest uppercase text-primary">Our Philosophy</h2>
            <TypewriterText 
              text='"We do not just build houses; we curate environments. By bridging the gap between minimalist architecture and deeply personal interior design, we create sanctuaries that breathe with the landscape."'
              className="text-xl md:text-3xl font-light leading-relaxed text-white/90"
            />
         </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center bg-background py-24 px-6 border-t border-white/5 relative overflow-hidden z-10">
        {/* Subtle background gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="w-full relative z-10">
          <ConsultationForm />
        </div>
      </section>
      
      <footer className="py-8 text-center text-white/40 text-sm tracking-widest uppercase border-t border-white/10 relative z-10">
        &copy; {new Date().getFullYear()} All Rights Reserved.
      </footer>
    </main>
  );
}
