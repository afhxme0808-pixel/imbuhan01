import React, { useState } from 'react';
import {
  GraduationCap,
  Download,
  Printer,
  Search,
  Filter,
  ArrowUpDown,
  AlertTriangle,
  TrendingUp,
  CheckCircle2,
  Users,
  FlaskConical,
  X,
  FileSpreadsheet
} from 'lucide-react';
import { CONTOH_MURID_GURU, DEMO_STATISTIK_KEMAHIRAN, DEMO_KATEGORI_RALAT } from '../../data/teacherDemoData';
import { GuruRekodMurid, MuridProfile } from '../../types';
import { soundManager } from '../../utils/audio';

interface TeacherProps {
  currentProfile: MuridProfile;
}

export const TeacherDashboard: React.FC<TeacherProps> = ({ currentProfile }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortField, setSortField] = useState<keyof GuruRekodMurid>('ketepatan');
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<GuruRekodMurid | null>(null);

  // Combine demo students with current active session student for rich demonstration!
  const currentSessionAsStudentRecord: GuruRekodMurid = {
    id: 'current-session-student',
    nama: `${currentProfile.nama} (Sesi Aktif Ini)`,
    tahapTahun: 'Tahun 4 Cemerlang',
    jumlahEksperimen: Math.max(1, currentProfile.logbook.length),
    ketepatan: currentProfile.xp > 50 ? 86 : 75,
    kataDasarPenguasaan: 90,
    imbuhanPenguasaan: 85,
    pembentukanKataPenguasaan: 82,
    ayatPenguasaan: 80,
    ralatLazim: 'Perlu pengukuhan berterusan pada hukum luluh awalan meN-.',
    cadanganIntervensi: 'Teruskan latihan dalam modul Detektif Kesalahan dan Pembinaan Ayat.'
  };

  const allStudents = [currentSessionAsStudentRecord, ...CONTOH_MURID_GURU];

  const filteredStudents = allStudents.filter((m) =>
    m.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  filteredStudents.sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortAsc ? valA - valB : valB - valA;
    }
    return sortAsc
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  const handleSort = (field: keyof GuruRekodMurid) => {
    soundManager.playClick();
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  // CSV Export functionality
  const handleExportCSV = () => {
    soundManager.playClick();
    const headers = [
      'ID Murid',
      'Nama Murid',
      'Kelas',
      'Jumlah Eksperimen',
      'Purata Ketepatan (%)',
      'Penguasaan Kata Dasar (%)',
      'Penguasaan Imbuhan (%)',
      'Pembentukan Kata (%)',
      'Penggunaan Ayat (%)',
      'Ralat Lazim',
      'Cadangan Intervensi Guru'
    ];

    const rows = allStudents.map((s) => [
      `"${s.id}"`,
      `"${s.nama}"`,
      `"${s.tahapTahun}"`,
      s.jumlahEksperimen,
      s.ketepatan,
      s.kataDasarPenguasaan,
      s.imbuhanPenguasaan,
      s.pembentukanKataPenguasaan,
      s.ayatPenguasaan,
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
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-teal-700 uppercase tracking-wider flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4" />
            <span>Portal Pendidik & Penyelidikan Inovasi IPG</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading mt-0.5">
            Papan Pemuka Analisis Pembelajaran Guru
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Pantau perkembangan morfologi murid, analisis kesalahan lazim tatabahasa dan cadangan intervensi berfokus.
          </p>
        </div>

        {/* Action Buttons: CSV & Print */}
        <div className="flex items-center gap-2 print-hide">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm transition-colors shadow-2xs"
          >
            <Download className="w-4 h-4 text-teal-700" />
            <span>Eksport CSV</span>
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-bold px-4 py-2 rounded-xl text-xs sm:text-sm transition-colors shadow-2xs"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Ringkasan</span>
          </button>
        </div>
      </div>

      {/* Demo Notice Banner */}
      <div className="p-4 bg-teal-50/80 rounded-2xl border border-teal-200 text-xs text-teal-900 flex items-start gap-3">
        <span className="w-2.5 h-2.5 rounded-full bg-teal-600 shrink-0 mt-1" />
        <div>
          <strong className="block font-bold">Mod Demonstrasi Projek Inovasi Pendidikan:</strong>
          <span>
            Data di bawah memaparkan contoh simulasi kohort Kelas 4 Cemerlang yang digabungkan bersama rekod sesi aktif murid semasa. Semua data ralat dan intervensi berasaskan keperluan DSKP Bahasa Melayu SK.
          </span>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Jumlah Murid Dipantau</span>
            <Users className="w-4 h-4 text-teal-700" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-slate-900 font-heading tabular-nums">
            {allStudents.length} <span className="text-xs text-slate-400 font-normal">orang</span>
          </div>
          <div className="mt-1 text-xs text-emerald-600 font-semibold">100% aktif dalam sistem</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Eksperimen Selesai</span>
            <FlaskConical className="w-4 h-4 text-teal-700" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-slate-900 font-heading tabular-nums">
            {allStudents.reduce((acc, s) => acc + s.jumlahEksperimen, 0)} <span className="text-xs text-slate-400 font-normal">laporan</span>
          </div>
          <div className="mt-1 text-xs text-slate-500">Purata 12.3 per murid</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Purata Ketepatan Kelas</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-emerald-700 font-heading tabular-nums">
            83.8%
          </div>
          <div className="mt-1 text-xs text-emerald-600 font-semibold">Tahap Penguasaan Baik</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Ralat Paling Lazim</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-2 text-sm font-extrabold text-slate-900 font-heading truncate">
            Luluh Huruf S (mensapu)
          </div>
          <div className="mt-1 text-xs text-amber-700 font-medium">38% murid terkesan</div>
        </div>
      </div>

      {/* Analytics Charts & Pedagogical Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Skill Mastery Breakdown */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm font-heading">
                Ketepatan Mengikut Kemahiran Morfologi
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Analisis penguasaan konsep tatabahasa</p>
            </div>
            <span className="text-xs font-semibold text-slate-400">[Data Contoh]</span>
          </div>

          <div className="space-y-3.5">
            {DEMO_STATISTIK_KEMAHIRAN.map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">{stat.kemahiran}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-[11px]">{stat.status}</span>
                    <span className="font-bold tabular-nums text-slate-900">{stat.ketepatan}%</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      stat.ketepatan >= 85
                        ? 'bg-emerald-600'
                        : stat.ketepatan >= 75
                        ? 'bg-teal-600'
                        : 'bg-amber-500'
                    }`}
                    style={{ width: `${stat.ketepatan}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Common Error Distribution */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm font-heading">
                Kategori Kesalahan Morfologi Lazim
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Taburan kekerapan kesilapan ejaan dan fungsi</p>
            </div>
            <span className="text-xs font-semibold text-slate-400">[Data Contoh]</span>
          </div>

          <div className="space-y-3">
            {DEMO_KATEGORI_RALAT.map((item, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{item.kategori}</span>
                  <span className="font-mono font-bold text-amber-700 tabular-nums">
                    {item.peratusan}% ({item.bilangan} kes)
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-600 h-full rounded-full"
                    style={{ width: `${item.peratusan}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900">
            <strong>Cadangan Pedagogi Guru:</strong> Lakukan latih tubi morfem berpandu bagi kumpulan kata K, P, S, T luluh menggunakan teknik rumus warna (hijau = luluh, merah = konsonan bersuara kekal).
          </div>
        </div>
      </div>

      {/* Student Records Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-900 text-base font-heading">
              Rekod Prestasi Individu Murid
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Klik pada mana-mana murid untuk membaca perincian diagnosis dan cadangan intervensi.
            </p>
          </div>

          {/* Search Table */}
          <div className="relative w-full sm:w-64 print-hide">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari murid..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-teal-600 focus:bg-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px] tracking-wider">
              <tr>
                <th className="py-3 px-4 sm:px-6">Murid</th>
                <th
                  onClick={() => handleSort('jumlahEksperimen')}
                  className="py-3 px-4 cursor-pointer hover:text-teal-900"
                >
                  <div className="flex items-center gap-1">
                    <span>Eksperimen</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('ketepatan')}
                  className="py-3 px-4 cursor-pointer hover:text-teal-900"
                >
                  <div className="flex items-center gap-1">
                    <span>Ketepatan</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4">Kata Dasar</th>
                <th className="py-3 px-4">Imbuhan</th>
                <th className="py-3 px-4">Bina Ayat</th>
                <th className="py-3 px-4 sm:px-6 text-right print-hide">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  className="hover:bg-teal-50/50 cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="font-bold text-slate-900">{student.nama}</div>
                    <div className="text-[11px] text-slate-500">{student.tahapTahun}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-800 tabular-nums">
                    {student.jumlahEksperimen}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-extrabold text-emerald-800 tabular-nums">
                    {student.ketepatan}%
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-700 tabular-nums">
                    {student.kataDasarPenguasaan}%
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-700 tabular-nums">
                    {student.imbuhanPenguasaan}%
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-700 tabular-nums">
                    {student.ayatPenguasaan}%
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-right print-hide">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStudent(student);
                      }}
                      className="px-2.5 py-1 text-xs font-semibold text-teal-700 hover:text-teal-900 hover:bg-teal-100/70 rounded-lg transition-colors"
                    >
                      Diagnosis
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Diagnosis Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-teal-100 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-slate-900 font-heading text-lg">
                  {selectedStudent.nama}
                </h3>
                <span className="text-xs text-slate-500">{selectedStudent.tahapTahun}</span>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block font-semibold">Ketepatan Keseluruhan:</span>
                <span className="font-extrabold text-emerald-800 text-base font-mono">{selectedStudent.ketepatan}%</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block font-semibold">Eksperimen Dijalankan:</span>
                <span className="font-extrabold text-slate-900 text-base font-mono">{selectedStudent.jumlahEksperimen}</span>
              </div>
            </div>

            <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-amber-900">
                <AlertTriangle className="w-4 h-4" />
                <span>Analisis Ralat Lazim:</span>
              </div>
              <p>{selectedStudent.ralatLazim}</p>
            </div>

            <div className="p-3.5 bg-teal-50 rounded-2xl border border-teal-200 text-xs text-teal-950 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-teal-900">
                <TrendingUp className="w-4 h-4" />
                <span>Cadangan Intervensi Berfokus:</span>
              </div>
              <p>{selectedStudent.cadanganIntervensi}</p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedStudent(null)}
                className="bg-slate-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl"
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
