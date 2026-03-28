'use client'

import React from 'react'

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map(word => word[0]?.toUpperCase() || '')
    .join('')
}

export default function SectionKepada({ guest }: { guest: string }) {
  const initials = getInitials(guest)

  return (
    <div className="fade-up fade-up-delay-2" style={{ padding: '0 30px', marginTop: 40 }}>
      <style>{`
        @keyframes spin-gradient {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>

        <div style={{ position: 'relative', width: '52px', height: '52px', flexShrink: 0 }}>
          <div style={{
            position: 'absolute',
            inset: '-1.5px',
            borderRadius: '50%',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              inset: '-50%',
              background: 'conic-gradient(from 0deg, #4F46E5, #8E46E5, #E59346, #4F46E5)',
              animation: 'spin-gradient 4s linear infinite',
            }} />
          </div>

          <div style={{
            position: 'absolute',
            inset: '2px',
            borderRadius: '50%',
            overflow: 'hidden',
            zIndex: 1,
          }}>
            <img
              src="/icon/icon.png"
              alt="Guest avatar"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                const target = e.currentTarget
                target.style.display = 'none'
                const parent = target.parentElement!
                parent.style.backgroundColor = 'var(--accent)'
                parent.style.display = 'flex'
                parent.style.alignItems = 'center'
                parent.style.justifyContent = 'center'
                parent.innerHTML = `<span style="font-size:18px;font-weight:700;color:white">${initials}</span>`
              }}
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