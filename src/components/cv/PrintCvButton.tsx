'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/Icon';

type Status = 'idle' | 'preparing' | 'ready';

// Tombol "Cetak ke Word" - demo: hanya notifikasi 2 tahap, belum buat file.
export function PrintCvButton() {
  const [status, setStatus] = useState<Status>('idle');
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const handlePrint = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setStatus('preparing');
    timers.current.push(
      setTimeout(() => setStatus('ready'), 1300),
      setTimeout(() => setStatus('idle'), 4300),
    );
  };

  return (
    <>
      <Button icon="description" onClick={handlePrint} disabled={status === 'preparing'}>
        {status === 'preparing' ? 'Menyiapkan...' : 'Cetak ke Word'}
      </Button>

      {status !== 'idle' && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-x-0 bottom-6 z-[var(--z-toast,60)] flex justify-center px-lg"
        >
          <div className="flex items-center gap-3 rounded-xl border border-outline-variant bg-inverse-surface px-lg py-3 text-inverse-on-surface shadow-level-3">
            {status === 'preparing' ? (
              <>
                <Icon name="progress_activity" size={20} className="animate-spin text-inverse-on-surface/80" />
                <span className="text-label-md">Menyiapkan CV untuk diunduh ke Word...</span>
              </>
            ) : (
              <>
                <Icon name="check_circle" size={20} fill className="text-tertiary" />
                <span className="text-label-md">CV siap diunduh sebagai dokumen Word (demo).</span>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
