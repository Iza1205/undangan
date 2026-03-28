'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import BottomNav from '@/components/BottomNav'
import { ArrowLeft, X, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react'
import { galleryItems, categories, type GalleryCategory, type GalleryItem } from '@/lib/galleryData'
import { weddingConfig } from '@/lib/weddingData'

export default function GalleryPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const guest = searchParams.get('untuk') || 'Tamu Undangan'
  const { groom, bride } = weddingConfig

  const [activeCategory, setCategory] = useState<GalleryCategory>('Semua')
  const [lightbox, setLightbox] = useState<{ item: GalleryItem; index: number } | null>(null)
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({})

  const filtered = activeCategory === 'Semua'
    ? galleryItems
    : galleryItems.filter(i => i.category === activeCategory)

  const openLightbox = (item: GalleryItem, index: number) => setLightbox({ item, index })
  const closeLightbox = () => setLightbox(null)

  const goPrev = useCallback(() => {
    if (!lightbox) return
    const prev = (lightbox.index - 1 + filtered.length) % filtered.length
    setLightbox({ item: filtered[prev], index: prev })
  }, [lightbox, filtered])

  const goNext = useCallback(() => {
    if (!lightbox) return
    const next = (lightbox.index + 1) % filtered.length
    setLightbox({ item: filtered[next], index: next })
  }, [lightbox, filtered])

  useEffect(() => {
    if (!lightbox) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox, goPrev, goNext])

  let touchStartX = 0
  const onTouchStart = (e: React.TouchEvent) => { touchStartX = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? goNext() : goPrev()
  }

  const leftCol = filtered.filter((_, i) => i % 2 === 0)
  const rightCol = filtered.filter((_, i) => i % 2 === 1)

  return (
    <div className="app-shell">
      <style suppressHydrationWarning>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.94); }
          to   { opacity: 1; transform: scale(1); }
        }

        .g-header  { animation: fadeUp 0.5s cubic-bezier(0.2,0.8,0.2,1) both; }
        .g-filters { animation: fadeUp 0.5s cubic-bezier(0.2,0.8,0.2,1) 0.08s both; }
        .g-grid    { animation: fadeIn 0.5s ease 0.14s both; }

        .g-pill {
          flex-shrink: 0;
          padding: 5px 14px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 500;
          border: 1px solid var(--border);
          background: var(--bg);
          color: var(--ink-3);
          cursor: pointer;
          transition: all 0.2s;
          font-family: var(--font);
          white-space: nowrap;
        }
        .g-pill.active {
          background: var(--ink-1);
          color: #fff;
          border-color: var(--ink-1);
        }

        .g-cell {
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          background: var(--border);
          position: relative;
        }
        .g-cell:hover .g-cell-img { transform: scale(1.05); }
        .g-cell-img {
          transition: transform 0.5s ease;
        }

        .g-caption { padding: 6px 2px 10px; }
        .g-caption-cat {
          font-size: 9px;
          font-weight: 600;
          color: var(--ink-3);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .g-caption-txt {
          font-size: 11px;
          color: var(--ink-2);
          margin-top: 2px;
          line-height: 1.4;
        }

        .g-lightbox {
          position: fixed;
          inset: 0;
          z-index: 300;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 20px;
          animation: fadeIn 0.2s ease both;
        }
        .g-lightbox-card {
          background: var(--surface, #fff);
          border-radius: 20px;
          width: 100%;
          max-width: 300px;
          overflow: hidden;
          border: 0.5px solid rgba(0,0,0,0.08);
          animation: scaleIn 0.3s cubic-bezier(0.16,1,0.3,1) both;
        }
        .g-nav-btn {
          width: 32px; height: 32px;
          border-radius: 50%;
          border: 1px solid var(--border);
          background: var(--bg);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: background 0.15s;
        }
        .g-nav-btn:hover { background: var(--surface); }

        .g-filter-scroll::-webkit-scrollbar { display: none; }
        .g-filter-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="page-content" style={{ paddingBottom: 100 }}>

        {/* Header */}
        <div className="g-header" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '52px 20px 16px' }}>
          <button
            onClick={() => router.back()}
            style={{
              width: 34, height: 34, borderRadius: 10,
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', flexShrink: 0,
            }}
          >
            <ArrowLeft size={14} />
          </button>
          <div>
            <p style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--ink-1)' }}>
              Gallery
            </p>
            <p style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 1 }}>
              {groom.name} & {bride.name} · {filtered.length} foto
            </p>
          </div>
        </div>

        {/* Filters */}
        <div
          className="g-filters g-filter-scroll"
          style={{ display: 'flex', gap: 6, padding: '0 20px 14px', overflowX: 'auto' }}
        >
          {categories.map(cat => (
            <button
              key={cat}
              className={`g-pill${activeCategory === cat ? ' active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Staggered 2-col grid */}
        <div
          className="g-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '0 12px' }}
        >
          {/* Left column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {leftCol.map((item, colIdx) => {
              const globalIdx = filtered.indexOf(item)
              const isTall = colIdx % 3 === 0
              return (
                <div key={`${item.id}-${activeCategory}`}>
                  <div
                    className="g-cell"
                    onClick={() => openLightbox(item, globalIdx)}
                    style={{ aspectRatio: isTall ? '3/4' : '1/1' }}
                  >
                    {!imgErrors[item.id] ? (
                      <Image
                        src={item.src}
                        alt={item.caption}
                        fill
                        sizes="45vw"
                        className="g-cell-img"
                        style={{ objectFit: 'cover' }}
                        onError={() => setImgErrors(prev => ({ ...prev, [item.id]: true }))}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ImageOff size={16} color="var(--ink-3)" />
                      </div>
                    )}
                  </div>
                  <div className="g-caption">
                    <div className="g-caption-cat">{item.category}</div>
                    <div className="g-caption-txt">{item.caption}</div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right column — sedikit offset ke bawah */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 32 }}>
            {rightCol.map((item, colIdx) => {
              const globalIdx = filtered.indexOf(item)
              const isTall = colIdx % 3 === 1
              return (
                <div key={`${item.id}-${activeCategory}`}>
                  <div
                    className="g-cell"
                    onClick={() => openLightbox(item, globalIdx)}
                    style={{ aspectRatio: isTall ? '3/4' : '1/1' }}
                  >
                    {!imgErrors[item.id] ? (
                      <Image
                        src={item.src}
                        alt={item.caption}
                        fill
                        sizes="45vw"
                        className="g-cell-img"
                        style={{ objectFit: 'cover' }}
                        onError={() => setImgErrors(prev => ({ ...prev, [item.id]: true }))}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ImageOff size={16} color="var(--ink-3)" />
                      </div>
                    )}
                  </div>
                  <div className="g-caption">
                    <div className="g-caption-cat">{item.category}</div>
                    <div className="g-caption-txt">{item.caption}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Lightbox — card modal */}
      {lightbox && (
        <div
          className="g-lightbox"
          onClick={closeLightbox}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="g-lightbox-card"
            onClick={e => e.stopPropagation()}
          >
            {/* Image area */}
            <div style={{ position: 'relative', width: '100%', aspectRatio: '4/5', background: 'var(--border)' }}>
              <Image
                src={lightbox.item.src}
                alt={lightbox.item.caption}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
              {/* Close button */}
              <button
                onClick={closeLightbox}
                style={{
                  position: 'absolute', top: 10, right: 10,
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'rgba(0,0,0,0.35)',
                  border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X size={13} color="#fff" />
              </button>
            </div>

            {/* Card body */}
            <div style={{ padding: '14px 16px 16px' }}>
              <div style={{
                fontSize: 9, fontWeight: 600, color: 'var(--ink-3)',
                letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4,
              }}>
                {lightbox.item.category}
              </div>
              <div style={{
                fontSize: 13, fontWeight: 500, color: 'var(--ink-1)',
                lineHeight: 1.4, marginBottom: 14,
              }}>
                {lightbox.item.caption}
              </div>

              {/* Footer: counter + nav */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>
                  {lightbox.index + 1} / {filtered.length}
                </span>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button className="g-nav-btn" onClick={goPrev}>
                    <ChevronLeft size={14} />
                  </button>
                  <button className="g-nav-btn" onClick={goNext}>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNav guestName={guest} />
    </div>
  )
}