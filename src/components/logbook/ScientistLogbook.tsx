import React, { useState } from 'react';
import {
  ClipboardList,
  Search,
  Filter,
  Eye,
  RotateCcw,
  Sparkles,
  BookOpen,
  Calendar,
  Award,
  CheckCircle2,
  X
} from 'lucide-react';
import { LogEksperimen, MuridProfile } from '../../types';
import { soundManager } from '../../utils/audio';

interface LogbookProps {
  profile: MuridProfile;
  onRerunExperiment: (kataDasar: string) => void;
}

export const ScientistLogbook: React.FC<LogbookProps> = ({ profile, onRerunExperiment }) => {
  const [filterImbuhan, setFilterImbuhan] = useState<string>('Semua');
  const [filterStatus, setFilterStatus] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeLogDetail, setActiveLogDetail] = useState<LogEksperimen | null>(null);

  const logs = profile.logbook;

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.kataDasar.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.hasilEksperimen.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.imbuhan.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesImbuhan =
      filterImbuhan === 'Semua' ||
      (filterImbuhan === 'meN-' && log.imbuhan.startsWith('meN-')) ||
      (filterImbuhan === 'peN-' && log.imbuhan.startsWith('peN-')) ||
      (filterImbuhan === 'ber-' && log.imbuhan.startsWith('ber-')) ||
      (filterImbuhan === 'ter-' && log.imbuhan.startsWith('ter-')) ||
      (filterImbuhan === 'apitan' && log.imbuhan.includes('...'));

    const matchesStatus = filterStatus === 'Semua' || log.statusPenguasaan === filterStatus;

    return matchesSearch && matchesImbuhan && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-teal-700 uppercase tracking-wider flex items-center gap-1.5">
            <ClipboardList className="w-4 h-4" />
            <span>Dokumentasi Rasmi Makmal</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading mt-0.5">
            Buku Log Saintis Bahasa
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Rekod penemuan eksperimen, ramalan asal, hasil sintesis dan ayat yang telah dibina.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari dalam rekod..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-teal-600 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
        {/* Imbuhan Filter */}
        <div className="flex items-center gap-1 text-xs">
          <span className="text-slate-400 font-semibold mr-1">Imbuhan:</span>
          {['Semua', 'meN-', 'peN-', 'ber-', 'ter-', 'apitan'].map((imb) => (
            <button
              key={imb}
              onClick={() => {
                soundManager.playClick();
                setFilterImbuhan(imb);
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                filterImbuhan === imb
                  ? 'bg-teal-700 text-white shadow-2xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {imb}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1 text-xs">
          <span className="text-slate-400 font-semibold mr-1">Status:</span>
          {['Semua', 'Dikuasai', 'Sedang Belajar'].map((st) => (
            <button
              key={st}
              onClick={() => {
                soundManager.playClick();
                setFilterStatus(st);
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                filterStatus === st
                  ? 'bg-teal-700 text-white shadow-2xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table / List of Log Entries */}
      {filteredLogs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 text-slate-500 text-sm">
          Tiada rekod eksperimen yang sepadan dengan penapis.
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Tarikh</th>
                  <th className="py-3.5 px-4">Spesimen Kata Dasar</th>
                  <th className="py-3.5 px-4">Imbuhan</th>
                  <th className="py-3.5 px-4">Hasil Terbentuk</th>
                  <th className="py-3.5 px-4">Status Penguasaan</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLogs.map((entry) => (
                  <tr key={entry.id} className="hover:bg-teal-50/40 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 text-slate-500 whitespace-nowrap">
                      {entry.tarikh}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 uppercase font-mono">
                      {entry.kataDasar}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-teal-800">
                      {entry.imbuhan}
                    </td>
                    <td className="py-3.5 px-4 font-extrabold text-emerald-800 uppercase font-mono">
                      {entry.hasilEksperimen}
                    </td>
                    <td className="py-3.5 px-4">
                      {/* Zero-pill: clean text with indicator */}
                      <span className="font-semibold text-xs flex items-center gap-1 text-slate-700">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            entry.statusPenguasaan === 'Dikuasai' ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                        />
                        <span>{entry.statusPenguasaan}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            soundManager.playClick();
                            setActiveLogDetail(entry);
                          }}
                          className="px-2.5 py-1 text-xs font-semibold text-teal-700 hover:text-teal-900 hover:bg-teal-50 rounded-lg transition-colors flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Perincian</span>
                        </button>
                        <button
                          onClick={() => {
                            soundManager.playClick();
                            onRerunExperiment(entry.kataDasar);
                          }}
                          className="px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1"
                          title="Jalankan semula eksperimen ini"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Ulang Kaji</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Log Detail Modal / Inspector */}
      {activeLogDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-teal-100 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-teal-700" />
                <h3 className="font-extrabold text-slate-900 font-heading text-lg">
                  Laporan Eksperimen #{activeLogDetail.id.slice(-4)}
                </h3>
              </div>
              <button
                onClick={() => setActiveLogDetail(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block font-semibold">Tarikh Diselesaikan:</span>
                <span className="font-bold text-slate-800">{activeLogDetail.tarikh}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block font-semibold">Bilangan Percubaan:</span>
                <span className="font-bold text-slate-800">{activeLogDetail.percubaan} kali</span>
              </div>
            </div>

            <div className="p-4 bg-teal-50/60 rounded-2xl border border-teal-100 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-semibold">Rumusan Sintesis:</span>
                <span className="font-extrabold font-mono text-emerald-800 text-sm uppercase">
                  {activeLogDetail.hasilEksperimen}
                </span>
              </div>
              <div className="text-slate-700 leading-relaxed pt-1 border-t border-teal-100">
                <strong>Catatan Saintis:</strong> {activeLogDetail.catatanSaintis || 'Perubahan morfofonemik disahkan tepat.'}
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <span className="font-bold text-slate-700 uppercase tracking-wider block">
                Ayat Yang Dibina Murid:
              </span>
              <p className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 italic leading-relaxed">
                "{activeLogDetail.ayatMurid}"
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  onRerunExperiment(activeLogDetail.kataDasar);
                  setActiveLogDetail(null);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 hover:text-teal-950"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ulang Kaji Eksperimen Ini di Makmal</span>
              </button>

              <button
                onClick={() => setActiveLogDetail(null)}
                className="bg-slate-900 text-white font-bold text-xs px-4 py-2 rounded-xl"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
