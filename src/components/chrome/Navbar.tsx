'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { clsx } from '@/lib/clsx';
import { Icon } from '../Icon';
import { ButtonLink } from '../ui/Button';
import { AvatarInitial } from '../Placeholder';
import { useAuth, roleMeta } from '@/lib/auth';

const links = [
  { href: '/lowongan', label: 'Lowongan' },
  { href: '/layanan', label: 'Layanan' },
  { href: '/talenta', label: 'Talenta' },
  { href: '/langganan', label: 'Langganan' },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  const utilityIcons = (
    <div className="hidden items-center gap-sm md:flex">
      <Link
        href="/checkout"
        aria-label="Keranjang"
        className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-low"
      >
        <Icon name="shopping_cart" />
      </Link>
      <button
        type="button"
        aria-label="Notifikasi"
        className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-low"
      >
        <Icon name="notifications" />
      </button>
      <div className="mx-1 h-6 w-px bg-outline-variant" />
    </div>
  );

  return (
    <header className="sticky top-0 z-[var(--z-sticky)] border-b border-outline-variant bg-surface/90 shadow-level-1 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-app items-center gap-lg px-lg">
        <Link href="/" className="shrink-0 text-title-lg font-bold text-primary">
          KarirHub
        </Link>

        <nav className="hidden shrink-0 items-center gap-lg md:flex" aria-label="Navigasi utama">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? 'page' : undefined}
              className={clsx(
                'rounded-full px-3 py-1.5 text-label-md transition-colors',
                isActive(l.href)
                  ? 'bg-primary-fixed font-semibold text-primary'
                  : 'text-on-surface-variant hover:bg-surface-container-low hover:text-primary',
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Search — anchor pencarian marketplace */}
        <form
          role="search"
          className="hidden h-11 max-w-md flex-1 items-center gap-sm rounded-full border border-outline-variant bg-surface-container px-md transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 lg:flex"
        >
          <Icon name="search" className="text-on-surface-variant" />
          <input
            type="search"
            placeholder="Cari layanan profesional..."
            aria-label="Cari layanan"
            className="w-full bg-transparent text-body-md text-on-surface outline-none placeholder:text-on-surface-variant"
          />
        </form>

        <div className="ml-auto flex items-center gap-md">
          {utilityIcons}
          {user ? (
            <>
              <Link
                href={roleMeta[user.role].home}
                className="flex items-center gap-2 rounded-full border border-outline-variant py-1 pl-1 pr-3 transition-colors hover:border-primary/40"
              >
                <AvatarInitial name={user.name} className="h-8 w-8 text-caption" />
                <span className="hidden text-left leading-tight sm:block">
                  <span className="block max-w-[120px] truncate text-label-md font-semibold text-on-surface">
                    {user.name}
                  </span>
                  <span className="block text-caption text-on-surface-variant">
                    {roleMeta[user.role].label}
                  </span>
                </span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  logout();
                  router.push('/');
                }}
                aria-label="Keluar"
                className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-error"
              >
                <Icon name="logout" />
              </button>
            </>
          ) : (
            <>
              <ButtonLink href="/masuk" variant="ghost" size="sm">
                Masuk
              </ButtonLink>
              <ButtonLink href="/daftar" variant="primary" size="sm">
                Daftar
              </ButtonLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
