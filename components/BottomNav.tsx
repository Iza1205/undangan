'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Home, Calendar, Heart, Image } from 'lucide-react'

export default function BottomNav({ guestName }: { guestName?: string }) {
  const pathname = usePathname()
  const router   = useRouter()
  const q        = guestName ? `?untuk=${encodeURIComponent(guestName)}` : ''

  const items = [
    { icon: Home,     label: 'Beranda', path: `/undangan/home${q}`,        match: /^\/undangan(\/home)?$/ },
    { icon: Heart,    label: 'Cerita',  path: `/undangan/cerita${q}`,      match: /^\/undangan\/cerita/ },
    { icon: null,     label: 'Doa',     path: `/undangan/doa${q}`,         match: /^\/undangan\/doa/ },
    { icon: Image,    label: 'Gallery', path: `/undangan/gallery${q}`,     match: /^\/undangan\/gallery/ },
    { icon: Calendar, label: 'Jadwal',  path: `/undangan/jadwal${q}`,      match: /^\/undangan\/jadwal/ },
  ]

  return (
    <>
      <style>{`
        .bn-wrap {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          justify-content: center;
          padding: 0 0 env(safe-area-inset-bottom, 0px);
          background: rgba(255,255,255,0.82);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top: 1px solid rgba(0,0,0,0.06);
        }
        .bn-inner {
          width: 100%;
          max-width: 480px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 6px 4px 8px;
        }
        .bn-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          padding: 4px 12px;
          border: none;
          background: none;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          outline: none;
          flex: 1;
        }
        .bn-btn:active { opacity: 0.6; }
        .bn-label {
          font-size: 9.5px;
          font-family: var(--font, system-ui);
          letter-spacing: -0.01em;
          line-height: 1;
        }
        /* Center Doa button */
        .bn-doa {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 0 12px;
          border: none;
          background: none;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          outline: none;
          position: relative;
          top: -10px;
          flex: 1;
        }
        .bn-doa:active .bn-doa-ring { transform: scale(0.92); }
        .bn-doa-ring {
          width: 46px;
          height: 46px;
          border-radius: 14px;
          background: var(--accent, #7C3AED);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(124,58,237,0.35);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .bn-doa-ring.active {
          box-shadow: 0 4px 20px rgba(124,58,237,0.5);
        }
        .bn-doa-label {
          font-size: 9.5px;
          font-family: var(--font, system-ui);
          letter-spacing: -0.01em;
          line-height: 1;
        }
      `}</style>

      <nav className="bn-wrap">
        <div className="bn-inner">
          {items.map(({ icon: Icon, label, path, match }) => {
            const active = match.test(pathname)
            const isDoa  = label === 'Doa'

            if (isDoa) {
              return (
                <button
                  key={label}
                  onClick={() => router.push(path)}
                  className="bn-doa"
                  aria-label="Doa"
                >
                  <div className={`bn-doa-ring${active ? ' active' : ''}`}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 11V5a2 2 0 0 0-4 0v3" />
                      <path d="M11 8V4a2 2 0 0 0-4 0v8" />
                      <path d="M7 14a5 5 0 0 0 10 0v-3" />
                      <path d="M19 9a2 2 0 0 1 2 2v1a8 8 0 0 1-16 0v-1a2 2 0 0 1 2-2" />
                    </svg>
                  </div>
                  <span
                    className="bn-doa-label"
                    style={{ color: active ? 'var(--accent, #7C3AED)' : 'var(--ink-3, #9ca3af)', fontWeight: active ? 600 : 400 }}
                  >
                    Doa
                  </span>
                </button>
              )
            }

            return (
              <button
                key={label}
                onClick={() => router.push(path)}
                className="bn-btn"
                aria-label={label}
              >
                {Icon && (
                  <Icon
                    size={22}
                    strokeWidth={active ? 2.2 : 1.6}
                    color={active ? 'var(--accent, #7C3AED)' : 'var(--ink-3, #9ca3af)'}
                    fill={active && label === 'Cerita' ? 'var(--accent, #7C3AED)' : 'none'}
                  />
                )}
                <span
                  className="bn-label"
                  style={{ 
                    color: active ? 'var(--accent, #7C3AED)' : 'var(--ink-3, #9ca3af)', 
                    fontWeight: active ? 600 : 400 
                  }}
                >
                  {label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>
    </>
  )
}