'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/ui/Button';

export default function LupaPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Format email belum benar.');
      return;
    }
    setError('');
    setSent(true);
  }

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-lg py-2xl">
      <div className="w-full max-w-md animate-rise">
        <Link href="/" className="mb-xl inline-block text-title-lg font-bold text-primary">
          KarirHub
        </Link>

        {sent ? (
          <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-xl text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-fixed text-primary">
              <Icon name="mark_email_read" size={28} />
            </span>
            <h1 className="mt-md text-headline-md text-on-surface">Cek email kamu</h1>
            <p className="mt-1 text-body-md text-on-surface-variant">
              Kami telah mengirim tautan untuk mengatur ulang kata sandi ke{' '}
              <span className="font-semibold text-on-surface">{email}</span>.
            </p>
            <Link href="/masuk" className="mt-lg inline-block font-semibold text-primary hover:underline">
              Kembali ke halaman masuk
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-headline-md text-on-surface">Lupa kata sandi?</h1>
            <p className="mt-1 text-body-md text-on-surface-variant">
              Masukkan email akunmu, kami akan mengirim tautan untuk mengatur ulang kata sandi.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-xl space-y-md">
              <div>
                <label htmlFor="email" className="mb-1 block text-label-md font-medium text-on-surface">
                  Email
                </label>
                <div className="flex h-12 items-center rounded-lg border border-outline-variant bg-surface px-md focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    autoComplete="email"
                    className="w-full bg-transparent text-body-md text-on-surface outline-none placeholder:text-on-surface-variant"
                  />
                </div>
                {error && (
                  <p role="alert" className="mt-1 flex items-center gap-1 text-caption text-error">
                    <Icon name="error" size={14} fill /> {error}
                  </p>
                )}
              </div>

              <Button type="submit" fullWidth size="lg" icon="send">
                Kirim tautan reset
              </Button>
            </form>

            <p className="mt-lg text-center text-body-md text-on-surface-variant">
              Ingat kata sandimu?{' '}
              <Link href="/masuk" className="font-semibold text-primary hover:underline">
                Masuk
              </Link>
            </p>
          </>
        )}
      </div>
    </main>
  );
}
