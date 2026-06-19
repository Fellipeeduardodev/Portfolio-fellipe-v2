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

  // GSAP for Initial Reveal
  useGSAP(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.1 }
    );
  }, []);

  // GSAP for Scroll States (Wide vs Floating Cloud) with Responsive matchMedia
  useGSAP(() => {
    if (!headerRef.current) return;

    let mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        let { isDesktop } = context.conditions as { isDesktop: boolean; isMobile: boolean };

        if (isScrolled || mobileMenuOpen) {
          // State 2: Floating cloud
          gsap.to(headerRef.current, {
            width: isDesktop ? "100%" : "92%",
            maxWidth: "800px",
            paddingTop: isDesktop ? "14px" : "12px",
            paddingBottom: isDesktop ? "14px" : "12px",
            paddingLeft: isDesktop ? "28px" : "20px",
            paddingRight: isDesktop ? "28px" : "20px",
            y: isDesktop ? 24 : 16,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
            border: "1px solid rgba(230, 230, 230, 0.9)",
            duration: 0.8,
            ease: "power3.out",
          });
        } else {
          // State 1: Top wide
          gsap.to(headerRef.current, {
            width: isDesktop ? "96%" : "92%",
            maxWidth: "1800px",
            paddingTop: isDesktop ? "20px" : "12px",
            paddingBottom: isDesktop ? "20px" : "12px",
            paddingLeft: isDesktop ? "40px" : "20px",
            paddingRight: isDesktop ? "40px" : "20px",
            y: isDesktop ? 24 : 16,
            backgroundColor: isDesktop ? "rgba(255, 255, 255, 0)" : "rgba(255, 255, 255, 0.95)",
            backdropFilter: isDesktop ? "blur(0px)" : "blur(16px)",
            boxShadow: isDesktop ? "0 0px 0px rgba(0, 0, 0, 0)" : "0 10px 30px rgba(0, 0, 0, 0.04)",
            border: isDesktop ? "1px solid rgba(234, 234, 234, 0)" : "1px solid rgba(230, 230, 230, 0.9)",
            duration: 0.8,
            ease: "power3.out",
          });
        }
      }
    );

    return () => mm.revert();
  }, [isScrolled, mobileMenuOpen]);

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

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-0">
        <div
          ref={headerRef}
          className="flex items-center justify-between pointer-events-auto rounded-full opacity-0 -translate-y-24 will-change-transform"
          style={{
            // Initial inline styles prevent flash before GSAP kicks in
            width: "92%", // mobile-first default
            maxWidth: "1800px",
            padding: "12px 20px",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            border: "1px solid rgba(230, 230, 230, 0.9)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.04)",
            transform: "translateY(16px)",
          }}
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
            <span className="w-1 h-1 rounded-full bg-neutral-900 self-end mb-1.5 opacity-80" />
          </a>

          {/* Center Navigation Links (hidden on mobile) */}
          <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {navigationItems.map((item, index) => (
              <a
                id={`nav-item-${index}`}
                key={item.label}
                href={item.href}
                className="relative text-[11px] font-mono font-semibold tracking-[0.2em] text-neutral-400 hover:text-neutral-900 uppercase transition-colors duration-500 py-2 group"
              >
                {item.label}
                {/* Micro-interaction underline */}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-neutral-900 transition-all duration-500 ease-out group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right-side CTA */}
          <div className="flex items-center gap-3">
            <a
              id="cta-contato"
              href="#contato"
              onClick={(e) => {
                const el = document.getElementById("contato");
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: "smooth" });
                }
              }}
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
              aria-label="Toggle Menu"
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
        className="fixed inset-0 z-40 bg-white/98 backdrop-blur-xl flex flex-col justify-center items-center p-8 md:hidden pointer-events-none opacity-0 -translate-y-5"
      >
        <div ref={mobileMenuLinksRef} className="flex flex-col items-center gap-8 w-full max-w-sm">
          {navigationItems.map((item, index) => (
            <a
              id={`mobile-nav-item-${index}`}
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-3xl font-display font-medium tracking-tight text-neutral-800 hover:text-neutral-950 transition-colors opacity-0 translate-y-5"
            >
              {item.label}
            </a>
          ))}
          <a
            id="mobile-cta-contato"
            href="#contato"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-4 mt-6 bg-[#111111] text-white rounded-full text-xs font-mono font-medium tracking-widest uppercase opacity-0 translate-y-5"
          >
            <span>Contato</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </>
  );
};
