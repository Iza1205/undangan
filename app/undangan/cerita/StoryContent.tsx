'use client'

import { Suspense, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { weddingConfig } from '@/lib/weddingData'
import BottomNav from '@/components/BottomNav'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

function FadeUp({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode
  delay?: number
  style?: React.CSSProperties
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      style={style}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function StoryInner() {
  const searchParams = useSearchParams()
  const guest = searchParams.get('untuk') || 'Tamu Undangan'
  const router = useRouter()
  const { stories } = weddingConfig

  return (
    <div className="app-shell" style={{ background: '#FFFFFF', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="page-content" style={{ padding: '0 24px 140px' }}>

        {/* Header — slide down on mount */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', alignItems: 'center', gap: 16, paddingTop: 60, paddingBottom: 40 }}
        >
          <button
            onClick={() => router.back()}
            style={{
              width: 40, height: 40, borderRadius: '12px',
              border: '1px solid #F3F4F6', background: '#FFFFFF',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
            }}
          >
            <ArrowLeft size={18} color="#111827" />
          </button>
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>
              The Journey
            </p>
            <p style={{ fontSize: 16, fontWeight: 800, color: '#111827', letterSpacing: '-0.02em' }}>Cerita Cinta Kami</p>
          </div>
        </motion.div>

        {/* Story cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          {stories && stories.map((item, index) => (
            <FadeUp key={index} delay={index === 0 ? 0.1 : 0}>
              <div style={{ position: 'relative' }}>

                <div style={{
                  width: '100%',
                  height: 160,
                  borderRadius: '16px',
                  overflow: 'hidden',
                  marginBottom: 20,
                  position: 'relative',
                  border: '1px solid #F3F4F6'
                }}>
                  <Image
                    src={`/story/${index + 1}.png`}
                    alt={item.title}
                    fill
                    sizes="100vw"
                    priority={index === 0}
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                  />
                </div>

                <div style={{ padding: '0 4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', letterSpacing: '0.05em' }}>
                      {item.date}
                    </span>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#D1D5DB' }} />
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase' }}>
                      Part {index + 1}
                    </span>
                  </div>

                  <h3 style={{ fontSize: 20, fontWeight: 800, color: '#111827', marginBottom: 12, letterSpacing: '-0.03em', lineHeight: 1.2 }}>
                    {item.title}
                  </h3>

                  <div style={{ position: 'relative', paddingLeft: 16, borderLeft: '2px solid var(--accent-bg)' }}>
                    <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.8, fontWeight: 400 }}>
                      "{item.description}"
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp style={{ marginTop: 80, paddingTop: 40, borderTop: '1px solid #F3F4F6', textAlign: 'center' }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 8 }}>
            To be continued
          </p>
          <p style={{ fontSize: 13, color: '#6B7280' }}>Our journey is just beginning.</p>
        </FadeUp>

      </div>

      <BottomNav guestName={guest} />
    </div>
  )
}

export default function StoryContent() {
  return (
    <Suspense fallback={null}>
      <StoryInner />
    </Suspense>
  )
}