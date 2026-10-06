import React, { useState } from 'react';
import {
  GraduationCap,
  Download,
  Printer,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Users,
  CheckCircle2,
  X
} from 'lucide-react';
import { CONTOH_MURID_GURU } from '../../data/teacherDemoData';
import { GuruRekodMurid, MuridProfile } from '../../types';
import { soundManager } from '../../utils/audio';

interface GameTeacherProps {
  currentProfile: MuridProfile;
  onBackToMap: () => void;
}

export const GameTeacherStage: React.FC<GameTeacherProps> = ({
  currentProfile,
  onBackToMap
}) => {
  const [page, setPage] = useState<number>(0);
  const [selectedStudent, setSelectedStudent] = useState<GuruRekodMurid | null>(null);

  const currentSessionStudent: GuruRekodMurid = {
    id: 'current-session-student',
    nama: `${currentProfile.nama} (Sesi Ini)`,
    tahapTahun: 'Tahun 4 Cemerlang',
    jumlahEksperimen: Math.max(1, currentProfile.logbook.length),
    ketepatan: currentProfile.xp > 50 ? 88 : 78,
    kataDasarPenguasaan: 90,
    imbuhanPenguasaan: 85,
    pembentukanKataPenguasaan: 84,
    ayatPenguasaan: 82,
    ralatLazim: 'Perlu pengukuhan berterusan pada hukum luluh awalan meN-.',
    cadanganIntervensi: 'Teruskan latihan dalam modul Detektif Kesalahan dan Pembinaan Ayat.'
  };

  const allStudents = [currentSessionStudent, ...CONTOH_MURID_GURU];
  const perPage = 4;
  const totalPages = Math.ceil(allStudents.length / perPage);
  const visibleStudents = allStudents.slice(page * perPage, (page + 1) * perPage);

  const handleExportCSV = () => {
    soundManager.playClick();
    const headers = [
      'ID Murid',
      'Nama Murid',
      'Kelas',
      'Jumlah Eksperimen',
      'Purata Ketepatan (%)',
      'Ralat Lazim',
      'Cadangan Intervensi'
    ];

    const rows = allStudents.map((s) => [
      `"${s.id}"`,
      `"${s.nama}"`,
      `"${s.tahapTahun}"`,
      s.jumlahEksperimen,
      s.ketepatan,
      `"${s.ralatLazim.replace(/"/g, '""')}"`,
      `"${s.cadanganIntervensi.replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Laporan_Analisis_Murid_ImbuhMaker_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  return (
    <div className="h-full flex flex-col justify-between overflow-hidden p-2 sm:p-4 max-w-6xl mx-auto space-y-2">
      {/* Top Bar: Teacher Command Deck Header */}
      <div className="bg-[#102B3D] rounded-2xl p-2.5 border border-teal-500/40 shadow-sm flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-teal-500/20 border border-teal-400 text-teal-300 flex items-center justify-center font-black">
            📊
          </div>
          <div>
            <div className="text-[10px] uppercase font-black tracking-wider text-teal-300">
              Menara Kawalan Pendidik (IPG / SK)
            </div>
            <h2 className="text-xs sm:text-sm font-black font-game text-white truncate">
              Analisis Pencapaian Murid Kelas 4 Cemerlang
            </h2>
          </div>
        </div>

        {/* CSV & Print Actions */}
        <div className="flex items-center gap-2 print-hide">
          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 rounded-xl bg-[#18394F] hover:bg-[#204963] text-teal-200 border border-teal-500/40 text-xs font-bold flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Eksport CSV</span>
          </button>
          <button
            onClick={handlePrint}
            className="btn-chunky-teal px-3 py-1.5 rounded-xl text-white text-xs font-black flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cetak</span>
          </button>
        </div>
      </div>

      {/* Main Command Stage (Fits 100% in viewport) */}
      <div className="bg-[#102A3C] rounded-3xl border-2 border-teal-500/40 p-4 sm:p-5 flex flex-col justify-between shadow-xl flex-1 overflow-hidden min-h-0">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 shrink-0">
          <div className="bg-[#183B52] p-2.5 rounded-xl border border-teal-500/30">
            <span className="text-[10px] text-teal-300 uppercase font-bold block">Murid Aktif</span>
            <span className="text-lg font-black text-white font-mono tabular-nums">{allStudents.length} orang</span>
          </div>
          <div className="bg-[#183B52] p-2.5 rounded-xl border border-teal-500/30">
            <span className="text-[10px] text-teal-300 uppercase font-bold block">Purata Ketepatan</span>
            <span className="text-lg font-black text-emerald-300 font-mono tabular-nums">84.2%</span>
          </div>
          <div className="bg-[#183B52] p-2.5 rounded-xl border border-teal-500/30">
            <span className="text-[10px] text-teal-300 uppercase font-bold block">Eksperimen Selesai</span>
            <span className="text-lg font-black text-cyan-300 font-mono tabular-nums">98 rekod</span>
          </div>
          <div className="bg-[#183B52] p-2.5 rounded-xl border border-teal-500/30">
            <span className="text-[10px] text-teal-300 uppercase font-bold block">Fokus Intervensi</span>
            <span className="text-xs font-black text-amber-300 truncate block mt-1">Luluh Huruf S (38%)</span>
          </div>
        </div>

        {/* Student Cards Carousel / Grid (4 visible at a time) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-auto">
          {visibleStudents.map((s) => (
            <div
              key={s.id}
              onClick={() => setSelectedStudent(s)}
              className="p-3 bg-[#183B52] hover:bg-[#204963] border-2 border-teal-500/30 hover:border-teal-400 rounded-2xl cursor-pointer transition-all flex items-center justify-between gap-3 shadow-md"
            >
              <div className="min-w-0">
                <div className="font-black text-white text-xs sm:text-sm font-game truncate">
                  {s.nama}
                </div>
                <div className="text-[10px] text-slate-300">
                  {s.tahapTahun} · {s.jumlahEksperimen} Eksperimen
                </div>
                <div className="text-[10px] text-amber-300 truncate mt-0.5">
                  Ralat: {s.ralatLazim}
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-base sm:text-lg font-black font-mono text-emerald-300 tabular-nums block">
                  {s.ketepatan}%
                </span>
                <span className="text-[9px] font-bold text-teal-200 bg-teal-900/60 px-2 py-0.5 rounded-full">
                  Diagnosis →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-teal-500/20 text-xs">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="px-3 py-1 rounded-lg bg-[#18394F] text-white font-bold disabled:opacity-40 flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelum</span>
          </button>
          <span className="text-slate-400 font-bold">
            Halaman {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="px-3 py-1 rounded-lg bg-[#18394F] text-white font-bold disabled:opacity-40 flex items-center gap-1"
          >
            <span>Seterusnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex items-center justify-between pt-1 shrink-0">
        <button
          onClick={onBackToMap}
          className="text-xs font-bold text-teal-300 hover:text-white flex items-center gap-1"
        >
          ← Kembali ke Peta Misi
        </button>
        <span className="text-[11px] text-slate-400 font-bold">
          [Mod Demonstrasi Guru IPG]
        </span>
      </div>

      {/* Student Diagnosis Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#102B3D] border-2 border-teal-400 rounded-3xl max-w-md w-full p-5 text-white space-y-3 shadow-2xl">
            <div className="flex items-center justify-between border-b border-teal-500/30 pb-2">
              <div>
                <h3 className="font-game font-black text-base text-emerald-300">
                  {selectedStudent.nama}
                </h3>
                <span className="text-[11px] text-slate-400">{selectedStudent.tahapTahun}</span>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="text-xs space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-[#183B52] rounded-xl text-center">
                  <span className="text-[10px] text-slate-400 block font-bold">Ketepatan:</span>
                  <span className="text-base font-black text-emerald-300 font-mono">{selectedStudent.ketepatan}%</span>
                </div>
                <div className="p-2 bg-[#183B52] rounded-xl text-center">
                  <span className="text-[10px] text-slate-400 block font-bold">Eksperimen:</span>
                  <span className="text-base font-black text-cyan-300 font-mono">{selectedStudent.jumlahEksperimen}</span>
                </div>
              </div>
              <div className="p-2.5 bg-amber-500/20 border border-amber-400/50 rounded-xl">
                <span className="text-[10px] font-bold text-amber-300 uppercase block">Ralat Lazim Dikesan:</span>
                <p className="text-slate-200 mt-0.5 leading-snug">{selectedStudent.ralatLazim}</p>
              </div>
              <div className="p-2.5 bg-teal-500/20 border border-teal-400/50 rounded-xl">
                <span className="text-[10px] font-bold text-teal-300 uppercase block">Cadangan Intervensi:</span>
                <p className="text-slate-200 mt-0.5 leading-snug">{selectedStudent.cadanganIntervensi}</p>
              </div>
            </div>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedStudent(null)}
                className="btn-chunky-teal px-4 py-1.5 rounded-xl text-white font-black text-xs"
              >
                Tutup Diagnosis
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
