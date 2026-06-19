import React from 'react';

interface ProcessVisualProps {
  activeStage: number;
}

export const ProcessVisual: React.FC<ProcessVisualProps> = ({ activeStage }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#f8f8f8] overflow-hidden">
      {/* 01 IDEA - Abstract expanding core */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          activeStage === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <svg viewBox="0 0 100 100" className="w-[60%] h-[60%] max-w-[400px] stroke-neutral-900 fill-none" strokeWidth="0.5">
          <circle cx="50" cy="50" r="4" className="fill-neutral-900" />
          <circle cx="50" cy="50" r="16" strokeDasharray="2 4" />
          <circle cx="50" cy="50" r="32" strokeWidth="0.2" />
          <line x1="50" y1="10" x2="50" y2="18" />
          <line x1="50" y1="82" x2="50" y2="90" />
          <line x1="10" y1="50" x2="18" y2="50" />
          <line x1="82" y1="50" x2="90" y2="50" />
          <circle cx="50" cy="50" r="44" strokeWidth="0.1" />
        </svg>
      </div>

      {/* 02 RESEARCH - Abstract data nodes */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          activeStage === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
        }`}
      >
        <svg viewBox="0 0 100 100" className="w-[60%] h-[60%] max-w-[400px] stroke-neutral-900 fill-none" strokeWidth="0.5">
          <rect x="20" y="60" width="8" height="20" className="fill-neutral-200 stroke-none" />
          <rect x="36" y="45" width="8" height="35" className="fill-neutral-900 stroke-none" />
          <rect x="52" y="30" width="8" height="50" className="fill-neutral-300 stroke-none" />
          <rect x="68" y="55" width="8" height="25" className="fill-neutral-400 stroke-none" />
          <path d="M 24 50 L 40 35 L 56 20 L 72 45" strokeWidth="1" strokeLinejoin="round" />
          <circle cx="24" cy="50" r="2" className="fill-white" />
          <circle cx="40" cy="35" r="2" className="fill-white" />
          <circle cx="56" cy="20" r="2" className="fill-neutral-900 stroke-none" />
          <circle cx="72" cy="45" r="2" className="fill-white" />
          <line x1="10" y1="80" x2="90" y2="80" strokeWidth="1" />
        </svg>
      </div>

      {/* 03 WIREFRAME - Clean layout skeleton */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          activeStage === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <svg viewBox="0 0 100 100" className="w-[60%] h-[60%] max-w-[400px] stroke-neutral-400 fill-none" strokeWidth="0.5">
          <rect x="15" y="15" width="70" height="70" rx="2" strokeWidth="1" />
          <rect x="25" y="25" width="50" height="8" rx="1" />
          <rect x="25" y="40" width="22" height="20" rx="1" />
          <rect x="53" y="40" width="22" height="20" rx="1" />
          <rect x="25" y="65" width="30" height="4" rx="0.5" />
          <rect x="25" y="72" width="20" height="4" rx="0.5" />
          <line x1="25" y1="40" x2="47" y2="60" strokeWidth="0.2" />
          <line x1="47" y1="40" x2="25" y2="60" strokeWidth="0.2" />
          <line x1="53" y1="40" x2="75" y2="60" strokeWidth="0.2" />
          <line x1="75" y1="40" x2="53" y2="60" strokeWidth="0.2" />
        </svg>
      </div>

      {/* 04 INTERFACE - Polished structural blocks */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          activeStage === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
        }`}
      >
        <svg viewBox="0 0 100 100" className="w-[60%] h-[60%] max-w-[400px] stroke-none" fill="none">
          <rect x="15" y="15" width="70" height="70" rx="4" className="fill-white stroke-neutral-200" strokeWidth="1" />
          <rect x="22" y="22" width="25" height="6" rx="2" className="fill-neutral-900" />
          <rect x="53" y="23" width="8" height="4" rx="2" className="fill-neutral-200" />
          <rect x="63" y="23" width="8" height="4" rx="2" className="fill-neutral-200" />
          <rect x="73" y="23" width="8" height="4" rx="2" className="fill-neutral-200" />
          
          <rect x="22" y="38" width="56" height="24" rx="3" className="fill-neutral-100" />
          <circle cx="50" cy="50" r="6" className="fill-white" />
          
          <rect x="22" y="70" width="18" height="5" rx="2" className="fill-neutral-800" />
          <rect x="22" y="78" width="35" height="3" rx="1.5" className="fill-neutral-300" />
        </svg>
      </div>

      {/* 05 CODE - Monospaced typographic abstract */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          activeStage === 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <svg viewBox="0 0 100 100" className="w-[60%] h-[60%] max-w-[400px] stroke-neutral-900 fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 35 30 L 20 50 L 35 70" />
          <path d="M 65 30 L 80 50 L 65 70" />
          <line x1="55" y1="25" x2="45" y2="75" strokeWidth="1" />
          
          {/* Abstract code lines */}
          <line x1="35" y1="45" x2="42" y2="45" strokeWidth="1" className="stroke-neutral-300" />
          <line x1="38" y1="55" x2="48" y2="55" strokeWidth="1" className="stroke-neutral-300" />
        </svg>
      </div>

      {/* 06 LAUNCH - Upward diagonal geometry */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          activeStage === 5 ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
        }`}
      >
        <svg viewBox="0 0 100 100" className="w-[60%] h-[60%] max-w-[400px] stroke-neutral-900 fill-none">
          <rect x="25" y="25" width="50" height="50" strokeWidth="0.5" className="stroke-neutral-300" />
          <path d="M 30 70 L 70 30" strokeWidth="1.5" />
          <path d="M 50 30 L 70 30 L 70 50" strokeWidth="1.5" />
          <circle cx="70" cy="30" r="3" className="fill-neutral-900 stroke-none" />
          
          <line x1="20" y1="80" x2="35" y2="65" strokeWidth="0.5" strokeDasharray="2 2" className="stroke-neutral-400" />
        </svg>
      </div>
    </div>
  );
};
