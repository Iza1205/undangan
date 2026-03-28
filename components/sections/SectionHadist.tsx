'use client'

export default function SectionHadist() {
  return (
    <div style={{ padding: '0 20px', marginTop: 20 }}>
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 14,
        padding: '16px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}>
        <p style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'var(--accent)',
          margin: 0,
        }}>
          ✦ QS. Ar-Rum: 21
        </p>

        <p style={{
          fontSize: 12,
          lineHeight: 1.8,
          color: 'var(--ink-2)',
          margin: 0,
          fontWeight: 300,
        }}>
          "Dan di antara tanda-tanda kebesaran-Nya{' '}
          <span style={{ fontWeight: 600, color: 'var(--ink-1)' }}>
            ialah Dia menciptakan pasangan hidup untukmu dari jenismu sendiri,
          </span>
          {' '}supaya kamu merasa tenteram kepadanya."
        </p>
      </div>
    </div>
  )
}