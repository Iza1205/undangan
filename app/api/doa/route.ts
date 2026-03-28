import { NextResponse } from 'next/server'
import { getAllDoa, getDoaStats, addDoa, deleteDoa } from '@/lib/store'

export async function GET() {
  return NextResponse.json({ doas: await getAllDoa(), stats: await getDoaStats() })
}

export async function POST(request: Request) {
  const body = await request.json()
  if (!body.name?.trim()) return NextResponse.json({ error: 'Name required' }, { status: 400 })
  if (!body.message?.trim()) return NextResponse.json({ error: 'Message required' }, { status: 400 })
  const doa = await addDoa({ name: body.name.trim(), message: body.message.trim() })
  return NextResponse.json(doa, { status: 201 })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
  const ok = await deleteDoa(id)
  return ok ? NextResponse.json({ success: true }) : NextResponse.json({ error: 'Not found' }, { status: 404 })
}