import React, { useRef, useEffect } from "react";
import { Button } from "../ui/Button";
import { HeroBackgroundGrid } from "../ui/HeroBackgroundGrid";
import { useLanguage } from "../../context/LanguageContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface HeroProps {
  isLoaded?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isLoaded = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (isLoaded && tlRef.current && tlRef.current.paused()) {
      tlRef.current.play();
    }
  }, [isLoaded]);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) {
        gsap.set(
          ".hero-authority-container, .hero-authority-line, .hero-reveal, .hero-reveal-right, .hero-micro, .bg-word",
          { opacity: 1, scaleY: 1, y: 0 }
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, paused: !isLoaded });
      tlRef.current = tl;

      tl.fromTo(
        ".hero-line",
        { y: "100%", rotateZ: 1.5 },
        { y: "0%", rotateZ: 0, duration: 0.75, stagger: 0.08 }
      )
        .fromTo(
          ".hero-reveal",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power2.out" },
          "-=0.5"
        )
        // Reveal authority container
        .to(
          ".hero-authority-container",
          { opacity: 1, duration: 0.1 },
          "-=0.4"
        )
        // Grow the vertical dividing bar from top to bottom
        .fromTo(
          ".hero-authority-line",
          { scaleY: 0, opacity: 0 },
          { scaleY: 1, opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        )
        // Reveal right column info items
        .fromTo(
          ".hero-reveal-right",
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          ".hero-micro",
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: "power1.out" },
          "-=0.4"
        );

      const bgWords = gsap.utils.toArray<HTMLElement>(".bg-word");

      const quickTos = bgWords.map((word) => ({
        x: gsap.quickTo(word, "x", { duration: 1.8, ease: "power3.out" }),
        y: gsap.quickTo(word, "y", { duration: 1.8, ease: "power3.out" }),
      }));

      const handleMouseMove = (e: MouseEvent) => {
        if (window.innerWidth <= 768) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        quickTos.forEach((to, i) => {
          to.x(x * (i + 1) * 4 * (i % 2 === 0 ? 1 : -1));
          to.y(y * (i + 1) * 2);
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      bgWords.forEach((word, i) => {
        gsap.to(word, {
          yPercent: i % 2 === 0 ? -8 : 8,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      return () => window.removeEventListener("mousemove", handleMouseMove);
    },
    { scope: containerRef }
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-[100svh] flex flex-col justify-start bg-[#fafafa] dark:bg-[#0a0a0a] pt-[160px] sm:pt-[185px] md:pt-[205px] lg:pt-[230px] pb-16 md:pb-24 px-6 md:px-12 overflow-hidden select-none transition-colors duration-300"
    >
      {/* Interactive vector squares background grid */}
      <div className={`transition-opacity duration-700 pointer-events-none ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <HeroBackgroundGrid />
      </div>

      {/* Editorial grid lines */}
      <div className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`} aria-hidden="true">
        <div className="absolute top-0 bottom-0 left-[8%] w-[1px] bg-neutral-200/40 dark:bg-neutral-800/40 hidden md:block" />
        <div className="absolute top-0 bottom-0 right-[8%] w-[1px] bg-neutral-200/40 dark:bg-neutral-800/40 hidden md:block" />
      </div>

      {/* Background typography — Parallax Words */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex flex-col justify-between py-[12vh] opacity-[0.055] dark:opacity-[0.045] select-none" aria-hidden="true">
        <div className="bg-word font-display font-black text-[clamp(5.5rem,13vw,17rem)] leading-none text-neutral-950 dark:text-neutral-100 uppercase whitespace-nowrap ml-[-3%]">
          {t.hero.words[1] || "INTERFACE"}
        </div>
        <div className="bg-word font-display font-black text-[clamp(5.5rem,13vw,17rem)] leading-none text-neutral-950 dark:text-neutral-100 uppercase whitespace-nowrap text-right mr-[-3%]">
          {t.hero.words[0] || "CÓDIGO"}
        </div>
        <div className="bg-word font-display font-black text-[clamp(5.5rem,13vw,17rem)] leading-none text-neutral-950 dark:text-neutral-100 uppercase whitespace-nowrap ml-[10%]">
          {t.hero.words[2] || "PERFORMANCE"}
        </div>
      </div>

      {/* ── Main Content (Explicit top margin ensures 80px+ clearance below floating header) ── */}
      <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-16 md:gap-y-0 items-center relative z-20 mt-2 sm:mt-4 md:mt-8">

        {/* LEFT — Message block */}
        <div className="md:col-span-7 flex flex-col items-start">
          <span className="hero-micro font-mono text-xs font-bold tracking-[0.2em] text-neutral-500 dark:text-neutral-400 uppercase block mb-4">
            [ PORTFOLIO 2026 ]
          </span>

          {/* Headline */}
          <h1 className="font-display font-black text-[clamp(3.2rem,7.2vw,8rem)] leading-[0.95] tracking-tighter uppercase text-neutral-950 dark:text-white flex flex-col items-start">
            <div className="overflow-hidden">
              <div className="hero-line pt-2 pb-2 md:pt-3 md:pb-2">{t.hero.headlineLine1}</div>
            </div>
            <div className="overflow-hidden">
              <div className="hero-line pt-2 pb-2 md:pt-3 md:pb-2">{t.hero.headlineLine2}</div>
            </div>
          </h1>

          {/* Description */}
          <p className="hero-reveal text-base md:text-lg font-light text-neutral-700 dark:text-neutral-300 leading-[1.8] max-w-[540px] mt-8">
            {t.hero.bio}
          </p>

          {/* CTA */}
          <div className="hero-reveal mt-9 flex flex-wrap items-center gap-4">
            <Button
              label={t.hero.viewProjects}
              href="#projetos"
              variant="primary"
            />
            <Button
              label={t.hero.contactMe}
              href="#contato"
              variant="outline"
              showArrow={true}
            />
          </div>
        </div>

        {/* RIGHT — Editorial authority block */}
        <div className="md:col-span-3 md:col-start-10 flex items-center">
          <div className="hero-authority-container relative pl-6 md:pl-8 py-2 flex flex-col gap-7 opacity-0">
            {/* Dedicated animated vertical bar - starts scale-y-0 and never flashes early */}
            <div className="hero-authority-line absolute left-0 top-0 bottom-0 w-[2px] bg-neutral-950/30 dark:bg-neutral-700/60 origin-top scale-y-0 pointer-events-none" />

            {/* Name */}
            <div className="hero-reveal-right">
              <p className="font-display font-black text-base md:text-lg tracking-tight text-neutral-950 dark:text-white uppercase">
                Fellipe Eduardo
              </p>
            </div>

            {/* Title */}
            <div className="hero-reveal-right">
              <p className="font-mono text-xs md:text-sm font-bold tracking-[0.14em] text-neutral-950 dark:text-white uppercase">
                {t.hero.microRole}
              </p>
              <p className="font-mono text-[11px] font-semibold tracking-[0.1em] text-neutral-600 dark:text-neutral-400 uppercase mt-1">
                {t.hero.microLocation}
              </p>
            </div>

            {/* Creative Focus */}
            <div className="hero-reveal-right">
              <p className="font-mono text-[11px] font-bold tracking-[0.18em] text-neutral-600 dark:text-neutral-400 uppercase mb-2">
                {t.hero.microFocusLabel}
              </p>
              <div className="font-mono text-xs tracking-[0.08em] text-neutral-800 dark:text-neutral-200 font-semibold uppercase leading-[2.1]">
                {t.hero.microFocusItems.map((item, idx) => (
                  <p key={idx}>{item}</p>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2 hero-reveal-right px-3.5 py-1.5 rounded-full bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 shadow-sm w-fit">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
              <span className="font-mono text-[11px] font-bold tracking-[0.1em] text-neutral-950 dark:text-white uppercase">
                {t.hero.microStatus}
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
