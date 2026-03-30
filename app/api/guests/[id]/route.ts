import { NextResponse } from 'next/server'
import { markOpened, deleteGuest } from '@/lib/store'

export async function POST(request: Request) {
  const { slug } = await request.json()
  if (!slug) return NextResponse.json({ error: 'slug required' }, { status: 400 })
  markOpened(slug)
  return NextResponse.json({ success: true })
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  const deleted = await deleteGuest(id)
  if (!deleted) return NextResponse.json({ error: 'Guest not found' }, { status: 404 })
  return NextResponse.json({ success: true })
}