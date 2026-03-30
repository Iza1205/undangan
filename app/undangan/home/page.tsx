'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import UndanganHome from '../UndanganHome'

function HomeGuard() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    const fromCover = sessionStorage.getItem('from_cover')
    if (!fromCover) {
      const guest = searchParams.get('untuk') || 'Tamu Undangan'
      router.replace(`/undangan?untuk=${encodeURIComponent(guest)}`)
    } else {
      setAllowed(true)
    }
  }, [router, searchParams])

  // Belum tahu statusnya — render kosong dulu, jangan tampilkan UndanganHome
  if (!allowed) return null

  return <UndanganHome />
}

export default function UndanganHomePage() {
  return (
    <Suspense fallback={null}>
      <HomeGuard />
    </Suspense>
  )
}