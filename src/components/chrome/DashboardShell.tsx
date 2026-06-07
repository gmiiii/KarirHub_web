'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { clsx } from '@/lib/clsx';
import { Icon } from '../Icon';
import { AvatarInitial } from '../Placeholder';
import { AccountMenu } from './AccountMenu';
import { useAuth, roleMeta } from '@/lib/auth';

export type DashRole = 'rekruter' | 'seller';

const navByRole: Record<DashRole, { href: string; label: string; icon: string }[]> = {
  rekruter: [
    { href: '/dashboard/rekruter', label: 'Ringkasan', icon: 'dashboard' },
    { href: '/pasang-lowongan', label: 'Pasang Lowongan', icon: 'add_box' },
    { href: '/dashboard/rekruter/talenta', label: 'Cari Talenta', icon: 'groups' },
    { href: '/dashboard/rekruter/paket', label: 'Paket Premium', icon: 'workspace_premium' },
    { href: '/dashboard/rekruter/transaksi', label: 'Transaksi', icon: 'receipt_long' },
  ],
  seller: [
    { href: '/dashboard/seller', label: 'Ringkasan', icon: 'dashboard' },
    { href: '/layanan-saya', label: 'Layanan Saya', icon: 'storefront' },
    { href: '/pesanan', label: 'Pesanan Masuk', icon: 'inbox' },
    { href: '/dashboard/seller/langganan', label: 'Langganan', icon: 'workspace_premium' },
    { href: '/dashboard/seller/transaksi', label: 'Transaksi', icon: 'payments' },
  ],
};

export function DashboardShell({
  role,
  title,
  subtitle,
  action,
  children,
}: {
  role: DashRole;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, ready } = useAuth();
  // Tiap role independen: user yang login dengan peran lain dialihkan ke home-nya.
  // Hanya bisa masuk dashboard ini dengan berganti ke mode yang sesuai.
  const mismatch = ready && !!user && user.role !== role;
  useEffect(() => {
    if (mismatch && user) router.replace(roleMeta[user.role].home);
  }, [mismatch, user, router]);
  const nav = navByRole[role];
  // Pakai nama sesi (jika login), jatuh ke nama contoh per peran.
  const name = user?.name ?? (role === 'rekruter' ? 'PT. Teknologi Masa Depan' : 'Dewi Lestari');
  const roleLabel = role === 'rekruter' ? 'Rekruter' : 'Seller';

  if (mismatch) return null; // sedang dialihkan ke home peran yang benar

  return (
    <div className="flex min-h-dvh bg-surface-container-low">
      {/* Sidebar desktop */}
      <aside className="sticky top-0 hidden h-dvh w-64 flex-shrink-0 flex-col border-r border-outline-variant bg-surface-container-lowest lg:flex">
        <div className="flex h-16 items-center px-lg">
          <Link href="/" className="text-title-lg font-bold text-primary">KarirHub</Link>
        </div>
        <div className="px-md py-2">
          <span className="rounded-full bg-primary-fixed px-md py-1 text-caption font-semibold uppercase tracking-wider text-on-primary-fixed">
            {roleLabel}
          </span>
        </div>
        <nav className="flex-1 space-y-1 p-md" aria-label="Navigasi dashboard">
          {nav.map((n) => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? 'page' : undefined}
                className={clsx(
                  'flex items-center gap-md rounded-lg px-md py-2.5 text-label-md transition-colors',
                  active
                    ? 'bg-primary font-semibold text-on-primary shadow-level-1'
                    : 'text-on-surface-variant hover:bg-surface-container-low',
                )}
              >
                <Icon name={n.icon} fill={active} size={22} /> {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-md border-t border-outline-variant p-md">
          <AvatarInitial name={name} className="h-9 w-9 text-label-md" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-label-md font-semibold text-on-surface">{name}</p>
            <p className="truncate text-caption text-on-surface-variant">{roleLabel}</p>
          </div>
        </div>
      </aside>

      {/* Konten */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-[var(--z-sticky)] flex h-16 items-center justify-between border-b border-outline-variant bg-surface-container-lowest/90 px-lg backdrop-blur">
          <Link href="/" className="text-title-lg font-bold text-primary lg:hidden">KarirHub</Link>
          <div className="hidden lg:block">
            <h1 className="text-title-lg font-semibold text-on-surface">{title}</h1>
          </div>
          <div className="flex items-center gap-sm">
            <button aria-label="Notifikasi" className="relative rounded-full p-2 text-on-surface-variant hover:bg-surface-container-low">
              <Icon name="notifications" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-error ring-2 ring-surface-container-lowest" />
            </button>
            <AccountMenu activeRole={role} fallbackName={name} />
          </div>
        </header>

        <main className="flex-1 p-lg">
          <div className="mx-auto max-w-5xl">
            <div className="mb-lg flex flex-col gap-md sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-headline-md text-on-surface">{title}</h2>
                {subtitle && <p className="mt-1 text-body-md text-on-surface-variant">{subtitle}</p>}
              </div>
              {action}
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

/** Kartu statistik dashboard (reusable). */
export function StatCard({
  icon,
  label,
  value,
  delta,
}: {
  icon: string;
  label: string;
  value: string;
  delta?: string;
}) {
  return (
    <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg transition-shadow hover:shadow-level-1">
      <div className="flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-fixed text-primary">
          <Icon name={icon} size={22} />
        </span>
      </div>
      <p className="mt-md text-headline-md font-bold tabular-nums text-on-surface">{value}</p>
      <p className="text-label-md text-on-surface-variant">{label}</p>
      {delta && <p className="mt-1 text-caption text-tertiary">{delta}</p>}
    </div>
  );
}
