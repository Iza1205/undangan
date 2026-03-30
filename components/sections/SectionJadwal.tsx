'use client'

import { useRouter } from 'next/navigation'
import { weddingConfig } from '@/lib/weddingData'
import { Clock, CalendarDays, ArrowRight } from 'lucide-react'

const S: Record<string, React.CSSProperties> = {
  label: { fontSize: 11, fontWeight: 500, color: 'var(--ink-3)', letterSpacing: '0.06em', textTransform: 'uppercase' as const },
}

export default function SectionJadwal({ q }: { q: string }) {
  const { events } = weddingConfig
  const router = useRouter()

  return (
    <div style={{ padding: '0 20px', marginTop: 16 }} className="fade-up fade-up-delay-3">

      {/* Header row */}
      <div style={{ marginBottom: 12 }}>
        <p style={S.label}>Jadwal Acara</p>
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
              borderBottom: '1px solid var(--border)',
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

        {/* Button: Lihat Jadwal Lengkap */}
        <button
          onClick={() => router.push(`/undangan/jadwal?untuk=${encodeURIComponent(q)}`)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '13px 18px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            borderTop: '1px solid var(--border)',
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-1)' }}>
            Lihat Jadwal Lengkap
          </span>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            border: '0.5px solid var(--border)',
            background: 'var(--bg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <ArrowRight size={12} color="var(--ink-2)" strokeWidth={2} />
          </div>
        </button>

      </div>

    </div>
  )
}