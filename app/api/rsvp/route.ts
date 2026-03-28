// app/api/rsvp/route.ts — konfirmasi kehadiran saja

import { NextResponse } from 'next/server'
import { getAllRsvp, getRsvpStats, addRsvp, deleteRsvp } from '@/lib/store'

export async function GET() {
  return NextResponse.json({ rsvps: getAllRsvp(), stats: getRsvpStats() })
}

export async function POST(request: Request) {
  const body = await request.json()

  if (!body.name?.trim()) {
    return NextResponse.json({ error: 'Name required' }, { status: 400 })
  }
  if (!['hadir', 'tidak'].includes(body.attendance)) {
    return NextResponse.json({ error: 'Attendance required' }, { status: 400 })
  }

  const rsvp = addRsvp({
    name: body.name.trim(),
    attendance: body.attendance,
  })
  return NextResponse.json(rsvp, { status: 201 })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
  const ok = deleteRsvp(id)
  return ok
    ? NextResponse.json({ success: true })
    : NextResponse.json({ error: 'Not found' }, { status: 404 })
}