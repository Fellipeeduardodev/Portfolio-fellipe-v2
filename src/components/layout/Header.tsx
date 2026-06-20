import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigationItems } from "../../data/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const mobileOverlayRef = useRef<HTMLDivElement>(null);
  const mobileMenuLinksRef = useRef<HTMLDivElement>(null);

  // Listen to scroll to update state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // GSAP for Mobile Menu Overlay
  useGSAP(() => {
    if (!mobileOverlayRef.current) return;
    
    if (mobileMenuOpen) {
      gsap.to(mobileOverlayRef.current, {
        opacity: 1,
        y: 0,
        pointerEvents: "auto",
        duration: 0.6,
        ease: "power3.out",
      });
      gsap.fromTo(
        mobileMenuLinksRef.current?.children || [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power3.out", delay: 0.1 }
      );
    } else {
      gsap.to(mobileOverlayRef.current, {
        opacity: 0,
        y: -20,
        pointerEvents: "none",
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [mobileMenuOpen]);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-0">
        <div
          ref={headerRef}
          className={`flex items-center justify-between pointer-events-auto rounded-full will-change-transform transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mounted ? "opacity-100" : "opacity-0 -translate-y-12"
          } ${
            isScrolled || mobileMenuOpen
              ? "w-[92%] md:w-full max-w-[800px] py-3 px-5 md:py-3.5 md:px-7 translate-y-4 md:translate-y-6 bg-white/95 backdrop-blur-md shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-neutral-200/90"
              : "w-[92%] md:w-[96%] max-w-[1800px] py-3 px-5 md:py-5 md:px-10 translate-y-4 md:translate-y-6 bg-white/95 backdrop-blur-md md:bg-transparent md:backdrop-blur-none md:shadow-none md:border-transparent border border-neutral-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
          }`}
        >
          {/* Brand/logo name */}
          <a
            id="brand-logo"
            href="#"
            className="group flex items-center gap-1.5 focus:outline-none"
          >
            <span className="font-display font-medium text-[15px] md:text-base tracking-tight text-neutral-900">
              Fellipe Eduardo
            </span>
            <span className="w-1 h-1 rounded-full bg-neutral-900 self-end mb-1.5 opacity-80" aria-hidden="true" />
          </a>

          {/* Center Navigation Links (hidden on mobile) */}
          <nav aria-label="Navegação principal" className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {navigationItems.map((item, index) => (
              <a
                id={`nav-item-${index}`}
                key={item.label}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className="relative text-[11px] font-mono font-semibold tracking-[0.2em] text-neutral-400 hover:text-neutral-950 uppercase transition-colors duration-500 py-2 group"
              >
                {item.label}
                {/* Micro-interaction underline */}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-neutral-950 transition-all duration-500 ease-out group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right-side CTA */}
          <div className="flex items-center gap-3">
            <a
              id="cta-contato"
              href="#contato"
              onClick={(e) => handleScrollTo(e, "#contato")}
              className="hidden sm:flex items-center gap-2 px-6 py-3 bg-[#111111] hover:bg-[#000000] text-white rounded-full transition-colors duration-500 group"
            >
              <span className="font-mono text-[10px] font-medium tracking-[0.15em] uppercase mt-0.5">Contato</span>
              <ArrowUpRight
                size={14}
                strokeWidth={2}
                className="text-neutral-400 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
              />
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -mr-2 text-neutral-800 hover:text-neutral-950 rounded-full transition-colors md:hidden focus:outline-none"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu-overlay"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        ref={mobileOverlayRef}
        id="mobile-menu-overlay"
        role={mobileMenuOpen ? "dialog" : undefined}
        aria-modal={mobileMenuOpen ? "true" : undefined}
        aria-label={mobileMenuOpen ? "Menu de navegação" : undefined}
        className="fixed inset-0 z-40 bg-white/98 backdrop-blur-xl flex flex-col justify-center items-center p-8 md:hidden pointer-events-none opacity-0 -translate-y-5"
      >
        <nav aria-label="Menu mobile" ref={mobileMenuLinksRef} className="flex flex-col items-center gap-8 w-full max-w-sm">
          {navigationItems.map((item, index) => (
            <a
              id={`mobile-nav-item-${index}`}
              key={item.label}
              href={item.href}
              onClick={(e) => handleScrollTo(e, item.href)}
              className="text-3xl font-display font-medium tracking-tight text-neutral-800 hover:text-neutral-950 transition-colors opacity-0 translate-y-5"
            >
              {item.label}
            </a>
          ))}
          <a
            id="mobile-cta-contato"
            href="#contato"
            onClick={(e) => handleScrollTo(e, "#contato")}
            className="flex items-center justify-center gap-2 w-full py-4 mt-6 bg-[#111111] text-white rounded-full text-xs font-mono font-medium tracking-widest uppercase opacity-0 translate-y-5"
          >
            <span>Contato</span>
            <ArrowUpRight size={16} />
          </a>
        </nav>
      </div>
    </>
  );
};
