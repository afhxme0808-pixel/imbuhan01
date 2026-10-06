import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Star,
  Zap,
  Check
} from 'lucide-react';
import { CABARAN_KONTEKS_LIST } from '../../data/contextData';
import { CabaranKonteksSoalan, MuridProfile } from '../../types';
import { soundManager } from '../../utils/audio';
import { recordModuleActivity } from '../../utils/storage';

interface GameContextProps {
  profile: MuridProfile;
  onUpdateProfile: (p: MuridProfile) => void;
  onBackToMap: () => void;
}

export const GameContextStage: React.FC<GameContextProps> = ({
  profile,
  onUpdateProfile,
  onBackToMap
}) => {
  const [index, setIndex] = useState<number>(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [scoreStreak, setScoreStreak] = useState<number>(0);

  const currentItem = CABARAN_KONTEKS_LIST[index];

  const handlePick = (choice: string) => {
    if (isAnswered) return;
    soundManager.playClick();
    setSelected(choice);

    const isRight = choice === currentItem.jawapanBetul;
    setIsAnswered(true);

    if (isRight) {
      soundManager.playSuccess();
      setScoreStreak((s) => s + 1);
      const res = recordModuleActivity('Cabaran Konteks', true);
      onUpdateProfile(res.profile);
    } else {
      soundManager.playHint();
      setScoreStreak(0);
    }
  };

  const handleNext = () => {
    soundManager.playClick();
    setIndex((prev) => (prev + 1) % CABARAN_KONTEKS_LIST.length);
    setSelected(null);
    setIsAnswered(false);
  };

  const isCorrect = selected === currentItem.jawapanBetul;

  return (
    <div className="h-full flex flex-col justify-between overflow-hidden p-2 sm:p-4 max-w-5xl mx-auto space-y-2">
      {/* Top Bar: Arena Streak & Question Counter */}
      <div className="bg-[#102B3D] rounded-2xl p-2.5 border border-amber-500/40 shadow-sm flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400 text-amber-300 flex items-center justify-center font-black">
            🎯
          </div>
          <div>
            <div className="text-[10px] uppercase font-black tracking-wider text-amber-400">
              Arena Cabaran Konteks
            </div>
            <h2 className="text-xs sm:text-sm font-black font-game text-white truncate">
              Situasi: {currentItem.situasi} · {currentItem.tahap}
            </h2>
          </div>
        </div>

        {/* Streak combo meter */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-[#18394F] px-2.5 py-1 rounded-xl text-xs font-black text-amber-300 border border-amber-500/30">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Streak: x{scoreStreak}</span>
          </div>
          <span className="text-xs font-bold text-slate-300">
            {index + 1} / {CABARAN_KONTEKS_LIST.length}
          </span>
        </div>
      </div>

      {/* Main Arena Battle Display */}
      <div className="bg-[#102A3C] rounded-3xl border-2 border-amber-500/40 p-4 sm:p-6 flex flex-col justify-between shadow-xl flex-1 overflow-hidden min-h-0">
        {/* Situation Sentence Card */}
        <div className="p-4 sm:p-6 bg-[#183B52] rounded-2xl border-2 border-amber-400/40 text-center my-auto">
          <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider block mb-1">
            Lengkapkan Ayat Gramatis:
          </span>
          <p className="text-base sm:text-xl font-black font-game text-white leading-relaxed">
            {currentItem.ayat.replace(
              '______',
              selected ? `[ ${selected.toUpperCase()} ]` : '______'
            )}
          </p>
        </div>

        {/* 4 Chunky Choice Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-auto">
          {currentItem.pilihan.map((choice, i) => {
            const isPicked = selected === choice;
            const isTarget = choice === currentItem.jawapanBetul;

            let btnStyle = 'bg-[#18394F] hover:bg-[#204963] text-white border-teal-500/30';
            if (isAnswered) {
              if (isTarget) {
                btnStyle = 'bg-emerald-500 text-teal-950 font-black border-emerald-300 shadow-md scale-[1.02]';
              } else if (isPicked && !isTarget) {
                btnStyle = 'bg-rose-500 text-white font-black border-rose-300';
              }
            } else if (isPicked) {
              btnStyle = 'bg-amber-400 text-slate-950 font-black border-amber-300';
            }

            return (
              <button
                key={choice}
                onClick={() => handlePick(choice)}
                disabled={isAnswered}
                className={`p-3.5 rounded-2xl border-2 text-sm sm:text-base font-black font-mono uppercase transition-all flex items-center justify-between ${btnStyle}`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-black/20 text-white flex items-center justify-center text-xs">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span>{choice}</span>
                </div>
                {isAnswered && isTarget && <Check className="w-5 h-5 text-teal-950" />}
              </button>
            );
          })}
        </div>

        {/* Feedback Section */}
        {isAnswered && (
          <div
            className={`p-3 rounded-2xl border text-xs sm:text-sm leading-snug flex items-center justify-between gap-3 ${
              isCorrect
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                : 'bg-amber-500/20 border-amber-400 text-amber-200'
            }`}
          >
            <div>
              <strong className="block font-black text-xs uppercase">
                {isCorrect ? 'Tahniah! Jawapan Tepat! (+15 XP)' : 'Perhatikan Fungsi Makna:'}
              </strong>
              <p className="text-xs text-slate-200 leading-snug mt-0.5">{currentItem.peneranganFungsi}</p>
            </div>
            <button
              onClick={handleNext}
              className="btn-chunky-amber px-4 py-2 rounded-xl text-slate-950 font-black text-xs shrink-0 flex items-center gap-1.5 uppercase"
            >
              <span>Soalan Seterusnya</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="flex items-center justify-between pt-1 shrink-0">
        <button
          onClick={onBackToMap}
          className="text-xs font-bold text-amber-300 hover:text-white flex items-center gap-1"
        >
          ← Kembali ke Peta Misi
        </button>
        <span className="text-[11px] text-slate-400 font-bold">
          Cabaran Ketepatan Makna Situasi
        </span>
      </div>
    </div>
  );
};
