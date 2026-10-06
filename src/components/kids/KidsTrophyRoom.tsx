import React, { useState } from 'react';
import { Star, RotateCcw, AlertTriangle } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface KidsTrophyProps {
  stars: number;
  onReset: () => void;
  onBackToMenu: () => void;
}

export const KidsTrophyRoom: React.FC<KidsTrophyProps> = ({ stars, onReset, onBackToMenu }) => {
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const badges = [
    { title: 'Saintis Permulaan', emoji: '🌱', syarat: '1 Bintang', unlocked: stars >= 1 },
    { title: 'Pakar Menyapu', emoji: '🧹', syarat: '3 Bintang', unlocked: stars >= 3 },
    { title: 'Ulat Buku Cilik', emoji: '📖', syarat: '5 Bintang', unlocked: stars >= 5 },
    { title: 'Pakar Huruf Luluh', emoji: '⚡', syarat: '8 Bintang', unlocked: stars >= 8 },
    { title: 'Bintang Emas', emoji: '🌟', syarat: '12 Bintang', unlocked: stars >= 12 },
    { title: 'Profesor Cilik', emoji: '👑', syarat: '16 Bintang', unlocked: stars >= 16 }
  ];

  return (
    <div className="h-full flex flex-col justify-between overflow-hidden p-1.5 sm:p-3 max-w-4xl mx-auto space-y-1.5 select-none">
      {/* Top Bar */}
      <div className="bg-[#0E2F38] rounded-xl sm:rounded-2xl p-2 border border-purple-400/40 shadow-xs flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="text-xl">🏆</span>
          <div>
            <h2 className="text-xs sm:text-sm font-black font-game text-purple-300 leading-none">
              Peti Harta & Trofi Bintang
            </h2>
            <span className="text-[10px] text-teal-300 font-bold">
              Koleksi Anugerah Murid
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-[#174653] px-2.5 py-0.5 rounded-xl border border-amber-400/40">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="font-game font-black text-amber-300 text-xs sm:text-sm">
            {stars} Bintang
          </span>
        </div>
      </div>

      {/* Main Trophy Showcase Arena */}
      <div className="bg-[#0E2A32] rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-purple-400/40 p-3 sm:p-4 flex flex-col justify-between shadow-xl flex-1 min-h-0 overflow-hidden">
        {/* Header summary */}
        <div className="text-center my-auto">
          <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-2xl bg-gradient-to-b from-amber-400 to-yellow-600 border-2 sm:border-4 border-white shadow-md flex items-center justify-center text-3xl sm:text-4xl">
            🏆
          </div>
          <h3 className="font-game font-black text-white text-sm sm:text-lg mt-1">
            Tahniah, Saintis Cilik!
          </h3>
          <p className="text-[11px] sm:text-xs text-teal-200 font-bold">
            Anda telah mengumpul <span className="text-amber-300 font-mono text-sm">{stars} Bintang</span>!
          </p>
        </div>

        {/* 6 Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-w-lg mx-auto w-full my-auto">
          {badges.map((b, i) => (
            <div
              key={i}
              className={`p-2 rounded-xl border transition-all flex items-center gap-2 ${
                b.unlocked
                  ? 'bg-gradient-to-br from-[#174653] to-[#113742] border-amber-400 shadow-xs'
                  : 'bg-[#0a2128] border-slate-700 opacity-50'
              }`}
            >
              <span className="text-xl sm:text-2xl shrink-0">{b.unlocked ? b.emoji : '🔒'}</span>
              <div className="min-w-0">
                <h4 className="text-[10px] sm:text-[11px] font-black font-game text-white truncate leading-tight">
                  {b.title}
                </h4>
                <p className="text-[9px] text-amber-200/80 truncate">
                  {b.syarat}
                </p>
                {b.unlocked && (
                  <span className="text-[8px] font-bold text-emerald-400 block">
                    ✓ Buka Kunci
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Reset Progress Section */}
        <div className="text-center pt-1">
          {!showConfirm ? (
            <button
              onClick={() => setShowConfirm(true)}
              className="text-[10px] font-bold text-slate-400 hover:text-rose-400 flex items-center justify-center gap-1 mx-auto cursor-pointer"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>Mula Semula Dari 0 Bintang</span>
            </button>
          ) : (
            <div className="inline-flex items-center gap-1.5 bg-rose-950/80 border border-rose-500 px-2 py-1 rounded-xl text-[10px] text-rose-200">
              <AlertTriangle className="w-3 h-3 text-rose-400" />
              <span>Padam semua bintang?</span>
              <button
                onClick={() => {
                  soundManager.playClick();
                  onReset();
                  setShowConfirm(false);
                }}
                className="px-1.5 py-0.5 rounded bg-rose-600 text-white font-bold"
              >
                Ya
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-1.5 py-0.5 rounded bg-slate-700 text-white font-bold"
              >
                Batal
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Bar: Back to Menu */}
      <div className="flex items-center justify-between pt-0.5 shrink-0 text-xs">
        <button
          onClick={onBackToMenu}
          className="font-bold text-teal-300 hover:text-white flex items-center gap-1 font-game cursor-pointer text-xs"
        >
          ← Kembali ke Menu
        </button>
        <span className="text-[10px] sm:text-[11px] text-purple-300 font-bold">
          ⭐ Teruskan bermain untuk membuka semua lencana!
        </span>
      </div>
    </div>
  );
};
