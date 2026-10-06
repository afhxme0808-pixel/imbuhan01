import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { KIDS_WORDS, KidsWord } from '../../data/kidsData';
import { soundManager } from '../../utils/audio';

interface KidsMatchProps {
  onEarnStar: () => void;
  onBackToMenu: () => void;
}

export const KidsMatchGame: React.FC<KidsMatchProps> = ({ onEarnStar, onBackToMenu }) => {
  const [index, setIndex] = useState<number>(0);
  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  const currentTarget: KidsWord = KIDS_WORDS[index];

  const distractors = KIDS_WORDS.filter((w) => w.id !== currentTarget.id);
  const distractor1 = distractors[(index + 1) % distractors.length];
  const distractor2 = distractors[(index + 3) % distractors.length];

  const options =
    index % 3 === 0
      ? [currentTarget, distractor1, distractor2]
      : index % 3 === 1
      ? [distractor1, currentTarget, distractor2]
      : [distractor1, distractor2, currentTarget];

  const handlePick = (word: KidsWord) => {
    if (isAnswered) return;
    soundManager.playClick();
    setSelectedWordId(word.id);
    setIsAnswered(true);

    const isRight = word.id === currentTarget.id;
    if (isRight) {
      soundManager.playSuccess();
      onEarnStar();
    } else {
      soundManager.playHint();
    }
  };

  const handleNext = () => {
    soundManager.playClick();
    setIndex((prev) => (prev + 1) % KIDS_WORDS.length);
    setSelectedWordId(null);
    setIsAnswered(false);
  };

  const isCorrect = selectedWordId === currentTarget.id;

  return (
    <div className="h-full flex flex-col justify-between overflow-hidden p-1.5 sm:p-3 max-w-4xl mx-auto space-y-1.5 select-none">
      {/* Top Bar */}
      <div className="bg-[#0E2F38] rounded-xl sm:rounded-2xl p-2 border border-pink-400/40 shadow-xs flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="text-xl">🎯</span>
          <div>
            <h2 className="text-xs sm:text-sm font-black font-game text-pink-300 leading-none">
              Padankan Gambar Yang Betul!
            </h2>
            <span className="text-[10px] text-teal-300 font-bold">
              Cabaran {index + 1} / {KIDS_WORDS.length}
            </span>
          </div>
        </div>

        <span className="text-[10px] sm:text-xs font-bold text-pink-300 bg-pink-500/20 px-2.5 py-0.5 rounded-full border border-pink-400/40">
          Uji Minda Cilik 🧠
        </span>
      </div>

      {/* Main Matching Arena */}
      <div className="bg-[#0E2A32] rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-pink-400/40 p-3 sm:p-4 flex flex-col justify-between shadow-xl flex-1 min-h-0 overflow-hidden">
        {/* Target Word Banner */}
        <div className="text-center my-auto space-y-0.5">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-pink-300 block">
            Manakah Gambar Bagi:
          </span>
          <div className="inline-block bg-gradient-to-r from-pink-500 to-rose-600 text-white font-game font-black text-xl sm:text-3xl px-6 py-2 rounded-2xl shadow-md uppercase tracking-wide border-2 border-pink-300">
            {currentTarget.hasil}
          </div>
          <p className="text-[10px] sm:text-xs text-teal-200 font-bold">
            "{currentTarget.maknaRingkas}"
          </p>
        </div>

        {/* 3 Visual Picture Cards */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-lg mx-auto w-full my-auto">
          {options.map((opt) => {
            const isPicked = selectedWordId === opt.id;
            const isTarget = opt.id === currentTarget.id;

            let cardStyle = 'bg-[#174653] hover:bg-[#1f5869] border-2 sm:border-4 border-teal-500/30';
            if (isAnswered) {
              if (isTarget) {
                cardStyle = 'bg-emerald-500 border-2 sm:border-4 border-white shadow-md scale-105';
              } else if (isPicked && !isTarget) {
                cardStyle = 'bg-rose-500 border-2 sm:border-4 border-rose-300 opacity-70';
              }
            }

            return (
              <button
                key={opt.id}
                onClick={() => handlePick(opt)}
                disabled={isAnswered}
                className={`p-2.5 sm:p-3.5 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer ${cardStyle}`}
              >
                <span className="text-3xl sm:text-5xl">{opt.emoji}</span>
                <span className="text-[11px] sm:text-sm font-black font-game uppercase text-white mt-1">
                  {opt.kata}
                </span>
                {isAnswered && isTarget && (
                  <span className="mt-0.5 bg-white text-emerald-800 text-[9px] font-black px-1.5 py-0.5 rounded-full">
                    ✓ Tepat!
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback Bar */}
        {isAnswered && (
          <div
            className={`p-2 rounded-xl border text-center animate-in zoom-in-95 duration-150 ${
              isCorrect
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                : 'bg-amber-500/20 border-amber-400 text-amber-200'
            }`}
          >
            <div className="font-game font-black text-xs sm:text-sm">
              {isCorrect ? '🎉 TAHNIAH! ANDA BIJAK! (+1 ⭐)' : '💡 JAWAPAN KURANG TEPAT!'}
            </div>
            <p className="text-[10px] sm:text-xs font-bold text-white mt-0.5">
              {currentTarget.ayatContoh}
            </p>
          </div>
        )}

        {/* Action Button: Next */}
        <div className="pt-1 flex justify-center">
          {isAnswered ? (
            <button
              onClick={handleNext}
              className="btn-chunky-amber px-6 py-2 rounded-2xl text-slate-950 font-black font-game text-xs sm:text-sm uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
            >
              <span>Soalan Seterusnya</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="h-8" />
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
        <span className="text-[10px] sm:text-[11px] text-pink-300 font-bold">
          ⭐ Pilih gambar yang sepadan untuk dapatkan bintang!
        </span>
      </div>
    </div>
  );
};
