import Link from 'next/link';
import { Icon } from '../Icon';

/** Floating Action Button - bantuan/chat (DESIGN.md: bottom-right, biru). */
export function Fab() {
  return (
    <Link
      href="/bantuan"
      aria-label="Hubungi bantuan"
      className="group fixed bottom-28 right-5 z-[var(--z-fab)] flex h-14 w-14 items-center justify-center rounded-full bg-primary text-on-primary shadow-level-3 transition-transform duration-200 ease-out-quint hover:scale-110 active:scale-90 md:bottom-8 md:right-8"
    >
      <Icon name="chat_bubble" fill size={26} />
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded bg-on-surface px-md py-1 text-caption text-surface opacity-0 shadow-level-2 transition-opacity group-hover:opacity-100">
        Hubungi Bantuan
      </span>
    </Link>
  );
}
