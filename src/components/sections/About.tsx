import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Title reveal
      gsap.fromTo(
        ".about-title-line",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".about-header",
            start: "top 80%",
          },
        }
      );

      // Portrait reveal with clip path
      gsap.fromTo(
        ".about-portrait-wrapper",
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-portrait-wrapper",
            start: "top bottom",
          },
        }
      );

      // Portrait image subtle parallax scale
      gsap.fromTo(
        ".about-portrait-img",
        { scale: 1.2 },
        {
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-portrait-wrapper",
            start: "top bottom",
          },
        }
      );

      // Text reveal
      gsap.fromTo(
        ".about-text",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-text-container",
            start: "top 80%",
          },
        }
      );

      // Identity blocks
      gsap.fromTo(
        ".about-block",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-blocks-container",
            start: "top 85%",
          },
        }
      );

      // Stats reveal
      gsap.fromTo(
        ".about-stat",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-stats-container",
            start: "top 90%",
          },
        }
      );


    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-white text-neutral-950 py-24 md:py-40 overflow-hidden"
    >
      {/* Editorial grid lines */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 bottom-0 left-[8%] w-[1px] bg-neutral-200/30 hidden md:block" />
        <div className="absolute top-0 bottom-0 right-[8%] w-[1px] bg-neutral-200/30 hidden md:block" />
        
        {/* Margin Label */}
        <span className="absolute top-[15%] left-[8.5%] font-mono text-[9px] tracking-[0.2em] text-neutral-400 uppercase hidden lg:block">
          [ 03 // ABOUT ]
        </span>
      </div>
      <div className="max-w-[1400px] mx-auto px-4 md:px-12">
        {/* HEADER: Giant Title */}
        <div className="about-header flex flex-col items-center md:items-start w-full mb-20 md:mb-32">
          <h2 className="w-full text-center md:text-left flex flex-col">
            <span className="overflow-hidden block">
              <span className="about-title-line block font-display font-black text-[clamp(3.5rem,12vw,11rem)] leading-[0.9] tracking-tighter uppercase text-neutral-950 pb-2">
                POR TRÁS
              </span>
            </span>
            <span className="overflow-hidden block md:ml-12 lg:ml-24">
              <span className="about-title-line block font-display font-black text-[clamp(3.5rem,12vw,11rem)] leading-[0.9] tracking-tighter uppercase text-neutral-300 pb-2">
                DA INTERFACE
              </span>
            </span>
          </h2>
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          {/* PORTRAIT */}
          <div className="lg:col-span-5 w-full order-2 lg:order-1">
            <div className="about-portrait-wrapper w-full aspect-[3/4] md:aspect-[4/5] overflow-hidden bg-neutral-100 relative">
              <img 
                src="/fellipe-image.webp" 
                alt="Retrato de Fellipe Eduardo"
                loading="eager"
                width="600"
                height="750"
                className="about-portrait-img w-full h-full object-cover filter grayscale contrast-125 brightness-90"
              />
            </div>
          </div>

          {/* TEXT & IDENTITY BLOCKS */}
          <div className="lg:col-span-7 flex flex-col pt-8 md:pt-12 order-1 lg:order-2">
            
            {/* INTRO TEXT */}
            <div className="about-text-container flex flex-col gap-6 md:gap-8 mb-20 md:mb-32 max-w-2xl">
              <p className="about-text text-2xl md:text-3xl lg:text-4xl font-display font-medium leading-tight text-neutral-950 tracking-tight">
                Meu nome é Fellipe Eduardo.
              </p>
              <p className="about-text text-xl md:text-2xl font-sans font-light leading-relaxed text-neutral-600">
                Sou desenvolvedor frontend e apaixonado por criar experiências digitais que unem design, performance e funcionalidade.
              </p>
              <p className="about-text text-xl md:text-2xl font-sans font-light leading-relaxed text-neutral-600">
                Acredito que tecnologia não deve apenas funcionar.<br className="hidden md:block" />
                Ela deve ser intuitiva, acessível e <span className="text-neutral-950 font-medium">memorável</span>.
              </p>
            </div>

            {/* IDENTITY BLOCKS */}
            <div className="about-blocks-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 border-t border-neutral-200 pt-16">
              
              <div className="about-block flex flex-col gap-4">
                <span className="font-mono text-xs tracking-widest text-neutral-400 uppercase font-semibold">Based In</span>
                <p className="font-sans text-base md:text-lg text-neutral-950">São Paulo, Brasil</p>
              </div>

              <div className="about-block flex flex-col gap-4">
                <span className="font-mono text-xs tracking-widest text-neutral-400 uppercase font-semibold">Focus</span>
                <ul className="font-sans text-base md:text-lg text-neutral-950 space-y-2">
                  <li>Frontend Development</li>
                  <li>Creative Development</li>
                  <li>UX/UI</li>
                </ul>
              </div>

              <div className="about-block flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
                <span className="font-mono text-xs tracking-widest text-neutral-400 uppercase font-semibold">Currently</span>
                <p className="font-sans text-base md:text-lg text-neutral-950 leading-relaxed">
                  Aprofundando conhecimentos em arquitetura frontend, motion design e produtos digitais.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* EDITORIAL STATS */}
        <div className="about-stats-container mt-24 md:mt-40 border-t border-b border-neutral-200 py-16 md:py-24 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
          
          <div className="about-stat flex flex-col items-center text-center px-4 pt-10 md:pt-0 first:pt-0 first:border-t-0">
            <span className="font-display font-black text-6xl md:text-8xl text-neutral-950 tracking-tighter mb-4">
              18
            </span>
            <span className="font-mono text-xs md:text-sm tracking-widest text-neutral-500 uppercase font-semibold">
              Anos
            </span>
          </div>

          <div className="about-stat flex flex-col items-center text-center px-4 pt-10 md:pt-0">
            <span className="font-display font-black text-6xl md:text-8xl text-neutral-950 tracking-tighter mb-4">
              1<span className="text-4xl md:text-6xl text-neutral-400">+</span>
            </span>
            <span className="font-mono text-xs md:text-sm tracking-widest text-neutral-500 uppercase font-semibold max-w-[200px]">
              Ano Estudando Desenvolvimento Web
            </span>
          </div>

          <div className="about-stat flex flex-col items-center text-center px-4 pt-10 md:pt-0">
            <span className="font-display font-black text-6xl md:text-8xl text-neutral-950 tracking-tighter mb-4">
              ∞
            </span>
            <span className="font-mono text-xs md:text-sm tracking-widest text-neutral-500 uppercase font-semibold max-w-[200px]">
              Curiosidade Por Tecnologia
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
