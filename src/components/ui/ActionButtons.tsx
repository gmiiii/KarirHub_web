'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './Button';
import { useToast } from './Toast';

type BaseProps = {
  variant?: 'primary' | 'secondary' | 'ghost' | 'tonal' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
};

/**
 * Tombol yang memunculkan toast saat ditekan. Dipakai untuk aksi dummy yang belum
 * tersambung ke backend (mis. "Edit Profil", "Chat", "Pratinjau").
 */
export function ToastButton({
  message,
  tone = 'success',
  navigateTo,
  ...props
}: BaseProps & { message: string; tone?: 'success' | 'info' | 'error'; navigateTo?: string }) {
  const toast = useToast();
  const router = useRouter();
  return (
    <Button
      {...props}
      onClick={() => {
        toast(message, tone);
        if (navigateTo) router.push(navigateTo);
      }}
    />
  );
}

/** Menyalin URL halaman saat ini ke clipboard lalu memberi konfirmasi. */
export function ShareButton({
  message = 'Tautan disalin ke clipboard',
  ...props
}: BaseProps & { message?: string }) {
  const toast = useToast();
  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast(message);
    } catch {
      toast('Tidak dapat menyalin tautan', 'error');
    }
  };
  return <Button {...props} onClick={onClick} />;
}

/**
 * Tombol dua-keadaan (mis. Simpan/Tersimpan, Jeda/Aktifkan) dengan label, ikon,
 * dan pesan toast berbeda per keadaan. State disimpan lokal (front-end dummy).
 */
export function ToggleButton({
  initialOn = false,
  onState,
  offState,
  variant = 'secondary',
  size = 'md',
  fullWidth,
  className,
}: {
  initialOn?: boolean;
  onState: { label: string; icon: string; message: string };
  offState: { label: string; icon: string; message: string };
  variant?: BaseProps['variant'];
  size?: BaseProps['size'];
  fullWidth?: boolean;
  className?: string;
}) {
  const [on, setOn] = useState(initialOn);
  const toast = useToast();
  const current = on ? onState : offState;

  return (
    <Button
      variant={variant}
      size={size}
      icon={current.icon}
      fullWidth={fullWidth}
      className={className}
      onClick={() => {
        const next = !on;
        setOn(next);
        toast((next ? onState : offState).message);
      }}
    >
      {current.label}
    </Button>
  );
}
