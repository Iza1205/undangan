// lib/store.ts — file-based persistent store
// Data disimpan di data/db.json agar tidak hilang saat hot-reload / restart

import fs from 'fs'
import path from 'path'

/* ── Types ── */

export type Guest = {
  id: string
  name: string
  slug: string
  type: 'umum' | 'vip'
  category: string
  phone: string
  notes: string
  opened: boolean
  openedAt: string | null
  createdAt: string
}

export type RSVP = {
  id: string
  name: string
  attendance: 'hadir' | 'tidak'
  createdAt: string
}

export type Doa = {
  id: string
  name: string
  message: string
  createdAt: string
}

export type ReactionType = 'love' | 'suka' | 'senyum'

export type Reaction = {
  id: string
  doaId: string
  name: string
  type: ReactionType
  createdAt: string
}

type DB = {
  guests: Guest[]
  rsvps: RSVP[]
  doas: Doa[]
  reactions: Reaction[]
}

/* ── File path ── */

const DB_PATH = path.join(process.cwd(), 'data', 'db.json')

/* ── DB helpers ── */

function readDB(): DB {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const initial: DB = { guests: defaultGuests(), rsvps: defaultRsvps(), doas: defaultDoas(), reactions: [] }
      writeDB(initial)
      return initial
    }
    const raw = fs.readFileSync(DB_PATH, 'utf-8')
    const parsed = JSON.parse(raw) as DB
    if (!parsed.doas) parsed.doas = defaultDoas()
    // migrate: pastikan field reactions ada kalau db lama belum punya
    if (!parsed.reactions) parsed.reactions = []
    return parsed
  } catch {
    const initial: DB = { guests: defaultGuests(), rsvps: defaultRsvps(), doas: defaultDoas(), reactions: [] }
    writeDB(initial)
    return initial
  }
}

function writeDB(data: DB): void {
  const dir = path.dirname(DB_PATH)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8')
}

/* ── Helpers ── */

function slugify(name: string, suffix: string): string {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-') +
    '-' +
    suffix
  )
}

function uid(): string {
  return Math.random().toString(36).slice(2, 8)
}

/* ── Default seed data ── */

function defaultGuests(): Guest[] {
  return [
    {
      id: '1',
      name: 'Budi Santoso',
      slug: 'budi-santoso-ab1',
      type: 'vip',
      category: 'Keluarga',
      phone: '6281234567890',
      notes: '',
      opened: false,
      openedAt: null,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Dewi Lestari',
      slug: 'dewi-lestari-cd2',
      type: 'umum',
      category: 'Teman',
      phone: '6289876543210',
      notes: '',
      opened: false,
      openedAt: null,
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Rudi Hermawan',
      slug: 'rudi-hermawan-ef3',
      type: 'umum',
      category: 'Rekan Kerja',
      phone: '6285551234567',
      notes: '',
      opened: false,
      openedAt: null,
      createdAt: new Date().toISOString(),
    },
  ]
}

function defaultRsvps(): RSVP[] {
  return [
    { id: 'r1', name: 'Budi Santoso', attendance: 'hadir', createdAt: new Date().toISOString() },
    { id: 'r2', name: 'Sari Indah',   attendance: 'hadir', createdAt: new Date().toISOString() },
    { id: 'r3', name: 'Reza Pratama', attendance: 'tidak', createdAt: new Date().toISOString() },
  ]
}

function defaultDoas(): Doa[] {
  return [
    { id: 'd1', name: 'Budi Santoso', message: 'Selamat menempuh hidup baru, semoga selalu bahagia dan diberkahi! 🎉', createdAt: new Date().toISOString() },
    { id: 'd2', name: 'Sari Indah',   message: "Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fi khair 💍", createdAt: new Date().toISOString() },
    { id: 'd3', name: 'Reza Pratama', message: 'Mohon maaf tidak bisa hadir, semoga acaranya berjalan lancar 🙏', createdAt: new Date().toISOString() },
  ]
}

/* ══════════════════════════════════════════════
   GUEST FUNCTIONS
══════════════════════════════════════════════ */

export function getAll(): Guest[] {
  return readDB().guests
}

export function getStats() {
  const guests = getAll()
  return {
    total: guests.length,
    opened: guests.filter(g => g.opened).length,
    vip: guests.filter(g => g.type === 'vip').length,
  }
}

export function getBySlug(slug: string): Guest | undefined {
  return getAll().find(g => g.slug === slug)
}

export function getById(id: string): Guest | undefined {
  return getAll().find(g => g.id === id)
}

export function addGuest(data: {
  name: string
  type?: string
  category?: string
  phone?: string
  notes?: string
}): Guest {
  const db = readDB()
  const id = uid()
  const slug = slugify(data.name, uid())
  const guest: Guest = {
    id, slug,
    name: data.name,
    type: data.type === 'vip' ? 'vip' : 'umum',
    category: data.category || '',
    phone: data.phone || '',
    notes: data.notes || '',
    opened: false,
    openedAt: null,
    createdAt: new Date().toISOString(),
  }
  db.guests.push(guest)
  writeDB(db)
  return guest
}

export function importGuests(
  rows: Array<{ name: string; type?: string; category?: string; phone?: string }>
): number {
  const db = readDB()
  let count = 0
  for (const row of rows) {
    if (!row.name?.trim()) continue
    const exists = db.guests.find(g => g.name.toLowerCase() === row.name.toLowerCase())
    if (exists) continue
    const id = uid()
    const slug = slugify(row.name, uid())
    db.guests.push({
      id, slug,
      name: row.name,
      type: row.type === 'vip' ? 'vip' : 'umum',
      category: row.category || '',
      phone: row.phone || '',
      notes: '',
      opened: false,
      openedAt: null,
      createdAt: new Date().toISOString(),
    })
    count++
  }
  writeDB(db)
  return count
}

export function markOpened(slug: string): void {
  const db = readDB()
  const g = db.guests.find(g => g.slug === slug)
  if (g && !g.opened) {
    g.opened = true
    g.openedAt = new Date().toISOString()
    writeDB(db)
  }
}

export function deleteGuest(id: string): boolean {
  const db = readDB()
  const idx = db.guests.findIndex(g => g.id === id)
  if (idx === -1) return false
  db.guests.splice(idx, 1)
  writeDB(db)
  return true
}

/* ══════════════════════════════════════════════
   RSVP FUNCTIONS — hanya konfirmasi kehadiran
══════════════════════════════════════════════ */

export function getAllRsvp(): RSVP[] {
  return readDB().rsvps
}

export function getRsvpStats() {
  const rsvps = getAllRsvp()
  return {
    total: rsvps.length,
    hadir: rsvps.filter(r => r.attendance === 'hadir').length,
    tidak: rsvps.filter(r => r.attendance === 'tidak').length,
  }
}

export function addRsvp(data: { name: string; attendance: 'hadir' | 'tidak' }): RSVP {
  const db = readDB()
  const rsvp: RSVP = {
    id: uid(),
    name: data.name,
    attendance: data.attendance,
    createdAt: new Date().toISOString(),
  }
  db.rsvps.push(rsvp)
  writeDB(db)
  return rsvp
}

export function deleteRsvp(id: string): boolean {
  const db = readDB()
  const idx = db.rsvps.findIndex(r => r.id === id)
  if (idx === -1) return false
  db.rsvps.splice(idx, 1)
  writeDB(db)
  return true
}

/* ══════════════════════════════════════════════
   DOA FUNCTIONS — ucapan & doa, tanpa attendance
══════════════════════════════════════════════ */

export function getAllDoa(): Doa[] {
  return readDB().doas
}

export function getDoaStats() {
  return { total: getAllDoa().length }
}

export function addDoa(data: { name: string; message: string }): Doa {
  const db = readDB()
  const doa: Doa = {
    id: uid(),
    name: data.name,
    message: data.message,
    createdAt: new Date().toISOString(),
  }
  db.doas.push(doa)
  writeDB(db)
  return doa
}

export function deleteDoa(id: string): boolean {
  const db = readDB()
  const idx = db.doas.findIndex(d => d.id === id)
  if (idx === -1) return false
  db.doas.splice(idx, 1)
  writeDB(db)
  return true
}

/* ══════════════════════════════════════════════
   REACTION FUNCTIONS
══════════════════════════════════════════════ */

export function getReactionsByDoaId(doaId: string): Reaction[] {
  return readDB().reactions.filter(r => r.doaId === doaId)
}

export function getAllReactions(): Reaction[] {
  return readDB().reactions
}

export function toggleReaction(data: {
  doaId: string
  name: string
  type: ReactionType
}): { action: 'added' | 'removed'; reaction?: Reaction } {
  const db = readDB()
  const existing = db.reactions.find(
    r => r.doaId === data.doaId && r.name === data.name && r.type === data.type
  )
  if (existing) {
    // toggle off — hapus reaction
    db.reactions = db.reactions.filter(r => r.id !== existing.id)
    writeDB(db)
    return { action: 'removed' }
  }
  // toggle on — tambah reaction
  const reaction: Reaction = {
    id: uid(),
    doaId: data.doaId,
    name: data.name,
    type: data.type,
    createdAt: new Date().toISOString(),
  }
  db.reactions.push(reaction)
  writeDB(db)
  return { action: 'added', reaction }
}