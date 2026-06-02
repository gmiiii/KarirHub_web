/**
 * template.tsx di-remount setiap navigasi route, jadi `animate-fade` (keyframe
 * kh-fade di globals.css) memberi transisi fade halus tiap pindah halaman.
 * Reduced-motion ditangani global di globals.css.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-fade">{children}</div>;
}
