'use client'

import { useEffect, useState } from 'react'

const fullText = `"Jika seseorang menikah, maka ia telah menyempurnakan separuh agamanya. Karenanya, bertakwalah pada Allah pada separuh yang lainnya." (HR. Al Baihaqi)`

export default function SectionHadist() {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(fullText.slice(0, i))
      if (i >= fullText.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, 30)
    return () => clearInterval(interval)
  }, [])

  const highlight = `menyempurnakan separuh agamanya.`

  const renderText = () => {
    const idx = displayed.indexOf(highlight)
    if (idx === -1) return <span>{displayed}</span>
    return (
      <>
        {displayed.slice(0, idx)}
        <span style={{ fontWeight: 600, color: 'var(--ink-1)' }}>
          {displayed.slice(idx, idx + highlight.length)}
        </span>
        {displayed.slice(idx + highlight.length)}
      </>
    )
  }

  return (
    <div style={{ padding: '0 20px', marginTop: 20 }}>
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 14,
        padding: '14px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}>
        <p style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'var(--accent)',
          margin: 0,
        }}>
          ✦ HR. Al Baihaqi
        </p>

        <p style={{
          fontSize: 12,
          lineHeight: 1.8,
          color: 'var(--ink-2)',
          margin: 0,
          fontWeight: 300,
        }}>
          {renderText()}
          {!done && (
            <span style={{
              display: 'inline-block',
              width: '1px',
              height: '12px',
              backgroundColor: 'var(--accent)',
              marginLeft: '1px',
              verticalAlign: 'middle',
              animation: 'blink 0.7s step-end infinite',
            }} />
          )}
        </p>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </div>
  )
}