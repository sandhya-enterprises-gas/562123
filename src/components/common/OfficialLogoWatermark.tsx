import React, { useState, useEffect } from 'react';

const DEFAULT_LOGO_URL = '/assets/sandhya_official_logo.jpg';
const STORAGE_KEY = 'sandhya_custom_logo_url';
const OPACITY_STORAGE_KEY = 'sandhya_watermark_opacity';

export function getOfficialLogoUrl(): string {
  if (typeof window === 'undefined') return DEFAULT_LOGO_URL;
  return localStorage.getItem(STORAGE_KEY) || DEFAULT_LOGO_URL;
}

export function setOfficialLogoUrl(url: string): void {
  if (typeof window === 'undefined') return;
  if (url) {
    localStorage.setItem(STORAGE_KEY, url);
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

  useEffect(() => {
    const handleUpdate = () => {
      setLogoUrl(getOfficialLogoUrl());
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

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none absolute inset-0 overflow-hidden flex items-center justify-center z-0 ${className}`}
    >
      <div
        style={{ opacity: effectiveOpacity }}
        className={`relative ${sizeClasses} rounded-full transition-opacity duration-700 flex items-center justify-center`}
      >
        <img
          src={logoUrl}
          alt=""
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain filter grayscale contrast-125 mix-blend-multiply"
          onError={(e) => {
            // Fallback to default asset if custom failed
            if ((e.target as HTMLImageElement).src !== DEFAULT_LOGO_URL) {
              (e.target as HTMLImageElement).src = DEFAULT_LOGO_URL;
            } else {
              (e.target as HTMLElement).style.display = 'none';
            }
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
  const [logoUrl, setLogoUrl] = useState<string>(getOfficialLogoUrl());

  useEffect(() => {
    const handleUpdate = () => {
      setLogoUrl(getOfficialLogoUrl());
    };
    window.addEventListener('sandhya_logo_changed', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('sandhya_logo_changed', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div
        style={{ width: size, height: size }}
        className="relative shrink-0 rounded-full overflow-hidden border-2 border-amber-500/40 shadow-sm bg-white"
      >
        <img
          src={logoUrl}
          alt="Sandhya Enterprises Official Seal"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain p-0.5"
          onError={(e) => {
            if ((e.target as HTMLImageElement).src !== DEFAULT_LOGO_URL) {
              (e.target as HTMLImageElement).src = DEFAULT_LOGO_URL;
            }
          }}
        />
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
