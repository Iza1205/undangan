import { Suspense } from 'react'
import TerimaKasihContent from './TerimaKasihContent'

export default function TerimaKasihPage() {
  return (
    <Suspense fallback={<div className="app-shell flex items-center justify-center min-h-screen"><div className="text-primary text-sm">Memuat...</div></div>}>
      <TerimaKasihContent />
    </Suspense>
  )
}