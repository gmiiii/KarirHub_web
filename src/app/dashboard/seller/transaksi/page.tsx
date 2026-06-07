import { DashboardShell } from '@/components/chrome/DashboardShell';
import { TransactionPanel } from '@/components/dashboard/TransactionPanel';

export const metadata = { title: 'Transaksi - Dashboard Seller - KarirHub' };

export default function SellerTransaksiPage() {
  return (
    <DashboardShell
      role="seller"
      title="Transaksi & Penghasilan"
      subtitle="Pantau pemasukan dari pesanan dan pembayaran langgananmu."
    >
      <TransactionPanel valueLabel="Total masuk" />
    </DashboardShell>
  );
}
