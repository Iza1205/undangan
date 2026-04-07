import type { Metadata, Viewport } from 'next'
import './globals.css'
import MusicPlayer from '@/components/MusicPlayer'

export const metadata: Metadata = {
  title: 'Undangan Pernikahan Digital',
  description: 'Undangan pernikahan digital modern',
  icons: {
    icon: '/faviconn.svg',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body style={{ position: 'relative' }}>
        {children}
        <MusicPlayer />
      </body>
    </html>
  )
}