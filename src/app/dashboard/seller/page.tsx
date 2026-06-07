import { DashboardShell, StatCard } from '@/components/chrome/DashboardShell';
import { Icon } from '@/components/Icon';
import { ButtonLink } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { sellerStats, incomingOrders, formatRupiah } from '@/lib/data';

export const metadata = { title: 'Dashboard Seller - KarirHub' };

const orderTone = { Menunggu: 'warning', Dikerjakan: 'info', Selesai: 'verified' } as const;

// Data mini grafik pendapatan 7 hari (statis)
const revenue = [40, 65, 50, 80, 72, 95, 88];

export default function SellerDashboard() {
  const max = Math.max(...revenue);
  return (
    <DashboardShell
      role="seller"
      title="Dashboard Seller"
      subtitle="Kelola layanan, pesanan, dan penghasilanmu."
      action={<ButtonLink href="/layanan-saya" icon="add">Tambah Layanan</ButtonLink>}
    >
      <div className="grid grid-cols-2 gap-md lg:grid-cols-4">
        {sellerStats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <section className="mt-xl grid gap-md lg:grid-cols-[1.4fr_1fr]">
        {/* Grafik pendapatan */}
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
          <div className="mb-lg flex items-center justify-between">
            <h3 className="text-title-lg text-on-surface">Pendapatan 7 hari</h3>
            <Badge tone="verified" icon="trending_up">+24%</Badge>
          </div>
          <div className="flex h-40 items-end justify-between gap-sm" role="img" aria-label="Grafik batang pendapatan tujuh hari terakhir">
            {revenue.map((v, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-md bg-primary transition-all hover:bg-primary-container"
                  style={{ height: `${(v / max) * 100}%` }}
                />
                <span className="text-caption text-on-surface-variant">{['Sn', 'Sl', 'Rb', 'Km', 'Jm', 'Sb', 'Mg'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ringkasan cepat */}
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
          <h3 className="mb-md text-title-lg text-on-surface">Perlu perhatian</h3>
          <ul className="space-y-md">
            {[
              { icon: 'pending_actions', text: '2 pesanan mendekati tenggat hari ini.', tone: 'text-error' },
              { icon: 'rate_review', text: '5 ulasan baru menunggu balasan.', tone: 'text-primary' },
              { icon: 'workspace_premium', text: 'Upgrade ke Pro untuk komisi lebih rendah.', tone: 'text-tertiary' },
            ].map((s) => (
              <li key={s.text} className="flex items-start gap-md">
                <Icon name={s.icon} className={`mt-0.5 ${s.tone}`} />
                <span className="text-body-md text-on-surface-variant">{s.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-xl rounded-xl border border-outline-variant bg-surface-container-lowest">
        <div className="flex items-center justify-between border-b border-outline-variant p-lg">
          <h3 className="text-title-lg text-on-surface">Pesanan masuk</h3>
          <ButtonLink href="/pesanan" variant="ghost" size="sm">Kelola semua</ButtonLink>
        </div>
        <ul className="divide-y divide-outline-variant">
          {incomingOrders.map((o) => (
            <li key={o.id} className="flex flex-col gap-sm p-lg sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-label-md font-semibold text-on-surface">{o.service} <span className="text-on-surface-variant">· {o.pkg}</span></p>
                <p className="text-caption text-on-surface-variant">{o.id} · {o.buyer} · Tenggat {o.due}</p>
              </div>
              <div className="flex items-center gap-md">
                <span className="text-label-md font-bold tabular-nums text-on-surface">{formatRupiah(o.price)}</span>
                <Badge tone={orderTone[o.status as keyof typeof orderTone]}>{o.status}</Badge>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </DashboardShell>
  );
}
