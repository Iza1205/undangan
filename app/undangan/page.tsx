'use client';

import { Suspense, useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import UndanganHome from './UndanganHome';
import Cover from '@/components/sections/Cover';

function UndanganContent() {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);
  const searchParams = useSearchParams();
  const guest = searchParams.get('untuk') || 'tamu';

  useEffect(() => {
    const key = `invite_opened_${guest}`;
    if (sessionStorage.getItem(key)) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [guest]);

  // Belum tahu state-nya, jangan render apapun dulu
  if (isOpen === null) return null;

  const handleOpen = () => {
    const key = `invite_opened_${guest}`;
    sessionStorage.setItem(key, '1');
    setIsOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && <Cover onOpen={handleOpen} />}
      </AnimatePresence>
      <main className={isOpen ? 'block' : 'hidden h-screen overflow-hidden'}>
        <UndanganHome />
      </main>
    </>
  );
}

export default function UndanganPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Memuat...</div>}>
      <UndanganContent />
    </Suspense>
  );
}