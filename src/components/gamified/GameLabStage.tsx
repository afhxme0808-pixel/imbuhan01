import React, { useState, useEffect } from 'react';
import {
  FlaskConical,
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Star,
  Zap,
  BookOpen
} from 'lucide-react';
import { MorfemDetail, MuridProfile, LogEksperimen } from '../../types';
import { MORFOLOGI_DATABASE, IMBUHAN_LIST, KATA_DASAR_LIST } from '../../data/morphologyData';
import { FlaskAnimation } from '../laboratory/FlaskAnimation';
import { soundManager } from '../../utils/audio';
import { recordExperimentCompletion } from '../../utils/storage';

interface GameLabStageProps {
  initialKataDasar?: string;
  profile: MuridProfile;
  onUpdateProfile: (p: MuridProfile) => void;
  onBackToMap: () => void;
}

export const GameLabStage: React.FC<GameLabStageProps> = ({
  initialKataDasar = 'sapu',
  profile,
  onUpdateProfile,
  onBackToMap
}) => {
  const [selectedKata, setSelectedKata] = useState<string>(initialKataDasar.toLowerCase());
  const [selectedImbuhan, setSelectedImbuhan] = useState<string>('meN-');
  const [stage, setStage] = useState<number>(1); // 1: Ramalan, 2: Sintesis Reagen, 3: Hasil & Laporan
  const [prediction, setPrediction] = useState<string>('');
  const [reactionState, setReactionState] = useState<'idle' | 'reacting' | 'success' | 'warning'>('idle');
  const [quizAnswer, setQuizAnswer] = useState<string>('');
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);
  const [studentSentence, setStudentSentence] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [xpEarned, setXpEarned] = useState<number | null>(null);

  const currentRecord = MORFOLOGI_DATABASE.find(
    (item) => item.kataDasar.toLowerCase() === selectedKata.toLowerCase() && item.imbuhan === selectedImbuhan
  );

  const isAvailable = !!currentRecord;

  useEffect(() => {
    if (initialKataDasar) {
      setSelectedKata(initialKataDasar.toLowerCase());
      resetStage();
    }
  }, [initialKataDasar]);

  const resetStage = () => {
    setStage(1);
    setPrediction('');
    setReactionState('idle');
    setQuizAnswer('');
    setIsQuizSubmitted(false);
    setStudentSentence('');
    setIsSaved(false);
    setXpEarned(null);
  };

  const handleSelectKata = (k: string) => {
    soundManager.playClick();
    setSelectedKata(k);
    resetStage();
  };

  const handleSelectImbuhan = (imb: string) => {
    soundManager.playClick();
    setSelectedImbuhan(imb);
    resetStage();
  };

  const handleRunReaction = () => {
    if (!isAvailable) {
      soundManager.playHint();
      setReactionState('warning');
      return;
    }

    soundManager.playBubble();
    setReactionState('reacting');

    setTimeout(() => {
      soundManager.playSuccess();
      setReactionState('success');
      setStage(3);
    }, 700);
  };

  const handleSaveToLog = () => {
    if (!currentRecord) return;
    soundManager.playFanfare();

    const isFirst = !profile.eksperimenSelesai.includes(currentRecord.id);
    const entry: LogEksperimen = {
      id: `log-${Date.now()}`,
      tarikh: new Date().toLocaleDateString('ms-MY', { day: 'numeric', month: 'short', year: 'numeric' }),
      kataDasar: currentRecord.kataDasar,
      imbuhan: currentRecord.imbuhan,
      ramalanAwal: prediction || currentRecord.perkataanTerhasil,
      hasilEksperimen: currentRecord.perkataanTerhasil,
      percubaan: 1,
      ayatMurid: studentSentence.trim() || currentRecord.contohAyat,
      statusPenguasaan: 'Dikuasai',
      skor: 100,
      catatanSaintis: currentRecord.hukumTatabahasa
    };

    const res = recordExperimentCompletion(currentRecord.id, entry, currentRecord.kemahiran, true);
    onUpdateProfile(res.profile);
    setXpEarned(res.xpEarned);
    setIsSaved(true);
  };

  return (
    <div className="h-full flex flex-col justify-between overflow-hidden p-2 sm:p-3 max-w-7xl mx-auto space-y-2">
      {/* Top Bar: Specimen Selector Pills (Fits single row) */}
      <div className="bg-[#102B3D] rounded-2xl p-2 border border-teal-500/40 shadow-sm flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 max-w-full">
          <span className="text-[11px] font-black text-emerald-400 uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
            🧪 Kata:
          </span>
          {KATA_DASAR_LIST.map((item) => {
            const isSelected = item.kata === selectedKata;
            const isSolved = profile.eksperimenSelesai.some((id) => id.includes(item.kata));
            return (
              <button
                key={item.kata}
                onClick={() => handleSelectKata(item.kata)}
                className={`px-2.5 py-1 rounded-xl text-xs font-black uppercase font-mono tracking-wider transition-all shrink-0 ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 shadow-[0_2px_0_#b45309] scale-105'
                    : 'bg-[#18394F] hover:bg-[#204963] text-teal-200 border border-teal-500/30'
                }`}
              >
                {item.kata}
                {isSolved && <span className="ml-1 text-emerald-400 text-[10px]">★</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Console Stage (2 Columns: Reactor on Left/Center, Info/Reaction on Right) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 flex-1 overflow-hidden min-h-0 items-stretch">
        {/* Left/Center Box: Reagents and Digital Flask Reactor (7 columns) */}
        <div className="md:col-span-7 bg-[#102A3C] rounded-3xl border-2 border-teal-500/40 p-3 sm:p-4 flex flex-col justify-between shadow-lg relative overflow-hidden">
          {/* Reactor Top HUD */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-black font-game uppercase tracking-wider text-emerald-300">
                Reaktor Sintesis Kata
              </span>
            </div>
            <div className="text-xs font-bold text-amber-300 bg-amber-500/20 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
              Fasa {stage} / 3
            </div>
          </div>

          {/* Reagents Station: Base Word + Affix Flask */}
          <div className="grid grid-cols-3 items-center gap-2 my-auto py-2">
            {/* Tile 1: Kata Dasar */}
            <div className="bg-[#183B52] border-2 border-emerald-400/60 rounded-2xl p-2.5 sm:p-3 text-center shadow-md flex flex-col items-center justify-center">
              <span className="text-[10px] uppercase font-bold text-emerald-300">Kata Dasar</span>
              <span className="text-xl sm:text-2xl font-black font-mono uppercase text-white mt-0.5">
                {selectedKata}
              </span>
              <span className="text-[9px] text-teal-200 mt-0.5 font-bold">Bahan A</span>
            </div>

            {/* Reactor Flask Center */}
            <div className="flex justify-center scale-90 sm:scale-95">
              <FlaskAnimation
                status={reactionState}
                kataDasarText={selectedKata}
                imbuhanText={selectedImbuhan}
                hasilText={currentRecord?.perkataanTerhasil || ''}
              />
            </div>

            {/* Tile 2: Imbuhan */}
            <div className="bg-[#183B52] border-2 border-cyan-400/60 rounded-2xl p-2.5 sm:p-3 text-center shadow-md flex flex-col items-center justify-center">
              <span className="text-[10px] uppercase font-bold text-cyan-300">Reagen Imbuhan</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-cyan-200 mt-0.5">
                {selectedImbuhan}
              </span>
              <span className="text-[9px] text-cyan-200 mt-0.5 font-bold">Bahan B</span>
            </div>
          </div>

          {/* Imbuhan Reagent Selector Tiles */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 block">
              Pilih Reagen Imbuhan:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {IMBUHAN_LIST.map((imb) => {
                const isSelected = selectedImbuhan === imb.id;
                return (
                  <button
                    key={imb.id}
                    onClick={() => handleSelectImbuhan(imb.id)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold transition-all ${
                      isSelected
                        ? 'bg-emerald-400 text-teal-950 font-black shadow-[0_2px_0_#059669] scale-105'
                        : 'bg-[#18394F] hover:bg-[#204963] text-teal-200 border border-teal-500/30'
                    }`}
                  >
                    {imb.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Trigger Button */}
          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={resetStage}
              className="text-xs text-teal-300 hover:text-white flex items-center gap-1 font-bold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <button
              onClick={handleRunReaction}
              disabled={!isAvailable || reactionState === 'reacting'}
              className={`btn-chunky-amber px-6 py-2 rounded-xl text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 ${
                !isAvailable ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{reactionState === 'reacting' ? 'Sintesis...' : 'Mulakan Sintesis!'}</span>
            </button>
          </div>
        </div>

        {/* Right Box: Prediction & Morphological Discovery Results (5 columns) */}
        <div className="md:col-span-5 bg-[#102A3C] rounded-3xl border-2 border-teal-500/40 p-3 sm:p-4 flex flex-col justify-between shadow-lg overflow-hidden">
          {/* Phase 1: Prediction */}
          {stage === 1 && (
            <div className="space-y-2.5 my-auto">
              <div className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Teka Bentuk Kata Terhasil!
              </div>
              <p className="text-xs text-slate-300 leading-snug">
                Sebelum menekan reaktor, apakah perkataan yang akan terhasil apabila{' '}
                <strong className="text-emerald-300 uppercase font-mono">{selectedKata}</strong> menerima{' '}
                <strong className="text-cyan-300 font-mono">{selectedImbuhan}</strong>?
              </p>

              {currentRecord && (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {currentRecord.pilihanRamalan.map((choice) => (
                    <button
                      key={choice}
                      onClick={() => {
                        soundManager.playClick();
                        setPrediction(choice);
                        setStage(2);
                      }}
                      className={`p-2.5 rounded-xl border-2 font-mono font-bold text-xs uppercase transition-all ${
                        prediction === choice
                          ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md font-black'
                          : 'bg-[#18394F] hover:bg-[#204963] text-white border-teal-500/30'
                      }`}
                    >
                      {choice}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Phase 2: Ready for reaction */}
          {stage === 2 && (
            <div className="space-y-3 my-auto text-center">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400 text-amber-300 flex items-center justify-center mx-auto text-xl">
                ⚡
              </div>
              <h3 className="font-game font-black text-white text-base">
                Bahan Reagen Sudah Sedia!
              </h3>
              <p className="text-xs text-slate-300">
                Ramalan anda: <span className="font-mono font-black text-amber-300 uppercase">{prediction}</span>.
              </p>
              <p className="text-xs text-emerald-300">
                Ketik butang <strong>"MULAKAN SINTESIS!"</strong> di sebelah kiri untuk melihat tindak balas di dalam kelalang!
              </p>
            </div>
          )}

          {/* Phase 3: Morphological Discovery & Reward */}
          {stage === 3 && currentRecord && (
            <div className="space-y-2.5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">
                    ✓ Sintesis Berjaya!
                  </span>
                  <span className="text-xs text-amber-400 font-black">⭐⭐⭐</span>
                </div>

                <div className="bg-[#183B52] p-2.5 rounded-2xl border border-teal-500/40 text-center my-1.5">
                  <span className="text-[10px] text-teal-300 block uppercase font-bold">Hasil Pembentukan:</span>
                  <span className="text-xl sm:text-2xl font-black font-mono text-emerald-300 uppercase tracking-wide">
                    {currentRecord.perkataanTerhasil}
                  </span>
                  <div className="text-[11px] text-amber-300 font-bold mt-0.5">
                    {currentRecord.perubahanBentuk}
                  </div>
                </div>

                <div className="bg-[#0E2332] p-2 rounded-xl text-[11px] text-slate-300 leading-snug">
                  <strong>Hukum:</strong> {currentRecord.hukumTatabahasa}
                </div>

                <div className="mt-1.5 p-2 bg-[#183B52] rounded-xl text-[11px] text-teal-200 italic leading-snug">
                  "{currentRecord.contohAyat}"
                </div>
              </div>

              {/* Own Sentence Input & Save */}
              <div className="space-y-1.5">
                <input
                  type="text"
                  placeholder="Tulis ayat anda di sini..."
                  value={studentSentence}
                  onChange={(e) => setStudentSentence(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-[#0E2332] border border-teal-500/40 text-xs text-white outline-none focus:border-emerald-400"
                />

                {!isSaved ? (
                  <button
                    onClick={handleSaveToLog}
                    className="w-full btn-chunky-emerald py-2 rounded-xl text-teal-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Simpan & Kumpul +35 XP!</span>
                  </button>
                ) : (
                  <div className="p-2 bg-emerald-500/20 border border-emerald-400 rounded-xl text-center text-xs font-black text-emerald-300">
                    ✓ Rekod Tersimpan! +{xpEarned} XP Ditambah!
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Bar: Back to Map button */}
      <div className="flex items-center justify-between pt-1 shrink-0">
        <button
          onClick={onBackToMap}
          className="text-xs font-bold text-teal-300 hover:text-white flex items-center gap-1"
        >
          ← Kembali ke Peta Misi
        </button>

        <span className="text-[11px] text-slate-400">
          Mod Makmal Sintesis · Tahun 3-5
        </span>
      </div>
    </div>
  );
};
