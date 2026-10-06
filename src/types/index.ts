export type JenisImbuhan = 'awalan' | 'akhiran' | 'apitan' | 'sisipan';

export type TahapKesukaran = 'Tahun 3' | 'Tahun 4' | 'Tahun 5';

export type StatusPenguasaan = 'Sedang Belajar' | 'Perlu Latihan' | 'Dikuasai';

export interface MorfemDetail {
  id: string;
  kataDasar: string;
  imbuhan: string;
  jenisImbuhan: JenisImbuhan;
  perkataanTerhasil: string;
  perubahanBentuk: string; // contoh: "Huruf s berubah menjadi ny"
  hukumTatabahasa: string; // Penerangan morfofonemik terperinci
  maksudPerkataan: string;
  contohAyat: string;
  pilihanRamalan: string[];
  soalanKesimpulan: {
    soalan: string;
    pilihan: string[];
    jawapanBetul: string;
    penerangan: string;
  };
  tahapKesukaran: TahapKesukaran;
  kemahiran: string; // cth: 'Awalan meN- (s -> ny)'
  petunjuk: string;
  kesalahanLazim: string;
}

export interface LogEksperimen {
  id: string;
  tarikh: string; // ISO string atau format tarikh BM
  kataDasar: string;
  imbuhan: string;
  ramalanAwal: string;
  hasilEksperimen: string;
  percubaan: number;
  ayatMurid: string;
  statusPenguasaan: StatusPenguasaan;
  skor: number;
  catatanSaintis?: string;
}

export interface Lencana {
  id: string;
  nama: string;
  penerangan: string;
  kategori: string;
  ikon: string;
  syarat: string;
  diperoleh: boolean;
  tarikhPeroleh?: string;
}

export interface MuridProfile {
  id: string;
  nama: string;
  avatar: string; // cth: 'saintis-1', 'saintis-2', 'saintis-3', 'saintis-4'
  tahapSaintis: string; // Pembantu Saintis -> Profesor Bahasa
  level: number;
  xp: number;
  xpNextLevel: number;
  eksperimenSelesai: string[]; // senarai id perkataan
  logbook: LogEksperimen[];
  lencanaList: Lencana[];
  kemahiranStats: {
    [kemahiranKey: string]: {
      betul: number;
      jumlah: number;
      status: StatusPenguasaan;
    };
  };
}

export interface DetektifSoalan {
  id: string;
  tajukKes: string;
  ayatAsal: string;
  perkataanSalah: string;
  pilihanPembetulan: string[];
  jawapanBetul: string;
  penerangan: string;
  petunjuk: string;
  situasi: string;
}

export interface CabaranKonteksSoalan {
  id: string;
  situasi: string;
  ayat: string;
  pilihan: string[];
  jawapanBetul: string;
  peneranganFungsi: string;
  tahap: TahapKesukaran;
}

export interface BinaAyatLatihan {
  id: string;
  kataBerimbuhan: string;
  kataDasar: string;
  jenisImbuhan: string;
  maksud: string;
  bankPerkataan: {
    subjek: string[];
    predikat: string[];
    objekKeterangan: string[];
  };
  contohAyatModel: string;
  kataKunciWajib: string[];
  petunjuk: string;
}

export interface GuruRekodMurid {
  id: string;
  nama: string;
  tahapTahun: string;
  jumlahEksperimen: number;
  ketepatan: number; // peratusan cth 85
  kataDasarPenguasaan: number; // peratusan
  imbuhanPenguasaan: number;
  pembentukanKataPenguasaan: number;
  ayatPenguasaan: number;
  ralatLazim: string;
  cadanganIntervensi: string;
}
