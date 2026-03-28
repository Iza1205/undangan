'use client'

import { useState, useRef, useEffect } from 'react'
import { MdMusicNote, MdMusicOff } from 'react-icons/md'
import { usePathname } from 'next/navigation'

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const pathname = usePathname()

  const isVisible = pathname?.startsWith('/undangan')

  useEffect(() => {
    if (!isVisible) return
    if (audioRef.current) {
      audioRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
  }, [isVisible])

  useEffect(() => {
    if (!isVisible && audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }, [isVisible])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {})
    }
    setIsPlaying(!isPlaying)
  }

  useEffect(() => {
    const startMusic = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {})
        setIsPlaying(true)
      }
    }
    window.addEventListener('startMusic', startMusic)
    return () => window.removeEventListener('startMusic', startMusic)
  }, [])

  if (!isVisible) return null

  return (
    <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 999 }}>
      <audio ref={audioRef} src="/music/music.mp3" loop preload="auto" />
      <button
        onClick={togglePlay}
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: 'none',
          background: 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isPlaying ? 'var(--accent, #7C3AED)' : '#9ca3af',
          transition: 'all 0.2s ease',
        }}
      >
        {isPlaying ? <MdMusicNote size={18} /> : <MdMusicOff size={18} />}
      </button>
    </div>
  )
}