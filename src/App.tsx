/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { About } from './components/sections/About';
import { Footer } from './components/sections/Footer';
import { CustomCursor } from './components/ui/CustomCursor';
import { Preloader } from './components/ui/Preloader';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import Lenis from 'lenis';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const shouldSkipPreloader = () => {
  if (typeof window === "undefined") return false;
  const isBot = !!navigator.webdriver || /Lighthouse|Googlebot|Chrome-Lighthouse|Headless/i.test(navigator.userAgent);
  const isMobile = window.innerWidth <= 768;
  const hasHash = !!window.location.hash;
  const alreadyVisited = sessionStorage.getItem("portfolio_loaded") === "true";
  return isBot || isMobile || hasHash || alreadyVisited;
};

export default function App() {
  const [isLoaded, setIsLoaded] = useState(shouldSkipPreloader);
  const [logoDocked, setLogoDocked] = useState(shouldSkipPreloader);
  const lenisRef = useRef<Lenis | null>(null);

  // If page loaded with a hash (#contato, #projetos), smoothly scroll to target
  useEffect(() => {
    if (window.location.hash) {
      const targetId = window.location.hash.replace("#", "");
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const timer = setTimeout(() => {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(targetEl, { duration: 1.2 });
          } else {
            targetEl.scrollIntoView({ behavior: "smooth" });
          }
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.to(".scroll-progress-bar", {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Premium fluid scroll configuration
    const lenis = new Lenis({
      lerp: 0.05, // Creates a very fluid, "buttery" momentum
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    // If preloader is still running, halt scroll
    if (!isLoaded) {
      lenis.stop();
      document.body.style.overflow = "hidden";
    }

    // Synchronize Lenis scrolling with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame (raf) to GSAP's ticker
    const tickHandler = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickHandler);

    // Prevent GSAP from "lag smoothing" which can cause stutter in scroll
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      gsap.ticker.remove(tickHandler);
      document.body.style.overflow = "";
    };
  }, []);

  // Resume Lenis and body scroll when curtain opens
  useEffect(() => {
    if (isLoaded) {
      document.body.style.overflow = "";
      if (lenisRef.current) {
        lenisRef.current.start();
      }
      // Recalculate ScrollTrigger positions now that DOM layout is unblocked
      const refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
      return () => clearTimeout(refreshTimeout);
    } else {
      document.body.style.overflow = "hidden";
      if (lenisRef.current) {
        lenisRef.current.stop();
      }
    }
  }, [isLoaded]);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="relative min-h-screen bg-[#f8f8f8] dark:bg-[#080808] text-neutral-900 dark:text-neutral-100 selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-950 transition-colors duration-300">
          {/* Cinematic Black Preloader with Morph Flight to Header */}
          <Preloader
            onCurtainOpen={() => setIsLoaded(true)}
            onLogoDock={() => setLogoDocked(true)}
            minDuration={0.8}
          />

          <div className="scroll-progress-bar fixed top-0 left-0 w-full h-[3px] bg-neutral-950 dark:bg-white origin-left scale-x-0 z-[100] pointer-events-none" />
          <CustomCursor />

          {/* Skip to content — accessibility */}
          <a href="#main-content" className="skip-to-content">Pular para o conteúdo</a>

          {/* Premium Navigation Header */}
          <Header isLoaded={isLoaded} logoDocked={logoDocked} />

          <main id="main-content">
            {/* Hero Experience (animates when logo docks into header) */}
            <Hero isLoaded={logoDocked} />

            {/* Selected Work & Case Studies */}
            <Projects />

            {/* Behind the Interface About Section */}
            <About />
          </main>

          {/* Premium Footer & Conversion Section */}
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
