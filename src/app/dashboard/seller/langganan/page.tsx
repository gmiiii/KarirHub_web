import { DashboardShell } from '@/components/chrome/DashboardShell';
import { PlanGrid } from '@/components/dashboard/PlanGrid';
import { sellerPlans } from '@/lib/data';

export const metadata = { title: 'Langganan — Dashboard Seller — KarirHub' };

export default function SellerLanggananPage() {
  return (
    <DashboardShell
      role="seller"
      title="Langganan"
      subtitle="Pilih paket untuk membuka lebih banyak slot layanan dan prioritas pencarian."
    >
      <PlanGrid plans={sellerPlans} />
    </DashboardShell>
  );
}
