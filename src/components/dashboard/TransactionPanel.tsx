import { Icon } from '@/components/Icon';
import { Badge } from '@/components/ui/Badge';
import { transactions, formatRupiah } from '@/lib/data';

const statusTone = { Berhasil: 'verified', Gagal: 'danger', Pending: 'warning' } as const;
const statusIcon = { Berhasil: 'check_circle', Gagal: 'cancel', Pending: 'schedule' } as const;

/**
 * Ringkasan + filter + daftar transaksi. Presentational, tanpa chrome,
 * supaya bisa dipakai di halaman publik maupun di dalam DashboardShell.
 * `valueLabel` menyesuaikan framing (mis. "Total masuk" untuk seller).
 */
export function TransactionPanel({ valueLabel = 'Total berhasil' }: { valueLabel?: string }) {
  const totalBerhasil = transactions
    .filter((t) => t.status === 'Berhasil')
    .reduce((a, t) => a + t.amount, 0);

  return (
    <>
      <div className="grid grid-cols-2 gap-md sm:grid-cols-3">
        <SummaryCard icon="account_balance_wallet" label={valueLabel} value={formatRupiah(totalBerhasil)} />
        <SummaryCard icon="receipt_long" label="Total transaksi" value={String(transactions.length)} />
        <SummaryCard icon="event" label="Bulan ini" value="4 transaksi" />
      </div>

      <div className="mt-lg flex items-center justify-between gap-md">
        <div className="flex gap-sm overflow-x-auto">
          {['Semua', 'Berhasil', 'Gagal'].map((t, i) => (
            <button
              key={t}
              className={`whitespace-nowrap rounded-full px-md py-1.5 text-label-md transition-colors ${
                i === 0
                  ? 'bg-primary text-on-primary'
                  : 'border border-outline-variant text-on-surface-variant hover:border-primary'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-1 text-label-md text-primary hover:underline">
          <Icon name="download" size={18} /> Unduh
        </button>
      </div>

      <ul className="mt-md divide-y divide-outline-variant rounded-xl border border-outline-variant bg-surface-container-lowest">
        {transactions.map((t) => (
          <li key={t.id} className="flex items-center gap-md p-lg">
            <span
              className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full ${
                t.status === 'Berhasil'
                  ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                  : t.status === 'Gagal'
                    ? 'bg-error-container text-on-error-container'
                    : 'bg-surface-container-highest text-on-surface-variant'
              }`}
            >
              <Icon name={statusIcon[t.status as keyof typeof statusIcon]} fill />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-label-md font-semibold text-on-surface">{t.item}</p>
              <p className="text-caption text-on-surface-variant">
                {t.id} · {t.date} · {t.method}
              </p>
            </div>
            <div className="text-right">
              <p className="text-label-md font-bold tabular-nums text-on-surface">{formatRupiah(t.amount)}</p>
              <Badge tone={statusTone[t.status as keyof typeof statusTone]}>{t.status}</Badge>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

function SummaryCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-md">
      <Icon name={icon} className="text-primary" />
      <p className="mt-1 text-label-md font-bold tabular-nums text-on-surface">{value}</p>
      <p className="text-caption text-on-surface-variant">{label}</p>
    </div>
  );
}
