'use client';

import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { clsx } from '@/lib/clsx';
import { Icon } from '../Icon';

type Tone = 'success' | 'info' | 'error';

type ToastItem = {
  id: number;
  message: string;
  tone: Tone;
};

type ToastContextValue = {
  /** Tampilkan notifikasi singkat. Default tone "success". */
  showToast: (message: string, tone?: Tone) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const toneIcon: Record<Tone, string> = {
  success: 'check_circle',
  info: 'info',
  error: 'error',
};

const toneColor: Record<Tone, string> = {
  success: 'text-tertiary',
  info: 'text-primary',
  error: 'text-error',
};

/**
 * Provider notifikasi global. Karena belum ada backend, toast dipakai untuk memberi
 * umpan balik atas aksi dummy (mis. "Lowongan disimpan", "Tautan disalin").
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const counter = useRef(0);

  const showToast = useCallback((message: string, tone: Tone = 'success') => {
    const id = counter.current++;
    setToasts((prev) => [...prev, { id, message, tone }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[var(--z-toast)] flex flex-col items-center gap-2 px-lg">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className="animate-toast-in pointer-events-auto flex max-w-app items-center gap-2 rounded-lg border border-outline-variant bg-surface-container-highest px-lg py-3 text-body-md text-on-surface shadow-level-3"
          >
            <Icon name={toneIcon[t.tone]} size={20} className={clsx('shrink-0', toneColor[t.tone])} />
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast harus dipakai di dalam <ToastProvider>');
  return ctx.showToast;
}
