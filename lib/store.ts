// lib/store.ts — Upstash Redis store
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

/* ── Types ── */
export type Guest = {
  id: string; name: string; slug: string
  type: 'umum' | 'vip'; category: string
  phone: string; notes: string
  opened: boolean; openedAt: string | null; createdAt: string
}
export type RSVP = {
  id: string; name: string
  attendance: 'hadir' | 'tidak'
  notes: string
  createdAt: string
}
export type Doa = {
  id: string; name: string; message: string; createdAt: string
}
export type ReactionType = 'love' | 'suka' | 'senyum'
export type Reaction = {
  id: string; doaId: string; name: string
  type: ReactionType; createdAt: string
}

/* ── Helpers ── */
function uid(): string {
  return Math.random().toString(36).slice(2, 8)
}
function slugify(name: string, suffix: string): string {
  return name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim()
    .replace(/\s+/g, '-') + '-' + suffix
}

/* ══════════════════════════════════════════
   RSVP
══════════════════════════════════════════ */
export async function getAllRsvp(): Promise<RSVP[]> {
  const data = await redis.get<RSVP[]>('rsvps')
  return Array.isArray(data) ? data : []
}
export async function getRsvpStats() {
  const rsvps = await getAllRsvp()
  return {
    total: rsvps.length,
    hadir: rsvps.filter(r => r.attendance === 'hadir').length,
    tidak: rsvps.filter(r => r.attendance === 'tidak').length,
  }
}
export async function addRsvp(data: { name: string; attendance: 'hadir' | 'tidak'; notes?: string }): Promise<RSVP> {
  const rsvps = await getAllRsvp()
  const rsvp: RSVP = {
    id: uid(),
    name: data.name,
    attendance: data.attendance,
    notes: data.notes?.trim() || '',
    createdAt: new Date().toISOString()
  }
  await redis.set('rsvps', [...rsvps, rsvp])
  return rsvp
}
export async function deleteRsvp(id: string): Promise<boolean> {
  const rsvps = await getAllRsvp()
  const filtered = rsvps.filter(r => r.id !== id)
  if (filtered.length === rsvps.length) return false
  await redis.set('rsvps', filtered)
  return true
}

/* ══════════════════════════════════════════
   DOA
══════════════════════════════════════════ */
export async function getAllDoa(): Promise<Doa[]> {
  const data = await redis.get<Doa[]>('doas')
  return Array.isArray(data) ? data : []
}
export async function getDoaStats() {
  return { total: (await getAllDoa()).length }
}
export async function addDoa(data: { name: string; message: string }): Promise<Doa> {
  const doas = await getAllDoa()
  const doa: Doa = { id: uid(), name: data.name, message: data.message, createdAt: new Date().toISOString() }
  await redis.set('doas', [...doas, doa])
  return doa
}
export async function deleteDoa(id: string): Promise<boolean> {
  const doas = await getAllDoa()
  const filtered = doas.filter(d => d.id !== id)
  if (filtered.length === doas.length) return false
  await redis.set('doas', filtered)
  return true
}

/* ══════════════════════════════════════════
   REACTIONS
══════════════════════════════════════════ */
export async function getAllReactions(): Promise<Reaction[]> {
  const data = await redis.get<Reaction[]>('reactions')
  return Array.isArray(data) ? data : []
}
export async function toggleReaction(data: { doaId: string; name: string; type: ReactionType }) {
  const reactions = await getAllReactions()
  const existing = reactions.find(
    r => r.doaId === data.doaId && r.name === data.name && r.type === data.type
  )
  if (existing) {
    await redis.set('reactions', reactions.filter(r => r.id !== existing.id))
    return { action: 'removed' as const }
  }
  const reaction: Reaction = { id: uid(), doaId: data.doaId, name: data.name, type: data.type, createdAt: new Date().toISOString() }
  await redis.set('reactions', [...reactions, reaction])
  return { action: 'added' as const, reaction }
}

/* ══════════════════════════════════════════
   GUESTS
══════════════════════════════════════════ */
export async function getAll(): Promise<Guest[]> {
  const data = await redis.get<Guest[]>('guests')
  return Array.isArray(data) ? data : []
}
export async function getBySlug(slug: string) {
  return (await getAll()).find(g => g.slug === slug)
}
export async function getById(id: string) {
  return (await getAll()).find(g => g.id === id)
}
export async function getStats() {
  const guests = await getAll()
  return {
    total: guests.length,
    opened: guests.filter(g => g.opened).length,
    vip: guests.filter(g => g.type === 'vip').length,
  }
}
export async function addGuest(data: { name: string; type?: string; category?: string; phone?: string; notes?: string }): Promise<Guest> {
  const guests = await getAll()
  const id = uid()
  const guest: Guest = {
    id, slug: slugify(data.name, uid()),
    name: data.name, type: data.type === 'vip' ? 'vip' : 'umum',
    category: data.category || '', phone: data.phone || '',
    notes: data.notes || '', opened: false, openedAt: null,
    createdAt: new Date().toISOString(),
  }
  await redis.set('guests', [...guests, guest])
  return guest
}
export async function markOpened(slug: string): Promise<void> {
  const guests = await getAll()
  const g = guests.find(g => g.slug === slug)
  if (g && !g.opened) {
    g.opened = true
    g.openedAt = new Date().toISOString()
    await redis.set('guests', guests)
  }
}
export async function deleteGuest(id: string): Promise<boolean> {
  const guests = await getAll()
  const filtered = guests.filter(g => g.id !== id)
  if (filtered.length === guests.length) return false
  await redis.set('guests', filtered)
  return true
}
export async function importGuests(rows: Array<{ name: string; type?: string; category?: string; phone?: string }>): Promise<number> {
  const guests = await getAll()
  let count = 0
  for (const row of rows) {
    if (!row.name?.trim()) continue
    if (guests.find(g => g.name.toLowerCase() === row.name.toLowerCase())) continue
    const id = uid()
    guests.push({
      id, slug: slugify(row.name, uid()), name: row.name,
      type: row.type === 'vip' ? 'vip' : 'umum',
      category: row.category || '', phone: row.phone || '',
      notes: '', opened: false, openedAt: null,
      createdAt: new Date().toISOString(),
    })
    count++
  }
  await redis.set('guests', guests)
  return count
}