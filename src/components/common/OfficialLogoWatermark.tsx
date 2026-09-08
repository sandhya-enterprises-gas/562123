import React from 'react';

interface OfficialLogoWatermarkProps {
  opacity?: number; // e.g. 0.05
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'full';
}

export const OfficialLogoWatermark: React.FC<OfficialLogoWatermarkProps> = ({
  opacity = 0.04,
  className = '',
  size = 'full'
}) => {
  const sizeClasses = {
    sm: 'w-48 h-48',
    md: 'w-80 h-80',
    lg: 'w-[500px] h-[500px]',
    full: 'w-[650px] h-[650px] max-w-[90vw] max-h-[90vw]'
  }[size];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none absolute inset-0 overflow-hidden flex items-center justify-center z-0 ${className}`}
    >
      <div
        style={{ opacity }}
        className={`relative ${sizeClasses} rounded-full transition-opacity duration-700 flex items-center justify-center`}
      >
        <img
          src="/assets/sandhya_official_logo.jpg"
          alt=""
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain filter grayscale contrast-125 mix-blend-multiply"
          onError={(e) => {
            // Fallback gracefully if image path issue
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      </div>
    </div>
  );
};

export const OfficialLogoBadge: React.FC<{
  size?: number;
  className?: string;
  showText?: boolean;
}> = ({ size = 44, className = '', showText = false }) => {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div
        style={{ width: size, height: size }}
        className="relative shrink-0 rounded-full overflow-hidden border-2 border-amber-500/40 shadow-sm bg-white"
      >
        <img
          src="/assets/sandhya_official_logo.jpg"
          alt="Sandhya Enterprises Official Seal"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain"
        />
      </div>
      {showText && (
        <div className="flex flex-col text-left">
          <span className="font-black text-sm tracking-tight uppercase leading-tight text-slate-900">
            Sandhya Enterprises
          </span>
          <span className="text-[10px] font-bold text-amber-700 tracking-wider uppercase">
            Estd 2010 • Commercial Gas Service
          </span>
        </div>
      )}
    </div>
  );
};
