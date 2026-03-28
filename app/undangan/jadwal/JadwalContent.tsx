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

  const EVENT_COLORS = ['#7C3AED', '#D4537E', '#0F6E56', '#BA7517']

  return (
    <div className="app-shell">
      <style suppressHydrationWarning>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .jd-1 { animation: fadeUp 0.45s ease both 0.00s; }
        .jd-2 { animation: fadeUp 0.45s ease both 0.06s; }
        .jd-3 { animation: fadeUp 0.45s ease both 0.12s; }
        .jd-4 { animation: fadeUp 0.45s ease both 0.18s; }
        .jd-5 { animation: fadeUp 0.45s ease both 0.24s; }
        .jd-6 { animation: fadeUp 0.45s ease both 0.30s; }

        .jd-section-label {
          font-size: 9px;
          font-weight: 600;
          color: var(--ink-3);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .jd-event-card {
          border: 0.5px solid var(--border);
          border-radius: 14px;
          padding: 16px 18px;
          background: var(--surface);
        }

        .jd-maps-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 13px 16px;
          text-decoration: none;
          border-top: 0.5px solid var(--border);
          transition: background 0.15s;
        }
        .jd-maps-btn:active { background: var(--surface); }
      `}</style>

      <div className="page-content" style={{ padding: '0 20px 100px' }}>

        {/* ── Header ── */}
        <div className="jd-1" style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 52, paddingBottom: 28 }}>
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
              Schedule
            </p>
            <p style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 1 }}>
              {groom.name} & {bride.name}
            </p>
          </div>
        </div>

        {/* ── Date Banner ── */}
        <div className="jd-2" style={{
          border: '0.5px solid var(--border)',
          borderRadius: 16,
          padding: '20px',
          marginBottom: 28,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--surface)',
        }}>
          <div>
            <p style={{ fontSize: 9, fontWeight: 600, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
              Wedding Day
            </p>
            <p style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink-1)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              June 14, 2025
            </p>
            <p style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 5 }}>
              Saturday · Save the date
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

        {/* ── Timeline ── */}
        <p className="jd-section-label jd-3">Timeline</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
          {events.map((ev, i) => (
            <div key={ev.id} className={`jd-event-card jd-${i + 3}`}>
              {/* Top row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: EVENT_COLORS[i] ?? 'var(--ink-3)',
                    flexShrink: 0,
                  }} />
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-1)', letterSpacing: '-0.02em' }}>
                    {ev.name}
                  </span>
                </div>
                <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--ink-3)', letterSpacing: '0.06em' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Divider */}
              <div style={{ height: '0.5px', background: 'var(--border)', marginBottom: 12 }} />

              {/* Meta */}
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <CalendarDays size={11} color="var(--ink-3)" strokeWidth={1.8} />
                  <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--ink-2)' }}>{ev.date}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Clock size={11} color="var(--ink-3)" strokeWidth={1.8} />
                  <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--ink-2)' }}>{ev.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Venue ── */}
        <p className="jd-section-label jd-4">Venue</p>
        <div className="jd-5" style={{
          border: '0.5px solid var(--border)',
          borderRadius: 14,
          overflow: 'hidden',
          background: 'var(--surface)',
          marginBottom: 28,
        }}>
          {/* Venue info */}
          <div style={{ padding: '16px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
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

          {/* Divider */}
          <div style={{ height: '0.5px', background: 'var(--border)' }} />

          {/* Maps embed */}
          <div style={{ width: '100%', height: 180, background: 'var(--border)' }}>
            <iframe
              src={venue.mapsEmbed}
              width="100%"
              height="180"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Open Maps button */}
          <a
            href={venue.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="jd-maps-btn"
          >
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-1)' }}>
              Open in Google Maps
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

        {/* ── Notes ── */}
        <div className="jd-6" style={{
          border: '0.5px solid var(--border)',
          borderRadius: 14,
          padding: '16px 18px',
          background: 'var(--surface)',
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-1)', marginBottom: 12, letterSpacing: '-0.01em' }}>
            Important Notes
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {[
              'Please arrive on time',
              'Dress code: Batik / Formal',
              'Kindly confirm your attendance',
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

      <BottomNav guestName={guest} />
    </div>
  )
}