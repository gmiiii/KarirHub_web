import Link from 'next/link';
import { SiteChrome } from '@/components/chrome/SiteChrome';
import { Icon } from '@/components/Icon';
import { ButtonLink } from '@/components/ui/Button';
import { JobCard } from '@/components/cards/JobCard';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { AvatarInitial } from '@/components/Placeholder';
import { StarRating } from '@/components/ui/StarRating';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { jobs, services, serviceCategories } from '@/lib/data';

export default function HomePage() {
  return (
    <SiteChrome>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-container">
        <div className="mx-auto grid max-w-app gap-xl px-lg py-2xl md:grid-cols-2 md:items-center md:py-[88px]">
          <div className="space-y-lg animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full bg-on-primary/15 px-md py-1 text-label-md text-on-primary-container">
              <Icon name="trending_up" size={18} /> 12.000+ lowongan & jasa karir
            </span>
            <h1 className="text-balance text-[40px] font-bold leading-[1.1] tracking-tight text-on-primary-container md:text-display-lg">
              Selangkah menuju karir impianmu
            </h1>
            <p className="max-w-md text-body-lg text-on-primary-container/90">
              Cari lowongan kerja terverifikasi dan tingkatkan peluangmu lewat jasa karir
              profesional: review CV, AI foto formal, sampai latihan interview.
            </p>
            <form className="flex flex-col gap-2 rounded-xl bg-surface-container-lowest p-2 shadow-level-2 sm:flex-row">
              <label className="flex flex-1 items-center gap-2 px-md">
                <Icon name="search" className="text-outline" />
                <input
                  className="w-full border-0 bg-transparent py-3 text-body-md outline-none placeholder:text-on-surface-variant"
                  placeholder="Posisi, perusahaan, atau jasa"
                  aria-label="Kata kunci pencarian"
                />
              </label>
              <ButtonLink href="/lowongan" size="lg" icon="search">
                Cari
              </ButtonLink>
            </form>
            <p className="text-caption text-on-primary-container">
              Populer: UI/UX Designer, Data Analyst, Review CV, AI Foto CV
            </p>
          </div>
          <div className="hidden md:block">
            <HeroStats />
          </div>
        </div>
      </section>

      {/* Kategori jasa */}
      <section className="mx-auto max-w-app px-lg py-2xl">
        <ScrollReveal as="div" className="mb-lg flex items-end justify-between">
          <div>
            <h2 className="text-headline-md text-on-surface">Jasa karir populer</h2>
            <p className="mt-1 text-body-md text-on-surface-variant">
              Tingkatkan profil profesionalmu dengan bantuan ahli.
            </p>
          </div>
          <Link href="/layanan" className="hidden text-label-md font-semibold text-primary hover:underline sm:block">
            Lihat semua →
          </Link>
        </ScrollReveal>
        <ScrollReveal as="div" stagger className="grid grid-cols-2 gap-md md:grid-cols-3 lg:grid-cols-6">
          {serviceCategories.map((c) => (
            <Link
              key={c.id}
              href="/layanan"
              className="group flex flex-col items-center gap-sm rounded-xl border border-outline-variant bg-surface-container-lowest p-md text-center transition-[transform,border-color,box-shadow] duration-200 ease-out-quint hover:-translate-y-0.5 hover:border-primary hover:shadow-level-1"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-fixed text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary">
                <Icon name={c.icon} />
              </span>
              <span className="text-label-md font-medium text-on-surface">{c.label}</span>
            </Link>
          ))}
        </ScrollReveal>
      </section>

      {/* Lowongan terbaru */}
      <section className="bg-surface-container-low py-2xl">
        <div className="mx-auto max-w-app px-lg">
          <ScrollReveal as="div" className="mb-lg flex items-end justify-between">
            <h2 className="text-headline-md text-on-surface">Lowongan terbaru</h2>
            <Link href="/lowongan" className="text-label-md font-semibold text-primary hover:underline">
              Semua lowongan →
            </Link>
          </ScrollReveal>
          <ScrollReveal as="div" stagger className="grid gap-md md:grid-cols-2">
            {jobs.slice(0, 4).map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Jasa unggulan */}
      <section className="mx-auto max-w-app px-lg py-2xl">
        <ScrollReveal as="div" className="mb-lg flex items-end justify-between">
          <h2 className="text-headline-md text-on-surface">Jasa unggulan</h2>
          <Link href="/layanan" className="text-label-md font-semibold text-primary hover:underline">
            Jelajahi marketplace →
          </Link>
        </ScrollReveal>
        <ScrollReveal as="div" stagger className="grid grid-cols-2 gap-md md:grid-cols-4">
          {services.slice(0, 4).map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </ScrollReveal>
      </section>

      {/* CTA seller */}
      <section className="mx-auto max-w-app px-lg pb-2xl">
        <ScrollReveal as="div" className="flex flex-col items-center gap-lg rounded-xl bg-inverse-surface px-lg py-2xl text-center text-inverse-on-surface md:flex-row md:justify-between md:text-left">
          <div className="max-w-xl space-y-2">
            <h2 className="text-headline-md font-bold">Punya keahlian karir? Jadi seller.</h2>
            <p className="text-body-md text-inverse-on-surface/80">
              Tawarkan jasa review CV, coaching, atau desain portofolio ke ribuan pencari kerja
              dan dapatkan penghasilan tambahan.
            </p>
          </div>
          <ButtonLink href="/langganan" variant="tonal" size="lg" icon="storefront">
            Mulai berjualan
          </ButtonLink>
        </ScrollReveal>
      </section>
    </SiteChrome>
  );
}

function HeroStats() {
  // Bukan grid 4 kartu metrik identik (pola "hero-metric" yang dilarang).
  // Satu panel proof dengan hierarki bervariasi: satu angka dominan,
  // klaster avatar perusahaan terverifikasi, lalu baris rating + dampak.
  const companies = [
    { name: 'Tokopedia', color: '#16a34a' },
    { name: 'Gojek', color: '#0f766e' },
    { name: 'Bank Mandiri', color: '#1d4ed8' },
    { name: 'Telkom Indonesia', color: '#b91c1c' },
  ];
  return (
    <div className="animate-rise rounded-2xl bg-surface-container-lowest/95 p-lg shadow-level-2 [animation-delay:140ms]">
      <div className="flex items-center gap-md">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-fixed text-primary">
          <Icon name="work" size={26} fill />
        </span>
        <div>
          <p className="text-[40px] font-bold leading-none tracking-tight tabular-nums text-on-surface">
            12.480
          </p>
          <p className="text-label-md text-on-surface-variant">lowongan aktif hari ini</p>
        </div>
      </div>

      <div className="my-lg h-px bg-outline-variant" />

      <div className="flex items-center gap-md">
        <div className="flex -space-x-2">
          {companies.map((c) => (
            <AvatarInitial
              key={c.name}
              name={c.name}
              color={c.color}
              className="h-9 w-9 text-caption ring-2 ring-surface-container-lowest"
            />
          ))}
        </div>
        <p className="text-label-md text-on-surface">
          <span className="font-semibold">3.200+</span> perusahaan terverifikasi
        </p>
      </div>

      <div className="my-lg h-px bg-outline-variant" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <StarRating value={4.9} />
          <span className="text-label-md text-on-surface-variant">rating jasa</span>
        </div>
        <p className="text-label-md text-on-surface">
          <span className="font-semibold tabular-nums">48.000</span> terbantu
        </p>
      </div>
    </div>
  );
}
