import React, { useState } from 'react';
import {
  PenTool,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  ArrowRight,
  Star,
  Check
} from 'lucide-react';
import { BINA_AYAT_LIST } from '../../data/sentenceBuilderData';
import { BinaAyatLatihan, MuridProfile } from '../../types';
import { soundManager } from '../../utils/audio';
import { recordModuleActivity } from '../../utils/storage';

interface GameSentenceProps {
  profile: MuridProfile;
  onUpdateProfile: (p: MuridProfile) => void;
  onBackToMap: () => void;
}

export const GameSentenceStage: React.FC<GameSentenceProps> = ({
  profile,
  onUpdateProfile,
  onBackToMap
}) => {
  const [index, setIndex] = useState<number>(0);
  const [subjek, setSubjek] = useState<string>('');
  const [predikat, setPredikat] = useState<string>('');
  const [objek, setObjek] = useState<string>('');
  const [isTested, setIsTested] = useState<boolean>(false);

  const currentItem = BINA_AYAT_LIST[index];

  const handleTestSentence = () => {
    if (!subjek || !predikat || !objek) return;
    soundManager.playSuccess();
    setIsTested(true);
    const res = recordModuleActivity('Pembinaan Ayat', true);
    onUpdateProfile(res.profile);
  };

  const handleReset = () => {
    soundManager.playClick();
    setSubjek('');
    setPredikat('');
    setObjek('');
    setIsTested(false);
  };

  const handleNext = () => {
    soundManager.playClick();
    setIndex((prev) => (prev + 1) % BINA_AYAT_LIST.length);
    handleReset();
  };

  const fullSentence = `${subjek} ${predikat} ${objek}`.trim();

  return (
    <div className="h-full flex flex-col justify-between overflow-hidden p-2 sm:p-4 max-w-5xl mx-auto space-y-2">
      {/* Top Bar: Word Target Banner */}
      <div className="bg-[#102B3D] rounded-2xl p-2.5 border border-purple-500/40 shadow-sm flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-400 text-purple-300 flex items-center justify-center font-black">
            📜
          </div>
          <div>
            <div className="text-[10px] uppercase font-black tracking-wider text-purple-400">
              Kuil Pembina Ayat Gramatis
            </div>
            <h2 className="text-xs sm:text-sm font-black font-game text-white truncate">
              Sasaran: <span className="text-amber-300 font-mono uppercase">{currentItem.kataBerimbuhan}</span> · {currentItem.jenisImbuhan}
            </h2>
          </div>
        </div>

        <span className="text-xs font-bold text-slate-300">
          Latihan {index + 1} / {BINA_AYAT_LIST.length}
        </span>
      </div>

      {/* Main Sentence Assembly Chamber */}
      <div className="bg-[#102A3C] rounded-3xl border-2 border-purple-500/40 p-4 sm:p-6 flex flex-col justify-between shadow-xl flex-1 overflow-hidden min-h-0">
        {/* Assembly Slot Preview */}
        <div className="p-3 sm:p-4 bg-[#183B52] rounded-2xl border-2 border-dashed border-purple-400/50 text-center my-auto min-h-16 flex items-center justify-center">
          {fullSentence ? (
            <p className="text-sm sm:text-lg font-black font-game text-emerald-300 leading-snug">
              {fullSentence}
            </p>
          ) : (
            <span className="text-xs sm:text-sm text-slate-400 italic">
              Ketik blok perkataan di bawah untuk mengisi Subjek + Predikat + Objek...
            </span>
          )}
        </div>

        {/* 3 Columns of Word Bank Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 my-auto">
          {/* Subjek Slot */}
          <div className="bg-[#0E2433] p-2.5 rounded-2xl border border-teal-500/30 space-y-1.5">
            <span className="text-[10px] font-black uppercase text-teal-300 block">
              1. Subjek (Siapa)
            </span>
            <div className="space-y-1">
              {currentItem.bankPerkataan.subjek.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    soundManager.playClick();
                    setSubjek(item);
                    setIsTested(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    subjek === item
                      ? 'bg-purple-500 text-white font-black shadow-md'
                      : 'bg-[#18394F] hover:bg-[#204963] text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Predikat Slot */}
          <div className="bg-[#0E2433] p-2.5 rounded-2xl border border-purple-500/30 space-y-1.5">
            <span className="text-[10px] font-black uppercase text-purple-300 block">
              2. Kata Kerja Berimbuhan
            </span>
            <div className="space-y-1">
              {currentItem.bankPerkataan.predikat.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    soundManager.playClick();
                    setPredikat(item);
                    setIsTested(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    predikat === item
                      ? 'bg-purple-500 text-white font-black shadow-md'
                      : 'bg-[#18394F] hover:bg-[#204963] text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Objek Slot */}
          <div className="bg-[#0E2433] p-2.5 rounded-2xl border border-teal-500/30 space-y-1.5">
            <span className="text-[10px] font-black uppercase text-teal-300 block">
              3. Objek / Keterangan
            </span>
            <div className="space-y-1">
              {currentItem.bankPerkataan.objekKeterangan.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    soundManager.playClick();
                    setObjek(item);
                    setIsTested(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    objek === item
                      ? 'bg-purple-500 text-white font-black shadow-md'
                      : 'bg-[#18394F] hover:bg-[#204963] text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action / Result Bar */}
        <div className="pt-2 flex items-center justify-between border-t border-purple-500/20">
          <button
            onClick={handleReset}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-bold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Kosongkan</span>
          </button>

          {!isTested ? (
            <button
              onClick={handleTestSentence}
              disabled={!subjek || !predikat || !objek}
              className={`btn-chunky-purple px-6 py-2 rounded-xl text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-1.5 ${
                !subjek || !predikat || !objek ? 'opacity-40 cursor-not-allowed' : ''
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Uji Formula Ayat!</span>
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-xs font-black text-emerald-400">
                ✓ Formula Gramatis! (+15 XP)
              </span>
              <button
                onClick={handleNext}
                className="btn-chunky-amber px-4 py-1.5 rounded-xl text-slate-950 font-black text-xs flex items-center gap-1"
              >
                <span>Ayat Seterusnya</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex items-center justify-between pt-1 shrink-0">
        <button
          onClick={onBackToMap}
          className="text-xs font-bold text-purple-300 hover:text-white flex items-center gap-1"
        >
          ← Kembali ke Peta Misi
        </button>
        <span className="text-[11px] text-slate-400 font-bold">
          Struktur Ayat Bahasa Melayu Standard
        </span>
      </div>
    </div>
  );
};
