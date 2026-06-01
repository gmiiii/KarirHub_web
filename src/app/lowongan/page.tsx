import { SiteChrome } from '@/components/chrome/SiteChrome';
import { Icon } from '@/components/Icon';
import { JobCard } from '@/components/cards/JobCard';
import { jobs, jobTypes, experiences } from '@/lib/data';

export const metadata = { title: 'Lowongan Kerja — KarirHub' };

export default function JobBoardPage() {
  return (
    <SiteChrome>
      {/* Hero search */}
      <section className="bg-primary-container px-lg py-xl">
        <div className="mx-auto max-w-app">
          <h1 className="mb-lg text-headline-lg text-on-primary-container">Temukan pekerjaan impianmu</h1>
          <div className="flex flex-col gap-2 rounded-xl bg-surface-container-lowest p-2 shadow-level-2 md:flex-row">
            <label className="flex flex-1 items-center gap-2 border-b border-outline-variant px-md md:border-b-0 md:border-r">
              <Icon name="search" className="text-outline" />
              <input className="w-full border-0 bg-transparent py-3 outline-none placeholder:text-outline" placeholder="Posisi atau kata kunci" aria-label="Kata kunci" />
            </label>
            <label className="flex flex-1 items-center gap-2 px-md">
              <Icon name="location_on" className="text-outline" />
              <input className="w-full border-0 bg-transparent py-3 outline-none placeholder:text-outline" placeholder="Lokasi (kota atau provinsi)" aria-label="Lokasi" />
            </label>
            <button className="rounded-lg bg-primary px-xl py-3 font-semibold text-on-primary transition-all duration-200 ease-out-quint hover:shadow-level-2 active:scale-95">
              Cari Lowongan
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-app flex-col gap-xl px-lg py-xl md:flex-row">
        {/* Sidebar filter */}
        <aside className="w-full flex-shrink-0 md:w-64">
          <div className="space-y-xl md:sticky md:top-24">
            <div className="flex items-center justify-between">
              <h2 className="text-title-lg text-on-surface">Filter</h2>
              <button className="text-label-md text-primary hover:underline">Reset</button>
            </div>
            <FilterGroup title="Tipe Pekerjaan" options={jobTypes} defaultChecked={['Full-time']} />
            <FilterGroup title="Pengalaman" options={experiences} />
            <FilterGroup title="Lokasi" options={['Jakarta', 'Bandung', 'Surabaya', 'Remote']} />
          </div>
        </aside>

        {/* Hasil */}
        <div className="flex-1 space-y-lg">
          <div className="flex items-center justify-between border-b border-outline-variant pb-md">
            <span className="text-body-md text-on-surface-variant">
              Menampilkan <span className="font-semibold text-on-surface">{jobs.length}</span> lowongan
            </span>
            <label className="flex items-center gap-2 text-label-md text-on-surface-variant">
              Urutkan:
              <select className="cursor-pointer rounded-lg border border-outline-variant bg-surface-container-lowest px-2 py-1 font-medium text-primary outline-none">
                <option>Terbaru</option>
                <option>Gaji tertinggi</option>
                <option>Paling relevan</option>
              </select>
            </label>
          </div>
          <div className="space-y-md">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          <Pagination />
        </div>
      </div>
    </SiteChrome>
  );
}

function FilterGroup({
  title,
  options,
  defaultChecked = [],
}: {
  title: string;
  options: string[];
  defaultChecked?: string[];
}) {
  return (
    <div className="space-y-md">
      <h3 className="text-label-md font-bold uppercase tracking-wider text-on-surface">{title}</h3>
      <div className="space-y-sm">
        {options.map((opt) => (
          <label key={opt} className="group flex cursor-pointer items-center gap-sm">
            <input
              type="checkbox"
              defaultChecked={defaultChecked.includes(opt)}
              className="h-5 w-5 rounded border-outline-variant text-primary focus:ring-primary"
            />
            <span className="text-body-md transition-colors group-hover:text-primary">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function Pagination() {
  return (
    <nav className="flex items-center justify-center gap-md py-lg" aria-label="Halaman">
      <button disabled aria-label="Sebelumnya" className="rounded-lg border border-outline-variant p-2 text-on-surface-variant disabled:opacity-40">
        <Icon name="chevron_left" />
      </button>
      <div className="flex gap-2">
        <button aria-current="page" className="h-10 w-10 rounded-lg bg-primary font-bold text-on-primary">1</button>
        {[2, 3].map((n) => (
          <button key={n} className="h-10 w-10 rounded-lg border border-outline-variant hover:bg-surface-container-low">{n}</button>
        ))}
      </div>
      <button aria-label="Berikutnya" className="rounded-lg border border-outline-variant p-2 hover:bg-surface-container-low">
        <Icon name="chevron_right" />
      </button>
    </nav>
  );
}
