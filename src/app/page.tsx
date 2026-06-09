import Link from 'next/link';
import { SiteChrome } from '@/components/chrome/SiteChrome';
import { Icon } from '@/components/Icon';
import { ButtonLink } from '@/components/ui/Button';
import { JobCard } from '@/components/cards/JobCard';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { StarRating } from '@/components/ui/StarRating';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import CardSwap, { Card } from '@/components/motion/CardSwap';
import { jobs, services, serviceCategories, formatRupiah } from '@/lib/data';
import { HomeSearch } from './HomeSearch';

// Kartu showcase untuk hero (CardSwap): ambil 4 jasa + ikon kategorinya.
const heroCards = services.slice(0, 4).map((s) => ({
  id: s.id,
  title: s.title,
  category: s.category,
  rating: s.rating,
  reviews: s.reviews,
  priceFrom: s.priceFrom,
  icon: serviceCategories.find((c) => c.label === s.category)?.icon ?? 'work',
}));

export default function HomePage() {
  return (
    <SiteChrome>
      {/* Hero full-screen & sticky: konten di bawah menggeser menutupinya (slide-over). */}
      <section className="sticky top-0 z-0 flex min-h-dvh items-center overflow-hidden bg-primary-container py-24">
        <div className="mx-auto grid w-full max-w-app gap-xl px-lg md:grid-cols-2 md:items-stretch">
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
            <HomeSearch />
            <p className="text-caption text-on-primary-container">
              Populer: UI/UX Designer, Data Analyst, Review CV, Buat CV AI
            </p>

            {/* Strip bukti sosial */}
            <div className="flex flex-wrap gap-x-xl gap-y-md pt-md">
              {[
                { value: '12.480', label: 'lowongan aktif' },
                { value: '3.200+', label: 'perusahaan terverifikasi' },
                { value: '4,9', label: 'rating jasa' },
              ].map((s) => (
                <p key={s.label} className="leading-tight text-on-primary-container">
                  <span className="block text-title-lg font-bold tabular-nums">{s.value}</span>
                  <span className="block text-caption text-on-primary-container/80">{s.label}</span>
                </p>
              ))}
            </div>
          </div>
          {/* Showcase jasa (CardSwap); tinggi mengikuti kolom kiri via items-stretch */}
          <div className="relative hidden self-stretch lg:block">
            <CardSwap width={370} height={250} cardDistance={46} verticalDistance={105} delay={3200} skewAmount={5} pauseOnHover>
              {heroCards.map((c) => (
                <Card key={c.id}>
                  <Link href={`/layanan/${c.id}`} className="flex h-full flex-col justify-between p-lg">
                    <div className="flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-fixed text-primary">
                        <Icon name={c.icon} />
                      </span>
                      <span className="rounded-full bg-surface-container-high px-md py-1 text-caption font-medium text-on-surface-variant">
                        {c.category}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-title-lg font-semibold leading-snug text-on-surface">{c.title}</h3>
                      <div className="mt-md flex items-center justify-between border-t border-outline-variant pt-md">
                        <StarRating value={c.rating} reviews={c.reviews} />
                        <span className="text-label-md font-bold text-primary">mulai {formatRupiah(c.priceFrom)}</span>
                      </div>
                    </div>
                  </Link>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>
      </section>

      {/* Konten yang menggeser menutupi hero saat scroll (z-10 + bg solid) */}
      <div className="relative z-10 -mt-6 rounded-t-[2rem] bg-surface shadow-level-3 lg:-mt-10 lg:rounded-t-[2.5rem]">

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
              href={`/layanan?kategori=${c.id}`}
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

      {/* Fitur unggulan: Buat CV dengan AI */}
      <section className="mx-auto max-w-app px-lg pb-2xl">
        <ScrollReveal as="div" className="overflow-hidden rounded-2xl bg-primary-container">
          <div className="grid items-center gap-lg p-xl md:grid-cols-2 md:p-2xl">
            <div className="space-y-md">
              <span className="inline-flex items-center gap-2 rounded-full bg-on-primary/15 px-md py-1 text-label-md font-medium text-on-primary-container">
                <Icon name="auto_awesome" size={18} /> Didukung AI
              </span>
              <h2 className="text-headline-lg font-bold text-on-primary-container">
                Buat CV profesional dengan AI
              </h2>
              <p className="max-w-md text-body-lg text-on-primary-container/90">
                Unggah fotomu dan isi data diri singkat. AI mengubah fotomu jadi pasfoto formal
                dan menyusun ringkasan CV-mu otomatis dalam hitungan detik.
              </p>
              <ButtonLink href="/ai-foto-cv" size="lg" variant="tonal" icon="auto_awesome">
                Coba sekarang
              </ButtonLink>
            </div>
            <ul className="grid gap-sm">
              {[
                { icon: 'photo_camera', text: 'Foto formal dari swafoto, pilih beragam gaya' },
                { icon: 'edit_note', text: 'Ringkasan & data CV disusun otomatis' },
                { icon: 'description', text: 'Langsung tersimpan ke CV Saya' },
              ].map((f) => (
                <li
                  key={f.text}
                  className="flex items-center gap-md rounded-xl bg-surface-container-lowest/95 p-md"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-fixed text-primary">
                    <Icon name={f.icon} size={20} />
                  </span>
                  <span className="text-body-md font-medium text-on-surface">{f.text}</span>
                </li>
              ))}
            </ul>
          </div>
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
      </div>
    </SiteChrome>
  );
}
