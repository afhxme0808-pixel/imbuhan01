import React from 'react';
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  Settings,
  Star,
  Sparkles,
  Zap,
  Flame
} from 'lucide-react';
import { MuridProfile } from '../../types';
import { soundManager } from '../../utils/audio';

interface GameHUDProps {
  currentStage: string;
  onNavigateHome: () => void;
  onOpenSettings: () => void;
  profile: MuridProfile;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  totalStars?: number;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  currentStage,
  onNavigateHome,
  onOpenSettings,
  profile,
  isMuted,
  setIsMuted,
  totalStars = 18
}) => {
  const isMap = currentStage === 'map';

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundManager.setMuted(nextMuted);
    if (!nextMuted) soundManager.playClick();
  };

  return (
    <header className="h-14 sm:h-16 px-3 sm:px-6 bg-[#0E2433] border-b-2 border-teal-500/40 flex items-center justify-between shrink-0 shadow-lg z-30 select-none">
      {/* Left: Back to World Map or Game Logo */}
      <div className="flex items-center gap-2 sm:gap-3">
        {!isMap ? (
          <button
            onClick={() => {
              soundManager.playClick();
              onNavigateHome();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 active:translate-y-0.5 text-white font-bold text-xs sm:text-sm shadow-[0_3px_0_#0f766e] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Peta Dunia</span>
            <span className="sm:hidden">Peta</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-teal-950 font-black shadow-[0_2px_0_#0f766e]">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M10 2v7.31L4.85 18A2 2 0 0 0 6.58 21h10.84a2 2 0 0 0 1.73-3L14 9.31V2" />
                <path d="M8.5 2h7" />
              </svg>
            </div>
            <div>
              <span className="font-game font-black tracking-wider text-base sm:text-lg text-emerald-300 block leading-none">
                IMBUH<span className="text-amber-400">MAKER</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-teal-400/80 font-bold hidden sm:block">
                Makmal Saintis Bahasa
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Center: Game Stats Tokens (Level, XP, Stars) */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Level Token */}
        <div className="flex items-center gap-1.5 bg-[#143245] px-2.5 sm:px-3 py-1 rounded-xl border border-teal-500/30 text-xs shadow-inner">
          <span className="w-5 h-5 rounded-lg bg-teal-500 text-teal-950 font-black flex items-center justify-center text-[10px]">
            L{profile.level}
          </span>
          <span className="font-bold text-teal-200 hidden md:inline truncate max-w-[120px]">
            {profile.tahapSaintis}
          </span>
        </div>

        {/* XP Crystal Token */}
        <div className="flex items-center gap-1.5 bg-[#143245] px-2.5 sm:px-3 py-1 rounded-xl border border-teal-500/30 text-xs shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
          <span className="font-black text-cyan-200 tabular-nums">
            {profile.xp} <span className="text-[10px] text-cyan-400 font-normal">XP</span>
          </span>
        </div>

        {/* Stars Token */}
        <div className="flex items-center gap-1 bg-[#143245] px-2.5 sm:px-3 py-1 rounded-xl border border-amber-500/30 text-xs shadow-inner">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="font-black text-amber-300 tabular-nums">
            {totalStars}
          </span>
        </div>
      </div>

      {/* Right: Audio FX & Settings */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleSound}
          className={`p-2 rounded-xl border transition-all active:scale-95 ${
            isMuted
              ? 'bg-slate-800 text-slate-400 border-slate-700'
              : 'bg-teal-700 hover:bg-teal-600 text-amber-300 border-teal-500/50 shadow-[0_2px_0_#0f766e]'
          }`}
          title={isMuted ? 'Buka bunyi makmal' : 'Bisu'}
          aria-label="Kawalan Bunyi"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <button
          onClick={() => {
            soundManager.playClick();
            onOpenSettings();
          }}
          className="p-2 bg-[#143245] hover:bg-[#1a4057] active:scale-95 text-teal-200 border border-teal-500/30 rounded-xl transition-all"
          title="Tetapan Makmal"
          aria-label="Tetapan"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
