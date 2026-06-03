
'use client';

import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Project } from '@/data/projects';
import { PROJECTS } from '@/data/projects';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectDetailClientProps {
  project: Project;
}

interface GalleryImage {
  src: string;
  alt: string;
  label: string;
  index: string;
}

function SectionMarker({ number, label, dark = false }: { number: string; label: string; dark?: boolean }) {
  return (
    <div className="pointer-events-none absolute left-4 top-24 hidden h-40 w-12 md:block">
      <div className="font-cormorant text-5xl font-light leading-none text-gold-primary/60">
        {number}
      </div>
      <div
        className={`absolute left-2 top-28 origin-left -rotate-90 whitespace-nowrap font-[var(--font-dm-sans)] text-[9px] font-medium uppercase tracking-[0.25em] ${
          dark ? 'text-white/25' : 'text-[#b9b5ad]'
        }`}
      >
        {label}
      </div>
    </div>
  );
}

function ProjectGallery({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];

  if (!activeImage) return null;

  return (
    <section className="flex min-h-screen w-full bg-[#FAF9F7] pr-[6%] max-lg:flex-col max-lg:pr-0">
      {/* LEFT - Text block */}
      <div className="w-[58%] px-[80px] py-[120px] max-lg:w-full max-lg:px-6 max-lg:py-20">
        <p className="mb-12 font-[var(--font-dm-sans)] text-[10px] font-medium uppercase tracking-[0.2em] text-[#9E9B95]">
          02 - Visual Narrative
        </p>

        <p className="leading-[1.4]">
          {images.map((img, i) => (
            <Fragment key={`${img.index}-${img.alt}`}>
              <span
                onMouseEnter={() => setActiveIndex(i)}
                className={`inline cursor-default font-[var(--font-dm-sans)] transition-colors duration-[250ms] ${
                  activeIndex === i ? 'font-semibold text-[#3D3D3A]' : 'font-light text-[#C8C5BF]'
                }`}
                style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3.2rem)' }}
              >
                {img.label}
                <sup
                  className={`ml-1 font-[var(--font-dm-sans)] text-[0.55em] text-gold-primary transition-opacity duration-[250ms] ${
                    activeIndex === i ? 'opacity-100' : 'opacity-40'
                  }`}
                >
                  ({img.index})
                </sup>
              </span>

              {i < images.length - 1 && (
                <span
                  className="mx-3 inline select-none font-[var(--font-dm-sans)] font-light text-[#D5D2CC]"
                  style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)' }}
                >
                  /
                </span>
              )}
            </Fragment>
          ))}
        </p>
      </div>

      {/* RIGHT - Sticky image panel */}
      <div className="w-[6%] max-lg:hidden" />

      <div className="sticky top-[10vh] mr-[4%] h-[65vh] w-[30%] overflow-hidden bg-[#111110] max-lg:relative max-lg:top-0 max-lg:mr-0 max-lg:h-[70vh] max-lg:w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <img src={activeImage.src} alt={activeImage.alt} className="h-full w-full object-cover" />
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[35%] bg-gradient-to-t from-[#111110]/70 to-transparent">
          <motion.p
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="absolute bottom-8 left-8 font-[var(--font-dm-sans)] text-[11px] font-medium uppercase tracking-[0.18em] text-white/50"
          >
            ({activeImage.index}) &nbsp; {activeImage.label}
          </motion.p>
        </div>
      </div>
    </section>
  );
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const router = useRouter();
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const titleWords = project.title.split(' ');
  const statItems = [
    { label: 'Total Area', value: project.details.area },
    { label: 'Typology', value: project.category },
    { label: 'Client', value: project.details.client },
    { label: 'Year', value: project.details.year },
  ];
  const galleryImages: GalleryImage[] = [
    {
      src: project.image,
      alt: `${project.title} featured view`,
      label: 'Featured View',
      index: '01',
    },
    {
      src: project.image,
      alt: `${project.title} detail 1`,
      label: 'Detail Study',
      index: '02',
    },
    {
      src: project.image,
      alt: `${project.title} detail 2`,
      label: 'Material Detail',
      index: '03',
    },
    {
      src: project.image,
      alt: `${project.title} context`,
      label: 'Architectural Context',
      index: '04',
    },
    {
      src: project.image,
      alt: `${project.title} interior`,
      label: 'Interior Sequence',
      index: '05',
    },
  ];

  const paperBackground = {
    backgroundColor: '#FAF9F7',
    backgroundImage: `
      linear-gradient(90deg, rgba(255,255,255,0.28), rgba(231,228,219,0.2)),
      radial-gradient(circle at 28% 18%, rgba(255,255,255,0.62) 0%, transparent 34%),
      radial-gradient(circle at 72% 82%, rgba(202,198,187,0.24) 0%, transparent 44%),
      url("data:image/svg+xml,%3Csvg width='360' height='520' viewBox='0 0 360 520' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper' x='-20%25' y='-20%25' width='140%25' height='140%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.018 0.09' numOctaves='5' seed='8' stitchTiles='stitch' result='fiber'/%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.55' numOctaves='3' seed='17' result='grain'/%3E%3CfeBlend in='fiber' in2='grain' mode='multiply' result='mixed'/%3E%3CfeDiffuseLighting in='mixed' surfaceScale='2.2' lighting-color='%23ffffff' result='lit'%3E%3CfeDistantLight azimuth='45' elevation='58'/%3E%3C/feDiffuseLighting%3E%3CfeColorMatrix in='lit' type='matrix' values='0.78 0 0 0 0.15 0 0.76 0 0 0.14 0 0 0.70 0 0.12 0 0 0 0.26 0'/%3E%3C/filter%3E%3Crect width='360' height='520' fill='%23efede6'/%3E%3Crect width='360' height='520' filter='url(%23paper)' opacity='0.72'/%3E%3C/svg%3E")
    `,
    backgroundBlendMode: 'soft-light, screen, multiply, normal',
    backgroundSize: 'auto, auto, auto, 360px 520px',
    backgroundRepeat: 'repeat',
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const resetFrame = window.requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });

    return () => {
      window.cancelAnimationFrame(resetFrame);
    };
  }, [project.slug]);

  useEffect(() => {
    if (!heroSectionRef.current || !imageContainerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: 'top top',
          end: '+=150vh',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      // Animate image container from small framed card to full viewport
      tl.fromTo(
        imageContainerRef.current,
        {
          width: '480px',
          height: '300px',
          borderRadius: '4px',
          border: '1px solid rgba(30, 28, 24, 0.15)',
          padding: '4px',
        },
        {
          width: '100vw',
          height: '100vh',
          borderRadius: '0px',
          border: '0px solid transparent',
          padding: '0px',
          ease: 'power2.inOut',
        }
      );

      // Subtle zoom effect on the image itself
      tl.fromTo(
        imageContainerRef.current!.querySelector('img'),
        { scale: 1 },
        { scale: 1.05, ease: 'power2.out' },
        0
      );

      // Fade out the caption
      if (captionRef.current) {
        tl.to(
          captionRef.current,
          { opacity: 0, duration: 0.3 },
          0
        );
      }
    }, heroSectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#3D3D3A]">
      {/* Minimal navigation overlay */}
      <div className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex items-start justify-end pointer-events-none">
        <button
          onClick={() => router.push('/#projects')}
          className="group fixed top-8 left-8 z-50 inline-flex items-center gap-3 border border-[#E5E3DF] bg-[#FAF9F7]/70 px-4 py-2 font-[var(--font-dm-sans)] text-[11px] font-medium uppercase tracking-[0.18em] text-[#9E9B95] backdrop-blur-sm transition-all duration-300 hover:border-[#C8C5BF] hover:text-[#3D3D3A] pointer-events-auto"
        >
          <span className="block h-px w-4 bg-gold-primary/50 transition-all duration-300 ease-out group-hover:w-6 group-hover:bg-gold-primary" />
          Back
        </button>
        <div className="font-[var(--font-dm-sans)] text-[11px] font-medium uppercase tracking-[0.2em] text-[#9E9B95]">
          {project.category}
        </div>
      </div>

      {/* Phase 1: Scroll-Driven Image Expansion Hero - REFINED */}
      <section
        ref={heroSectionRef}
        className="relative w-full h-screen flex items-center justify-center overflow-hidden"
        style={paperBackground}
      >
        {/* Curated Frame - Gallery Presentation */}
        <div
          ref={imageContainerRef}
          className="relative overflow-hidden shadow-[0_18px_60px_rgba(30,28,24,0.10),0_2px_12px_rgba(30,28,24,0.04)]"
          style={{
            width: '520px',
            height: '340px',
            border: '1px solid rgba(30, 28, 24, 0.16)',
            borderRadius: '2px',
            padding: '14px',
            backgroundColor: '#fbf8f2',
          }}
        >
          <div className="w-full h-full relative overflow-hidden" style={{ border: '1px solid rgba(183, 149, 91, 0.22)' }}>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              style={{ transformOrigin: 'center center' }}
            />
          </div>
        </div>

        {/* Museum-style Caption */}
        <div
          ref={captionRef}
          className="absolute"
          style={{
            bottom: '22%',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
          }}
        >
          <div className="mb-2 font-[var(--font-dm-sans)] text-[11px] font-medium uppercase tracking-[0.18em] text-[#7c766d]">
            {project.category}
          </div>
          <div className="font-cormorant text-base font-semibold text-[#1e1c18] tracking-wide">
            {project.title}, {project.details.year}
          </div>
        </div>
      </section>

      {/* Phase 2: Content Sections */}
      
      {/* Project Identity Row - REFINED */}
      <section 
        className="relative pt-32 pb-20 px-6 md:px-16"
        style={paperBackground}
      >
        <SectionMarker number="01" label="Identity" />
        <div className="max-w-[1100px] mx-auto">
          {/* Dominant Title - Editorial Hierarchy */}
          <div className="mb-16">
            <div className="mb-5 font-[var(--font-dm-sans)] text-[11px] font-medium uppercase tracking-[0.18em] text-[#9E9B95]">
              {project.category} <span className="mx-2 text-[#C8C5BF]">-</span> {project.details.year}
            </div>
            <h1
              className="mb-10 flex flex-wrap gap-x-5 overflow-hidden font-cormorant font-semibold leading-[0.95] tracking-[-0.03em] text-[#1e1c18]"
              style={{ fontSize: 'clamp(4.5rem, 9vw, 8.2rem)' }}
            >
              {titleWords.map((word, index) => {
                const isLastWord = index === titleWords.length - 1;

                if (isLastWord) {
                  return (
                    <motion.em
                      key={`${word}-${index}`}
                      className="inline-block not-italic text-gold-primary [text-shadow:0_0_40px_rgba(201,169,110,0.3)]"
                      initial={{ opacity: 0, y: 40, textShadow: '0 0 0px rgba(201,169,110,0)' }}
                      animate={{ opacity: 1, y: 0, textShadow: '0 0 60px rgba(201,169,110,0.35)' }}
                      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1], textShadow: { delay: 0.8, duration: 1.2, ease: 'easeOut' } }}
                    >
                      {word}
                    </motion.em>
                  );
                }

                return (
                  <motion.span
                    key={`${word}-${index}`}
                    className="inline-block"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {word}
                  </motion.span>
                );
              })}
            </h1>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-[var(--font-dm-sans)] text-[11px] font-medium uppercase tracking-[0.18em]">
              <span className="text-[#6f6b63]">{project.category}</span>
              <span className="text-[#7a7060]/40">-</span>
              <span className="text-[#5f574c]">{project.details.location}</span>
            </div>
          </div>

          {/* Supporting Metadata - Quieter, Secondary */}
          <div className="grid max-w-5xl grid-cols-2 border-y border-[#E5E3DF] md:grid-cols-4">
            {statItems.map((item, index) => (
              <div key={item.label} className={`py-6 ${index > 0 ? 'md:border-l md:border-[#E5E3DF] md:pl-8' : ''} ${index % 2 === 1 ? 'border-l border-[#E5E3DF] pl-6 md:pl-8' : ''}`}>
                <div className={`font-cormorant text-4xl font-light leading-none md:text-5xl ${/\d/.test(item.value) ? 'text-gold-light' : 'text-[#1e1c18]'}`}>
                  {item.value}
                </div>
                <div className="mt-4 font-[var(--font-dm-sans)] text-[10px] font-medium uppercase tracking-[0.2em] text-[#9E9B95]">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Refined Hairline */}
          <div className="mt-20 h-px w-full bg-[#E5E3DF]"></div>
        </div>
      </section>

      {/* Editorial Narrative - REFINED */}
      <section className="relative py-24 md:py-32 px-6 md:px-16 pb-32 md:pb-40" style={paperBackground}>
        <SectionMarker number="02" label="Narrative" />
        <div className="max-w-[1100px] mx-auto">
          {/* Editorial Layout - Left-aligned, Not Centered */}
          <div className="max-w-[760px]">
            <div className="mb-8 font-[var(--font-dm-sans)] text-[11px] font-medium uppercase tracking-[0.18em] text-[#9E9B95]">
              <span className="mr-2 font-cormorant text-xl font-light text-gold-primary/60">02</span>
              <span>Narrative</span>
            </div>
            
            <motion.div
              className="mb-12 flex max-w-[75%] items-center gap-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-block h-12 w-[2px] shrink-0 bg-[#E5E3DF]" />
              <h2 className="font-cormorant font-light italic leading-[1.08] tracking-[-0.01em] text-[#1e1c18]" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
                Where restraint meets{' '}
                <span className="text-gold-primary italic [text-shadow:0_0_30px_rgba(201,169,110,0.2)]">
                  resolution.
                </span>
              </h2>
            </motion.div>
            
            <div className="space-y-7 font-[var(--font-dm-sans)] text-[15px] font-light leading-[1.75] text-[#3D3D3A] md:text-[16px]" style={{ maxWidth: '65ch' }}>
              <p className="first-letter:text-6xl first-letter:font-cormorant first-letter:font-light first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#1e1c18]">
                {project.description}
              </p>
              <p>
                The architectural narrative unfolds through deliberate spatial sequencing, where each volume responds to both context and function. Materials were chosen not for novelty but for their inherent qualities-texture, weight, and the way light transforms their surfaces throughout the day.
              </p>
              <p>
                This project embodies a philosophy of measured intervention, where design serves as a framework for living rather than an imposition upon it. The result is a space that feels both timeless and entirely of its moment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Gallery - Text-Driven Image Reveal */}
      <ProjectGallery images={galleryImages} />

      {/* Concept & Process - REFINED Editorial Balance */}
      <section className="relative py-24 md:py-36 px-6 md:px-16 overflow-hidden" style={paperBackground}>
        <SectionMarker number="04" label="Process" />
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Text Column - Stronger Typography */}
            <div className="lg:col-span-6 space-y-14">
              <div>
                <div className="mb-5 font-[var(--font-dm-sans)] text-[11px] font-medium uppercase tracking-[0.18em] text-[#9E9B95]">
                  <span className="mr-2 font-cormorant text-xl font-light text-gold-primary/60">04</span>
                  <span>Design Intent</span>
                </div>
                <h3 className="text-3xl md:text-[2.65rem] font-cormorant font-semibold text-[#1e1c18] leading-[1.15] mb-7 tracking-[-0.005em]" style={{ maxWidth: '20ch' }}>
                  A study in spatial{' '}
                  <span className="text-gold-primary">restraint</span>
                </h3>
                <div className="space-y-5 font-[var(--font-dm-sans)] text-[15px] font-light text-[#3D3D3A] leading-[1.75]" style={{ maxWidth: '58ch' }}>
                  <p>
                    The design strategy centered on establishing clear sightlines and volumetric hierarchy. By compressing certain passages and expanding others, we crafted a choreography of movement that reveals the project gradually rather than all at once.
                  </p>
                  <p>
                    Natural light became a primary material, shaped and directed through carefully positioned apertures. Each opening serves a specific purpose-framing views, marking time, or simply animating a wall surface.
                  </p>
                </div>
              </div>

              <div>
                <div className="mb-5 font-[var(--font-dm-sans)] text-[11px] font-medium uppercase tracking-[0.18em] text-[#9E9B95]">
                  <span className="mr-2 font-cormorant text-xl font-light text-gold-primary/60">05</span>
                  <span>Materiality</span>
                </div>
                <div className="space-y-5 font-[var(--font-dm-sans)] text-[15px] font-light text-[#3D3D3A] leading-[1.75]" style={{ maxWidth: '58ch' }}>
                  <p>
                    The material palette privileges tactility over spectacle. Raw concrete, honed limestone, and oiled oak establish a baseline of authenticity, while bronze detailing provides moments of warmth and refinement. These choices reflect an architecture of substance rather than surface.
                  </p>
                </div>
              </div>
            </div>

            {/* Image Column - Equal Visual Weight */}
            <div className="lg:col-span-6">
              <div className="relative w-full aspect-[3/4] lg:aspect-[4/5] lg:sticky lg:top-24">
                <img
                  src={project.image}
                  alt={`${project.title} material detail`}
                  className="w-full h-full object-cover shadow-[0_18px_60px_rgba(30,28,24,0.12)]"
                  style={{ 
                    border: '1px solid rgba(30, 28, 24, 0.14)',
                    padding: '10px',
                    backgroundColor: '#fbf8f2'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cinematic Still - REFINED (Subtle Enhancement) */}
      <section className="relative w-full h-[450px] md:h-[650px] overflow-hidden bg-[#111110]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${project.image})`, backgroundAttachment: 'fixed' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/55"></div>
        </div>
        <div className="pointer-events-none absolute left-8 top-4 font-cormorant text-[20rem] leading-none text-white/5">
          &ldquo;
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <motion.blockquote
            className="font-cormorant font-light italic text-white/90 leading-[1.15] max-w-5xl tracking-[-0.01em]" 
            style={{ 
              fontSize: 'clamp(2.25rem, 5vw, 4rem)',
              textShadow: '0 4px 24px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.5)'
            }}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-gold-muted">&ldquo;Architecture</span> is the thoughtful making of space.&rdquo;
          </motion.blockquote>
          <div className="mt-8 font-[var(--font-dm-sans)] text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
            Vaastu Architecture
          </div>
        </div>
      </section>

      {/* Curated Continuation - REFINED (Show Other Projects) */}
      <section className="relative w-full py-24 md:py-36 bg-[#111110] px-6 md:px-16">
        <SectionMarker number="06" label="Continue" dark />
        <div className="max-w-[1100px] mx-auto">
          <div className="mb-16">
            <div className="text-[0.66rem] font-lato font-bold uppercase tracking-[0.28em] text-white/40 mb-4">
              <span className="text-gold-primary/60 mr-1">06</span>
              <span>Continue</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-cormorant font-semibold text-[#f5f0e8] tracking-[-0.005em]">
              Selected Work
            </h2>
          </div>

          {/* Other Projects Grid - Homepage Card Style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROJECTS.filter(p => p.slug !== project.slug)
              .slice(0, 3)
              .map((relatedProject, idx) => (
                <div 
                  key={relatedProject.id}
                  className="group cursor-pointer"
                  style={{ 
                    transform: `translateY(${idx * 20}px)`,
                    transition: 'transform 0.4s ease'
                  }}
                  onClick={() => router.push(`/projects/${relatedProject.slug}`)}
                >
                  {/* Card Container */}
                  <div className="relative w-full aspect-[3/4] overflow-hidden">
                    {/* Project Image */}
                    <img
                      src={relatedProject.image}
                      alt={relatedProject.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Subtle Overlay Shadow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-85 pointer-events-none" />

                    {/* Slide-Up Lower-Third Banner (Homepage Style) */}
                    <div 
                      className="absolute bottom-0 left-0 w-full h-[30%] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between px-6 py-4 pointer-events-none overflow-hidden"
                      style={{ 
                        backgroundColor: relatedProject.color,
                      }}
                    >
                      {/* Project Details */}
                      <div className="flex flex-col justify-between h-full z-10 text-white select-none">
                        <div>
                          <h4 className="font-cormorant text-lg md:text-xl font-medium tracking-wide leading-tight text-white/95">
                            {relatedProject.title}
                          </h4>
                        </div>
                        <div>
                          <p className="font-lato text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-white/70">
                            {relatedProject.category}
                          </p>
                        </div>
                      </div>

                      {/* Embossed Logo */}
                      <div 
                        className="absolute right-[-10px] bottom-[-15px] font-cormorant text-[48px] md:text-[68px] text-white/5 select-none pointer-events-none leading-none tracking-widest font-extrabold uppercase"
                        style={{
                          fontFamily: 'var(--font-cormorant), serif',
                          textShadow: '1px 1px 1px rgba(255, 255, 255, 0.08), -1px -1px 2px rgba(0, 0, 0, 0.45)',
                          mixBlendMode: 'overlay',
                        }}
                      >
                        VAÎ›STU
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Minimal CTA - REFINED */}
      <section className="relative py-20 px-6 md:px-16" style={paperBackground}>
        <SectionMarker number="07" label="Inquire" />
        <div className="max-w-[1100px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="font-[var(--font-dm-sans)] text-[11px] font-medium uppercase tracking-[0.18em] text-[#9E9B95] mb-3">
                Start a Conversation
              </div>
              <p className="font-[var(--font-dm-sans)] text-base font-light text-[#3D3D3A] max-w-md leading-relaxed">
                Interested in working together on your next project?
              </p>
            </div>
            <button
              onClick={() => router.push('/#contact')}
              className="inline-flex items-center gap-3 font-[var(--font-dm-sans)] text-[11px] font-medium uppercase tracking-[0.2em] text-[#3D3D3A] hover:text-[#6f6b63] transition-colors group"
            >
              <span className="border-b border-[#C8C5BF] group-hover:border-[#3D3D3A] pb-0.5 transition-colors">
                Inquire
              </span>
              <span className="text-[#9E9B95] transform group-hover:translate-x-1 transition-transform">-&gt;</span>
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
