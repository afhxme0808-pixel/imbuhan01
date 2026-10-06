import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  Sparkles,
  Lock,
  RotateCcw,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  X
} from 'lucide-react';
import { MuridProfile, LogEksperimen, Lencana } from '../../types';
import { TAHAP_SAINTIS_LIST } from '../../data/achievementsData';
import { soundManager } from '../../utils/audio';

interface GameTrophyProps {
  profile: MuridProfile;
  onBackToMap: () => void;
  onRerun: (kata: string) => void;
}

export const GameTrophyStage: React.FC<GameTrophyProps> = ({
  profile,
  onBackToMap,
  onRerun
}) => {
  const [tab, setTab] = useState<'lencana' | 'log'>('lencana');
  const [logPage, setLogPage] = useState<number>(0);
  const [selectedLog, setSelectedLog] = useState<LogEksperimen | null>(null);

  const logsPerPage = 4;
  const totalLogPages = Math.max(1, Math.ceil(profile.logbook.length / logsPerPage));
  const currentLogs = profile.logbook.slice(logPage * logsPerPage, (logPage + 1) * logsPerPage);

  const unlockedCount = profile.lencanaList.filter((l) => l.diperoleh).length;

  return (
    <div className="h-full flex flex-col justify-between overflow-hidden p-2 sm:p-4 max-w-5xl mx-auto space-y-2">
      {/* Top Bar: Switcher Tab */}
      <div className="bg-[#102B3D] rounded-2xl p-2.5 border border-yellow-500/40 shadow-sm flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-yellow-500/20 border border-yellow-400 text-yellow-300 flex items-center justify-center font-black">
            🏆
          </div>
          <div>
            <div className="text-[10px] uppercase font-black tracking-wider text-yellow-400">
              Galeri Kejayaan Saintis
            </div>
            <h2 className="text-xs sm:text-sm font-black font-game text-white truncate">
              {profile.nama} · {profile.tahapSaintis} (Tahap {profile.level})
            </h2>
          </div>
        </div>

        {/* Tab switch buttons */}
        <div className="flex items-center gap-1 bg-[#18394F] p-1 rounded-xl text-xs">
          <button
            onClick={() => {
              soundManager.playClick();
              setTab('lencana');
            }}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${
              tab === 'lencana'
                ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Lencana ({unlockedCount}/{profile.lencanaList.length})
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setTab('log');
            }}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${
              tab === 'log'
                ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Buku Log ({profile.logbook.length})
          </button>
        </div>
      </div>

      {/* Main Gallery Display */}
      <div className="bg-[#102A3C] rounded-3xl border-2 border-yellow-500/40 p-4 sm:p-5 flex flex-col justify-between shadow-xl flex-1 overflow-hidden min-h-0">
        {/* Tab 1: Badges & Ranks Shelf */}
        {tab === 'lencana' && (
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            {/* XP Level Progress Line */}
            <div className="bg-[#183B52] p-2.5 rounded-2xl border border-teal-500/30 flex items-center justify-between text-xs">
              <span className="font-bold text-teal-200">
                Kemajuan Tahap: <strong className="text-amber-300 font-mono">{profile.xp} / {profile.xpNextLevel} XP</strong>
              </span>
              <div className="w-40 sm:w-64 bg-[#0E2433] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (profile.xp / profile.xpNextLevel) * 100)}%` }}
                />
              </div>
            </div>

            {/* Badges Grid (6 items) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-auto">
              {profile.lencanaList.slice(0, 6).map((badge) => (
                <div
                  key={badge.id}
                  className={`p-3 rounded-2xl border-2 transition-all flex items-center gap-3 ${
                    badge.diperoleh
                      ? 'bg-[#183B52] border-amber-400/80 shadow-md'
                      : 'bg-[#0E2433] border-slate-700/60 opacity-60'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      badge.diperoleh
                        ? 'bg-amber-400/20 border border-amber-400 text-amber-300 text-lg'
                        : 'bg-slate-800 text-slate-500 text-sm'
                    }`}
                  >
                    {badge.diperoleh ? '🏅' : <Lock className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-black font-game text-white truncate">
                      {badge.nama}
                    </h4>
                    <p className="text-[10px] text-slate-300 line-clamp-1">
                      {badge.syarat}
                    </p>
                    {badge.diperoleh && (
                      <span className="text-[9px] font-bold text-emerald-400 block mt-0.5">
                        ✓ Diperoleh
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center text-xs text-teal-300/80 font-bold">
              Selesaikan lebih banyak eksperimen makmal untuk membuka semua lencana!
            </div>
          </div>
        )}

        {/* Tab 2: Paginated Logbook Archive */}
        {tab === 'log' && (
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            <div className="space-y-1.5 my-auto">
              {currentLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-2.5 bg-[#183B52] rounded-xl border border-teal-500/30 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="font-black text-white uppercase font-mono">
                      {log.kataDasar} + {log.imbuhan} → <span className="text-emerald-300">{log.hasilEksperimen}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 italic truncate max-w-sm">
                      "{log.ayatMurid}"
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        soundManager.playClick();
                        setSelectedLog(log);
                      }}
                      className="px-2 py-1 rounded-lg bg-teal-700 hover:bg-teal-600 text-white font-bold text-[11px] flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Lihat</span>
                    </button>
                    <button
                      onClick={() => onRerun(log.kataDasar)}
                      className="px-2 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-[11px] border border-amber-400/40"
                    >
                      Ulang
                    </button>
                  </div>
                </div>
              ))}

              {profile.logbook.length === 0 && (
                <div className="text-center py-8 text-xs text-slate-400">
                  Belum ada eksperimen direkodkan. Masuk ke Zon 1 Makmal untuk bermula!
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {totalLogPages > 1 && (
              <div className="flex items-center justify-between pt-2 border-t border-teal-500/20 text-xs">
                <button
                  onClick={() => setLogPage((p) => Math.max(0, p - 1))}
                  disabled={logPage === 0}
                  className="px-3 py-1 rounded-lg bg-[#18394F] text-white font-bold disabled:opacity-40 flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Sebelum</span>
                </button>
                <span className="text-slate-400 font-bold">
                  Halaman {logPage + 1} / {totalLogPages}
                </span>
                <button
                  onClick={() => setLogPage((p) => Math.min(totalLogPages - 1, p + 1))}
                  disabled={logPage >= totalLogPages - 1}
                  className="px-3 py-1 rounded-lg bg-[#18394F] text-white font-bold disabled:opacity-40 flex items-center gap-1"
                >
                  <span>Seterusnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="flex items-center justify-between pt-1 shrink-0">
        <button
          onClick={onBackToMap}
          className="text-xs font-bold text-yellow-300 hover:text-white flex items-center gap-1"
        >
          ← Kembali ke Peta Misi
        </button>
        <span className="text-[11px] text-slate-400 font-bold">
          Penyimpanan Setempat Disahkan
        </span>
      </div>

      {/* Modal Inspector */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#102B3D] border-2 border-amber-400 rounded-3xl max-w-md w-full p-5 text-white space-y-3 shadow-2xl">
            <div className="flex items-center justify-between border-b border-teal-500/30 pb-2">
              <h3 className="font-game font-black text-base text-amber-300">
                Log Eksperimen #{selectedLog.id.slice(-4)}
              </h3>
              <button
                onClick={() => setSelectedLog(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="text-xs space-y-2">
              <div>
                <span className="text-slate-400 block font-bold">Kata Terhasil:</span>
                <span className="text-lg font-black font-mono text-emerald-300 uppercase">
                  {selectedLog.hasilEksperimen}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-bold">Catatan Saintis:</span>
                <p className="text-slate-200 leading-snug">{selectedLog.catatanSaintis}</p>
              </div>
              <div>
                <span className="text-slate-400 block font-bold">Ayat Murid:</span>
                <p className="p-2 bg-[#183B52] rounded-xl text-teal-200 italic">
                  "{selectedLog.ayatMurid}"
                </p>
              </div>
            </div>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedLog(null)}
                className="btn-chunky-amber px-4 py-1.5 rounded-xl text-slate-950 font-black text-xs"
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
