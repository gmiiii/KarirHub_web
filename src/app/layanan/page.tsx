import { SiteChrome } from '@/components/chrome/SiteChrome';
import { Icon } from '@/components/Icon';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { services, serviceCategories } from '@/lib/data';

export const metadata = { title: 'Jasa Karir — KarirHub' };

export default function LayananPage() {
  return (
    <SiteChrome>
      <section className="bg-primary-container px-lg py-xl">
        <div className="mx-auto max-w-app">
          <h1 className="text-headline-lg text-on-primary-container">Marketplace jasa karir</h1>
          <p className="mt-2 max-w-xl text-body-md text-on-primary-container/90">
            Pilih layanan dari profesional terverifikasi untuk mempercepat karirmu.
          </p>
          <div className="mt-lg flex max-w-xl items-center gap-2 rounded-xl bg-surface-container-lowest p-2 shadow-level-2">
            <Icon name="search" className="ml-2 text-outline" />
            <input className="w-full border-0 bg-transparent py-2 outline-none placeholder:text-outline" placeholder="Cari jasa, mis. review CV" aria-label="Cari jasa" />
            <button className="rounded-lg bg-primary px-lg py-2 font-semibold text-on-primary active:scale-95">Cari</button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-app px-lg py-xl">
        {/* Kategori chip */}
        <div className="mb-lg flex flex-wrap gap-sm">
          <button className="rounded-full bg-primary px-md py-2 text-label-md font-medium text-on-primary">Semua</button>
          {serviceCategories.map((c) => (
            <button
              key={c.id}
              className="flex items-center gap-1 rounded-full border border-outline-variant bg-surface-container-lowest px-md py-2 text-label-md text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
            >
              <Icon name={c.icon} size={16} /> {c.label}
            </button>
          ))}
        </div>

        <div className="mb-md flex items-center justify-between border-b border-outline-variant pb-md">
          <span className="text-body-md text-on-surface-variant">
            <span className="font-semibold text-on-surface">{services.length}</span> jasa tersedia
          </span>
          <label className="flex items-center gap-2 text-label-md text-on-surface-variant">
            Urutkan:
            <select className="cursor-pointer rounded-lg border border-outline-variant bg-surface-container-lowest px-2 py-1 font-medium text-primary outline-none">
              <option>Paling populer</option>
              <option>Rating tertinggi</option>
              <option>Harga termurah</option>
            </select>
          </label>
        </div>

        <div className="grid grid-cols-2 gap-md md:grid-cols-3 lg:grid-cols-4">
          {services.map((s) => (
            <ScrollReveal key={s.id} y={16}>
              <ServiceCard service={s} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </SiteChrome>
  );
}
