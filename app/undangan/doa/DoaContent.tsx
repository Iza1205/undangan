'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { weddingConfig } from '@/lib/weddingData'
import BottomNav from '@/components/BottomNav'
import { ArrowLeft, Send, CheckCircle, Heart, ChevronDown, Plus } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

const labelStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 500, color: 'var(--ink-3)',
  letterSpacing: '0.06em', textTransform: 'uppercase',
  display: 'block', marginBottom: 6,
}
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 12px',
  background: 'var(--bg)', border: '1px solid var(--border)',
  borderRadius: 8, fontSize: 13, fontWeight: 400,
  color: 'var(--ink-1)', fontFamily: 'var(--font)',
  outline: 'none', marginBottom: 12,
}

type ReactionType = 'love' | 'suka' | 'senyum'
type Reaction = { id: string; doaId: string; name: string; type: ReactionType; createdAt: string }
type Doa = { id: string; name: string; message: string; createdAt: string }

const REACTION_EMOJI: Record<ReactionType, string> = { love: '❤️', suka: '👍', senyum: '😊' }

function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (diff < 60)    return 'Baru saja'
  if (diff < 3600)  return `${Math.floor(diff / 60)} menit lalu`
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`
  return `${Math.floor(diff / 86400)} hari lalu`
}

const AVATAR_COLORS = [
  { bg: '#EDE9FE', color: '#7C3AED' },
  { bg: '#FCE7F3', color: '#BE185D' },
  { bg: '#D1FAE5', color: '#065F46' },
  { bg: '#FEF3C7', color: '#92400E' },
  { bg: '#DBEAFE', color: '#1E40AF' },
  { bg: '#FFE4E6', color: '#9F1239' },
]
function avatarColor(name: string) {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length]
}

function groupReactions(reactions: Reaction[]): Record<string, Record<ReactionType, string[]>> {
  const result: Record<string, Record<ReactionType, string[]>> = {}
  for (const r of reactions) {
    if (!result[r.doaId]) result[r.doaId] = { love: [], suka: [], senyum: [] }
    result[r.doaId][r.type].push(r.name)
  }
  return result
}

function playSuccess() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    const times = [0, 0.12, 0.24]
    const freqs = [520, 660, 800]
    times.forEach((t, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.frequency.value = freqs[i]
      osc.type = 'sine'
      gain.gain.setValueAtTime(0.3, ctx.currentTime + t)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.18)
      osc.start(ctx.currentTime + t)
      osc.stop(ctx.currentTime + t + 0.2)
    })
  } catch { /* silent */ }
}

function ReactionRow({ doaId, guest, rxMap, reactionLoading, tooltip, onReact, onTooltip, onTooltipClear }: {
  doaId: string; guest: string; rxMap: Record<ReactionType, string[]>
  reactionLoading: string | null; tooltip: { doaId: string; type: ReactionType } | null
  onReact: (doaId: string, type: ReactionType) => void
  onTooltip: (doaId: string, type: ReactionType) => void
  onTooltipClear: () => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const activeTypes = (Object.keys(REACTION_EMOJI) as ReactionType[]).filter(t => rxMap[t].length > 0)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <div ref={ref} style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, flexWrap: 'wrap', position: 'relative' }}>
      {activeTypes.map(type => {
        const names = rxMap[type]; const count = names.length
        const isMine = names.includes(guest)
        const isTooltipVisible = tooltip?.doaId === doaId && tooltip?.type === type
        return (
          <div key={type} style={{ position: 'relative' }}>
            {isTooltipVisible && count > 0 && (
              <div className="rx-tooltip">
                {names.slice(0, 5).join(', ')}{names.length > 5 ? ` +${names.length - 5}` : ''}
              </div>
            )}
            <button className={`rx-btn${isMine ? ' active' : ''}`}
              disabled={reactionLoading === `${doaId}_${type}`}
              onClick={() => onReact(doaId, type)}
              onMouseEnter={() => count > 0 && onTooltip(doaId, type)}
              onMouseLeave={onTooltipClear}
              onTouchStart={() => count > 0 && onTooltip(doaId, type)}
              onTouchEnd={() => setTimeout(onTooltipClear, 1500)}
            >
              <span style={{ fontSize: 14, lineHeight: 1 }}>{REACTION_EMOJI[type]}</span>
              <span style={{ fontSize: 11, fontWeight: 600, minWidth: 10 }}>{count}</span>
            </button>
          </div>
        )
      })}
      <div style={{ position: 'relative' }}>
        <button className="rx-btn" onClick={() => setOpen(o => !o)} style={{ padding: '3px 7px' }}>
          <Plus size={12} />
        </button>
        {open && (
          <div style={{ position: 'absolute', bottom: 'calc(100% + 8px)', left: 0, display: 'flex', gap: 4, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 24, padding: '5px 8px', boxShadow: '0 4px 16px rgba(0,0,0,0.10)', zIndex: 20, animation: 'pickerPop 0.18s ease both' }}>
            {(Object.keys(REACTION_EMOJI) as ReactionType[]).map((type, i) => {
              const isMine = rxMap[type].includes(guest)
              return (
                <button key={type} onClick={() => { onReact(doaId, type); setOpen(false) }}
                  style={{ width: 36, height: 36, borderRadius: '50%', border: isMine ? '2px solid var(--accent)' : '2px solid transparent', background: isMine ? 'var(--accent-bg)' : 'transparent', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.12s', animation: `emojiIn 0.2s ease ${i * 40}ms both` }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.25)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  {REACTION_EMOJI[type]}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default function DoaContent() {
  const searchParams = useSearchParams()
  const guest  = searchParams.get('untuk') || 'Tamu Undangan'
  const router = useRouter()
  const { groom, bride } = weddingConfig

  const rsvpKey = `rsvp_submitted_${guest}`
  const doaKey  = `doa_submitted_${guest}`

  const [rsvpName, setRsvpName]          = useState(guest !== 'Tamu Undangan' ? guest : '')
  const [attendance, setAtt]             = useState<'hadir' | 'tidak' | null>(null)
  const [rsvpNotes, setRsvpNotes]        = useState('')
  const [rsvpSubmitted, setRsvpSub]      = useState(false)
  const [rsvpSubmitting, setRsvpSending] = useState(false)
  const [rsvpError, setRsvpError]        = useState('')

  const [doaName, setDoaName]            = useState(guest !== 'Tamu Undangan' ? guest : '')
  const [message, setMessage]            = useState('')
  const [doaSubmitted, setDoaSub]        = useState(false)
  const [doaSubmitting, setDoaSending]   = useState(false)
  const [doaError, setDoaError]          = useState('')

  const [doas, setDoas]                  = useState<Doa[]>([])
  const [feedLoading, setFeedLoading]    = useState(true)
  const [newId, setNewId]                = useState<string | null>(null)
  const feedBottomRef                    = useRef<HTMLDivElement>(null)

  const [reactions, setReactions]        = useState<Record<string, Record<ReactionType, string[]>>>({})
  const [reactionLoading, setRxLoading]  = useState<string | null>(null)
  const [tooltip, setTooltip]            = useState<{ doaId: string; type: ReactionType } | null>(null)

  useEffect(() => {
    try {
      if (localStorage.getItem(rsvpKey) === 'true') setRsvpSub(true)
      if (localStorage.getItem(doaKey)  === 'true') setDoaSub(true)
    } catch { /* storage not available */ }
  }, [rsvpKey, doaKey])

  const fetchDoas = async () => {
    try {
      const r = await fetch('/api/doa')
      const d = await r.json()
      setDoas((d.doas ?? []).slice().reverse())
    } catch { /* silent */ } finally { setFeedLoading(false) }
  }

  const fetchReactions = async () => {
    try {
      const r = await fetch('/api/reaction')
      const d = await r.json()
      setReactions(groupReactions(d.reactions ?? []))
    } catch { /* silent */ }
  }

  useEffect(() => {
    fetchDoas()
    fetchReactions()
    const interval = setInterval(fetchReactions, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleRsvpSubmit = async () => {
    if (!attendance) return
    setRsvpSending(true)
    setRsvpError('')
    try {
      const r = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: rsvpName.trim() || guest,
          attendance,
          notes: rsvpNotes.trim(),
        }),
      })
      if (r.ok) {
        setRsvpSub(true)
        playSuccess()
        try { localStorage.setItem(rsvpKey, 'true') } catch { /* silent */ }
      } else {
        const e = await r.json(); setRsvpError(e.error || 'Gagal mengirim, coba lagi.')
      }
    } catch { setRsvpError('Gagal mengirim, coba lagi.') }
    finally { setRsvpSending(false) }
  }

  const handleDoaSubmit = async () => {
    if (!message.trim()) return
    setDoaSending(true)
    setDoaError('')
    try {
      const r = await fetch('/api/doa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: doaName.trim() || guest, message: message.trim() }),
      })
      if (r.ok) {
        const newDoa: Doa = await r.json()
        setDoaSub(true)
        playSuccess()
        try { localStorage.setItem(doaKey, 'true') } catch { /* silent */ }
        setNewId(newDoa.id)
        setDoas(prev => [newDoa, ...prev])
        setTimeout(() => {
          feedBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
          setTimeout(() => setNewId(null), 1200)
        }, 200)
      } else {
        const e = await r.json()
        setDoaError(e.error || 'Gagal mengirim, coba lagi.')
      }
    } catch { setDoaError('Gagal mengirim, coba lagi.') }
    finally { setDoaSending(false) }
  }

  const handleReaction = async (doaId: string, type: ReactionType) => {
    const key = `${doaId}_${type}`
    if (reactionLoading === key) return
    setRxLoading(key)
    const name = guest
    setReactions(prev => {
      const curr = prev[doaId] ?? { love: [], suka: [], senyum: [] }
      const list = curr[type]
      const already = list.includes(name)
      return { ...prev, [doaId]: { ...curr, [type]: already ? list.filter(n => n !== name) : [...list, name] } }
    })
    try {
      await fetch('/api/reaction', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ doaId, name, type }) })
      await fetchReactions()
    } catch { /* silent */ }
    finally { setRxLoading(null) }
  }

  return (
    <div className="app-shell">
      <style suppressHydrationWarning>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.45; } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bounceY { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(4px); } }
        @keyframes scalePop { 0% { opacity: 0; transform: scale(0.94); } 60% { transform: scale(1.02); } 100% { opacity: 1; transform: scale(1); } }
        @keyframes reactionPop { 0% { transform: scale(0.7); opacity: 0; } 60% { transform: scale(1.25); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes pickerPop { 0% { opacity: 0; transform: scale(0.85) translateY(4px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes emojiIn { 0% { opacity: 0; transform: scale(0.5) translateY(6px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
        input:focus, textarea:focus { border-color: var(--accent) !important; box-shadow: 0 0 0 3px rgba(var(--accent-rgb), 0.12) !important; transition: border-color 0.2s, box-shadow 0.2s; }
        button:active:not(:disabled) { transform: scale(0.97) !important; }
        .att-btn:hover:not([data-selected="true"]) { border-color: var(--accent) !important; color: var(--accent) !important; }
        .anim-success { animation: scalePop 0.35s ease both; }
        .rx-btn { display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px; border-radius: 20px; border: 1px solid var(--border); background: var(--bg); font-size: 12px; cursor: pointer; font-family: var(--font); transition: all 0.15s; color: var(--ink-3); line-height: 1; }
        .rx-btn:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-bg); }
        .rx-btn.active { border-color: var(--accent); background: var(--accent-bg); color: var(--accent); font-weight: 600; animation: reactionPop 0.25s ease both; }
        .rx-tooltip { position: absolute; bottom: calc(100% + 6px); left: 0; background: var(--ink-1); color: #fff; font-size: 11px; padding: 5px 8px; border-radius: 6px; white-space: nowrap; pointer-events: none; animation: slideDown 0.2s ease both; z-index: 10; max-width: 200px; overflow: hidden; text-overflow: ellipsis; }
        .rx-tooltip::after { content: ''; position: absolute; top: 100%; left: 12px; border: 5px solid transparent; border-top-color: var(--ink-1); }
      `}</style>

      <div className="page-content" style={{ padding: '0 20px 100px' }}>
        <div className="fade-up" style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 52, paddingBottom: 24 }}>
          <button onClick={() => router.back()} style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <ArrowLeft size={15} color="var(--ink-2)" />
          </button>
          <div>
            <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink-1)', letterSpacing: '-0.02em' }}>Ucapan &amp; Konfirmasi</p>
            <p style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 1 }}>untuk {groom.name} &amp; {bride.name}</p>
          </div>
        </div>

        {/* RSVP Form */}
        {!rsvpSubmitted ? (
          <div className="card fade-up-delay-1" style={{ padding: '18px', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <span style={{ fontSize: 16 }}>📋</span>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-1)', letterSpacing: '-0.02em' }}>Konfirmasi Kehadiran</p>
            </div>
            <label style={labelStyle}>Nama</label>
            <input style={inputStyle} placeholder="Nama kamu..." value={rsvpName} onChange={e => setRsvpName(e.target.value)} />
            <label style={labelStyle}>Apakah kamu hadir?</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
              {[{ v: 'hadir', label: '✅ Hadir' }, { v: 'tidak', label: '❌ Tidak Hadir' }].map(({ v, label }) => (
                <button key={v} onClick={() => { setAtt(v as 'hadir' | 'tidak'); setRsvpNotes('') }}
                  className="att-btn"
                  data-selected={attendance === v ? 'true' : 'false'}
                  style={{ padding: '10px', borderRadius: 8, border: '1px solid', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font)', transition: 'all 0.15s', borderColor: attendance === v ? 'var(--accent)' : 'var(--border)', background: attendance === v ? 'var(--accent-bg)' : 'var(--bg)', color: attendance === v ? 'var(--accent)' : 'var(--ink-2)' }}
                >{label}</button>
              ))}
            </div>

            {/* Notes field - muncul setelah pilih */}
            {attendance && (
              <div style={{ marginBottom: 14, animation: 'scalePop 0.25s ease both' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <label style={{ ...labelStyle, marginBottom: 0 }}>
                    {attendance === 'hadir' ? 'Berapa yang hadir?' : 'Alasan tidak bisa hadir'}
                  </label>
                  <span style={{ fontSize: 10, color: 'var(--ink-3)', fontStyle: 'italic' }}>Tidak wajib diisi</span>
                </div>
                <input
                  style={{ ...inputStyle, marginBottom: 0 }}
                  placeholder={attendance === 'hadir' ? 'Contoh: 2 orang' : 'Contoh: Maaf sedang di luar kota'}
                  value={rsvpNotes}
                  onChange={e => setRsvpNotes(e.target.value)}
                />
              </div>
            )}

            {rsvpError && <p style={{ fontSize: 12, color: '#DC2626', marginBottom: 10 }}>{rsvpError}</p>}
            <button onClick={handleRsvpSubmit} disabled={!attendance || rsvpSubmitting}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '12px', borderRadius: 8, border: 'none', background: attendance ? 'var(--accent)' : 'var(--border)', color: attendance ? '#fff' : 'var(--ink-3)', fontSize: 13, fontWeight: 600, cursor: attendance && !rsvpSubmitting ? 'pointer' : 'not-allowed', fontFamily: 'var(--font)', transition: 'all 0.15s', opacity: rsvpSubmitting ? 0.7 : 1 }}
            >
              <Send size={13} />
              {rsvpSubmitting ? 'Mengirim...' : 'Kirim Konfirmasi'}
            </button>
          </div>
        ) : (
          <div className="card anim-success" style={{ padding: '20px 18px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <CheckCircle size={28} color="#059669" style={{ flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-1)' }}>Konfirmasi Terkirim! 🎉</p>
              <p style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>
                {attendance === 'hadir' ? 'Sampai jumpa di hari bahagia kami 💍' : 'Terima kasih sudah memberitahu kami 🙏'}
              </p>
            </div>
          </div>
        )}

        {/* Doa Form */}
        {!doaSubmitted ? (
          <div className="card fade-up-delay-2" style={{ padding: '18px', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <span style={{ fontSize: 16 }}>🤲</span>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-1)', letterSpacing: '-0.02em' }}>Ucapan &amp; Doa</p>
            </div>
            <label style={labelStyle}>Nama</label>
            <input style={inputStyle} placeholder="Nama kamu..." value={doaName} onChange={e => setDoaName(e.target.value)} />
            <label style={labelStyle}>Tulis ucapan terbaikmu</label>
            <textarea style={{ ...inputStyle, resize: 'none' }} rows={4} placeholder="Semoga selalu bahagia dan diberkahi... 🙏" value={message} onChange={e => setMessage(e.target.value)} />
            {doaError && <p style={{ fontSize: 12, color: '#DC2626', marginBottom: 10 }}>{doaError}</p>}
            <button onClick={handleDoaSubmit} disabled={!message.trim() || doaSubmitting}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '12px', borderRadius: 8, border: 'none', background: message.trim() ? 'var(--accent)' : 'var(--border)', color: message.trim() ? '#fff' : 'var(--ink-3)', fontSize: 13, fontWeight: 600, cursor: message.trim() && !doaSubmitting ? 'pointer' : 'not-allowed', fontFamily: 'var(--font)', transition: 'all 0.15s', opacity: doaSubmitting ? 0.7 : 1 }}
            >
              <Heart size={13} />
              {doaSubmitting ? 'Mengirim...' : 'Kirim Ucapan'}
            </button>
          </div>
        ) : (
          <div className="card anim-success" style={{ padding: '20px 18px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <CheckCircle size={28} color="var(--accent)" style={{ flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-1)' }}>Ucapan Terkirim! 🙏</p>
              <p style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>Terima kasih atas doa dan ucapanmu</p>
            </div>
          </div>
        )}

        {/* Feed */}
        <div className="fade-up-delay-3" style={{ marginTop: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              💌 {feedLoading ? '...' : doas.length} Ucapan
            </p>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            {!feedLoading && doas.length > 0 && (
              <button onClick={() => feedBottomRef.current?.scrollIntoView({ behavior: 'smooth' })}
                style={{ flexShrink: 0, width: 28, height: 28, borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', animation: 'bounceY 1.6s ease-in-out infinite' }}
              >
                <ChevronDown size={14} color="var(--ink-3)" />
              </button>
            )}
          </div>

          {feedLoading && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[80, 60, 72].map((w, i) => (
                <div key={i} className="card" style={{ padding: '14px 16px', display: 'flex', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--border)', flexShrink: 0, animation: 'pulse 1.4s ease-in-out infinite' }} />
                  <div style={{ flex: 1, paddingTop: 2 }}>
                    <div style={{ width: '35%', height: 10, background: 'var(--border)', borderRadius: 4, marginBottom: 9, animation: 'pulse 1.4s ease-in-out infinite' }} />
                    <div style={{ width: `${w}%`, height: 9, background: 'var(--border)', borderRadius: 4, marginBottom: 6, animation: 'pulse 1.4s ease-in-out infinite' }} />
                    <div style={{ width: '50%', height: 9, background: 'var(--border)', borderRadius: 4, animation: 'pulse 1.4s ease-in-out infinite' }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!feedLoading && doas.length === 0 && (
            <div className="card" style={{ padding: '36px 20px', textAlign: 'center' }}>
              <p style={{ fontSize: 30, marginBottom: 8 }}>🤲</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-2)' }}>Belum ada ucapan</p>
              <p style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 4 }}>Jadilah yang pertama mengirim doa!</p>
            </div>
          )}

          {!feedLoading && doas.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {doas.map((doa, idx) => {
                const av = avatarColor(doa.name)
                const isNew = doa.id === newId
                const rxMap = reactions[doa.id] ?? { love: [], suka: [], senyum: [] }
                return (
                  <div key={doa.id} className="card"
                    style={{ padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'flex-start', transition: 'border-color 0.3s', borderColor: isNew ? 'var(--accent)' : undefined, opacity: 0, animation: isNew ? 'slideDown 0.35s ease forwards' : `fadeUp 0.35s ease ${idx * 50}ms forwards` }}
                  >
                    <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: av.bg, color: av.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, letterSpacing: '-0.01em' }}>
                      {doa.name.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 5, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-1)', letterSpacing: '-0.01em' }}>{doa.name}</span>
                        <span style={{ fontSize: 10, color: 'var(--ink-3)', flexShrink: 0 }}>{timeAgo(doa.createdAt)}</span>
                      </div>
                      <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.65, whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0 }}>{doa.message}</p>
                      <ReactionRow doaId={doa.id} guest={guest} rxMap={rxMap} reactionLoading={reactionLoading} tooltip={tooltip} onReact={handleReaction} onTooltip={(id, type) => setTooltip({ doaId: id, type })} onTooltipClear={() => setTooltip(null)} />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
          <div ref={feedBottomRef} style={{ height: 1 }} />
        </div>
      </div>
      <BottomNav guestName={guest} />
    </div>
  )
}