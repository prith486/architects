'use client';
import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroScroll from '@/components/canvas/HeroScroll';
import PedigreeMarquee from '@/components/PedigreeMarquee';
import AboutUs from '@/components/about/AboutUs';
import PortfolioShowcase from '@/components/portfolio/PortfolioShowcase';
import VisionBuilder from '@/components/VisionBuilder';
import ProcessTimeline from '@/components/process/ProcessTimeline';
import ContactFooter from '@/components/ui/ContactFooter';
import {
  HOMEPAGE_FALLBACK,
  mapHomepageData,
  type HomepageData,
  type SanityHomepageDocument,
} from '@/sanity/lib/homepageMapper';
import {
  PORTFOLIO_PROJECT_CARD_FALLBACK,
  mapPortfolioShowcaseProjects,
  type PortfolioProjectCardData,
  type SanityPortfolioProjectDocument,
} from '@/sanity/lib/portfolioShowcaseMapper';
import { client } from '@/sanity/lib/client';
import { homepageQuery, portfolioShowcaseProjectsQuery } from '@/sanity/lib/queries';

export default function Home() {
  const [homepageContent, setHomepageContent] = useState<HomepageData>(HOMEPAGE_FALLBACK);
  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProjectCardData[]>(
    PORTFOLIO_PROJECT_CARD_FALLBACK,
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Synchronize Lenis scrolling with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    client
      .fetch<SanityHomepageDocument | null>(homepageQuery)
      .then((document) => {
        if (isMounted) {
          setHomepageContent(mapHomepageData(document));
        }
      })
      .catch((error) => {
        console.warn('Sanity homepage fetch failed. Using hardcoded fallback.', error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    client
      .fetch<SanityPortfolioProjectDocument[] | null>(portfolioShowcaseProjectsQuery)
      .then((documents) => {
        if (isMounted) {
          setPortfolioProjects(mapPortfolioShowcaseProjects(documents));
        }
      })
      .catch((error) => {
        console.warn('Sanity portfolio projects fetch failed. Using hardcoded fallback.', error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen">
      {/* Single seamless canvas experience for all frames */}
      <HeroScroll content={homepageContent} />

      {/* Social Proof Marquee */}
      <PedigreeMarquee content={homepageContent.pedigreeMarquee} />

      {/* About Us / Philosophy Section (Sticky Scroll) */}
      <section id="philosophy" className="w-full relative z-10" style={{ background: 'radial-gradient(circle at center, #FCFAF7 0%, #F1EBE0 100%)' }}>
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
      <section id="projects" className="relative z-10 mb-20">
        <PortfolioShowcase introContent={homepageContent} projects={portfolioProjects} />
      </section>

      {/* Gamified Vision Builder Section - Added massive spacing to ensure no merging */}
      <VisionBuilder content={homepageContent.visionBuilder} />

      {/* Process Timeline Section */}
      <div id="process" className="mt-20">
        <ProcessTimeline />
      </div>

      {/* Contact & Footer Section */}
      <ContactFooter />
    </main>
  );
}
