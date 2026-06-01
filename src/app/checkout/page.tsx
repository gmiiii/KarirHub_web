import Link from 'next/link';
import { SiteChrome } from '@/components/chrome/SiteChrome';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/ui/Button';
import { Placeholder } from '@/components/Placeholder';
import { formatRupiah } from '@/lib/data';

export const metadata = { title: 'Pembayaran — KarirHub' };

const item = { title: 'Review CV profesional + optimasi ATS', seller: 'Dewi Lestari', pkg: 'Standar', price: 150000, color: '#2563eb' };
const fee = 2500;
const tax = Math.round(item.price * 0.11);
const total = item.price + fee + tax;

const methods = [
  { id: 'gopay', label: 'GoPay', icon: 'account_balance_wallet' },
  { id: 'ovo', label: 'OVO', icon: 'account_balance_wallet' },
  { id: 'va', label: 'BCA Virtual Account', icon: 'account_balance' },
  { id: 'cc', label: 'Kartu Kredit / Debit', icon: 'credit_card' },
];

export default function CheckoutPage() {
  return (
    <SiteChrome>
      <div className="mx-auto max-w-app px-lg py-lg">
        <nav className="mb-lg flex items-center gap-2 text-caption text-on-surface-variant" aria-label="Breadcrumb">
          <Link href="/layanan" className="hover:text-primary">Layanan</Link>
          <Icon name="chevron_right" size={14} />
          <span className="text-on-surface">Pembayaran</span>
        </nav>

        {/* Stepper */}
        <ol className="mb-xl flex items-center gap-2 text-label-md">
          {['Pesanan', 'Pembayaran', 'Selesai'].map((s, i) => (
            <li key={s} className="flex items-center gap-2">
              <span className={`flex h-7 w-7 items-center justify-center rounded-full font-bold ${i <= 1 ? 'bg-primary text-on-primary' : 'bg-surface-container-highest text-on-surface-variant'}`}>
                {i < 1 ? <Icon name="check" size={16} /> : i + 1}
              </span>
              <span className={i <= 1 ? 'font-semibold text-on-surface' : 'text-on-surface-variant'}>{s}</span>
              {i < 2 && <span className="mx-1 h-px w-8 bg-outline-variant" />}
            </li>
          ))}
        </ol>

        <div className="grid gap-xl lg:grid-cols-[1fr_360px]">
          <div className="space-y-lg">
            {/* Kontak */}
            <section className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
              <h2 className="mb-md text-title-lg text-on-surface">Detail kontak</h2>
              <div className="grid gap-md sm:grid-cols-2">
                <Field label="Nama lengkap" placeholder="Nama kamu" required />
                <Field label="Email" type="email" placeholder="nama@email.com" required />
                <Field label="Nomor WhatsApp" type="tel" placeholder="08xxxxxxxxxx" required className="sm:col-span-2" />
              </div>
            </section>

            {/* Metode pembayaran */}
            <section className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
              <h2 className="mb-md text-title-lg text-on-surface">Metode pembayaran</h2>
              <div className="grid gap-sm sm:grid-cols-2">
                {methods.map((m, i) => (
                  <label key={m.id} className="flex cursor-pointer items-center gap-md rounded-lg border border-outline-variant p-md transition-colors hover:border-primary has-[:checked]:border-primary has-[:checked]:bg-primary-fixed/40">
                    <input type="radio" name="metode" defaultChecked={i === 0} className="text-primary focus:ring-primary" />
                    <Icon name={m.icon} className="text-primary" />
                    <span className="text-label-md font-medium text-on-surface">{m.label}</span>
                  </label>
                ))}
              </div>
            </section>
          </div>

          {/* Ringkasan */}
          <aside>
            <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg lg:sticky lg:top-24">
              <h2 className="mb-md text-title-lg text-on-surface">Ringkasan pesanan</h2>
              <div className="flex gap-md border-b border-outline-variant pb-md">
                <Placeholder icon="brush" color={item.color} className="h-14 w-14 flex-shrink-0" />
                <div>
                  <p className="text-label-md font-semibold text-on-surface">{item.title}</p>
                  <p className="text-caption text-on-surface-variant">{item.seller} · Paket {item.pkg}</p>
                </div>
              </div>
              <dl className="space-y-sm py-md text-body-md">
                <Row label="Harga jasa" value={formatRupiah(item.price)} />
                <Row label="Biaya layanan" value={formatRupiah(fee)} />
                <Row label="PPN 11%" value={formatRupiah(tax)} />
              </dl>
              <div className="flex items-center justify-between border-t border-outline-variant pt-md">
                <span className="text-label-md font-semibold text-on-surface">Total</span>
                <span className="text-title-lg font-bold tabular-nums text-primary">{formatRupiah(total)}</span>
              </div>
              <Button fullWidth size="lg" icon="lock" className="mt-lg">Bayar Sekarang</Button>
              <p className="mt-sm flex items-center justify-center gap-1 text-caption text-on-surface-variant">
                <Icon name="verified_user" size={14} className="text-tertiary" /> Pembayaran aman & terenkripsi
              </p>
            </div>
          </aside>
        </div>
      </div>
    </SiteChrome>
  );
}

function Field({
  label,
  type = 'text',
  placeholder,
  required,
  className,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={`block ${className ?? ''}`}>
      <span className="mb-1 block text-label-md font-medium text-on-surface">
        {label} {required && <span className="text-error">*</span>}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border border-outline-variant bg-surface px-md py-2.5 text-body-md outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
      />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-on-surface-variant">{label}</dt>
      <dd className="tabular-nums text-on-surface">{value}</dd>
    </div>
  );
}
