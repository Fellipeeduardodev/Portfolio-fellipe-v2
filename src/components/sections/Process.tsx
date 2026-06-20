import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { svgIcone } from "@edusites/icons/core";
import { Compass, Lightbulb, Layers, Code2, Rocket } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function Icone({ nome, cor, tamanho, className }: { nome: string, cor?: string, tamanho?: number, className?: string }) {
  const svg = svgIcone({ nome, cor, tamanho }) || '';
  return <span className={`inline-flex items-center justify-center ${className || ''}`} dangerouslySetInnerHTML={{ __html: svg }} />;
}

const stages = [
  {
    id: "01",
    title: "CONTATO",
    subtitle: "Tudo começa com uma conversa.",
    description: "Entendo seus objetivos, desafios e expectativas.\n\nAntes de pensar em design ou código, procuro entender o que realmente precisa ser resolvido.",
    badge: "Descoberta",
    icon: Compass
  },
  {
    id: "02",
    title: "IDEIA",
    subtitle: "Transformando necessidades em soluções.",
    description: "Defino a melhor direção para o projeto.\n\nEstratégia, experiência do usuário e objetivos de negócio caminham juntos desde o início.",
    badge: "Estratégia",
    icon: Lightbulb
  },
  {
    id: "03",
    title: "PROTÓTIPO",
    subtitle: "Validando antes de construir.",
    description: "Crio protótipos e estruturas que permitem visualizar o produto antes do desenvolvimento.\n\nMenos retrabalho.\nMais clareza.",
    badge: "Protótipo",
    icon: Layers
  },
  {
    id: "04",
    title: "DESENVOLVIMENTO",
    subtitle: "Onde a ideia ganha vida.",
    description: "Transformo o projeto em uma experiência digital moderna, rápida, responsiva e escalável.\n\nCódigo limpo e foco em performance.",
    badge: "Desenvolvimento",
    icon: Code2
  },
  {
    id: "05",
    title: "LANÇAMENTO",
    subtitle: "Pronto para o mundo real.",
    description: "Publicação, otimizações finais e acompanhamento.\n\nO objetivo não é apenas entregar um site, mas criar um produto preparado para crescer.",
    badge: "Lançamento",
    icon: Rocket
  }
];

export const Process: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileContentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStage, setActiveStage] = useState(0);
  const [isMobile, setIsMobile] = useState(() => 
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const isScrolling = useRef(false);
  const scrollTimeout = useRef<number | null>(null);

  // Check if mobile for interaction logic
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => {
      isScrolling.current = true;
      if (scrollTimeout.current) {
        window.clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = window.setTimeout(() => {
        isScrolling.current = false;
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        window.clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!prefersReducedMotion) {
        // Marquee Infinite Scroll Animation
        gsap.to(".process-marquee-content", {
          xPercent: -50,
          ease: "none",
          duration: 30,
          repeat: -1,
        });

        // Giant Title Scroll Animation
        gsap.fromTo(
          ".process-title-line",
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            stagger: 0.15,
            ease: "power4.out",
            scrollTrigger: {
              trigger: ".process-header",
              start: "top 80%",
            },
          }
        );

        // Tab Items Staggered Scroll Animation
        gsap.fromTo(
          ".process-tab-item",
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
            clearProps: "transform,opacity",
            scrollTrigger: {
              trigger: ".process-tablist",
              start: "top 90%",
            },
          }
        );
      } else {
        // Immediate static layout for users who prefer reduced motion
        gsap.set(".process-title-line", { y: 0, opacity: 1 });
        gsap.set(".process-tab-item", { y: 0, opacity: 1 });
      }
    },
    { scope: sectionRef }
  );

  // GSAP Desktop Tab Content Reveal Animation
  useGSAP(() => {
    if (isMobile) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    contentRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === activeStage) {
        gsap.to(el, { 
          opacity: 1, 
          y: 0, 
          duration: prefersReducedMotion ? 0.01 : 0.8, 
          ease: "power3.out", 
          zIndex: 10, 
          autoAlpha: 1, 
          overwrite: "auto" 
        });
      } else {
        gsap.to(el, { 
          opacity: 0, 
          y: prefersReducedMotion ? 0 : 40, 
          duration: prefersReducedMotion ? 0.01 : 0.6, 
          ease: "power3.out", 
          zIndex: 0, 
          autoAlpha: 0, 
          overwrite: "auto" 
        });
      }
    });
  }, { dependencies: [activeStage, isMobile], scope: sectionRef });

  // GSAP Mobile Accordion Animation
  useGSAP(() => {
    if (!isMobile) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    mobileContentRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === activeStage) {
        gsap.to(el, { 
          height: "auto", 
          opacity: 1, 
          duration: prefersReducedMotion ? 0.01 : 0.8, 
          ease: "power3.inOut", 
          overwrite: "auto" 
        });
      } else {
        gsap.to(el, { 
          height: 0, 
          opacity: 0, 
          duration: prefersReducedMotion ? 0.01 : 0.6, 
          ease: "power3.inOut", 
          overwrite: "auto" 
        });
      }
    });
  }, { dependencies: [activeStage, isMobile], scope: sectionRef });

  const handleInteraction = (index: number, isHover = false) => {
    if (isHover && isScrolling.current) return;
    if (activeStage !== index) {
      setActiveStage(index);
    }
  };

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-white text-neutral-950 select-none overflow-hidden"
    >
      {/* Editorial grid lines */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 bottom-0 left-[8%] w-[1px] bg-neutral-200/30 hidden md:block" />
        <div className="absolute top-0 bottom-0 right-[8%] w-[1px] bg-neutral-200/30 hidden md:block" />
        
        {/* Margin Label */}
        <span className="absolute top-[20%] left-[8.5%] font-mono text-[9px] tracking-[0.2em] text-neutral-400 uppercase hidden lg:block">
          [ 02 // PROCESS ]
        </span>
      </div>
      {/* AUTHENTIC EDITORIAL DIVIDER (Infinite Marquee) */}
      <div 
        className="w-full border-t border-b border-neutral-200/80 bg-[#f8f8f8] py-4 md:py-5 overflow-hidden flex items-center relative z-20"
        aria-hidden="true"
      >
        <div className="process-marquee-content flex whitespace-nowrap opacity-70 w-max">
          {/* Double the content to ensure smooth infinite loop when translating -50% */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center">
              <span className="text-[10px] md:text-xs font-mono font-medium tracking-[0.25em] uppercase text-neutral-950 mx-8 md:mx-12">Landing Pages</span>
              <span className="w-1.5 h-1.5 bg-neutral-950 rounded-full" />
              <span className="text-[10px] md:text-xs font-mono font-medium tracking-[0.25em] uppercase text-neutral-950 mx-8 md:mx-12">Websites Institucionais</span>
              <span className="w-1.5 h-1.5 bg-neutral-950 rounded-full" />
              <span className="text-[10px] md:text-xs font-mono font-medium tracking-[0.25em] uppercase text-neutral-950 mx-8 md:mx-12">Sistemas Web</span>
              <span className="w-1.5 h-1.5 bg-neutral-950 rounded-full" />
              <span className="text-[10px] md:text-xs font-mono font-medium tracking-[0.25em] uppercase text-neutral-950 mx-8 md:mx-12">Experiências Digitais</span>
              <span className="w-1.5 h-1.5 bg-neutral-950 rounded-full" />
              <span className="text-[10px] md:text-xs font-mono font-medium tracking-[0.25em] uppercase text-neutral-950 mx-8 md:mx-12">Front-End</span>
              <span className="w-1.5 h-1.5 bg-neutral-950 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-12 py-20 md:py-32">
        
        {/* HEADER: Giant Title */}
        <div className="process-header flex flex-col items-center md:items-start w-full mb-20 md:mb-32 overflow-hidden">
          <h2 className="w-full text-center md:text-left flex flex-col">
            <span className="overflow-hidden block">
              <span className="process-title-line block font-display font-black text-[clamp(3rem,11vw,9.5rem)] leading-[0.95] tracking-tight uppercase text-neutral-950 pb-2">
                DA IDEIA
              </span>
            </span>
            <span className="overflow-hidden block md:ml-12 lg:ml-24">
              <span className="process-title-line block font-display font-black text-[clamp(3rem,11vw,9.5rem)] leading-[0.95] tracking-tight uppercase text-neutral-950 pb-2">
                À INTERFACE
              </span>
            </span>
          </h2>
          
          <p className="mt-8 md:mt-12 text-center md:text-left text-lg md:text-2xl lg:text-3xl font-sans font-light text-neutral-500 max-w-2xl md:ml-12 lg:ml-24 tracking-wide">
            transformando conceitos<br className="hidden md:block"/> em experiências digitais reais.
          </p>
        </div>

        {/* TWO COLUMN CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 items-start relative min-h-[600px] md:min-h-[500px]">
          
          {/* LEFT: Tab List (Col 1-5) */}
          <div 
            className="process-tablist md:col-span-5 flex flex-col w-full relative z-10 border-t border-neutral-200"
            role="tablist"
            aria-label="Etapas do processo de desenvolvimento"
          >
            {stages.map((stage, index) => {
              const isActive = activeStage === index;
              const Icon = stage.icon;
              return (
                <div
                  key={stage.id}
                  role="tab"
                  id={`stage-tab-${stage.id}`}
                  aria-selected={isActive}
                  aria-controls={`stage-panel-${stage.id}`}
                  tabIndex={0}
                  className={`process-tab-item group relative border-b border-neutral-200 transition-all duration-700 cursor-pointer py-10 md:py-12 px-2 md:px-4 outline-none ${
                    isActive ? "bg-white opacity-100" : "opacity-40 hover:opacity-70"
                  }`}
                  onMouseEnter={() => !isMobile && handleInteraction(index, true)}
                  onClick={() => handleInteraction(index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleInteraction(index);
                    }
                  }}
                >
                  {/* Title Row */}
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                    <div className="flex items-center gap-6 md:gap-8 w-20 md:w-28 flex-shrink-0">
                      <span className="font-mono text-sm tracking-widest text-neutral-950 font-semibold">
                        {stage.id}
                      </span>
                      <span className="text-neutral-950 flex-shrink-0" aria-hidden="true">
                        <Icon className="w-5 h-5 md:w-6 h-6 stroke-[1.5]" />
                      </span>
                    </div>
                    <h3 
                      className={`font-display text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold tracking-tighter uppercase transition-all duration-700 ${
                        isActive ? "text-neutral-950 md:translate-x-3" : "text-neutral-950"
                      }`}
                    >
                      {stage.title}
                    </h3>
                  </div>

                  {/* MOBILE INLINE CONTENT */}
                  <div 
                    ref={(el) => (mobileContentRefs.current[index] = el)}
                    id={`stage-panel-${stage.id}`}
                    role="tabpanel"
                    aria-labelledby={`stage-tab-${stage.id}`}
                    className="md:hidden overflow-hidden"
                    style={{
                      height: index === 0 ? "auto" : 0,
                      opacity: index === 0 ? 1 : 0,
                    }}
                  >
                    <div className="flex flex-col items-start gap-8 pt-8 pb-4">
                      {/* Badge */}
                      <div className="px-4 py-1.5 rounded-full border border-neutral-200 bg-[#f8f8f8] flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-neutral-600 stroke-[1.5]" aria-hidden="true" />
                        <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-neutral-600">
                          {stage.badge}
                        </span>
                      </div>

                      {/* Subtitle */}
                      <h4 className="font-display text-2xl font-medium tracking-tight leading-[1.15] text-neutral-950">
                        {stage.subtitle}
                      </h4>

                      {/* Description */}
                      <p className="text-base text-neutral-500 leading-relaxed font-sans whitespace-pre-line">
                        {stage.description}
                      </p>

                      {/* CTA Button */}
                      {stage.id === "01" && (
                        <a 
                          href="mailto:fellipeeduardo1611@gmail.com" 
                          className="mt-2 inline-flex items-center gap-3 px-8 py-4 bg-neutral-950 text-white rounded-full font-mono text-xs tracking-widest uppercase"
                        >
                          INICIAR PROJETO
                          <Icone nome="seta-direita" tamanho={16} cor="currentColor" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* DESKTOP RIGHT: Dynamic Content Reveal (Col 6-12) */}
          <div className="hidden md:flex md:col-span-7 h-full relative mt-8 md:mt-0">
            <div className="sticky top-[30vh] w-full h-[400px] md:h-auto">
              {stages.map((stage, index) => {
                const Icon = stage.icon;
                return (
                  <div 
                    key={stage.id} 
                    ref={(el) => (contentRefs.current[index] = el)}
                    id={`stage-panel-${stage.id}`}
                    role="tabpanel"
                    aria-labelledby={`stage-tab-${stage.id}`}
                    className={`absolute top-0 left-0 w-full flex flex-col items-start gap-6 md:gap-10 p-2 md:p-8 ${index === activeStage && !isMobile ? 'opacity-100 visible translate-y-0 z-10' : 'opacity-0 invisible translate-y-10 z-0 pointer-events-none'}`}
                  >
                    {/* Badge */}
                    <div className="px-4 py-1.5 rounded-full border border-neutral-200 bg-[#f8f8f8] flex items-center gap-3">
                      <Icon className="w-3.5 h-3.5 text-neutral-600 stroke-[1.5]" aria-hidden="true" />
                      <span className="font-mono text-[11px] md:text-xs font-semibold uppercase tracking-widest text-neutral-600">
                        {stage.badge}
                      </span>
                    </div>

                    {/* Subtitle */}
                    <h4 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.15] text-neutral-950 max-w-lg">
                      {stage.subtitle}
                    </h4>

                    {/* Description */}
                    <p className="text-base md:text-lg lg:text-xl text-neutral-500 leading-relaxed font-sans max-w-xl whitespace-pre-line">
                      {stage.description}
                    </p>

                    {/* CTA Button */}
                    {stage.id === "01" && (
                      <a 
                        href="mailto:fellipeeduardo1611@gmail.com" 
                        className="mt-6 inline-flex items-center gap-3 px-8 py-4 bg-neutral-950 text-white rounded-full font-mono text-sm tracking-widest uppercase hover:bg-neutral-800 transition-colors duration-300 group"
                      >
                        INICIAR PROJETO
                        <Icone nome="seta-direita" tamanho={16} cor="currentColor" className="group-hover:translate-x-1 transition-transform duration-300" />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
