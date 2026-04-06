'use client'

import { Suspense, useRef, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import BottomNav from '@/components/BottomNav'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

// ── Data cerita — edit langsung di sini ──
const stories = [
  {
    date: '2023',
    title: 'Awal Pertemuan',
    image: '/story/A.png',
    description: [
      'Awalnya cuma ikut teman ke pantai, niatnya ya sekadar jalan dan refreshing. Di situ kita pertama kali ketemu. Obrolannya langsung nyambung, nggak canggung, dan nyaman aja dari awal.',
      'Yang paling keinget justru momen pulang boncengan dari pantai sambil ngobrol santai. Sederhana, tapi malah jadi momen yang kepikiran terus setelahnya.',
    ],
  },
  {
    date: '2023',
    title: 'Menjalin Komitmen',
    image: '/story/b.png',
    description: [
      'Setelah dari pantai, kita tetap lanjut komunikasi. Awalnya biasa aja, tapi lama-lama jadi kebiasaan chat, telpon, dan saling cerita hal-hal kecil.',
      'Dari situ kita sadar kalau hubungan ini lebih dari sekadar teman. Akhirnya di tahun itu juga, kita sepakat untuk jalan bareng dan mulai hubungan yang lebih serius.',
    ],
  },
  {
    date: '2024',
    title: 'LDR Serang - Jogja',
    image: '/story/c.png',
    description: [
      'Setelah Nurul lulus, dia pulang ke Jogja dan kita mulai LDR Serang – Jogja. Nggak selalu mudah, karena nggak bisa ketemu kapan aja.',
      'Tapi kita tetap jalanin, saling jaga komunikasi. Sesekali ada waktu buat ketemu, termasuk di akhir 2024 waktu wisuda momen singkat tapi cukup berarti.',
    ],
  },
  {
    date: '2025',
    title: 'LDR Serang - Jakarta',
    image: '/story/f.png',
    description: [
      'Awal 2025, Iza pindah kerja ke Jakarta. Jarak jadi lebih dekat dibanding sebelumnya, walaupun masih LDR.',
      'Bedanya, sekarang lebih sering punya kesempatan buat ketemu. Nggak selalu lama, tapi cukup buat jaga hubungan tetap jalan dengan baik.',
    ],
  },
  {
    date: '2026',
    title: 'Dari perjalanan panjang, akhirnya satu tujuan.',
    image: '/story/e.png',
    description: [
      'Setelah melewati berbagai fase ketemu tanpa rencana, LDR jauh, sampai yang lebih dekat kita belajar banyak hal tentang komitmen dan konsisten.',
      'Akhirnya di tahun 2026, kita memutuskan untuk melangkah ke tahap yang lebih serius. 02-06-2026 jadi hari yang kita pilih untuk memulai bab baru, sebagai pasangan suami istri.',
    ],
  },
]

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

  const autoScrollRef = useRef<number | null>(null)
  const userStoppedRef = useRef(false)
  const [isAutoScrolling, setIsAutoScrolling] = useState(false)

  useEffect(() => {
    const startDelay = setTimeout(() => {
      if (userStoppedRef.current) return

      setIsAutoScrolling(true)

      const scroll = () => {
        if (userStoppedRef.current) return

        const atBottom = window.scrollY + window.innerHeight >= document.body.scrollHeight - 2
        if (atBottom) {
          setIsAutoScrolling(false)
          return
        }

        window.scrollBy(0, 0.8)
        autoScrollRef.current = requestAnimationFrame(scroll)
      }

      autoScrollRef.current = requestAnimationFrame(scroll)
    }, 1500)

    const stopAutoScroll = () => {
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current)
        autoScrollRef.current = null
      }
      userStoppedRef.current = true
      setIsAutoScrolling(false)
    }

    window.addEventListener('wheel', stopAutoScroll, { passive: true })
    window.addEventListener('touchstart', stopAutoScroll, { passive: true })

    return () => {
      clearTimeout(startDelay)
      if (autoScrollRef.current) cancelAnimationFrame(autoScrollRef.current)
      window.removeEventListener('wheel', stopAutoScroll)
      window.removeEventListener('touchstart', stopAutoScroll)
    }
  }, [])

  return (
    <div className="app-shell" style={{ background: '#FFFFFF', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="page-content" style={{ padding: '0 24px 140px' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ paddingTop: 60, paddingBottom: 40 }}
        >
          <p style={{
            fontSize: 11,
            fontWeight: 700,
            color: 'var(--accent)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: 8,
          }}>
            ✦ The Journey
          </p>
          <h1 style={{
            fontSize: 23,
            fontWeight: 800,
            color: '#111827',
            letterSpacing: '-0.04em',
            lineHeight: 1.15,
            marginBottom: 10,
          }}>
            Kisah Cinta<br />yang Mengawali Segalanya
          </h1>
          <p style={{
            fontSize: 13,
            color: '#9CA3AF',
            fontWeight: 400,
            lineHeight: 1.6,
          }}>
            Setiap momen kecil punya tempatnya sendiri dalam cerita ini.
          </p>
        </motion.div>

        {/* Story cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          {stories.map((item, index) => (
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
                    src={item.image}
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

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {Array.isArray(item.description)
                      ? item.description.map((para, i) => (
                          <div key={i} style={{ paddingLeft: 16, borderLeft: '2px solid var(--accent-bg)' }}>
                            <p style={{ fontSize: 12, color: '#374151', lineHeight: 1.8, fontWeight: 400 }}>
                              {para}
                            </p>
                          </div>
                        ))
                      : (
                          <div style={{ paddingLeft: 16, borderLeft: '2px solid var(--accent-bg)' }}>
                            <p style={{ fontSize: 12, color: '#374151', lineHeight: 1.8, fontWeight: 400 }}>
                              {item.description}
                            </p>
                          </div>
                        )
                    }
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

      {/* Indikator auto-scroll */}
      {isAutoScrolling && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'fixed',
            bottom: 100,
            right: 20,
            background: 'rgba(0,0,0,0.45)',
            color: '#fff',
            fontSize: 10,
            fontWeight: 600,
            padding: '6px 12px',
            borderRadius: 20,
            letterSpacing: '0.05em',
            pointerEvents: 'none',
            zIndex: 50,
          }}
        >
          scroll otomatis
        </motion.div>
      )}

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