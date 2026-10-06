import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, X } from 'lucide-react';
import { KIDS_WORDS, KidsWord } from '../../data/kidsData';
import { soundManager } from '../../utils/audio';

interface KidsDetectiveProps {
  onEarnStar: () => void;
  onBackToMenu: () => void;
}

export const KidsDetectiveGame: React.FC<KidsDetectiveProps> = ({ onEarnStar, onBackToMenu }) => {
  const [index, setIndex] = useState<number>(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const currentWord: KidsWord = KIDS_WORDS[index];

  const isCorrectFirst = index % 2 === 0;
  const choiceA = isCorrectFirst ? currentWord.hasil : currentWord.pilihanSalah;
  const choiceB = isCorrectFirst ? currentWord.pilihanSalah : currentWord.hasil;

  const handlePick = (choice: string) => {
    if (isAnswered) return;
    soundManager.playClick();
    setSelectedChoice(choice);
    setIsAnswered(true);

    const right = choice === currentWord.hasil;
    setIsCorrect(right);

    if (right) {
      soundManager.playSuccess();
      onEarnStar();
    } else {
      soundManager.playHint();
    }
  };

  const handleNext = () => {
    soundManager.playClick();
    setIndex((prev) => (prev + 1) % KIDS_WORDS.length);
    setSelectedChoice(null);
    setIsAnswered(false);
    setIsCorrect(false);
  };

  return (
    <div className="h-full flex flex-col justify-between overflow-hidden p-1.5 sm:p-3 max-w-4xl mx-auto space-y-1.5 select-none">
      {/* Top Bar: Question Progress */}
      <div className="bg-[#0E2F38] rounded-xl sm:rounded-2xl p-2 border border-amber-400/40 shadow-xs flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="text-xl">🔍</span>
          <div>
            <h2 className="text-xs sm:text-sm font-black font-game text-amber-300 leading-none">
              Detektif Cilik: Cari Ejaan Betul!
            </h2>
            <span className="text-[10px] text-teal-300 font-bold">
              Soalan {index + 1} / {KIDS_WORDS.length}
            </span>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-1">
          {KIDS_WORDS.map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === index
                  ? 'bg-amber-400 scale-125'
                  : i < index
                  ? 'bg-emerald-400'
                  : 'bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Detective Case Box */}
      <div className="bg-[#0E2A32] rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-amber-400/40 p-3 sm:p-4 flex flex-col justify-between shadow-xl flex-1 min-h-0 overflow-hidden">
        {/* Cartoon Illustration and Sentence with Blank */}
        <div className="text-center my-auto space-y-1 sm:space-y-1.5">
          <div className="w-14 h-14 sm:w-20 sm:h-20 mx-auto rounded-2xl bg-gradient-to-b from-[#174653] to-[#0d2a33] border-2 sm:border-4 border-amber-400 shadow-md flex items-center justify-center text-3xl sm:text-5xl">
            {currentWord.emoji}
          </div>

          <div className="p-2 sm:p-2.5 bg-[#133E4A] rounded-xl sm:rounded-2xl border border-teal-500/30 max-w-md mx-auto">
            <p className="text-sm sm:text-lg font-black font-game text-white leading-relaxed">
              {currentWord.ayatContoh.replace(
                currentWord.hasil,
                selectedChoice ? `[ ${selectedChoice.toUpperCase()} ]` : '______'
              )}
            </p>
          </div>

          <p className="text-[11px] sm:text-xs font-bold text-teal-200">
            Kata dasar: <span className="text-amber-300 uppercase font-mono">{currentWord.kata}</span>
          </p>
        </div>

        {/* 2 Big Chunky Answer Buttons */}
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto w-full my-auto">
          {[choiceA, choiceB].map((choice) => {
            const isPicked = selectedChoice === choice;
            const isThisTarget = choice === currentWord.hasil;

            let btnStyle = 'btn-chunky-teal text-white';
            if (isAnswered) {
              if (isThisTarget) {
                btnStyle = 'btn-chunky-emerald text-teal-950 font-black scale-105';
              } else if (isPicked && !isThisTarget) {
                btnStyle = 'btn-chunky-rose text-white opacity-70';
              }
            }

            return (
              <button
                key={choice}
                onClick={() => handlePick(choice)}
                disabled={isAnswered}
                className={`py-2.5 sm:py-3.5 px-3 rounded-2xl text-base sm:text-xl font-black font-game uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${btnStyle}`}
              >
                <span>{choice}</span>
                {isAnswered && isThisTarget && <Check className="w-5 h-5 stroke-[3]" />}
                {isAnswered && isPicked && !isThisTarget && <X className="w-5 h-5 stroke-[3]" />}
              </button>
            );
          })}
        </div>

        {/* Result Message when answered */}
        {isAnswered && (
          <div
            className={`p-2 rounded-xl border text-center animate-in zoom-in-95 duration-150 ${
              isCorrect
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                : 'bg-amber-500/20 border-amber-400 text-amber-200'
            }`}
          >
            <div className="font-game font-black text-xs sm:text-sm">
              {isCorrect ? '🌟 TAHNIAH! JAWAPAN TEPAT! (+1 ⭐)' : '💡 CUBA LAGI YA!'}
            </div>
            <p className="text-[10px] sm:text-xs font-bold text-white mt-0.5">
              {currentWord.rahsiaHuruf}
            </p>
          </div>
        )}

        {/* Action Button: Next Question */}
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
        <span className="text-[10px] sm:text-[11px] text-amber-300 font-bold">
          ⭐ Cari ejaan yang betul untuk dapatkan bintang!
        </span>
      </div>
    </div>
  );
};
