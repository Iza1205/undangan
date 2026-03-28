'use client'

import { useState, useEffect } from 'react'
import { weddingConfig } from '@/lib/weddingData'

export default function Countdown() {
  const [mounted, setMounted] = useState(false)
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    setMounted(true) // Menandakan komponen sudah muncul di browser

    const calc = () => {
      // Mengambil data dari string '2025-06-14T08:00:00'
      const target = new Date(weddingConfig.countdown).getTime()
      const now = new Date().getTime()
      const diff = target - now

      if (diff <= 0) {
        setT({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setT({
        days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours:   Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      })
    }

    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [])

  // Jika belum 'mounted', jangan tampilkan angka dulu agar tidak error/mismatch
  if (!mounted) return null 

  const items = [
    { v: t.days,    l: 'Hari' },
    { v: t.hours,   l: 'Jam' },
    { v: t.minutes, l: 'Menit' },
    { v: t.seconds, l: 'Detik' },
  ]

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', gap: '8px' }}>
      {items.map(({ v, l }, i) => (
        <div key={l} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <div style={{ textAlign: 'center', width: '100%' }}>
            <div style={{
              background: '#F3F4F6', 
              borderRadius: 12,
              height: 52,
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              border: '1px solid #E5E7EB',
              marginBottom: 6
            }}>
              <span style={{ 
                color: '#111827', 
                fontSize: '22px', 
                fontWeight: 800, 
                fontVariantNumeric: 'tabular-nums' 
              }}>
                {String(v).padStart(2, '0')}
              </span>
            </div>
            <span style={{ color: '#6B7280', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {l}
            </span>
          </div>
          {i < 3 && (
            <span style={{ color: '#D1D5DB', fontSize: '20px', fontWeight: 300, paddingBottom: 22, margin: '0 4px' }}>:</span>
          )}
        </div>
      ))}
    </div>
  )
}