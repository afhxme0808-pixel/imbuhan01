import React from 'react';
import { Volume2, VolumeX, Home, Star } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface KidsHUDProps {
  currentScreen: string;
  onGoHome: () => void;
  stars: number;
  isMuted: boolean;
  setIsMuted: (m: boolean) => void;
}

export const KidsHUD: React.FC<KidsHUDProps> = ({
  currentScreen,
  onGoHome,
  stars,
  isMuted,
  setIsMuted
}) => {
  const toggleAudio = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundManager.setMuted(next);
    if (!next) soundManager.playClick();
  };

  const isHome = currentScreen === 'menu';

  return (
    <header className="h-11 sm:h-13 px-3 sm:px-5 bg-[#0E2F38] border-b-2 border-emerald-400/40 flex items-center justify-between shrink-0 shadow-md select-none z-30">
      {/* Left: Home Button or Logo */}
      <div className="flex items-center gap-2">
        {!isHome ? (
          <button
            onClick={() => {
              soundManager.playClick();
              onGoHome();
            }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-400 hover:bg-amber-300 active:translate-y-0.5 text-slate-950 font-black text-xs sm:text-sm shadow-[0_2px_0_#b45309] transition-all font-game cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Peta Menu</span>
          </button>
        ) : (
          <div className="flex items-center gap-1.5">
            <span className="text-xl">🧪</span>
            <div>
              <span className="text-base sm:text-lg font-black font-game text-emerald-300 tracking-wide block leading-none">
                IMBUH<span className="text-amber-400">MAKER</span>
              </span>
              <span className="text-[9px] font-bold text-teal-300 tracking-wider hidden sm:block">
                Makmal 9 Tahun
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Center: Big Shiny Star Counter */}
      <div className="flex items-center gap-1.5 bg-[#174653] px-3 py-1 rounded-xl border border-amber-400/60 shadow-inner">
        <Star className="w-4 h-4 text-amber-400 fill-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
        <span className="font-game font-black text-amber-300 text-xs sm:text-sm tabular-nums">
          {stars} <span className="text-[10px] text-amber-200 font-bold hidden sm:inline">Bintang</span>
        </span>
      </div>

      {/* Right: Sound Toggle */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleAudio}
          className={`p-1.5 rounded-xl border transition-all active:scale-90 shadow-sm cursor-pointer ${
            isMuted
              ? 'bg-slate-800 text-slate-400 border-slate-700'
              : 'bg-emerald-500 hover:bg-emerald-400 text-teal-950 border-emerald-300 shadow-[0_2px_0_#047857]'
          }`}
          title={isMuted ? 'Buka Bunyi' : 'Bisu'}
          aria-label="Bunyi"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
