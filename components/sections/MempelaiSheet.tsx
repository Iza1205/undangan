'use client'

import Image from 'next/image'
import { X, Quote } from 'lucide-react'
import { weddingConfig } from '@/lib/weddingData'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

type Person = typeof weddingConfig.groom

function IgIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="ig-grad2" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#f09433" />
          <stop offset="25%"  stopColor="#e6683c" />
          <stop offset="50%"  stopColor="#dc2743" />
          <stop offset="75%"  stopColor="#cc2366" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#ig-grad2)" strokeWidth="2" fill="none"/>
      <circle cx="12" cy="12" r="4.5" stroke="url(#ig-grad2)" strokeWidth="2" fill="none"/>
      <circle cx="17.5" cy="6.5" r="1.2" fill="url(#ig-grad2)"/>
    </svg>
  )
}

type Props = {
  person: Person
  isGroom: boolean
  onClose: () => void
}

export default function MempelaiSheet({ person, isGroom, onClose }: Props) {
  // Cegah scroll body saat sheet terbuka
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const content = (
    <>
      <style>{`
        @keyframes ms-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes ms-slide-up {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        .ms-card-1 { animation: ms-slide-up 0.4s cubic-bezier(0.34,1.1,0.64,1) 0.05s both; }
        .ms-card-2 { animation: ms-slide-up 0.4s cubic-bezier(0.34,1.1,0.64,1) 0.12s both; }
        .ms-card-3 { animation: ms-slide-up 0.4s cubic-bezier(0.34,1.1,0.64,1) 0.19s both; }
        .ms-card-4 { animation: ms-slide-up 0.4s cubic-bezier(0.34,1.1,0.64,1) 0.26s both; }
        .ms-card-5 { animation: ms-slide-up 0.4s cubic-bezier(0.34,1.1,0.64,1) 0.33s both; }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          zIndex: 9998,
          animation: 'ms-fade-in 0.25s ease both',
        }}
      />

      {/* Sheet */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        zIndex: 9999,
        display: 'flex', justifyContent: 'center',
        animation: 'ms-slide-up 0.35s cubic-bezier(0.34,1.1,0.64,1) both',
      }}>
        <div style={{
          width: '100%', maxWidth: 430,
          maxHeight: '90dvh',
          background: '#fff',
          borderRadius: '20px 20px 0 0',
          overflowY: 'auto',
          paddingBottom: 'env(safe-area-inset-bottom, 16px)',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.15)',
        }}>

          {/* Hero foto */}
          <div style={{ position: 'relative', height: 260, flexShrink: 0 }}>
            <Image
              src="/mempelai/3.png"
              alt={person.name}
              fill
              sizes="430px"
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%)',
            }} />

            {/* Handle bar */}
            <div style={{
              position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
              width: 36, height: 4, borderRadius: 2,
              background: 'rgba(255,255,255,0.4)',
            }} />

            {/* Tombol tutup */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute', top: 14, right: 14,
                width: 34, height: 34, borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#fff',
              }}
            >
              <X size={16} />
            </button>

            {/* Nama */}
            <div style={{ position: 'absolute', bottom: 16, left: 18, right: 18 }}>
              <p style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
                {isGroom ? 'Mempelai Pria' : 'Mempelai Wanita'}
              </p>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: 2 }}>
                {person.fullName}
              </h2>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>{person.childOrder}</p>
            </div>
          </div>

          {/* Konten kartu */}
          <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>

            {/* Orang tua */}
            <div className="card ms-card-1" style={{ padding: '14px 16px' }}>
              <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--ink-3)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 }}>Putra/Putri dari</p>
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 10, color: 'var(--ink-3)', marginBottom: 3 }}>Ayah</p>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-1)' }}>{person.father}</p>
                </div>
                <div style={{ width: 1, background: 'var(--border)', margin: '0 16px' }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 10, color: 'var(--ink-3)', marginBottom: 3 }}>Ibu</p>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-1)' }}>{person.mother}</p>
                </div>
              </div>
            </div>

            {/* Tentang */}
            <div className="card ms-card-2" style={{ padding: '14px 16px' }}>
              <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--ink-3)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>Tentang</p>
              <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.7 }}>{person.about}</p>
            </div>

            {/* Hobi & Kepribadian */}
            <div className="card ms-card-3" style={{ padding: '14px 16px' }}>
              <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--ink-3)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>Hobi & Kepribadian</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                {person.hobbies.map((h) => (
                  <span key={h} style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent)', background: 'var(--accent-bg)', padding: '4px 10px', borderRadius: 20 }}>{h}</span>
                ))}
              </div>
              <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.6 }}>{person.personality}</p>
            </div>

            {/* Quote */}
            <div className="card ms-card-4" style={{ padding: '16px', position: 'relative', overflow: 'hidden' }}>
              <Quote size={48} style={{ position: 'absolute', top: 8, right: 10, color: 'var(--border)', opacity: 0.5 }} />
              <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--ink-3)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>Quote Favorit</p>
              <p style={{ fontSize: 13, color: 'var(--ink-1)', lineHeight: 1.7, fontStyle: 'italic', fontWeight: 500 }}>
                &ldquo;{person.quote}&rdquo;
              </p>
            </div>

            {/* Instagram */}
            <div className="card ms-card-5" style={{ padding: '14px 16px' }}>
              <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--ink-3)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>Media Sosial</p>
              <a
                href={`https://instagram.com/${person.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 700, color: '#dc2743', background: '#fff0f3', padding: '8px 14px', borderRadius: 20, textDecoration: 'none', border: '1px solid #fbc8d4' }}
              >
                <IgIcon size={15} />
                @{person.instagram}
              </a>
            </div>

          </div>
        </div>
      </div>
    </>
  )

  return createPortal(content, document.body)
}