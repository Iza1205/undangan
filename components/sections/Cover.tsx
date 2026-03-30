'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import DoorTransition from './DoorTransition'; // sesuaikan path jika perlu

interface CoverProps {
  onOpen: () => void;
}

export default function Cover({ onOpen }: CoverProps) {
  const searchParams = useSearchParams();
  const guestName = searchParams.get('untuk') || 'Tamu Undangan';

  const [showDoor, setShowDoor] = useState(false);
  const [coverVisible, setCoverVisible] = useState(true);

  const handleOpen = () => {
    window.dispatchEvent(new Event('startMusic'));
    setCoverVisible(false); // cover fade out
    setShowDoor(true);      // pintu muncul
  };

  const handleDoorComplete = () => {
    onOpen(); // masuk halaman undangan
  };

  return (
    <>
      {/* Animasi pintu — muncul setelah tombol diklik */}
      <DoorTransition isOpen={showDoor} onComplete={handleDoorComplete} />

      {/* Cover — hilang saat pintu muncul */}
      <AnimatePresence>
        {coverVisible && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              backgroundColor: '#0f0f0f',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: 'min(100vw, 430px)',
                aspectRatio: '9 / 16',
                maxHeight: '100dvh',
                overflow: 'hidden',
                borderRadius: 'clamp(0px, 2vw, 16px)',
              }}
            >
              {/* Background image */}
              <Image
                src="/bccc.png"
                alt="Background"
                fill
                sizes="430px"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                priority
              />

              {/* Gradient overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 58%, rgba(255,255,255,0.85) 68%, rgba(255,255,255,0.97) 76%, rgba(255,255,255,1) 100%)',
                }}
              />

              {/* Card bawah */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '20px 32px 44px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {/* Label kecil */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  style={{
                    fontSize: '10px',
                    fontWeight: 500,
                    color: '#9b9b9b',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: '4px',
                  }}
                >
                  You're invited
                </motion.p>

                {/* Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#111111',
                    lineHeight: 1.15,
                    marginBottom: '4px',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Welcome,
                </motion.h1>

                {/* Nama tamu */}
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  style={{
                    fontSize: '15px',
                    fontWeight: 500,
                    color: '#6231E1',
                    marginBottom: '20px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {guestName}
                </motion.p>

                {/* Divider */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: 0.78, duration: 0.5, ease: 'easeOut' }}
                  style={{
                    width: '100%',
                    height: '1px',
                    backgroundColor: '#e8e8e8',
                    marginBottom: '20px',
                    transformOrigin: 'left',
                  }}
                />

                {/* Deskripsi */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.88, duration: 0.5 }}
                  style={{
                    fontSize: '12px',
                    color: '#888888',
                    lineHeight: 1.6,
                    marginBottom: '20px',
                    fontWeight: 400,
                  }}
                >
                  A private invitation has been prepared for you.
                  <br />
                  Tap below to open and view the details.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <motion.button
                    onClick={handleOpen}
                    whileTap={{ scale: 0.98 }}
                    whileHover={{ backgroundColor: '#4f22c8' }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      backgroundColor: '#6231E1',
                      color: '#ffffff',
                      borderRadius: '999px',
                      padding: '14px 0',
                      fontSize: '13px',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 20px rgba(98,49,225,0.25)',
                      transition: 'background-color 0.2s ease',
                    }}
                  >
                    Open Invitation
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}