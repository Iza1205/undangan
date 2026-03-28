'use client'

import { weddingConfig } from '@/lib/weddingData'
import { Clock, CalendarDays, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

const S: Record<string, React.CSSProperties> = {
  label: { fontSize: 11, fontWeight: 500, color: 'var(--ink-3)', letterSpacing: '0.06em', textTransform: 'uppercase' as const },
}

export default function SectionJadwal({ q }: { q: string }) {
  const { events } = weddingConfig

  return (
    <div style={{ padding: '0 20px', marginTop: 16 }} className="fade-up fade-up-delay-3">

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <p style={S.label}>Jadwal Acara</p>
        <Link
          href={`/undangan/jadwal${q}`}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            fontSize: 11, fontWeight: 700,
            color: 'var(--accent)',
            background: 'var(--accent-bg)',
            padding: '5px 12px 5px 10px',
            borderRadius: 20,
            textDecoration: 'none',
            letterSpacing: '0.01em',
          }}
        >
          <CalendarDays size={12} strokeWidth={2.2} />
          Lihat semua
          <ArrowUpRight size={11} strokeWidth={2.5} />
        </Link>
      </div>

      {/* Single combined card */}
      <div
        className="card"
        style={{
          padding: 0,
          overflow: 'hidden',
        }}
      >
        {events.map((ev, i) => (
          <div
            key={ev.id}
            style={{
              display: 'flex',
              alignItems: 'stretch',
              borderBottom: i < events.length - 1 ? '1px solid var(--border)' : 'none',
            }}
          >
            {/* Left color bar */}
            <div style={{
              width: 4,
              flexShrink: 0,
              background: ev.color,
            }} />

            {/* Content */}
            <div style={{ flex: 1, padding: '14px 16px 14px 18px' }}>

              {/* Badge + number row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{
                  fontSize: 10, fontWeight: 700,
                  color: ev.color,
                  background: `${ev.color}18`,
                  padding: '3px 9px',
                  borderRadius: 20,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}>
                  {ev.name}
                </span>
                <span style={{
                  fontSize: 10, fontWeight: 500,
                  color: 'var(--ink-3)',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 20,
                  padding: '2px 8px',
                }}>
                  #{i + 1}
                </span>
              </div>

              {/* Date row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
                <CalendarDays size={13} color="var(--ink-3)" strokeWidth={1.8} />
                <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-1)', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                  {ev.date}
                </p>
              </div>

              {/* Time row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <Clock size={13} color="var(--ink-3)" strokeWidth={1.8} />
                <p style={{ fontSize: 12, color: 'var(--ink-2)' }}>
                  {ev.time}
                </p>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  )
}