import React from 'react';
import {
  FlaskConical,
  Search,
  CheckCircle2,
  PenTool,
  Award,
  GraduationCap,
  Play,
  Sparkles,
  Star,
  Zap,
  ArrowRight
} from 'lucide-react';
import { MuridProfile } from '../../types';
import { ProfessorMascot } from '../ui/ProfessorMascot';
import { soundManager } from '../../utils/audio';

interface GameWorldMapProps {
  profile: MuridProfile;
  onSelectZone: (zoneId: string, extra?: { kataDasar?: string }) => void;
}

export const GameWorldMap: React.FC<GameWorldMapProps> = ({ profile, onSelectZone }) => {
  const completedExperimentsCount = new Set(profile.eksperimenSelesai).size;
  const badgesEarned = profile.lencanaList.filter((l) => l.diperoleh).length;

  const zones = [
    {
      id: 'makmal',
      title: 'Zon 1: Makmal Sintesis',
      desc: 'Campur kata dasar & reagen imbuhan dalam kelalang digital!',
      icon: FlaskConical,
      color: 'from-emerald-500 to-teal-700',
      badgeColor: 'bg-emerald-400 text-teal-950',
      statusText: `${completedExperimentsCount}/14 Selesai`,
      stars: '⭐⭐⭐'
    },
    {
      id: 'detektif',
      title: 'Zon 2: Detektif Kesalahan',
      desc: 'Siasat ayat & kesan ejaan pengimbuhan yang salah!',
      icon: Search,
      color: 'from-cyan-500 to-blue-700',
      badgeColor: 'bg-cyan-400 text-cyan-950',
      statusText: '8 Misi Siasatan',
      stars: '⭐⭐'
    },
    {
      id: 'konteks',
      title: 'Zon 3: Cabaran Arena',
      desc: 'Pilih imbuhan paling tepat mengikut situasi ayat!',
      icon: CheckCircle2,
      color: 'from-amber-500 to-orange-700',
      badgeColor: 'bg-amber-400 text-amber-950',
      statusText: 'Arena Berperingkat',
      stars: '⭐⭐⭐'
    },
    {
      id: 'bina-ayat',
      title: 'Zon 4: Kuil Pembina Ayat',
      desc: 'Susun formula frasa gramatis: Subjek + Predikat + Objek!',
      icon: PenTool,
      color: 'from-purple-500 to-indigo-700',
      badgeColor: 'bg-purple-400 text-purple-950',
      statusText: 'Pola Sintaksis',
      stars: '⭐⭐'
    },
    {
      id: 'trofi',
      title: 'Zon 5: Bilik Trofi & Log',
      desc: 'Pameran lencana saintis & rekod arkib eksperimen anda.',
      icon: Award,
      color: 'from-yellow-500 to-amber-700',
      badgeColor: 'bg-yellow-400 text-yellow-950',
      statusText: `${badgesEarned}/${profile.lencanaList.length} Lencana`,
      stars: '🏆'
    },
    {
      id: 'guru',
      title: 'Zon 6: Menara Guru',
      desc: 'Papan kawalan pendidik, diagnosis murid & eksport laporan.',
      icon: GraduationCap,
      color: 'from-teal-600 to-slate-800',
      badgeColor: 'bg-teal-300 text-teal-950',
      statusText: 'Mod Demonstrasi IPG',
      stars: '📊'
    }
  ];

  return (
    <div className="h-full flex flex-col justify-between overflow-hidden p-2 sm:p-4 max-w-7xl mx-auto space-y-2">
      {/* Top Banner: Adventure Greeting */}
      <div className="bg-gradient-to-r from-teal-900/90 via-[#103347] to-teal-950/90 rounded-2xl p-2.5 sm:p-3 border border-teal-500/40 shadow-md flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300 font-black text-lg">
            🗺️
          </div>
          <div>
            <div className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Peta Misi Makmal Bahasa
            </div>
            <h1 className="text-base sm:text-xl font-black font-game text-white leading-tight">
              Pilih Zon Eksperimen, {profile.nama}!
            </h1>
          </div>
        </div>

        {/* Quick Start Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onSelectZone('makmal', { kataDasar: 'sapu' });
          }}
          className="btn-chunky-amber px-4 py-2 rounded-xl text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-md uppercase tracking-wider"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Mula Pantas</span>
        </button>
      </div>

      {/* Center Grid of 6 Zone Cards - Perfectly fits viewport without vertical scroll */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3.5 flex-1 items-stretch py-1">
        {zones.map((z, idx) => {
          const Icon = z.icon;
          return (
            <button
              key={z.id}
              onClick={() => {
                soundManager.playClick();
                onSelectZone(z.id);
              }}
              className="group relative flex flex-col justify-between p-3 sm:p-4 rounded-2xl bg-[#132E40]/90 hover:bg-[#1A3D54] border-2 border-teal-500/30 hover:border-teal-400/80 shadow-[0_5px_0_#0a1a24] hover:shadow-[0_2px_0_#0a1a24] hover:translate-y-1 transition-all text-left overflow-hidden active:translate-y-1.5"
            >
              {/* Top Row of Zone Card */}
              <div className="flex items-start justify-between w-full gap-2">
                <div
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br ${z.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform shrink-0`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-[10px] sm:text-xs font-black tracking-wide text-amber-300">
                  {z.stars}
                </span>
              </div>

              {/* Title & Description */}
              <div className="my-1.5">
                <h3 className="text-xs sm:text-sm md:text-base font-black font-game text-white group-hover:text-emerald-300 transition-colors leading-snug">
                  {z.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-300/90 line-clamp-2 mt-0.5 leading-snug">
                  {z.desc}
                </p>
              </div>

              {/* Bottom Badge & Action Arrow */}
              <div className="pt-1.5 border-t border-teal-500/20 flex items-center justify-between w-full">
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${z.badgeColor}`}>
                  {z.statusText}
                </span>
                <span className="text-[11px] font-black text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Masuk</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom Bar: Professor Imbuhan Cheering Box */}
      <div className="bg-[#0E2433] rounded-2xl p-2 sm:p-3 border border-teal-500/40 shadow-sm flex items-center gap-3 shrink-0">
        <div className="shrink-0">
          <ProfessorMascot mood="gembira" size="sm" />
        </div>
        <div className="flex-1 min-w-0 text-xs sm:text-sm text-teal-100">
          <strong className="text-emerald-400 font-game block text-xs">
            Profesor Imbuhan berkata:
          </strong>
          <p className="truncate sm:whitespace-normal text-slate-300 text-xs leading-snug">
            "Selamat kembali ke makmal, saintis cilik! Pilih zon di atas untuk memulakan sintesis kata atau menyiasat ralat tatabahasa!"
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <button
            onClick={() => onSelectZone('makmal', { kataDasar: 'cat' })}
            className="px-2.5 py-1 rounded-lg bg-teal-800/80 hover:bg-teal-700 text-white text-[11px] font-bold border border-teal-500/30"
          >
            Uji: CAT
          </button>
          <button
            onClick={() => onSelectZone('makmal', { kataDasar: 'tulis' })}
            className="px-2.5 py-1 rounded-lg bg-teal-800/80 hover:bg-teal-700 text-white text-[11px] font-bold border border-teal-500/30"
          >
            Uji: TULIS
          </button>
        </div>
      </div>
    </div>
  );
};
