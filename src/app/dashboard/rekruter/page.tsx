import { DashboardShell, StatCard } from '@/components/chrome/DashboardShell';
import { Icon } from '@/components/Icon';
import { ButtonLink } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AvatarInitial } from '@/components/Placeholder';
import { recruiterStats, applicants } from '@/lib/data';

export const metadata = { title: 'Dashboard Rekruter — KarirHub' };

const statusTone = { Baru: 'info', Review: 'warning', Shortlist: 'verified' } as const;

export default function RecruiterDashboard() {
  return (
    <DashboardShell
      role="rekruter"
      title="Dashboard Rekruter"
      subtitle="Pantau lowongan dan pelamar dalam satu tempat."
      action={<ButtonLink href="/pasang-lowongan" icon="add">Pasang Lowongan</ButtonLink>}
    >
      <div className="grid grid-cols-2 gap-md lg:grid-cols-4">
        {recruiterStats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <section className="mt-xl rounded-xl border border-outline-variant bg-surface-container-lowest">
        <div className="flex items-center justify-between border-b border-outline-variant p-lg">
          <h3 className="text-title-lg text-on-surface">Pelamar terbaru</h3>
          <button className="text-label-md font-semibold text-primary hover:underline">Lihat semua</button>
        </div>
        {/* Tabel (desktop) */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant text-caption uppercase tracking-wider text-on-surface-variant">
                <th className="p-lg font-semibold">Kandidat</th>
                <th className="p-lg font-semibold">Posisi</th>
                <th className="p-lg font-semibold">Kecocokan</th>
                <th className="p-lg font-semibold">Tahap</th>
                <th className="p-lg font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((a) => (
                <tr key={a.name} className="border-b border-outline-variant last:border-0 hover:bg-surface-container-low">
                  <td className="p-lg">
                    <span className="flex items-center gap-md">
                      <AvatarInitial name={a.name} className="h-9 w-9 text-label-md" />
                      <span className="text-label-md font-semibold text-on-surface">{a.name}</span>
                    </span>
                  </td>
                  <td className="p-lg text-body-md text-on-surface-variant">{a.role}</td>
                  <td className="p-lg">
                    <span className="flex items-center gap-2">
                      <span className="h-1.5 w-20 overflow-hidden rounded-full bg-surface-container-highest">
                        <span className="block h-full rounded-full bg-tertiary" style={{ width: `${a.match}%` }} />
                      </span>
                      <span className="text-label-md font-semibold tabular-nums text-on-surface">{a.match}%</span>
                    </span>
                  </td>
                  <td className="p-lg text-body-md text-on-surface-variant">{a.stage}</td>
                  <td className="p-lg"><Badge tone={statusTone[a.status as keyof typeof statusTone]}>{a.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Kartu (mobile) */}
        <ul className="divide-y divide-outline-variant md:hidden">
          {applicants.map((a) => (
            <li key={a.name} className="flex items-center gap-md p-lg">
              <AvatarInitial name={a.name} className="h-10 w-10 text-label-md" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-label-md font-semibold text-on-surface">{a.name}</p>
                <p className="truncate text-caption text-on-surface-variant">{a.role} · {a.match}% cocok</p>
              </div>
              <Badge tone={statusTone[a.status as keyof typeof statusTone]}>{a.status}</Badge>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-xl grid gap-md md:grid-cols-2">
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
          <h3 className="mb-md text-title-lg text-on-surface">Lowongan aktif</h3>
          <ul className="space-y-md">
            {['Senior UI/UX Designer', 'Back-End Engineer (Go/Node)', 'Data Analyst'].map((t, i) => (
              <li key={t} className="flex items-center justify-between border-b border-outline-variant pb-md last:border-0 last:pb-0">
                <div>
                  <p className="text-label-md font-semibold text-on-surface">{t}</p>
                  <p className="text-caption text-on-surface-variant">{[420, 318, 510][i]} pelamar</p>
                </div>
                <Badge tone="verified">Aktif</Badge>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
          <h3 className="mb-md text-title-lg text-on-surface">Saran tindakan</h3>
          <ul className="space-y-md">
            {[
              { icon: 'fact_check', text: '64 pelamar menunggu direview.' },
              { icon: 'schedule', text: '2 lowongan akan kedaluwarsa minggu ini.' },
              { icon: 'workspace_premium', text: 'Tingkatkan ke paket Bisnis untuk slot lebih banyak.' },
            ].map((s) => (
              <li key={s.text} className="flex items-start gap-md">
                <Icon name={s.icon} className="mt-0.5 text-primary" />
                <span className="text-body-md text-on-surface-variant">{s.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </DashboardShell>
  );
}
