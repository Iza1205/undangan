'use client'

export default function SectionCredit() {
  return (
    <div style={{
      padding: '20px 20px 36px',
      borderTop: '1px solid var(--border)',
      marginTop: 8,
      textAlign: 'center',
    }}>
      <p style={{ fontSize: 12, color: 'var(--ink-1)', margin: '0 0 1px' }}>
        <span style={{ fontWeight: 400, color: 'var(--ink-3)' }}>by </span>
        <span style={{ fontWeight: 700 }}>Iza Mahendra</span>
      </p>
      <p style={{ fontSize: 10, color: 'var(--ink-3)', margin: '0 0 10px', letterSpacing: '0.03em' }}>
        Wedding website creator
      </p>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          {
            label: 'WhatsApp',
            href: 'https://wa.me/6282285559247',
            icon: (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
            ),
          },
          {
            label: 'Instagram',
            href: 'https://www.instagram.com/izamhn/',
            icon: (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            ),
          },
          {
            label: 'TikTok',
            href: 'https://www.tiktok.com/@izamhn',
            icon: (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
              </svg>
            ),
          },
        ].map(({ label, href, icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              padding: '4px 10px',
              borderRadius: 20,
              border: '1px solid var(--border)',
              fontSize: 10,
              fontWeight: 500,
              color: 'var(--ink-2)',
              textDecoration: 'none',
              fontFamily: 'var(--font)',
            }}
          >
            {icon}
            {label}
          </a>
        ))}
      </div>
    </div>
  )
}