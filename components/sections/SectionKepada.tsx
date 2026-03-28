'use client'

import React from 'react'

export default function SectionKepada({ guest }: { guest: string }) {
  return (
    <div className="fade-up fade-up-delay-2" style={{ padding: '0 30px', marginTop: 20 }}>
      <div style={{
        position: 'relative',
        paddingLeft: '16px',
        borderLeft: '1.5px solid var(--accent)', // Garis tipis minimalis
      }}>
        <p style={{ 
          fontSize: '9px', 
          fontWeight: 600, 
          color: 'var(--ink-3)', 
          letterSpacing: '0.2em', 
          textTransform: 'uppercase',
          marginBottom: '4px'
        }}>
          Dear Distinguished Guest
        </p>
        
        <h2 style={{ 
          fontSize: '15px', // Ukuran lebih proporsional
          fontWeight: 700, 
          color: 'var(--ink-1)', 
          letterSpacing: '-0.01em',
          margin: 0,
          lineHeight: 1.2
        }}>
          {guest}
        </h2>
        
        <p style={{ 
          fontSize: '11px', 
          color: 'var(--ink-3)', 
          marginTop: '4px',
          opacity: 0.8,
          fontWeight: 400
        }}>
          Kami mengundang Anda untuk hadir di hari bahagia kami.
        </p>
      </div>
    </div>
  )
}