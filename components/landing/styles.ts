export const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Jost:wght@300;400;500&display=swap');`;

export const WA_LINK = "https://wa.me/6282285559247?text=Halo%20saya%20ingin%20pesan%20undangan%20digital";

export const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink:       #0d0c0a;
    --ink-soft:  #1c1a16;
    --cream:     #f5f0e8;
    --cream-dim: #e8e0d0;
    --gold:      #c8a96a;
    --gold-dim:  #a8894a;
    --gold-glow: rgba(200,169,106,0.15);
    --white-5:   rgba(245,240,232,0.05);
    --white-10:  rgba(245,240,232,0.10);
    --white-20:  rgba(245,240,232,0.20);
    --white-40:  rgba(245,240,232,0.40);
    --white-60:  rgba(245,240,232,0.60);
  }

  body {
    font-family: 'Jost', sans-serif;
    background: var(--ink);
    color: var(--cream);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes shimmer {
    0%   { background-position: -300% center; }
    100% { background-position: 300% center; }
  }
  @keyframes lineGrow {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-12px); }
  }
`;
