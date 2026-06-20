import React, { useRef } from "react";
import { Button } from "../ui/Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".hero-line",
        { y: "120%", rotateZ: 3 },
        { y: "0%", rotateZ: 0, duration: 1.6, stagger: 0.12 }
      )
        .fromTo(
          ".hero-reveal",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out" },
          "-=1.0"
        )
        .fromTo(
          ".hero-reveal-right",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.12, ease: "power3.out" },
          "-=0.8"
        )
        .fromTo(
          ".bg-word",
          { opacity: 0 },
          { opacity: 1, duration: 3, stagger: 0.2, ease: "power1.out" },
          "-=1.2"
        )
        .fromTo(
          ".hero-micro",
          { opacity: 0 },
          { opacity: 1, duration: 2, stagger: 0.15, ease: "power1.out" },
          "-=2"
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
      className="relative w-full min-h-[100svh] flex flex-col justify-center bg-[#fafafa] pt-[120px] pb-12 px-6 md:px-12 overflow-hidden select-none"
    >
      {/* Editorial grid lines */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 bottom-0 left-[8%] w-[1px] bg-neutral-200/40 hidden md:block" />
        <div className="absolute top-0 bottom-0 right-[8%] w-[1px] bg-neutral-200/40 hidden md:block" />
      </div>

      {/* Background typography — INTERFACE / FRONTEND / PERFORMANCE */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex flex-col justify-between py-[12vh] opacity-[0.025] select-none" aria-hidden="true">
        <div className="bg-word font-display font-black text-[clamp(5rem,12vw,16rem)] leading-none text-neutral-900 uppercase whitespace-nowrap ml-[-3%]">
          INTERFACE
        </div>
        <div className="bg-word font-display font-black text-[clamp(5rem,12vw,16rem)] leading-none text-neutral-900 uppercase whitespace-nowrap text-right mr-[-3%]">
          FRONTEND
        </div>
        <div className="bg-word font-display font-black text-[clamp(5rem,12vw,16rem)] leading-none text-neutral-900 uppercase whitespace-nowrap ml-[10%]">
          PERFORMANCE
        </div>
      </div>

      {/* Micro label — sparse technical anchor */}
      <div className="absolute inset-0 pointer-events-none z-10 hidden md:block" aria-hidden="true">
        <span className="hero-micro absolute top-[18%] left-[8.5%] font-mono text-[9px] tracking-[0.2em] text-neutral-300 uppercase">
          UI / UX
        </span>
      </div>

      {/* ── Main Content ── */}
      <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-16 md:gap-y-0 items-center relative z-20">

        {/* LEFT — Message block */}
        <div className="md:col-span-7 flex flex-col items-start">

          {/* Headline */}
          <h1 className="font-display font-extrabold text-[clamp(2.8rem,6.5vw,7.5rem)] leading-[0.95] tracking-tight uppercase text-neutral-950 flex flex-col items-start">
            <div className="overflow-hidden">
              <div className="hero-line pb-2">DA ESTRATÉGIA</div>
            </div>
            <div className="overflow-hidden">
              <div className="hero-line pb-2">AO CÓDIGO.</div>
            </div>
          </h1>


          {/* Description */}
          <p className="hero-reveal text-[15px] md:text-[17px] font-light text-neutral-500 leading-[1.85] max-w-[480px] mt-8">
            Desenvolvo websites e produtos digitais com foco em performance, clareza e experiência do usuário.
          </p>

          {/* CTA */}
          <div className="hero-reveal mt-8">
            <Button
              label="Solicitar Orçamento"
              href="#contato"
            />
          </div>
        </div>

        {/* RIGHT — Editorial authority block */}
        <div className="md:col-span-3 md:col-start-10 flex items-center">
          <div className="border-l border-neutral-200 pl-6 md:pl-8 py-2 flex flex-col gap-7">

            {/* Name */}
            <div className="hero-reveal-right">
              <p className="font-display font-bold text-[14px] md:text-[15px] tracking-tight text-neutral-950 uppercase">
                Fellipe Eduardo
              </p>
            </div>

            {/* Title */}
            <div className="hero-reveal-right">
              <p className="font-mono text-[11px] md:text-[12px] font-bold tracking-[0.1em] text-neutral-950 uppercase">
                Frontend Developer
              </p>
              <p className="font-mono text-[10px] tracking-[0.08em] text-neutral-400 uppercase mt-1.5">
                São Paulo, Brasil
              </p>
            </div>

            {/* Specializations */}
            <div className="hero-reveal-right">
              <p className="font-mono text-[9px] tracking-[0.15em] text-neutral-400 uppercase mb-2">
                Especializado em
              </p>
              <div className="font-mono text-[10px] md:text-[11px] tracking-[0.08em] text-neutral-500 uppercase leading-[2]">
                <p>Landing Pages</p>
                <p>Websites Institucionais</p>
                <p>Produtos Digitais</p>
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2 hero-reveal-right">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
              <span className="font-mono text-[10px] font-bold tracking-[0.08em] text-neutral-950 uppercase">
                Disponível para novos projetos
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
