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
              Jadwal Acara
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

        {/* ── Timeline — 1 card gabungan ── */}
        <p className="jd-section-label jd-3">Timeline</p>
        <div className="jd-3" style={{
          borderRadius: 16,
          overflow: 'hidden',
          marginBottom: 28,
          // Card menonjol dengan shadow lebih tebal + border berwarna
          border: '1.5px solid var(--border)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          background: 'var(--surface)',
        }}>
          {events.map((ev, i) => (
            <div
              key={ev.id}
              style={{
                display: 'flex',
                alignItems: 'stretch',
                borderBottom: i < events.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              {/* Left accent bar pakai warna event */}
              <div style={{
                width: 5,
                flexShrink: 0,
                background: ev.color,
              }} />

              {/* Content */}
              <div style={{ flex: 1, padding: '18px 18px 18px 20px' }}>

                {/* Nomor urut + nama event */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {/* Nomor bulat berwarna */}
                    <div style={{
                      width: 24, height: 24, borderRadius: '50%',
                      background: ev.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <span style={{ fontSize: 10, fontWeight: 800, color: '#fff' }}>{i + 1}</span>
                    </div>
                    <span style={{
                      fontSize: 15, fontWeight: 800,
                      color: 'var(--ink-1)',
                      letterSpacing: '-0.02em',
                    }}>
                      {ev.name}
                    </span>
                  </div>

                  {/* Badge warna event */}
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

                {/* Divider tipis */}
                <div style={{ height: '0.5px', background: 'var(--border)', marginBottom: 12 }} />

                {/* Tanggal & jam — lebih besar dari sebelumnya */}
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

        {/* ── Venue ── */}
        <p className="jd-section-label jd-4">Lokasi</p>
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

        {/* ── Catatan ── */}
        <div className="jd-6" style={{
          border: '0.5px solid var(--border)',
          borderRadius: 14,
          padding: '16px 18px',
          background: 'var(--surface)',
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-1)', marginBottom: 12, letterSpacing: '-0.01em' }}>
            Catatan Penting
          </p>
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

      <BottomNav guestName={guest} />
    </div>
  )
}