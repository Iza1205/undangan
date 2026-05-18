import { Suspense } from 'react'
import TerimaKasihContent from './TerimaKasihContent'
import Loading from '@/app/loading'

export default function TerimaKasihPage() {
  return (
    <Suspense fallback={<Loading />}>
      <TerimaKasihContent />
    </Suspense>
  )
}