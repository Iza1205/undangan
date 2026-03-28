'use client'

import { Suspense } from 'react'
import UndanganHome from '../UndanganHome'

export default function UndanganHomePage() {
  return (
    <Suspense fallback={null}>
      <UndanganHome />
    </Suspense>
  )
}