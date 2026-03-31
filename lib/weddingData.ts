// lib/weddingData.ts

export const weddingConfig = {
  groom: {
    slug: 'izam',
    name: 'Iza Mahendra',
    fullName: 'Iza Mahendra, S.E',
    photo: '/mempelai/laki.png',
    father: 'Bpk. Emharis',
    mother: 'Ibu Delmi Yulita',
    childOrder: 'Putra kedua dari 5 bersaudara',
    hobbies: ['Musik', 'Jalan-Jalan', 'Game'],
    personality: 'Sosok yang pendiam, bertanggung jawab, dan penuh perhatian.',
    quote: 'Pelan-pelan adalah cara tercepat untuk sampai ke tujuan.',
    instagram: 'izamhn',
    about: 'Seorang pria sederhana yang percaya bahwa kebahagiaan sejati dimulai dari keluarga. Senang mempelajari hal baru dan senang mengabadikan momen indah.',
  },
  bride: {
    slug: 'nurul',
    name: 'Nurul Fikriyah',
    fullName: 'Nurul Fikriyah, S.Pd, M.Pd',
    photo: '/mempelai/cewe.png',
    father: 'Bpk. H. Syamsudin',
    mother: 'Ibu Hj. Muniah',
    childOrder: 'Putri kedua dari 2 bersaudara',
    hobbies: ['Membaca', 'Memasak', 'Jalan-Jalan'],
    personality: 'Hangat, cerdas, dan selalu membawa kebaikan di sekitarnya.',
    quote: 'Rumah bukan tentang tempatnya, tapi tentang siapa yang ada di dalamnya.',
    instagram: 'fkrnurull',
    about: 'Seorang pendidik yang percaya bahwa ilmu dan kasih sayang adalah bekal terbaik. Mencintai hal-hal kecil yang membuat hidup bermakna.',
  },

  events: [
    {
      id: 'akad',
      name: 'Akad Nikah',
      date: 'Selasa, 02 Juni 2026',
      time: '08.00 WIB',
      color: '#F59E0B',
    },
    {
      id: 'resepsi',
      name: 'Resepsi',
      date: 'Selasa, 02 Juni 2026',
      time: '11.00 WIB',
      color: '#6C63FF',
    },
  ],

  venue: {
    name: 'Gedung Aula Singarajan',
    address: 'Singarajan, Kec. Pontang, Kabupaten Serang, Banten',
    city: 'Kab. Serang',
    region: 'Banten',
    mapsUrl: 'https://maps.google.com/?cid=17711077395956763409&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNl',
    mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.653696584288!2d106.28340287586566!3d-6.015083193970146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e41f16f93a14a47%3A0xf5ca630de7740b11!2sGedung%20Aula%20Singarajan!5e0!3m2!1sid!2sid!4v1711524316315!5m2!1sid!2sid',
  },

  gallery: [
    '/gallery/1.png',
    '/gallery/2.png',
    '/gallery/3.png',
    '/gallery/4.png',
  ],

  gifts: {
    accounts: [
      { bankName: 'Bank BCA', number: '6815259312', holder: 'Iza Mahendra' },
      { bankName: 'Bank BSI', number: '7300495464', holder: 'Nurul Fikriyah' },
    ],
    shipping: {
      receiver: 'Kediaman Nurul Fikriyah',
      address: 'Kp. Singarajan RT/RW 001/001, Desa Singarajan, Kec. Pontang, Kab. serang, Banten 42192',
    },
  },

  countdown: '2026-06-02T08:00:00',
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
}

export type Guest = {
  name: string
  slug: string
}

export function getGuestFromSlug(slug: string): Guest | null {
  if (!slug) return null
  return {
    name: decodeURIComponent(slug).replace(/\+/g, ' '),
    slug,
  }
}