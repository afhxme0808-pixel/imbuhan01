import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, ArrowRight, Sparkles, BookOpen, Check } from 'lucide-react';
import { CABARAN_KONTEKS_LIST } from '../../data/contextData';
import { CabaranKonteksSoalan, MuridProfile } from '../../types';
import { soundManager } from '../../utils/audio';
import { recordModuleActivity } from '../../utils/storage';

interface ContextProps {
  profile: MuridProfile;
  onUpdateProfile: (p: MuridProfile) => void;
}

export const ContextChallenge: React.FC<ContextProps> = ({ profile, onUpdateProfile }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [completedItems, setCompletedItems] = useState<string[]>([]);

  const currentItem: CabaranKonteksSoalan = CABARAN_KONTEKS_LIST[currentIndex];

  const handleSelectChoice = (choice: string) => {
    if (isSubmitted) return;
    soundManager.playClick();
    setSelectedChoice(choice);
  };

  const handleSubmit = () => {
    if (!selectedChoice) return;

    const isCorrect = selectedChoice === currentItem.jawapanBetul;
    setIsSubmitted(true);

    if (isCorrect) {
      soundManager.playSuccess();
      if (!completedItems.includes(currentItem.id)) {
        setCompletedItems((prev) => [...prev, currentItem.id]);
        const result = recordModuleActivity('Cabaran Konteks', true);
        onUpdateProfile(result.profile);
      }
    } else {
      soundManager.playHint();
    }
  };

  const handleNext = () => {
    soundManager.playClick();
    const nextIdx = (currentIndex + 1) % CABARAN_KONTEKS_LIST.length;
    setCurrentIndex(nextIdx);
    setSelectedChoice(null);
    setIsSubmitted(false);
  };

  // Preview sentence with selected word inserted
  const sentenceDisplay = currentItem.ayat.replace(
    '______',
    selectedChoice ? `[ ${selectedChoice.toUpperCase()} ]` : '______'
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Konteks & Makna Gramatis</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading mt-0.5">
            Cabaran Konteks Pengimbuhan
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Pilih perkataan berimbuhan yang paling sesuai mengikut fungsi makna dan situasi ayat.
          </p>
        </div>

        {/* Progress pills */}
        <div className="flex items-center gap-1.5">
          {CABARAN_KONTEKS_LIST.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => {
                soundManager.playClick();
                setCurrentIndex(idx);
                setSelectedChoice(null);
                setIsSubmitted(false);
              }}
              className={`w-6 h-6 rounded-md text-xs font-bold transition-colors ${
                idx === currentIndex
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : completedItems.includes(q.id)
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Challenge Card */}
      <div className="bg-white rounded-3xl border border-emerald-100 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Situation Meta */}
        <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-emerald-800">Situasi: {currentItem.situasi}</span>
            <span>·</span>
            <span>{currentItem.tahap}</span>
          </div>
          <span>Soalan {currentIndex + 1} daripada {CABARAN_KONTEKS_LIST.length}</span>
        </div>

        {/* The Sentence with Fill-in Slot */}
        <div className="p-6 bg-slate-50/90 rounded-2xl border border-slate-200 text-center">
          <p className="text-base sm:text-xl font-bold text-slate-900 leading-relaxed font-heading">
            {sentenceDisplay}
          </p>
        </div>

        {/* Choices */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
            Pilih Perkataan Yang Paling Tepat:
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentItem.pilihan.map((choice, i) => {
              const isSelected = selectedChoice === choice;
              const isCorrectChoice = choice === currentItem.jawapanBetul;

              let style = 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200';
              if (isSelected) {
                style = 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold';
              }
              if (isSubmitted) {
                if (isCorrectChoice) {
                  style = 'bg-emerald-600 text-white font-bold border-emerald-600';
                } else if (isSelected && !isCorrectChoice) {
                  style = 'bg-rose-600 text-white font-bold border-rose-600';
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelectChoice(choice)}
                  disabled={isSubmitted}
                  className={`p-4 rounded-xl border text-sm text-left transition-all flex items-center justify-between ${style}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-100/80 flex items-center justify-center font-bold text-xs text-slate-700">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="font-mono text-sm uppercase">{choice}</span>
                  </div>
                  {isSubmitted && isCorrectChoice && (
                    <Check className="w-5 h-5 text-white shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pedagogical Explanation when Submitted */}
        {isSubmitted && (
          <div
            className={`p-4 sm:p-5 rounded-2xl border text-xs sm:text-sm leading-relaxed flex items-start gap-3 ${
              selectedChoice === currentItem.jawapanBetul
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            {selectedChoice === currentItem.jawapanBetul ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <div className="font-bold text-sm">
                {selectedChoice === currentItem.jawapanBetul ? 'Tepat Sekali!' : 'Perhatikan Fungsi Tatabahasa:'}
              </div>
              <p>{currentItem.peneranganFungsi}</p>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-100">
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedChoice}
              className={`font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm transition-colors ml-auto ${
                !selectedChoice
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs'
              }`}
            >
              Semak Jawapan
            </button>
          ) : (
            <>
              <div className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                <span>+15 XP Ditambah</span>
              </div>
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-xs transition-colors"
              >
                <span>Soalan Seterusnya</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
