'use client'

import { weddingConfig } from '@/lib/weddingData'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const S: Record<string, React.CSSProperties> = {
  label: { fontSize: 11, fontWeight: 500, color: 'var(--ink-3)', letterSpacing: '0.06em', textTransform: 'uppercase' as const },
}

const INSTAGRAM = {
  groom: 'izamhn',
  bride: 'fkrnurull',
}

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

type PersonCardProps = {
  photo: string
  name: string
  father: string
  mother: string
  instagram: string
  slug: string
  q: string
}

function PersonCard({ photo, name, father, mother, instagram, slug, q }: PersonCardProps) {
  return (
    <Link
      href={`/undangan/mempelai/${slug}${q}`}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <div
        className="card"
        style={{
          padding: '18px 14px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          transition: 'transform 0.15s ease',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
        }}
      >
        {/* Photo */}
        <div style={{
          width: 72, height: 72, borderRadius: 16,
          overflow: 'hidden', marginBottom: 10,
          position: 'relative', flexShrink: 0,
        }}>
          <Image
            src={photo}
            alt={name}
            fill
            sizes="72px"
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
          />
        </div>

        {/* Name */}
        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-1)', letterSpacing: '-0.02em', lineHeight: 1.3, marginBottom: 8 }}>
          {name}
        </p>

        {/* Parents */}
        <p style={{ fontSize: 10, color: 'var(--ink-3)', lineHeight: 1.6, marginBottom: 10 }}>
          {father}<br />& {mother}
        </p>

        {/* Lihat profil */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          fontSize: 10, fontWeight: 700,
          color: 'var(--accent)',
          background: 'var(--accent-bg)',
          padding: '4px 10px',
          borderRadius: 20,
          marginBottom: 12,
        }}>
          Lihat profil
          <ArrowUpRight size={11} strokeWidth={2.5} />
        </div>

        {/* Divider */}
        <div style={{ width: '100%', height: 1, background: 'var(--border)', marginBottom: 12 }} />

        {/* Instagram button */}
        <a
          href={`https://instagram.com/${instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            fontSize: 10, fontWeight: 700,
            color: '#dc2743',
            background: '#fff0f3',
            padding: '5px 10px',
            borderRadius: 20,
            textDecoration: 'none',
            letterSpacing: '0.01em',
            border: '1px solid #fbc8d4',
          }}
        >
          <IgIcon size={13} />
          @{instagram}
        </a>
      </div>
    </Link>
  )
}

export default function SectionMempelai({ q }: { q: string }) {
  const { groom, bride } = weddingConfig

  return (
    <div style={{ padding: '0 20px', marginTop: 16 }} className="fade-up fade-up-delay-2">
      <p style={{ ...S.label, marginBottom: 10 }}>Mempelai</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 10, alignItems: 'stretch' }}>

        <PersonCard
          photo="/mempelai/laki.png"
          name={groom.name}
          father={groom.father}
          mother={groom.mother}
          instagram={INSTAGRAM.groom}
          slug={groom.slug}
          q={q}
        />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '8px 0' }}>
          <div style={{ width: 1, flex: 1, background: 'var(--border)' }} />
          <span style={{ fontSize: 16 }}>💍</span>
          <div style={{ width: 1, flex: 1, background: 'var(--border)' }} />
        </div>

        <PersonCard
          photo="/mempelai/cewe.png"
          name={bride.name}
          father={bride.father}
          mother={bride.mother}
          instagram={INSTAGRAM.bride}
          slug={bride.slug}
          q={q}
        />

      </div>
    </div>
  )
}