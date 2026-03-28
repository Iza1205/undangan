'use client'

import { Suspense } from 'react'
import StoryContent from './StoryContent' // Pastikan nama file sudah diganti ke StoryContent.tsx

export default function StoryPage() {
  return (
    <Suspense 
      fallback={
        <div className="app-shell flex items-center justify-center min-h-screen">
          <div className="text-primary text-sm">Memuat Cerita...</div>
        </div>
      }
    >
      <StoryContent />
    </Suspense>
  )
}