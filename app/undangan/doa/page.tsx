import { Suspense } from 'react'
import DoaContent from './DoaContent'
import Loading from '@/app/loading'

export default function DoaPage() {
  return (
    <Suspense fallback={<Loading />}>
      <DoaContent />
    </Suspense>
  )
}