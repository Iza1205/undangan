import { Suspense } from 'react'
import JadwalContent from './JadwalContent'

export default function JadwalPage() {
  return (
    <Suspense fallback={<div className="app-shell flex items-center justify-center min-h-screen"><div className="text-primary text-sm">Memuat...</div></div>}>
      <JadwalContent />
    </Suspense>
  )
}
