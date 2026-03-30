"use client";

export default function LandingPage() {
  const customCSS = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    .lp-root {
      font-family: 'DM Sans', sans-serif;
      background: #faf9f7;
      min-height: 100vh;
      color: #1a1814;
      overflow-x: hidden;
    }

    /* ── ANIMATIONS ── */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes floatOrb {
      0%, 100% { transform: translateY(0px) scale(1); }
      50%       { transform: translateY(-18px) scale(1.04); }
    }
    @keyframes rotateSlow {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }

    /* ── HERO ── */
    .lp-hero {
      position: relative;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 24px 80px;
      text-align: center;
      overflow: hidden;
    }

    .lp-hero-bg {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 0;
    }

    /* Soft warm orbs */
    .lp-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.55;
    }
    .lp-orb-1 {
      width: 420px; height: 420px;
      background: radial-gradient(circle, #e8d5b0 0%, transparent 70%);
      top: -80px; right: -100px;
      animation: floatOrb 7s ease-in-out infinite;
    }
    .lp-orb-2 {
      width: 300px; height: 300px;
      background: radial-gradient(circle, #f0e8d8 0%, transparent 70%);
      bottom: 60px; left: -80px;
      animation: floatOrb 9s ease-in-out infinite reverse;
    }
    .lp-orb-3 {
      width: 200px; height: 200px;
      background: radial-gradient(circle, #c9a96e55 0%, transparent 70%);
      top: 40%; left: 10%;
      animation: floatOrb 11s ease-in-out infinite;
    }

    /* Rotating ring */
    .lp-ring {
      position: absolute;
      width: 560px; height: 560px;
      border: 1px solid rgba(201,169,110,0.12);
      border-radius: 50%;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      animation: rotateSlow 60s linear infinite;
    }
    .lp-ring-2 {
      width: 380px; height: 380px;
      border-color: rgba(201,169,110,0.08);
      animation-duration: 40s;
      animation-direction: reverse;
    }

    .lp-hero-content {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0;
    }

    .lp-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(201,169,110,0.1);
      border: 1px solid rgba(201,169,110,0.25);
      padding: 6px 16px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 500;
      color: #a07840;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      animation: fadeUp 0.7s ease both;
      margin-bottom: 28px;
    }

    .lp-eyebrow-dot {
      width: 5px; height: 5px;
      background: #c9a96e;
      border-radius: 50%;
    }

    .lp-headline {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(40px, 10vw, 72px);
      font-weight: 300;
      line-height: 1.15;
      letter-spacing: -0.01em;
      color: #1a1814;
      animation: fadeUp 0.7s 0.1s ease both;
      margin-bottom: 24px;
    }

    .lp-headline em {
      font-style: italic;
      font-weight: 400;
      background: linear-gradient(90deg, #b8914a, #e8d5a0, #c9a96e, #b8914a);
      background-size: 300% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 5s linear infinite;
    }

    .lp-sub {
      font-size: 15px;
      color: rgba(26,24,20,0.55);
      line-height: 1.75;
      max-width: 380px;
      animation: fadeUp 0.7s 0.2s ease both;
      margin-bottom: 40px;
    }

    .lp-divider {
      width: 1px;
      height: 40px;
      background: linear-gradient(to bottom, rgba(201,169,110,0.6), transparent);
      margin-bottom: 40px;
      animation: fadeUp 0.7s 0.25s ease both;
    }

    .lp-cta-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      animation: fadeUp 0.7s 0.3s ease both;
    }

    .lp-btn-primary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: #1a1814;
      color: #faf9f7;
      padding: 15px 32px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.02em;
      text-decoration: none;
      transition: all 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
      min-width: 240px;
    }
    .lp-btn-primary:hover {
      background: #c9a96e;
      transform: translateY(-3px);
      box-shadow: 0 12px 32px rgba(201,169,110,0.3);
    }

    .lp-btn-secondary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: rgba(26,24,20,0.5);
      font-size: 13px;
      text-decoration: none;
      transition: color 0.2s;
    }
    .lp-btn-secondary:hover { color: #c9a96e; }

    /* ── SOCIAL BAR ── */
    .lp-social {
      position: absolute;
      bottom: 32px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1;
      display: flex;
      align-items: center;
      gap: 24px;
      animation: fadeUp 0.7s 0.5s ease both;
    }

    .lp-social-link {
      font-size: 12px;
      color: rgba(26,24,20,0.35);
      text-decoration: none;
      letter-spacing: 0.05em;
      transition: color 0.2s;
    }
    .lp-social-link:hover { color: #c9a96e; }
    .lp-social-sep {
      width: 3px; height: 3px;
      background: rgba(26,24,20,0.2);
      border-radius: 50%;
    }

    /* ── FEATURES SECTION ── */
    .lp-features {
      padding: 80px 24px;
      max-width: 900px;
      margin: 0 auto;
    }

    .lp-section-label {
      font-size: 11px;
      font-weight: 500;
      color: #c9a96e;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      text-align: center;
      margin-bottom: 16px;
    }

    .lp-section-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(28px, 6vw, 42px);
      font-weight: 300;
      text-align: center;
      color: #1a1814;
      margin-bottom: 56px;
      line-height: 1.25;
    }

    .lp-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
    }

    .lp-card {
      background: #ffffff;
      border: 1px solid rgba(201,169,110,0.15);
      border-radius: 16px;
      padding: 28px 24px;
      transition: transform 0.25s, box-shadow 0.25s;
    }
    .lp-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 16px 40px rgba(201,169,110,0.12);
    }

    .lp-card-icon {
      width: 40px; height: 40px;
      background: rgba(201,169,110,0.1);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      margin-bottom: 16px;
    }

    .lp-card-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 20px;
      font-weight: 400;
      color: #1a1814;
      margin-bottom: 8px;
    }

    .lp-card-desc {
      font-size: 13px;
      color: rgba(26,24,20,0.55);
      line-height: 1.65;
    }

    /* ── PRICING / CTA BOTTOM ── */
    .lp-bottom-cta {
      background: #1a1814;
      margin: 0 24px 60px;
      border-radius: 24px;
      padding: 60px 32px;
      text-align: center;
      position: relative;
      overflow: hidden;
      max-width: 852px;
      margin-left: auto;
      margin-right: auto;
    }

    .lp-bottom-cta-bg {
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at 70% 20%, rgba(201,169,110,0.15) 0%, transparent 60%),
                  radial-gradient(ellipse at 20% 80%, rgba(201,169,110,0.08) 0%, transparent 50%);
      pointer-events: none;
    }

    .lp-bottom-cta h2 {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(28px, 6vw, 44px);
      font-weight: 300;
      color: #faf9f7;
      margin-bottom: 16px;
      line-height: 1.2;
      position: relative;
    }

    .lp-bottom-cta h2 em {
      font-style: italic;
      color: #c9a96e;
    }

    .lp-bottom-cta p {
      font-size: 14px;
      color: rgba(250,249,247,0.5);
      max-width: 320px;
      margin: 0 auto 36px;
      line-height: 1.7;
      position: relative;
    }

    .lp-btn-gold {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: #c9a96e;
      color: #1a1814;
      padding: 15px 32px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.02em;
      text-decoration: none;
      transition: all 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
      position: relative;
    }
    .lp-btn-gold:hover {
      background: #e8d5a0;
      transform: translateY(-3px);
      box-shadow: 0 12px 32px rgba(201,169,110,0.4);
    }

    /* ── FOOTER ── */
    .lp-footer {
      text-align: center;
      padding: 20px;
      font-size: 11px;
      color: rgba(26,24,20,0.3);
      letter-spacing: 0.05em;
    }

    /* ── MOBILE ── */
    @media (max-width: 480px) {
      .lp-headline { font-size: 36px; }
      .lp-ring { width: 340px; height: 340px; }
      .lp-ring-2 { width: 240px; height: 240px; }
    }
  `;

  const waLink =
    "https://wa.me/6282285559247?text=Halo%20saya%20ingin%20pesan%20undangan%20digital";

  const features = [
    {
      icon: "✦",
      title: "Desain Elegan",
      desc: "Tampilan yang indah dan modern, siap dibagikan ke semua tamu undangan.",
    },
    {
      icon: "♡",
      title: "Personalisasi Penuh",
      desc: "Nama, foto, jadwal, dan detail pesta disesuaikan dengan keinginanmu.",
    },
    {
      icon: "◈",
      title: "RSVP & Lokasi",
      desc: "Konfirmasi kehadiran tamu dan peta lokasi terintegrasi langsung di undangan.",
    },
    {
      icon: "◎",
      title: "Mudah Dibagikan",
      desc: "Cukup satu link, undanganmu bisa dibuka di semua perangkat tanpa aplikasi.",
    },
  ];

  return (
    <div className="lp-root">
      <style dangerouslySetInnerHTML={{ __html: customCSS }} />

      {/* ── HERO ── */}
      <section className="lp-hero">
        <div className="lp-hero-bg">
          <div className="lp-ring" />
          <div className="lp-ring lp-ring-2" />
          <div className="lp-orb lp-orb-1" />
          <div className="lp-orb lp-orb-2" />
          <div className="lp-orb lp-orb-3" />
        </div>

        <div className="lp-hero-content">
          <div className="lp-eyebrow">
            <div className="lp-eyebrow-dot" />
            Digital Invitation
          </div>

          <h1 className="lp-headline">
            Undangan Pernikahan
            <br />
            yang <em>Berkesan</em>
          </h1>

          <p className="lp-sub">
            Tampilkan momen spesialmu dengan undangan digital yang elegan, modern, dan mudah
            dibagikan ke semua orang.
          </p>

          <div className="lp-divider" />

          <div className="lp-cta-group">
            <a href={waLink} target="_blank" rel="noreferrer" className="lp-btn-primary">
              Pesan Sekarang →
            </a>
            <a href="#features" className="lp-btn-secondary">
              Lihat fitur ↓
            </a>
          </div>
        </div>

        <div className="lp-social">
          <a
            href="https://www.instagram.com/izamhn/"
            target="_blank"
            rel="noreferrer"
            className="lp-social-link"
          >
            Instagram
          </a>
          <div className="lp-social-sep" />
          <a
            href="https://www.tiktok.com/@izamhn"
            target="_blank"
            rel="noreferrer"
            className="lp-social-link"
          >
            TikTok
          </a>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="lp-features">
        <p className="lp-section-label">Kenapa pilih kami</p>
        <h2 className="lp-section-title">
          Semua yang kamu butuhkan
          <br />
          dalam satu undangan
        </h2>

        <div className="lp-cards">
          {features.map((f) => (
            <div key={f.title} className="lp-card">
              <div className="lp-card-icon">{f.icon}</div>
              <h3 className="lp-card-title">{f.title}</h3>
              <p className="lp-card-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <div className="lp-bottom-cta">
        <div className="lp-bottom-cta-bg" />
        <h2>
          Siap untuk momen
          <br />
          yang <em>tak terlupakan?</em>
        </h2>
        <p>Hubungi kami sekarang dan wujudkan undangan impianmu bersama kami.</p>
        <a href={waLink} target="_blank" rel="noreferrer" className="lp-btn-gold">
          Chat via WhatsApp →
        </a>
      </div>

      {/* ── FOOTER ── */}
      <footer className="lp-footer">Build by Izamhn · {new Date().getFullYear()}</footer>
    </div>
  );
}