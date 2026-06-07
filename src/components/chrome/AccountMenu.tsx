'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { clsx } from '@/lib/clsx';
import { Icon } from '../Icon';
import { AvatarInitial } from '../Placeholder';
import { useAuth, roleMeta, defaultNameByRole, type Role } from '@/lib/auth';

const ORDER: Role[] = ['pencari', 'seller', 'rekruter'];

/**
 * Menu akun terpadu di pojok kanan-atas: identitas + ganti mode (Model A: satu
 * akun, banyak peran) + keluar. Dipakai sama persis di navbar kandidat maupun
 * header dashboard agar konsisten di ketiga role.
 *
 * `activeRole` memaksa mode aktif yang disorot (mis. di dashboard); bila kosong
 * memakai peran user. `fallbackName` dipakai saat belum ada sesi login.
 */
export function AccountMenu({
  activeRole,
  fallbackName,
}: {
  activeRole?: Role;
  fallbackName?: string;
}) {
  const { user, switchRole, login, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const currentRole: Role = activeRole ?? user?.role ?? 'pencari';
  const name = user?.name ?? fallbackName ?? defaultNameByRole[currentRole];

  const choose = (role: Role) => {
    setOpen(false);
    if (user) switchRole(role);
    else login({ name: defaultNameByRole[role], email: `${role}@demo.karirhub.id`, role });
    // replace - tiap role "dunia" terpisah; tak ada back ke role sebelumnya.
    router.replace(roleMeta[role].home);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-outline-variant py-1 pl-1 pr-2 transition-colors hover:border-primary/40"
      >
        <AvatarInitial name={name} className="h-8 w-8 text-caption" />
        <span className="hidden text-left leading-tight sm:block">
          <span className="block max-w-[120px] truncate text-label-md font-semibold text-on-surface">
            {name}
          </span>
          <span className="block text-caption text-on-surface-variant">
            {roleMeta[currentRole].label}
          </span>
        </span>
        <Icon
          name="expand_more"
          size={18}
          className={clsx('text-on-surface-variant transition-transform', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+8px)] z-[var(--z-dropdown)] w-72 overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest p-1 shadow-level-3"
        >
          <Link
            href="/profil"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-surface-container-low"
          >
            <AvatarInitial name={name} className="h-10 w-10 text-label-md" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-label-md font-semibold text-on-surface">{name}</p>
              <p className="truncate text-caption text-on-surface-variant">
                {user?.email ?? `Mode ${roleMeta[currentRole].short}`}
              </p>
            </div>
            <Icon name="chevron_right" size={18} className="text-on-surface-variant" />
          </Link>

          <div className="my-1 h-px bg-outline-variant" />
          {[
            { href: '/profil', icon: 'account_circle', label: 'Profil Saya' },
            { href: '/cv-saya', icon: 'description', label: 'CV Saya' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-surface-container-low"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container-high text-primary">
                <Icon name={item.icon} size={20} />
              </span>
              <span className="text-label-md font-medium text-on-surface">{item.label}</span>
            </Link>
          ))}

          <div className="my-1 h-px bg-outline-variant" />
          <p className="px-3 py-1.5 text-caption font-medium uppercase tracking-wider text-on-surface-variant">
            Ganti mode akun
          </p>
          {ORDER.map((role) => {
            const m = roleMeta[role];
            const current = role === currentRole;
            return (
              <button
                key={role}
                role="menuitemradio"
                aria-checked={current}
                onClick={() => choose(role)}
                className={clsx(
                  'flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors',
                  current ? 'bg-primary-fixed' : 'hover:bg-surface-container-low',
                )}
              >
                <span
                  className={clsx(
                    'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
                    current ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-primary',
                  )}
                >
                  <Icon name={m.icon} size={20} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5">
                    <span className="text-label-md font-semibold text-on-surface">{m.label}</span>
                    {current && <Icon name="check_circle" size={16} fill className="text-primary" />}
                  </span>
                  <span className="mt-0.5 block text-caption text-on-surface-variant">{m.desc}</span>
                </span>
              </button>
            );
          })}

          <div className="my-1 h-px bg-outline-variant" />
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              logout();
              router.push('/');
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-surface-container-low"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full text-error">
              <Icon name="logout" size={20} />
            </span>
            <span className="text-label-md font-medium text-on-surface">Keluar</span>
          </button>
        </div>
      )}
    </div>
  );
}
