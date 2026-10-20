import React, { useRef, useState, useEffect } from "react";
import { Copy, Check, Clock } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const Footer: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const copyBtnRef = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);
  const [timeStr, setTimeStr] = useState("");

  const { t, lang } = useLanguage();

  // Clock for São Paulo local time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const spTime = new Intl.DateTimeFormat("pt-BR", {
        timeZone: "America/Sao_Paulo",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      setTimeStr(spTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("fellipeedudev@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.set(".footer-headline, .footer-cta, .footer-info, .footer-socials", {
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
        );

      // Magnetic CTA & Copy Button hover
      const ctaEl = ctaRef.current;
      const copyEl = copyBtnRef.current;

      if (ctaEl && !prefersReducedMotion) {
        const ctaXTo = gsap.quickTo(ctaEl, "x", { duration: 0.8, ease: "power3.out" });
        const ctaYTo = gsap.quickTo(ctaEl, "y", { duration: 0.8, ease: "power3.out" });

        const handleCTAMouseMove = (e: MouseEvent) => {
          const rect = ctaEl.getBoundingClientRect();
          const relX = e.clientX - (rect.left + rect.width / 2);
          const relY = e.clientY - (rect.top + rect.height / 2);
          ctaXTo(relX * 0.35);
          ctaYTo(relY * 0.35);
        };

        const handleCTAMouseLeave = () => {
          ctaXTo(0);
          ctaYTo(0);
        };

        ctaEl.addEventListener("mousemove", handleCTAMouseMove);
        ctaEl.addEventListener("mouseleave", handleCTAMouseLeave);
      }

      if (copyEl && !prefersReducedMotion) {
        const copyXTo = gsap.quickTo(copyEl, "x", { duration: 0.8, ease: "power3.out" });
        const copyYTo = gsap.quickTo(copyEl, "y", { duration: 0.8, ease: "power3.out" });

        const handleCopyMouseMove = (e: MouseEvent) => {
          const rect = copyEl.getBoundingClientRect();
          const relX = e.clientX - (rect.left + rect.width / 2);
          const relY = e.clientY - (rect.top + rect.height / 2);
          copyXTo(relX * 0.3);
          copyYTo(relY * 0.3);
        };

        const handleCopyMouseLeave = () => {
          copyXTo(0);
          copyYTo(0);
        };

        copyEl.addEventListener("mousemove", handleCopyMouseMove);
        copyEl.addEventListener("mouseleave", handleCopyMouseLeave);
      }
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
        <div className="lg:col-span-8 flex flex-col justify-center items-start gap-8 md:gap-10">
          <div>
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-neutral-400 uppercase block mb-4">
              {t.footer.sectionTag}
            </span>
            <h2 className="footer-headline font-display font-black text-[clamp(2.8rem,6.5vw,6.8rem)] leading-[0.96] tracking-tighter uppercase text-white">
              {t.footer.headlineMain}<br />
              <span className="text-neutral-400">{t.footer.headlineAccent}</span>
            </h2>
            <p className="font-sans text-neutral-300 text-base md:text-xl font-light mt-6 max-w-lg leading-relaxed">
              {t.footer.subtitle}
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <a
              ref={ctaRef}
              href="https://wa.me/5511961131382"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Iniciar Conversa via WhatsApp (abre em nova aba)"
              className="footer-cta group inline-flex items-center gap-4 px-11 py-5 bg-white text-black hover:bg-neutral-100 active:scale-[0.98] rounded-full transition-all duration-300 font-mono text-sm md:text-base font-black tracking-widest uppercase shadow-[0_12px_45px_rgba(255,255,255,0.09)]"
            >
              <span>{t.footer.cta}</span>
              <span className="inline-block transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" aria-hidden="true">↗</span>
            </a>

            <button
              ref={copyBtnRef}
              type="button"
              onClick={handleCopyEmail}
              className="footer-cta group inline-flex items-center gap-3 px-8 py-5 bg-[#121212] border-2 border-neutral-700 hover:border-white active:scale-[0.98] rounded-full transition-all duration-300 font-mono text-xs md:text-sm font-bold tracking-wider text-white hover:text-white cursor-pointer shadow-lg"
              title={lang === "en" ? "Copy email address" : "Copiar endereço de e-mail"}
            >
              {copied ? (
                <>
                  <Check size={16} className="text-emerald-400" />
                  <span className="text-emerald-300 font-bold">{t.footer.copied}</span>
                </>
              ) : (
                <>
                  <Copy size={15} className="text-neutral-400 group-hover:text-white transition-colors" />
                  <span>fellipeedudev@gmail.com</span>
                  <span className="text-neutral-400 text-xs hidden sm:inline font-semibold">({t.footer.copyEmail})</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right block (Col 9-12): Identity & Specs */}
        <div className="lg:col-span-4 flex flex-col justify-start gap-7 lg:gap-8 border-t lg:border-t-0 lg:border-l border-neutral-800/80 pt-12 lg:pt-0 lg:pl-12">
          
          {/* Block 1: Identity & Live Status */}
          <div className="footer-info flex flex-col gap-4">
            <div>
              <p className="font-display font-black text-2xl text-white uppercase tracking-tight">
                Fellipe Eduardo
              </p>
              <p className="font-mono text-xs font-bold text-neutral-300 uppercase mt-1">
                {t.footer.role}
              </p>
              <div className="flex items-center gap-2 font-mono text-[11px] font-semibold text-neutral-400 uppercase mt-1">
                <Clock size={12} className="text-neutral-500" />
                <span>{t.footer.location} · {timeStr || "12:00:00"}</span>
              </div>
            </div>

            {/* Live Availability Badge */}
            <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#121212] border border-neutral-800 w-fit">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
              <span className="font-mono text-[11px] font-bold text-neutral-200 uppercase tracking-wider">
                {t.footer.status}
              </span>
            </div>

            <p className="font-sans text-sm text-neutral-400 leading-relaxed">
              {t.footer.pitch}
            </p>
          </div>

          {/* Block 2: Social & Code Profiles */}
          <div className="footer-socials flex flex-col gap-3 pt-6 border-t border-neutral-800/70">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-neutral-400 uppercase">
                {t.footer.socialTitle}
              </span>
              <span className="font-mono text-[11px] text-neutral-400">
                {t.footer.socialResponse}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: "LinkedIn", href: "https://www.linkedin.com/in/fellipeedudev/" },
                { name: "GitHub", href: "https://github.com/Fellipeeduardodev" },
                { name: "Instagram", href: "https://www.instagram.com/fellipe_zxz/" },
                { name: "WhatsApp", href: "https://wa.me/5511961131382" },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-[#0e0e0e] border border-neutral-800/80 hover:border-neutral-600 hover:bg-[#141414] transition-all duration-200"
                >
                  <span className="text-xs font-mono font-bold text-neutral-300 group-hover:text-white transition-colors">
                    {link.name}
                  </span>
                  <span className="text-xs text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" aria-hidden="true">
                    ↗
                  </span>
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              ))}
            </div>
          </div>

          {/* Block 4: Production Colophon */}
          <div className="footer-info pt-5 border-t border-neutral-800/60 font-mono text-[11px] text-neutral-400 flex flex-col gap-1">
            <span>© 2026 Fellipe Eduardo · {t.footer.colophonRole}</span>
            <span className="text-neutral-500">{t.footer.colophonTech}</span>
          </div>

        </div>

      </div>

      {/* Footer Bottom Block */}
      <div className="w-full max-w-[1400px] mx-auto border-t border-neutral-800/40 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10 text-[11px] md:text-xs font-mono text-neutral-400">
        <span>&copy; 2026 Fellipe Eduardo. {t.footer.rights}</span>
        
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="group hover:text-white transition-colors duration-300 min-h-[44px] px-3 py-2 rounded-md inline-flex items-center gap-1.5 cursor-pointer"
          aria-label={t.footer.backToTop}
        >
          <span>{t.footer.backToTop}</span>
          <span className="inline-block transform group-hover:-translate-y-0.5 transition-transform duration-300" aria-hidden="true">↗</span>
        </button>
      </div>

      {/* Bottom thin line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-800/40" aria-hidden="true" />
    </footer>
  );
};
