'use client'

import { Suspense } from 'react'
import StoryContent from './StoryContent'
import Loading from '@/app/loading'

export default function StoryPage() {
  return (
    <Suspense fallback={<Loading />}>
      <StoryContent />
    </Suspense>
  )
}