import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SiteChrome } from '@/components/chrome/SiteChrome';
import { Icon } from '@/components/Icon';
import { ButtonLink } from '@/components/ui/Button';
import { ToggleButton } from '@/components/ui/ActionButtons';
import { Badge, VerifiedBadge } from '@/components/ui/Badge';
import { Placeholder } from '@/components/Placeholder';
import { JobCard } from '@/components/cards/JobCard';
import { getJob, jobs } from '@/lib/data';

export function generateStaticParams() {
  return jobs.map((j) => ({ id: j.id }));
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const job = getJob(params.id);
  if (!job) notFound();

  const related = jobs.filter((j) => j.id !== job.id).slice(0, 2);

  return (
    <SiteChrome>
      <div className="mx-auto max-w-app px-lg py-lg">
        {/* Breadcrumb */}
        <nav className="mb-lg flex items-center gap-2 text-caption text-on-surface-variant" aria-label="Breadcrumb">
          <Link href="/lowongan" className="hover:text-primary">Lowongan</Link>
          <Icon name="chevron_right" size={14} />
          <span className="text-on-surface">{job.title}</span>
        </nav>

        <div className="grid gap-xl lg:grid-cols-[1fr_320px]">
          {/* Konten utama */}
          <div className="space-y-lg">
            <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
              <div className="flex flex-col gap-lg sm:flex-row sm:items-start">
                <Placeholder icon="apartment" color={job.logoColor} label={`Logo ${job.company}`} className="h-20 w-20 flex-shrink-0" />
                <div className="flex-1 space-y-sm">
                  <h1 className="text-headline-md text-on-surface">{job.title}</h1>
                  <p className="text-body-lg text-on-surface-variant">{job.company}</p>
                  <div className="flex flex-wrap gap-sm">
                    <Badge tone="neutral" icon="location_on">{job.location}</Badge>
                    <Badge tone="type">{job.type}</Badge>
                    <Badge tone="neutral" icon="work_history">{job.experience}</Badge>
                    {job.verified && <VerifiedBadge label="Perusahaan terverifikasi" />}
                  </div>
                </div>
              </div>
              <dl className="mt-lg grid grid-cols-2 gap-md border-t border-outline-variant pt-lg sm:grid-cols-3">
                <Stat icon="payments" label="Estimasi gaji" value={job.salary} />
                <Stat icon="schedule" label="Tipe" value={job.type} />
                <Stat icon="public" label="Lokasi kerja" value={job.remote ? 'Remote / Hybrid' : 'On-site'} />
              </dl>
            </div>

            <Section title="Deskripsi pekerjaan">
              <p className="text-body-md leading-relaxed text-on-surface-variant">{job.description}</p>
            </Section>
            <Section title="Tanggung jawab">
              <BulletList items={job.responsibilities} icon="check_circle" />
            </Section>
            <Section title="Kualifikasi">
              <BulletList items={job.requirements} icon="task_alt" />
            </Section>
            <Section title="Keahlian">
              <div className="flex flex-wrap gap-sm">
                {job.tags.map((t) => (
                  <Badge key={t} tone="info">{t}</Badge>
                ))}
              </div>
            </Section>
          </div>

          {/* Sidebar lamar */}
          <aside className="space-y-md">
            <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg lg:sticky lg:top-24">
              <p className="text-caption text-on-surface-variant">Estimasi gaji</p>
              <p className="text-title-lg font-bold tabular-nums text-on-surface">{job.salary}</p>
              <p className="mt-1 text-caption text-outline">Diposting {job.postedAgo}</p>
              <div className="mt-lg space-y-sm">
                <ButtonLink href="/profil" fullWidth icon="send">Lamar Sekarang</ButtonLink>
                <ToggleButton
                  variant="secondary"
                  fullWidth
                  onState={{ label: 'Tersimpan', icon: 'bookmark', message: 'Lowongan disimpan' }}
                  offState={{ label: 'Simpan Lowongan', icon: 'bookmark_border', message: 'Lowongan dihapus dari simpanan' }}
                />
              </div>
              <p className="mt-md text-caption text-on-surface-variant">
                Tingkatkan peluang lolos dengan{' '}
                <Link href="/layanan" className="font-semibold text-primary hover:underline">review CV profesional</Link>.
              </p>
            </div>
          </aside>
        </div>

        {/* Lowongan serupa */}
        <section className="mt-2xl">
          <h2 className="mb-lg text-headline-md text-on-surface">Lowongan serupa</h2>
          <div className="grid gap-md md:grid-cols-2">
            {related.map((j) => (
              <JobCard key={j.id} job={j} />
            ))}
          </div>
        </section>
      </div>
    </SiteChrome>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
      <h2 className="mb-md text-title-lg text-on-surface">{title}</h2>
      {children}
    </section>
  );
}

function Stat({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div>
      <dt className="flex items-center gap-1 text-caption text-on-surface-variant">
        <Icon name={icon} size={16} /> {label}
      </dt>
      <dd className="mt-1 text-label-md font-semibold text-on-surface">{value}</dd>
    </div>
  );
}

function BulletList({ items, icon }: { items: string[]; icon: string }) {
  return (
    <ul className="space-y-sm">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-2 text-body-md text-on-surface-variant">
          <Icon name={icon} size={20} className="mt-0.5 flex-shrink-0 text-tertiary" fill />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
