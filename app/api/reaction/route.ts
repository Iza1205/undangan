import { NextResponse } from 'next/server'
import { getAllReactions, toggleReaction } from '@/lib/store'
import type { ReactionType } from '@/lib/store'

const VALID_TYPES: ReactionType[] = ['love', 'suka', 'senyum']

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const doaId = searchParams.get('doaId')
  const all = await getAllReactions()
  const reactions = doaId ? all.filter(r => r.doaId === doaId) : all
  return NextResponse.json({ reactions })
}

export async function POST(request: Request) {
  const body = await request.json()
  if (!body.doaId?.trim()) return NextResponse.json({ error: 'doaId required' }, { status: 400 })
  if (!body.name?.trim()) return NextResponse.json({ error: 'name required' }, { status: 400 })
  if (!VALID_TYPES.includes(body.type)) return NextResponse.json({ error: 'type must be love | suka | senyum' }, { status: 400 })
  const result = await toggleReaction({ doaId: body.doaId.trim(), name: body.name.trim(), type: body.type as ReactionType })
  return NextResponse.json(result, { status: 200 })
}