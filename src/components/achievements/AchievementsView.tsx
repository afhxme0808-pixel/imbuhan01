import React from 'react';
import {
  Award,
  Sparkles,
  CheckCircle2,
  Lock,
  FlaskConical,
  BookOpen,
  Compass,
  Layers,
  Search,
  PenTool,
  Star
} from 'lucide-react';
import { MuridProfile, Lencana } from '../../types';
import { TAHAP_SAINTIS_LIST } from '../../data/achievementsData';

interface AchievementsProps {
  profile: MuridProfile;
}

export const AchievementsView: React.FC<AchievementsProps> = ({ profile }) => {
  const getBadgeIcon = (iconName: string, unlocked: boolean) => {
    const iconClass = `w-6 h-6 ${unlocked ? 'text-amber-600' : 'text-slate-400'}`;
    switch (iconName) {
      case 'flask':
        return <FlaskConical className={iconClass} />;
      case 'book-open':
        return <BookOpen className={iconClass} />;
      case 'compass':
        return <Compass className={iconClass} />;
      case 'layers':
        return <Layers className={iconClass} />;
      case 'search':
        return <Search className={iconClass} />;
      case 'pen-tool':
        return <PenTool className={iconClass} />;
      default:
        return <Award className={iconClass} />;
    }
  };

  const unlockedCount = profile.lencanaList.filter((l) => l.diperoleh).length;
  const currentLevelInfo = TAHAP_SAINTIS_LIST.find((t) => t.tahapNombor === profile.level) || TAHAP_SAINTIS_LIST[0];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
        <div className="text-xs font-bold text-teal-700 uppercase tracking-wider flex items-center gap-1.5">
          <Award className="w-4 h-4" />
          <span>Pengiktirafan Akademik</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading mt-0.5">
          Pencapaian & Tahap Saintis Bahasa
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Kumpul mata pengalaman (XP) melalui aktiviti makmal yang sahih untuk meningkatkan tahap kepakaran anda.
        </p>
      </div>

      {/* Hero Rank Progress Card */}
      <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">
              Tahap Semasa Anda:
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              {profile.tahapSaintis}
            </div>
            <p className="text-xs text-teal-100 max-w-md leading-relaxed">
              {currentLevelInfo.penerangan}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/20 text-center shrink-0">
            <span className="text-xs font-semibold text-teal-200 block uppercase">Jumlah Pengalaman</span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-300 mt-0.5 tabular-nums">
              {profile.xp} <span className="text-xs font-normal text-teal-200">XP</span>
            </div>
          </div>
        </div>

        {/* Progress Bar to next level */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-teal-200">
            <span>Kemajuan ke tahap seterusnya</span>
            <span className="font-bold tabular-nums">
              {profile.xp} / {profile.xpNextLevel} XP
            </span>
          </div>
          <div className="w-full bg-teal-950/60 h-2.5 rounded-full overflow-hidden p-0.5">
            <div
              className="bg-emerald-400 h-full rounded-full transition-all duration-500 shadow-2xs"
              style={{ width: `${Math.min(100, (profile.xp / profile.xpNextLevel) * 100)}%` }}
            />
          </div>
        </div>

        {/* Scientist Progression Ladder */}
        <div className="pt-3 border-t border-teal-600/60 grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
          {TAHAP_SAINTIS_LIST.map((t) => {
            const isReached = profile.xp >= t.minXp;
            const isCurrent = profile.level === t.tahapNombor;

            return (
              <div
                key={t.tahapNombor}
                className={`p-2.5 rounded-xl transition-all ${
                  isCurrent
                    ? 'bg-white/20 border border-white/40 font-bold'
                    : isReached
                    ? 'bg-white/10 text-teal-200'
                    : 'opacity-50'
                }`}
              >
                <div className="text-[10px] text-teal-300">Tahap {t.tahapNombor}</div>
                <div className="text-xs font-semibold mt-0.5">{t.nama}</div>
                <div className="text-[10px] text-teal-300 mt-1 tabular-nums">{t.minXp} XP</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
            Koleksi Lencana Penghormatan ({unlockedCount} / {profile.lencanaList.length})
          </h2>
          <span className="text-xs text-slate-500">Buka kunci melalui pencapaian sebenar</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {profile.lencanaList.map((badge: Lencana) => (
            <div
              key={badge.id}
              className={`p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                badge.diperoleh
                  ? 'bg-white border-amber-200/90 shadow-2xs'
                  : 'bg-slate-50/80 border-slate-200/80 opacity-75'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  badge.diperoleh
                    ? 'bg-amber-100/80 border border-amber-200 shadow-2xs'
                    : 'bg-slate-200/70 border border-slate-300'
                }`}
              >
                {badge.diperoleh ? (
                  getBadgeIcon(badge.ikon, true)
                ) : (
                  <Lock className="w-5 h-5 text-slate-400" />
                )}
              </div>

              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">{badge.nama}</h3>
                  {badge.diperoleh ? (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Diperoleh
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-slate-400">Terkunci</span>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{badge.penerangan}</p>

                <div className="pt-2 text-[11px] text-teal-800 font-medium flex items-center gap-1">
                  <span>Syarat:</span>
                  <span className="text-slate-500">{badge.syarat}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
