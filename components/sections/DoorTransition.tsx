'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DoorTransitionProps {
  isOpen: boolean;
  onComplete: () => void;
}

export default function DoorTransition({ isOpen, onComplete }: DoorTransitionProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onComplete();
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onComplete]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            backgroundColor: '#0f0f0f',
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
            {/* Background putih bersih */}
            <div style={{ position: 'absolute', inset: 0, backgroundColor: '#ffffff' }} />

            {/* ── KONTEN TENGAH ── */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
                padding: '0 40px',
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.65, ease: [0.34, 1.2, 0.64, 1] }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="Logo"
                  style={{
                    width: '200px',
                    height: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              </motion.div>
            </div>

            {/* ══════════════════════════
                PINTU KIRI
            ══════════════════════════ */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: '-100%' }}
              transition={{ delay: 0.85, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '50%',
                height: '100%',
                backgroundColor: '#ffffff',
                zIndex: 10,
                borderRight: '0.5px solid #ececec',
                boxSizing: 'border-box',
                overflow: 'hidden',
              }}
            >
              {/* Inner frame tipis */}
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '14px',
                  right: '0',
                  bottom: '20px',
                  border: '0.5px solid #ede9ff',
                  borderRight: 'none',
                  borderRadius: '6px 0 0 6px',
                  pointerEvents: 'none',
                }}
              />

              {/* Dot pattern subtle */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '52px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '5px',
                  opacity: 0.08,
                }}
              >
                {[32, 22, 14].map((size, i) => (
                  <div
                    key={i}
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      borderRadius: '50%',
                      border: '1.5px solid #6231E1',
                    }}
                  />
                ))}
              </div>

              {/* Handle kiri — elegan oval */}
              <div
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0',
                }}
              >
                <div style={{
                  width: '1.5px',
                  height: '36px',
                  backgroundColor: '#6231E1',
                  borderRadius: '1px',
                  opacity: 0.18,
                }} />
                <div style={{
                  width: '9px',
                  height: '22px',
                  borderRadius: '999px',
                  border: '1.5px solid #6231E1',
                  opacity: 0.35,
                  marginTop: '4px',
                }} />
              </div>
            </motion.div>

            {/* ══════════════════════════
                PINTU KANAN
            ══════════════════════════ */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: '100%' }}
              transition={{ delay: 0.85, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '50%',
                height: '100%',
                backgroundColor: '#ffffff',
                zIndex: 10,
                borderLeft: '0.5px solid #ececec',
                boxSizing: 'border-box',
                overflow: 'hidden',
              }}
            >
              {/* Inner frame tipis */}
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '0',
                  right: '14px',
                  bottom: '20px',
                  border: '0.5px solid #ede9ff',
                  borderLeft: 'none',
                  borderRadius: '0 6px 6px 0',
                  pointerEvents: 'none',
                }}
              />

              {/* Dot pattern subtle */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '52px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '5px',
                  opacity: 0.08,
                }}
              >
                {[32, 22, 14].map((size, i) => (
                  <div
                    key={i}
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      borderRadius: '50%',
                      border: '1.5px solid #6231E1',
                    }}
                  />
                ))}
              </div>

              {/* Handle kanan — elegan oval */}
              <div
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0',
                }}
              >
                <div style={{
                  width: '1.5px',
                  height: '36px',
                  backgroundColor: '#6231E1',
                  borderRadius: '1px',
                  opacity: 0.18,
                }} />
                <div style={{
                  width: '9px',
                  height: '22px',
                  borderRadius: '999px',
                  border: '1.5px solid #6231E1',
                  opacity: 0.35,
                  marginTop: '4px',
                }} />
              </div>
            </motion.div>

            {/* Garis tengah — hilang saat pintu mulai bergerak */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 0.85, duration: 0.1 }}
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                width: '1px',
                height: '100%',
                backgroundColor: '#ececec',
                zIndex: 11,
                transform: 'translateX(-0.5px)',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}