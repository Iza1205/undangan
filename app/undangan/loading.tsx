// app/undangan/loading.tsx
export default function Loading() {
  return (
    <div style={{
      height: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#fff',
      zIndex: 999
    }}>
      <div className="simple-loader"></div>
      <style>{`
        .simple-loader {
          width: 30px;
          height: 30px;
          border: 2px solid #f3f4f6;
          border-top: 2px solid #111827;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}