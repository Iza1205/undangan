import { WA_LINK } from "./styles";

const css = `
  .hero {
    position: relative;
    min-height: 100vh;
    display: grid;
    place-items: center;
    overflow: hidden;
    padding: 120px 32px 80px;
  }

  /* Noise texture overlay */
  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.035;
    pointer-events: none;
    z-index: 0;
  }

  /* Radial gold glow top-right */
  .hero-glow {
    position: absolute;
    width: 700px; height: 700px;
    background: radial-gradient(circle, rgba(200,169,106,0.12) 0%, transparent 65%);
    top: -200px; right: -200px;
    pointer-events: none;
    z-index: 0;
  }

  /* Bottom left subtle glow */
  .hero-glow-2 {
    position: absolute;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(200,169,106,0.07) 0%, transparent 65%);
    bottom: -100px; left: -100px;
    pointer-events: none;
    z-index: 0;
  }

  /* Horizontal rule top */
  .hero-rule {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    opacity: 0.4;
    z-index: 1;
  }

  .hero-inner {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 760px;
    gap: 0;
  }

  /* Year / badge */
  .hero-badge {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 36px;
    animation: fadeIn 1s ease both;
  }
  .hero-badge-line {
    width: 40px; height: 1px;
    background: var(--gold);
    opacity: 0.6;
    animation: lineGrow 0.8s 0.3s ease both;
    transform-origin: left;
  }
  .hero-badge-text {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
  }

  /* Main headline */
  .hero-headline {
    font-family: 'Playfair Display', serif;
    font-size: clamp(48px, 10vw, 88px);
    font-weight: 400;
    line-height: 1.08;
    letter-spacing: -0.02em;
    color: var(--cream);
    margin-bottom: 8px;
    animation: fadeUp 0.9s 0.15s ease both;
  }

  .hero-headline-italic {
    font-family: 'Playfair Display', serif;
    font-size: clamp(48px, 10vw, 88px);
    font-weight: 400;
    font-style: italic;
    line-height: 1.08;
    letter-spacing: -0.02em;
    background: linear-gradient(90deg, var(--gold-dim), var(--gold), #e8d5a0, var(--gold));
    background-size: 300% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: fadeUp 0.9s 0.2s ease both, shimmer 6s 1s linear infinite;
    display: block;
    margin-bottom: 36px;
  }

  .hero-sub {
    font-size: 15px;
    font-weight: 300;
    color: var(--white-60);
    line-height: 1.8;
    max-width: 400px;
    margin-bottom: 52px;
    animation: fadeUp 0.9s 0.3s ease both;
  }

  /* CTA group */
  .hero-cta {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    animation: fadeUp 0.9s 0.4s ease both;
  }

  .btn-outline-gold {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    border: 1px solid rgba(200,169,106,0.5);
    color: var(--cream);
    padding: 16px 40px;
    border-radius: 2px;
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-decoration: none;
    position: relative;
    overflow: hidden;
    transition: color 0.3s, border-color 0.3s;
  }
  .btn-outline-gold::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--gold);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.35s cubic-bezier(0.77,0,0.18,1);
    z-index: -1;
  }
  .btn-outline-gold:hover { color: var(--ink); border-color: var(--gold); }
  .btn-outline-gold:hover::before { transform: scaleX(1); }

  .btn-text {
    font-size: 12px;
    color: var(--white-40);
    letter-spacing: 0.08em;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: color 0.2s, border-color 0.2s;
  }
  .btn-text:hover { color: var(--gold); border-bottom-color: var(--gold-dim); }

  /* Scroll indicator */
  .hero-scroll {
    position: absolute;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    z-index: 2;
    animation: fadeIn 1s 1s ease both;
  }
  .hero-scroll span {
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--white-40);
  }
  .hero-scroll-bar {
    width: 1px;
    height: 40px;
    background: linear-gradient(to bottom, var(--gold), transparent);
    animation: float 2s ease-in-out infinite;
  }

  /* Social links */
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
    color: var(--white-40);
    text-decoration: none;
    transition: color 0.2s;
  }
  .hero-social a:hover { color: var(--gold); }
  .hero-social-dot {
    width: 3px; height: 3px;
    border-radius: 50%;
    background: var(--white-20);
  }

  @media (max-width: 640px) {
    .hero-social { display: none; }
    .hero-headline { font-size: 40px; }
    .hero-headline-italic { font-size: 40px; }
  }
`;

export default function HeroSection() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <section className="hero">
        <div className="hero-rule" />
        <div className="hero-glow" />
        <div className="hero-glow-2" />

        <div className="hero-inner">
          <div className="hero-badge">
            <div className="hero-badge-line" />
            <span className="hero-badge-text">Digital Wedding Invitation</span>
            <div className="hero-badge-line" style={{ transformOrigin: "right" }} />
          </div>

          <h1 className="hero-headline">Undangan yang</h1>
          <span className="hero-headline-italic">Tak Terlupakan</span>

          <p className="hero-sub">
            Kami merancang undangan pernikahan digital yang mewah, personal, dan memukau —
            sebuah pengalaman pertama yang layak untuk momen terpenting hidupmu.
          </p>

          <div className="hero-cta">
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn-outline-gold">
              <span>Pesan Undangan</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#features" className="btn-text">Lihat lebih lanjut</a>
          </div>
        </div>

        <div className="hero-scroll">
          <div className="hero-scroll-bar" />
          <span>Scroll</span>
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
