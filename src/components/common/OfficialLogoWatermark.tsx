import React, { useState, useEffect } from 'react';
import officialLogoJpg from '../../assets/images/sandhya_official_logo_1788882010131.jpg';

export const DEFAULT_LOGO_URL = officialLogoJpg || '/assets/sandhya_official_logo.jpg';
const STORAGE_KEY = 'sandhya_custom_logo_url';
const OPACITY_STORAGE_KEY = 'sandhya_watermark_opacity';

export function getOfficialLogoUrl(): string {
  if (typeof window === 'undefined') return DEFAULT_LOGO_URL;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && stored.trim().length > 0 && stored !== 'null' && stored !== 'undefined' && !stored.includes('sandhya_seal_transparent')) {
    return stored;
  }
  return DEFAULT_LOGO_URL;
}

export function setOfficialLogoUrl(url: string): void {
  if (typeof window === 'undefined') return;
  if (url && url.trim().length > 0) {
    localStorage.setItem(STORAGE_KEY, url.trim());
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
  window.dispatchEvent(new Event('sandhya_logo_changed'));
}

export function getWatermarkOpacity(): number {
  if (typeof window === 'undefined') return 0.04;
  const val = localStorage.getItem(OPACITY_STORAGE_KEY);
  return val ? parseFloat(val) : 0.04;
}

export function setWatermarkOpacity(opacity: number): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(OPACITY_STORAGE_KEY, opacity.toString());
  window.dispatchEvent(new Event('sandhya_logo_changed'));
}

/**
 * HD Vector Seal Fallback
 * Guarantees a pristine, razor-sharp circular official seal
 * even if external images are unreachable or disabled.
 */
export const HDVectorSeal: React.FC<{ size?: number; className?: string }> = ({
  size = 40,
  className = ''
}) => {
  return (
    <svg
      viewBox="0 0 240 240"
      width={size}
      height={size}
      className={`select-none shrink-0 drop-shadow-xs ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
    >
      <defs>
        <linearGradient id="vectorGoldRim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DFAC42" />
          <stop offset="35%" stopColor="#FFF2A3" />
          <stop offset="70%" stopColor="#B37E22" />
          <stop offset="100%" stopColor="#87560B" />
        </linearGradient>

        <linearGradient id="vectorFlameOuter" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF7A00" />
          <stop offset="45%" stopColor="#FF3D00" />
          <stop offset="100%" stopColor="#C00000" />
        </linearGradient>

        <linearGradient id="vectorFlameInner" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF500" />
          <stop offset="60%" stopColor="#FF9900" />
          <stop offset="100%" stopColor="#FF4500" />
        </linearGradient>
      </defs>

      {/* Outer Golden Border Rim */}
      <circle cx="120" cy="120" r="114" stroke="url(#vectorGoldRim)" strokeWidth="6" fill="#0B1329" />
      <circle cx="120" cy="120" r="106" stroke="#CA8A04" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.8" />

      {/* Inner Base Disc */}
      <circle cx="120" cy="120" r="82" stroke="url(#vectorGoldRim)" strokeWidth="3" fill="#0F172A" />

      {/* Curved Text Arc - Top: SANDHYA ENTERPRISES */}
      <path id="vectorPathTop" d="M 32 120 A 88 88 0 0 1 208 120" fill="none" />
      <text fill="#F8FAFC" fontSize="14" fontWeight="900" letterSpacing="3.2">
        <textPath href="#vectorPathTop" startOffset="50%" textAnchor="middle">
          SANDHYA ENTERPRISES
        </textPath>
      </text>

      {/* Curved Text Arc - Bottom: COMMERCIAL GAS SERVICE */}
      <path id="vectorPathBottom" d="M 208 120 A 88 88 0 0 1 32 120" fill="none" />
      <text fill="#FBBF24" fontSize="11" fontWeight="800" letterSpacing="2.5">
        <textPath href="#vectorPathBottom" startOffset="50%" textAnchor="middle">
          COMMERCIAL GAS SERVICE
        </textPath>
      </text>

      {/* ESTD 2010 Side Markers */}
      <text x="25" y="124" fill="#E2E8F0" fontSize="10" fontWeight="900" textAnchor="middle">
        ESTD
      </text>
      <circle cx="42" cy="120" r="2.5" fill="#EAB308" />
      <circle cx="198" cy="120" r="2.5" fill="#EAB308" />
      <text x="215" y="124" fill="#E2E8F0" fontSize="10" fontWeight="900" textAnchor="middle">
        2010
      </text>

      {/* Central Flame Insignia */}
      <g transform="translate(86, 68) scale(1.05)">
        <path
          d="M32 0 C32 0 46 16 46 32 C46 52 28 68 32 82 C35 91 44 98 44 98 C44 98 6 92 4 64 C2 49 10 35 18 24 C23 17 28 7 32 0 Z"
          fill="url(#vectorFlameOuter)"
        />
        <path
          d="M32 14 C32 14 41 26 41 38 C41 54 28 66 31 78 C33 84 38 88 38 88 C38 88 12 84 10 60 C9 48 15 37 21 28 C25 22 29 16 32 14 Z"
          fill="url(#vectorFlameInner)"
        />
        <ellipse cx="27" cy="74" rx="10" ry="15" fill="#38BDF8" />
        <ellipse cx="27" cy="77" rx="5" ry="8" fill="#FFFFFF" opacity="0.95" />
      </g>
    </svg>
  );
};

interface OfficialLogoWatermarkProps {
  opacity?: number; // e.g. 0.04
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'full';
}

export const OfficialLogoWatermark: React.FC<OfficialLogoWatermarkProps> = ({
  opacity,
  className = '',
  size = 'full'
}) => {
  const [logoUrl, setLogoUrl] = useState<string>(getOfficialLogoUrl());
  const [effectiveOpacity, setEffectiveOpacity] = useState<number>(opacity ?? getWatermarkOpacity());
  const [fallbackAttempt, setFallbackAttempt] = useState<number>(0);
  const [useVectorFallback, setUseVectorFallback] = useState<boolean>(false);

  useEffect(() => {
    const handleUpdate = () => {
      setLogoUrl(getOfficialLogoUrl());
      setFallbackAttempt(0);
      setUseVectorFallback(false);
      if (opacity === undefined) {
        setEffectiveOpacity(getWatermarkOpacity());
      }
    };
    window.addEventListener('sandhya_logo_changed', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('sandhya_logo_changed', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [opacity]);

  const sizeClasses = {
    sm: 'w-48 h-48',
    md: 'w-80 h-80',
    lg: 'w-[500px] h-[500px]',
    full: 'w-[680px] h-[680px] max-w-[92vw] max-h-[92vw]'
  }[size];

  const handleWatermarkError = () => {
    if (fallbackAttempt === 0 && logoUrl !== DEFAULT_LOGO_URL) {
      setLogoUrl(DEFAULT_LOGO_URL);
      setFallbackAttempt(1);
    } else if (fallbackAttempt === 1 && logoUrl !== '/assets/sandhya_official_logo.jpg') {
      setLogoUrl('/assets/sandhya_official_logo.jpg');
      setFallbackAttempt(2);
    } else {
      setUseVectorFallback(true);
    }
  };

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none absolute inset-0 overflow-hidden flex items-center justify-center z-0 ${className}`}
    >
      <div
        style={{ opacity: effectiveOpacity }}
        className={`relative ${sizeClasses} rounded-full transition-opacity duration-700 flex items-center justify-center`}
      >
        {useVectorFallback ? (
          <div className="w-full h-full opacity-70 filter grayscale contrast-125">
            <HDVectorSeal size={400} className="w-full h-full" />
          </div>
        ) : (
          <img
            src={logoUrl}
            alt=""
            referrerPolicy="no-referrer"
            loading="eager"
            decoding="async"
            className="w-full h-full object-contain filter grayscale contrast-125 mix-blend-multiply"
            onError={handleWatermarkError}
          />
        )}
      </div>
    </div>
  );
};

export const OfficialLogoBadge: React.FC<{
  size?: number;
  className?: string;
  showText?: boolean;
}> = ({ size = 44, className = '', showText = false }) => {
  const [logoUrl, setLogoUrl] = useState<string>(getOfficialLogoUrl());
  const [fallbackAttempt, setFallbackAttempt] = useState<number>(0);
  const [useVectorFallback, setUseVectorFallback] = useState<boolean>(false);

  useEffect(() => {
    const handleUpdate = () => {
      setLogoUrl(getOfficialLogoUrl());
      setFallbackAttempt(0);
      setUseVectorFallback(false);
    };
    window.addEventListener('sandhya_logo_changed', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('sandhya_logo_changed', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const handleImgError = () => {
    if (fallbackAttempt === 0 && logoUrl !== DEFAULT_LOGO_URL) {
      setLogoUrl(DEFAULT_LOGO_URL);
      setFallbackAttempt(1);
    } else if (fallbackAttempt === 1 && logoUrl !== '/assets/sandhya_official_logo.jpg') {
      setLogoUrl('/assets/sandhya_official_logo.jpg');
      setFallbackAttempt(2);
    } else {
      setUseVectorFallback(true);
    }
  };

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 ${className}`}>
      <div
        style={{ width: size, height: size, minWidth: size, minHeight: size }}
        className="relative shrink-0 rounded-full overflow-hidden border-2 border-amber-500/50 shadow-sm bg-white ring-1 ring-amber-400/30 flex items-center justify-center"
      >
        {useVectorFallback ? (
          <HDVectorSeal size={size} className="w-full h-full" />
        ) : (
          <img
            src={logoUrl}
            alt="Sandhya Enterprises Official Seal"
            referrerPolicy="no-referrer"
            loading="eager"
            decoding="async"
            className="w-full h-full object-contain p-0.5 select-none"
            onError={handleImgError}
          />
        )}
      </div>
      {showText && (
        <div className="flex flex-col text-left">
          <span className="font-black text-sm tracking-tight uppercase leading-tight text-white">
            Sandhya Enterprises
          </span>
          <span className="text-[10px] font-bold text-amber-400 tracking-wider uppercase">
            Estd 2010 • Commercial Gas Service
          </span>
        </div>
      )}
    </div>
  );
};
