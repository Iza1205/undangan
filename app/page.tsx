export default function RootPage() {
  const customCSS = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }

    .landing-root {
      font-family: 'DM Sans', sans-serif;
      background: #ffffff;
      min-height: 100vh;
      color: #1a1a1a;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      padding: 20px;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }

    .grain-overlay {
      position: fixed;
      inset: -50%;
      width: 200%;
      height: 200%;
      opacity: 0.02;
      pointer-events: none;
      z-index: 0;
    }

    .badge {
      background: rgba(0,0,0,0.04);
      border: 1px solid rgba(0,0,0,0.08);
      padding: 6px 14px;
      border-radius: 999px;
      font-size: 11px;
      color: rgba(0,0,0,0.5);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      animation: fadeUp 0.8s ease both;
    }

    .headline {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(36px, 9vw, 64px);
      font-weight: 300;
      line-height: 1.2;
      text-align: center;
      margin: 20px 0;
      animation: fadeUp 0.8s ease both;
    }

    .headline em {
      font-style: italic;
      background: linear-gradient(90deg, #c9a96e, #e8d5b0, #c9a96e);
      background-size: 300% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmer 4s linear infinite;
    }

    .subtext {
      font-size: 14px;
      color: rgba(0,0,0,0.5);
      text-align: center;
      max-width: 320px;
      line-height: 1.7;
      animation: fadeUp 0.8s ease both;
    }

    .divider {
      width: 40px;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(201,169,110,0.6), transparent);
      margin: 28px 0;
    }

    .cta-primary {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      background: #1a1a1a;
      color: #ffffff;
      padding: 14px 24px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 500;
      text-decoration: none;
      width: 100%;
      max-width: 260px;
      transition: 0.25s;
    }

    .cta-primary:hover {
      background: #c9a96e;
      transform: translateY(-2px);
    }

    .social-wrapper {
      display: flex;
      gap: 16px;
      margin-top: 30px;
    }

    .social-link {
      font-size: 12px;
      color: rgba(0,0,0,0.4);
      text-decoration: none;
    }

    .footer {
      position: absolute;
      bottom: 16px;
      font-size: 11px;
      color: rgba(0,0,0,0.4);
    }

    /* MOBILE */
    @media (max-width: 480px) {
      .headline {
        font-size: 32px;
      }

      .subtext {
        font-size: 13px;
      }
    }
  `;

  const waLink = "https://wa.me/6282285559247?text=Halo%20saya%20ingin%20pesan%20undangan%20digital";

  return (
    <main className="landing-root">
      <style dangerouslySetInnerHTML={{ __html: customCSS }} />

      <div className="badge">
        ✨ Digital Invitation
      </div>

      <h1 className="headline">
        Pesan <em>Undangan</em> Digital
      </h1>

      <p className="subtext">
        Undangan pernikahan digital elegan, modern, dan berkesan untuk momen spesialmu.
      </p>

      <div className="divider" />

      <a href={waLink} className="cta-primary" target="_blank">
        Pesan Undangan Digital
      </a>

      <div className="social-wrapper">
        <a href="https://www.instagram.com/izamhn/" className="social-link" target="_blank">
          Instagram
        </a>
        <a href="https://www.tiktok.com/@izamhn" className="social-link" target="_blank">
          TikTok
        </a>
      </div>

      <div className="footer">
        Build by Izamhn
      </div>
    </main>
  );
}