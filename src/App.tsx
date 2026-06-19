/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { Process } from './components/sections/Process';
import { Mail } from 'lucide-react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
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
    // This ensures that scroll and animations run on exactly the same frame
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Prevent GSAP from "lag smoothing" which can cause stutter in scroll
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#f8f8f8] selection:bg-neutral-900 selection:text-white">
      {/* Premium Navigation Header */}
      <Header />

      {/* Hero Experience (exactly 100vh) */}
      <Hero />

      {/* From Idea To Interface Process Section */}
      <Process />

      {/* Elegant Minimalist Contact Anchor & Scroll Buffer 
          Allows testing of scrolling 'cloud' navbar with absolute architectural cleanliness */}
      <section 
        id="contato" 
        className="relative w-full min-h-[40vh] bg-neutral-900 text-neutral-100 flex flex-col justify-center py-20 px-6 md:px-12 overflow-hidden border-t border-neutral-850"
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          {/* Accent mesh grid */}
          <div className="absolute top-0 bottom-0 left-[8%] w-[1px] bg-white/20" />
          <div className="absolute top-0 bottom-0 right-[8%] w-[1px] bg-white/20" />
        </div>

        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
              Contato (Placeholder)
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight text-white leading-tight">
              Vamos construir algo <br />
              <span className="text-neutral-400">extraordinário juntos.</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <a 
              id="contact-email-link"
              href="mailto:fellipeeduardo1611@gmail.com" 
              className="flex items-center gap-3 px-6 py-4 bg-white hover:bg-neutral-100 text-neutral-900 text-sm font-medium rounded-full transition-all duration-300"
            >
              <Mail size={16} />
              <span>fellipeeduardo1611@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Humble and minimalist signature label */}
        <div className="max-w-7xl mx-auto w-full border-t border-neutral-800/60 mt-16 pt-8 flex justify-between items-center text-xs font-mono text-neutral-500">
          <span>&copy; {new Date().getFullYear()} Fellipe Eduardo</span>
          <span>Criado com Intenção</span>
        </div>
      </section>
    </div>
  );
}

