import React, { useRef } from "react";
import { Button } from "../ui/Button";
import { InteractivePreview } from "../ui/InteractivePreview";
import { ArrowUpRight, Code2, Zap, Sparkles } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      // Reveal title lines
      gsap.fromTo(
        ".projects-title-line",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".projects-header",
            start: "top 80%",
          },
        }
      );

      // Reveal cards
      gsap.fromTo(
        ".project-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 80%",
          },
        }
      );

      // Interactive 3D Card Tilt & Specular Light (desktop only)
      if (window.innerWidth > 768) {
        const cards = gsap.utils.toArray<HTMLElement>(".project-card");
        cards.forEach((card) => {
          gsap.set(card, { transformPerspective: 1400, transformStyle: "preserve-3d" });
          const rotateXTo = gsap.quickTo(card, "rotationX", { duration: 0.55, ease: "power2.out" });
          const rotateYTo = gsap.quickTo(card, "rotationY", { duration: 0.55, ease: "power2.out" });
          const sheen = card.querySelector<HTMLElement>(".card-sheen");
          const isDarkCard = () => {
            if (card.classList.contains("bg-[#0a0a0a]") || card.classList.contains("bg-[#111111]")) return true;
            return document.documentElement.classList.contains("dark");
          };

          const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const relX = (e.clientX - rect.left) / rect.width - 0.5;
            const relY = (e.clientY - rect.top) / rect.height - 0.5;

            // Subtle, physical tilt
            rotateXTo(-relY * 2.8);
            rotateYTo(relX * 2.8);

            if (sheen) {
              const px = e.clientX - rect.left;
              const py = e.clientY - rect.top;
              const dark = isDarkCard();
              const color = dark ? "rgba(255, 255, 255, 0.035)" : "rgba(0, 0, 0, 0.02)";
              sheen.style.background = `radial-gradient(circle 420px at ${px}px ${py}px, ${color}, transparent 70%)`;
              sheen.style.opacity = "1";
            }
          };

          const handleMouseLeave = () => {
            rotateXTo(0);
            rotateYTo(0);
            if (sheen) {
              sheen.style.opacity = "0";
            }
          };

          card.addEventListener("mousemove", handleMouseMove);
          card.addEventListener("mouseleave", handleMouseLeave);
        });

        // Magnetic attraction for Card 02 CTA button
        const cardCta = document.querySelector<HTMLElement>(".project-cta-btn");
        if (cardCta) {
          const ctaXTo = gsap.quickTo(cardCta, "x", { duration: 0.7, ease: "power3.out" });
          const ctaYTo = gsap.quickTo(cardCta, "y", { duration: 0.7, ease: "power3.out" });

          cardCta.addEventListener("mousemove", (e) => {
            const rect = cardCta.getBoundingClientRect();
            const relX = e.clientX - (rect.left + rect.width / 2);
            const relY = e.clientY - (rect.top + rect.height / 2);
            ctaXTo(relX * 0.3);
            ctaYTo(relY * 0.3);
          });

          cardCta.addEventListener("mouseleave", () => {
            ctaXTo(0);
            ctaYTo(0);
          });
        }
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="projetos"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#f8f8f8] dark:bg-[#080808] text-neutral-950 dark:text-white py-24 md:py-40 overflow-hidden transition-colors duration-300"
    >
      {/* Editorial grid lines */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 bottom-0 left-[8%] w-[1px] bg-neutral-200/40 dark:bg-neutral-800/40 hidden md:block" />
        <div className="absolute top-0 bottom-0 right-[8%] w-[1px] bg-neutral-200/40 dark:bg-neutral-800/40 hidden md:block" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-12 relative z-10">
        
        {/* HEADER: Giant Title */}
        <div className="projects-header flex flex-col items-center md:items-start w-full mb-16 md:mb-28">
          <span className="font-mono text-xs font-bold tracking-[0.2em] text-neutral-500 dark:text-neutral-400 uppercase block mb-4">
            {t.projects.sectionTag}
          </span>
          <h2 className="w-full text-center md:text-left flex flex-col">
            <span className="overflow-hidden block">
              <span className="projects-title-line block font-display font-black text-[clamp(3.2rem,8.5vw,8.5rem)] leading-[0.96] tracking-tighter uppercase text-neutral-950 dark:text-white pt-2 pb-2 md:pt-4 md:pb-3">
                {t.projects.title1}
              </span>
            </span>
            <span className="overflow-hidden block md:ml-8 lg:ml-16">
              <span className="projects-title-line block font-display font-black text-[clamp(3.2rem,8.5vw,8.5rem)] leading-[0.96] tracking-tighter uppercase text-neutral-400 dark:text-neutral-500 pt-2 pb-2 md:pt-4 md:pb-3">
                {t.projects.title2}
              </span>
            </span>
          </h2>

          <p className="mt-8 md:mt-12 text-center md:text-left text-lg md:text-2xl font-sans font-light text-neutral-700 dark:text-neutral-300 max-w-2xl md:ml-12 lg:ml-24 tracking-wide">
            {t.projects.subtitle}
          </p>
        </div>

        {/* PROJECTS GRID */}
        <div className="projects-grid flex flex-col gap-12 md:gap-20">

          {/* ── PROJECT 01: HERO CASE STUDY ── */}
          <article className="project-card relative w-full bg-white dark:bg-[#111111] border border-neutral-200/90 dark:border-neutral-800/90 shadow-[0_4px_30px_rgba(0,0,0,0.02)] transition-shadow duration-500 hover:shadow-[0_12px_45px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="card-sheen pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300" aria-hidden="true" />
            
            {/* Top Bar / Catalog Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 px-6 md:px-12 py-5 border-b border-neutral-200/80 dark:border-neutral-800/80 bg-[#fafafa] dark:bg-[#161616]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-black tracking-[0.18em] text-neutral-950 dark:text-white uppercase">
                  {t.projects.p1.tag}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white" aria-hidden="true" />
                <span className="font-mono text-xs font-bold tracking-wider text-neutral-600 dark:text-neutral-400 uppercase">
                  {t.projects.p1.category}
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-neutral-800 dark:text-neutral-200">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
                <span className="uppercase font-bold tracking-wider">{t.projects.p1.status}</span>
              </div>
            </div>

            {/* Main Content: Two Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 md:p-12 items-center">
              
              {/* Left Column: Visual Vector Interactive Preview (Col 1-7) */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <InteractivePreview />
              </div>

              {/* Right Column: Case Story, Tech Specs & Actions (Col 8-12) */}
              <div className="lg:col-span-5 flex flex-col items-start gap-6">
                
                <div>
                  <h3 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tight text-neutral-950 dark:text-white">
                    {t.projects.p1.title}
                  </h3>
                  <p className="font-mono text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mt-1.5">
                    {t.projects.p1.subtitle}
                  </p>
                </div>

                <p className="font-sans text-base md:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed font-light">
                  {t.projects.p1.description}
                </p>

                {/* Destaques do Projeto */}
                <div className="grid grid-cols-2 gap-6 w-full border-y border-neutral-200/90 dark:border-neutral-800/90 py-5">
                  <div>
                    <span className="font-mono text-neutral-500 dark:text-neutral-400 block text-xs font-bold uppercase tracking-wider">{t.projects.p1.feature1Label}</span>
                    <span className="font-display font-black text-neutral-950 dark:text-white text-base md:text-lg">{t.projects.p1.feature1Value}</span>
                    <span className="font-sans text-neutral-600 dark:text-neutral-400 block text-xs mt-0.5">{t.projects.p1.feature1Desc}</span>
                  </div>
                  <div>
                    <span className="font-mono text-neutral-500 dark:text-neutral-400 block text-xs font-bold uppercase tracking-wider">{t.projects.p1.feature2Label}</span>
                    <span className="font-display font-black text-neutral-950 dark:text-white text-base md:text-lg">{t.projects.p1.feature2Value}</span>
                    <span className="font-sans text-neutral-600 dark:text-neutral-400 block text-xs mt-0.5">{t.projects.p1.feature2Desc}</span>
                  </div>
                </div>

                {/* Tags de Foco */}
                <div className="flex flex-wrap gap-2">
                  {["React 19", "TypeScript", "Tailwind CSS", "GSAP & Lenis"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3.5 py-1.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-950 dark:text-neutral-200 text-xs font-mono font-bold rounded-full border border-neutral-300 dark:border-neutral-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button
                    label={t.projects.p1.repoBtn}
                    href="https://github.com/Fellipeeduardodev/Portfolio-fellipe-v2"
                    variant="primary"
                    showArrow={true}
                  />
                  <a
                    href="#hero"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border-2 border-neutral-300 dark:border-neutral-700 hover:border-neutral-950 dark:hover:border-white text-neutral-950 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-900 font-bold text-sm transition-all duration-300 font-sans"
                  >
                    <span>{t.projects.p1.liveBtn}</span>
                    <ArrowUpRight size={15} />
                  </a>
                </div>

              </div>

            </div>
          </article>

          {/* ── PROJECT 02: CREATIVE COLLABORATION CARD ── */}
          <article className="project-card relative w-full bg-[#0a0a0a] text-white border border-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden">
            <div className="card-sheen pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300" aria-hidden="true" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-8 md:p-14 items-center relative z-10">
              
              {/* Left Content (Col 1-8) */}
              <div className="lg:col-span-8 flex flex-col items-start gap-6">
                
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-black tracking-[0.2em] text-neutral-400 uppercase">
                    {t.projects.p2.tag}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
                  <span className="font-mono text-xs font-bold tracking-wider text-neutral-300 uppercase">
                    {t.projects.p2.badge}
                  </span>
                </div>

                <h3 className="font-display font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tighter text-white leading-[1.06]">
                  {t.projects.p2.title}
                </h3>

                <p className="font-sans text-base md:text-lg text-neutral-300 leading-relaxed max-w-2xl font-light">
                  {t.projects.p2.description}
                </p>

                <div className="flex flex-wrap gap-4 text-xs font-mono text-neutral-400 pt-2">
                  <span className="flex items-center gap-2">
                    <Sparkles size={14} className="text-white" />
                    {t.projects.p2.bullet1}
                  </span>
                  <span className="flex items-center gap-2">
                    <Code2 size={14} className="text-white" />
                    {t.projects.p2.bullet2}
                  </span>
                  <span className="flex items-center gap-2">
                    <Zap size={14} className="text-white" />
                    {t.projects.p2.bullet3}
                  </span>
                </div>

              </div>

              {/* Right CTA Block (Col 9-12) */}
              <div className="lg:col-span-4 flex flex-col sm:items-start lg:items-end justify-center pt-4 lg:pt-0">
                <a
                  href="https://wa.me/5511961131382"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t.projects.p2.cta} via WhatsApp (abre em nova aba)`}
                  className="project-cta-btn group inline-flex items-center gap-4 px-9 py-5 bg-white text-black hover:bg-neutral-200 active:scale-[0.98] rounded-full transition-all duration-300 font-mono text-xs md:text-sm font-bold tracking-widest uppercase shadow-[0_10px_35px_rgba(255,255,255,0.06)]"
                >
                  <span>{t.projects.p2.cta}</span>
                  <span className="inline-block transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" aria-hidden="true">↗</span>
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </div>

            </div>
          </article>

        </div>

      </div>
    </section>
  );
};
