'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import Cover from '@/components/sections/Cover';

function CoverContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const guest = searchParams.get('untuk') || 'Tamu Undangan';

  const handleOpen = () => {
    // Tandai bahwa user sudah lewat cover
    sessionStorage.setItem('from_cover', 'true');
    router.push(`/undangan/home?untuk=${encodeURIComponent(guest)}`);
  };

  return (
    <AnimatePresence>
      <Cover onOpen={handleOpen} />
    </AnimatePresence>
  );
}

export default function UndanganPage() {
  return (
    <Suspense fallback={null}>
      <CoverContent />
    </Suspense>
  );
}