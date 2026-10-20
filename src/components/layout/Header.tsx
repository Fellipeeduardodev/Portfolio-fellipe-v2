import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Menu, X, Sun, Moon } from "lucide-react";
import { navItemKeys } from "../../data/navigation";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface HeaderProps {
  isLoaded?: boolean;
  logoDocked?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  isLoaded = true,
  logoDocked = true,
}) => {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLanguage();

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
    if (isLoaded) {
      setMounted(true);
    }
  }, [isLoaded]);

  // GSAP for Mobile Menu Overlay
  useGSAP(() => {
    if (!mobileOverlayRef.current) return;
    
    if (mobileMenuOpen) {
      gsap.to(mobileOverlayRef.current, {
        opacity: 1,
        y: 0,
        pointerEvents: "auto",
        duration: 0.5,
        ease: "power3.out",
      });
      gsap.fromTo(
        mobileMenuLinksRef.current?.children || [],
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power3.out", delay: 0.05 }
      );
    } else {
      gsap.to(mobileOverlayRef.current, {
        opacity: 0,
        y: -15,
        pointerEvents: "none",
        duration: 0.35,
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

  const getNavLabel = (key: "projects" | "about" | "contact") => {
    switch (key) {
      case "projects":
        return t.nav.projects;
      case "about":
        return t.nav.about;
      case "contact":
        return t.nav.contact;
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-0">
        <div
          ref={headerRef}
          className={`flex items-center justify-between pointer-events-auto rounded-full will-change-transform transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mounted ? "opacity-100" : "opacity-0"
          } ${
            isScrolled || mobileMenuOpen
              ? "w-[94%] md:w-full max-w-[1060px] lg:max-w-[1100px] py-2.5 px-5 md:py-3.5 md:px-8 translate-y-3 md:translate-y-5 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-neutral-200/90 dark:border-neutral-800/90"
              : "w-[94%] md:w-[96%] max-w-[1800px] py-3 px-5 md:py-5 md:px-10 translate-y-3 md:translate-y-5 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md md:bg-transparent md:dark:bg-transparent md:backdrop-blur-none md:shadow-none md:border-transparent border border-neutral-200/90 dark:border-neutral-800/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
          }`}
        >
          {/* Brand/logo name */}
          <a
            id="brand-logo"
            href="#"
            onClick={(e) => handleScrollTo(e, "#hero")}
            className={`group flex items-center gap-1.5 focus:outline-none flex-shrink-0 transition-opacity duration-300 ${
              logoDocked ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="font-display font-medium text-base tracking-tight text-neutral-900 dark:text-neutral-100">
              Fellipe Eduardo
            </span>
            <span className="w-1 h-1 rounded-full bg-neutral-900 dark:bg-neutral-100 self-end mb-1.5 opacity-80" aria-hidden="true" />
          </a>

          {/* Center Navigation Links (hidden on mobile) */}
          <nav
            aria-label="Navegação principal"
            className={`hidden md:flex items-center gap-6 lg:gap-10 absolute left-1/2 -translate-x-1/2 transition-all duration-700 ease-out ${
              logoDocked ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
            }`}
          >
            {navItemKeys.map((item) => {
              const label = getNavLabel(item.key);
              return (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className="relative text-xs font-mono font-bold tracking-[0.16em] text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white uppercase transition-colors duration-300 py-2 group whitespace-nowrap"
                >
                  {label}
                  {/* Micro-interaction underline */}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-neutral-950 dark:bg-white transition-all duration-300 ease-out group-hover:w-full" />
                </a>
              );
            })}
          </nav>

          {/* Right-side Controls (Language + Theme + CTA - Generous spacing) */}
          <div
            className={`flex items-center gap-3 sm:gap-4 md:gap-5 transition-all duration-700 ease-out ${
              logoDocked ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
            }`}
          >
            {/* Language Switcher Pill */}
            <button
              type="button"
              onClick={toggleLang}
              className="min-h-[44px] px-3.5 py-2 rounded-full border border-neutral-200/90 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/70 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-all duration-200 text-xs font-mono font-bold tracking-wider cursor-pointer inline-flex items-center justify-center"
              aria-label={t.nav.toggleLang}
              title={lang === "pt" ? "Switch to English" : "Mudar para Português"}
            >
              <span className={lang === "pt" ? "text-neutral-950 dark:text-white font-extrabold" : "text-neutral-400"}>PT</span>
              <span className="text-neutral-300 dark:text-neutral-700 mx-0.5">/</span>
              <span className={lang === "en" ? "text-neutral-950 dark:text-white font-extrabold" : "text-neutral-400"}>EN</span>
            </button>

            {/* Theme Switcher Button */}
            <button
              id="theme-toggle-btn"
              type="button"
              onClick={toggleTheme}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/60 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white transition-all duration-300 focus:outline-none shadow-sm active:scale-95 cursor-pointer"
              aria-label={t.nav.toggleTheme}
              title={theme === "dark" ? "Mudar para Modo Claro" : "Mudar para Modo Escuro"}
            >
              {theme === "dark" ? (
                <Sun size={16} className="text-amber-300 transition-transform duration-300 rotate-0 hover:rotate-45" />
              ) : (
                <Moon size={16} className="text-neutral-700 transition-transform duration-300 rotate-0 hover:-rotate-12" />
              )}
            </button>

            {/* Desktop Contact CTA with comfortable left separation */}
            <a
              id="cta-contato"
              href="#contato"
              onClick={(e) => handleScrollTo(e, "#contato")}
              className="hidden sm:flex items-center gap-2.5 px-6 py-2.5 md:py-3 ml-1 sm:ml-2 bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-950 rounded-full transition-colors duration-300 group shadow-sm flex-shrink-0"
            >
              <span className="font-mono text-[11px] font-bold tracking-[0.16em] uppercase mt-0.5">{t.nav.contact}</span>
              <ArrowUpRight
                size={14}
                strokeWidth={2.5}
                className="text-neutral-400 dark:text-neutral-600 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white dark:group-hover:text-neutral-950"
              />
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center -mr-1 text-neutral-800 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white rounded-full transition-colors md:hidden focus:outline-none"
              aria-label={mobileMenuOpen ? t.nav.menuClose : t.nav.menuOpen}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu-overlay"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
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
        aria-hidden={!mobileMenuOpen}
        inert={!mobileMenuOpen ? true : undefined}
        className={`fixed inset-0 z-40 bg-white/98 dark:bg-[#080808]/98 backdrop-blur-xl flex flex-col justify-center items-center p-8 md:hidden ${
          mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        } opacity-0 -translate-y-5`}
      >
        <nav aria-label="Menu mobile" ref={mobileMenuLinksRef} className="flex flex-col items-center gap-8 w-full max-w-sm">
          {navItemKeys.map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={(e) => handleScrollTo(e, item.href)}
              className="text-3xl font-display font-medium tracking-tight text-neutral-800 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white transition-colors opacity-0 translate-y-5"
            >
              {getNavLabel(item.key)}
            </a>
          ))}

          <a
            id="mobile-cta-contato"
            href="#contato"
            onClick={(e) => handleScrollTo(e, "#contato")}
            className="flex items-center justify-center gap-2 w-full py-4 mt-6 bg-[#171717] hover:bg-[#262626] dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-950 rounded-full text-xs font-mono font-medium tracking-widest uppercase opacity-0 translate-y-5 transition-colors"
          >
            <span>{t.nav.contact}</span>
            <ArrowUpRight size={16} />
          </a>
        </nav>
      </div>
    </>
  );
};
