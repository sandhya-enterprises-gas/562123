import React from 'react';

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
    sm: { seal: 'w-10 h-10', text: 'text-sm', sub: 'text-[10px]' },
    md: { seal: 'w-12 h-12', text: 'text-base', sub: 'text-xs' },
    lg: { seal: 'w-16 h-16', text: 'text-xl', sub: 'text-sm' },
    xl: { seal: 'w-24 h-24', text: 'text-2xl', sub: 'text-base' },
    '2xl': { seal: 'w-32 h-32', text: 'text-3xl', sub: 'text-lg' }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* High Definition Official Seal Vector */}
      <div
        className={`relative ${sizeMap[size].seal} flex-shrink-0 rounded-full shadow-lg transition-transform hover:scale-105 select-none`}
        title="Sandhya Enterprises - Official Commercial LPG Distributor"
      >
        <svg
          viewBox="0 0 240 240"
          className="w-full h-full drop-shadow-md overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
        >
          <defs>
            {/* Outer Gold Gradient */}
            <linearGradient id="hdGoldRim" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DFAC42" />
              <stop offset="30%" stopColor="#FFF2A3" />
              <stop offset="60%" stopColor="#B37E22" />
              <stop offset="100%" stopColor="#87560B" />
            </linearGradient>

            {/* Obsidian Core Background */}
            <radialGradient id="hdInnerBg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="70%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>

            {/* Fire Gradient */}
            <linearGradient id="hdFireOuter" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF7A00" />
              <stop offset="45%" stopColor="#FF3D00" />
              <stop offset="100%" stopColor="#C00000" />
            </linearGradient>

            <linearGradient id="hdFireMid" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF500" />
              <stop offset="50%" stopColor="#FF9900" />
              <stop offset="100%" stopColor="#FF4500" />
            </linearGradient>

            <radialGradient id="hdLpgBlueCore" cx="50%" cy="60%" r="45%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="35%" stopColor="#38BDF8" />
              <stop offset="85%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </radialGradient>

            {/* Shadow Filter */}
            <filter id="hdDropShadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.4" floodColor="#000000" />
            </filter>
          </defs>

          {/* Outer Heavy Beveled Metallic Ring */}
          <circle cx="120" cy="120" r="114" stroke="url(#hdGoldRim)" strokeWidth="6" fill="#0B1329" />
          <circle cx="120" cy="120" r="106" stroke="#CA8A04" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.8" />

          {/* Inner Navy Base Disc */}
          <circle cx="120" cy="120" r="82" stroke="url(#hdGoldRim)" strokeWidth="3" fill="url(#hdInnerBg)" />

          {/* Curved Text Arc - Top: SANDHYA ENTERPRISES */}
          <path id="hdPathTop" d="M 32 120 A 88 88 0 0 1 208 120" fill="none" />
          <text fill="#F8FAFC" fontSize="15" fontWeight="900" letterSpacing="3.5" filter="url(#hdDropShadow)">
            <textPath href="#hdPathTop" startOffset="50%" textAnchor="middle">
              SANDHYA ENTERPRISES
            </textPath>
          </text>

          {/* Curved Text Arc - Bottom: COMMERCIAL LPG AGENCY */}
          <path id="hdPathBottom" d="M 208 120 A 88 88 0 0 1 32 120" fill="none" />
          <text fill="#FBBF24" fontSize="12" fontWeight="800" letterSpacing="2.8">
            <textPath href="#hdPathBottom" startOffset="50%" textAnchor="middle">
              COMMERCIAL LPG AGENCY
            </textPath>
          </text>

          {/* ESTD & 2010 Side Badges */}
          <text x="25" y="124" fill="#E2E8F0" fontSize="10.5" fontWeight="900" textAnchor="middle">
            ESTD
          </text>
          <circle cx="42" cy="120" r="2.5" fill="#EAB308" />
          <circle cx="198" cy="120" r="2.5" fill="#EAB308" />
          <text x="215" y="124" fill="#E2E8F0" fontSize="10.5" fontWeight="900" textAnchor="middle">
            2010
          </text>

          {/* Central High-Definition Flame Insignia */}
          <g transform="translate(86, 68) scale(1.05)">
            {/* Outer Industrial Flame */}
            <path
              d="M32 0 C32 0 46 16 46 32 C46 52 28 68 32 82 C35 91 44 98 44 98 C44 98 6 92 4 64 C2 49 10 35 18 24 C23 17 28 7 32 0 Z"
              fill="url(#hdFireOuter)"
              filter="url(#hdDropShadow)"
            />
            {/* Mid Flame Tone */}
            <path
              d="M32 14 C32 14 41 26 41 38 C41 54 28 66 31 78 C33 84 38 88 38 88 C38 88 12 84 10 60 C9 48 15 37 21 28 C25 22 29 16 32 14 Z"
              fill="url(#hdFireMid)"
            />
            {/* High Heat LPG Blue Flame Core */}
            <ellipse cx="27" cy="74" rx="11" ry="16" fill="url(#hdLpgBlueCore)" />
            {/* Pure White Hot Center Nucleus */}
            <ellipse cx="27" cy="77" rx="5" ry="9" fill="#FFFFFF" opacity="0.95" />
          </g>

          {/* Certified Seal Star Highlights */}
          <polygon points="120,44 122,48 126,48 123,51 124,55 120,53 116,55 117,51 114,48 118,48" fill="#FDE047" />
          <polygon points="120,186 122,190 126,190 123,193 124,197 120,195 116,197 117,193 114,190 118,190" fill="#FDE047" />
        </svg>
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
          </div>
          <span
            className={`font-bold tracking-tight ${
              inverted ? 'text-orange-300' : 'text-slate-600'
            } ${sizeMap[size].sub}`}
          >
            Commercial LPG Agency • Nelamangala
          </span>
        </div>
      )}
    </div>
  );
};
