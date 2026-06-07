import { DashboardShell } from '@/components/chrome/DashboardShell';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AvatarInitial } from '@/components/Placeholder';
import { incomingOrders, formatRupiah } from '@/lib/data';

export const metadata = { title: 'Pesanan Masuk - KarirHub' };

const orderTone = { Menunggu: 'warning', Dikerjakan: 'info', Selesai: 'verified' } as const;
const tabs = ['Semua', 'Menunggu', 'Dikerjakan', 'Selesai'];

export default function IncomingOrdersPage() {
  return (
    <DashboardShell role="seller" title="Pesanan Masuk" subtitle="Kelola pesanan dari pembeli dan jaga tenggat waktu.">
      {/* Tabs filter */}
      <div className="mb-lg flex gap-sm overflow-x-auto border-b border-outline-variant">
        {tabs.map((t, i) => (
          <button
            key={t}
            className={`whitespace-nowrap border-b-2 px-md pb-2 text-label-md transition-colors ${
              i === 0 ? 'border-primary font-semibold text-primary' : 'border-transparent text-on-surface-variant hover:text-primary'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-md">
        {incomingOrders.map((o) => (
          <article key={o.id} className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
            <div className="flex flex-col gap-md sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-md">
                <AvatarInitial name={o.buyer} className="h-11 w-11 text-label-md" />
                <div>
                  <p className="text-label-md font-bold text-on-surface">{o.service} <span className="font-normal text-on-surface-variant">· {o.pkg}</span></p>
                  <p className="text-caption text-on-surface-variant">{o.id} · {o.buyer}</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-md sm:flex-col sm:items-end">
                <span className="text-label-md font-bold tabular-nums text-on-surface">{formatRupiah(o.price)}</span>
                <Badge tone={orderTone[o.status as keyof typeof orderTone]}>{o.status}</Badge>
              </div>
            </div>
            <div className="mt-md flex flex-col gap-md border-t border-outline-variant pt-md sm:flex-row sm:items-center sm:justify-between">
              <span className={`flex items-center gap-1 text-caption ${o.due === 'Hari ini' ? 'font-semibold text-error' : 'text-on-surface-variant'}`}>
                <Icon name="schedule" size={16} /> Tenggat: {o.due}
              </span>
              <div className="flex gap-sm">
                <Button variant="ghost" size="sm" icon="chat">Chat</Button>
                {o.status === 'Selesai' ? (
                  <Button variant="secondary" size="sm" icon="download">Unduh hasil</Button>
                ) : (
                  <Button size="sm" icon="check">Tandai selesai</Button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </DashboardShell>
  );
}
