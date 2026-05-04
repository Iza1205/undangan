// ─────────────────────────────────────────────
//  Gallery Data
//  Tambah / edit foto di sini.
//  Taruh file gambarnya di folder /public/kumpulan/
// ─────────────────────────────────────────────

export type GalleryItem = {
  id: string
  src: string
  caption: string
}

export const galleryItems: GalleryItem[] = [
  {
    id: 'foto-1',
    src: '/kumpulan/a.png',
    caption: '',
  },
  {
    id: 'foto-2',
    src: '/kumpulan/b.png',
    caption: '',
  },
  {
    id: 'foto-3',
    src: '/kumpulan/c.png',
    caption: '',
  },
  {
    id: 'foto-4',
    src: '/kumpulan/d.png',
    caption: '',
  },
  {
    id: 'foto-5',
    src: '/kumpulan/e.png',
    caption: '',
  },
  {
    id: 'foto-6',
    src: '/kumpulan/f.png',
    caption: '',
  },
  {
    id: 'foto-7',
    src: '/kumpulan/g.png',
    caption: '',
  },
  {
    id: 'foto-8',
    src: '/kumpulan/h.png',
    caption: '',
  },
  {
    id: 'foto-9',
    src: '/kumpulan/i.png',
    caption: '',
  },
]