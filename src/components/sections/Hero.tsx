import React, { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { socialItems } from "../../data/socials";
import { FloatingTag } from "../ui/FloatingTag";
import { processStages } from "../../data/skills";
import avatarImg from "../../../assets/images/avatar.webp";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Premium Entrance Animations
      tl.fromTo(
        ".hero-title-top",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.8, ease: "power4.out" }
      )
        .fromTo(
          ".hero-title-bottom",
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.8, ease: "power4.out" },
          "-=1.5"
        )
        .fromTo(
          ".hero-avatar",
          { y: 60, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 2, ease: "power3.out" },
          "-=1.4"
        )
        .fromTo(
          ".hero-content-reveal > *",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 1.2, ease: "power3.out" },
          "-=1.5"
        )
        .fromTo(
          ".hero-socials-reveal > *",
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 1.2, ease: "power3.out" },
          "-=1.0"
        );

      // Continuous breathing animation for the avatar
      gsap.to(".hero-avatar-img", {
        y: -12,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      // Floating tags organic subtle movement
      gsap.to(".floating-tag-anim-1", {
        y: -8,
        x: 4,
        duration: 3.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
      gsap.to(".floating-tag-anim-2", {
        y: 8,
        x: -4,
        duration: 4.2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 0.5,
      });
      
      // Gentle subtle parallax for the background text on mousemove (desktop only mostly)
      const bgText = document.querySelector(".hero-bg-text");
      
      let xTo: gsap.QuickToFunc;
      let yTo: gsap.QuickToFunc;

      if (bgText) {
        xTo = gsap.quickTo(bgText, "x", { duration: 1, ease: "power2.out" });
        yTo = gsap.quickTo(bgText, "y", { duration: 1, ease: "power2.out" });
      }

      const handleMouseMove = (e: MouseEvent) => {
        if (window.innerWidth > 768 && xTo && yTo) {
          xTo((e.clientX / window.innerWidth - 0.5) * 30);
          yTo((e.clientY / window.innerHeight - 0.5) * 15);
        }
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    },
    { scope: containerRef }
  );

  // Filter specific tags for mobile: ONLY 'Interface' and 'Launch'
  const mobileTags = processStages.filter(s => 
    ['Interface', 'Launch'].includes(s.label)
  );

  // Specific safe positions for mobile around the portrait
  const mobilePositions = [
    { top: "60%", left: "-10%", className: "floating-tag-anim-1" }, // Interface
    { top: "75%", left: "70%", className: "floating-tag-anim-2" }, // Launch
  ];

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-[100svh] flex flex-col justify-start md:justify-between bg-[#fafafa] pt-[120px] md:pt-32 pb-8 md:pb-12 px-4 md:px-12 overflow-hidden select-none"
    >
      {/* Editorial Decorative Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-0 bottom-0 left-[8%] w-[1px] bg-neutral-200/50 hidden md:block" />
        <div className="absolute top-0 bottom-0 right-[8%] w-[1px] bg-neutral-200/50 hidden md:block" />
        <div className="absolute top-[20%] left-0 right-0 h-[1px] bg-neutral-200/40 hidden md:block" />
        <div className="absolute top-[80%] left-0 right-0 h-[1px] bg-neutral-200/40 hidden md:block" />
        <div className="glow-effect top-1/3 md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[60vw] h-[90vw] md:h-[60vw] rounded-full" />
      </div>

      {/* GIANT BACKGROUND TYPOGRAPHY - THE CONCEPT */}
      <div className="absolute inset-0 flex items-start md:items-center justify-center overflow-hidden z-10 pointer-events-none mt-[14vh] md:mt-0">
        <div className="hero-bg-text flex flex-col items-center">
          <div className="overflow-hidden">
            <h1 className="hero-title-top font-display font-black text-[clamp(5rem,22vw,9rem)] md:text-[16vw] lg:text-[14vw] tracking-tighter text-[#e8e8e8] leading-[0.85] whitespace-nowrap uppercase">
              FELLIPE
            </h1>
          </div>
          <div className="overflow-hidden mt-0 md:mt-6 ml-0 md:ml-32">
            <h1 className="hero-title-bottom font-display font-black text-[clamp(5rem,22vw,9rem)] md:text-[16vw] lg:text-[14vw] tracking-tighter text-[#e8e8e8] leading-[0.85] whitespace-nowrap uppercase">
              EDUARDO
            </h1>
          </div>
        </div>
      </div>

      {/* PORTRAIT - MOBILE RELATIVE FLOW, DESKTOP ABSOLUTE BOTTOM */}
      <div className="relative md:absolute md:bottom-0 md:left-1/2 md:-translate-x-1/2 z-20 pointer-events-none -mt-4 md:mt-0 mx-auto w-full flex justify-center">
        <div className="relative hero-avatar">
          <div className="hero-avatar-img">
            <img
              src={avatarImg}
              alt="Fellipe Eduardo - Avatar 3D"
              className="w-[300px] sm:w-[340px] md:w-[550px] lg:w-[700px] h-auto object-contain mix-blend-multiply select-none"
              draggable={false}
            />
          </div>

          {/* Desktop Floating Process Stages orbiting the portrait */}
          <div className="hidden md:block">
            {processStages.map((stage, idx) => (
              <FloatingTag
                key={stage.label}
                label={stage.label}
                top={stage.desktopTop}
                left={stage.desktopLeft}
                mobileHidden={stage.mobileHidden}
                index={idx}
              />
            ))}
          </div>
          
          {/* Mobile Specific Floating Tags (Only Interface and Launch) */}
          <div className="md:hidden absolute inset-0 pointer-events-none">
            {mobileTags.map((stage, idx) => (
              <div key={stage.label} className={`scale-[0.85] origin-center absolute w-full h-full ${mobilePositions[idx]?.className || ""}`}>
                <FloatingTag
                  label={stage.label}
                  top={mobilePositions[idx]?.top || "0%"}
                  left={mobilePositions[idx]?.left || "0%"}
                  mobileHidden={false}
                  index={idx}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hidden md:block h-12 pointer-events-none" />

      {/* BOTTOM AREA GRID - MOBILE FLOW */}
      <div className="relative z-30 flex-grow flex flex-col justify-end -mt-6 md:mt-auto md:grid md:grid-cols-12 md:gap-4 md:items-end">
        
        {/* LEFT CONTENT - STRONG MESSAGING */}
        <div className="hero-left-content hero-content-reveal md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left gap-3 md:gap-5 w-full md:max-w-md mx-auto md:mx-0">
          
          {/* CONCEPT LABEL */}
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#171717] animate-pulse" />
            <span className="text-[10px] md:text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-neutral-800">
              FROM IDEA TO INTERFACE
            </span>
          </div>

          <h2 className="font-display font-bold text-[22px] md:text-[26px] tracking-tight leading-[1.2] text-neutral-950 w-full max-w-[320px] md:max-w-none">
            Transformando ideias em interfaces modernas, rápidas e memoráveis.
          </h2>
          
          <p className="text-[14px] md:text-[15px] text-neutral-600 font-sans leading-relaxed w-full max-w-[320px] md:max-w-none">
            Da estratégia ao código, crio experiências digitais com foco em resultado, performance e experiência do usuário.
          </p>

          <div className="mt-3 w-full flex justify-center md:justify-start">
            <a
              href="mailto:fellipeeduardo1611@gmail.com"
              className="group flex items-center justify-center gap-2 px-8 py-3.5 bg-[#111] text-white rounded-full transition-all duration-500 hover:bg-[#000] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] active:scale-[0.98]"
            >
              <span className="font-mono text-[11px] font-medium tracking-[0.1em] uppercase mt-0.5">Vamos conversar</span>
              <ArrowUpRight
                size={16}
                strokeWidth={2}
                className="text-neutral-400 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
              />
            </a>
          </div>
        </div>

        {/* EMPTY CENTER FOR BALANCE */}
        <div className="hidden md:flex md:col-span-4" />

        {/* RIGHT CONTENT - EDITORIAL SOCIAL SIDEBAR */}
        <div className="hero-socials md:col-span-3 flex flex-col items-center md:items-end gap-5 md:ml-auto md:border-l md:border-neutral-200/60 md:pl-8 md:pb-2 w-full mt-8 md:mt-0 pt-6 md:pt-0">
          <div className="hidden md:block text-[10px] font-mono font-medium tracking-[0.2em] text-neutral-400 uppercase md:text-right writing-vertical-lr md:transform-none">
            Digital Identity
          </div>
          
          <div className="hero-socials-reveal grid grid-cols-2 md:flex md:flex-col justify-items-center md:justify-end items-center md:items-end gap-x-4 gap-y-5 md:gap-4 w-full max-w-[300px] md:max-w-none mx-auto md:mx-0">
            {socialItems.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-1 text-[13px] md:text-sm font-medium text-neutral-600 hover:text-neutral-950 transition-colors w-full md:w-auto"
              >
                <span>{social.name}</span>
                <ArrowUpRight size={14} className="opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
