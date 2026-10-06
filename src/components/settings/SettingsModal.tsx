import React, { useState } from 'react';
import {
  Settings,
  HelpCircle,
  X,
  Volume2,
  VolumeX,
  RotateCcw,
  AlertTriangle,
  User,
  ShieldCheck,
  BookOpen,
  FlaskConical,
  Sparkles,
  Info
} from 'lucide-react';
import { MuridProfile } from '../../types';
import { soundManager } from '../../utils/audio';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'tetapan' | 'bantuan';
  profile: MuridProfile;
  onUpdateProfile: (p: MuridProfile) => void;
  onResetProgress: () => void;
  isMuted: boolean;
  setIsMuted: (m: boolean) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'tetapan',
  profile,
  onUpdateProfile,
  onResetProgress,
  isMuted,
  setIsMuted
}) => {
  const [activeTab, setActiveTab] = useState<'tetapan' | 'bantuan'>(defaultTab);
  const [studentNameInput, setStudentNameInput] = useState<string>(profile.nama);
  const [showConfirmReset, setShowConfirmReset] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSaveProfile = () => {
    soundManager.playClick();
    const updated = {
      ...profile,
      nama: studentNameInput.trim() || 'Saintis Muda'
    };
    onUpdateProfile(updated);
    onClose();
  };

  const handleConfirmResetAction = () => {
    soundManager.playClick();
    onResetProgress();
    setShowConfirmReset(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-teal-100 space-y-6 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
        {/* Header with Close */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            {activeTab === 'tetapan' ? (
              <Settings className="w-5 h-5 text-teal-700" />
            ) : (
              <HelpCircle className="w-5 h-5 text-teal-700" />
            )}
            <h3 className="font-extrabold text-slate-900 font-heading text-lg">
              {activeTab === 'tetapan' ? 'Tetapan Makmal Saintis' : 'Panduan & Bantuan Pembelajaran'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
            aria-label="Tutup tetingkap"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab buttons */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
          <button
            onClick={() => setActiveTab('tetapan')}
            className={`flex-1 py-1.5 rounded-lg font-bold transition-all text-center ${
              activeTab === 'tetapan'
                ? 'bg-white text-teal-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tetapan & Profil
          </button>
          <button
            onClick={() => setActiveTab('bantuan')}
            className={`flex-1 py-1.5 rounded-lg font-bold transition-all text-center ${
              activeTab === 'bantuan'
                ? 'bg-white text-teal-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Panduan Tatabahasa
          </button>
        </div>

        {/* Tab 1: Tetapan & Profil */}
        {activeTab === 'tetapan' && (
          <div className="space-y-5 text-xs sm:text-sm">
            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="block font-bold text-slate-700 uppercase tracking-wider text-xs">
                Nama Saintis Muda:
              </label>
              <input
                type="text"
                value={studentNameInput}
                onChange={(e) => setStudentNameInput(e.target.value)}
                maxLength={30}
                className="w-full p-3 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 text-sm outline-none"
              />
              <span className="text-[11px] text-slate-400">
                Nama ini akan dipaparkan dalam laporan makmal dan buku log.
              </span>
            </div>

            {/* Audio Toggle */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">Kesan Bunyi Makmal</div>
                <div className="text-xs text-slate-500">
                  Bunyi buih kelalang, loceng kejayaan dan petunjuk audio.
                </div>
              </div>
              <button
                onClick={() => {
                  const n = !isMuted;
                  setIsMuted(n);
                  soundManager.setMuted(n);
                  if (!n) soundManager.playClick();
                }}
                className={`p-2.5 rounded-xl border transition-colors ${
                  isMuted
                    ? 'bg-slate-200 text-slate-500 border-slate-300'
                    : 'bg-teal-700 text-white border-teal-700 shadow-2xs'
                }`}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Storage Notice */}
            <div className="p-4 bg-teal-50/70 rounded-2xl border border-teal-100 space-y-1 text-xs text-teal-950">
              <div className="font-bold flex items-center gap-1.5 text-teal-900">
                <ShieldCheck className="w-4 h-4" />
                <span>Penyimpanan Setempat Pelayar (Offline)</span>
              </div>
              <p className="leading-relaxed">
                Kemajuan pembelajaran anda disimpan di dalam pelayar ini (localStorage). Tiada data peribadi kanak-kanak dihantar ke pelayan luaran.
              </p>
            </div>

            {/* Reset Progress Section with Confirmation */}
            <div className="pt-2 border-t border-slate-100">
              {!showConfirmReset ? (
                <button
                  onClick={() => setShowConfirmReset(true)}
                  className="inline-flex items-center gap-2 text-rose-700 hover:text-rose-900 text-xs font-bold"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Tetapkan Semula Kemajuan Pembelajaran...</span>
                </button>
              ) : (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl space-y-3 text-xs text-rose-950">
                  <div className="flex items-center gap-2 font-bold text-rose-900">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Adakah anda pasti mahu menetapkan semula?</span>
                  </div>
                  <p>
                    Semua rekod eksperimen, XP dan lencana yang telah dikumpul akan dipadamkan daripada peranti ini. Tindakan ini tidak boleh dibatalkan.
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={handleConfirmResetAction}
                      className="bg-rose-700 hover:bg-rose-800 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
                    >
                      Ya, Padam & Mula Semula
                    </button>
                    <button
                      onClick={() => setShowConfirmReset(false)}
                      className="bg-white border border-slate-300 text-slate-700 font-bold px-3 py-1.5 rounded-lg text-xs"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Save Button */}
            <div className="pt-3 flex justify-end">
              <button
                onClick={handleSaveProfile}
                className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-xs"
              >
                Simpan Tetapan
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Panduan Tatabahasa */}
        {activeTab === 'bantuan' && (
          <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <FlaskConical className="w-4 h-4 text-teal-700" />
                <span>Cara Menggunakan Makmal Eksperimen:</span>
              </h4>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-600 pl-1">
                <li><strong>Pemerhatian:</strong> Teliti kata dasar dan buat ramalan awal sebelum mencampurkan bahan.</li>
                <li><strong>Pemilihan Bahan:</strong> Pilih jubin imbuhan yang sesuai (meN-, peN-, ber-, ter-, dll.).</li>
                <li><strong>Sintesis:</strong> Tekan "Jalankan Eksperimen" dan lihat animasi tindak balas kelalang.</li>
                <li><strong>Pemerhatian Hasil:</strong> Perhatikan perubahan fonem dan pelajari maksud perkataan.</li>
                <li><strong>Kesimpulan:</strong> Uji pemahaman dengan menjawab soalan analisis morfofonemik.</li>
                <li><strong>Laporan Saintis:</strong> Bina ayat gramatis dan simpan ke dalam Buku Log untuk meraih XP!</li>
              </ol>
            </div>

            <div className="p-4 bg-teal-50/70 rounded-2xl border border-teal-100 space-y-2">
              <h4 className="font-bold text-teal-900 text-sm flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-teal-700" />
                <span>Rumus Penting Morfologi:</span>
              </h4>
              <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1">
                <li><strong>K, P, S, T luluh:</strong> kutip → mengutip, potong → memotong, sapu → menyapu, tulis → menulis.</li>
                <li><strong>Satu Suku Kata:</strong> perkataan seperti cat, pam, pos menerima alomorf <strong>menge-</strong> (mengecat, mengepam).</li>
                <li><strong>Fungsi berbeza:</strong> belajar (murid menuntut ilmu) berbeza daripada mengajar (guru menyampaikan ilmu).</li>
              </ul>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={onClose}
                className="bg-slate-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl"
              >
                Faham & Tutup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
