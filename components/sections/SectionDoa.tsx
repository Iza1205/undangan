'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Heart, Plus } from 'lucide-react'

type Doa = {
  id: string
  name: string
  message: string
  createdAt: string
}

type ReactionType = 'love' | 'suka' | 'senyum'
type Reaction = { id: string; doaId: string; name: string; type: ReactionType; createdAt: string }

const REACTION_EMOJI: Record<ReactionType, string> = {
  love:   '❤️',
  suka:   '👍',
  senyum: '😊',
}

function groupReactions(reactions: Reaction[]): Record<string, Record<ReactionType, string[]>> {
  const result: Record<string, Record<ReactionType, string[]>> = {}
  for (const r of reactions) {
    if (!result[r.doaId]) result[r.doaId] = { love: [], suka: [], senyum: [] }
    result[r.doaId][r.type].push(r.name)
  }
  return result
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

function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (diff < 60)    return 'Baru saja'
  if (diff < 3600)  return `${Math.floor(diff / 60)} menit lalu`
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`
  return `${Math.floor(diff / 86400)} hari lalu`
}

const S: Record<string, React.CSSProperties> = {
  label: { fontSize: 11, fontWeight: 500, color: 'var(--ink-3)', letterSpacing: '0.06em', textTransform: 'uppercase' as const },
}

function ReactionRow({
  doaId, guest, rxMap, reactionLoading, tooltip,
  onReact, onTooltip, onTooltipClear,
}: {
  doaId: string
  guest: string
  rxMap: Record<ReactionType, string[]>
  reactionLoading: string | null
  tooltip: { doaId: string; type: ReactionType } | null
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
        const names = rxMap[type]
        const count = names.length
        const isMine = names.includes(guest)
        const isTooltipVisible = tooltip?.doaId === doaId && tooltip?.type === type

        return (
          <div key={type} style={{ position: 'relative' }}>
            {isTooltipVisible && count > 0 && (
              <div className="rx-tooltip">
                {names.slice(0, 5).join(', ')}{names.length > 5 ? ` +${names.length - 5}` : ''}
              </div>
            )}
            <button
              className={`rx-btn${isMine ? ' active' : ''}`}
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
        <button
          className="rx-btn"
          onClick={() => setOpen(o => !o)}
          style={{ padding: '3px 7px' }}
        >
          <Plus size={12} />
        </button>

        {open && (
          <div style={{
            position: 'absolute',
            bottom: 'calc(100% + 8px)',
            left: 0,
            display: 'flex',
            gap: 4,
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 24,
            padding: '5px 8px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
            zIndex: 20,
            animation: 'pickerPop 0.18s ease both',
          }}>
            {(Object.keys(REACTION_EMOJI) as ReactionType[]).map((type, i) => {
              const isMine = rxMap[type].includes(guest)
              return (
                <button
                  key={type}
                  onClick={() => { onReact(doaId, type); setOpen(false) }}
                  style={{
                    width: 36, height: 36, borderRadius: '50%',
                    border: isMine ? '2px solid var(--accent)' : '2px solid transparent',
                    background: isMine ? 'var(--accent-bg)' : 'transparent',
                    fontSize: 20, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'transform 0.12s',
                    animation: `emojiIn 0.2s ease ${i * 40}ms both`,
                  }}
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

export default function SectionDoa({ q, guest }: { q: string; guest: string }) {
  const router = useRouter()
  const [doas, setDoas] = useState<Doa[]>([])
  const [loading, setLoading] = useState(true)
  const [reactions, setReactions] = useState<Record<string, Record<ReactionType, string[]>>>({})
  const [reactionLoading, setRxLoading] = useState<string | null>(null)
  const [tooltip, setTooltip] = useState<{ doaId: string; type: ReactionType } | null>(null)

  const fetchReactions = async () => {
    try {
      const r = await fetch('/api/reaction')
      const d = await r.json()
      setReactions(groupReactions(d.reactions ?? []))
    } catch { /* silent */ }
  }

  useEffect(() => {
    fetch('/api/doa')
      .then(r => r.json())
      .then(d => setDoas((d.doas ?? []).slice().reverse()))
      .catch(() => {})
      .finally(() => setLoading(false))

    fetchReactions()
    const interval = setInterval(fetchReactions, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleReaction = async (doaId: string, type: ReactionType) => {
    const key = `${doaId}_${type}`
    if (reactionLoading === key) return
    setRxLoading(key)
    const name = guest

    setReactions(prev => {
      const curr = prev[doaId] ?? { love: [], suka: [], senyum: [] }
      const list = curr[type]
      const already = list.includes(name)
      return {
        ...prev,
        [doaId]: {
          ...curr,
          [type]: already ? list.filter(n => n !== name) : [...list, name],
        },
      }
    })

    try {
      await fetch('/api/reaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ doaId, name, type }),
      })
      await fetchReactions()
    } catch { /* silent */ }
    finally { setRxLoading(null) }
  }

  return (
    <div style={{ padding: '0 20px', marginTop: 16, paddingBottom: 16 }} className="fade-up fade-up-delay-5">
      <style suppressHydrationWarning>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }
        @keyframes reactionPop {
          0%   { transform: scale(0.7); opacity: 0; }
          60%  { transform: scale(1.25); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pickerPop {
          0%   { opacity: 0; transform: scale(0.85) translateY(4px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes emojiIn {
          0%   { opacity: 0; transform: scale(0.5) translateY(6px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .doa-scroll::-webkit-scrollbar { display: none; }
        .doa-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        .rx-btn {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 3px 8px; border-radius: 20px;
          border: 1px solid var(--border);
          background: var(--bg);
          font-size: 12px; cursor: pointer;
          font-family: var(--font);
          transition: all 0.15s;
          color: var(--ink-3);
          line-height: 1;
        }
        .rx-btn:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-bg); }
        .rx-btn.active {
          border-color: var(--accent);
          background: var(--accent-bg);
          color: var(--accent);
          font-weight: 600;
          animation: reactionPop 0.25s ease both;
        }
        .rx-tooltip {
          position: absolute; bottom: calc(100% + 6px); left: 0;
          background: var(--ink-1); color: #fff;
          font-size: 11px; padding: 5px 8px; border-radius: 6px;
          white-space: nowrap; pointer-events: none;
          animation: slideDown 0.2s ease both;
          z-index: 10;
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .rx-tooltip::after {
          content: '';
          position: absolute; top: 100%; left: 12px;
          border: 5px solid transparent;
          border-top-color: var(--ink-1);
        }
      `}</style>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <p style={S.label}>Ucapan & Doa</p>
        <button
          onClick={() => router.push(`/undangan/doa${q}`)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '6px 12px', borderRadius: 20,
            background: 'var(--accent)', border: 'none',
            fontSize: 11, fontWeight: 700, color: '#fff',
            cursor: 'pointer',
          }}
        >
          <Heart size={11} />
          Kirim Doa
        </button>
      </div>

      {/* Skeleton */}
      {loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[80, 60].map((w, i) => (
            <div key={i} className="card" style={{ padding: '14px 16px', display: 'flex', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--border)', flexShrink: 0, animation: 'pulse 1.4s ease-in-out infinite' }} />
              <div style={{ flex: 1, paddingTop: 2 }}>
                <div style={{ width: '35%', height: 10, background: 'var(--border)', borderRadius: 4, marginBottom: 9, animation: 'pulse 1.4s ease-in-out infinite' }} />
                <div style={{ width: `${w}%`, height: 9, background: 'var(--border)', borderRadius: 4, animation: 'pulse 1.4s ease-in-out infinite' }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && doas.length === 0 && (
        <div className="card" style={{ padding: '28px 20px', textAlign: 'center' }}>
          <p style={{ fontSize: 28, marginBottom: 6 }}>🤲</p>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-2)' }}>Belum ada ucapan</p>
          <p style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 16 }}>Jadilah yang pertama mengirim doa!</p>
        </div>
      )}

      {/* Feed */}
      {!loading && doas.length > 0 && (
        <>
          <div
            className="doa-scroll"
            style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 280, overflowY: 'auto' }}
          >
            {doas.map((doa) => {
              const av = avatarColor(doa.name)
              const rxMap = reactions[doa.id] ?? { love: [], suka: [], senyum: [] }

              return (
                <div key={doa.id} className="card" style={{ padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'flex-start', flexShrink: 0 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    background: av.bg, color: av.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, fontWeight: 700,
                  }}>
                    {doa.name.charAt(0).toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 5, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-1)', letterSpacing: '-0.01em' }}>
                        {doa.name}
                      </span>
                      <span style={{ fontSize: 10, color: 'var(--ink-3)' }}>
                        {timeAgo(doa.createdAt)}
                      </span>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.65, whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0 }}>
                      {doa.message}
                    </p>

                    <ReactionRow
                      doaId={doa.id}
                      guest={guest}
                      rxMap={rxMap}
                      reactionLoading={reactionLoading}
                      tooltip={tooltip}
                      onReact={handleReaction}
                      onTooltip={(id, type) => setTooltip({ doaId: id, type })}
                      onTooltipClear={() => setTooltip(null)}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <button
            onClick={() => router.push(`/undangan/doa${q}`)}
            style={{
              width: '100%', padding: '11px', borderRadius: 10, marginTop: 8,
              border: '1px solid var(--border)', background: 'var(--surface)',
              fontSize: 12, fontWeight: 600, color: 'var(--ink-2)',
              cursor: 'pointer',
            }}
          >
            Lihat semua ucapan →
          </button>
        </>
      )}
    </div>
  )
}