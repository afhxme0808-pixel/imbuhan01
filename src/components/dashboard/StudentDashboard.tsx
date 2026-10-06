import React from 'react';
import {
  FlaskConical,
  Search,
  CheckCircle2,
  ClipboardList,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  BookOpen
} from 'lucide-react';
import { MuridProfile } from '../../types';
import { ProfessorMascot } from '../ui/ProfessorMascot';
import { soundManager } from '../../utils/audio';

interface DashboardProps {
  profile: MuridProfile;
  onNavigate: (tab: string, extra?: { kataDasar?: string }) => void;
}

export const StudentDashboard: React.FC<DashboardProps> = ({ profile, onNavigate }) => {
  const handleStartExperiment = (kata?: string) => {
    soundManager.playClick();
    onNavigate('makmal', kata ? { kataDasar: kata } : undefined);
  };

  const completedCount = new Set(profile.eksperimenSelesai).size;
  const badgesEarned = profile.lencanaList.filter((l) => l.diperoleh).length;
  const recentLogs = profile.logbook.slice(0, 3);

  return (
    <div className="space-y-6 md:space-y-8 max-w-6xl mx-auto">
      {/* Hero Welcome Card with Professor Imbuhan */}
      <div className="relative overflow-hidden bg-gradient-to-r from-teal-800 via-teal-700 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-md border border-teal-600/30">
        {/* Subtle decorative circles */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-teal-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-emerald-500/20 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-900/60 border border-teal-500/40 text-xs font-semibold text-teal-200">
              <Sparkles className="w-3.5 h-3.5 text-teal-300" />
              <span>Makmal Saintis Bahasa Malaysia</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading tracking-tight text-white leading-tight">
              Selamat Datang ke Makmal Bahasa, {profile.nama}!
            </h1>
            <p className="text-sm sm:text-base text-teal-100/90 max-w-xl font-normal leading-relaxed">
              Jom jalankan eksperimen digital dan temui rahsia pembentukan perkataan berimbuhan secara saintifik.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={() => handleStartExperiment('sapu')}
                className="inline-flex items-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-teal-950 font-bold px-5 py-2.5 rounded-xl shadow-sm transition-all transform active:scale-95 text-sm"
              >
                <FlaskConical className="w-4 h-4 text-teal-950" />
                <span>Mulakan Eksperimen</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
              <button
                onClick={() => onNavigate('koleksi')}
                className="inline-flex items-center gap-2 bg-teal-800/80 hover:bg-teal-700/80 text-white font-semibold px-4 py-2.5 rounded-xl border border-teal-500/30 text-sm transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>Sambung Pembelajaran</span>
              </button>
            </div>
          </div>

          {/* Professor Imbuhan Dialog Box */}
          <div className="w-full md:w-auto shrink-0 flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-2xl max-w-xs text-white">
              <ProfessorMascot
                mood="teruja"
                size="md"
                speech="Hai, saintis muda! Hari ini kita akan mengkaji bagaimana kata dasar berubah apabila menerima imbuhan. Bersedia untuk bereksperimen?"
                className="text-slate-900"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scientist Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tahap Saintis</div>
          <div className="mt-1 text-lg sm:text-xl font-extrabold text-teal-900 font-heading">
            {profile.tahapSaintis}
          </div>
          <div className="mt-1 text-xs text-slate-500">Tahap {profile.level}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Mata Pengalaman</div>
          <div className="mt-1 text-lg sm:text-xl font-extrabold text-emerald-700 font-heading tabular-nums">
            {profile.xp} <span className="text-xs font-semibold text-slate-500">XP</span>
          </div>
          <div className="mt-1 text-xs text-slate-500">Seterusnya: {profile.xpNextLevel} XP</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Eksperimen Selesai</div>
          <div className="mt-1 text-lg sm:text-xl font-extrabold text-teal-800 font-heading tabular-nums">
            {completedCount} <span className="text-xs font-semibold text-slate-500">Kata</span>
          </div>
          <div className="mt-1 text-xs text-slate-500">Daripada 14 perkataan utama</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Lencana Saintis</div>
          <div className="mt-1 text-lg sm:text-xl font-extrabold text-amber-600 font-heading tabular-nums">
            {badgesEarned} / {profile.lencanaList.length}
          </div>
          <div className="mt-1 text-xs text-slate-500">Terbuka untuk diterokai</div>
        </div>
      </div>

      {/* Featured Experiment Banner: "Rahsia Kata SAPU" */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border border-teal-200/80 rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1.5 flex-1">
          <div className="text-xs font-bold text-teal-800 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
            Eksperimen Pilihan Minggu Ini
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
            Rahsia Kata SAPU
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
            Terokai perubahan ajaib kata dasar apabila menerima awalan meN-. Mengapakah huruf <span className="font-bold text-teal-800 font-mono">s</span> bertukar menjadi <span className="font-bold text-teal-800 font-mono">ny</span> membentuk <span className="font-bold text-teal-900 font-mono">MENYAPU</span>?
          </p>
        </div>
        <button
          onClick={() => handleStartExperiment('sapu')}
          className="shrink-0 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-2"
        >
          <span>Uji Eksperimen Ini</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 4 Main Activity Cards Grid */}
      <div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading mb-3 flex items-center justify-between">
          <span>Stesen Pembelajaran Bahasa</span>
          <span className="text-xs font-semibold text-teal-700">Pilih modul untuk mula</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Makmal Eksperimen */}
          <div
            onClick={() => {
              soundManager.playClick();
              onNavigate('makmal');
            }}
            className="group bg-white p-5 rounded-2xl border border-slate-200/90 hover:border-teal-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-teal-50 group-hover:bg-teal-600 text-teal-700 group-hover:text-white flex items-center justify-center transition-colors mb-3">
                <FlaskConical className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                Makmal Eksperimen
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Campurkan kata dasar dan imbuhan di dalam kelalang makmal digital untuk memerhati perubahan bentuk kata.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700">
              <span>6 Peringkat Makmal</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Detektif Kesalahan */}
          <div
            onClick={() => {
              soundManager.playClick();
              onNavigate('detektif');
            }}
            className="group bg-white p-5 rounded-2xl border border-slate-200/90 hover:border-teal-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-cyan-50 group-hover:bg-cyan-600 text-cyan-700 group-hover:text-white flex items-center justify-center transition-colors mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 group-hover:text-cyan-800 transition-colors">
                Detektif Kesalahan
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Jadilah penyiasat bahasa! Kenal pasti perkataan berimbuhan yang salah dieja dan pilih pembetulan tatabahasa.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-cyan-700">
              <span>8 Kes Penyiasatan</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Cabaran Konteks */}
          <div
            onClick={() => {
              soundManager.playClick();
              onNavigate('konteks');
            }}
            className="group bg-white p-5 rounded-2xl border border-slate-200/90 hover:border-teal-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 group-hover:bg-emerald-600 text-emerald-700 group-hover:text-white flex items-center justify-center transition-colors mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                Cabaran Konteks
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Pilih perkataan berimbuhan yang tepat mengikut fungsi situasi dan makna ayat Bahasa Melayu sekolah rendah.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>Kuiz Bertema</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Buku Log Saintis */}
          <div
            onClick={() => {
              soundManager.playClick();
              onNavigate('buku-log');
            }}
            className="group bg-white p-5 rounded-2xl border border-slate-200/90 hover:border-teal-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-amber-50 group-hover:bg-amber-600 text-amber-700 group-hover:text-white flex items-center justify-center transition-colors mb-3">
                <ClipboardList className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                Buku Log Saintis
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Semak semula laporan eksperimen yang telah anda lakukan, ramalan asal, hasil penemuan dan ayat yang dibina.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700">
              <span>{profile.logbook.length} Laporan Tersimpan</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Next Step Recommendation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recent logs */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-slate-900 text-sm font-heading flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-teal-700" />
              <span>Aktiviti Makmal Terkini</span>
            </h4>
            <button
              onClick={() => onNavigate('buku-log')}
              className="text-xs font-semibold text-teal-700 hover:text-teal-900"
            >
              Lihat Semua
            </button>
          </div>
          {recentLogs.length === 0 ? (
            <div className="py-6 text-center text-xs text-slate-500">
              Belum ada eksperimen dijalankan. Mulakan eksperimen pertama sekarang!
            </div>
          ) : (
            <div className="space-y-2.5">
              {recentLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="font-bold text-slate-900">
                      {log.kataDasar.toUpperCase()} + {log.imbuhan} → <span className="text-teal-700">{log.hasilEksperimen.toUpperCase()}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {log.tarikh} · {log.percubaan === 1 ? 'Tepat kali pertama' : `${log.percubaan} percubaan`}
                    </div>
                  </div>
                  <span className="shrink-0 px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md font-bold text-[10px]">
                    {log.statusPenguasaan}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pedagogical Guidance & Next Recommendation */}
        <div className="bg-gradient-to-br from-teal-50 to-white p-5 rounded-2xl border border-teal-200/80 shadow-2xs">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-teal-700" />
            <h4 className="font-bold text-slate-900 text-sm font-heading">
              Cadangan Latihan Seterusnya
            </h4>
          </div>

          <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
            <p>
              Berdasarkan analisis tatabahasa, anda disarankan meneroka hukum kata <span className="font-bold text-teal-900">satu suku kata</span> (contohnya <span className="font-bold font-mono">CAT → MENGECAT</span>) atau perkataan berawalan <span className="font-bold font-mono">peN-</span> untuk membezakan fungsi kata kerja dan kata nama alat.
            </p>
            <div className="pt-1 flex flex-wrap gap-2">
              <button
                onClick={() => handleStartExperiment('cat')}
                className="px-3 py-1.5 bg-white border border-teal-300 hover:border-teal-500 rounded-lg text-teal-800 font-bold transition-colors shadow-2xs"
              >
                Uji Kata: CAT
              </button>
              <button
                onClick={() => handleStartExperiment('tulis')}
                className="px-3 py-1.5 bg-white border border-teal-300 hover:border-teal-500 rounded-lg text-teal-800 font-bold transition-colors shadow-2xs"
              >
                Uji Kata: TULIS
              </button>
              <button
                onClick={() => handleStartExperiment('bersih')}
                className="px-3 py-1.5 bg-white border border-teal-300 hover:border-teal-500 rounded-lg text-teal-800 font-bold transition-colors shadow-2xs"
              >
                Uji Kata: BERSIH
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
