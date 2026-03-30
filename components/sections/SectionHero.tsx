'use client'

import Countdown from '@/components/Countdown'
import { ChevronRight, Calendar, ChevronDown } from 'lucide-react'
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

          <div className="force-countdown-dark" style={{
            background: '#F9FAFB',
            borderRadius: 12,
            padding: '16px 10px',
            border: '1px solid #F3F4F6'
          }}>
            <Countdown />
          </div>

          <div style={{ marginTop: 20 }}>
            <Link
              href={`/undangan/doa${q}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                background: '#111827',
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
              Konfirmasi Kehadiran Anda <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-bounce" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        marginTop: 10,
        opacity: 0.4,
      }}>
        <p style={{ fontSize: 9, fontWeight: 500, color: 'var(--ink-3)', letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
          Scroll
        </p>
        <ChevronDown size={14} color="var(--ink-3)" />
      </div>

      <style jsx global>{`
        .force-countdown-dark * {
          color: #111827 !important;
        }
        .force-countdown-dark span {
          font-weight: 700 !important;
        }
        .force-countdown-dark p,
        .force-countdown-dark label,
        .force-countdown-dark .label-countdown {
          opacity: 0.7;
          font-size: 10px !important;
          text-transform: uppercase;
        }
        @keyframes scroll-bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(5px); }
        }
        .scroll-bounce {
          animation: scroll-bounce 1.2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}