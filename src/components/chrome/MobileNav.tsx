'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from '@/lib/clsx';
import { Icon } from '../Icon';

const items = [
  { href: '/', label: 'Beranda', icon: 'home' },
  { href: '/lowongan', label: 'Lowongan', icon: 'work' },
  { href: '/layanan', label: 'Layanan', icon: 'storefront' },
  { href: '/pesanan', label: 'Pesanan', icon: 'receipt_long' },
  { href: '/profil', label: 'Profil', icon: 'person' },
];

/** Bottom nav mobile (≤5 item, ikon + label — panduan navigasi). */
export function MobileNav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <nav
      aria-label="Navigasi bawah"
      className="fixed bottom-0 left-0 z-[var(--z-sticky)] flex h-16 w-full items-center justify-around border-t border-outline-variant bg-surface px-sm shadow-level-2 md:hidden"
    >
      {items.map((it) => {
        const active = isActive(it.href);
        return (
          <Link
            key={it.href}
            href={it.href}
            aria-current={active ? 'page' : undefined}
            className={clsx(
              'flex min-w-[44px] flex-col items-center justify-center gap-0.5 rounded-lg px-2 py-1 transition-colors',
              active ? 'text-primary' : 'text-on-surface-variant',
            )}
          >
            <Icon name={it.icon} fill={active} size={24} />
            <span className="text-[11px] font-medium leading-none">{it.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
