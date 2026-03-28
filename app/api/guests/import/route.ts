import { NextResponse } from 'next/server'
import { importGuests } from '@/lib/store'

export async function POST(request: Request) {
  const body = await request.json()
  const { guests } = body
  if (!Array.isArray(guests)) {
    return NextResponse.json({ error: 'guests array required' }, { status: 400 })
  }
  const count = importGuests(guests)
  return NextResponse.json({ imported: count })
}
