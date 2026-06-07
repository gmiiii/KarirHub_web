import Link from 'next/link';
import { clsx } from '@/lib/clsx';
import { SiteChrome } from '@/components/chrome/SiteChrome';
import { Icon } from '@/components/Icon';
import { Select } from '@/components/ui/Select';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { services, serviceCategories } from '@/lib/data';

export const metadata = { title: 'Jasa Karir - KarirHub' };

export default function LayananPage({
  searchParams,
}: {
  searchParams?: { kategori?: string };
}) {
  // Filter berdasarkan kategori dari query (?kategori=<id>).
  const activeId = searchParams?.kategori;
  const activeLabel = serviceCategories.find((c) => c.id === activeId)?.label;
  const filtered = activeLabel ? services.filter((s) => s.category === activeLabel) : services;

  return (
    <SiteChrome>
      <section className="bg-primary-container px-lg py-xl">
        <div className="mx-auto max-w-app">
          <h1 className="text-headline-lg text-on-primary-container">Marketplace jasa karir</h1>
          <p className="mt-2 max-w-xl text-body-md text-on-primary-container/90">
            Pilih layanan dari profesional terverifikasi untuk mempercepat karirmu.
          </p>
          <div className="mt-lg flex flex-col gap-2 rounded-xl bg-surface-container-lowest p-2 shadow-level-2 md:flex-row">
            <label className="flex flex-1 items-center gap-2 px-md">
              <Icon name="search" className="text-outline" />
              <input className="w-full border-0 bg-transparent py-3 outline-none placeholder:text-outline" placeholder="Cari jasa, mis. review CV" aria-label="Cari jasa" />
            </label>
            <button className="rounded-lg bg-primary px-xl py-3 font-semibold text-on-primary transition-all duration-200 ease-out-quint hover:shadow-level-2 active:scale-95">
              Cari Jasa
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-app px-lg py-xl">
        {/* Kategori chip - tiap chip adalah tautan yang memfilter daftar lewat ?kategori */}
        <div className="mb-lg flex flex-wrap gap-sm">
          <Link
            href="/layanan"
            className={clsx(
              'rounded-full px-md py-2 text-label-md font-medium transition-colors',
              !activeId
                ? 'bg-primary text-on-primary'
                : 'border border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:border-primary hover:text-primary',
            )}
          >
            Semua
          </Link>
          {serviceCategories.map((c) => {
            const active = activeId === c.id;
            return (
              <Link
                key={c.id}
                href={`/layanan?kategori=${c.id}`}
                aria-current={active ? 'true' : undefined}
                className={clsx(
                  'flex items-center gap-1 rounded-full px-md py-2 text-label-md font-medium transition-colors',
                  active
                    ? 'bg-primary text-on-primary'
                    : 'border border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:border-primary hover:text-primary',
                )}
              >
                <Icon name={c.icon} size={16} /> {c.label}
              </Link>
            );
          })}
        </div>

        <div className="mb-md flex items-center justify-between border-b border-outline-variant pb-md">
          <span className="text-body-md text-on-surface-variant">
            <span className="font-semibold text-on-surface">{filtered.length}</span> jasa tersedia
            {activeLabel && <> dalam <span className="font-semibold text-on-surface">{activeLabel}</span></>}
          </span>
          <div className="flex items-center gap-2 text-label-md text-on-surface-variant">
            <span>Urutkan:</span>
            <Select ariaLabel="Urutkan jasa" options={['Paling populer', 'Rating tertinggi', 'Harga termurah']} />
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-md md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((s) => (
              <ScrollReveal key={s.id} y={16}>
                <ServiceCard service={s} />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-outline-variant py-2xl text-center">
            <Icon name="search_off" size={32} className="text-on-surface-variant" />
            <p className="text-body-md text-on-surface-variant">Belum ada jasa pada kategori ini.</p>
            <Link href="/layanan" className="text-label-md font-semibold text-primary hover:underline">
              Lihat semua jasa
            </Link>
          </div>
        )}
      </div>
    </SiteChrome>
  );
}
