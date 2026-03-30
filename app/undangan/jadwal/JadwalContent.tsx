'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { weddingConfig } from '@/lib/weddingData'
import BottomNav from '@/components/BottomNav'
import { ArrowLeft, Clock, CalendarDays, MapPin, ExternalLink } from 'lucide-react'

export default function JadwalContent() {
  const searchParams = useSearchParams()
  const guest  = searchParams.get('untuk') || 'Tamu Undangan'
  const router = useRouter()
  const { events, venue, groom, bride } = weddingConfig

  return (
    <div className="app-shell">
      <style suppressHydrationWarning>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .jd-1 { animation: fadeUp 0.45s ease both 0.00s; }
        .jd-2 { animation: fadeUp 0.45s ease both 0.06s; }

        .jd-maps-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 13px 16px;
          text-decoration: none;
          transition: background 0.15s;
        }
        .jd-maps-btn:active { background: var(--bg); }

        .jd-section-title {
          font-size: 9px;
          font-weight: 600;
          color: var(--ink-3);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
      `}</style>

      <div className="page-content" style={{ padding: '0 20px 100px' }}>

        {/* ── Header ── */}
        <div className="jd-1" style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 52, paddingBottom: 24 }}>
          <button
            onClick={() => router.back()}
            style={{
              width: 34, height: 34, borderRadius: 10,
              border: '0.5px solid var(--border)',
              background: 'var(--surface)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', flexShrink: 0,
            }}
          >
            <ArrowLeft size={14} color="var(--ink-2)" />
          </button>
          <div>
            <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink-1)', letterSpacing: '-0.02em' }}>
              Jadwal Acara
            </p>
            <p style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 1 }}>
              {groom.name} & {bride.name}
            </p>
          </div>
        </div>

        {/* ── ONE BIG CARD ── */}
        <div className="jd-2" style={{
          border: '0.5px solid var(--border)',
          borderRadius: 20,
          overflow: 'hidden',
          background: 'var(--surface)',
        }}>

          {/* ── 1. Date Banner ── */}
          <div style={{
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '0.5px solid var(--border)',
          }}>
            <div>
              <p style={{ fontSize: 9, fontWeight: 600, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
                Hari Pernikahan
              </p>
              <p style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink-1)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                02 Juni 2026
              </p>
              <p style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 5 }}>
                Selasa · Tandai tanggalnya
              </p>
            </div>
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: 'var(--bg)',
              border: '0.5px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22,
            }}>
              💍
            </div>
          </div>

          {/* ── 2. Timeline ── */}
          <div style={{ padding: '20px', borderBottom: '0.5px solid var(--border)', position: 'relative' }}>
            <p className="jd-section-title" style={{ marginBottom: 16 }}>Timeline</p>

            {/* Garis vertikal */}
            <div style={{
              position: 'absolute',
              left: 39,
              top: 52,
              bottom: 20,
              width: 1.5,
              background: 'var(--border)',
              borderRadius: 2,
            }} />

            {events.map((ev, i) => (
              <div
                key={ev.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 16,
                  marginBottom: i < events.length - 1 ? 20 : 0,
                  position: 'relative',
                }}
              >
                {/* Dot */}
                <div style={{
                  width: 38, height: 38,
                  borderRadius: '50%',
                  background: ev.color,
                  flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  zIndex: 1,
                  boxShadow: `0 0 0 3px var(--surface), 0 0 0 4.5px ${ev.color}40`,
                }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>{i + 1}</span>
                </div>

                {/* Konten */}
                <div style={{ flex: 1, paddingTop: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--ink-1)', letterSpacing: '-0.02em' }}>
                      {ev.name}
                    </span>
                    <span style={{
                      fontSize: 9, fontWeight: 700,
                      color: ev.color,
                      background: `${ev.color}18`,
                      padding: '3px 8px',
                      borderRadius: 20,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}>
                      Acara {i + 1}
                    </span>
                  </div>
                  <div style={{ height: '0.5px', background: 'var(--border)', marginBottom: 10 }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <CalendarDays size={13} color="var(--ink-3)" strokeWidth={1.8} />
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-1)', letterSpacing: '-0.01em' }}>
                        {ev.date}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <Clock size={13} color="var(--ink-3)" strokeWidth={1.8} />
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-2)' }}>
                        {ev.time}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── 3. Venue ── */}
          <div style={{ borderBottom: '0.5px solid var(--border)' }}>
            {/* Label */}
            <div style={{ padding: '16px 16px 0' }}>
              <p className="jd-section-title">Lokasi</p>
            </div>

            {/* Venue info */}
            <div style={{ padding: '12px 16px 16px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                border: '0.5px solid var(--border)',
                background: 'var(--bg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <MapPin size={15} color="var(--ink-2)" strokeWidth={1.8} />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-1)', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                  {venue.name}
                </p>
                <p style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 3, lineHeight: 1.6 }}>
                  {venue.address}
                </p>
              </div>
            </div>

            {/* Maps embed */}
            <div style={{ padding: '0 16px 16px' }}>
              <div style={{
                width: '100%', height: 160,
                borderRadius: 12,
                overflow: 'hidden',
                border: '0.5px solid var(--border)',
              }}>
                <iframe
                  src={venue.mapsEmbed}
                  width="100%"
                  height="160"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Open Maps button */}
            <a
              href={venue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="jd-maps-btn"
              style={{ borderTop: '0.5px solid var(--border)' }}
            >
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-1)' }}>
                Buka di Google Maps
              </span>
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                border: '0.5px solid var(--border)',
                background: 'var(--bg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <ExternalLink size={12} color="var(--ink-2)" strokeWidth={2} />
              </div>
            </a>
          </div>

          {/* ── 4. Catatan ── */}
          <div style={{ padding: '16px 18px' }}>
            <p className="jd-section-title" style={{ marginBottom: 12 }}>Catatan Penting</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {[
                'Mohon hadir tepat waktu',
                'Dress code: Batik / Formal',
                'Konfirmasi kehadiran Anda',
              ].map((note, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                  <div style={{
                    width: 3, height: 3, borderRadius: '50%',
                    background: 'var(--ink-3)',
                    marginTop: 5, flexShrink: 0,
                  }} />
                  <p style={{ fontSize: 11, color: 'var(--ink-3)', lineHeight: 1.6 }}>{note}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
        {/* ── END ONE BIG CARD ── */}

      </div>

      <BottomNav guestName={guest} />
    </div>
  )
}