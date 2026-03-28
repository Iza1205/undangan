'use client'

import { useSearchParams } from 'next/navigation'
import BottomNav from '@/components/BottomNav'
import SectionHeader   from '@/components/sections/SectionHeader'
import SectionHero     from '@/components/sections/SectionHero'
import SectionKepada   from '@/components/sections/SectionKepada'
import SectionMempelai from '@/components/sections/SectionMempelai'
import SectionJadwal   from '@/components/sections/SectionJadwal'
import SectionLokasi   from '@/components/sections/SectionLokasi'
import SectionGallery  from '@/components/sections/SectionGallery'
import SectionGift     from '@/components/sections/SectionGift'
import SectionDoa      from '@/components/sections/SectionDoa'
import SectionCredit   from '@/components/sections/SectionCredit'

export default function UndanganHome() {
  const searchParams = useSearchParams()
  const guest = searchParams.get('untuk') || 'Tamu Undangan'
  const q = `?untuk=${encodeURIComponent(guest)}`

  return (
    <div className="app-shell">
      <div className="page-content">
        <SectionHeader />
        <SectionHero     q={q} />
        <SectionKepada   guest={guest} />
        <SectionMempelai q={q} />
        <SectionJadwal   q={q} />
        <SectionLokasi   q={q} />
        <SectionGallery />
        <SectionGift />
        <SectionDoa      q={q} guest={guest} />
        <SectionCredit />
      </div>
      <BottomNav guestName={guest} />
    </div>
  )
}