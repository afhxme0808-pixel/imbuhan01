import React, { useState, useEffect } from 'react';
import {
  FlaskConical,
  Play,
  RotateCcw,
  CheckCircle,
  HelpCircle,
  BookOpen,
  ArrowRight,
  Sparkles,
  Info,
  Save,
  Check,
  AlertCircle
} from 'lucide-react';
import { MorfemDetail, LogEksperimen, StatusPenguasaan, MuridProfile } from '../../types';
import { MORFOLOGI_DATABASE, IMBUHAN_LIST, KATA_DASAR_LIST } from '../../data/morphologyData';
import { FlaskAnimation } from './FlaskAnimation';
import { ProfessorMascot } from '../ui/ProfessorMascot';
import { soundManager } from '../../utils/audio';
import { recordExperimentCompletion } from '../../utils/storage';

interface LabProps {
  initialKataDasar?: string;
  profile: MuridProfile;
  onUpdateProfile: (p: MuridProfile) => void;
  onNavigateToLogbook: () => void;
}

export const LabExperiment: React.FC<LabProps> = ({
  initialKataDasar = 'sapu',
  profile,
  onUpdateProfile,
  onNavigateToLogbook
}) => {
  // Select active word in database or default to sapu-menyapu
  const [selectedKataDasar, setSelectedKataDasar] = useState<string>(initialKataDasar.toLowerCase());
  const [selectedImbuhan, setSelectedImbuhan] = useState<string>('meN-');

  // Stages: 1: Ramalan, 2: Bahan, 3: Tindak Balas Animasi, 4: Pemerhatian, 5: Kesimpulan, 6: Laporan Makmal
  const [stage, setStage] = useState<number>(1);

  // Stage 1 Prediction state
  const [userPrediction, setUserPrediction] = useState<string>('');
  const [predictionSubmitted, setPredictionSubmitted] = useState<boolean>(false);

  // Experiment Reaction State
  const [reactionStatus, setReactionStatus] = useState<'idle' | 'reacting' | 'success' | 'warning'>('idle');

  // Stage 5 Conclusion Quiz
  const [selectedQuizChoice, setSelectedQuizChoice] = useState<string>('');
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizAttempts, setQuizAttempts] = useState<number>(1);
  const [quizFeedback, setQuizFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  // Stage 6 Own Sentence
  const [userSentence, setUserSentence] = useState<string>('');
  const [isSavedToLogbook, setIsSavedToLogbook] = useState<boolean>(false);
  const [xpAwardedNotification, setXpAwardedNotification] = useState<number | null>(null);

  // Scientist Notebook Drawer on Mobile
  const [showMobileNotebook, setShowMobileNotebook] = useState<boolean>(false);

  // Find corresponding database record
  const currentRecord: MorfemDetail | undefined = MORFOLOGI_DATABASE.find(
    (item) => item.kataDasar.toLowerCase() === selectedKataDasar.toLowerCase() && item.imbuhan === selectedImbuhan
  );

  // Fallback if combination is not yet in lab
  const isCombinationAvailable = !!currentRecord;

  // When initialKataDasar changes externally
  useEffect(() => {
    if (initialKataDasar) {
      setSelectedKataDasar(initialKataDasar.toLowerCase());
      // reset to stage 1
      resetExperimentState();
    }
  }, [initialKataDasar]);

  const resetExperimentState = () => {
    setStage(1);
    setUserPrediction('');
    setPredictionSubmitted(false);
    setReactionStatus('idle');
    setSelectedQuizChoice('');
    setQuizSubmitted(false);
    setQuizAttempts(1);
    setQuizFeedback(null);
    setUserSentence('');
    setIsSavedToLogbook(false);
    setXpAwardedNotification(null);
  };

  const handleKataDasarChange = (kata: string) => {
    soundManager.playClick();
    setSelectedKataDasar(kata);
    resetExperimentState();
  };

  const handleImbuhanChange = (imbuhan: string) => {
    soundManager.playClick();
    setSelectedImbuhan(imbuhan);
    resetExperimentState();
  };

  // Stage 1: Submit Prediction
  const handleConfirmPrediction = (pred: string) => {
    soundManager.playClick();
    setUserPrediction(pred);
    setPredictionSubmitted(true);
  };

  const handleProceedToStage2 = () => {
    soundManager.playClick();
    setStage(2);
  };

  // Stage 3: Run Experiment Trigger
  const handleRunExperiment = () => {
    if (!isCombinationAvailable) {
      soundManager.playHint();
      setReactionStatus('warning');
      return;
    }

    soundManager.playBubble();
    setStage(3);
    setReactionStatus('reacting');

    // Run synthesis animation for ~600ms
    setTimeout(() => {
      soundManager.playSuccess();
      setReactionStatus('success');
      setStage(4);
    }, 700);
  };

  // Stage 5: Submit Conclusion Quiz
  const handleQuizSubmit = () => {
    if (!currentRecord || !selectedQuizChoice) return;

    const isCorrect = selectedQuizChoice === currentRecord.soalanKesimpulan.jawapanBetul;
    setQuizSubmitted(true);

    if (isCorrect) {
      soundManager.playSuccess();
      setQuizFeedback({
        isCorrect: true,
        message: currentRecord.soalanKesimpulan.penerangan
      });
    } else {
      soundManager.playHint();
      setQuizAttempts((prev) => prev + 1);
      setQuizFeedback({
        isCorrect: false,
        message: `Hampir tepat! ${currentRecord.petunjuk}`
      });
    }
  };

  const handleProceedToStage6 = () => {
    soundManager.playClick();
    setStage(6);
  };

  // Stage 6: Complete & Save into Scientist Logbook
  const handleSaveReport = () => {
    if (!currentRecord) return;
    soundManager.playFanfare();

    const isFirstTry = quizAttempts === 1;
    const finalSentence = userSentence.trim() || currentRecord.contohAyat;

    const newLogEntry: LogEksperimen = {
      id: `log-${Date.now()}`,
      tarikh: new Date().toLocaleDateString('ms-MY', { day: 'numeric', month: 'short', year: 'numeric' }),
      kataDasar: currentRecord.kataDasar,
      imbuhan: currentRecord.imbuhan,
      ramalanAwal: userPrediction || currentRecord.perkataanTerhasil,
      hasilEksperimen: currentRecord.perkataanTerhasil,
      percubaan: quizAttempts,
      ayatMurid: finalSentence,
      statusPenguasaan: isFirstTry ? 'Dikuasai' : 'Sedang Belajar',
      skor: isFirstTry ? 100 : Math.max(60, 100 - (quizAttempts - 1) * 20),
      catatanSaintis: currentRecord.hukumTatabahasa
    };

    const result = recordExperimentCompletion(
      currentRecord.id,
      newLogEntry,
      currentRecord.kemahiran,
      isFirstTry
    );

    onUpdateProfile(result.profile);
    setXpAwardedNotification(result.xpEarned);
    setIsSavedToLogbook(true);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Breadcrumb & Stage Steps */}
      <div className="bg-white rounded-2xl p-4 border border-teal-100/90 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-700">
              <FlaskConical className="w-4 h-4" />
              <span>Makmal Eksperimen Digital</span>
              <span>·</span>
              <span className="text-slate-500">Peringkat {stage} daripada 6</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading mt-0.5">
              Eksperimen Sintesis Morfem: <span className="text-teal-800 uppercase">{selectedKataDasar}</span>
            </h1>
          </div>

          {/* 6 Stage Indicators */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {[
              { num: 1, name: 'Pemerhatian' },
              { num: 2, name: 'Bahan' },
              { num: 3, name: 'Sintesis' },
              { num: 4, name: 'Hasil' },
              { num: 5, name: 'Kesimpulan' },
              { num: 6, name: 'Laporan' }
            ].map((st) => (
              <div
                key={st.num}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                  stage === st.num
                    ? 'bg-teal-700 text-white shadow-2xs'
                    : stage > st.num
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                <span>{st.num}.</span>
                <span>{st.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main 2-Zone Sandbox: Stage (Left/Center) + Scientist Notebook (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Zone: Interactive Laboratory Stage (8 columns) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Visual Stage Box */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs relative overflow-hidden">
            {/* Background lab measurement grid */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(#0F766E 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
            />

            {/* Stage Content Switcher */}
            <div className="relative z-10">
              {/* PERINGKAT 1: PEMERHATIAN & RAMALAN AWAL */}
              {stage === 1 && (
                <div className="space-y-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                        Peringkat 1: Pemerhatian & Ramalan Awal
                      </div>
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1 font-heading">
                        Perhatikan Kata Dasar: <span className="text-teal-800 uppercase font-mono">{selectedKataDasar}</span>
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1">
                        Sebagai seorang saintis bahasa, buat ramalan terlebih dahulu: Apakah perkataan yang mungkin terbentuk apabila kata dasar ini menerima awalan <span className="font-bold text-teal-800 font-mono">{selectedImbuhan}</span>?
                      </p>
                    </div>

                    <div className="hidden sm:block shrink-0">
                      <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-800 font-extrabold text-2xl font-mono shadow-2xs uppercase">
                        {selectedKataDasar.charAt(0)}
                      </div>
                    </div>
                  </div>

                  {/* Word Card in center */}
                  <div className="flex flex-col items-center justify-center py-6 bg-slate-50/80 rounded-2xl border border-slate-200/60">
                    <span className="text-xs font-semibold text-slate-500 uppercase">Spesimen Kata Dasar</span>
                    <span className="text-3xl sm:text-4xl font-extrabold text-teal-950 font-heading tracking-wide uppercase mt-1">
                      {selectedKataDasar}
                    </span>
                    <span className="text-xs text-slate-500 mt-1">
                      Huruf awal: <strong className="text-teal-800 font-mono">"{selectedKataDasar.charAt(0)}"</strong> · Awalan diuji: <strong className="text-teal-800 font-mono">"{selectedImbuhan}"</strong>
                    </span>
                  </div>

                  {/* Prediction Options */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Pilih Ramalan Bentuk Perkataan:
                    </label>

                    {currentRecord ? (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {currentRecord.pilihanRamalan.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleConfirmPrediction(opt)}
                            className={`p-3 rounded-xl border text-sm font-bold uppercase font-mono transition-all text-center ${
                              userPrediction === opt
                                ? 'bg-teal-700 text-white border-teal-700 shadow-sm'
                                : 'bg-white hover:bg-teal-50 text-slate-800 border-slate-200'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-3 bg-amber-50 text-amber-900 text-xs rounded-xl border border-amber-200">
                        Pilih kata dasar yang tersedia dari koleksi makmal di sebelah kanan.
                      </div>
                    )}

                    {predictionSubmitted && (
                      <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                        <div>
                          Ramalan anda dicatat: <span className="font-extrabold uppercase font-mono">{userPrediction}</span>.
                        </div>
                        <button
                          onClick={handleProceedToStage2}
                          className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 shadow-2xs"
                        >
                          <span>Seterusnya: Pilih Bahan</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* PERINGKAT 2 & 3: PEMILIHAN BAHAN & JALANKAN EKSPERIMEN */}
              {(stage === 2 || stage === 3) && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                        {stage === 2 ? 'Peringkat 2: Pemilihan Bahan Reagen' : 'Peringkat 3: Sintesis Perkataan'}
                      </div>
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1 font-heading">
                        Meja Campuran Reagen Digital
                      </h2>
                    </div>

                    <button
                      onClick={() => setStage(1)}
                      className="text-xs text-slate-500 hover:text-teal-700 font-semibold"
                    >
                      ← Tukar Ramalan
                    </button>
                  </div>

                  {/* Visual Reagent Synthesis Display */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    {/* Reagent Tile 1: Kata Dasar */}
                    <div className="flex flex-col items-center p-4 bg-white rounded-xl border-2 border-teal-600 shadow-2xs">
                      <span className="text-[11px] font-bold text-slate-400 uppercase">Spesimen Dasar</span>
                      <span className="text-2xl font-extrabold text-slate-900 font-mono uppercase mt-1">
                        {selectedKataDasar}
                      </span>
                      <span className="text-[11px] text-teal-700 font-medium mt-1">Bahan Utama</span>
                    </div>

                    {/* Plus & Flask center */}
                    <div className="flex flex-col items-center justify-center">
                      <FlaskAnimation
                        status={reactionStatus}
                        kataDasarText={selectedKataDasar}
                        imbuhanText={selectedImbuhan}
                        hasilText={currentRecord?.perkataanTerhasil || ''}
                      />
                    </div>

                    {/* Reagent Tile 2: Imbuhan */}
                    <div className="flex flex-col items-center p-4 bg-white rounded-xl border-2 border-emerald-600 shadow-2xs">
                      <span className="text-[11px] font-bold text-slate-400 uppercase">Reagen Imbuhan</span>
                      <span className="text-2xl font-extrabold text-emerald-800 font-mono mt-1">
                        {selectedImbuhan}
                      </span>
                      <span className="text-[11px] text-emerald-700 font-medium mt-1">
                        {currentRecord?.jenisImbuhan.toUpperCase() || 'IMBUHAN'}
                      </span>
                    </div>
                  </div>

                  {/* Affix selector tiles */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Pilih Jubin Imbuhan Untuk Diuji:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {IMBUHAN_LIST.map((imb) => {
                        const isSelected = selectedImbuhan === imb.id;
                        return (
                          <button
                            key={imb.id}
                            onClick={() => handleImbuhanChange(imb.id)}
                            className={`px-3 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
                              isSelected
                                ? 'bg-teal-800 text-white shadow-xs scale-105'
                                : 'bg-white hover:bg-teal-50 text-slate-700 border border-slate-200'
                            }`}
                          >
                            {imb.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Warning if combination not valid */}
                  {!isCombinationAvailable && (
                    <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Tindak balas belum tersedia:</strong> Gabungan kata dasar{' '}
                        <span className="font-mono font-bold uppercase">{selectedKataDasar}</span> dan imbuhan{' '}
                        <span className="font-mono font-bold">{selectedImbuhan}</span> belum tersedia dalam makmal atau bukan bentuk baku. Cuba kata dasar atau imbuhan yang lain!
                      </div>
                    </div>
                  )}

                  {/* Action Button: Jalankan Eksperimen */}
                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      onClick={handleRunExperiment}
                      disabled={!isCombinationAvailable || stage === 3}
                      className={`inline-flex items-center gap-2 font-bold px-6 py-3 rounded-xl shadow-sm text-sm transition-all ${
                        !isCombinationAvailable || stage === 3
                          ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          : 'bg-teal-700 hover:bg-teal-800 text-white active:scale-95'
                      }`}
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>{stage === 3 ? 'Eksperimen Sedang Berjalan...' : 'Jalankan Eksperimen'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* PERINGKAT 4: PEMERHATIAN HASIL */}
              {stage === 4 && currentRecord && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                        Peringkat 4: Pemerhatian Hasil Tindak Balas
                      </div>
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1 font-heading">
                        Perkataan Terhasil: <span className="text-emerald-700 uppercase font-mono">{currentRecord.perkataanTerhasil}</span>
                      </h2>
                    </div>

                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                      ✓ Sintesis Berjaya
                    </span>
                  </div>

                  {/* Word transformation highlight */}
                  <div className="p-5 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 rounded-2xl border border-emerald-200">
                    <div className="text-xs font-bold text-teal-800 uppercase mb-2">Perubahan Bentuk Morfologi:</div>
                    <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono">
                      <span className="text-teal-700 uppercase">{currentRecord.kataDasar}</span>
                      <span className="text-slate-400 mx-2">+</span>
                      <span className="text-teal-700">{currentRecord.imbuhan}</span>
                      <span className="text-slate-400 mx-2">→</span>
                      <span className="text-emerald-800 underline decoration-emerald-500 decoration-2 underline-offset-4 uppercase">
                        {currentRecord.perkataanTerhasil}
                      </span>
                    </div>
                    <p className="mt-2 text-xs sm:text-sm text-slate-700 font-medium">
                      🔍 <strong>Perubahan:</strong> {currentRecord.perubahanBentuk}.
                    </p>
                  </div>

                  {/* Scientific Explanation & Meaning */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-xl border border-slate-200">
                      <div className="text-xs font-bold text-slate-500 uppercase">Maksud Perkataan</div>
                      <p className="mt-1 text-xs sm:text-sm text-slate-800 leading-relaxed">
                        {currentRecord.maksudPerkataan}
                      </p>
                    </div>

                    <div className="p-4 bg-white rounded-xl border border-slate-200">
                      <div className="text-xs font-bold text-slate-500 uppercase">Contoh Penggunaan Ayat</div>
                      <p className="mt-1 text-xs sm:text-sm text-teal-900 italic font-medium leading-relaxed">
                        "{currentRecord.contohAyat}"
                      </p>
                    </div>
                  </div>

                  {/* Proceed to Stage 5 button */}
                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={() => setStage(2)}
                      className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-semibold"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Uji Semula Reagen</span>
                    </button>

                    <button
                      onClick={() => setStage(5)}
                      className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-xs transition-colors"
                    >
                      <span>Seterusnya: Ujian Kesimpulan</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* PERINGKAT 5: KESIMPULAN / UJIAN PEMAHAMAN */}
              {stage === 5 && currentRecord && (
                <div className="space-y-6">
                  <div>
                    <div className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                      Peringkat 5: Ujian Kesimpulan Saintis
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1 font-heading">
                      Uji Kefahaman Anda Terhadap Perubahan Morfem
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      {currentRecord.soalanKesimpulan.soalan}
                    </p>
                  </div>

                  {/* Quiz Choices */}
                  <div className="space-y-2.5">
                    {currentRecord.soalanKesimpulan.pilihan.map((pilihan, idx) => {
                      const isSelected = selectedQuizChoice === pilihan;
                      const isSubmitted = quizSubmitted;
                      const isCorrectChoice = pilihan === currentRecord.soalanKesimpulan.jawapanBetul;

                      let btnStyle = 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200';
                      if (isSelected) {
                        btnStyle = 'bg-teal-50 border-teal-600 text-teal-900 font-bold';
                      }
                      if (isSubmitted && isSelected) {
                        btnStyle = isCorrectChoice
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-900 font-bold'
                          : 'bg-rose-50 border-rose-500 text-rose-900 font-bold';
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            if (!quizSubmitted) {
                              soundManager.playClick();
                              setSelectedQuizChoice(pilihan);
                            }
                          }}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-600">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span>{pilihan}</span>
                          </div>
                          {isSubmitted && isCorrectChoice && (
                            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Box */}
                  {quizFeedback && (
                    <div
                      className={`p-4 rounded-xl border text-xs leading-relaxed flex items-start gap-3 ${
                        quizFeedback.isCorrect
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                          : 'bg-amber-50 border-amber-200 text-amber-900'
                      }`}
                    >
                      {quizFeedback.isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className="font-bold">
                          {quizFeedback.isCorrect ? 'Tahniah, Analisis Tepat!' : 'Perhatikan Petunjuk Profesor:'}
                        </div>
                        <div className="mt-0.5">{quizFeedback.message}</div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="pt-2 flex items-center justify-between">
                    {!quizSubmitted ? (
                      <button
                        onClick={handleQuizSubmit}
                        disabled={!selectedQuizChoice}
                        className={`font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-colors ${
                          !selectedQuizChoice
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            : 'bg-teal-700 hover:bg-teal-800 text-white shadow-xs'
                        }`}
                      >
                        Sahkan Jawapan Kesimpulan
                      </button>
                    ) : quizFeedback?.isCorrect ? (
                      <button
                        onClick={handleProceedToStage6}
                        className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-xs transition-colors ml-auto"
                      >
                        <span>Seterusnya: Lengkapkan Laporan</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setQuizSubmitted(false);
                          setSelectedQuizChoice('');
                          setQuizFeedback(null);
                        }}
                        className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2 rounded-xl text-xs"
                      >
                        Cuba Sekali Lagi
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* PERINGKAT 6: LAPORAN EKSPERIMEN & AYAT SENDIRI */}
              {stage === 6 && currentRecord && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                        Peringkat 6: Laporan Digital Saintis
                      </div>
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1 font-heading">
                        Lengkapkan Log Penemuan & Bina Ayat Anda
                      </h2>
                    </div>

                    <span className="px-3 py-1 bg-teal-100 text-teal-800 text-xs font-bold rounded-full">
                      Peringkat Akhir
                    </span>
                  </div>

                  {/* Report Card Summary */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-3 text-xs">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <span className="text-slate-400 block font-semibold">KATA DASAR:</span>
                        <span className="font-extrabold text-slate-900 uppercase font-mono">{currentRecord.kataDasar}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-semibold">IMBUHAN DIUJI:</span>
                        <span className="font-extrabold text-teal-800 font-mono">{currentRecord.imbuhan}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-semibold">RAMALAN AWAL:</span>
                        <span className="font-extrabold text-slate-800 uppercase font-mono">{userPrediction || '-'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-semibold">HASIL SINTESIS:</span>
                        <span className="font-extrabold text-emerald-700 uppercase font-mono">{currentRecord.perkataanTerhasil}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200">
                      <span className="text-slate-400 block font-semibold">HUKUM MORFOLOGI:</span>
                      <p className="text-slate-700 mt-0.5 leading-relaxed">{currentRecord.hukumTatabahasa}</p>
                    </div>
                  </div>

                  {/* Build own sentence */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Bina Satu Ayat Menggunakan Perkataan "{currentRecord.perkataanTerhasil.toUpperCase()}":
                    </label>
                    <textarea
                      rows={3}
                      value={userSentence}
                      onChange={(e) => setUserSentence(e.target.value)}
                      placeholder={`Contoh: ${currentRecord.contohAyat}`}
                      className="w-full p-3 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 text-xs sm:text-sm outline-none transition-colors"
                    />
                    <div className="text-[11px] text-slate-500">
                      Petunjuk: Pastikan ayat anda mengandungi subjek, kata kerja berimbuhan, dan keterangan yang jelas.
                    </div>
                  </div>

                  {/* XP Notification */}
                  {xpAwardedNotification !== null && (
                    <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-emerald-600" />
                        <div>
                          <strong className="block text-sm font-extrabold">
                            + {xpAwardedNotification} XP Ditambah!
                          </strong>
                          <span>Laporan eksperimen telah disimpan dengan selamat ke dalam Buku Log Saintis anda.</span>
                        </div>
                      </div>
                      <button
                        onClick={onNavigateToLogbook}
                        className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
                      >
                        Buka Buku Log
                      </button>
                    </div>
                  )}

                  {/* Save button */}
                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={() => setStage(1)}
                      className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-semibold"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Eksperimen Semula</span>
                    </button>

                    {!isSavedToLogbook ? (
                      <button
                        onClick={handleSaveReport}
                        className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm shadow-xs transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        <span>Simpan Ke Buku Log Saintis</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                          ✓ Berjaya Disimpan
                        </span>
                        <button
                          onClick={() => {
                            // Pick next word
                            const currentIndex = KATA_DASAR_LIST.findIndex((k) => k.kata === selectedKataDasar);
                            const nextWord = KATA_DASAR_LIST[(currentIndex + 1) % KATA_DASAR_LIST.length].kata;
                            handleKataDasarChange(nextWord);
                          }}
                          className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-4 py-2 rounded-xl text-xs"
                        >
                          Uji Kata Seterusnya →
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Zone: Scientist Laboratory Notebook & Quick Specimen Shelf (4 columns) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Base Words Specimen Shelf */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900 text-sm font-heading flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-teal-700" />
                <span>Rak Spesimen Kata Dasar</span>
              </h3>
              <span className="text-[11px] text-slate-400 font-semibold">14 Kata</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
              {KATA_DASAR_LIST.map((item) => {
                const isSelected = selectedKataDasar === item.kata;
                const isSolved = profile.eksperimenSelesai.some((id) => id.includes(item.kata));

                return (
                  <button
                    key={item.kata}
                    onClick={() => handleKataDasarChange(item.kata)}
                    className={`p-2.5 rounded-xl border text-left transition-all relative ${
                      isSelected
                        ? 'bg-teal-700 text-white border-teal-700 shadow-2xs'
                        : 'bg-slate-50 hover:bg-teal-50 text-slate-800 border-slate-200/80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold uppercase font-mono tracking-wide">
                        {item.kata}
                      </span>
                      {isSolved && (
                        <span
                          className={`w-2 h-2 rounded-full ${isSelected ? 'bg-emerald-300' : 'bg-emerald-500'}`}
                          title="Telah diselesaikan"
                        />
                      )}
                    </div>
                    <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-teal-100' : 'text-slate-400'}`}>
                      {item.sukuKata} suku kata · {item.hurufAwal}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Professor Imbuhan Advice Box */}
          <div className="bg-gradient-to-br from-teal-800 to-teal-900 text-white p-5 rounded-2xl shadow-sm border border-teal-700">
            <ProfessorMascot
              mood={stage === 4 || stage === 6 ? 'teruja' : stage === 5 ? 'berfikir' : 'gembira'}
              size="md"
              speech={
                stage === 1
                  ? 'Saintis yang baik sentiasa meramal sebelum melihat tindak balas sebenar!'
                  : stage === 2
                  ? 'Pastikan anda memilih imbuhan yang sesuai dengan golongan kata.'
                  : stage === 4
                  ? currentRecord?.petunjuk || 'Perhatikan bagaimana bentuk perkataan berubah!'
                  : stage === 5
                  ? 'Kaji soalan kesimpulan ini dengan teliti sebelum membuat pilihan.'
                  : 'Tahniah! Lengkapkan ayat anda dan rekodkan laporan ini.'
              }
            />
          </div>

          {/* Morphophonemic Rules Quick Reference */}
          <div className="bg-teal-50/70 border border-teal-200/80 rounded-2xl p-4 text-xs space-y-2 text-slate-700">
            <div className="font-bold text-teal-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <Info className="w-3.5 h-3.5 text-teal-700" />
              <span>Rumus Rahsia Saintis Morfem</span>
            </div>
            <ul className="space-y-1.5 text-[11px] text-slate-600 leading-normal list-disc list-inside">
              <li><strong className="text-teal-900">k, p, s, t</strong> luluh apabila menerima awalan meN-</li>
              <li><strong className="text-teal-900">s → ny</strong> (sapu → menyapu)</li>
              <li><strong className="text-teal-900">t → n</strong> (tulis → menulis)</li>
              <li><strong className="text-teal-900">1 suku kata</strong> menerima alomorf <strong>menge-</strong> (cat → mengecat)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
