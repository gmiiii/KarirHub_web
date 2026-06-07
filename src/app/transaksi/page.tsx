import { SiteChrome } from '@/components/chrome/SiteChrome';
import { TransactionPanel } from '@/components/dashboard/TransactionPanel';

export const metadata = { title: 'Riwayat Transaksi - KarirHub' };

export default function TransactionsPage() {
  return (
    <SiteChrome>
      <div className="mx-auto max-w-3xl px-lg py-xl">
        <h1 className="text-headline-md text-on-surface">Riwayat Transaksi</h1>
        <p className="mt-1 text-body-md text-on-surface-variant">
          Semua pembayaran dan langgananmu di KarirHub.
        </p>
        <div className="mt-lg">
          <TransactionPanel />
        </div>
      </div>
    </SiteChrome>
  );
}
