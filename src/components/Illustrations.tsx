import React from 'react';

export const CoffeeBeanIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79.48.51 1.05.95 1.7 1.28 1.94.99 4.26.4 5.09-1.26.85-1.7-.13-3.67-1.89-4.38-.56-.23-1.15-.33-1.74-.32C10.23 4.54 11.1 4 12 4c4.41 0 8 3.59 8 8 0 4.08-3.05 7.44-7 7.93z" />
  </svg>
);

export const CoffeeSteam: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-end justify-center gap-1.5 h-8 ${className}`}>
    <span className="w-1.5 h-6 bg-[#C68B59]/60 rounded-full blur-[0.5px] animate-steam-1" />
    <span className="w-1.5 h-8 bg-[#C68B59]/70 rounded-full blur-[0.5px] animate-steam-2" />
    <span className="w-1.5 h-5 bg-[#C68B59]/50 rounded-full blur-[0.5px] animate-steam-3" />
  </div>
);

export const CoffeeLeafBranch: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M20 80 Q 45 45 85 20"
      stroke="#7B8F77"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M35 62 C 30 50 35 40 50 45 C 50 55 45 65 35 62 Z"
      fill="#7B8F77"
      fillOpacity="0.4"
      stroke="#5F735B"
      strokeWidth="1.5"
    />
    <path
      d="M52 48 C 65 42 70 50 65 62 C 55 60 48 55 52 48 Z"
      fill="#7B8F77"
      fillOpacity="0.5"
      stroke="#5F735B"
      strokeWidth="1.5"
    />
    <path
      d="M68 33 C 70 20 82 25 82 35 C 78 40 70 42 68 33 Z"
      fill="#7B8F77"
      fillOpacity="0.6"
      stroke="#5F735B"
      strokeWidth="1.5"
    />
    {/* Coffee Cherries */}
    <circle cx="48" cy="52" r="4" fill="#C68B59" />
    <circle cx="53" cy="55" r="3.5" fill="#A83232" />
    <circle cx="67" cy="38" r="4" fill="#8B2500" />
  </svg>
);
