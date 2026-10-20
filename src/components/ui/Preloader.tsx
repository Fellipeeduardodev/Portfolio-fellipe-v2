import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface PreloaderProps {
  onCurtainOpen: () => void;
  onLogoDock: () => void;
  minDuration?: number; // duration in seconds
}

export const Preloader: React.FC<PreloaderProps> = ({
  onCurtainOpen,
  onLogoDock,
  minDuration = 0.8,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const [isRemoved, setIsRemoved] = useState(() => {
    if (typeof window === "undefined") return false;
    const isBot = !!navigator.webdriver || /Lighthouse|Googlebot|Chrome-Lighthouse|Headless/i.test(navigator.userAgent);
    const isMobile = window.innerWidth <= 768;
    const hasHash = !!window.location.hash;
    const alreadyVisited = sessionStorage.getItem("portfolio_loaded") === "true";
    return isBot || isMobile || hasHash || alreadyVisited;
  });
  const [canSkip, setCanSkip] = useState(true);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const word1 = "Fellipe";
  const word2 = "Eduardo";

  // Check if visitor has hash, visited before, is mobile, or is a bot/Lighthouse
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isBot = !!navigator.webdriver || /Lighthouse|Googlebot|Chrome-Lighthouse|Headless/i.test(navigator.userAgent);
    const isMobile = window.innerWidth <= 768;
    const hasHash = !!window.location.hash;
    const alreadyVisited = sessionStorage.getItem("portfolio_loaded") === "true";

    if (isBot || isMobile || hasHash || alreadyVisited) {
      onCurtainOpen();
      onLogoDock();
      setIsRemoved(true);
      return;
    }
    sessionStorage.setItem("portfolio_loaded", "true");
  }, [onCurtainOpen, onLogoDock]);

  const handleSkip = () => {
    if (timelineRef.current) {
      timelineRef.current.timeScale(4);
    }
  };

  useGSAP(
    () => {
      if (typeof window !== "undefined") {
        const isBot = !!navigator.webdriver || /Lighthouse|Googlebot|Chrome-Lighthouse|Headless/i.test(navigator.userAgent);
        const isMobile = window.innerWidth <= 768;
        const hasHash = !!window.location.hash;
        const alreadyVisited = sessionStorage.getItem("portfolio_loaded") === "true";
        if (isBot || isMobile || hasHash || alreadyVisited) {
          onCurtainOpen();
          onLogoDock();
          setIsRemoved(true);
          return;
        }
      }

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        onCurtainOpen();
        onLogoDock();
        setIsRemoved(true);
        return;
      }

      const tl = gsap.timeline();
      timelineRef.current = tl;

      // Initial state: Micro headers fade in subtly
      tl.fromTo(
        ".preloader-micro",
        { opacity: 0, y: -6 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.04, ease: "power2.out" }
      );

      // Staggered letters revelation (letter by letter)
      tl.fromTo(
        ".preloader-char",
        {
          yPercent: 120,
          opacity: 0,
          rotateX: 45,
          filter: "blur(4px)",
        },
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 0.4,
          stagger: 0.02,
          ease: "power3.out",
        },
        "-=0.1"
      );

      // Dot appears right after all letters finish
      tl.fromTo(
        dotRef.current,
        {
          scale: 0,
          opacity: 0,
          y: -8,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: "back.out(2.2)",
        },
        ">-0.1"
      );

      // Number counter 0 -> 100%
      const counterData = { val: 0 };
      tl.to(
        counterData,
        {
          val: 100,
          duration: minDuration * 0.6,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counterRef.current) {
              const current = Math.round(counterData.val);
              counterRef.current.textContent = `${current < 10 ? "0" : ""}${current}%`;
            }
          },
        },
        0.15
      );

      // Progress bar fill
      tl.to(
        progressBarRef.current,
        {
          scaleX: 1,
          duration: minDuration * 0.6,
          ease: "power2.inOut",
        },
        0.15
      );

      // Status text switches to "Pronto"
      tl.to(
        statusRef.current,
        {
          opacity: 0,
          duration: 0.15,
          onComplete: () => {
            if (statusRef.current) {
              statusRef.current.textContent = "EXPERIÊNCIA PRONTA";
            }
          },
        },
        ">-0.2"
      );
      tl.to(
        statusRef.current,
        {
          opacity: 1,
          duration: 0.2,
          ease: "power2.out",
        }
      );

      // Brief artistic contemplation pause
      tl.to({}, { duration: 0.15 });

      // Fade out micro elements and bottom counter before the flight
      tl.to([".preloader-micro", ".preloader-bottom"], {
        opacity: 0,
        y: -10,
        duration: 0.25,
        stagger: 0.03,
        ease: "power2.in",
      });

      // ── THE MORPH FLIGHT: Logo travels to Header position ──
      tl.call(() => {
        const targetEl = document.getElementById("brand-logo");
        if (!targetEl || !logoRef.current || !curtainRef.current) {
          onCurtainOpen();
          onLogoDock();
          setIsRemoved(true);
          return;
        }

        // Measure live bounding boxes
        const targetRect = targetEl.getBoundingClientRect();
        const currentRect = logoRef.current.getBoundingClientRect();

        // Exact proportional scale
        const scale = targetRect.width / currentRect.width;

        // Sub-pixel translation deltas
        const deltaX = targetRect.left - currentRect.left;
        const deltaY = targetRect.top - currentRect.top;

        const flightTl = gsap.timeline({
          onComplete: () => {
            onLogoDock();
            if (logoRef.current) {
              gsap.set(logoRef.current, { opacity: 0 });
            }
            setIsRemoved(true);
          },
        });

        // 1. Black curtain rolls up into the ceiling, unveiling the site
        flightTl.to(
          curtainRef.current,
          {
            yPercent: -100,
            duration: 0.65,
            ease: "power4.inOut",
            onStart: () => {
              if (containerRef.current) {
                containerRef.current.style.pointerEvents = "none";
              }
              onCurtainOpen();
            },
          },
          0
        );

        // 2. The Logo glides from center to the exact header slot and turns dark
        flightTl.to(
          logoRef.current,
          {
            x: deltaX,
            y: deltaY,
            scale: scale,
            transformOrigin: "0 0",
            color: "#171717",
            duration: 0.65,
            ease: "power4.inOut",
          },
          0
        );

        // 3. The dot turns dark simultaneously
        if (dotRef.current) {
          flightTl.to(
            dotRef.current,
            {
              backgroundColor: "#171717",
              duration: 0.65,
              ease: "power4.inOut",
            },
            0
          );
        }
      });
    },
    { scope: containerRef }
  );

  if (isRemoved) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-auto select-none overflow-hidden"
      aria-live="polite"
      aria-label="Carregando portfólio de Fellipe Eduardo"
    >
      {/* ── Layer 1: Black Curtain (slides up) ── */}
      <div
        ref={curtainRef}
        className="absolute inset-0 bg-[#0a0a0a] text-white flex flex-col justify-between p-6 sm:p-10 md:p-14 will-change-transform shadow-[0_25px_50px_rgba(0,0,0,0.5)] z-10"
      >
        {/* Subtle radial ambient glow behind center */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06) 0%, rgba(10,10,10,0) 65%)",
          }}
          aria-hidden="true"
        />

        {/* Top bar info */}
        <div className="relative z-10 w-full flex items-center justify-between font-mono text-[10px] md:text-xs tracking-[0.2em] text-neutral-400 uppercase">
          <span className="preloader-micro">Fellipe Eduardo — Portfólio</span>
          <div className="flex items-center gap-4">
            <span className="preloader-micro hidden sm:inline-block">
              São Paulo, BR
            </span>
            {canSkip && (
              <button
                type="button"
                onClick={handleSkip}
                className="preloader-micro text-neutral-400 hover:text-white transition-colors duration-200 cursor-pointer underline underline-offset-4"
              >
                Pular
              </button>
            )}
          </div>
        </div>

        {/* Empty flex center spacer */}
        <div className="flex-1" />

        {/* Bottom indicator & progress */}
        <div className="preloader-bottom relative z-10 w-full flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-3">
            <span
              ref={counterRef}
              className="font-mono text-xs md:text-sm tracking-widest text-neutral-300 font-light tabular-nums"
            >
              00%
            </span>
          </div>

          {/* Minimal hairline progress track */}
          <div className="w-32 sm:w-44 h-[1.5px] bg-neutral-800 rounded-full overflow-hidden mt-3 relative">
            <div
              ref={progressBarRef}
              className="h-full bg-white origin-left scale-x-0 will-change-transform"
            />
          </div>

          {/* Micro status */}
          <span
            ref={statusRef}
            className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] text-neutral-500 uppercase mt-3 transition-opacity"
          >
            Carregando interface
          </span>
        </div>
      </div>

      {/* ── Layer 2: Center Logo (stays in foreground & flies to header) ── */}
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-20">
        <div
          ref={logoRef}
          className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 font-display font-medium text-3xl sm:text-5xl md:text-6xl tracking-tight text-white will-change-transform select-none"
          style={{ transformOrigin: "0 0" }}
        >
          {/* Brand Name */}
          <span className="inline-flex whitespace-nowrap">
            {/* Word 1: Fellipe */}
            <span className="inline-flex">
              {word1.split("").map((char, index) => (
                <span
                  key={`w1-${index}`}
                  className="inline-block overflow-hidden py-1"
                >
                  <span className="preloader-char inline-block will-change-transform transform-gpu">
                    {char}
                  </span>
                </span>
              ))}
            </span>

            {/* Space */}
            <span className="inline-block w-[0.28em]">&nbsp;</span>

            {/* Word 2: Eduardo */}
            <span className="inline-flex">
              {word2.split("").map((char, index) => (
                <span
                  key={`w2-${index}`}
                  className="inline-block overflow-hidden py-1"
                >
                  <span className="preloader-char inline-block will-change-transform transform-gpu">
                    {char}
                  </span>
                </span>
              ))}
            </span>
          </span>

          {/* Dot */}
          <span className="inline-flex self-end mb-1 sm:mb-2 md:mb-2.5">
            <span
              ref={dotRef}
              className="preloader-dot inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full bg-white will-change-transform"
            />
          </span>
        </div>
      </div>
    </div>
  );
};
