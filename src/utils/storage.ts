import { MuridProfile, LogEksperimen, StatusPenguasaan, Lencana } from '../types';
import { INITIAL_LENCANA_LIST, TAHAP_SAINTIS_LIST } from '../data/achievementsData';

const STORAGE_KEY = 'imbuhmaker_student_profile_v2';

export const DEFAULT_PROFILE: MuridProfile = {
  id: 'saintis-muda-1',
  nama: 'Saintis Muda',
  avatar: 'saintis-1',
  tahapSaintis: 'Pembantu Saintis',
  level: 1,
  xp: 30,
  xpNextLevel: 100,
  eksperimenSelesai: [],
  logbook: [
    {
      id: 'log-demo-init',
      tarikh: new Date().toLocaleDateString('ms-MY', { day: 'numeric', month: 'short', year: 'numeric' }),
      kataDasar: 'sapu',
      imbuhan: 'meN-',
      ramalanAwal: 'menyapu',
      hasilEksperimen: 'menyapu',
      percubaan: 1,
      ayatMurid: 'Kakak menyapu sampah di anjung rumah.',
      statusPenguasaan: 'Sedang Belajar',
      skor: 100,
      catatanSaintis: 'Huruf "s" bertukar menjadi "ny" mengikut hukum morfofonemik meN-.'
    }
  ],
  lencanaList: INITIAL_LENCANA_LIST,
  kemahiranStats: {
    'Awalan meN- (s -> ny)': { betul: 2, jumlah: 2, status: 'Sedang Belajar' },
    'Awalan meN- (t -> n)': { betul: 1, jumlah: 1, status: 'Sedang Belajar' }
  }
};

export function calculateRankFromXp(xp: number): { tahapNombor: number; nama: string; nextXp: number } {
  for (let i = TAHAP_SAINTIS_LIST.length - 1; i >= 0; i--) {
    const t = TAHAP_SAINTIS_LIST[i];
    if (xp >= t.minXp) {
      const nextLevel = TAHAP_SAINTIS_LIST[i + 1] ? TAHAP_SAINTIS_LIST[i + 1].minXp : t.maxXp;
      return {
        tahapNombor: t.tahapNombor,
        nama: t.nama,
        nextXp: nextLevel
      };
    }
  }
  return { tahapNombor: 1, nama: 'Pembantu Saintis', nextXp: 100 };
}

export function determineMasteryStatus(betul: number, jumlah: number): StatusPenguasaan {
  if (jumlah < 5) {
    return 'Sedang Belajar';
  }
  const peratusan = (betul / jumlah) * 100;
  if (peratusan >= 80) {
    return 'Dikuasai';
  }
  return 'Perlu Latihan';
}

export function loadStudentProfile(): MuridProfile {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      saveStudentProfile(DEFAULT_PROFILE);
      return DEFAULT_PROFILE;
    }
    const parsed = JSON.parse(data) as MuridProfile;
    // Ensure all badges exist in case new ones were added
    if (!parsed.lencanaList || parsed.lencanaList.length === 0) {
      parsed.lencanaList = INITIAL_LENCANA_LIST;
    } else {
      INITIAL_LENCANA_LIST.forEach((initLencana) => {
        if (!parsed.lencanaList.some((l) => l.id === initLencana.id)) {
          parsed.lencanaList.push(initLencana);
        }
      });
    }
    return parsed;
  } catch (err) {
    console.error('Ralat membaca data profil murid dari localStorage:', err);
    return DEFAULT_PROFILE;
  }
}

export function saveStudentProfile(profile: MuridProfile): void {
  if (typeof window === 'undefined') return;
  try {
    // Recalculate rank
    const rank = calculateRankFromXp(profile.xp);
    profile.tahapSaintis = rank.nama;
    profile.level = rank.tahapNombor;
    profile.xpNextLevel = rank.nextXp;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error('Ralat menyimpan data profil murid ke localStorage:', err);
  }
}

export function checkBadges(profile: MuridProfile): { updated: boolean; newBadges: Lencana[] } {
  const newBadges: Lencana[] = [];
  const logCount = profile.logbook.length;
  const completedWords = new Set(profile.eksperimenSelesai).size;

  profile.lencanaList = profile.lencanaList.map((l) => {
    if (l.diperoleh) return l;

    let unlocked = false;
    if (l.id === 'lencana-saintis-baharu' && logCount >= 1) {
      unlocked = true;
    } else if (l.id === 'lencana-pakar-kata-dasar' && completedWords >= 5) {
      unlocked = true;
    } else if (l.id === 'lencana-penjelajah-awalan') {
      const menCount = profile.logbook.filter((entry) => entry.imbuhan.startsWith('meN-')).length;
      if (menCount >= 3) unlocked = true;
    } else if (l.id === 'lencana-penyelidik-akhiran') {
      const apitanCount = profile.logbook.filter((entry) => entry.imbuhan.includes('...')).length;
      if (apitanCount >= 1) unlocked = true;
    } else if (l.id === 'lencana-detektif-bahasa') {
      const detStat = profile.kemahiranStats['Detektif Kesalahan'];
      if (detStat && detStat.betul >= 3) unlocked = true;
    } else if (l.id === 'lencana-pembina-ayat') {
      const ayatStat = profile.kemahiranStats['Pembinaan Ayat'];
      if (ayatStat && ayatStat.betul >= 2) unlocked = true;
    } else if (l.id === 'lencana-saintis-unggul') {
      const unlockedOthers = profile.lencanaList.filter((x) => x.id !== 'lencana-saintis-unggul' && x.diperoleh).length;
      if (profile.xp >= 500 && unlockedOthers >= 4) unlocked = true;
    }

    if (unlocked) {
      const updatedBadge: Lencana = {
        ...l,
        diperoleh: true,
        tarikhPeroleh: new Date().toLocaleDateString('ms-MY', { day: 'numeric', month: 'short', year: 'numeric' })
      };
      newBadges.push(updatedBadge);
      return updatedBadge;
    }
    return l;
  });

  return { updated: newBadges.length > 0, newBadges };
}

export function recordExperimentCompletion(
  kataId: string,
  entry: LogEksperimen,
  kemahiranKey: string,
  isCorrectFirstTry: boolean
): { profile: MuridProfile; xpEarned: number; newlyUnlockedBadges: Lencana[] } {
  const profile = loadStudentProfile();
  let xpEarned = 0;

  const alreadySolved = profile.eksperimenSelesai.includes(kataId);

  // Prevent double dipping XP if already completed, but reward a smaller practice XP (5 XP)
  if (!alreadySolved) {
    xpEarned = isCorrectFirstTry ? 35 : 20;
    profile.eksperimenSelesai.push(kataId);
  } else {
    xpEarned = 5; // Latihan ulang kaji
  }

  profile.xp += xpEarned;

  // Add to logbook
  profile.logbook.unshift(entry);

  // Update skill stats
  if (!profile.kemahiranStats[kemahiranKey]) {
    profile.kemahiranStats[kemahiranKey] = {
      betul: isCorrectFirstTry ? 1 : 0,
      jumlah: 1,
      status: 'Sedang Belajar'
    };
  } else {
    const cur = profile.kemahiranStats[kemahiranKey];
    cur.jumlah += 1;
    if (isCorrectFirstTry) cur.betul += 1;
    cur.status = determineMasteryStatus(cur.betul, cur.jumlah);
  }

  // Check badges
  const badgeResult = checkBadges(profile);
  saveStudentProfile(profile);

  return {
    profile,
    xpEarned,
    newlyUnlockedBadges: badgeResult.newBadges
  };
}

export function recordModuleActivity(
  moduleName: 'Detektif Kesalahan' | 'Cabaran Konteks' | 'Pembinaan Ayat',
  isBetul: boolean
): { profile: MuridProfile; xpEarned: number; newlyUnlockedBadges: Lencana[] } {
  const profile = loadStudentProfile();
  let xpEarned = 0;

  if (isBetul) {
    xpEarned = 15;
    profile.xp += xpEarned;
  } else {
    xpEarned = 3; // Cubaan saintis
    profile.xp += xpEarned;
  }

  if (!profile.kemahiranStats[moduleName]) {
    profile.kemahiranStats[moduleName] = {
      betul: isBetul ? 1 : 0,
      jumlah: 1,
      status: 'Sedang Belajar'
    };
  } else {
    const stat = profile.kemahiranStats[moduleName];
    stat.jumlah += 1;
    if (isBetul) stat.betul += 1;
    stat.status = determineMasteryStatus(stat.betul, stat.jumlah);
  }

  const badgeResult = checkBadges(profile);
  saveStudentProfile(profile);

  return {
    profile,
    xpEarned,
    newlyUnlockedBadges: badgeResult.newBadges
  };
}

export function resetStudentProgress(): MuridProfile {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
  return DEFAULT_PROFILE;
}
