import React, { useState } from 'react';
import {
  PenTool,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Send,
  Info
} from 'lucide-react';
import { BINA_AYAT_LIST } from '../../data/sentenceBuilderData';
import { BinaAyatLatihan, MuridProfile } from '../../types';
import { soundManager } from '../../utils/audio';
import { recordModuleActivity } from '../../utils/storage';

interface SentenceProps {
  profile: MuridProfile;
  onUpdateProfile: (p: MuridProfile) => void;
}

export const SentenceBuilder: React.FC<SentenceProps> = ({ profile, onUpdateProfile }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  // Mode: 'pilihan' (guided word blocks) or 'bebas' (independent typing)
  const [mode, setMode] = useState<'pilihan' | 'bebas'>('pilihan');

  // Guided block slots
  const [selectedSubjek, setSelectedSubjek] = useState<string>('');
  const [selectedPredikat, setSelectedPredikat] = useState<string>('');
  const [selectedObjek, setSelectedObjek] = useState<string>('');

  // Independent typing
  const [freeTextSentence, setFreeTextSentence] = useState<string>('');

  // Evaluation states
  const [isEvaluated, setIsEvaluated] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<{
    status: 'tepat' | 'perlu-semakan-guru' | 'tidak-lengkap';
    message: string;
  } | null>(null);

  const currentItem: BinaAyatLatihan = BINA_AYAT_LIST[currentIdx];

  const handleResetCurrent = () => {
    soundManager.playClick();
    setSelectedSubjek('');
    setSelectedPredikat('');
    setSelectedObjek('');
    setFreeTextSentence('');
    setIsEvaluated(false);
    setEvaluationResult(null);
  };

  const handleSelectWordInSlot = (slot: 'subjek' | 'predikat' | 'objek', word: string) => {
    soundManager.playClick();
    if (slot === 'subjek') setSelectedSubjek(word);
    if (slot === 'predikat') setSelectedPredikat(word);
    if (slot === 'objek') setSelectedObjek(word);
    setIsEvaluated(false);
    setEvaluationResult(null);
  };

  // Evaluate guided sentence
  const handleEvaluateGuided = () => {
    if (!selectedSubjek || !selectedPredikat || !selectedObjek) {
      setEvaluationResult({
        status: 'tidak-lengkap',
        message: 'Sila lengkapkan ketiga-tiga komponen: Subjek, Predikat berimbuhan, dan Objek/Keterangan.'
      });
      return;
    }

    soundManager.playSuccess();
    setIsEvaluated(true);
    setEvaluationResult({
      status: 'tepat',
      message: 'Ayat anda gramatis! Susunan Subjek + Kata Kerja Berimbuhan + Objek/Keterangan menepati struktur ayat Bahasa Melayu.'
    });

    const result = recordModuleActivity('Pembinaan Ayat', true);
    onUpdateProfile(result.profile);
  };

  // Evaluate independent sentence using safe, transparent heuristics
  const handleEvaluateFreeText = () => {
    const text = freeTextSentence.trim();
    if (text.length < 10) {
      setEvaluationResult({
        status: 'tidak-lengkap',
        message: 'Ayat terlalu pendek. Sila bina ayat lengkap yang mengandungi subjek, kata kerja, dan keterangan.'
      });
      return;
    }

    const lower = text.toLowerCase();
    const hasTargetWord = currentItem.kataKunciWajib.some((w) => lower.includes(w.toLowerCase()));

    if (!hasTargetWord) {
      soundManager.playHint();
      setIsEvaluated(true);
      setEvaluationResult({
        status: 'tidak-lengkap',
        message: `Ayat mestilah mengandungi perkataan sasaran "${currentItem.kataBerimbuhan}".`
      });
      return;
    }

    // Check sentence structure ends with period
    const endsWithPeriod = text.endsWith('.');

    soundManager.playSuccess();
    setIsEvaluated(true);
    setEvaluationResult({
      status: 'tepat',
      message: `Bagus! Ayat anda menggunakan perkataan "${currentItem.kataBerimbuhan}" dengan betul. ${
        !endsWithPeriod ? '(Peringatan: Pastikan ayat diakhiri dengan tanda noktah ".")' : ''
      }`
    });

    const result = recordModuleActivity('Pembinaan Ayat', true);
    onUpdateProfile(result.profile);
  };

  const handleNextItem = () => {
    soundManager.playClick();
    const next = (currentIdx + 1) % BINA_AYAT_LIST.length;
    setCurrentIdx(next);
    handleResetCurrent();
  };

  const constructedSentence = `${selectedSubjek} ${selectedPredikat} ${selectedObjek}`.trim();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-teal-700 uppercase tracking-wider flex items-center gap-1.5">
            <PenTool className="w-4 h-4" />
            <span>Studio Pembinaan Ayat Sintaksis</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading mt-0.5">
            Membina Ayat Gramatis Berimbuhan
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Gunakan perkataan berimbuhan yang dipelajari untuk menghasilkan ayat yang bermakna dan betul tatabahasa.
          </p>
        </div>

        {/* Mode Selector (Pilihan Blok Berpandu vs Tulisan Bebas) */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
          <button
            onClick={() => {
              soundManager.playClick();
              setMode('pilihan');
              setIsEvaluated(false);
              setEvaluationResult(null);
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              mode === 'pilihan'
                ? 'bg-white text-teal-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tahap 1: Blok Berpandu
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setMode('bebas');
              setIsEvaluated(false);
              setEvaluationResult(null);
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              mode === 'bebas'
                ? 'bg-white text-teal-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tahap 2: Penulisan Bebas
          </button>
        </div>
      </div>

      {/* Target Word Focus Banner */}
      <div className="bg-gradient-to-r from-teal-800 to-teal-950 text-white rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">Perkataan Sasaran:</span>
          <div className="text-3xl sm:text-4xl font-extrabold font-heading tracking-wide">
            {currentItem.kataBerimbuhan}
          </div>
          <div className="text-xs text-teal-200">
            Kata Dasar: <span className="font-bold uppercase font-mono">{currentItem.kataDasar}</span> · {currentItem.jenisImbuhan}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/20 text-xs max-w-sm">
          <div className="font-bold text-teal-200 mb-0.5">Maksud Perkataan:</div>
          <p className="text-teal-100 leading-relaxed">{currentItem.maksud}</p>
        </div>
      </div>

      {/* Mode 1: Guided Word Blocks */}
      {mode === 'pilihan' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <div className="text-xs font-bold text-teal-800 uppercase tracking-wider">
              Susun Frasa Mengikut Pola: Subjek + Predikat + Objek/Keterangan
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Ketik satu pilihan bagi setiap slot untuk melengkapkan ayat anda.
            </p>
          </div>

          {/* Current Sentence Preview Display */}
          <div className="p-5 bg-slate-50 rounded-2xl border-2 border-dashed border-teal-200 text-center min-h-20 flex items-center justify-center">
            {constructedSentence ? (
              <p className="text-base sm:text-xl font-bold text-slate-900 font-heading">
                {constructedSentence}
              </p>
            ) : (
              <span className="text-xs sm:text-sm text-slate-400 italic">
                Pilih frasa daripada bank perkataan di bawah untuk membentuk ayat...
              </span>
            )}
          </div>

          {/* Word Bank in 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Slot 1: Subjek */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                1. Subjek (Siapa)
              </span>
              <div className="space-y-2">
                {currentItem.bankPerkataan.subjek.map((sub, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectWordInSlot('subjek', sub)}
                    className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all ${
                      selectedSubjek === sub
                        ? 'bg-teal-700 text-white font-bold border-teal-700 shadow-2xs'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>

            {/* Slot 2: Predikat Berimbuhan */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-teal-800 uppercase tracking-wider block">
                2. Kata Kerja Berimbuhan
              </span>
              <div className="space-y-2">
                {currentItem.bankPerkataan.predikat.map((pred, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectWordInSlot('predikat', pred)}
                    className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all ${
                      selectedPredikat === pred
                        ? 'bg-teal-700 text-white font-bold border-teal-700 shadow-2xs'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    {pred}
                  </button>
                ))}
              </div>
            </div>

            {/* Slot 3: Objek / Keterangan */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                3. Objek / Keterangan
              </span>
              <div className="space-y-2">
                {currentItem.bankPerkataan.objekKeterangan.map((obj, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectWordInSlot('objek', obj)}
                    className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all ${
                      selectedObjek === obj
                        ? 'bg-teal-700 text-white font-bold border-teal-700 shadow-2xs'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    {obj}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <button
              onClick={handleResetCurrent}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Kosongkan Susunan</span>
            </button>

            <button
              onClick={handleEvaluateGuided}
              disabled={!selectedSubjek || !selectedPredikat || !selectedObjek}
              className={`font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm transition-colors ${
                !selectedSubjek || !selectedPredikat || !selectedObjek
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-teal-700 hover:bg-teal-800 text-white shadow-xs'
              }`}
            >
              Semak Ayat
            </button>
          </div>
        </div>
      )}

      {/* Mode 2: Free Text Independent Writing */}
      {mode === 'bebas' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <div className="text-xs font-bold text-teal-800 uppercase tracking-wider">
              Tahap 2: Bina Ayat Anda Sendiri
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Tulis ayat lengkap yang mengandungi perkataan berimbuhan <strong className="text-teal-900 font-mono">"{currentItem.kataBerimbuhan}"</strong>.
            </p>
          </div>

          <div className="space-y-2">
            <textarea
              rows={4}
              value={freeTextSentence}
              onChange={(e) => {
                setFreeTextSentence(e.target.value);
                setIsEvaluated(false);
                setEvaluationResult(null);
              }}
              placeholder={`Tulis ayat anda di sini... Contoh: ${currentItem.contohAyatModel}`}
              className="w-full p-4 rounded-2xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 text-sm outline-none transition-colors"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>{currentItem.petunjuk}</span>
              <span>{freeTextSentence.trim().split(/\s+/).filter(Boolean).length} patah perkataan</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <button
              onClick={handleResetCurrent}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Padam Ayat</span>
            </button>

            <button
              onClick={handleEvaluateFreeText}
              disabled={freeTextSentence.trim().length === 0}
              className={`font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm transition-colors ${
                freeTextSentence.trim().length === 0
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-teal-700 hover:bg-teal-800 text-white shadow-xs'
              }`}
            >
              Semak Ayat Saya
            </button>
          </div>
        </div>
      )}

      {/* Evaluation Feedback Panel */}
      {evaluationResult && (
        <div
          className={`p-5 rounded-2xl border text-xs sm:text-sm leading-relaxed flex items-start gap-3.5 ${
            evaluationResult.status === 'tepat'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-amber-50 border-amber-300 text-amber-950'
          }`}
        >
          {evaluationResult.status === 'tepat' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          )}
          <div className="space-y-1 flex-1">
            <div className="font-bold text-sm">
              {evaluationResult.status === 'tepat' ? 'Penilaian Gramatis: Tepat!' : 'Perlu Semakan'}
            </div>
            <p>{evaluationResult.message}</p>

            {evaluationResult.status === 'tepat' && (
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  <span>+15 XP Pembinaan Ayat</span>
                </span>
                <button
                  onClick={handleNextItem}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-2xs"
                >
                  <span>Latihan Seterusnya</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
