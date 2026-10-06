import React from 'react';
import {
  FlaskConical,
  BookOpen,
  Search,
  CheckCircle2,
  PenTool,
  ClipboardList,
  Award,
  GraduationCap,
  Settings,
  HelpCircle,
  X,
  Sparkles,
  Home
} from 'lucide-react';
import { soundManager } from '../../utils/audio';
import { MuridProfile } from '../../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  profile: MuridProfile;
  onOpenSettings: () => void;
  onOpenHelp: () => void;
}

export const AppSidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpenMobile,
  onCloseMobile,
  profile,
  onOpenSettings,
  onOpenHelp
}) => {
  const menuGroups = [
    {
      title: 'Penerokaan Makmal',
      items: [
        { id: 'dashboard', label: 'Halaman Utama', icon: Home, badge: '' },
        { id: 'makmal', label: 'Makmal Eksperimen', icon: FlaskConical, badge: 'Interaktif' },
        { id: 'koleksi', label: 'Koleksi Kata & Imbuhan', icon: BookOpen, badge: '' }
      ]
    },
    {
      title: 'Modul Latihan Saintis',
      items: [
        { id: 'detektif', label: 'Detektif Kesalahan', icon: Search, badge: 'Misi' },
        { id: 'konteks', label: 'Cabaran Konteks', icon: CheckCircle2, badge: '' },
        { id: 'bina-ayat', label: 'Pembinaan Ayat', icon: PenTool, badge: '' }
      ]
    },
    {
      title: 'Rekod & Pencapaian',
      items: [
        { id: 'buku-log', label: 'Buku Log Saintis', icon: ClipboardList, badge: `${profile.logbook.length}` },
        { id: 'pencapaian', label: 'Pencapaian & Lencana', icon: Award, badge: `${profile.lencanaList.filter(l => l.diperoleh).length}` }
      ]
    },
    {
      title: 'Portal Pendidik',
      items: [
        { id: 'guru', label: 'Papan Pemuka Guru', icon: GraduationCap, badge: 'IPG / SK' }
      ]
    }
  ];

  const handleSelectTab = (tabId: string) => {
    soundManager.playClick();
    setActiveTab(tabId);
    if (isOpenMobile) {
      onCloseMobile();
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-teal-100/80">
      {/* Top Mobile Header */}
      <div className="p-4 flex items-center justify-between border-b border-teal-100 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-700 flex items-center justify-center text-white">
            <FlaskConical className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-teal-900 font-heading">IMBUHMAKER</span>
        </div>
        <button
          onClick={onCloseMobile}
          className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100"
          aria-label="Tutup menu navigasi"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Student Mini Card */}
      <div className="p-4 mx-3 my-3 bg-gradient-to-br from-teal-50 to-emerald-50/60 rounded-xl border border-teal-100/90 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold font-heading shadow-xs">
            {profile.nama.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-slate-900 truncate">{profile.nama}</h4>
            <div className="text-[11px] font-semibold text-teal-700">{profile.tahapSaintis}</div>
          </div>
        </div>
        <div className="mt-2.5 pt-2 border-t border-teal-100 flex items-center justify-between text-[11px] text-slate-600">
          <span>Pengalaman (XP):</span>
          <span className="font-bold text-teal-900 tabular-nums">{profile.xp} / {profile.xpNextLevel} XP</span>
        </div>
        <div className="w-full bg-teal-200/50 h-1.5 rounded-full mt-1 overflow-hidden">
          <div
            className="bg-teal-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, (profile.xp / profile.xpNextLevel) * 100)}%` }}
          />
        </div>
      </div>

      {/* Nav Menu */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
        {menuGroups.map((group) => (
          <div key={group.title}>
            <div className="px-3 mb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {group.title}
            </div>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = activeTab === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors group ${
                      isActive
                        ? 'bg-teal-700 text-white shadow-xs'
                        : 'text-slate-600 hover:text-teal-900 hover:bg-teal-50/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-teal-700'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                          isActive
                            ? 'bg-teal-600 text-white'
                            : 'bg-slate-100 text-slate-600 group-hover:bg-teal-100 group-hover:text-teal-800'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Quick Links */}
      <div className="p-3 border-t border-teal-100 bg-slate-50/50 space-y-1">
        <button
          onClick={() => {
            soundManager.playClick();
            onOpenHelp();
          }}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-teal-800 hover:bg-white rounded-lg transition-colors"
        >
          <HelpCircle className="w-4 h-4 text-slate-400" />
          <span>Panduan & Bantuan</span>
        </button>
        <button
          onClick={() => {
            soundManager.playClick();
            onOpenSettings();
          }}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-teal-800 hover:bg-white rounded-lg transition-colors"
        >
          <Settings className="w-4 h-4 text-slate-400" />
          <span>Tetapan Makmal</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden md:block w-64 shrink-0 sticky top-16 h-[calc(100vh-4rem)] z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="fixed inset-y-0 left-0 w-72 bg-white shadow-xl z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
