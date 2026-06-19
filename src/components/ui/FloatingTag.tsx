import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface FloatingTagProps {
  label: string;
  top: string;
  left: string;
  mobileHidden?: boolean;
  index: number;
}

export const FloatingTag: React.FC<FloatingTagProps> = ({
  label,
  top,
  left,
  mobileHidden = false,
  index,
}) => {
  const tagRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!tagRef.current) return;
    
    const floatY = index % 2 === 0 ? 5 : 6;
    const floatX = index % 3 === 0 ? 2 : index % 3 === 1 ? -2 : 0;
    const duration = 4.5 + (index % 3) * 0.8;

    // Entrance
    gsap.fromTo(
      tagRef.current,
      { opacity: 0, scale: 0, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, delay: 0.4 + index * 0.15, ease: "back.out(1.7)" }
    );

    // Continuous float
    gsap.to(tagRef.current, {
      y: `+=${floatY}`,
      x: `+=${floatX}`,
      duration: duration,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
      delay: 1.2 + index * 0.15, // start after entrance
    });

  }, { scope: tagRef });

  return (
    <div
      ref={tagRef}
      id={`floating-tag-${label.toLowerCase().replace(/\s+/g, '-')}`}
      className={`floating-tag absolute z-25 flex items-center gap-2 px-3.5 py-1.5 md:px-4 md:py-2 bg-white border border-neutral-100 shadow-[0_10px_20px_rgba(0,0,0,0.03)] rounded-full select-none cursor-pointer transition-colors duration-200 hover:border-neutral-900 ${
        mobileHidden ? 'hidden md:flex' : 'flex'
      }`}
      style={{
        top,
        left,
      }}
      onMouseEnter={() => gsap.to(tagRef.current, { scale: 1.05, rotate: index % 2 === 0 ? 1 : -1, duration: 0.2 })}
      onMouseLeave={() => gsap.to(tagRef.current, { scale: 1, rotate: 0, duration: 0.2 })}
    >
      {/* Decorative tiny dot */}
      <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 opacity-60" />
      <span className="text-[10px] md:text-xs font-mono font-medium tracking-wide text-neutral-800 uppercase">
        {label}
      </span>
    </div>
  );
};
