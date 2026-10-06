import React from 'react';

interface MascotProps {
  mood?: 'gembira' | 'berfikir' | 'teruja' | 'petunjuk';
  size?: 'sm' | 'md' | 'lg';
  speech?: string;
  className?: string;
}

export const ProfessorMascot: React.FC<MascotProps> = ({
  mood = 'gembira',
  size = 'md',
  speech,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-14 h-14',
    md: 'w-24 h-24',
    lg: 'w-36 h-36'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* SVG Cartoon Professor Mascot */}
      <div className={`relative shrink-0 ${sizeClasses[size]}`}>
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full drop-shadow-md select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Aura */}
          <circle cx="60" cy="60" r="54" fill="#D1FAE5" opacity="0.6" />
          <circle cx="60" cy="60" r="50" stroke="#0F766E" strokeWidth="2.5" strokeDasharray="4 3" />

          {/* Professor Hair / White Fluffy scientist hair */}
          <circle cx="34" cy="46" r="14" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1.5" />
          <circle cx="86" cy="46" r="14" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1.5" />
          <circle cx="44" cy="32" r="12" fill="#F3F4F6" />
          <circle cx="76" cy="32" r="12" fill="#F3F4F6" />
          <circle cx="60" cy="28" r="14" fill="#F3F4F6" />

          {/* Head */}
          <circle cx="60" cy="55" r="28" fill="#FED7AA" stroke="#FB923C" strokeWidth="1.5" />

          {/* Ears */}
          <circle cx="33" cy="56" r="5" fill="#FDBA74" />
          <circle cx="87" cy="56" r="5" fill="#FDBA74" />

          {/* Lab Coat / Body */}
          <path
            d="M36 82 C36 74, 46 72, 60 72 C74 72, 84 74, 84 82 L88 112 C88 114, 32 114, 32 112 Z"
            fill="#FFFFFF"
            stroke="#0F766E"
            strokeWidth="2"
          />
          {/* Inner Teal Shirt & Tie */}
          <path d="M54 73 L60 83 L66 73 Z" fill="#14B8A6" />
          <path d="M58 83 L62 83 L60 94 Z" fill="#0F766E" />
          {/* Lapels */}
          <path d="M42 73 L54 94 L42 112" stroke="#CBD5E1" strokeWidth="1.5" fill="none" />
          <path d="M78 73 L66 94 L78 112" stroke="#CBD5E1" strokeWidth="1.5" fill="none" />

          {/* Glasses Frame */}
          <rect x="42" y="46" width="14" height="12" rx="4" fill="#E0F2FE" stroke="#0F766E" strokeWidth="2.5" />
          <rect x="64" y="46" width="14" height="12" rx="4" fill="#E0F2FE" stroke="#0F766E" strokeWidth="2.5" />
          <line x1="56" y1="52" x2="64" y2="52" stroke="#0F766E" strokeWidth="2.5" />

          {/* Eyes based on mood */}
          {mood === 'teruja' ? (
            <>
              {/* Starry eyes */}
              <circle cx="49" cy="52" r="3.5" fill="#0F766E" />
              <circle cx="71" cy="52" r="3.5" fill="#0F766E" />
              <circle cx="50" cy="51" r="1.2" fill="#FFFFFF" />
              <circle cx="72" cy="51" r="1.2" fill="#FFFFFF" />
            </>
          ) : mood === 'berfikir' ? (
            <>
              <line x1="45" y1="52" x2="53" y2="50" stroke="#0F766E" strokeWidth="2" strokeLinecap="round" />
              <circle cx="71" cy="51" r="3" fill="#0F766E" />
            </>
          ) : (
            <>
              <circle cx="49" cy="52" r="3" fill="#0F766E" />
              <circle cx="71" cy="52" r="3" fill="#0F766E" />
              <circle cx="50" cy="51" r="1" fill="#FFFFFF" />
              <circle cx="72" cy="51" r="1" fill="#FFFFFF" />
            </>
          )}

          {/* Eyebrows */}
          <path d="M44 42 Q49 39 54 42" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
          <path d="M66 42 Q71 39 76 42" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />

          {/* Moustache */}
          <path
            d="M48 64 C52 61, 58 63, 60 66 C62 63, 68 61, 72 64 C68 67, 52 67, 48 64 Z"
            fill="#E5E7EB"
            stroke="#9CA3AF"
            strokeWidth="1"
          />

          {/* Mouth */}
          {mood === 'teruja' || mood === 'gembira' ? (
            <path d="M54 69 Q60 75 66 69" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" fill="#FDA4AF" />
          ) : (
            <path d="M55 70 Q60 72 65 70" stroke="#E11D48" strokeWidth="1.8" strokeLinecap="round" />
          )}

          {/* Pen / Beaker in pocket */}
          <rect x="42" y="90" width="3" height="9" fill="#0EA5E9" rx="1" />
          <rect x="47" y="88" width="3" height="11" fill="#E11D48" rx="1" />
        </svg>

        {/* Small floating badge */}
        <div className="absolute -bottom-1 -right-1 bg-teal-600 text-white rounded-full p-1 shadow-sm border border-white">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M10 2v7.31L4.85 18A2 2 0 0 0 6.58 21h10.84a2 2 0 0 0 1.73-3L14 9.31V2" />
            <path d="M8.5 2h7" />
          </svg>
        </div>
      </div>

      {/* Speech bubble */}
      {speech && (
        <div className="relative bg-white border border-teal-200/80 rounded-2xl p-3.5 shadow-sm text-sm text-slate-800 leading-relaxed max-w-xl">
          <div className="text-xs font-semibold text-teal-800 mb-1 flex items-center gap-1.5">
            <span>Profesor Imbuhan</span>
            <span className="text-teal-400">·</span>
            <span className="text-slate-400 font-normal">Ketua Makmal Bahasa</span>
          </div>
          <p className="text-slate-700">{speech}</p>
          {/* Arrow */}
          <div className="absolute top-4 -left-2 w-3 h-3 bg-white border-l border-b border-teal-200/80 transform rotate-45" />
        </div>
      )}
    </div>
  );
};
