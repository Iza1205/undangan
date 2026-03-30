const css = `
  .features {
    padding: 120px 32px;
    max-width: 1100px;
    margin: 0 auto;
    position: relative;
  }

  /* Top divider */
  .features-divider {
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--white-10), transparent);
    margin-bottom: 100px;
  }

  .features-header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: end;
    margin-bottom: 80px;
  }

  .features-label {
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .features-label::before {
    content: '';
    display: block;
    width: 24px; height: 1px;
    background: var(--gold);
  }

  .features-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(32px, 5vw, 52px);
    font-weight: 400;
    line-height: 1.15;
    color: var(--cream);
  }
  .features-title em {
    font-style: italic;
    color: var(--gold);
  }

  .features-desc {
    font-size: 14px;
    font-weight: 300;
    color: var(--white-60);
    line-height: 1.9;
    align-self: end;
    padding-bottom: 4px;
  }

  /* Feature grid */
  .features-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: var(--white-10);
    border: 1px solid var(--white-10);
  }

  .feature-item {
    background: var(--ink);
    padding: 40px 32px;
    position: relative;
    overflow: hidden;
    transition: background 0.3s;
    cursor: default;
  }
  .feature-item::before {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 2px;
    background: var(--gold);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s cubic-bezier(0.77,0,0.18,1);
  }
  .feature-item:hover { background: var(--ink-soft); }
  .feature-item:hover::before { transform: scaleX(1); }

  .feature-number {
    font-family: 'Playfair Display', serif;
    font-size: 11px;
    color: var(--gold);
    letter-spacing: 0.1em;
    margin-bottom: 32px;
    opacity: 0.7;
  }

  .feature-icon {
    width: 36px; height: 36px;
    margin-bottom: 20px;
    color: var(--gold);
    opacity: 0.8;
  }

  .feature-name {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 400;
    color: var(--cream);
    margin-bottom: 12px;
    line-height: 1.3;
  }

  .feature-text {
    font-size: 13px;
    font-weight: 300;
    color: var(--white-40);
    line-height: 1.75;
  }

  @media (max-width: 900px) {
    .features-header { grid-template-columns: 1fr; }
    .features-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 540px) {
    .features-grid { grid-template-columns: 1fr; }
    .features { padding: 80px 24px; }
  }
`;

const features = [
  {
    n: "01",
    icon: (
      <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="4" y="6" width="28" height="24" rx="1"/>
        <path d="M4 12h28M12 6v6M24 6v6"/>
      </svg>
    ),
    name: "Desain Premium",
    text: "Setiap detail dirancang dengan estetika tinggi, mencerminkan keanggunan momen pernikahanmu.",
  },
  {
    n: "02",
    icon: (
      <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="18" cy="18" r="14"/>
        <path d="M18 10v8l5 3"/>
      </svg>
    ),
    name: "RSVP Real-time",
    text: "Pantau konfirmasi kehadiran tamumu secara langsung, lengkap dengan rekap otomatis.",
  },
  {
    n: "03",
    icon: (
      <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M6 30l6-6M18 6l12 12-6 6-12-12z"/>
        <path d="M24 6l6 6-3 3"/>
        <circle cx="9" cy="27" r="3"/>
      </svg>
    ),
    name: "Personalisasi",
    text: "Nama, foto, cerita cinta, hingga musik latar — semuanya disesuaikan untukmu.",
  },
  {
    n: "04",
    icon: (
      <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M18 4C10.27 4 4 10.27 4 18c0 2.4.6 4.67 1.67 6.63L4 32l7.37-1.67A13.94 13.94 0 0018 32c7.73 0 14-6.27 14-14S25.73 4 18 4z"/>
        <path d="M13 16c0-1.1.9-2 2-2h6a2 2 0 012 2v4a2 2 0 01-2 2h-6a2 2 0 01-2-2v-4z" fill="currentColor" fillOpacity="0.2"/>
      </svg>
    ),
    name: "Satu Link",
    text: "Bagikan undangan lewat WhatsApp atau Instagram — tamu buka langsung, tanpa instalasi.",
  },
];

export default function FeaturesSection() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <section id="features" className="features">
        <div className="features-divider" />

        <div className="features-header">
          <div>
            <div className="features-label">Layanan Kami</div>
            <h2 className="features-title">
              Semua yang kamu<br />butuhkan, dalam<br /><em>satu undangan</em>
            </h2>
          </div>
          <p className="features-desc">
            Dari desain pertama hingga momen hari-H, kami memastikan setiap tamu
            mendapatkan pengalaman yang berkesan sejak membuka undanganmu.
          </p>
        </div>

        <div className="features-grid">
          {features.map((f) => (
            <div key={f.n} className="feature-item">
              <div className="feature-number">{f.n}</div>
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-name">{f.name}</h3>
              <p className="feature-text">{f.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
