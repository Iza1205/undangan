import { NextResponse } from 'next/server'
import { getAll, getStats, addGuest } from '@/lib/store'

export async function GET() {
  return NextResponse.json({ guests: await getAll(), stats: await getStats() })
}

export async function POST(request: Request) {
  const body = await request.json()
  if (!body.name?.trim()) {
    return NextResponse.json({ error: 'Name required' }, { status: 400 })
  }
  const guest = await addGuest(body)
  return NextResponse.json(guest, { status: 201 })
}