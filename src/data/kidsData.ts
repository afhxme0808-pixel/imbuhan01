export interface KidsWord {
  id: string;
  kata: string;
  emoji: string;
  gambarUrl?: string;
  imbuhan: string; // imbuhan lalai
  hasil: string;
  maknaRingkas: string;
  ayatContoh: string;
  rahsiaHuruf: string;
  warna: string;
  pilihanSalah: string;
}

export interface KidsMorphologyEntry {
  kata: string;
  imbuhan: string; // 'meN-' | 'peN-' | 'ber-' | 'ter-'
  hasil: string;
  rahsiaHuruf: string;
  maknaRingkas: string;
  ayatContoh: string;
  pilihanSalah: string;
  warna?: string;
}

export const KIDS_IMBUHAN = [
  {
    id: 'meN-',
    label: 'meN-',
    nama: 'Awalan meN-',
    warna: 'bg-emerald-400 text-teal-950',
    botolColor: '#10B981',
    botolSecondary: '#34D399',
    penerangan: 'Membentuk kata kerja aktif perbuatan'
  },
  {
    id: 'peN-',
    label: 'peN-',
    nama: 'Awalan peN-',
    warna: 'bg-amber-400 text-amber-950',
    botolColor: '#F59E0B',
    botolSecondary: '#FBBF24',
    penerangan: 'Membentuk kata nama orang atau alat'
  },
  {
    id: 'ber-',
    label: 'ber-',
    nama: 'Awalan ber-',
    warna: 'bg-purple-400 text-purple-950',
    botolColor: '#8B5CF6',
    botolSecondary: '#A78BFA',
    penerangan: 'Membentuk kata kerja keadaan atau perbuatan'
  },
  {
    id: 'ter-',
    label: 'ter-',
    nama: 'Awalan ter-',
    warna: 'bg-rose-400 text-rose-950',
    botolColor: '#F43F5E',
    botolSecondary: '#FB7185',
    penerangan: 'Membentuk kata kerja tidak sengaja atau keadaan siap'
  }
];

export const KIDS_WORDS: KidsWord[] = [
  {
    id: 'sapu',
    kata: 'sapu',
    emoji: '🧹',
    imbuhan: 'meN-',
    hasil: 'menyapu',
    maknaRingkas: 'Membersihkan sampah guna penyapu',
    ayatContoh: 'Ibu menyapu lantai ruang tamu hingga bersih.',
    rahsiaHuruf: 'Huruf "S" hilang dan luluh jadi "NY"!',
    warna: 'from-emerald-400 to-teal-500',
    pilihanSalah: 'mensapu'
  },
  {
    id: 'baca',
    kata: 'baca',
    emoji: '📖',
    imbuhan: 'meN-',
    hasil: 'membaca',
    maknaRingkas: 'Melihat dan memahami isi buku cerita',
    ayatContoh: 'Siti tekun membaca buku di perpustakaan.',
    rahsiaHuruf: 'Huruf "B" kekal, cantum awalan "mem-"!',
    warna: 'from-blue-400 to-indigo-500',
    pilihanSalah: 'menbaca'
  },
  {
    id: 'masak',
    kata: 'masak',
    emoji: '🍳',
    imbuhan: 'meN-',
    hasil: 'memasak',
    maknaRingkas: 'Menyediakan lauk sedap di atas dapur',
    ayatContoh: 'Ayah memasak nasi goreng enak untuk keluarga.',
    rahsiaHuruf: 'Huruf "M" kekal, cantum awalan "me-"!',
    warna: 'from-amber-400 to-orange-500',
    pilihanSalah: 'menmasak'
  },
  {
    id: 'tanam',
    kata: 'tanam',
    emoji: '🌱',
    imbuhan: 'meN-',
    hasil: 'menanam',
    maknaRingkas: 'Meletak anak pokok ke dalam tanah',
    ayatContoh: 'Pak Abu menanam pokok cili di halaman rumah.',
    rahsiaHuruf: 'Huruf "T" hilang dan luluh jadi "N"!',
    warna: 'from-lime-400 to-green-600',
    pilihanSalah: 'mentanam'
  },
  {
    id: 'cat',
    kata: 'cat',
    emoji: '🎨',
    imbuhan: 'meN-',
    hasil: 'mengecat',
    maknaRingkas: 'Mewarnakan dinding rumah dengan cat',
    ayatContoh: 'Abang mengecat dinding dengan warna biru ceria.',
    rahsiaHuruf: 'Kata satu suku kata menerima "menge-"!',
    warna: 'from-pink-400 to-rose-500',
    pilihanSalah: 'mencat'
  },
  {
    id: 'cuci',
    kata: 'cuci',
    emoji: '🧼',
    imbuhan: 'meN-',
    hasil: 'mencuci',
    maknaRingkas: 'Membersihkan kotoran guna sabun dan air',
    ayatContoh: 'Adik mencuci kasut sekolah hingga putih bersih.',
    rahsiaHuruf: 'Huruf "C" kekal, cantum awalan "men-"!',
    warna: 'from-cyan-400 to-sky-500',
    pilihanSalah: 'menyuci'
  },
  {
    id: 'tulis',
    kata: 'tulis',
    emoji: '✏️',
    imbuhan: 'meN-',
    hasil: 'menulis',
    maknaRingkas: 'Mencatat perkataan menggunakan pensel',
    ayatContoh: 'Adik menulis karangan kemas di dalam buku.',
    rahsiaHuruf: 'Huruf "T" hilang dan luluh jadi "N"!',
    warna: 'from-purple-400 to-violet-500',
    pilihanSalah: 'mentulis'
  },
  {
    id: 'lukis',
    kata: 'lukis',
    emoji: '🖼️',
    imbuhan: 'meN-',
    hasil: 'melukis',
    maknaRingkas: 'Menghasilkan gambar pemandangan cantik',
    ayatContoh: 'Kakak melukis gambar pemandangan tepi pantai.',
    rahsiaHuruf: 'Huruf "L" kekal, cantum awalan "me-"!',
    warna: 'from-yellow-400 to-amber-500',
    pilihanSalah: 'menlukis'
  },
  {
    id: 'main',
    kata: 'main',
    emoji: '⚽',
    imbuhan: 'ber-',
    hasil: 'bermain',
    maknaRingkas: 'Melakukan aktiviti permainan yang menyeronokkan',
    ayatContoh: 'Kanak-kanak gembira bermain bola di padang petang ini.',
    rahsiaHuruf: 'Awalan ber- dicantum terus (ber- + main = bermain)!',
    warna: 'from-blue-500 to-cyan-500',
    pilihanSalah: 'memain'
  },
  {
    id: 'jalan',
    kata: 'jalan',
    emoji: '🚶',
    imbuhan: 'ber-',
    hasil: 'berjalan',
    maknaRingkas: 'Melangkah kaki ke hadapan untuk bergerak',
    ayatContoh: 'Kami berjalan kaki bersama-sama pergi ke sekolah.',
    rahsiaHuruf: 'Awalan ber- dicantum terus (ber- + jalan = berjalan)!',
    warna: 'from-teal-400 to-emerald-600',
    pilihanSalah: 'menjalan'
  },
  {
    id: 'lari',
    kata: 'lari',
    emoji: '🏃',
    imbuhan: 'ber-',
    hasil: 'berlari',
    maknaRingkas: 'Melangkah kaki dengan sangat pantas',
    ayatContoh: 'Adik berlari laju untuk mengejar bas sekolah.',
    rahsiaHuruf: 'Awalan ber- dicantum terus (ber- + lari = berlari)!',
    warna: 'from-orange-400 to-red-500',
    pilihanSalah: 'melari'
  },
  {
    id: 'bina',
    kata: 'bina',
    emoji: '🏗️',
    imbuhan: 'meN-',
    hasil: 'membina',
    maknaRingkas: 'Mendirikan rumah atau bangunan yang kukuh',
    ayatContoh: 'Para pekerja giat membina jambatan baharu.',
    rahsiaHuruf: 'Huruf "B" kekal, cantum awalan "mem-"!',
    warna: 'from-indigo-400 to-purple-600',
    pilihanSalah: 'menbina'
  }
];

/**
 * PANGKALAN GABUNGAN TATABAHASA BAKU (Morfologi Melayu Sah)
 * Jika kombinasi tidak wujud dalam senarai ini, sistem akan HITAMKAN / GELAPKAN
 * butang pilihan ramuan tersebut agar murid & guru tidak terkeliru.
 */
export const KIDS_COMBINATIONS: KidsMorphologyEntry[] = [
  // 1. SAPU
  {
    kata: 'sapu',
    imbuhan: 'meN-',
    hasil: 'menyapu',
    rahsiaHuruf: 'Huruf "S" luluh menjadi "NY" membentuk kata kerja aktif!',
    maknaRingkas: 'Membersihkan sampah atau habuk guna penyapu.',
    ayatContoh: 'Ibu menyapu dedaun kering di halaman rumah sehingga bersih.',
    pilihanSalah: 'mensapu'
  },
  {
    kata: 'sapu',
    imbuhan: 'peN-',
    hasil: 'penyapu',
    rahsiaHuruf: 'Huruf "S" luluh menjadi "NY" membentuk kata nama perkakas/alat!',
    maknaRingkas: 'Alat menyapu sampah daripada lidi atau sabut.',
    ayatContoh: 'Kakak mengambil sebatang penyapu lidi untuk membersihkan lantai.',
    pilihanSalah: 'pensapu'
  },
  {
    kata: 'sapu',
    imbuhan: 'ber-',
    hasil: 'bersapu',
    rahsiaHuruf: 'Awalan ber- dicantum terus pada kata dasar (ber- + sapu).',
    maknaRingkas: 'Berkeadaan sudah disapu dan bersih daripada sampah.',
    ayatContoh: 'Lantai bilik adik sudah bersapu sebelum tetamu datang berkunjung.',
    pilihanSalah: 'bernyapu'
  },
  {
    kata: 'sapu',
    imbuhan: 'ter-',
    hasil: 'tersapu',
    rahsiaHuruf: 'Awalan ter- dicantum terus bagi menyatakan perbuatan tidak sengaja.',
    maknaRingkas: 'Disapu atau terkena sapu secara tidak sengaja.',
    ayatContoh: 'Duit syiling lama itu tersapu sekali bersama longgokan habuk.',
    pilihanSalah: 'ternyapu'
  },

  // 2. BACA
  {
    kata: 'baca',
    imbuhan: 'meN-',
    hasil: 'membaca',
    rahsiaHuruf: 'Huruf "B" kekal bersama awalan "mem-" kerana huruf b bersuara.',
    maknaRingkas: 'Melihat serta memahami isi bahan tulisan atau buku.',
    ayatContoh: 'Siti rajin membaca buku cerita di sudut bacaan kelas.',
    pilihanSalah: 'menbaca'
  },
  {
    kata: 'baca',
    imbuhan: 'peN-',
    hasil: 'pembaca',
    rahsiaHuruf: 'Huruf "B" kekal bersama awalan "pem-" membentuk kata nama orang.',
    maknaRingkas: 'Orang yang membaca buku, majalah atau akhbar.',
    ayatContoh: 'Ahmad merupakan seorang pembaca buku yang sangat setia.',
    pilihanSalah: 'penbaca'
  },
  {
    kata: 'baca',
    imbuhan: 'ter-',
    hasil: 'terbaca',
    rahsiaHuruf: 'Awalan ter- dicantum terus pada kata dasar baca.',
    maknaRingkas: 'Terbaca mesej atau tulisan secara tidak sengaja.',
    ayatContoh: 'Adik terbaca catatan rahsia di dalam diari abang.',
    pilihanSalah: 'tembaca'
  },

  // 3. MASAK
  {
    kata: 'masak',
    imbuhan: 'meN-',
    hasil: 'memasak',
    rahsiaHuruf: 'Kata dasar bermula huruf "M" menerima awalan "me-".',
    maknaRingkas: 'Menyediakan lauk atau hidangan menggunakan api dapur.',
    ayatContoh: 'Ayah memasak sup ayam yang enak untuk hidangan tengah hari.',
    pilihanSalah: 'menmasak'
  },
  {
    kata: 'masak',
    imbuhan: 'peN-',
    hasil: 'pemasak',
    rahsiaHuruf: 'Kata dasar bermula huruf "M" menerima awalan "pe-".',
    maknaRingkas: 'Tukang masak atau alat/perkakas untuk memasak makanan.',
    ayatContoh: 'Pemasak nasi elektrik itu memudahkan kerja ibu di dapur.',
    pilihanSalah: 'penmasak'
  },
  {
    kata: 'masak',
    imbuhan: 'ter-',
    hasil: 'termasak',
    rahsiaHuruf: 'Awalan ter- dicantum terus bagi menunjukkan perbuatan tidak sengaja.',
    maknaRingkas: 'Termasak bahan atau masakan secara tidak sengaja.',
    ayatContoh: 'Garam termasak secara berlebihan di dalam sayur campur itu.',
    pilihanSalah: 'temmasak'
  },

  // 4. TANAM
  {
    kata: 'tanam',
    imbuhan: 'meN-',
    hasil: 'menanam',
    rahsiaHuruf: 'Huruf "T" luluh menjadi "N" apabila menerima awalan meN-!',
    maknaRingkas: 'Memasukkan benih atau anak pokok ke dalam tanah.',
    ayatContoh: 'Pak Abu menanam anak pokok rambutan di kebun buah-buahannya.',
    pilihanSalah: 'mentanam'
  },
  {
    kata: 'tanam',
    imbuhan: 'peN-',
    hasil: 'penanam',
    rahsiaHuruf: 'Huruf "T" luluh menjadi "N" membentuk kata nama orang/pelaku!',
    maknaRingkas: 'Petani atau pekebun yang mengusahakan tanaman.',
    ayatContoh: 'Penanam sayur organik itu menuai hasil cili yang sangat segar.',
    pilihanSalah: 'pentanam'
  },
  {
    kata: 'tanam',
    imbuhan: 'ber-',
    hasil: 'bertanam',
    rahsiaHuruf: 'Awalan ber- dicantum terus (bertanam bermaksud bercucuk tanam).',
    maknaRingkas: 'Menjalankan aktiviti bercucuk tanam atau berkebun.',
    ayatContoh: 'Penduduk kampung bertanam jagung dan sayuran di tanah lapang.',
    pilihanSalah: 'bernanam'
  },
  {
    kata: 'tanam',
    imbuhan: 'ter-',
    hasil: 'tertanam',
    rahsiaHuruf: 'Awalan ter- dicantum terus menyatakan keadaan siap tertanam.',
    maknaRingkas: 'Tertanam kemas di dalam tanah atau tersemat kukuh.',
    ayatContoh: 'Biji benih jagung itu tertanam sedalam dua inci di dalam pasu.',
    pilihanSalah: 'ternanam'
  },

  // 5. CAT
  {
    kata: 'cat',
    imbuhan: 'meN-',
    hasil: 'mengecat',
    rahsiaHuruf: 'Kata SATU SUKU KATA menerima alomorf khas "menge-"!',
    maknaRingkas: 'Menyapu lapisan warna cat pada permukaan dinding atau kayu.',
    ayatContoh: 'Abang mengecat dinding bilik tidurnya dengan warna biru langit.',
    pilihanSalah: 'mencat'
  },
  {
    kata: 'cat',
    imbuhan: 'peN-',
    hasil: 'pengecat',
    rahsiaHuruf: 'Kata SATU SUKU KATA menerima alomorf khas "penge-"!',
    maknaRingkas: 'Tukang cat atau alat perkakas yang digunakan untuk mengecat.',
    ayatContoh: 'Pengecat rumah itu memakai topi keselamatan semasa bekerja tinggi.',
    pilihanSalah: 'pencat'
  },
  {
    kata: 'cat',
    imbuhan: 'ber-',
    hasil: 'bercat',
    rahsiaHuruf: 'Awalan ber- dicantum terus pada kata dasar satu suku kata (bercat).',
    maknaRingkas: 'Mempunyai lapisan cat atau sudah siap diwarnai cat.',
    ayatContoh: 'Pintu pagar baharu itu bercat warna putih berkilat.',
    pilihanSalah: 'mencat'
  },
  {
    kata: 'cat',
    imbuhan: 'ter-',
    hasil: 'tercat',
    rahsiaHuruf: 'Awalan ter- dicantum terus untuk menyatakan perbuatan tidak sengaja.',
    maknaRingkas: 'Tercat atau terkena warna cat secara tidak sengaja.',
    ayatContoh: 'Seluar sukan adik tercat sedikit semasa duduk di atas bangku taman.',
    pilihanSalah: 'tencat'
  },

  // 6. CUCI
  {
    kata: 'cuci',
    imbuhan: 'meN-',
    hasil: 'mencuci',
    rahsiaHuruf: 'Huruf "C" kekal bersama awalan "men-" (tidak luluh).',
    maknaRingkas: 'Membersihkan kotoran menggunakan sabun dan air mengalir.',
    ayatContoh: 'Adik mencuci kasut sekolahnya pada setiap petang Sabtu.',
    pilihanSalah: 'menyuci'
  },
  {
    kata: 'cuci',
    imbuhan: 'peN-',
    hasil: 'pencuci',
    rahsiaHuruf: 'Huruf "C" kekal bersama awalan "pen-" membentuk kata nama alat/bahan.',
    maknaRingkas: 'Bahan atau perkakas untuk membersihkan kotoran pinggan atau tangan.',
    ayatContoh: 'Ibu menggunakan cecair pencuci yang wangi untuk membasuh pinggan.',
    pilihanSalah: 'penyuci'
  },
  {
    kata: 'cuci',
    imbuhan: 'ter-',
    hasil: 'tercuci',
    rahsiaHuruf: 'Awalan ter- dicantum terus bagi menyatakan perbuatan tidak sengaja.',
    maknaRingkas: 'Tercuci tanpa sengaja bersama pakaian yang lain.',
    ayatContoh: 'Baju putih adik tercuci sekali bersama kemeja merah ayahnya.',
    pilihanSalah: 'ternyici'
  },

  // 7. TULIS
  {
    kata: 'tulis',
    imbuhan: 'meN-',
    hasil: 'menulis',
    rahsiaHuruf: 'Huruf "T" luluh menjadi "N" apabila menerima awalan meN-!',
    maknaRingkas: 'Melahirkan fikiran atau perkataan dengan huruf di atas kertas.',
    ayatContoh: 'Adik menulis sebuah cerita pendek di dalam buku latihannya.',
    pilihanSalah: 'mentulis'
  },
  {
    kata: 'tulis',
    imbuhan: 'peN-',
    hasil: 'penulis',
    rahsiaHuruf: 'Huruf "T" luluh menjadi "N" membentuk kata nama orang (penulis)!',
    maknaRingkas: 'Orang yang mengarang buku, cerpen atau rencana.',
    ayatContoh: 'Penulis terkenal itu mengadakan sesi ramah mesra di dewan sekolah.',
    pilihanSalah: 'pentulis'
  },
  {
    kata: 'tulis',
    imbuhan: 'ber-',
    hasil: 'bertulis',
    rahsiaHuruf: 'Awalan ber- dicantum terus (bertulis = mempunyai tulisan padanya).',
    maknaRingkas: 'Mengandungi tulisan atau catatan pada permukaannya.',
    ayatContoh: 'Kad ucapan hari jadi itu bertulis mesej doa yang sangat manis.',
    pilihanSalah: 'bernulis'
  },
  {
    kata: 'tulis',
    imbuhan: 'ter-',
    hasil: 'tertulis',
    rahsiaHuruf: 'Awalan ter- dicantum terus menyatakan keadaan sudah tercatat.',
    maknaRingkas: 'Sudah tertulis atau tercatat nyata pada sesuatu tempat.',
    ayatContoh: 'Nama semua pemenang telah tertulis di papan kenyataan sekolah.',
    pilihanSalah: 'ternulis'
  },

  // 8. LUKIS
  {
    kata: 'lukis',
    imbuhan: 'meN-',
    hasil: 'melukis',
    rahsiaHuruf: 'Huruf "L" kekal bersama awalan "me-" tanpa perubahan bunyi.',
    maknaRingkas: 'Menghasilkan gambar seni menggunakan pensel atau berus warna.',
    ayatContoh: 'Kakak melukis seekor rama-rama yang cantik pada kertas lukisan.',
    pilihanSalah: 'menlukis'
  },
  {
    kata: 'lukis',
    imbuhan: 'peN-',
    hasil: 'pelukis',
    rahsiaHuruf: 'Huruf "L" kekal bersama awalan "pe-" membentuk kata nama pelaku seni.',
    maknaRingkas: 'Seniman yang mahir menghasilkan lukisan pemandangan atau potret.',
    ayatContoh: 'Pelukis muda itu mempamerkan hasil seninya di galeri bandar raya.',
    pilihanSalah: 'penlukis'
  },
  {
    kata: 'lukis',
    imbuhan: 'ter-',
    hasil: 'terlukis',
    rahsiaHuruf: 'Awalan ter- dicantum terus menyatakan gambaran yang terzahir.',
    maknaRingkas: 'Tergambar atau terukir jelas pada sesuatu permukaan atau wajah.',
    ayatContoh: 'Senyuman penuh kegembiraan terlukis di wajah ibu tercinta.',
    pilihanSalah: 'ternukis'
  },

  // 9. MAIN
  {
    kata: 'main',
    imbuhan: 'ber-',
    hasil: 'bermain',
    rahsiaHuruf: 'Awalan ber- dicantum terus (ber- + main = bermain). Bentuk standard untuk bersukan/berseronok!',
    maknaRingkas: 'Melakukan aktiviti permainan yang menyeronokkan bersama rakan.',
    ayatContoh: 'Murid-murid riang bermain bola sepak di padang sekolah pada waktu petang.',
    pilihanSalah: 'memain'
  },
  {
    kata: 'main',
    imbuhan: 'peN-',
    hasil: 'pemain',
    rahsiaHuruf: 'Kata dasar bermula huruf "M" menerima awalan "pe-" (membentuk kata nama ahli sukan).',
    maknaRingkas: 'Orang yang mengambil bahagian dalam perlawanan sukan atau permainan.',
    ayatContoh: 'Pemain badminton kebangsaan itu berjaya mara ke peringkat akhir.',
    pilihanSalah: 'penmain'
  },
  {
    kata: 'main',
    imbuhan: 'ter-',
    hasil: 'termain',
    rahsiaHuruf: 'Awalan ter- dicantum terus bagi menunjukkan perbuatan tidak sengaja.',
    maknaRingkas: 'Termain sesuatu barang secara tidak sengaja.',
    ayatContoh: 'Adik termain suis televisyen semasa mencari alat kawalan jauh.',
    pilihanSalah: 'temain'
  },

  // 10. JALAN
  {
    kata: 'jalan',
    imbuhan: 'ber-',
    hasil: 'berjalan',
    rahsiaHuruf: 'Awalan ber- dicantum terus (ber- + jalan = berjalan). Kata kerja pergerakan kaki.',
    maknaRingkas: 'Melangkah kaki ke hadapan untuk bergerak dari satu tempat ke tempat lain.',
    ayatContoh: 'Mereka berdua berjalan kaki menyusuri laluan pejalan kaki yang redup.',
    pilihanSalah: 'menjalan'
  },
  {
    kata: 'jalan',
    imbuhan: 'peN-',
    hasil: 'pejalan',
    rahsiaHuruf: 'Huruf "J" menerima awalan "pe-" membentuk frasa "pejalan kaki".',
    maknaRingkas: 'Orang yang berjalan kaki di tepi atau melintas jalan raya.',
    ayatContoh: 'Pejalan kaki hendaklah sentiasa berwaspada dan menggunakan jejantas.',
    pilihanSalah: 'penjalan'
  },

  // 11. LARI
  {
    kata: 'lari',
    imbuhan: 'ber-',
    hasil: 'berlari',
    rahsiaHuruf: 'Awalan ber- dicantum terus (ber- + lari = berlari). Melangkah kaki sangat laju!',
    maknaRingkas: 'Menggerakkan kaki dengan amat laju dan tangkas.',
    ayatContoh: 'Sang Kancil berlari sepantas kilat untuk melepaskan diri daripada sang buaya.',
    pilihanSalah: 'melari'
  },
  {
    kata: 'lari',
    imbuhan: 'peN-',
    hasil: 'pelari',
    rahsiaHuruf: 'Huruf "L" menerima awalan "pe-" membentuk kata nama atlet larian.',
    maknaRingkas: 'Atlet atau orang yang mengambil bahagian dalam perlumbaan lari.',
    ayatContoh: 'Pelari pecut negara berjaya mencatat rekod kejohanan baharu yang cemerlang.',
    pilihanSalah: 'penlari'
  },

  // 12. BINA
  {
    kata: 'bina',
    imbuhan: 'meN-',
    hasil: 'membina',
    rahsiaHuruf: 'Huruf "B" kekal bersama awalan "mem-" (membina = mendirikan bangunan).',
    maknaRingkas: 'Mendirikan atau membuat rumah, jambatan atau struktur kukuh.',
    ayatContoh: 'Pasukan pembina sedang giat membina jambatan gantung merentangi sungai.',
    pilihanSalah: 'menbina'
  },
  {
    kata: 'bina',
    imbuhan: 'peN-',
    hasil: 'pembina',
    rahsiaHuruf: 'Huruf "B" kekal bersama awalan "pem-" membentuk kata nama orang/kontraktor.',
    maknaRingkas: 'Orang atau pihak yang menjalankan usaha membina bangunan.',
    ayatContoh: 'Pembina bangunan itu memastikan semua piawaian keselamatan dipatuhi.',
    pilihanSalah: 'penbina'
  },
  {
    kata: 'bina',
    imbuhan: 'ter-',
    hasil: 'terbina',
    rahsiaHuruf: 'Awalan ter- dicantum terus bagi menunjukkan keadaan sudah siap didirikan.',
    maknaRingkas: 'Telah siap didirikan, dibangunkan atau terwujud.',
    ayatContoh: 'Sebuah balai raya baharu telah terbina dengan jayanya di tengah kampung.',
    pilihanSalah: 'tembina'
  }
];

/**
 * Mendapatkan maklumat gabungan morfologi yang sah mengikut Tatabahasa Bahasa Melayu
 */
export function getKidsCombination(kata: string, imbuhan: string): KidsMorphologyEntry | undefined {
  return KIDS_COMBINATIONS.find(
    (c) => c.kata.toLowerCase() === kata.toLowerCase() && c.imbuhan === imbuhan
  );
}

/**
 * Semak sama ada gabungan kata dasar + imbuhan wujud secara baku
 */
export function isValidKidsCombination(kata: string, imbuhan: string): boolean {
  return Boolean(getKidsCombination(kata, imbuhan));
}

/**
 * Senarai imbuhan yang sah untuk sesuatu kata dasar
 */
export function getValidAffixesForWord(kata: string): string[] {
  return KIDS_COMBINATIONS
    .filter((c) => c.kata.toLowerCase() === kata.toLowerCase())
    .map((c) => c.imbuhan);
}

/**
 * Senarai kata dasar yang sah untuk sesuatu imbuhan
 */
export function getValidWordsForAffix(imbuhan: string): string[] {
  return KIDS_COMBINATIONS
    .filter((c) => c.imbuhan === imbuhan)
    .map((c) => c.kata);
}
