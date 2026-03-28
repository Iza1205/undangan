import { NextResponse } from 'next/server'
import { deleteGuest } from '@/lib/store'

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const ok = deleteGuest(params.id)
  if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ success: true })
}
