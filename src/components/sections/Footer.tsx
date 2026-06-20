import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const Footer: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.set(".footer-headline, .footer-cta, .footer-info, .footer-socials, .footer-bg-text", {
          opacity: 1,
          y: 0,
        });
        return;
      }

      // Timeline for revealing footer elements
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      tl.fromTo(
        ".footer-headline",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, ease: "power4.out" }
      )
        .fromTo(
          ".footer-cta",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
          "-=1"
        )
        .fromTo(
          ".footer-info",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
          "-=0.8"
        )
        .fromTo(
          ".footer-socials",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
          "-=1"
        )
        .fromTo(
          ".footer-bg-text",
          { opacity: 0, y: 40 },
          { opacity: 0.06, y: 0, duration: 2, ease: "power2.out" },
          "-=1.5"
        );

      // Subtle mouse move parallax on background text with quickTo
      const xTo = gsap.quickTo(".footer-bg-text", "x", { duration: 2, ease: "power3.out" });
      const yTo = gsap.quickTo(".footer-bg-text", "y", { duration: 2, ease: "power3.out" });

      const handleMouseMove = (e: MouseEvent) => {
        if (window.innerWidth <= 768) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 15;
        xTo(x);
        yTo(y);
      };

      window.addEventListener("mousemove", handleMouseMove);

      // Magnetic CTA hover
      const ctaEl = ctaRef.current;
      let handleCTAMouseMove: (e: MouseEvent) => void;
      let handleCTAMouseLeave: () => void;

      if (ctaEl && !prefersReducedMotion) {
        const ctaXTo = gsap.quickTo(ctaEl, "x", { duration: 0.8, ease: "power3.out" });
        const ctaYTo = gsap.quickTo(ctaEl, "y", { duration: 0.8, ease: "power3.out" });

        handleCTAMouseMove = (e: MouseEvent) => {
          const rect = ctaEl.getBoundingClientRect();
          const relX = e.clientX - (rect.left + rect.width / 2);
          const relY = e.clientY - (rect.top + rect.height / 2);
          ctaXTo(relX * 0.35);
          ctaYTo(relY * 0.35);
        };

        handleCTAMouseLeave = () => {
          ctaXTo(0);
          ctaYTo(0);
        };

        ctaEl.addEventListener("mousemove", handleCTAMouseMove);
        ctaEl.addEventListener("mouseleave", handleCTAMouseLeave);
      }

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        if (ctaEl) {
          if (handleCTAMouseMove) ctaEl.removeEventListener("mousemove", handleCTAMouseMove);
          if (handleCTAMouseLeave) ctaEl.removeEventListener("mouseleave", handleCTAMouseLeave);
        }
      };
    },
    { scope: sectionRef }
  );

  return (
    <footer
      id="contato"
      ref={sectionRef}
      role="contentinfo"
      className="relative w-full bg-[#050505] text-white py-24 md:py-36 px-6 md:px-12 overflow-hidden flex flex-col justify-between min-h-[85vh] select-none"
    >


      {/* Top thin line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-neutral-800/40" aria-hidden="true" />

      {/* Main Content Grid */}
      <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative z-10 my-auto">
        
        {/* Left block (Col 1-8): Conversion CTA */}
        <div className="lg:col-span-8 flex flex-col justify-center items-start gap-8 md:gap-12">
          <h2 className="footer-headline font-display font-black text-[clamp(2.5rem,6vw,6rem)] leading-[0.95] tracking-tight uppercase text-white">
            Pronto para tirar<br />
            <span className="text-neutral-400">sua ideia do papel?</span>
          </h2>
          
          <a
            ref={ctaRef}
            href="https://wa.me/5511961131382"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-cta group inline-flex items-center gap-4 px-10 py-5 bg-white text-black hover:bg-neutral-200 active:scale-[0.98] rounded-full transition-[background-color,color,box-shadow] duration-300 font-mono text-xs md:text-sm font-bold tracking-widest uppercase shadow-[0_10px_35px_rgba(255,255,255,0.06)]"
          >
            <span>Iniciar Projeto</span>
            <span className="inline-block transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">↗</span>
          </a>
        </div>

        {/* Right block (Col 9-12): Identity & Links */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-12 border-t lg:border-t-0 lg:border-l border-neutral-800/40 pt-12 lg:pt-0 lg:pl-12">
          
          {/* Identity info */}
          <div className="footer-info flex flex-col gap-4">
            <div>
              <p className="font-display font-black text-lg text-white uppercase tracking-tight">
                Fellipe Eduardo
              </p>
              <p className="font-mono text-xs text-neutral-400 uppercase mt-1">
                Frontend Developer
              </p>
              <p className="font-mono text-[10px] text-neutral-500 uppercase mt-0.5">
                São Paulo, Brasil
              </p>
            </div>
            <p className="font-sans text-sm text-neutral-400 leading-relaxed max-w-xs mt-2">
              Da estratégia ao código. Experiências digitais com foco em resultado.
            </p>
          </div>

          {/* Social connections */}
          <div className="footer-socials flex flex-col gap-4">
            <p className="font-mono text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
              Redes Sociais
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-3">
              <a
                href="https://www.linkedin.com/in/fellipeedudev/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between py-1.5 border-b border-neutral-800/40 hover:border-neutral-500 transition-colors duration-300"
              >
                <span className="text-xs text-neutral-400 group-hover:text-white transition-colors duration-300">
                  LinkedIn ↗
                </span>
              </a>
              <a
                href="https://github.com/Fellipeeduardodev"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between py-1.5 border-b border-neutral-800/40 hover:border-neutral-500 transition-colors duration-300"
              >
                <span className="text-xs text-neutral-400 group-hover:text-white transition-colors duration-300">
                  GitHub ↗
                </span>
              </a>
              <a
                href="https://www.instagram.com/fellipe_zxz/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between py-1.5 border-b border-neutral-800/40 hover:border-neutral-500 transition-colors duration-300"
              >
                <span className="text-xs text-neutral-400 group-hover:text-white transition-colors duration-300">
                  Instagram ↗
                </span>
              </a>
              <a
                href="https://wa.me/5511961131382"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between py-1.5 border-b border-neutral-800/40 hover:border-neutral-500 transition-colors duration-300"
              >
                <span className="text-xs text-neutral-400 group-hover:text-white transition-colors duration-300">
                  WhatsApp ↗
                </span>
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* Giant low-opacity background text */}
      <div 
        className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none overflow-hidden z-0"
        aria-hidden="true"
      >
        <span className="footer-bg-text block font-display font-black text-[clamp(4rem,15vw,22rem)] leading-none text-white opacity-[0.06] tracking-tighter uppercase whitespace-nowrap">
          FELLIPE EDUARDO
        </span>
      </div>

      {/* Footer Bottom Block */}
      <div className="w-full max-w-[1400px] mx-auto border-t border-neutral-800/40 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10 text-[10px] md:text-xs font-mono text-neutral-500">
        <span>&copy; 2026 Fellipe Eduardo. Todos os direitos reservados.</span>
        
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group hover:text-white transition-colors duration-300 flex items-center gap-1 cursor-pointer"
          aria-label="Voltar para o topo da página"
        >
          <span>Back to top</span>
          <span className="inline-block transform group-hover:-translate-y-0.5 transition-transform duration-300">↗</span>
        </button>
      </div>

      {/* Bottom thin line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-800/40" aria-hidden="true" />
    </footer>
  );
};
