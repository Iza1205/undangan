'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { weddingConfig } from '@/lib/weddingData'
import BottomNav from '@/components/BottomNav'
import { ArrowLeft, Heart } from 'lucide-react'
import Image from 'next/image'

export default function TerimaKasihContent() {
  const searchParams = useSearchParams()
  const guest  = searchParams.get('untuk') || 'Tamu Undangan'
  const router = useRouter()
  const { groom, bride } = weddingConfig

  return (
    <div className="app-shell">
      <style suppressHydrationWarning>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-heart {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        .tk-1 { animation: fadeUp 0.45s ease both 0.00s; }
        .tk-2 { animation: fadeUp 0.45s ease both 0.08s; }
        .tk-3 { animation: fadeUp 0.45s ease both 0.16s; }
        .tk-4 { animation: fadeUp 0.45s ease both 0.24s; }
        .tk-5 { animation: fadeUp 0.45s ease both 0.32s; }
        .tk-6 { animation: fadeUp 0.45s ease both 0.40s; }
        .heart-pulse { animation: pulse-heart 1.8s ease-in-out infinite; }
      `}</style>

      <div className="page-content" style={{ padding: '0 20px 100px' }}>

        {/* Header */}
        <div className="tk-1" style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 52, paddingBottom: 28 }}>
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
              Terima Kasih
            </p>
            <p style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 1 }}>
              {groom.name} & {bride.name}
            </p>
          </div>
        </div>

        {/* Hero card */}
        <div className="tk-2" style={{
          border: '0.5px solid var(--border)',
          borderRadius: 20,
          padding: '32px 24px',
          marginBottom: 20,
          background: 'var(--surface)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 12,
        }}>
          <div className="heart-pulse" style={{
            width: 56, height: 56, borderRadius: 16,
            background: 'linear-gradient(135deg, #f43f5e, #7C3AED)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(124,58,237,0.25)',
          }}>
            <Heart size={26} fill="#fff" color="#fff" />
          </div>
          <div>
            <p style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink-1)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
              Terima Kasih,
            </p>
            <p style={{ fontSize: 20, fontWeight: 800, color: 'var(--accent, #7C3AED)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
              {guest}!
            </p>
          </div>
          <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.7, maxWidth: 280 }}>
            Kehadiran dan doa restu Anda adalah hadiah terbesar bagi kami di hari yang paling bahagia ini.
          </p>
        </div>

        {/* Pesan dari mempelai */}
        <div className="tk-3" style={{
          border: '0.5px solid var(--border)',
          borderRadius: 16,
          padding: '20px',
          marginBottom: 20,
          background: 'var(--surface)',
        }}>
          <p style={{ fontSize: 9, fontWeight: 600, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>
            Pesan dari Kami
          </p>

          {/* Groom */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              overflow: 'hidden',
              flexShrink: 0,
              position: 'relative',
            }}>
              <Image src='/mempelai/laki.png' alt={groom.name} fill style={{ objectFit: 'cover' }} />
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-1)', marginBottom: 4 }}>{groom.name}</p>
              <p style={{ fontSize: 11, color: 'var(--ink-3)', lineHeight: 1.7 }}>
                Terima kasih telah hadir dan berbagi kebahagiaan bersama kami. Doa dan kehadiran Anda sangat berarti.
              </p>
            </div>
          </div>

          <div style={{ height: '0.5px', background: 'var(--border)', marginBottom: 16 }} />

          {/* Bride */}
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              overflow: 'hidden',
              flexShrink: 0,
              position: 'relative',
            }}>
              <Image src='/mempelai/cewe.png' alt={bride.name} fill style={{ objectFit: 'cover' }} />
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-1)', marginBottom: 4 }}>{bride.name}</p>
              <p style={{ fontSize: 11, color: 'var(--ink-3)', lineHeight: 1.7 }}>
                Semoga Allah membalas kebaikan Anda dengan berlipat ganda. Terima kasih sudah menjadi bagian dari momen istimewa kami.
              </p>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="tk-4" style={{
          border: '0.5px solid var(--border)',
          borderRadius: 16,
          padding: '20px 24px',
          marginBottom: 20,
          background: 'var(--surface)',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: 22, marginBottom: 10 }}>🤲</p>
          <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.8, fontStyle: 'italic' }}>
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya."
          </p>
          <p style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 10, fontWeight: 600, letterSpacing: '0.05em' }}>
            QS. Ar-Rum: 21
          </p>
        </div>

        {/* Closing */}
        <div className="tk-6" style={{
          borderRadius: 16,
          padding: '20px 24px',
          background: 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(244,63,94,0.08))',
          border: '0.5px solid rgba(124,58,237,0.15)',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.8 }}>
            Dengan penuh rasa syukur dan bahagia,
          </p>
          <p style={{ fontSize: 15, fontWeight: 800, color: 'var(--ink-1)', marginTop: 6, letterSpacing: '-0.02em' }}>
            {groom.name} & {bride.name}
          </p>
          <p style={{ fontSize: 20, marginTop: 8 }}>💍</p>
        </div>

      </div>

      <BottomNav guestName={guest} />
    </div>
  )
}