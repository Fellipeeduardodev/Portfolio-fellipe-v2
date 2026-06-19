import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

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

  const getStyles = () => {
    switch (variant) {
      case 'primary':
        // Premium black with white text
        return 'bg-[#171717] hover:bg-[#262626] text-[#fafafa] border border-transparent font-medium';
      case 'secondary':
        // Warm off-white
        return 'bg-[#f4f4f5] hover:bg-[#e4e4e7] text-[#18181b] font-medium';
      case 'outline':
      default:
        // Sophisticated light outline
        return 'border border-neutral-300 hover:border-neutral-800 text-neutral-850 hover:bg-neutral-50 font-medium';
    }
  };

  const buttonContent = (
    <span className="flex items-center justify-between gap-3 text-sm tracking-wide font-medium">
      <span>{label}</span>
      {showArrow && (
        <motion.span
          className="inline-block"
          variants={{
            initial: { x: 0, y: 0 },
            hover: { x: 2, y: -2, scale: 1.1 },
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >
          <ArrowUpRight strokeWidth={2} size={15} />
        </motion.span>
      )}
    </span>
  );

  const containerClasses = `relative overflow-hidden inline-flex w-fit px-6 py-3.5 rounded-full transition-shadow duration-300 select-none shadow-[0_1px_2px_rgba(0,0,0,0.02)] active:translate-y-[1px] ${getStyles()} ${className}`;

  if (isLink) {
    return (
      <motion.a
        id={`btn-${label.toLowerCase().replace(/\s+/g, '-')}`}
        href={href}
        className={containerClasses}
        initial="initial"
        whileHover="hover"
        whileTap={{ scale: 0.98 }}
        target="_blank"
        rel="noopener noreferrer"
      >
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      id={`btn-${label.toLowerCase().replace(/\s+/g, '-')}`}
      onClick={onClick}
      className={containerClasses}
      initial="initial"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
    >
      {buttonContent}
    </motion.button>
  );
};
