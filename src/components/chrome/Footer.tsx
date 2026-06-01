import Link from 'next/link';

const groups = [
  {
    title: 'Untuk Kandidat',
    links: [
      { href: '/lowongan', label: 'Cari Lowongan' },
      { href: '/layanan', label: 'Jasa Karir' },
      { href: '/ai-foto-cv', label: 'AI Foto CV' },
    ],
  },
  {
    title: 'Untuk Rekruter',
    links: [
      { href: '/pasang-lowongan', label: 'Pasang Lowongan' },
      { href: '/talenta', label: 'Cari Talenta' },
      { href: '/dashboard/rekruter', label: 'Dashboard Rekruter' },
    ],
  },
  {
    title: 'Untuk Seller',
    links: [
      { href: '/dashboard/seller', label: 'Dashboard Seller' },
      { href: '/layanan-saya', label: 'Layanan Saya' },
      { href: '/langganan', label: 'Paket Langganan' },
    ],
  },
  {
    title: 'Bantuan',
    links: [
      { href: '#', label: 'Pusat Bantuan' },
      { href: '#', label: 'Ketentuan Layanan' },
      { href: '#', label: 'Kebijakan Privasi' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-2xl border-t border-outline-variant bg-surface-container-lowest">
      <div className="mx-auto w-full max-w-app px-lg py-2xl">
        <div className="grid grid-cols-2 gap-xl md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <span className="text-headline-md font-bold text-primary">KarirHub</span>
            <p className="mt-sm max-w-xs text-body-md text-on-surface-variant">
              Selangkah menuju sukses. Cari kerja dan tingkatkan karir dalam satu platform.
            </p>
          </div>
          {groups.map((g) => (
            <div key={g.title}>
              <h3 className="text-label-md font-bold uppercase tracking-wider text-on-surface">
                {g.title}
              </h3>
              <ul className="mt-md space-y-sm">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-body-md text-on-surface-variant transition-colors hover:text-primary"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-xl border-t border-outline-variant pt-lg text-caption text-on-surface-variant">
          © 2026 KarirHub Indonesia. Seluruh hak cipta dilindungi.
        </div>
      </div>
    </footer>
  );
}
