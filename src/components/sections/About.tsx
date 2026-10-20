import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Sparkles, BookOpen, Code2, ArrowUpRight, FileText } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const technicalStack = [
  "React",
  "TypeScript",
  "Tailwind",
  "HTML",
  "CSS",
  "Python",
  "Figma",
  "SQL",
  "Git e GitHub",
];

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      // Title reveal
      gsap.fromTo(
        ".about-title-line",
        { y: "100%", opacity: 0 },
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

      // Text reveal
      gsap.fromTo(
        ".about-text",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-text-container",
            start: "top 80%",
          },
        }
      );

      // Courses section header reveal
      gsap.fromTo(
        ".about-courses-header",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-courses-section",
            start: "top 85%",
          },
        }
      );

      // Courses cards reveal
      gsap.fromTo(
        ".about-course-card",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-courses-list",
            start: "top 95%",
          },
        }
      );

      // Stacks chips reveal
      gsap.fromTo(
        ".about-tech-chip",
        { opacity: 0, y: 14, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.035,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-tech-container",
            start: "top 90%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const courses = t.about.courses;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-white dark:bg-[#0a0a0a] text-neutral-950 dark:text-white py-24 md:py-40 overflow-hidden transition-colors duration-300"
    >
      {/* Editorial grid lines */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 bottom-0 left-[8%] w-[1px] bg-neutral-200/30 dark:bg-neutral-800/30 hidden md:block" />
        <div className="absolute top-0 bottom-0 right-[8%] w-[1px] bg-neutral-200/30 dark:bg-neutral-800/30 hidden md:block" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-12 relative z-10">
        
        {/* HEADER: Giant Title */}
        <div className="about-header flex flex-col items-center md:items-start w-full mb-16 md:mb-28">
          <span className="font-mono text-xs font-bold tracking-[0.2em] text-neutral-500 dark:text-neutral-400 uppercase block mb-4">
            {t.about.sectionTag}
          </span>
          <h2 className="w-full text-center md:text-left flex flex-col">
            <span className="overflow-hidden block">
              <span className="about-title-line block font-display font-black text-[clamp(3.2rem,8.5vw,8.5rem)] leading-[0.96] tracking-tighter uppercase text-neutral-950 dark:text-white pt-2 pb-2 md:pt-4 md:pb-3">
                {t.about.title1}
              </span>
            </span>
            <span className="overflow-hidden block md:ml-8 lg:ml-16">
              <span className="about-title-line block font-display font-black text-[clamp(3.2rem,8.5vw,8.5rem)] leading-[0.96] tracking-tighter uppercase text-neutral-400 dark:text-neutral-600 pt-2 pb-2 md:pt-4 md:pb-3">
                {t.about.title2}
              </span>
            </span>
          </h2>
          <p className="mt-8 md:mt-12 text-center md:text-left text-lg md:text-2xl font-sans font-light text-neutral-700 dark:text-neutral-300 max-w-2xl md:ml-8 lg:ml-16 tracking-wide">
            {t.about.subtitle}
          </p>
        </div>

        {/* ──── BLOCO 1: FOTO & NARRATIVA PESSOAL ──── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start pb-24 border-b border-neutral-200/80 dark:border-neutral-800/80">
          
          {/* Portrait & Quick Badges */}
          <div className="lg:col-span-5 w-full flex flex-col gap-6">
            <div className="about-portrait-wrapper w-full aspect-[3/4] md:aspect-[4/5] overflow-hidden bg-neutral-100 dark:bg-neutral-900 relative shadow-[0_12px_40px_rgba(0,0,0,0.06)] group">
              <img 
                src="/fellipe-image.webp" 
                alt="Retrato de Fellipe Eduardo"
                loading="lazy"
                width="600"
                height="750"
                onLoad={() => ScrollTrigger.refresh()}
                className="about-portrait-img w-full h-full object-cover filter grayscale contrast-135 brightness-95 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Quick Profile Meta */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-[#fafafa] dark:bg-[#121212] border border-neutral-300 dark:border-neutral-800 font-mono text-xs">
              <span className="font-bold uppercase tracking-wider text-neutral-950 dark:text-white">
                {t.about.photoMetaLabel}
              </span>
              <span className="text-neutral-600 dark:text-neutral-400 font-bold">
                {t.about.photoMetaAge}
              </span>
            </div>
          </div>

          {/* Personal Bio Narrative */}
          <div className="lg:col-span-7 flex flex-col pt-2 md:pt-4">
            
            <div className="about-text-container flex flex-col gap-6 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-neutral-600 dark:text-neutral-400 uppercase">
                <Sparkles size={14} className="text-neutral-950 dark:text-white" />
                <span>{t.about.bioLabel}</span>
              </div>

              <h3 className="about-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black leading-[1.08] text-neutral-950 dark:text-white tracking-tighter">
                {t.about.bioHeading}
              </h3>

              <p className="about-text text-base md:text-lg font-sans font-light leading-relaxed text-neutral-800 dark:text-neutral-300">
                {t.about.bio1}
              </p>

              <p className="about-text text-base md:text-lg font-sans font-light leading-relaxed text-neutral-800 dark:text-neutral-300">
                {t.about.bio2}
              </p>

              {/* Download CV CTA */}
              <div className="about-text pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="https://www.linkedin.com/in/fellipeedudev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-950 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm"
                >
                  <FileText size={15} />
                  <span>{t.about.downloadCv}</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

            {/* Quick Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 mt-8 border-t-2 border-neutral-200 dark:border-neutral-800">
              <div>
                <span className="font-mono text-[11px] tracking-widest text-neutral-600 dark:text-neutral-400 uppercase font-bold block mb-1">
                  {t.about.pillar1Label}
                </span>
                <p className="font-display font-black text-neutral-950 dark:text-white text-base">
                  {t.about.pillar1Val}
                </p>
                <p className="font-sans text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                  {t.about.pillar1Sub}
                </p>
              </div>
              <div>
                <span className="font-mono text-[11px] tracking-widest text-neutral-600 dark:text-neutral-400 uppercase font-bold block mb-1">
                  {t.about.pillar2Label}
                </span>
                <p className="font-display font-black text-neutral-950 dark:text-white text-base">
                  {t.about.pillar2Val}
                </p>
                <p className="font-sans text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                  {t.about.pillar2Sub}
                </p>
              </div>
              <div>
                <span className="font-mono text-[11px] tracking-widest text-neutral-600 dark:text-neutral-400 uppercase font-bold block mb-1">
                  {t.about.pillar3Label}
                </span>
                <p className="font-display font-black text-neutral-950 dark:text-white text-base">
                  {t.about.pillar3Val}
                </p>
                <p className="font-sans text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                  {t.about.pillar3Sub}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* ──── BLOCO 2: FORMAÇÃO & CURSOS GUIADOS ──── */}
        <div className="about-courses-section pt-16 md:pt-24">
          <div className="about-courses-header flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-4">
            <div>
              <span className="font-mono text-xs font-bold tracking-[0.2em] text-neutral-500 dark:text-neutral-400 uppercase block mb-2">
                {t.about.eduTag}
              </span>
              <h3 className="font-display font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tighter text-neutral-950 dark:text-white">
                {t.about.eduTitle}
              </h3>
            </div>
            <a
              href="https://www.linkedin.com/in/fellipeedudev/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs text-neutral-950 dark:text-neutral-200 hover:text-black dark:hover:text-white font-bold uppercase tracking-wider group"
            >
              <span>{t.about.eduLink}</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Courses List - Stacked Vertically */}
          <div className="about-courses-list flex flex-col gap-4 md:gap-5">
            {courses.map((course, idx) => (
              <div
                key={course.institution + course.course}
                className={`about-course-card p-6 md:p-8 rounded-2xl border transition-[background-color,border-color,box-shadow] duration-200 flex flex-col md:flex-row md:items-center justify-between gap-6 group ${
                  course.featured
                    ? "bg-[#fafcf8] dark:bg-[#0c1611] border-2 border-emerald-500/60 dark:border-emerald-500/40 shadow-[0_12px_40px_rgba(16,185,129,0.08)] ring-2 ring-emerald-500/20"
                    : "bg-[#fafafa] dark:bg-[#121212] border border-neutral-300 dark:border-neutral-800 hover:bg-white dark:hover:bg-[#181818] hover:border-neutral-950/40 dark:hover:border-neutral-600 hover:shadow-[0_10px_35px_rgba(0,0,0,0.05)]"
                }`}
              >
                {/* Left: Step / Period Column */}
                <div className="flex items-center md:items-start md:flex-col gap-3 md:gap-1 min-w-[150px]">
                  <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors duration-300 uppercase tracking-widest font-black">
                    0{idx + 1} // {t.about.phaseLabel}
                  </span>
                  <span className={`font-mono text-xs font-bold tracking-wider ${course.featured ? "text-emerald-700 dark:text-emerald-400" : "text-neutral-800 dark:text-neutral-200"}`}>
                    {course.period}
                  </span>
                </div>

                {/* Center: Details */}
                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black tracking-wider uppercase text-neutral-950 dark:text-white flex items-center gap-2">
                      {course.featured ? (
                        <GraduationCap size={17} className="text-emerald-600" />
                      ) : (
                        <BookOpen size={15} className="text-neutral-700 dark:text-neutral-300" />
                      )}
                      {course.institution}
                    </span>
                    <span className="text-neutral-400 font-mono">·</span>
                    <span className="font-mono text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      {course.type}
                    </span>
                  </div>

                  <h4 className="font-display font-black text-xl md:text-2xl text-neutral-950 dark:text-white leading-snug transition-transform duration-300 group-hover:translate-x-1.5">
                    {course.course}
                  </h4>

                  <p className="font-sans text-xs md:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-light max-w-2xl">
                    {course.focus}
                  </p>
                </div>

                {/* Right: Emphasized Badge & Link */}
                <div className="flex items-center md:flex-col md:items-end justify-between md:justify-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-neutral-200/60 dark:border-neutral-800/60 min-w-[190px]">
                  {course.featured ? (
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border border-emerald-500/60 dark:border-emerald-500/40 font-mono text-xs font-black tracking-wider uppercase shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                      {course.badge}
                    </span>
                  ) : course.statusType === "progress" ? (
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-400 dark:border-amber-500/50 font-mono text-xs font-bold tracking-wider uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                      {course.badge}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-200/90 dark:bg-neutral-800 text-neutral-950 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 font-mono text-xs font-bold tracking-wider uppercase">
                      {course.badge}
                    </span>
                  )}

                  {course.link && (
                    <a
                      href={course.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs font-bold text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors inline-flex items-center gap-1 uppercase tracking-wider"
                    >
                      <span>{t.about.visitLabel}</span>
                      <ArrowUpRight size={13} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Stacks e Tecnologias */}
          <div className="about-tech-container mt-12 p-6 md:p-8 bg-[#0a0a0a] text-white rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-2 border-neutral-800 shadow-xl">
            <div className="flex items-center gap-3">
              <Code2 size={22} className="text-emerald-400" />
              <div>
                <p className="font-display font-black text-base uppercase tracking-wider">
                  {t.about.stackTitle}
                </p>
                <p className="font-mono text-xs text-neutral-400">
                  {t.about.stackSubtitle}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {technicalStack.map((tech) => (
                <span
                  key={tech}
                  className="about-tech-chip px-4 py-2 bg-neutral-900 border border-neutral-700 text-white text-xs font-mono font-bold rounded-full hover:border-neutral-500 hover:-translate-y-0.5 transition-[border-color,background-color] duration-150 cursor-default select-none shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
