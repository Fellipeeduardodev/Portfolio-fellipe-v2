import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Only enable on desktop and if reduced motion is disabled
    if (prefersReducedMotion || window.innerWidth <= 768) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Hide native cursor
    document.documentElement.style.cursor = "none";

    // Set initial centering and size
    gsap.set(cursor, { 
      xPercent: -50, 
      yPercent: -50, 
      width: 10,
      height: 10
    });

    // Set up smooth GSAP quickTo interpolators
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3.out" });

    let initialized = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!initialized) {
        gsap.to(cursor, { opacity: 1, duration: 0.2 });
        initialized = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, { opacity: 0, duration: 0.2 });
    };

    const handleMouseEnter = () => {
      gsap.to(cursor, { opacity: 1, duration: 0.2 });
    };

    // Event delegation for hover states
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA";
      if (isInput) {
        gsap.to(cursor, {
          width: 4,
          height: 20,
          borderRadius: 2,
          opacity: 0.5,
          duration: 0.2,
          ease: "power2.out",
        });
        return;
      }

      const isInteractive = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button") || 
        target.closest('[role="tab"]') ||
        target.closest('[role="button"]');

      if (isInteractive) {
        gsap.to(cursor, { 
          width: 52,
          height: 52,
          borderRadius: 9999,
          opacity: 1,
          duration: 0.3, 
          ease: "power2.out" 
        });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA";
      const isInteractive = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button") || 
        target.closest('[role="tab"]') ||
        target.closest('[role="button"]');

      if (isInteractive || isInput) {
        gsap.to(cursor, { 
          width: 10,
          height: 10,
          borderRadius: 9999,
          opacity: 1,
          duration: 0.3, 
          ease: "power2.out" 
        });
      }
    };

    // Tactile press & release feedback
    const handleMouseDown = () => {
      gsap.to(cursor, { scale: 0.75, duration: 0.12, ease: "power2.out" });
    };

    const handleMouseUp = () => {
      gsap.to(cursor, { scale: 1, duration: 0.25, ease: "back.out(2)" });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.documentElement.style.cursor = "auto";
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="hidden md:block fixed top-0 left-0 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference opacity-0 will-change-transform"
      style={{ width: "10px", height: "10px" }}
      aria-hidden="true"
    />
  );
};
