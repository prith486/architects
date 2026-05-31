'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import HeroScroll from '@/components/canvas/HeroScroll';
import AboutUs from '@/components/about/AboutUs';
import PortfolioShowcase from '@/components/portfolio/PortfolioShowcase';
import ProcessTimeline from '@/components/process/ProcessTimeline';
import ContactFooter from '@/components/ui/ContactFooter';

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
    <main className="min-h-screen">
      {/* Single seamless canvas experience for all frames */}
      <HeroScroll />

      {/* About Us / Philosophy Section (Sticky Scroll) */}
      <section id="about-wrapper" className="w-full relative z-10" style={{ background: 'radial-gradient(circle at center, #FCFAF7 0%, #F1EBE0 100%)' }}>
        {/* Paper Emboss Grain Layer - High Intensity */}
        <div 
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperAndGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='4' result='bump'/%3E%3CfeDiffuseLighting in='bump' lighting-color='%23ffffff' surfaceScale='3' result='light'%3E%3CfeDistantLight azimuth='45' elevation='60'/%3E%3C/feDiffuseLighting%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' result='grain'/%3E%3CfeColorMatrix type='matrix' values='0.77 0 0 0 0   0 0.64 0 0 0   0 0 0.48 0 0   0 0 0 0.18 0' result='coloredGrain'/%3E%3CfeBlend mode='multiply' in='light' in2='coloredGrain'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperAndGrain)'/%3E%3C/svg%3E")`,
            opacity: 0.95,
            mixBlendMode: 'multiply'
          }}
        />
        <div className="relative z-10">
          <AboutUs />
        </div>
      </section>
      
      {/* Portfolio Showcase Section */}
      <section id="philosophy" className="relative z-10">
        <PortfolioShowcase />
      </section>

      {/* Process Timeline Section */}
      <ProcessTimeline />

      {/* Contact & Footer Section */}
      <ContactFooter />
    </main>
  );
}
