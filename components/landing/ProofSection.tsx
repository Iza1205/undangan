const css = `
  .proof {
    padding: 0 32px 120px;
    max-width: 1100px;
    margin: 0 auto;
  }

  .proof-inner {
    border: 1px solid var(--white-10);
    padding: 64px;
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 64px;
    align-items: center;
    position: relative;
    overflow: hidden;
  }

  .proof-inner::before {
    content: '"';
    font-family: 'Playfair Display', serif;
    font-size: 240px;
    color: var(--gold);
    opacity: 0.06;
    position: absolute;
    top: -40px;
    right: 40px;
    line-height: 1;
    pointer-events: none;
  }

  .proof-stats {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .proof-stat-number {
    font-family: 'Playfair Display', serif;
    font-size: 56px;
    font-weight: 400;
    color: var(--gold);
    line-height: 1;
    margin-bottom: 6px;
  }

  .proof-stat-label {
    font-size: 12px;
    font-weight: 300;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--white-40);
  }

  .proof-stat-sep {
    width: 32px; height: 1px;
    background: var(--white-10);
  }

  .proof-testimonials {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .proof-testimonial {
    padding-left: 24px;
    border-left: 1px solid var(--gold);
    border-left-color: rgba(200,169,106,0.3);
    transition: border-left-color 0.3s;
  }
  .proof-testimonial:hover {
    border-left-color: var(--gold);
  }

  .proof-testimonial-text {
    font-family: 'Playfair Display', serif;
    font-size: 17px;
    font-style: italic;
    font-weight: 400;
    color: var(--white-60);
    line-height: 1.65;
    margin-bottom: 16px;
  }

  .proof-testimonial-author {
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--gold);
    opacity: 0.7;
  }

  @media (max-width: 780px) {
    .proof-inner {
      grid-template-columns: 1fr;
      padding: 40px 28px;
      gap: 40px;
    }
    .proof-stats { flex-direction: row; flex-wrap: wrap; gap: 28px; }
    .proof-stat-sep { display: none; }
    .proof { padding: 0 24px 80px; }
  }
`;

const stats = [
  { n: "200+", label: "Pasangan Puas" },
  { n: "4.9", label: "Rating Rata-rata" },
  { n: "48 Jam", label: "Waktu Pengerjaan" },
];

const testimonials = [
  {
    text: "Undangannya benar-benar melebihi ekspektasi kami. Semua tamu terkagum-kagum bahkan sebelum acara dimulai.",
    author: "Rizky & Aulia — Jakarta, 2024",
  },
  {
    text: "Prosesnya sangat mudah dan hasilnya luar biasa elegan. Ini adalah keputusan terbaik dalam persiapan pernikahan kami.",
    author: "Dimas & Sari — Bandung, 2024",
  },
];

export default function ProofSection() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <section className="proof">
        <div className="proof-inner">
          <div className="proof-stats">
            {stats.map((s, i) => (
              <div key={s.n}>
                {i > 0 && <div className="proof-stat-sep" />}
                <div className="proof-stat-number">{s.n}</div>
                <div className="proof-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="proof-testimonials">
            {testimonials.map((t) => (
              <div key={t.author} className="proof-testimonial">
                <p className="proof-testimonial-text">{t.text}</p>
                <span className="proof-testimonial-author">{t.author}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
