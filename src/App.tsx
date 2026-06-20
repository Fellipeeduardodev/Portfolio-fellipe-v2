/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { Process } from './components/sections/Process';
import { About } from './components/sections/About';
import { Footer } from './components/sections/Footer';
import { CustomCursor } from './components/ui/CustomCursor';
import Lenis from 'lenis';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function App() {
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
    // Premium fluid scroll configuration
    const lenis = new Lenis({
      lerp: 0.05, // Creates a very fluid, "buttery" momentum
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

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
      gsap.ticker.remove(tickHandler);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#f8f8f8] selection:bg-neutral-900 selection:text-white">
      <div className="scroll-progress-bar fixed top-0 left-0 w-full h-[3px] bg-neutral-950 origin-left scale-x-0 z-[100] pointer-events-none" />
      <CustomCursor />
      {/* Skip to content — accessibility */}
      <a href="#main-content" className="skip-to-content">Pular para o conteúdo</a>

      {/* Premium Navigation Header */}
      <Header />

      <main id="main-content">
        {/* Hero Experience (exactly 100vh) */}
        <Hero />

        {/* From Idea To Interface Process Section */}
        <Process />

        {/* Behind the Interface About Section */}
        <About />
      </main>

      {/* Premium Footer & Conversion Section */}
      <Footer />
    </div>
  );
}

