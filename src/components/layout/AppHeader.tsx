import React from 'react';
import { Volume2, VolumeX, Menu, Settings, Sparkles, BookOpen } from 'lucide-react';
import { soundManager } from '../../utils/audio';
import { MuridProfile } from '../../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  profile: MuridProfile;
  onOpenSettings: () => void;
  onToggleMobileMenu: () => void;
}

export const AppHeader: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isMuted,
  setIsMuted,
  profile,
  onOpenSettings,
  onToggleMobileMenu
}) => {
  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundManager.setMuted(nextMuted);
    if (!nextMuted) {
      soundManager.playClick();
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Utama' },
    { id: 'makmal', label: 'Makmal Digital' },
    { id: 'koleksi', label: 'Koleksi Kata' },
    { id: 'detektif', label: 'Detektif Kesalahan' },
    { id: 'konteks', label: 'Cabaran Konteks' },
    { id: 'bina-ayat', label: 'Bina Ayat' },
    { id: 'buku-log', label: 'Buku Log' },
    { id: 'guru', label: 'Papan Guru' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-teal-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand title with lab flask emblem */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 text-slate-600 hover:text-teal-800 rounded-lg hover:bg-teal-50 focus-visible:outline-teal-600"
            aria-label="Buka menu navigasi"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2.5 text-left group focus-visible:outline-teal-600 rounded-lg py-1 px-1.5"
          >
            <div className="w-9 h-9 rounded-xl bg-teal-700 flex items-center justify-center text-white shadow-xs group-hover:bg-teal-800 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M10 2v7.31L4.85 18A2 2 0 0 0 6.58 21h10.84a2 2 0 0 0 1.73-3L14 9.31V2" />
                <path d="M8.5 2h7" />
              </svg>
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight text-teal-900 font-heading block leading-none">
                IMBUH<span className="text-teal-600">MAKER</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mt-0.5">
                Makmal Saintis Bahasa
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links for Desktop */}
        <nav className="hidden lg:flex items-center gap-1 overflow-x-auto py-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab(item.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-teal-900 hover:bg-teal-50/80'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions & Student XP summary */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* XP & Level Badge */}
          <button
            onClick={() => setActiveTab('pencapaian')}
            className="flex items-center gap-2 bg-emerald-50/90 border border-emerald-200/80 hover:bg-emerald-100/70 text-emerald-900 px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors text-left"
            title="Klik untuk lihat Pencapaian & Lencana"
          >
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <div className="hidden sm:block leading-tight">
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                {profile.tahapSaintis}
              </div>
              <div className="text-xs font-extrabold text-emerald-900 tabular-nums">
                {profile.xp} <span className="font-normal text-[11px] text-emerald-700">XP</span>
              </div>
            </div>
            <span className="sm:hidden text-xs font-bold tabular-nums">{profile.xp} XP</span>
          </button>

          {/* Audio toggle button */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-lg border transition-colors ${
              isMuted
                ? 'bg-slate-100 text-slate-400 border-slate-200 hover:bg-slate-200'
                : 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100'
            }`}
            title={isMuted ? 'Buka bunyi makmal' : 'Bisu bunyi makmal'}
            aria-label={isMuted ? 'Buka bunyi' : 'Bisu bunyi'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Settings button */}
          <button
            onClick={onOpenSettings}
            className="p-2 text-slate-600 hover:text-teal-800 rounded-lg hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
            title="Tetapan & Bantuan"
            aria-label="Tetapan dan bantuan"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
