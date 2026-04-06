// ─────────────────────────────────────────────
//  Gallery Data
//  Tambah / edit foto di sini.
//  Taruh file gambarnya di folder /public/kumpulan/
// ─────────────────────────────────────────────

export type GalleryCategory = 'Semua' | 'Kuliah' | 'Jalan-Jalan' | 'Seru-Seruan' | 'Jogja' | 'Serang'

export type GalleryItem = {
  id: string
  src: string
  caption: string
  category: Exclude<GalleryCategory, 'Semua'>
}

export const galleryItems: GalleryItem[] = [
  {
    id: 'foto-1',
    src: '/kumpulan/1.png',
    caption: '',
    category: 'Kuliah',
  },
  {
    id: 'foto-2',
    src: '/kumpulan/2.png',
    caption: '',
    category: 'Kuliah',
  },
  {
    id: 'foto-3',
    src: '/kumpulan/3.png',
    caption: '',
    category: 'Jalan-Jalan',
  },
  {
    id: 'foto-4',
    src: '/kumpulan/4.png',
    caption: '',
    category: 'Jalan-Jalan',
  },
  {
    id: 'foto-5',
    src: '/kumpulan/5.png',
    caption: '',
    category: 'Seru-Seruan',
  },
  {
    id: 'foto-6',
    src: '/kumpulan/6.png',
    caption: '',
    category: 'Seru-Seruan',
  },
  {
    id: 'foto-7',
    src: '/kumpulan/7.png',
    caption: '',
    category: 'Jogja',
  },
  {
    id: 'foto-8',
    src: '/kumpulan/8.png',
    caption: '',
    category: 'Serang',
  },
  {
    id: 'foto-9',
    src: '/kumpulan/9.png',
    caption: '',
    category: 'Serang',
  },
]

export const categories: GalleryCategory[] = [
  'Semua', 'Kuliah', 'Jalan-Jalan', 'Seru-Seruan', 'Jogja', 'Serang',
]