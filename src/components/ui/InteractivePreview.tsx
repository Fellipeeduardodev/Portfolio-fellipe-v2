import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Lock } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

gsap.registerPlugin(useGSAP);

export const InteractivePreview: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLanguage();

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const cursor = "#preview-cursor";
      const ripple = "#preview-ripple";
      const heroBtn2 = "#preview-hero-btn2";
      const btn2Bg = "#preview-btn2-bg";
      const btn2Arrow = "#preview-btn2-arrow";
      const titleLine2 = "#preview-title-line-2";
      const availDot = "#preview-avail-dot";
      const navBtn = "#preview-nav-btn";
      const navItem1 = "#preview-nav-item1";

      // Master synchronized continuous timeline
      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 1.2,
      });

      // Initial state
      gsap.set(cursor, { x: 760, y: 480, opacity: 0, scale: 1 });
      gsap.set(ripple, { scale: 0, opacity: 0 });
      gsap.set(btn2Bg, { stroke: "#d4d4d4", fill: "#fafafa" });
      gsap.set(btn2Arrow, { x: 0 });
      gsap.set(availDot, { scale: 1 });
      gsap.set(navBtn, { fill: "#171717" });
      gsap.set(navItem1, { fill: "#737373" });

      // Step 1: Cursor enters smoothly from bottom-right
      tl.to(cursor, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      })
        // Step 2: Glides across the monumental title "DESIGN"
        .to(cursor, {
          x: 340,
          y: 250,
          duration: 1.3,
          ease: "power3.inOut",
        })
        .to(titleLine2, { fill: "#525252", duration: 0.25 }, "-=0.2")
        .to(titleLine2, { fill: "#0a0a0a", duration: 0.4, delay: 0.2 })

        // Step 3: Moves precisely to the "Vamos Conversar" Button center (x: 290, y: 447)
        .to(cursor, {
          x: 290,
          y: 447,
          duration: 1.1,
          ease: "power3.inOut",
        })
        // Button reacts to cursor hover
        .to(
          btn2Bg,
          {
            stroke: "#171717",
            fill: "#f0f0f0",
            duration: 0.2,
            ease: "power2.out",
          },
          "-=0.2"
        )
        .to(btn2Arrow, { x: 3, duration: 0.2, ease: "power2.out" }, "<")

        // Step 4: Click action!
        .to(cursor, {
          scale: 0.85,
          duration: 0.1,
          transformOrigin: "0 0",
          ease: "power1.in",
        })
        .to(
          heroBtn2,
          {
            scale: 0.96,
            duration: 0.1,
            transformOrigin: "290px 447px",
            ease: "power1.in",
          },
          "<"
        )
        // Click ripple radiates from exact button center (290, 447)
        .fromTo(
          ripple,
          { scale: 0.2, opacity: 0.75, transformOrigin: "290px 447px" },
          { scale: 3.4, opacity: 0, duration: 0.65, ease: "power2.out" }
        )
        .to(
          cursor,
          { scale: 1, duration: 0.15, transformOrigin: "0 0", ease: "power1.out" },
          "-=0.35"
        )
        .to(
          heroBtn2,
          { scale: 1, duration: 0.15, transformOrigin: "290px 447px", ease: "power1.out" },
          "-=0.35"
        )

        // Step 5: Cursor glides to the right column availability badge (x: 740, y: 402)
        .to(cursor, {
          x: 740,
          y: 402,
          duration: 1.2,
          ease: "power2.inOut",
        })
        .to(availDot, {
          scale: 1.8,
          fill: "#16a34a",
          duration: 0.25,
          transformOrigin: "center center",
        })
        .to(availDot, {
          scale: 1,
          fill: "#22c55e",
          duration: 0.3,
          delay: 0.5,
        })

        // Step 6: Cursor moves to the Floating Navbar: hovers nav item then CTA button
        .to(cursor, {
          x: 385,
          y: 43,
          duration: 1.1,
          ease: "power3.inOut",
        })
        .to(navItem1, { fill: "#0a0a0a", duration: 0.2 })
        .to(navItem1, { fill: "#737373", duration: 0.3, delay: 0.3 })

        .to(cursor, {
          x: 630,
          y: 43,
          duration: 0.8,
          ease: "power2.out",
        })
        .to(navBtn, { fill: "#262626", duration: 0.2 }, "-=0.15")
        .to(navBtn, { fill: "#171717", duration: 0.3, delay: 0.4 })

        // Step 7: Cursor gently fades out and resets for loop
        .to(cursor, { opacity: 0, duration: 0.4 }, "+=0.2");
    },
    { dependencies: [lang], scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl bg-[#0c0c0c] text-neutral-900 shadow-2xl border border-neutral-800/90 overflow-hidden flex flex-col select-none group"
      aria-label="Simulação interativa fiel da Hero do website Fellipe Eduardo"
    >
      {/* ── Top Browser Bar / Chrome ── */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#111111] border-b border-neutral-800/80 relative z-20">
        {/* Window controls */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56] opacity-80" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e] opacity-80" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f] opacity-80" />
        </div>

        {/* URL pill updated to fellipe.tech */}
        <div className="flex items-center gap-2 px-4 py-1 bg-neutral-900/90 rounded-full border border-neutral-800 font-mono text-[11px] text-neutral-300">
          <Lock size={10} className="text-green-500" />
          <span className="tracking-wide">https://fellipe.tech</span>
        </div>

        {/* Subtle Live Status Indicator */}
        <div className="flex items-center gap-2 font-mono text-[10px] text-neutral-400">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="hidden sm:inline uppercase tracking-wider">Live Preview</span>
        </div>
      </div>

      {/* ── Vector Canvas: Reproduzindo fielmente a Hero Original (920 x 530) ── */}
      <div className="relative w-full aspect-[16/10] bg-[#fafafa] overflow-hidden">
        <svg
          viewBox="0 0 920 530"
          className="w-full h-full block"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Soft Shadow for Floating Navbar */}
            <filter id="preview-nav-shadow" x="-10%" y="-20%" width="120%" height="160%">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000000" floodOpacity="0.06" />
            </filter>

            {/* Drop Shadow for Vector Cursor */}
            <filter id="preview-cursor-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="1" dy="2.5" stdDeviation="3" floodColor="#000000" floodOpacity="0.45" />
            </filter>
          </defs>

          {/* Background Canvas */}
          <rect width="920" height="530" fill="#fafafa" />

          {/* Editorial Vertical Grid Lines */}
          <line x1="75" y1="0" x2="75" y2="530" stroke="#f0f0f0" strokeWidth="1" />
          <line x1="845" y1="0" x2="845" y2="530" stroke="#f0f0f0" strokeWidth="1" />

          {/* Background Typography Watermark */}
          <g opacity="0.032" fill="#000000" fontFamily="Outfit, sans-serif" fontWeight="900">
            <text x="35" y="165" fontSize="120" letterSpacing="-2">
              {t.hero.words[1] || "INTERFACE"}
            </text>
            <text x="410" y="310" fontSize="120" letterSpacing="-2">
              {t.hero.words[0] || "CÓDIGO"}
            </text>
            <text x="120" y="470" fontSize="120" letterSpacing="-2">
              {t.hero.words[2] || "PERFORMANCE"}
            </text>
          </g>

          {/* ──── FLOATING NAVBAR PILL (Fiel à Navbar Suspensa do Site: PROJETOS, SOBRE MIM, CONTATO) ──── */}
          <g transform="translate(110, 20)">
            {/* Pill Background */}
            <rect
              width="700"
              height="46"
              rx="23"
              fill="#ffffff"
              stroke="#e5e5e5"
              strokeWidth="1"
              filter="url(#preview-nav-shadow)"
            />

            {/* Logo */}
            <text
              x="30"
              y="28"
              fill="#0a0a0a"
              fontFamily="Outfit, sans-serif"
              fontSize="13"
              fontWeight="800"
              letterSpacing="-0.3"
            >
              Fellipe Eduardo <tspan fill="#22c55e">.</tspan>
            </text>

            {/* Center Nav Links */}
            <g
              fontFamily="JetBrains Mono, monospace"
              fontSize="8.5"
              fontWeight="600"
              fill="#737373"
              letterSpacing="1.2"
            >
              <text id="preview-nav-item1" x="260" y="27">{t.preview.navProjects}</text>
              <text x="370" y="27">{t.preview.navAbout}</text>
              <text x="480" y="27">{t.preview.navContact}</text>
            </g>

            {/* Nav Button */}
            <g>
              <rect
                id="preview-nav-btn"
                x="575"
                y="8"
                width="105"
                height="30"
                rx="15"
                fill="#171717"
              />
              <text
                x="605"
                y="26"
                fill="#ffffff"
                fontFamily="JetBrains Mono, monospace"
                fontSize="8.5"
                fontWeight="700"
                letterSpacing="1"
              >
                {t.preview.navButton}
              </text>
            </g>
          </g>

          {/* ──── HERO LEFT CONTENT ──── */}
          <g transform="translate(0, 0)">
            {/* Micro-label */}
            <text
              x="75"
              y="126"
              fill="#737373"
              fontFamily="JetBrains Mono, monospace"
              fontSize="9"
              fontWeight="600"
              letterSpacing="2"
            >
              {t.preview.tag}
            </text>

            {/* Monumental Headline */}
            <g
              fontFamily="Outfit, sans-serif"
              fontSize="62"
              fontWeight="900"
              letterSpacing="-2.5"
              fill="#0a0a0a"
            >
              <text x="75" y="195">{t.preview.headline1}</text>
              <text id="preview-title-line-2" x="75" y="260">{t.preview.headline2}</text>
              <text x="75" y="325">{t.preview.headline3}</text>
            </g>

            {/* Subtitle */}
            <text
              x="75"
              y="375"
              fill="#525252"
              fontFamily="Inter, sans-serif"
              fontSize="13"
              fontWeight="300"
              letterSpacing="0.1"
            >
              {t.preview.subtitleLine1}
            </text>
            <text
              x="75"
              y="395"
              fill="#525252"
              fontFamily="Inter, sans-serif"
              fontSize="13"
              fontWeight="300"
              letterSpacing="0.1"
            >
              {t.preview.subtitleLine2}
            </text>

            {/* Two Action Buttons (Fiel ao site real: Ver Projetos + Vamos Conversar) */}
            <g transform="translate(0, 0)">
              {/* Button 1: Primary Dark */}
              <g id="preview-hero-btn1">
                <rect
                  x="75"
                  y="426"
                  width="125"
                  height="42"
                  rx="21"
                  fill="#171717"
                />
                <text
                  x="96"
                  y="452"
                  fill="#ffffff"
                  fontFamily="Inter, sans-serif"
                  fontSize="11"
                  fontWeight="600"
                >
                  {t.hero.viewProjects}
                </text>
              </g>

              {/* Button 2: Outline Interactive */}
              <g id="preview-hero-btn2">
                <rect
                  id="preview-btn2-bg"
                  x="212"
                  y="426"
                  width="155"
                  height="42"
                  rx="21"
                  fill="#fafafa"
                  stroke="#d4d4d4"
                  strokeWidth="1.5"
                />
                <text
                  x="234"
                  y="452"
                  fill="#0a0a0a"
                  fontFamily="Inter, sans-serif"
                  fontSize="11"
                  fontWeight="600"
                >
                  {t.hero.contactMe}
                </text>
                <path
                  id="preview-btn2-arrow"
                  d="M342 447 L348 447 M345 444 L348 447 L345 450"
                  stroke="#0a0a0a"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </g>
          </g>

          {/* ──── HERO RIGHT COLUMN (Editorial Authority Block) ──── */}
          <g transform="translate(0, 0)">
            {/* Vertical Divider */}
            <line x1="655" y1="190" x2="655" y2="470" stroke="#e5e5e5" strokeWidth="1" />

            {/* Name */}
            <text
              x="678"
              y="210"
              fill="#0a0a0a"
              fontFamily="Outfit, sans-serif"
              fontSize="13"
              fontWeight="800"
              letterSpacing="0.5"
            >
              FELLIPE EDUARDO
            </text>

            {/* Role & Location */}
            <text
              x="678"
              y="238"
              fill="#0a0a0a"
              fontFamily="JetBrains Mono, monospace"
              fontSize="10"
              fontWeight="700"
              letterSpacing="1"
            >
              {t.preview.role}
            </text>
            <text
              x="678"
              y="254"
              fill="#737373"
              fontFamily="JetBrains Mono, monospace"
              fontSize="9"
              fontWeight="500"
              letterSpacing="0.8"
            >
              {t.preview.location}
            </text>

            {/* Focus List */}
            <text
              x="678"
              y="292"
              fill="#737373"
              fontFamily="JetBrains Mono, monospace"
              fontSize="8.5"
              fontWeight="600"
              letterSpacing="1.5"
            >
              {t.preview.focusLabel}
            </text>
            <g
              fontFamily="JetBrains Mono, monospace"
              fontSize="9.5"
              fontWeight="500"
              fill="#404040"
              letterSpacing="0.5"
            >
              <text x="678" y="315">{t.preview.focusItem1}</text>
              <text x="678" y="335">{t.preview.focusItem2}</text>
              <text x="678" y="355">{t.preview.focusItem3}</text>
            </g>

            {/* Availability Badge */}
            <g id="preview-availability">
              <circle id="preview-avail-dot" cx="683" cy="402" r="3.5" fill="#22c55e" />
              <text
                x="694"
                y="405"
                fill="#0a0a0a"
                fontFamily="JetBrains Mono, monospace"
                fontSize="9"
                fontWeight="700"
                letterSpacing="0.6"
              >
                {t.preview.status}
              </text>
            </g>
          </g>

          {/* ── Vector Click Ripple Wave ── */}
          <circle
            id="preview-ripple"
            cx="290"
            cy="447"
            r="8"
            fill="none"
            stroke="#0a0a0a"
            strokeWidth="2"
            opacity="0"
            pointerEvents="none"
          />

          {/* ── Vector Cursor ── */}
          <g
            id="preview-cursor"
            pointerEvents="none"
            filter="url(#preview-cursor-shadow)"
            opacity="0"
          >
            <path
              d="M0 0 L0 20 L5 15.5 L9.5 24.5 L12.5 23 L8 14.5 L14.5 14.5 Z"
              fill="#0a0a0a"
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>

      {/* ── Clean Bottom Bar ── */}
      <div className="flex items-center justify-between px-5 py-3 bg-[#111111] border-t border-neutral-800/80 text-[11px] font-mono text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-neutral-300 font-medium">{t.preview.bottomTitle}</span>
        </div>
        <span className="text-neutral-500 hidden sm:inline">
          {t.preview.bottomTech}
        </span>
      </div>
    </div>
  );
};
