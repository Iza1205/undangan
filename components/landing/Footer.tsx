const css = `
  .footer {
    border-top: 1px solid var(--white-10);
    padding: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1100px;
    margin: 0 auto;
  }

  .footer-brand {
    font-family: 'Playfair Display', serif;
    font-size: 15px;
    font-style: italic;
    color: var(--white-40);
    letter-spacing: 0.05em;
  }

  .footer-copy {
    font-size: 11px;
    color: var(--white-20);
    letter-spacing: 0.08em;
  }

  .footer-links {
    display: flex;
    gap: 20px;
  }
  .footer-links a {
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--white-20);
    text-decoration: none;
    transition: color 0.2s;
  }
  .footer-links a:hover { color: var(--gold); }

  @media (max-width: 540px) {
    .footer { flex-direction: column; gap: 16px; text-align: center; }
  }
`;

export default function Footer() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <footer className="footer">
        <span className="footer-brand">Izamhn</span>
        <span className="footer-copy">© {new Date().getFullYear()} — Digital Wedding Invitation</span>
        <div className="footer-links">
          <a href="https://www.instagram.com/izamhn/" target="_blank" rel="noreferrer">IG</a>
          <a href="https://www.tiktok.com/@izamhn" target="_blank" rel="noreferrer">TT</a>
        </div>
      </footer>
    </>
  );
}
