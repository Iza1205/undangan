'use client'

import React from 'react'
import Image from 'next/image'

export default function SectionKepada({ guest }: { guest: string }) {
  return (
    <div className="fade-up fade-up-delay-2" style={{ padding: '0 20px', marginTop: 40 }}>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>

        <div style={{ position: 'relative', width: '52px', height: '52px', flexShrink: 0 }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '1.5px solid var(--border)',
            background: 'var(--surface)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Image
              src="/icon/avatar.png"
              alt="Guest avatar"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <p style={{
            fontSize: '10px',
            color: 'var(--ink-3)',
            margin: '0 0 3px 0',
          }}>
            Kepada Yth.
          </p>
          <h2 style={{
            fontSize: '15px',
            fontWeight: 700,
            color: 'var(--ink-1)',
            margin: '0 0 4px 0',
            lineHeight: 1.3,
          }}>
            {guest}
          </h2>
          <p style={{ 
            fontSize: '10px',
            color: 'var(--ink-3)',
            margin: 0,
          }}>
            Kami mengundang Anda untuk hadir di hari bahagia kami.
          </p>
        </div>
      </div>
    </div>
  )
}