import React from 'react';
import { Play, Sparkles } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface KidsMenuProps {
  onSelectGame: (gameId: string) => void;
  stars: number;
}

export const KidsMenu: React.FC<KidsMenuProps> = ({ onSelectGame, stars }) => {
  const games = [
    {
      id: 'makmal',
      title: 'Makmal Saintis AR',
      subtitle: 'Genggam botol & goncang guna tangan!',
      emoji: '🧪',
      bg: 'from-emerald-400 to-teal-600',
      border: 'border-emerald-300',
      shadow: '#065f46',
      badge: 'AR Kamera 🖐️'
    },
    {
      id: 'detektif',
      title: 'Detektif Cilik',
      subtitle: 'Cari ejaan betul dapat bintang!',
      emoji: '🔍',
      bg: 'from-amber-400 to-orange-500',
      border: 'border-amber-300',
      shadow: '#c2410c',
      badge: '+1 ⭐'
    },
    {
      id: 'padan',
      title: 'Padankan Gambar',
      subtitle: 'Pilih gambar yang betul!',
      emoji: '🎯',
      bg: 'from-pink-400 to-rose-600',
      border: 'border-pink-300',
      shadow: '#9f1239',
      badge: 'Uji Minda'
    },
    {
      id: 'trofi',
      title: 'Peti Bintang',
      subtitle: 'Koleksi trofi & lencana!',
      emoji: '🏆',
      bg: 'from-purple-400 to-indigo-600',
      border: 'border-purple-300',
      shadow: '#4338ca',
      badge: `${stars} ⭐`
    }
  ];

  return (
    <div className="h-full flex flex-col justify-between overflow-hidden p-1.5 sm:p-3 max-w-4xl mx-auto space-y-1.5 sm:space-y-2 select-none">
      {/* Friendly Hero Greeting - Compact */}
      <div className="text-center shrink-0">
        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-400/20 border border-emerald-400/40 text-emerald-300 text-[10px] sm:text-xs font-bold font-game">
          <Sparkles className="w-3 h-3" />
          <span>Makmal Bahasa Kanak-Kanak Tahun 3</span>
        </div>
        <h1 className="text-lg sm:text-2xl font-black font-game text-white leading-tight mt-0.5">
          Jom Bereksperimen, Saintis Cilik! 🌟
        </h1>
      </div>

      {/* 4 Big Game Cards Grid (2x2) - Fits completely inside available height! */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 flex-1 min-h-0 items-stretch">
        {games.map((game) => (
          <button
            key={game.id}
            onClick={() => {
              soundManager.playClick();
              onSelectGame(game.id);
            }}
            className={`group relative flex flex-col justify-between p-2.5 sm:p-3.5 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${game.bg} border-2 sm:border-4 ${game.border} shadow-[0_4px_0_${game.shadow}] active:translate-y-1 active:shadow-[0_1px_0_${game.shadow}] transition-all text-left text-white select-none hover:scale-[1.01] cursor-pointer overflow-hidden`}
          >
            {/* Top row with emoji and badge */}
            <div className="flex items-start justify-between w-full">
              <span className="text-2xl sm:text-4xl group-hover:scale-110 transition-transform">
                {game.emoji}
              </span>
              <span className="bg-black/25 backdrop-blur-xs px-2 py-0.5 rounded-full text-[9px] sm:text-[11px] font-black font-game text-white uppercase">
                {game.badge}
              </span>
            </div>

            {/* Title and Short Subtitle */}
            <div className="my-1 sm:my-auto">
              <h2 className="text-sm sm:text-lg font-black font-game text-white leading-tight drop-shadow-sm">
                {game.title}
              </h2>
              <p className="text-[10px] sm:text-xs text-white/90 font-bold leading-tight mt-0.5 line-clamp-1">
                {game.subtitle}
              </p>
            </div>

            {/* Big Action Pill */}
            <div className="bg-white text-slate-900 rounded-xl py-1 px-2.5 flex items-center justify-between text-[11px] sm:text-xs font-black font-game shadow-xs group-hover:bg-amber-300 transition-colors">
              <span>Main Sekarang</span>
              <Play className="w-3 h-3 fill-current" />
            </div>
          </button>
        ))}
      </div>

      {/* Bottom Mascot Tip Bar - Compact and Guaranteed Never Cut Off */}
      <div className="bg-[#0E2F38] rounded-xl sm:rounded-2xl p-2 sm:p-2.5 border border-emerald-400/40 shadow-sm flex items-center gap-2.5 shrink-0">
        <span className="text-2xl sm:text-3xl shrink-0">
          👨‍🔬
        </span>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] sm:text-xs font-black font-game text-amber-300 leading-none">
            Profesor Imbuhan Berkata:
          </div>
          <p className="text-[11px] sm:text-xs text-teal-100 font-bold truncate mt-0.5">
            "Ketik 🧪 Makmal Ramuan untuk mencampurkan kata dan melihat rahsia huruf!"
          </p>
        </div>
      </div>
    </div>
  );
};
