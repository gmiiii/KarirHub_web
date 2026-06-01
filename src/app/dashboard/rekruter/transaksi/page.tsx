import { DashboardShell } from '@/components/chrome/DashboardShell';
import { TransactionPanel } from '@/components/dashboard/TransactionPanel';

export const metadata = { title: 'Transaksi — Dashboard Rekruter — KarirHub' };

export default function RecruiterTransaksiPage() {
  return (
    <DashboardShell
      role="rekruter"
      title="Tagihan & Transaksi"
      subtitle="Riwayat pembayaran paket premium dan layanan rekrutmen."
    >
      <TransactionPanel valueLabel="Total dibayar" />
    </DashboardShell>
  );
}
