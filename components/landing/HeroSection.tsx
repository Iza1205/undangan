import { WA_LINK } from "./styles";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;1,400&display=swap');

  .hero {
    position: relative;
    min-height: 100vh;
    display: grid;
    place-items: center;
    overflow: hidden;
    padding: 140px 64px 100px;
    background: #ffffff;
    font-family: 'Inter', sans-serif;
  }

  .hero-blue-top {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: #2563eb;
    z-index: 1;
  }

  .hero-inner {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    max-width: 680px;
    width: 100%;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 44px;
    background: #eff6ff;
    border: 1px solid #bfdbfe;
    padding: 6px 14px;
    border-radius: 4px;
    animation: fadeIn 0.6s ease both;
  }
  .hero-badge-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #2563eb;
    animation: pulse 2s ease-in-out infinite;
  }
  .hero-badge-text {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #2563eb;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.35; }
  }

  .hero-headline {
    font-family: 'Inter', sans-serif;
    font-size: clamp(36px, 6vw, 68px);
    font-weight: 600;
    line-height: 1.1;
    letter-spacing: -0.03em;
    color: #0a0a0a;
    margin: 0 0 4px 0;
    animation: fadeUp 0.7s 0.1s ease both;
  }

  .hero-headline-accent {
    font-family: 'Playfair Display', serif;
    font-size: clamp(36px, 6vw, 68px);
    font-weight: 400;
    font-style: italic;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: #2563eb;
    display: block;
    margin: 0 0 32px 0;
    animation: fadeUp 0.7s 0.18s ease both;
  }

  .hero-divider {
    width: 40px;
    height: 2px;
    background: #2563eb;
    margin-bottom: 28px;
    animation: fadeUp 0.7s 0.22s ease both;
  }

  .hero-sub {
    font-size: 15px;
    font-weight: 400;
    color: #6b7280;
    line-height: 1.8;
    max-width: 460px;
    margin-bottom: 48px;
    animation: fadeUp 0.7s 0.28s ease both;
  }

  .hero-cta {
    display: flex;
    align-items: center;
    gap: 20px;
    animation: fadeUp 0.7s 0.36s ease both;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: #2563eb;
    color: #fff;
    padding: 14px 28px;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-decoration: none;
    transition: background 0.2s, transform 0.15s;
    white-space: nowrap;
  }
  .btn-primary:hover {
    background: #1d4ed8;
    transform: translateY(-1px);
  }

  .btn-ghost {
    font-size: 13px;
    font-weight: 400;
    color: #9ca3af;
    letter-spacing: 0.04em;
    text-decoration: none;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 2px;
    transition: color 0.2s, border-color 0.2s;
    white-space: nowrap;
  }
  .btn-ghost:hover {
    color: #374151;
    border-bottom-color: #9ca3af;
  }

  .hero-social {
    position: absolute;
    right: 32px;
    top: 50%;
    transform: translateY(-50%) rotate(90deg);
    display: flex;
    gap: 24px;
    align-items: center;
    z-index: 2;
    animation: fadeIn 1s 0.8s ease both;
  }
  .hero-social a {
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #9ca3af;
    text-decoration: none;
    transition: color 0.2s;
  }
  .hero-social a:hover { color: #2563eb; }
  .hero-social-dot {
    width: 3px; height: 3px;
    border-radius: 50%;
    background: #d1d5db;
  }

  .hero-bottom-line {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 1px;
    background: #f3f4f6;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* ── Mobile ── */
  @media (max-width: 768px) {
    .hero {
      padding: 100px 24px 60px;
      place-items: start;
      min-height: 100svh;
    }
    .hero-inner {
      max-width: 100%;
    }
    .hero-badge {
      margin-bottom: 32px;
    }
    .hero-headline {
      font-size: 36px;
    }
    .hero-headline-accent {
      font-size: 36px;
      margin-bottom: 24px;
    }
    .hero-divider {
      margin-bottom: 20px;
    }
    .hero-sub {
      font-size: 14px;
      max-width: 100%;
      margin-bottom: 36px;
      line-height: 1.7;
    }
    .hero-cta {
      flex-direction: column;
      align-items: flex-start;
      gap: 14px;
      width: 100%;
    }
    .btn-primary {
      width: 100%;
      justify-content: center;
      padding: 15px 28px;
      font-size: 14px;
    }
    .btn-ghost {
      font-size: 13px;
    }
    .hero-social {
      display: none;
    }
  }

  /* ── Small mobile ── */
  @media (max-width: 380px) {
    .hero {
      padding: 88px 20px 48px;
    }
    .hero-headline {
      font-size: 30px;
    }
    .hero-headline-accent {
      font-size: 30px;
    }
  }
`;

export default function HeroSection() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <section className="hero">
        <div className="hero-blue-top" />
        <div className="hero-bottom-line" />

        <div className="hero-inner">
          <div className="hero-badge">
            <div className="hero-badge-dot" />
            <span className="hero-badge-text">Digital Wedding Invitation</span>
          </div>

          <h1 className="hero-headline">Undangan yang</h1>
          <span className="hero-headline-accent">Tak Terlupakan</span>

          <div className="hero-divider" />

          <p className="hero-sub">
            Kami merancang undangan pernikahan digital yang mewah, personal, dan memukau —
            sebuah pengalaman pertama yang layak untuk momen terpenting hidupmu.
          </p>

          <div className="hero-cta">
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn-primary">
              <span>Pesan Undangan</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#features" className="btn-ghost">Lihat lebih lanjut</a>
          </div>
        </div>

        <div className="hero-social">
          <a href="https://www.instagram.com/izamhn/" target="_blank" rel="noreferrer">Instagram</a>
          <div className="hero-social-dot" />
          <a href="https://www.tiktok.com/@izamhn" target="_blank" rel="noreferrer">TikTok</a>
        </div>
      </section>
    </>
  );
}