// ─────────────────────────────────────────────
//  Gallery Data
//  Tambah / edit foto di sini.
//  Taruh file gambarnya di folder /public/gallery/
// ─────────────────────────────────────────────

export type GalleryCategory = 'Semua' | 'Kuliah' | 'Jalan-Jalan' | 'Seru-Seruan' | 'Jogja' | 'Serang'

export type GalleryItem = {
  id: string
  src: string
  caption: string
  category: Exclude<GalleryCategory, 'Semua'>
}

export const galleryItems: GalleryItem[] = [
  // ── Kuliah ──
  {
    id: 'kul-1',
    src: '/gallery/1.png',
    caption: 'Hari pertama ketemu di kampus',
    category: 'Kuliah',
  },
  {
    id: 'kul-2',
    src: '/gallery/2.png',
    caption: 'Nunggu kelas bareng di koridor',
    category: 'Kuliah',
  },
  {
    id: 'kul-3',
    src: '/gallery/3.png',
    caption: 'Begadang ngerjain tugas kelompok',
    category: 'Kuliah',
  },
  {
    id: 'kul-4',
    src: '/gallery/4.png',
    caption: 'Wisuda — akhirnya kelar juga!',
    category: 'Kuliah',
  },

  // ── Jalan-Jalan ──
  {
    id: 'jj-1',
    src: '/gallery/1.png',
    caption: 'Road trip dadakan ke pantai',
    category: 'Jalan-Jalan',
  },
  {
    id: 'jj-2',
    src: '/gallery/2.png',
    caption: 'Naik gunung, capek tapi worth it',
    category: 'Jalan-Jalan',
  },
  {
    id: 'jj-3',
    src: '/gallery/3.png',
    caption: 'Eksplorasi kota tua berdua',
    category: 'Jalan-Jalan',
  },

  // ── Seru-Seruan ──
  {
    id: 'ser-1',
    src: '/gallery/1.png',
    caption: 'Ultah kejutan yang hampir ketahuan',
    category: 'Seru-Seruan',
  },
  {
    id: 'ser-2',
    src: '/gallery/2.png',
    caption: 'Nonton konser bareng geng',
    category: 'Seru-Seruan',
  },
  {
    id: 'ser-3',
    src: '/gallery/3.png',
    caption: 'Main hujan-hujanan kayak bocah',
    category: 'Seru-Seruan',
  },
  {
    id: 'ser-4',
    src: '/gallery/4.png',
    caption: 'Masak bareng, hasilnya berantakan',
    category: 'Seru-Seruan',
  },

  // ── Jogja ──
  {
    id: 'jog-1',
    src: '/gallery/1.png',
    caption: 'Sarapan gudeg di Malioboro',
    category: 'Jogja',
  },
  {
    id: 'jog-2',
    src: '/gallery/2.png',
    caption: 'Senja di Prambanan',
    category: 'Jogja',
  },
  {
    id: 'jog-3',
    src: '/gallery/3.png',
    caption: 'Naik becak keliling kraton',
    category: 'Jogja',
  },

  // ── Serang ──
  {
    id: 'ser-a',
    src: '/gallery/1.png',
    caption: 'Pulang kampung bareng',
    category: 'Serang',
  },
  {
    id: 'ser-b',
    src: '/gallery/2.png',
    caption: 'Kulineran di alun-alun Serang',
    category: 'Serang',
  },
  {
    id: 'ser-c',
    src: '/gallery/3.png',
    caption: 'Foto bareng keluarga di rumah',
    category: 'Serang',
  },
]

export const categories: GalleryCategory[] = [
  'Semua', 'Kuliah', 'Jalan-Jalan', 'Seru-Seruan', 'Jogja', 'Serang',
]