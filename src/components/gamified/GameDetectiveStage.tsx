import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  HelpCircle,
  Sparkles,
  RotateCcw,
  Check,
  Star
} from 'lucide-react';
import { DETEKTIF_SOALAN_LIST } from '../../data/detectiveData';
import { DetektifSoalan, MuridProfile } from '../../types';
import { soundManager } from '../../utils/audio';
import { recordModuleActivity } from '../../utils/storage';

interface GameDetectiveProps {
  profile: MuridProfile;
  onUpdateProfile: (p: MuridProfile) => void;
  onBackToMap: () => void;
}

export const GameDetectiveStage: React.FC<GameDetectiveProps> = ({
  profile,
  onUpdateProfile,
  onBackToMap
}) => {
  const [caseIdx, setCaseIdx] = useState<number>(0);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedFix, setSelectedFix] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [solvedCases, setSolvedCases] = useState<string[]>([]);

  const currentCase = DETEKTIF_SOALAN_LIST[caseIdx];
  const words = currentCase.ayatAsal.split(' ');

  const handleSelectWord = (w: string) => {
    soundManager.playClick();
    const clean = w.replace(/[.,]/g, '');
    setSelectedWord(clean);
    setSelectedFix(null);
    setIsSubmitted(false);
  };

  const handleSelectFix = (fix: string) => {
    soundManager.playClick();
    setSelectedFix(fix);
  };

  const handleSolve = () => {
    if (!selectedFix) return;
    const isCorrect = selectedFix.toLowerCase() === currentCase.jawapanBetul.toLowerCase();
    setIsSubmitted(true);

    if (isCorrect) {
      soundManager.playSuccess();
      if (!solvedCases.includes(currentCase.id)) {
        setSolvedCases((prev) => [...prev, currentCase.id]);
        const res = recordModuleActivity('Detektif Kesalahan', true);
        onUpdateProfile(res.profile);
      }
    } else {
      soundManager.playHint();
    }
  };

  const handleNextCase = () => {
    soundManager.playClick();
    setCaseIdx((prev) => (prev + 1) % DETEKTIF_SOALAN_LIST.length);
    setSelectedWord(null);
    setSelectedFix(null);
    setIsSubmitted(false);
    setShowHint(false);
  };

  const isCorrect = selectedFix?.toLowerCase() === currentCase.jawapanBetul.toLowerCase();

  return (
    <div className="h-full flex flex-col justify-between overflow-hidden p-2 sm:p-4 max-w-6xl mx-auto space-y-2">
      {/* Top Bar: Case Switcher Pills */}
      <div className="bg-[#102B3D] rounded-2xl p-2.5 border border-cyan-500/40 shadow-sm flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400 text-cyan-300 flex items-center justify-center font-black">
            🔍
          </div>
          <div>
            <div className="text-[10px] uppercase font-black tracking-wider text-cyan-400">
              Biro Siasatan Kes {caseIdx + 1} / {DETEKTIF_SOALAN_LIST.length}
            </div>
            <h2 className="text-xs sm:text-sm font-black font-game text-white truncate max-w-xs sm:max-w-md">
              {currentCase.tajukKes} · {currentCase.situasi}
            </h2>
          </div>
        </div>

        {/* Case Dots */}
        <div className="flex items-center gap-1">
          {DETEKTIF_SOALAN_LIST.map((c, i) => (
            <button
              key={c.id}
              onClick={() => {
                soundManager.playClick();
                setCaseIdx(i);
                setSelectedWord(null);
                setSelectedFix(null);
                setIsSubmitted(false);
              }}
              className={`w-6 h-6 rounded-lg text-[11px] font-black transition-all ${
                i === caseIdx
                  ? 'bg-cyan-400 text-cyan-950 shadow-md scale-105'
                  : solvedCases.includes(c.id)
                  ? 'bg-emerald-500/80 text-white'
                  : 'bg-[#18394F] text-slate-400'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Detective Case Desk */}
      <div className="bg-[#102A3C] rounded-3xl border-2 border-cyan-500/40 p-4 sm:p-6 flex flex-col justify-between shadow-xl flex-1 overflow-hidden min-h-0">
        {/* Step 1: Click the suspect word */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
              <span>Langkah 1:</span> Ketik Perkataan Yang Salah Dalam Ayat Ini:
            </span>
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-xs text-amber-300 hover:text-white flex items-center gap-1 font-bold"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showHint ? 'Tutup Petunjuk' : 'Minta Petunjuk'}</span>
            </button>
          </div>

          {showHint && (
            <div className="p-2.5 bg-amber-500/20 border border-amber-400/60 rounded-xl text-xs text-amber-200">
              💡 <strong>Petunjuk:</strong> {currentCase.petunjuk}
            </div>
          )}

          {/* Interactive Clickable Sentence Words */}
          <div className="p-4 bg-[#183B52] rounded-2xl border border-cyan-500/40 flex flex-wrap items-center gap-2 leading-relaxed">
            {words.map((w, i) => {
              const clean = w.replace(/[.,]/g, '');
              const isSelected = selectedWord?.toLowerCase() === clean.toLowerCase();
              const isSuspect = clean.toLowerCase() === currentCase.perkataanSalah.toLowerCase();

              return (
                <button
                  key={i}
                  onClick={() => handleSelectWord(w)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-sm sm:text-base transition-all ${
                    isSelected
                      ? 'bg-cyan-400 text-cyan-950 font-black shadow-[0_3px_0_#0891b2] scale-105'
                      : isSubmitted && isSuspect
                      ? 'bg-rose-500/30 text-rose-300 line-through border border-rose-400'
                      : 'bg-[#0E2433] hover:bg-[#133347] text-white border border-teal-500/30'
                  }`}
                >
                  {w}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Choose Correct Word */}
        {selectedWord && (
          <div className="space-y-2 pt-2">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-400 block">
              Langkah 2: Pilih Pembetulan Tatabahasa Bagi "{selectedWord.toUpperCase()}":
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {currentCase.pilihanPembetulan.map((choice) => {
                const isPicked = selectedFix === choice;
                return (
                  <button
                    key={choice}
                    onClick={() => handleSelectFix(choice)}
                    className={`p-3 rounded-xl border-2 font-mono font-black text-xs sm:text-sm uppercase transition-all ${
                      isPicked
                        ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md scale-105'
                        : 'bg-[#18394F] hover:bg-[#204963] text-white border-teal-500/30'
                    }`}
                  >
                    {choice}
                  </button>
                );
              })}
            </div>

            {!isSubmitted && (
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleSolve}
                  disabled={!selectedFix}
                  className="btn-chunky-emerald px-6 py-2 rounded-xl text-teal-950 font-black text-xs sm:text-sm uppercase tracking-wider"
                >
                  Sahkan Jawapan Siasatan!
                </button>
              </div>
            )}
          </div>
        )}

        {/* Feedback & Result Stamp */}
        {isSubmitted && (
          <div
            className={`p-3 rounded-2xl border text-xs sm:text-sm leading-snug flex items-start gap-2.5 ${
              isCorrect
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                : 'bg-amber-500/20 border-amber-400 text-amber-200'
            }`}
          >
            {isCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <strong className="block font-black text-xs uppercase">
                {isCorrect ? 'Tahniah, Kes Selesai! (+15 XP)' : 'Cuba Sekali Lagi!'}
              </strong>
              <p className="mt-0.5 text-xs text-slate-200 leading-snug">{currentCase.penerangan}</p>
            </div>
            {isCorrect && (
              <button
                onClick={handleNextCase}
                className="btn-chunky-amber px-4 py-1.5 rounded-xl text-slate-950 font-black text-xs shrink-0 flex items-center gap-1"
              >
                <span>Kes Seterusnya</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="flex items-center justify-between pt-1 shrink-0">
        <button
          onClick={onBackToMap}
          className="text-xs font-bold text-cyan-300 hover:text-white flex items-center gap-1"
        >
          ← Kembali ke Peta Misi
        </button>
        <span className="text-[11px] text-slate-400 font-bold">
          Siasatan Ralat Tatabahasa Melayu
        </span>
      </div>
    </div>
  );
};
