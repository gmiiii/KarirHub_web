import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Fab } from './Fab';
import { MobileNav } from './MobileNav';

/**
 * Kerangka halaman publik: navbar + konten + footer + FAB + bottom-nav mobile.
 * pb-16 di mobile memberi ruang agar konten tidak tertutup bottom-nav.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <Footer />
      <Fab />
      <MobileNav />
    </div>
  );
}
