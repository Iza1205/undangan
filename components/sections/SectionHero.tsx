'use client'

import Countdown from '@/components/Countdown'
import { ChevronRight, Calendar } from 'lucide-react'
import Link from 'next/link'

export default function SectionHero({ q }: { q: string }) {
  return (
    <div className="fade-up fade-up-delay-1" style={{ padding: '0 20px', marginTop: 20 }}>
      <div style={{
        background: '#FFFFFF', 
        borderRadius: 18,
        padding: '24px 20px',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid #E5E7EB', 
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
      }}>
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Badge Label */}
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: 6, 
            background: 'var(--accent-bg)', 
            padding: '4px 10px',
            borderRadius: 6,
            marginBottom: 12
          }}>
            <Calendar size={12} color="var(--accent)" />
            <p style={{ 
              color: 'var(--accent)', 
              fontSize: '10px', 
              fontWeight: 800, 
              letterSpacing: '0.05em', 
              textTransform: 'uppercase',
              margin: 0
            }}>
              Save The Date
            </p>
          </div>

          <h2 style={{ 
            color: '#111827', 
            fontSize: '19px', 
            fontWeight: 800, 
            letterSpacing: '-0.03em', 
            marginBottom: 18, 
            lineHeight: 1.3,
            margin: '0 0 18px 0'
          }}>
            Menghitung Hari Menuju <br/>Momen Bahagia
          </h2>

          {/* Area Countdown dengan Kontras Tinggi */}
          <div className="force-countdown-dark" style={{ 
            background: '#F9FAFB', 
            borderRadius: 12, 
            padding: '16px 10px',
            border: '1px solid #F3F4F6'
          }}>
            <Countdown />
          </div>

          {/* Tombol yang Lebih Berisi & Bagus */}
          <div style={{ marginTop: 20 }}>
            <Link
              href={`/undangan/jadwal${q}`}
              style={{
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: 8,
                background: '#111827', // Hitam pekat agar kontras dengan putih
                color: '#FFFFFF', 
                fontSize: '13px', 
                fontWeight: 600,
                textDecoration: 'none', 
                padding: '14px 20px',
                borderRadius: '12px',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              Lihat Jadwal & Lokasi <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Global CSS untuk memperbaiki warna teks di dalam komponen Countdown */}
      <style jsx global>{`
        .force-countdown-dark * {
          color: #111827 !important; /* Memaksa warna angka & teks jadi hitam */
        }
        .force-countdown-dark span {
          font-weight: 700 !important;
        }
        /* Style tambahan agar label (Hari, Jam, dll) sedikit lebih soft tapi tetap terbaca */
        .force-countdown-dark p, 
        .force-countdown-dark label,
        .force-countdown-dark .label-countdown { 
          opacity: 0.7;
          font-size: 10px !important;
          text-transform: uppercase;
        }
      `}</style>
    </div>
  )
}