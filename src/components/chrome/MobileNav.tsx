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

/**
 * Bottom nav mobile — floating pill bar dengan highlight yang meluncur antar item.
 * Highlight (bg-primary-fixed) selaras dengan active pill di top navbar.
 */
export function MobileNav() {
  const pathname = usePathname();
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  const activeIndex = items.findIndex((it) => isActive(it.href));

  return (
    <nav
      aria-label="Navigasi bawah"
      className="fixed bottom-4 left-4 right-4 z-[var(--z-sticky)] mx-auto max-w-md md:hidden"
    >
      <div className="relative flex items-stretch rounded-full border border-outline-variant bg-surface/95 p-1.5 shadow-level-2 backdrop-blur">
        {/* Highlight pill yang meluncur ke item aktif */}
        <span
          aria-hidden
          className={clsx(
            'pointer-events-none absolute inset-y-1.5 left-1.5 rounded-full bg-primary-fixed transition-[transform,opacity] duration-200 ease-out-quint',
            activeIndex < 0 && 'opacity-0',
          )}
          style={{
            width: `calc((100% - 0.75rem) / ${items.length})`,
            transform: `translateX(${Math.max(activeIndex, 0) * 100}%)`,
          }}
        />
        {items.map((it) => {
          const active = isActive(it.href);
          return (
            <Link
              key={it.href}
              href={it.href}
              aria-current={active ? 'page' : undefined}
              className={clsx(
                'relative z-10 flex flex-1 flex-col items-center justify-center gap-0.5 rounded-full py-1.5 transition-[color,transform] duration-200 ease-out-quint active:scale-95',
                active ? 'text-primary' : 'text-on-surface-variant',
              )}
            >
              <Icon name={it.icon} fill={active} size={24} />
              <span className="text-[11px] font-medium leading-none">{it.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
