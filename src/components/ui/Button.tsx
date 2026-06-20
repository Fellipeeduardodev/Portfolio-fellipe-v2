import React, { useRef, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  showArrow?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  href,
  variant = 'primary',
  showArrow = true,
  className = '',
}) => {
  const isLink = !!href;
  const buttonRef = useRef<any>(null);

  useEffect(() => {
    const el = buttonRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      xTo(relX * 0.35);
      yTo(relY * 0.35);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const getStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-[#171717] hover:bg-[#262626] text-[#fafafa] border border-transparent font-medium';
      case 'secondary':
        return 'bg-[#f4f4f5] hover:bg-[#e4e4e7] text-[#18181b] font-medium';
      case 'outline':
      default:
        return 'border border-neutral-300 hover:border-neutral-800 text-neutral-800 hover:bg-neutral-50 font-medium';
    }
  };

  const buttonContent = (
    <span className="flex items-center justify-between gap-3 text-sm tracking-wide font-medium">
      <span>{label}</span>
      {showArrow && (
        <span className="inline-block transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <ArrowUpRight strokeWidth={2} size={15} />
        </span>
      )}
    </span>
  );

  const containerClasses = `group relative overflow-hidden inline-flex w-fit px-6 py-3.5 rounded-full transition-[background-color,border-color,box-shadow,opacity] duration-300 select-none shadow-[0_1px_2px_rgba(0,0,0,0.02)] active:scale-[0.98] ${getStyles()} ${className}`;

  if (isLink) {
    return (
      <a
        ref={buttonRef}
        id={`btn-${label.toLowerCase().replace(/\s+/g, '-')}`}
        href={href}
        className={containerClasses}
        target="_blank"
        rel="noopener noreferrer"
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef}
      id={`btn-${label.toLowerCase().replace(/\s+/g, '-')}`}
      onClick={onClick}
      className={containerClasses}
    >
      {buttonContent}
    </button>
  );
};
