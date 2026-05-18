// app/loading.tsx
export default function Loading() {
  return (
    <>
      <div className="top-loader" />
      <style>{`
        .top-loader {
          position: fixed;
          top: 0;
          left: 0;
          height: 3px;
          width: 100%;
          background: linear-gradient(to right, #6366f1, #3b82f6);
          animation: top-load 1.4s ease-in-out infinite;
          z-index: 9999;
        }
        @keyframes top-load {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </>
  )
}