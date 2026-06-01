import Link from 'next/link';
import { SiteChrome } from '@/components/chrome/SiteChrome';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/ui/Button';
import { Badge, VerifiedBadge } from '@/components/ui/Badge';
import { Placeholder, AvatarInitial } from '@/components/Placeholder';

export const metadata = { title: 'Profil Saya — KarirHub' };

const profile = {
  name: 'Rina Hapsari',
  headline: 'Senior Product Designer',
  location: 'Jakarta, Indonesia',
  about:
    'Product designer dengan 6 tahun pengalaman membangun produk digital yang berpusat pada pengguna. Fokus pada design system, riset, dan kolaborasi lintas tim.',
  skills: ['Figma', 'Design System', 'User Research', 'Prototyping', 'Desain Interaksi'],
};

const experience = [
  { role: 'Senior Product Designer', company: 'PT. Teknologi Masa Depan', period: '2022 — Sekarang' },
  { role: 'Product Designer', company: 'Global Creative Agency', period: '2019 — 2022' },
  { role: 'UI Designer', company: 'Startup Lokal', period: '2018 — 2019' },
];

export default function ProfilePage() {
  return (
    <SiteChrome>
      {/* Banner */}
      <Placeholder icon="image" color="#1d4ed8" rounded="rounded-none" className="h-40 w-full" label="Banner profil" />

      <div className="mx-auto max-w-app px-lg">
        {/* Hanya avatar yang menumpang banner; teks identitas tetap di surface putih
            agar kontras aman (nama hitam tidak pernah jatuh di atas biru). */}
        <AvatarInitial
          name={profile.name}
          className="-mt-12 h-24 w-24 border-4 border-surface text-headline-md shadow-level-2"
        />
        <div className="mt-md flex flex-col gap-lg md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-headline-md text-on-surface">{profile.name}</h1>
              <VerifiedBadge label="Terverifikasi" />
            </div>
            <p className="text-body-lg text-on-surface-variant">{profile.headline}</p>
            <p className="mt-1 flex items-center gap-1 text-caption text-on-surface-variant">
              <Icon name="location_on" size={14} /> {profile.location}
            </p>
          </div>
          <div className="flex gap-sm">
            <Button variant="secondary" icon="edit">Edit Profil</Button>
            <Button icon="share">Bagikan</Button>
          </div>
        </div>

        <div className="mt-xl grid gap-lg pb-2xl lg:grid-cols-[1fr_320px]">
          <div className="space-y-lg">
            <Section title="Tentang">
              <p className="text-body-md leading-relaxed text-on-surface-variant">{profile.about}</p>
            </Section>
            <Section title="Keahlian">
              <div className="flex flex-wrap gap-sm">
                {profile.skills.map((s) => (
                  <Badge key={s} tone="info">{s}</Badge>
                ))}
              </div>
            </Section>
            <Section title="Pengalaman">
              <ul className="space-y-md">
                {experience.map((e) => (
                  <li key={e.role} className="flex gap-md border-b border-outline-variant pb-md last:border-0 last:pb-0">
                    <Placeholder icon="apartment" className="h-11 w-11 flex-shrink-0" />
                    <div>
                      <p className="text-label-md font-semibold text-on-surface">{e.role}</p>
                      <p className="text-body-md text-on-surface-variant">{e.company}</p>
                      <p className="text-caption text-on-surface-variant">{e.period}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          <aside className="space-y-md">
            <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
              <h3 className="mb-md text-title-lg text-on-surface">Kelengkapan profil</h3>
              <div className="flex items-center gap-md">
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-surface-container-highest">
                  <span className="block h-full rounded-full bg-tertiary" style={{ width: '80%' }} />
                </span>
                <span className="text-label-md font-bold tabular-nums text-on-surface">80%</span>
              </div>
              <p className="mt-sm text-caption text-on-surface-variant">Lengkapi portofolio untuk mencapai 100%.</p>
            </div>
            <div className="rounded-xl border border-outline-variant bg-surface-container-low p-lg">
              <h3 className="mb-md text-label-md font-bold uppercase tracking-wider text-on-surface">Tingkatkan profil</h3>
              <ul className="space-y-sm text-body-md text-on-surface-variant">
                <li><Link href="/ai-foto-cv" className="flex items-center gap-2 hover:text-primary"><Icon name="photo_camera" size={18} /> Perbarui foto dengan AI</Link></li>
                <li><Link href="/layanan" className="flex items-center gap-2 hover:text-primary"><Icon name="description" size={18} /> Review CV profesional</Link></li>
                <li><Link href="/layanan" className="flex items-center gap-2 hover:text-primary"><Icon name="hub" size={18} /> Optimasi LinkedIn</Link></li>
              </ul>
            </div>
          </aside>
        </div>
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
