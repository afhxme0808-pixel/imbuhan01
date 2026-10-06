import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  HelpCircle,
  Sparkles,
  RotateCcw,
  Check
} from 'lucide-react';
import { DETEKTIF_SOALAN_LIST } from '../../data/detectiveData';
import { DetektifSoalan, MuridProfile } from '../../types';
import { soundManager } from '../../utils/audio';
import { recordModuleActivity } from '../../utils/storage';

interface DetectiveProps {
  profile: MuridProfile;
  onUpdateProfile: (p: MuridProfile) => void;
}

export const ErrorDetective: React.FC<DetectiveProps> = ({ profile, onUpdateProfile }) => {
  const [currentCaseIndex, setCurrentCaseIndex] = useState<number>(0);
  const [selectedWordToFix, setSelectedWordToFix] = useState<string | null>(null);
  const [selectedCorrection, setSelectedCorrection] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [solvedCases, setSolvedCases] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  const currentCase: DetektifSoalan = DETEKTIF_SOALAN_LIST[currentCaseIndex];

  // Tokenize sentence into clickable words
  const wordsInSentence = currentCase.ayatAsal.split(' ');

  const handleSelectWord = (word: string) => {
    // Strip trailing punctuation for comparison
    const cleaned = word.replace(/[.,]/g, '');
    soundManager.playClick();
    setSelectedWordToFix(cleaned);
    setSelectedCorrection(null);
    setIsSubmitted(false);
    setFeedback(null);
  };

  const handleSelectCorrection = (correction: string) => {
    soundManager.playClick();
    setSelectedCorrection(correction);
  };

  const handleSubmitCase = () => {
    if (!selectedCorrection) return;

    const isCorrect = selectedCorrection.toLowerCase() === currentCase.jawapanBetul.toLowerCase();
    setIsSubmitted(true);

    if (isCorrect) {
      soundManager.playSuccess();
      setFeedback({
        isCorrect: true,
        message: currentCase.penerangan
      });
      if (!solvedCases.includes(currentCase.id)) {
        setSolvedCases((prev) => [...prev, currentCase.id]);
        const result = recordModuleActivity('Detektif Kesalahan', true);
        onUpdateProfile(result.profile);
      }
    } else {
      soundManager.playHint();
      setFeedback({
        isCorrect: false,
        message: `Belum tepat. ${currentCase.petunjuk}`
      });
    }
  };

  const handleNextCase = () => {
    soundManager.playClick();
    const nextIdx = (currentCaseIndex + 1) % DETEKTIF_SOALAN_LIST.length;
    setCurrentCaseIndex(nextIdx);
    setSelectedWordToFix(null);
    setSelectedCorrection(null);
    setIsSubmitted(false);
    setShowHint(false);
    setFeedback(null);
  };

  const handleRetry = () => {
    soundManager.playClick();
    setSelectedCorrection(null);
    setIsSubmitted(false);
    setFeedback(null);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-cyan-700 uppercase tracking-wider flex items-center gap-1.5">
            <Search className="w-4 h-4" />
            <span>Biro Siasatan Morfologi</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading mt-0.5">
            Detektif Kesalahan Pengimbuhan
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Kaji ayat di bawah, kenal pasti perkataan berimbuhan yang salah dieja, dan pilih pembetulan tatabahasa yang tepat.
          </p>
        </div>

        {/* Case Counter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Kes {currentCaseIndex + 1} / {DETEKTIF_SOALAN_LIST.length}</span>
          <div className="flex gap-1">
            {DETEKTIF_SOALAN_LIST.map((c, i) => (
              <button
                key={c.id}
                onClick={() => {
                  soundManager.playClick();
                  setCurrentCaseIndex(i);
                  setSelectedWordToFix(null);
                  setSelectedCorrection(null);
                  setIsSubmitted(false);
                  setFeedback(null);
                }}
                className={`w-6 h-6 rounded-md text-xs font-bold transition-colors ${
                  i === currentCaseIndex
                    ? 'bg-cyan-700 text-white shadow-2xs'
                    : solvedCases.includes(c.id)
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Detective Investigation Card */}
      <div className="bg-white rounded-3xl border border-cyan-100 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Case Banner */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-600 animate-pulse" />
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
              {currentCase.tajukKes}
            </h2>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500">{currentCase.situasi}</span>
          </div>

          <button
            onClick={() => setShowHint(!showHint)}
            className="text-xs font-semibold text-cyan-700 hover:text-cyan-900 flex items-center gap-1"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showHint ? 'Tutup Petunjuk' : 'Minta Petunjuk'}</span>
          </button>
        </div>

        {/* Hint Callout */}
        {showHint && (
          <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Petunjuk Detektif:</strong> {currentCase.petunjuk}
            </div>
          </div>
        )}

        {/* Step 1: Click the suspect word */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
            Langkah 1: Ketik Pada Perkataan Yang Salah Dalam Ayat Ini:
          </label>

          <div className="p-5 sm:p-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-wrap items-center gap-2 leading-loose text-base sm:text-lg">
            {wordsInSentence.map((w, idx) => {
              const cleaned = w.replace(/[.,]/g, '');
              const isSuspect = cleaned.toLowerCase() === currentCase.perkataanSalah.toLowerCase();
              const isSelected = selectedWordToFix?.toLowerCase() === cleaned.toLowerCase();

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectWord(w)}
                  className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                    isSelected
                      ? 'bg-cyan-700 text-white shadow-xs scale-105 font-bold'
                      : isSubmitted && isSuspect
                      ? 'bg-rose-100 text-rose-900 border border-rose-300 line-through'
                      : 'bg-white hover:bg-cyan-50 border border-slate-200 text-slate-800'
                  }`}
                >
                  {w}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Choose the correct morphology form */}
        {selectedWordToFix && (
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Langkah 2: Pilih Pembetulan Yang Tepat Bagi Perkataan "
              <span className="font-mono text-cyan-800 uppercase">{selectedWordToFix}</span>":
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {currentCase.pilihanPembetulan.map((choice) => {
                const isSelected = selectedCorrection === choice;
                const isCorrect = choice.toLowerCase() === currentCase.jawapanBetul.toLowerCase();

                let style = 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200';
                if (isSelected) {
                  style = 'bg-cyan-700 text-white border-cyan-700 shadow-xs font-bold';
                }
                if (isSubmitted) {
                  if (isSelected && isCorrect) {
                    style = 'bg-emerald-600 text-white font-bold border-emerald-600';
                  } else if (isSelected && !isCorrect) {
                    style = 'bg-rose-600 text-white font-bold border-rose-600';
                  }
                }

                return (
                  <button
                    key={choice}
                    onClick={() => handleSelectCorrection(choice)}
                    disabled={isSubmitted && isCorrect}
                    className={`p-3.5 rounded-xl border text-xs sm:text-sm font-mono uppercase text-center transition-all ${style}`}
                  >
                    {choice}
                  </button>
                );
              })}
            </div>

            {/* Submit button */}
            {!isSubmitted && (
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleSubmitCase}
                  disabled={!selectedCorrection}
                  className={`font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm transition-colors ${
                    !selectedCorrection
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-cyan-700 hover:bg-cyan-800 text-white shadow-xs'
                  }`}
                >
                  Sahkan Pembetulan
                </button>
              </div>
            )}
          </div>
        )}

        {/* Feedback Section */}
        {feedback && (
          <div
            className={`p-4 sm:p-5 rounded-2xl border text-xs sm:text-sm leading-relaxed flex items-start gap-3 ${
              feedback.isCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            {feedback.isCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <div className="font-bold text-sm">
                {feedback.isCorrect ? 'Tahniah, Kes Berjaya Diselesaikan!' : 'Siasatan Belum Selesai'}
              </div>
              <p>{feedback.message}</p>
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        {isSubmitted && (
          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            {!feedback?.isCorrect ? (
              <button
                onClick={handleRetry}
                className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 font-bold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Cuba Semula Kes Ini</span>
              </button>
            ) : (
              <div className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                <span>+15 XP Ditambah</span>
              </div>
            )}

            <button
              onClick={handleNextCase}
              className="inline-flex items-center gap-2 bg-cyan-700 hover:bg-cyan-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-xs transition-colors ml-auto"
            >
              <span>Seterusnya: Kes {((currentCaseIndex + 1) % DETEKTIF_SOALAN_LIST.length) + 1}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
