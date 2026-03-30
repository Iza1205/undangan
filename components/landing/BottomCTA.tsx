import { WA_LINK } from "./styles";

const css = `
  .cta {
    padding: 0 32px 80px;
    max-width: 1100px;
    margin: 0 auto;
  }

  .cta-inner {
    background: var(--ink-soft);
    border: 1px solid var(--white-10);
    padding: 100px 64px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  /* Decorative corner marks */
  .cta-inner::before,
  .cta-inner::after {
    content: '';
    position: absolute;
    width: 40px; height: 40px;
    border-color: rgba(200,169,106,0.3);
    border-style: solid;
  }
  .cta-inner::before {
    top: 24px; left: 24px;
    border-width: 1px 0 0 1px;
  }
  .cta-inner::after {
    bottom: 24px; right: 24px;
    border-width: 0 1px 1px 0;
  }

  /* Glow */
  .cta-glow {
    position: absolute;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(200,169,106,0.08) 0%, transparent 65%);
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  .cta-label {
    font-size: 11px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 28px;
    opacity: 0.8;
    position: relative;
  }

  .cta-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(36px, 6vw, 62px);
    font-weight: 400;
    line-height: 1.15;
    color: var(--cream);
    margin-bottom: 20px;
    position: relative;
  }
  .cta-title em {
    font-style: italic;
    color: var(--gold);
  }

  .cta-sub {
    font-size: 14px;
    font-weight: 300;
    color: var(--white-40);
    max-width: 360px;
    margin: 0 auto 52px;
    line-height: 1.8;
    position: relative;
  }

  .cta-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
    position: relative;
  }

  .btn-gold-solid {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    background: var(--gold);
    color: var(--ink);
    padding: 16px 40px;
    border-radius: 2px;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .btn-gold-solid:hover {
    background: #e8d5a0;
    transform: translateY(-3px);
    box-shadow: 0 16px 40px rgba(200,169,106,0.3);
  }

  .btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: transparent;
    color: var(--white-60);
    padding: 16px 32px;
    border-radius: 2px;
    font-size: 13px;
    font-weight: 300;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    border: 1px solid var(--white-10);
    transition: all 0.25s;
  }
  .btn-ghost:hover {
    color: var(--cream);
    border-color: var(--white-40);
  }

  @media (max-width: 640px) {
    .cta-inner { padding: 64px 28px; }
    .cta { padding: 0 24px 60px; }
  }
`;

export default function BottomCTA() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <section className="cta">
        <div className="cta-inner">
          <div className="cta-glow" />
          <p className="cta-label">Mulai Sekarang</p>
          <h2 className="cta-title">
            Wujudkan undangan<br />
            <em>impianmu hari ini</em>
          </h2>
          <p className="cta-sub">
            Hubungi kami via WhatsApp dan konsultasikan undangan pernikahanmu secara gratis.
          </p>
          <div className="cta-buttons">
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn-gold-solid">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat WhatsApp
            </a>
            <a href="https://www.instagram.com/izamhn/" target="_blank" rel="noreferrer" className="btn-ghost">
              Instagram →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
