'use client';

import { useMemo, useState } from 'react';
import { clsx } from '@/lib/clsx';
import { Icon } from '@/components/Icon';
import { Select } from '@/components/ui/Select';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import type { Service } from '@/lib/data';
import { serviceCategories } from '@/lib/data';

const sortOptions = ['Paling populer', 'Rating tertinggi', 'Harga termurah'] as const;

export function ServiceMarketClient({
  services,
  initialCategory,
  initialKeyword = '',
}: {
  services: Service[];
  initialCategory?: string;
  initialKeyword?: string;
}) {
  const [categoryId, setCategoryId] = useState<string | null>(initialCategory ?? null);
  const [keyword, setKeyword] = useState(initialKeyword);
  const [query, setQuery] = useState(initialKeyword);
  const [sort, setSort] = useState<(typeof sortOptions)[number]>('Paling populer');

  const activeLabel = serviceCategories.find((c) => c.id === categoryId)?.label;

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    let result = services.filter((s) => {
      const okCategory = !activeLabel || s.category === activeLabel;
      const haystack = [s.title, s.seller, s.category, s.description].join(' ').toLowerCase();
      const okKeyword = !q || haystack.includes(q);
      return okCategory && okKeyword;
    });

    if (sort === 'Rating tertinggi') result = [...result].sort((a, b) => b.rating - a.rating);
    else if (sort === 'Harga termurah') result = [...result].sort((a, b) => a.priceFrom - b.priceFrom);
    else result = [...result].sort((a, b) => b.reviews - a.reviews);

    return result;
  }, [services, activeLabel, query, sort]);

  return (
    <>
      <section className="bg-primary-container px-lg py-xl">
        <div className="mx-auto max-w-app">
          <h1 className="text-headline-lg text-on-primary-container">Marketplace jasa karir</h1>
          <p className="mt-2 max-w-xl text-body-md text-on-primary-container/90">
            Pilih layanan dari profesional terverifikasi untuk mempercepat karirmu.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setQuery(keyword.trim());
            }}
            className="mt-lg flex flex-col gap-2 rounded-xl bg-surface-container-lowest p-2 shadow-level-2 md:flex-row"
          >
            <label className="flex flex-1 items-center gap-2 px-md">
              <Icon name="search" className="text-outline" />
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full border-0 bg-transparent py-3 outline-none placeholder:text-outline"
                placeholder="Cari jasa, mis. review CV"
                aria-label="Cari jasa"
              />
            </label>
            <button
              type="submit"
              className="rounded-lg bg-primary px-xl py-3 font-semibold text-on-primary transition-all duration-200 ease-out-quint hover:shadow-level-2 active:scale-95"
            >
              Cari Jasa
            </button>
          </form>
        </div>
      </section>

      <div className="mx-auto max-w-app px-lg py-xl">
        {/* Kategori chip - filter daftar secara client-side */}
        <div className="mb-lg flex flex-wrap gap-sm">
          <button
            onClick={() => setCategoryId(null)}
            className={clsx(
              'rounded-full px-md py-2 text-label-md font-medium transition-colors',
              !categoryId
                ? 'bg-primary text-on-primary'
                : 'border border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:border-primary hover:text-primary',
            )}
          >
            Semua
          </button>
          {serviceCategories.map((c) => {
            const active = categoryId === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setCategoryId(c.id)}
                aria-current={active ? 'true' : undefined}
                className={clsx(
                  'flex items-center gap-1 rounded-full px-md py-2 text-label-md font-medium transition-colors',
                  active
                    ? 'bg-primary text-on-primary'
                    : 'border border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:border-primary hover:text-primary',
                )}
              >
                <Icon name={c.icon} size={16} /> {c.label}
              </button>
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
            <Select
              ariaLabel="Urutkan jasa"
              options={[...sortOptions]}
              value={sort}
              onChange={(v) => setSort(v as (typeof sortOptions)[number])}
            />
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
            <p className="text-body-md text-on-surface-variant">Belum ada jasa yang cocok.</p>
            <button
              onClick={() => {
                setCategoryId(null);
                setKeyword('');
                setQuery('');
              }}
              className="text-label-md font-semibold text-primary hover:underline"
            >
              Lihat semua jasa
            </button>
          </div>
        )}
      </div>
    </>
  );
}
