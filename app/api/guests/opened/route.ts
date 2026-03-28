import { NextResponse } from 'next/server'
import { markOpened } from '@/lib/store'

export async function POST(request: Request) {
  const { slug } = await request.json()
  if (!slug) return NextResponse.json({ error: 'slug required' }, { status: 400 })
  await markOpened(slug)
  return NextResponse.json({ success: true })
}