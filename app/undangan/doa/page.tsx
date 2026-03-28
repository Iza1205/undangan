import { Suspense } from 'react'
import DoaContent from './DoaContent'

export default function DoaPage() {
  return (
    <Suspense fallback={<div className="app-shell flex items-center justify-center min-h-screen"><div className="text-primary text-sm">Memuat...</div></div>}>
      <DoaContent />
    </Suspense>
  )
}
