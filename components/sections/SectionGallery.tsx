'use client'

import { weddingConfig } from '@/lib/weddingData'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

export default function SectionGallery() {
  const { gallery } = weddingConfig
  const searchParams = useSearchParams()
  const guest = searchParams.get('untuk') || 'Tamu Undangan'

  /** * PERBAIKAN PATH: 
   * Karena file kamu ada di app/undangan/gallery/page.tsx, 
   * maka href-nya wajib diawali dengan /undangan
   */
  const galleryUrl = `/undangan/gallery?untuk=${encodeURIComponent(guest)}`

  // Triple array untuk memastikan loop tidak putus di layar lebar
  const scrollItems = [...gallery, ...gallery, ...gallery]

  return (
    <div className="section-gallery-wrapper fade-up fade-up-delay-5">
      
      {/* HEADER: Label & Tombol Lihat Semua */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '0 20px', 
        marginBottom: 16 
      }}>
        <div className="section-label" style={{ margin: 0, padding: 0 }}>
          Our Moments
        </div>
        
        {/* Tombol yang sekarang mengarah ke /undangan/gallery */}
        <Link 
          href={galleryUrl}
          style={{ 
            fontSize: '11px', 
            fontWeight: 700, 
            color: 'var(--accent)', 
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'var(--accent-bg)',
            padding: '6px 12px',
            borderRadius: '20px',
            transition: 'all 0.2s'
          }}
          className="hover-opacity"
        >
          Lihat Semua <ArrowRight size={12} strokeWidth={3} />
        </Link>
      </div>

      {/* SLIDER FOTO */}
      <div className="gallery-viewport">
        <div className="gallery-track">
          {scrollItems.map((src, index) => (
            <div key={index} className="gallery-item-pro">
              <Image 
                src={src} 
                alt={`Gallery ${index}`}
                fill
                sizes="240px"
                className="object-cover"
                priority={index < 5}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}