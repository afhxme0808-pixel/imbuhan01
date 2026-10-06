import React from 'react';

interface FlaskProps {
  status: 'idle' | 'reacting' | 'success' | 'warning';
  liquidLevel?: number; // 0 to 100
  kataDasarText?: string;
  imbuhanText?: string;
  hasilText?: string;
  showMolecules?: boolean;
}

export const FlaskAnimation: React.FC<FlaskProps> = ({
  status,
  kataDasarText = 'sapu',
  imbuhanText = 'meN-',
  hasilText = 'menyapu',
  showMolecules = true
}) => {
  const isReacting = status === 'reacting';
  const isSuccess = status === 'success';

  // Liquid gradients based on state
  const liquidGradient = isSuccess
    ? ['#059669', '#10B981', '#34D399'] // Emerald success
    : isReacting
    ? ['#0F766E', '#14B8A6', '#2DD4BF'] // Glowing active teal
    : status === 'warning'
    ? ['#D97706', '#F59E0B', '#FBBF24'] // Amber warning
    : ['#115E59', '#0F766E', '#14B8A6']; // Calm deep teal

  return (
    <div className="relative flex flex-col items-center justify-center p-4">
      {/* Chemical Steam / Vapor when reacting */}
      <div className="h-10 w-full flex items-center justify-center gap-3 overflow-visible pointer-events-none">
        {isReacting && (
          <>
            <div className="w-2.5 h-2.5 rounded-full bg-teal-400/60 animate-bubble-1" />
            <div className="w-3.5 h-3.5 rounded-full bg-emerald-400/70 animate-bubble-2" />
            <div className="w-2 h-2 rounded-full bg-cyan-300/60 animate-bubble-3" />
          </>
        )}
      </div>

      {/* Main Glass Flask Container */}
      <div className={`relative w-48 h-64 md:w-56 md:h-72 transition-transform duration-500 ${isReacting ? 'animate-subtle-pulse' : ''}`}>
        <svg
          viewBox="0 0 200 250"
          className={`w-full h-full drop-shadow-xl ${isReacting ? 'animate-flask-glow' : ''}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Liquid Linear Gradient */}
            <linearGradient id="flaskFluid" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor={liquidGradient[0]} stopOpacity="0.9" />
              <stop offset="60%" stopColor={liquidGradient[1]} stopOpacity="0.8" />
              <stop offset="100%" stopColor={liquidGradient[2]} stopOpacity="0.75" />
            </linearGradient>

            {/* Glass Surface Reflection */}
            <linearGradient id="glassReflection" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
              <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.1" />
              <stop offset="85%" stopColor="#FFFFFF" stopOpacity="0.0" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.3" />
            </linearGradient>

            {/* Glowing Core */}
            <radialGradient id="reactionCore" cx="50%" cy="65%" r="40%">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity={isReacting ? '0.9' : '0.2'} />
              <stop offset="60%" stopColor="#2DD4BF" stopOpacity={isReacting ? '0.6' : '0.1'} />
              <stop offset="100%" stopColor="#0F766E" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Liquid Inside Flask (clipped to Erlenmeyer shape) */}
          <clipPath id="flaskInteriorClip">
            <path d="M85 55 L85 110 L30 215 C24 227 33 240 47 240 L153 240 C167 240 176 227 170 215 L115 110 L115 55 Z" />
          </clipPath>

          <g clipPath="url(#flaskInteriorClip)">
            {/* Fluid fill with surface wave */}
            <rect x="20" y="125" width="160" height="120" fill="url(#flaskFluid)" />
            {/* Meniscus curved top line */}
            <path
              d="M30 130 Q100 120 170 130 L170 145 Q100 135 30 145 Z"
              fill={liquidGradient[2]}
              opacity="0.9"
            />

            {/* Reaction Radial Energy Core */}
            <circle cx="100" cy="185" r="45" fill="url(#reactionCore)" />

            {/* Bubbles in liquid */}
            <circle cx="80" cy="195" r="4" fill="#FFFFFF" opacity="0.6" className="animate-bubble-1" />
            <circle cx="115" cy="210" r="5" fill="#FFFFFF" opacity="0.7" className="animate-bubble-2" />
            <circle cx="95" cy="165" r="3" fill="#FFFFFF" opacity="0.5" className="animate-bubble-3" />
            <circle cx="130" cy="180" r="4" fill="#FFFFFF" opacity="0.6" className="animate-bubble-1" />

            {/* Floating word molecules inside reaction */}
            {showMolecules && isReacting && (
              <>
                <text x="65" y="175" fill="#FFFFFF" fontSize="13" fontWeight="bold" fontFamily="monospace" opacity="0.9">
                  {imbuhanText}
                </text>
                <text x="105" y="195" fill="#FEF08A" fontSize="14" fontWeight="bold" fontFamily="monospace" opacity="0.9">
                  {kataDasarText}
                </text>
              </>
            )}

            {isSuccess && (
              <text x="100" y="185" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="bold" letterSpacing="1">
                {hasilText.toUpperCase()}
              </text>
            )}
          </g>

          {/* Outer Glass Beaker Outline */}
          <path
            d="M82 25 L82 110 L28 215 C21 228 31 242 46 242 L154 242 C169 242 179 228 172 215 L118 110 L118 25 Z"
            stroke="#94A3B8"
            strokeWidth="3.5"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Flask Lip / Rim */}
          <rect x="76" y="20" width="48" height="6" rx="3" stroke="#94A3B8" strokeWidth="3" fill="#F8FAFC" />

          {/* Measurement Tick Marks */}
          <line x1="125" y1="140" x2="137" y2="140" stroke="#FFFFFF" strokeWidth="2" opacity="0.8" />
          <text x="142" y="143" fill="#E2E8F0" fontSize="9" fontWeight="600" fontFamily="sans-serif">150 ml</text>

          <line x1="130" y1="170" x2="145" y2="170" stroke="#FFFFFF" strokeWidth="2" opacity="0.8" />
          <text x="150" y="173" fill="#E2E8F0" fontSize="9" fontWeight="600" fontFamily="sans-serif">100 ml</text>

          <line x1="140" y1="200" x2="155" y2="200" stroke="#FFFFFF" strokeWidth="2" opacity="0.8" />
          <text x="160" y="203" fill="#E2E8F0" fontSize="9" fontWeight="600" fontFamily="sans-serif">50 ml</text>

          {/* Glass Specular Highlights */}
          <path
            d="M48 215 L95 125 L95 60"
            stroke="url(#glassReflection)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Reaction Status Tag */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-xs border border-teal-200 shadow-xs px-3 py-1 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap">
          {isReacting ? (
            <span className="text-teal-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
              Sintesis Kata Berlangsung...
            </span>
          ) : isSuccess ? (
            <span className="text-emerald-700 flex items-center gap-1">
              ✓ Eksperimen Berjaya!
            </span>
          ) : status === 'warning' ? (
            <span className="text-amber-700">Perhatikan Petunjuk</span>
          ) : (
            <span className="text-slate-600">Sedia Untuk Bereksperimen</span>
          )}
        </div>
      </div>
    </div>
  );
};
