'use client'

import { weddingConfig } from '@/lib/weddingData'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Quote } from 'lucide-react'
import { notFound } from 'next/navigation'

function IgIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#f09433" />
          <stop offset="25%"  stopColor="#e6683c" />
          <stop offset="50%"  stopColor="#dc2743" />
          <stop offset="75%"  stopColor="#cc2366" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#ig-grad)" strokeWidth="2" fill="none"/>
      <circle cx="12" cy="12" r="4.5" stroke="url(#ig-grad)" strokeWidth="2" fill="none"/>
      <circle cx="17.5" cy="6.5" r="1.2" fill="url(#ig-grad)"/>
    </svg>
  )
}

export default function MempelaiDetailPage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const { groom, bride } = weddingConfig

  const person = groom.slug === params.slug
    ? groom
    : bride.slug === params.slug
      ? bride
      : null

  if (!person) notFound()

  const isGroom = person.slug === groom.slug

  return (
    <div className="app-shell">
      <style>{`
        @keyframes hero-in {
          from { opacity: 0; transform: scale(1.06); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .hero-img    { animation: hero-in 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }
        .hero-back   { animation: fade-in 0.4s ease 0.2s both; }
        .hero-name   { animation: slide-up 0.5s cubic-bezier(0.34, 1.2, 0.64, 1) 0.25s both; }

        .card-1 { animation: slide-up 0.5s cubic-bezier(0.34, 1.2, 0.64, 1) 0.35s both; }
        .card-2 { animation: slide-up 0.5s cubic-bezier(0.34, 1.2, 0.64, 1) 0.45s both; }
        .card-3 { animation: slide-up 0.5s cubic-bezier(0.34, 1.2, 0.64, 1) 0.55s both; }
        .card-4 { animation: slide-up 0.5s cubic-bezier(0.34, 1.2, 0.64, 1) 0.65s both; }
        .card-5 { animation: slide-up 0.5s cubic-bezier(0.34, 1.2, 0.64, 1) 0.75s both; }
      `}</style>

      <div className="page-content" style={{ paddingBottom: 40 }}>

        {/* Hero foto */}
        <div style={{ position: 'relative', height: 340, overflow: 'hidden' }}>
          <div className="hero-img" style={{ position: 'absolute', inset: 0 }}>
            <Image
              src={person.photo}
              alt={person.name}
              fill
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
            />
          </div>

          {/* Gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.65) 100%)',
          }} />

          {/* Back button */}
          <button
            className="hero-back"
            onClick={() => router.back()}
            style={{
              position: 'absolute', top: 16, left: 16,
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: 20,
              padding: '7px 14px 7px 10px',
              color: '#fff',
              fontSize: 12, fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <ArrowLeft size={14} />
            Kembali
          </button>

          {/* Name overlay */}
          <div className="hero-name" style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
            <p style={{
              fontSize: 10, fontWeight: 600,
              color: 'rgba(255,255,255,0.65)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 4,
            }}>
              {isGroom ? 'Mempelai Pria' : 'Mempelai Wanita'}
            </p>
            <h1 style={{
              fontSize: 22, fontWeight: 800,
              color: '#fff',
              letterSpacing: '-0.03em',
              lineHeight: 1.2,
              marginBottom: 4,
            }}>
              {person.fullName}
            </h1>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>
              {person.childOrder}
            </p>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '16px 20px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>

          {/* Orang tua */}
          <div className="card card-1" style={{ padding: '14px 16px' }}>
            <p style={{
              fontSize: 10, fontWeight: 600,
              color: 'var(--ink-3)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: 12,
            }}>
              Putra/Putri dari
            </p>
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

          {/* About */}
          <div className="card card-2" style={{ padding: '14px 16px' }}>
            <p style={{
              fontSize: 10, fontWeight: 600,
              color: 'var(--ink-3)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: 8,
            }}>
              Tentang
            </p>
            <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.7 }}>
              {person.about}
            </p>
          </div>

          {/* Hobi & Kepribadian */}
          <div className="card card-3" style={{ padding: '14px 16px' }}>
            <p style={{
              fontSize: 10, fontWeight: 600,
              color: 'var(--ink-3)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: 10,
            }}>
              Hobi & Kepribadian
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
              {person.hobbies.map((h) => (
                <span key={h} style={{
                  fontSize: 11, fontWeight: 600,
                  color: 'var(--accent)',
                  background: 'var(--accent-bg)',
                  padding: '4px 10px',
                  borderRadius: 20,
                }}>
                  {h}
                </span>
              ))}
            </div>
            <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.6 }}>
              {person.personality}
            </p>
          </div>

          {/* Quote */}
          <div className="card card-4" style={{ padding: '16px', position: 'relative', overflow: 'hidden' }}>
            <Quote
              size={48}
              style={{
                position: 'absolute', top: 8, right: 10,
                color: 'var(--border)',
                opacity: 0.5,
              }}
            />
            <p style={{
              fontSize: 10, fontWeight: 600,
              color: 'var(--ink-3)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: 10,
            }}>
              Quote Favorit
            </p>
            <p style={{
              fontSize: 13,
              color: 'var(--ink-1)',
              lineHeight: 1.7,
              fontStyle: 'italic',
              fontWeight: 500,
            }}>
              &ldquo;{person.quote}&rdquo;
            </p>
          </div>

          {/* Instagram */}
          <div className="card card-5" style={{ padding: '14px 16px' }}>
            <p style={{
              fontSize: 10, fontWeight: 600,
              color: 'var(--ink-3)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: 10,
            }}>
              Media Sosial
            </p>
            <a
              href={`https://instagram.com/${person.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontSize: 12, fontWeight: 700,
                color: '#dc2743',
                background: '#fff0f3',
                padding: '8px 14px',
                borderRadius: 20,
                textDecoration: 'none',
                border: '1px solid #fbc8d4',
              }}
            >
              <IgIcon size={15} />
              @{person.instagram}
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}