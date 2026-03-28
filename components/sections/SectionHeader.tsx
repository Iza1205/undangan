'use client'

import { weddingConfig } from '@/lib/weddingData'

const S: Record<string, React.CSSProperties> = {
  h2:    { fontSize: 22, fontWeight: 700, color: 'var(--ink-1)', letterSpacing: '-0.03em', lineHeight: 1.2 },
  small: { fontSize: 11, fontWeight: 400, color: 'var(--ink-3)' },
}

export default function SectionHeader() {
  const { groom, bride } = weddingConfig

  return (
    <div style={{ padding: '0 20px', paddingTop: 38, paddingBottom: 20 }} className="fade-up">
      <p style={S.small}>Undangan Pernikahan</p>
      <h1 style={{ ...S.h2, marginTop: 4 }}>{groom.name} &amp; {bride.name}</h1>
    </div>
  )
}