import React from 'react';
import sandhyaNewLogo from '../assets/images/sandhya_new_logo.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showText?: boolean;
  inverted?: boolean;
  withBadge?: boolean;
}

export const SandhyaLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  inverted = false,
  withBadge = false
}) => {
  const sizeMap = {
    sm: { seal: 'w-10 h-10', pad: 'p-0.5', text: 'text-sm', sub: 'text-[10px]' },
    md: { seal: 'w-12 h-12', pad: 'p-1', text: 'text-base', sub: 'text-xs' },
    lg: { seal: 'w-16 h-16', pad: 'p-1', text: 'text-xl', sub: 'text-sm' },
    xl: { seal: 'w-24 h-24', pad: 'p-1.5', text: 'text-2xl', sub: 'text-base' },
    '2xl': { seal: 'w-32 h-32', pad: 'p-2', text: 'text-3xl', sub: 'text-lg' }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* High Definition Official Logo Emblem with Precision Border */}
      <div
        className={`relative ${sizeMap[size].seal} ${sizeMap[size].pad} flex-shrink-0 rounded-full border-2 ${
          inverted
            ? 'border-orange-500 bg-slate-900 ring-2 ring-orange-500/30 shadow-lg'
            : 'border-orange-500 bg-white ring-2 ring-orange-500/25 shadow-md'
        } flex items-center justify-center transition-transform hover:scale-105 select-none`}
        title="Sandhya Enterprises - Commercial Gas Service"
      >
        <img
          src={sandhyaNewLogo}
          alt="Sandhya Enterprises Commercial Gas Service Official Logo"
          className="w-full h-full object-contain filter drop-shadow-xs select-none"
          referrerPolicy="no-referrer"
          loading="eager"
        />
      </div>

      {/* Brand Typography & Verification */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-tight uppercase ${
                inverted ? 'text-white' : 'text-slate-900'
              } ${sizeMap[size].text}`}
            >
              Sandhya Enterprises
            </span>
            {withBadge && (
              <span className="bg-orange-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded tracking-wider">
                COMMERCIAL
              </span>
            )}
          </div>
          <span
            className={`font-bold tracking-tight ${
              inverted ? 'text-orange-300' : 'text-slate-600'
            } ${sizeMap[size].sub}`}
          >
            Commercial Gas Service • Nelamangala
          </span>
        </div>
      )}
    </div>
  );
};
