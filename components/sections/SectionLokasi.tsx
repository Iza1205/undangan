'use client'

import { weddingConfig } from '@/lib/weddingData'
import { MapPin, ArrowUpRight } from 'lucide-react'

const S: Record<string, React.CSSProperties> = {
  label: { fontSize: 11, fontWeight: 500, color: 'var(--ink-3)', letterSpacing: '0.06em', textTransform: 'uppercase' as const },
}

export default function SectionLokasi({ q }: { q: string }) {
  const { venue } = weddingConfig

  return (
    <div style={{ padding: '0 20px', marginTop: 16, paddingBottom: 8 }} className="fade-up fade-up-delay-4">

      {/* Label */}
      <p style={{ ...S.label, marginBottom: 12 }}>Lokasi</p>

      {/* Card */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>

        {/* Top accent strip */}
        <div style={{
          height: 3,
          background: 'linear-gradient(90deg, var(--accent) 0%, transparent 100%)',
        }} />

        {/* Main content */}
        <div style={{ padding: '20px 20px 0' }}>

          {/* Pin icon + venue name */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: 'var(--accent-bg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, marginTop: 2,
            }}>
              <MapPin size={18} color="var(--accent)" strokeWidth={2} />
            </div>
            <div>
              <p style={{
                fontSize: 17, fontWeight: 700,
                color: 'var(--ink-1)', letterSpacing: '-0.03em',
                lineHeight: 1.25,
              }}>
                {venue.name}
              </p>
              <p style={{
                fontSize: 12, color: 'var(--ink-3)',
                marginTop: 4, lineHeight: 1.6,
              }}>
                {venue.address}
              </p>
            </div>
          </div>

          {/* Kota / daerah tag */}
          <div style={{ marginTop: 14, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {[venue.city ?? 'Indonesia', venue.region ?? ''].filter(Boolean).map((tag, i) => (
              <span key={i} style={{
                fontSize: 10, fontWeight: 600,
                color: 'var(--ink-3)',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 20,
                padding: '3px 10px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'var(--border)', margin: '16px 20px 0' }} />

        {/* Footer: open maps button */}
        <a
          href={venue.mapsUrl ?? `https://maps.google.com/?q=${encodeURIComponent(venue.name + ' ' + venue.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 20px',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          <span style={{
            fontSize: 12, fontWeight: 600,
            color: 'var(--accent)',
            letterSpacing: '-0.01em',
          }}>
            Buka di Google Maps
          </span>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: 'var(--accent-bg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ArrowUpRight size={14} color="var(--accent)" strokeWidth={2.5} />
          </div>
        </a>

      </div>
    </div>
  )
}