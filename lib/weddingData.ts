// lib/weddingData.ts

export const weddingConfig = {
  groom: {
    name: 'Iza Mahendra',
    fullName: 'Iza Mahendra, S.E',
    father: 'Bpk. Emharis',
    mother: 'Ibu Delmi Yulita',
  },
  bride: {
    name: 'Nurul Fikriyah',
    fullName: 'Nurul Fikriyah, S.Pd, M.Pd',
    father: 'Bpk. Syamsudin',
    mother: 'Ibu Nurul Hidayah',
  },
  
  // --- DATA CERITA CINTA ---
  stories: [
    {
      date: '2023',
      title: 'Awal Pertemuan',
      description: 'Pertemuan yang tidak disengaja namun berkesan, menjadi langkah awal dari segalanya.',
      image: '/gallery/1.png' // Gunakan path foto dari folder public
    },
    {
      date: '2023',
      title: 'Menjalin Komitmen',
      description: 'Memutuskan untuk berjalan bersama, saling menguatkan dan tumbuh dalam cinta.',
      image: '/gallery/2.png'
    },
    {
      date: '2 Juni 2026',
      title: 'Menuju Hari Bahagia',
      description: 'Setelah perjalanan panjang, kami akhirnya sampai di titik untuk memulai babak baru sebagai suami istri.',
      image: '/gallery/3.png'
    }
  ],

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
      { bankName: 'Bank BCA', number: '1234567890', holder: 'Iza Mahendra' },
      { bankName: 'Bank Mandiri', number: '0987654321', holder: 'Nurul Fikriyah' },
    ],
    shipping: {
      receiver: 'Kediaman Nurul Fikriyah',
      address: 'Kp. Singarajan RT/RW 001/001, Desa Singarajan, Kec. Pontang, Kab. serang, Banten 42192',
    }
  },
  countdown: '2026-06-02T08:00:00',
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
}

// ... sisanya (Guest type, functions) tetap sama