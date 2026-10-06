import React, { useState } from 'react';
import { Search, Filter, FlaskConical, ArrowRight, BookOpen } from 'lucide-react';
import { MORFOLOGI_DATABASE } from '../../data/morphologyData';
import { MorfemDetail } from '../../types';
import { soundManager } from '../../utils/audio';

interface CollectionProps {
  onSelectWord: (kataDasar: string) => void;
}

export const ExperimentCollection: React.FC<CollectionProps> = ({ onSelectWord }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTahap, setSelectedTahap] = useState<string>('Semua');
  const [selectedJenis, setSelectedJenis] = useState<string>('Semua');

  const filteredList = MORFOLOGI_DATABASE.filter((item) => {
    const matchesSearch =
      item.kataDasar.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.perkataanTerhasil.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.imbuhan.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTahap = selectedTahap === 'Semua' || item.tahapKesukaran === selectedTahap;
    const matchesJenis = selectedJenis === 'Semua' || item.jenisImbuhan === selectedJenis;

    return matchesSearch && matchesTahap && matchesJenis;
  });

  const handleLaunch = (kata: string) => {
    soundManager.playClick();
    onSelectWord(kata);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-teal-700 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>Koleksi Eksperimen & Bank Morfem</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading mt-0.5">
            Eksplorasi Kata & Imbuhan Bahasa Melayu
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Terokai pangkalan data morfologi sekolah rendah mengikut tahap tahun dan jenis imbuhan.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari kata dasar atau imbuhan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-teal-600 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Filter Tabs (Interactive filter controls with buttons) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
        {/* Tahap filter */}
        <div className="flex items-center gap-1 text-xs">
          <span className="text-slate-400 font-semibold mr-1">Tahap:</span>
          {['Semua', 'Tahun 3', 'Tahun 4', 'Tahun 5'].map((tahap) => (
            <button
              key={tahap}
              onClick={() => {
                soundManager.playClick();
                setSelectedTahap(tahap);
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                selectedTahap === tahap
                  ? 'bg-teal-700 text-white shadow-2xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {tahap}
            </button>
          ))}
        </div>

        {/* Jenis Imbuhan filter */}
        <div className="flex items-center gap-1 text-xs">
          <span className="text-slate-400 font-semibold mr-1">Jenis:</span>
          {['Semua', 'awalan', 'apitan'].map((jenis) => (
            <button
              key={jenis}
              onClick={() => {
                soundManager.playClick();
                setSelectedJenis(jenis);
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold capitalize transition-colors ${
                selectedJenis === jenis
                  ? 'bg-teal-700 text-white shadow-2xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {jenis}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Word Cards */}
      {filteredList.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
          Tiada perkataan yang sepadan dengan carian "{searchTerm}". Sila cuba kata kunci lain.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredList.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 hover:border-teal-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Clean unboxed metadata with separators */}
                <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2">
                  <span className="font-semibold text-teal-800">{item.tahapKesukaran}</span>
                  <span aria-hidden="true">·</span>
                  <span className="capitalize">{item.jenisImbuhan}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.kemahiran}</span>
                </div>

                <div className="flex items-baseline justify-between">
                  <h3 className="text-xl font-extrabold text-slate-900 font-heading uppercase">
                    {item.kataDasar}
                  </h3>
                  <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                    +{item.imbuhan}
                  </span>
                </div>

                <div className="mt-2 text-sm font-bold text-emerald-800 font-mono">
                  → {item.perkataanTerhasil.toUpperCase()}
                </div>

                <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {item.maksudPerkataan}
                </p>

                <div className="mt-3 p-2.5 bg-slate-50 rounded-xl text-[11px] text-slate-600 italic">
                  "{item.contohAyat}"
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">
                  {item.perubahanBentuk}
                </span>

                <button
                  onClick={() => handleLaunch(item.kataDasar)}
                  className="inline-flex items-center gap-1.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-2xs transition-colors shrink-0"
                >
                  <FlaskConical className="w-3.5 h-3.5" />
                  <span>Uji Makmal</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
