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
      'Maret 2023 menjadi awal kisah kami. Dari sebuah pertemuan sederhana, kami saling berkenalan dan mulai berbagi cerita tentang banyak hal.',
      'Obrolan demi obrolan mengalir begitu saja, menghadirkan rasa nyaman yang perlahan tumbuh menjadi kedekatan. Tanpa disadari, pertemuan itu menjadi titik awal perjalanan yang tidak pernah kami sangka sebelumnya.',
    ],
  },
  {
    date: '2023',
    title: 'Menjalin Komitmen',
    image: '/story/b.png',
    description: [
      'Seiring berjalannya waktu, kami merasa ada kecocokan yang semakin kuat. Dari rasa nyaman itu, kami pun sepakat untuk melangkah lebih jauh dan menjalin sebuah hubungan.',
      'Hari-hari yang kami lalui bersama menjadi penuh warna, diisi dengan tawa, cerita, serta proses saling memahami satu sama lain.',
    ],
  },
  {
    date: '2024',
    title: 'LDR Serang - Jogja',
    image: '/story/c.png',
    description: [
      'Mei 2024 menjadi salah satu fase yang cukup menantang. Nurul memutuskan untuk pulang kampung demi pekerjaan, sementara Iza masih menetap di Jogja.',
      'Jarak pun hadir di antara kami, menjadikan hubungan ini harus dijalani dengan kesabaran dan kepercayaan. Delapan bulan menjalani hubungan jarak jauh (LDR) bukanlah hal yang mudah. Rindu seringkali datang tanpa permisi, namun komunikasi dan komitmen menjadi jembatan yang menguatkan kami.',
    ],
  },
  {
    date: '2025',
    title: 'LDR Serang - Jakarta',
    image: '/story/f.png',
    description: [
      'Januari 2025, sebuah langkah baru kembali diambil. Iza memutuskan untuk bekerja di Jakarta. Meskipun jarak masih memisahkan, kami merasakan bahwa hubungan ini justru semakin dekat.',
      'Perjalanan yang kami lalui selama LDR mengajarkan arti kesetiaan, kepercayaan, dan pentingnya saling menjaga satu sama lain.',
      'Desember 2025 menjadi momen yang sangat berarti dalam perjalanan kami. Dengan penuh keyakinan dan kesungguhan, Iza meminta izin kepada orang tua untuk membawa hubungan ini ke jenjang yang lebih serius. Restu dan doa dari keluarga menjadi kekuatan besar bagi kami untuk melangkah ke tahap berikutnya.'
    ],
  },
  {
    date: '2026',
    title: 'Dari perjalanan panjang, akhirnya satu tujuan.',
    image: '/story/e.png',
    description: [
      'Hingga akhirnya, setelah melalui berbagai proses, cerita, dan perjalanan yang penuh makna, kami sampai pada titik yang kami impikan bersama. Dengan penuh rasa syukur, cinta, dan harapan, 02 Juni 2026 menjadi hari di mana kami memulai babak baru dalam hidup kami, mengikat janji suci dalam pernikahan.',
      'Semoga langkah ini menjadi awal dari perjalanan panjang yang selalu dipenuhi cinta, keberkahan, kebahagiaan, serta kebersamaan hingga akhir hayat.',
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