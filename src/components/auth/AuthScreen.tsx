'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { clsx } from '@/lib/clsx';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/ui/Button';
import { useAuth, defaultNameByRole } from '@/lib/auth';

const PROOF = [
  { icon: 'verified', text: 'Seller & perusahaan terverifikasi' },
  { icon: 'lock', text: 'Pembayaran aman & terenkripsi' },
  { icon: 'work', text: '12.480 lowongan aktif hari ini' },
];

export function AuthScreen({ mode }: { mode: 'login' | 'register' }) {
  const isLogin = mode === 'login';
  const router = useRouter();
  const { login } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!isLogin && !name.trim()) next.name = 'Masukkan nama lengkapmu.';
    if (!email.trim()) next.email = 'Email wajib diisi.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Format email belum benar.';
    if (!password) next.password = 'Kata sandi wajib diisi.';
    else if (password.length < 6) next.password = 'Minimal 6 karakter.';

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // Satu akun, semua peran. Mulai di mode default (pencari); ganti peran lewat
    // menu akun ("Ganti mode akun"). Arahkan ke beranda netral, bukan home peran.
    login({
      name: isLogin ? defaultNameByRole.pencari : name.trim(),
      email: email.trim(),
      role: 'pencari',
    });
    router.push('/');
  }

  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      {/* Panel brand (kiri) - biru penuh, teks putih (kontras aman) */}
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-primary-container p-2xl text-on-primary lg:flex">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-on-primary/10 blur-2xl"
        />
        <Link href="/" className="relative text-title-lg font-bold">
          KarirHub
        </Link>
        <div className="relative space-y-lg">
          <h2 className="max-w-sm text-balance text-display-lg font-bold leading-[1.05]">
            Satu platform untuk semua kebutuhan karirmu.
          </h2>
          <ul className="space-y-md">
            {PROOF.map((p) => (
              <li key={p.text} className="flex items-center gap-md text-body-md text-on-primary/90">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-on-primary/15">
                  <Icon name={p.icon} size={20} fill />
                </span>
                {p.text}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-caption text-on-primary/70">
          © 2026 KarirHub. Karir Indonesia, satu pintu.
        </p>
      </aside>

      {/* Form (kanan) */}
      <main className="flex flex-col justify-center px-lg py-2xl sm:px-2xl">
        <div className="mx-auto w-full max-w-md animate-rise">
          <Link href="/" className="mb-xl inline-block text-title-lg font-bold text-primary lg:hidden">
            KarirHub
          </Link>

          <h1 className="text-headline-md text-on-surface">
            {isLogin ? 'Masuk ke KarirHub' : 'Buat akun KarirHub'}
          </h1>
          <p className="mt-1 text-body-md text-on-surface-variant">
            {isLogin
              ? 'Satu akun untuk melamar kerja, jual jasa, dan rekrut talenta.'
              : 'Gratis. Satu akun untuk semua kebutuhan karirmu.'}
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-xl space-y-md">
            {!isLogin && (
              <Field
                id="name"
                label="Nama lengkap"
                value={name}
                onChange={setName}
                placeholder="Nama kamu"
                autoComplete="name"
                error={errors.name}
              />
            )}
            <Field
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="nama@email.com"
              autoComplete="email"
              error={errors.email}
            />
            <Field
              id="password"
              label="Kata sandi"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={setPassword}
              placeholder={isLogin ? 'Kata sandimu' : 'Minimal 6 karakter'}
              autoComplete={isLogin ? 'current-password' : 'new-password'}
              error={errors.password}
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                  className="rounded-full p-1 text-on-surface-variant transition-colors hover:text-primary"
                >
                  <Icon name={showPassword ? 'visibility_off' : 'visibility'} size={20} />
                </button>
              }
            />

            {isLogin && (
              <div className="flex justify-end">
                <Link href="/lupa-password" className="text-label-md font-medium text-primary hover:underline">
                  Lupa sandi?
                </Link>
              </div>
            )}

            <Button type="submit" fullWidth size="lg" icon={isLogin ? 'login' : 'person_add'}>
              {isLogin ? 'Masuk' : 'Daftar sekarang'}
            </Button>
          </form>

          <p className="mt-lg text-center text-body-md text-on-surface-variant">
            {isLogin ? 'Belum punya akun? ' : 'Sudah punya akun? '}
            <Link
              href={isLogin ? '/daftar' : '/masuk'}
              className="font-semibold text-primary hover:underline"
            >
              {isLogin ? 'Daftar' : 'Masuk'}
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  autoComplete,
  error,
  trailing,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
  trailing?: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-label-md font-medium text-on-surface">
        {label}
      </label>
      <div
        className={clsx(
          'flex h-12 items-center rounded-lg border bg-surface px-md transition-colors focus-within:ring-2',
          error
            ? 'border-error focus-within:border-error focus-within:ring-error/30'
            : 'border-outline-variant focus-within:border-primary focus-within:ring-primary/30',
        )}
      >
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className="w-full bg-transparent text-body-md text-on-surface outline-none placeholder:text-on-surface-variant"
        />
        {trailing}
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 flex items-center gap-1 text-caption text-error">
          <Icon name="error" size={14} fill /> {error}
        </p>
      )}
    </div>
  );
}
