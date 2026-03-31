"use client";

import { useState } from "react";
import { WA_LINK } from "./styles";

const css = `
  .themes {
    padding: 0 32px 120px;
    max-width: 1100px;
    margin: 0 auto;
  }

  .themes-divider {
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(26,24,20,0.12), transparent);
    margin-bottom: 100px;
  }

  .themes-header {
    text-align: center;
    margin-bottom: 56px;
  }

  .themes-label {
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #a07838;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }
  .themes-label::before,
  .themes-label::after {
    content: '';
    display: block;
    width: 24px; height: 1px;
    background: #c8a96a;
    opacity: 0.6;
  }

  .themes-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(30px, 5vw, 48px);
    font-weight: 400;
    color: #1a1814;
    line-height: 1.2;
    margin-bottom: 14px;
  }
  .themes-title em {
    font-style: italic;
    color: #c8a96a;
  }

  .themes-subtitle {
    font-size: 14px;
    font-weight: 300;
    color: rgba(26,24,20,0.5);
    line-height: 1.75;
  }

  /* Category tabs */
  .themes-tabs {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-bottom: 56px;
    flex-wrap: wrap;
  }

  .themes-tab {
    padding: 9px 22px;
    border: 1px solid rgba(26,24,20,0.15);
    background: transparent;
    color: rgba(26,24,20,0.5);
    font-family: 'Jost', sans-serif;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.2s;
  }
  .themes-tab:hover {
    color: #1a1814;
    border-color: rgba(26,24,20,0.4);
    background: rgba(26,24,20,0.04);
  }
  .themes-tab.active {
    background: #c8a96a;
    color: #1a1814;
    border-color: #c8a96a;
    font-weight: 500;
  }

  /* Cards grid */
  .themes-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
  }

  .theme-card {
    background: #ffffff;
    border: 1px solid rgba(26,24,20,0.1);
    overflow: hidden;
    transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
    display: flex;
    flex-direction: column;
    border-radius: 4px;
  }
  .theme-card:hover {
    border-color: rgba(200,169,106,0.5);
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(26,24,20,0.08);
  }

  /* Thumbnail */
  .theme-thumb {
    position: relative;
    aspect-ratio: 1 / 1;
    overflow: hidden;
  }

  .theme-thumb-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    display: block;
  }
  .theme-card:hover .theme-thumb-img { transform: scale(1.05); }

  .theme-thumb-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    position: relative;
    overflow: hidden;
  }

  .theme-thumb-pattern {
    position: absolute;
    inset: 0;
    opacity: 0.06;
    background-image: repeating-linear-gradient(
      45deg,
      #c8a96a 0px, #c8a96a 1px,
      transparent 1px, transparent 16px
    );
  }

  .theme-badge {
    position: absolute;
    top: 14px;
    left: 14px;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 2px;
  }
  .theme-badge.app     { background: #1e3a5f; color: #7ab3e8; }
  .theme-badge.premium { background: #2a1f0e; color: #c8a96a; }
  .theme-badge.luxury  { background: #1f1a0a; color: #e8d5a0; border: 1px solid rgba(200,169,106,0.4); }
  .theme-badge.adat    { background: #1a0e0e; color: #e07070; }

  /* Card body */
  .theme-body {
    padding: 12px 14px 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
  }

  .theme-meta {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
  }

  .theme-name {
    font-family: 'Playfair Display', serif;
    font-size: 13px;
    font-weight: 400;
    color: #1a1814;
    line-height: 1.3;
  }

  .theme-price-wrap { text-align: right; }
  .theme-price {
    font-size: 12px;
    font-weight: 500;
    color: #a07838;
    white-space: nowrap;
  }
  .theme-price-note {
    font-size: 9px;
    font-weight: 300;
    color: rgba(26,24,20,0.4);
    letter-spacing: 0.04em;
    margin-top: 2px;
  }

  /* Action buttons */
  .theme-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-top: auto;
  }

  .theme-btn-demo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 7px 0;
    border: 1px solid rgba(26,24,20,0.15);
    background: transparent;
    color: rgba(26,24,20,0.55);
    font-family: 'Jost', sans-serif;
    font-size: 9px;
    font-weight: 400;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .theme-btn-demo:hover {
    border-color: rgba(26,24,20,0.4);
    color: #1a1814;
    background: rgba(26,24,20,0.03);
  }

  .theme-btn-order {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 7px 0;
    border: 1px solid rgba(200,169,106,0.5);
    background: transparent;
    color: #a07838;
    font-family: 'Jost', sans-serif;
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.25s;
    position: relative;
    overflow: hidden;
  }
  .theme-btn-order::before {
    content: '';
    position: absolute;
    inset: 0;
    background: #c8a96a;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s cubic-bezier(0.77,0,0.18,1);
    z-index: 0;
  }
  .theme-btn-order:hover { color: #1a1814; border-color: #c8a96a; }
  .theme-btn-order:hover::before { transform: scaleX(1); }
  .theme-btn-order span { position: relative; z-index: 1; }

  /* View all */
  .themes-viewall {
    text-align: center;
    margin-top: 48px;
  }
  .themes-viewall-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 12px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(26,24,20,0.45);
    text-decoration: none;
    border-bottom: 1px solid rgba(26,24,20,0.12);
    padding-bottom: 4px;
    transition: color 0.2s, border-color 0.2s;
  }
  .themes-viewall-btn:hover { color: #a07838; border-color: #c8a96a; }

  @media (max-width: 900px) {
    .themes-grid { grid-template-columns: repeat(3, 1fr); }
  }
  @media (max-width: 600px) {
    .themes-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 540px) {
    .themes { padding: 0 24px 80px; }
    .themes-tab { font-size: 11px; padding: 8px 14px; }
  }
`;

type Category = "Semua" | "App Style" | "Premium" | "Luxury" | "Adat";
const CATEGORIES: Category[] = ["Semua", "App Style", "Premium", "Luxury", "Adat"];

interface ThemeItem {
  name: string;
  price: string;
  category: Exclude<Category, "Semua">;
  badge: string;
  badgeClass: string;
  demoUrl: string;
  bg: string;
  image?: string; // ← opsional, isi path gambar kalau ada
}

const THEMES: ThemeItem[] = [
  { name: "Serene Bloom",    price: "Rp 150.000", category: "App Style", badge: "App Style", badgeClass: "app",     demoUrl: "https://www.izwed.my.id/undangan", bg: "linear-gradient(145deg,#0f1929,#1a2a3a)", image: "/thumbnail/2.png" },
  { name: "Aurum Dusk",      price: "Rp 250.000", category: "Premium",   badge: "Premium",   badgeClass: "premium", demoUrl: "https://www.izwed.my.id/undangan", bg: "linear-gradient(145deg,#0f1929,#1a2a3a)", image: "/thumbnail/3.png" },
  { name: "Noir Élégance",   price: "Rp 450.000", category: "Luxury",    badge: "Luxury",    badgeClass: "luxury",  demoUrl: "https://www.izwed.my.id/undangan", bg: "linear-gradient(145deg,#0f1929,#1a2a3a)", image: "/thumbnail/1.png" },
  { name: "Batik Sari",      price: "Rp 200.000", category: "Adat",      badge: "Adat",      badgeClass: "adat",    demoUrl: "https://www.izwed.my.id/undangan", bg: "linear-gradient(145deg,#0f1929,#1a2a3a)", image: "/thumbnail/2.png" },
  { name: "Celestial",       price: "Rp 350.000", category: "Premium",   badge: "Premium",   badgeClass: "premium", demoUrl: "https://www.izwed.my.id/undangan", bg: "linear-gradient(145deg,#0f1929,#1a2a3a)", image: "/thumbnail/3.png" },
  { name: "Javanese Grace",  price: "Rp 200.000", category: "Adat",      badge: "Adat",      badgeClass: "adat",    demoUrl: "https://www.izwed.my.id/undangan", bg: "linear-gradient(145deg,#0f1929,#1a2a3a)", image: "/thumbnail/1.png" },
];

export default function ThemesSection() {
  const [active, setActive] = useState<Category>("Semua");

  const filtered = active === "Semua"
    ? THEMES
    : THEMES.filter((t) => t.category === active);

  const waMsg = (name: string) =>
    `https://wa.me/6282285559247?text=Halo%20saya%20ingin%20pesan%20undangan%20digital%20tema%20${encodeURIComponent(name)}`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <section id="themes" className="themes">
        <div className="themes-divider" />

        <div className="themes-header">
          <div className="themes-label">Pilihan Tema</div>
          <h2 className="themes-title">
            Tema <em>Eksklusif</em> yang<br />Kami Sediakan
          </h2>
          <p className="themes-subtitle">
            Klik <em style={{ fontStyle: "italic", color: "#a07838" }}>Lihat Demo</em> untuk melihat detail undangan secara langsung
          </p>
        </div>

        {/* Category tabs — now interactive */}
        <div className="themes-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`themes-tab${active === cat ? " active" : ""}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="themes-grid">
          {filtered.map((theme) => (
            <div key={theme.name} className="theme-card">
              <div className="theme-thumb">
                {theme.image ? (
                  // ← Kalau ada gambar, tampilkan foto
                  <img
                    src={theme.image}
                    alt={theme.name}
                    className="theme-thumb-img"
                  />
                ) : (
                  // ← Kalau tidak ada, fallback ke placeholder gradient
                  <div
                    className="theme-thumb-placeholder"
                    style={{ background: theme.bg }}
                  >
                    <div className="theme-thumb-pattern" />
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ opacity: 0.2, color: "#c8a96a" }}>
                      <rect x="4" y="6" width="28" height="24" rx="1" stroke="currentColor" strokeWidth="1"/>
                      <path d="M4 12h28M12 6v6M24 6v6" stroke="currentColor" strokeWidth="1"/>
                      <path d="M10 20h8M10 24h12" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                    </svg>
                    <span style={{ fontSize: "11px", color: "rgba(200,169,106,0.35)", fontFamily: "'Playfair Display',serif", fontStyle: "italic" }}>
                      {theme.name}
                    </span>
                  </div>
                )}
                <span className={`theme-badge ${theme.badgeClass}`}>{theme.badge}</span>
              </div>

              <div className="theme-body">
                <div className="theme-meta">
                  <span className="theme-name">{theme.name}</span>
                  <div className="theme-price-wrap">
                    <div className="theme-price">{theme.price}</div>
                    <div className="theme-price-note">sekali bayar</div>
                  </div>
                </div>

                <div className="theme-actions">
                  <a href={theme.demoUrl} target="_blank" rel="noreferrer" className="theme-btn-demo">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M1 6s2-4 5-4 5 4 5 4-2 4-5 4-5-4-5-4z" stroke="currentColor" strokeWidth="1"/>
                      <circle cx="6" cy="6" r="1.5" stroke="currentColor" strokeWidth="1"/>
                    </svg>
                    Lihat Demo
                  </a>
                  <a href={waMsg(theme.name)} target="_blank" rel="noreferrer" className="theme-btn-order">
                    <span>Pesan Sekarang</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="themes-viewall">
          <a href={WA_LINK} target="_blank" rel="noreferrer" className="themes-viewall-btn">
            Lihat semua tema
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}