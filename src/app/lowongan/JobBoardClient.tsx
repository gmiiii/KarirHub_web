'use client';

import { useMemo, useState } from 'react';
import { Icon } from '@/components/Icon';
import { Checkbox } from '@/components/ui/Checkbox';
import { Select } from '@/components/ui/Select';
import { JobCard } from '@/components/cards/JobCard';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import type { Job } from '@/lib/data';
import { jobTypes, experiences } from '@/lib/data';

const lokasiOptions = ['Jakarta', 'Bandung', 'Surabaya', 'Remote'];
const sortOptions = ['Terbaru', 'Gaji tertinggi', 'Paling relevan'] as const;

/** Ambil batas atas gaji dari teks "Rp15.000.000 - Rp22.000.000" untuk pengurutan. */
function maxSalary(salary: string): number {
  const nums = salary.replace(/\./g, '').match(/\d+/g);
  if (!nums) return 0;
  return Math.max(...nums.map(Number));
}

function matchesLocation(job: Job, selected: string[]): boolean {
  if (selected.length === 0) return true;
  return selected.some((loc) =>
    loc === 'Remote' ? job.remote || job.location === 'Remote' : job.location.includes(loc),
  );
}

export function JobBoardClient({ jobs, initialKeyword = '' }: { jobs: Job[]; initialKeyword?: string }) {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [query, setQuery] = useState(initialKeyword); // keyword yang sudah dikirim (saat tekan Cari)
  const [lokasiInput, setLokasiInput] = useState('');
  const [lokasiQuery, setLokasiQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string[]>(['Full-time']);
  const [expFilter, setExpFilter] = useState<string[]>([]);
  const [lokasiFilter, setLokasiFilter] = useState<string[]>([]);
  const [sort, setSort] = useState<(typeof sortOptions)[number]>('Terbaru');

  const toggle = (setter: React.Dispatch<React.SetStateAction<string[]>>) => (value: string) =>
    setter((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(keyword.trim());
    setLokasiQuery(lokasiInput.trim());
  };

  const reset = () => {
    setKeyword('');
    setQuery('');
    setLokasiInput('');
    setLokasiQuery('');
    setTypeFilter([]);
    setExpFilter([]);
    setLokasiFilter([]);
    setSort('Terbaru');
  };

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    const lq = lokasiQuery.toLowerCase();
    let result = jobs.filter((job) => {
      const haystack = [job.title, job.company, ...job.tags].join(' ').toLowerCase();
      const okKeyword = !q || haystack.includes(q);
      const okLokasiText = !lq || job.location.toLowerCase().includes(lq);
      const okType = typeFilter.length === 0 || typeFilter.includes(job.type);
      const okExp = expFilter.length === 0 || expFilter.includes(job.experience);
      const okLokasi = matchesLocation(job, lokasiFilter);
      return okKeyword && okLokasiText && okType && okExp && okLokasi;
    });

    if (sort === 'Gaji tertinggi') {
      result = [...result].sort((a, b) => maxSalary(b.salary) - maxSalary(a.salary));
    }
    return result;
  }, [jobs, query, lokasiQuery, typeFilter, expFilter, lokasiFilter, sort]);

  return (
    <>
      {/* Hero search */}
      <section className="bg-primary-container px-lg py-xl">
        <div className="mx-auto max-w-app">
          <h1 className="mb-lg text-headline-lg text-on-primary-container">Temukan pekerjaan impianmu</h1>
          <form
            onSubmit={submitSearch}
            className="flex flex-col gap-2 rounded-xl bg-surface-container-lowest p-2 shadow-level-2 md:flex-row"
          >
            <label className="flex flex-1 items-center gap-2 border-b border-outline-variant px-md md:border-b-0 md:border-r">
              <Icon name="search" className="text-outline" />
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full border-0 bg-transparent py-3 outline-none placeholder:text-outline"
                placeholder="Posisi atau kata kunci"
                aria-label="Kata kunci"
              />
            </label>
            <label className="flex flex-1 items-center gap-2 px-md">
              <Icon name="location_on" className="text-outline" />
              <input
                value={lokasiInput}
                onChange={(e) => setLokasiInput(e.target.value)}
                className="w-full border-0 bg-transparent py-3 outline-none placeholder:text-outline"
                placeholder="Lokasi (kota atau provinsi)"
                aria-label="Lokasi"
              />
            </label>
            <button
              type="submit"
              className="rounded-lg bg-primary px-xl py-3 font-semibold text-on-primary transition-all duration-200 ease-out-quint hover:shadow-level-2 active:scale-95"
            >
              Cari Lowongan
            </button>
          </form>
        </div>
      </section>

      <div className="mx-auto flex max-w-app flex-col gap-xl px-lg py-xl md:flex-row">
        {/* Sidebar filter */}
        <aside className="w-full flex-shrink-0 md:w-64">
          <div className="space-y-xl md:sticky md:top-24">
            <div className="flex items-center justify-between">
              <h2 className="text-title-lg text-on-surface">Filter</h2>
              <button onClick={reset} className="text-label-md text-primary hover:underline">
                Reset
              </button>
            </div>
            <FilterGroup title="Tipe Pekerjaan" options={jobTypes} selected={typeFilter} onToggle={toggle(setTypeFilter)} />
            <FilterGroup title="Pengalaman" options={experiences} selected={expFilter} onToggle={toggle(setExpFilter)} />
            <FilterGroup title="Lokasi" options={lokasiOptions} selected={lokasiFilter} onToggle={toggle(setLokasiFilter)} />
          </div>
        </aside>

        {/* Hasil */}
        <div className="flex-1 space-y-lg">
          <div className="flex items-center justify-between border-b border-outline-variant pb-md">
            <span className="text-body-md text-on-surface-variant">
              Menampilkan <span className="font-semibold text-on-surface">{filtered.length}</span> lowongan
            </span>
            <div className="flex items-center gap-2 text-label-md text-on-surface-variant">
              <span>Urutkan:</span>
              <Select
                ariaLabel="Urutkan lowongan"
                options={[...sortOptions]}
                value={sort}
                onChange={(v) => setSort(v as (typeof sortOptions)[number])}
              />
            </div>
          </div>
          {filtered.length > 0 ? (
            <div className="space-y-md">
              {filtered.map((job) => (
                <ScrollReveal key={job.id} y={16}>
                  <JobCard job={job} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-outline-variant py-2xl text-center">
              <Icon name="search_off" size={32} className="text-on-surface-variant" />
              <p className="text-body-md text-on-surface-variant">Tidak ada lowongan yang cocok dengan pencarianmu.</p>
              <button onClick={reset} className="text-label-md font-semibold text-primary hover:underline">
                Atur ulang filter
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function FilterGroup({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="space-y-md">
      <h3 className="text-label-md font-bold uppercase tracking-wider text-on-surface">{title}</h3>
      <div className="space-y-sm">
        {options.map((opt) => (
          <Checkbox
            key={opt}
            label={opt}
            checked={selected.includes(opt)}
            onChange={() => onToggle(opt)}
          />
        ))}
      </div>
    </div>
  );
}
