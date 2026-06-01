import { DashboardShell } from '@/components/chrome/DashboardShell';
import { PlanGrid } from '@/components/dashboard/PlanGrid';
import { recruiterPlans } from '@/lib/data';

export const metadata = { title: 'Paket Premium — Dashboard Rekruter — KarirHub' };

export default function RecruiterPaketPage() {
  return (
    <DashboardShell
      role="rekruter"
      title="Paket Premium Rekruter"
      subtitle="Buka akses penuh talent pool, lebih banyak slot lowongan, dan dukungan prioritas."
    >
      <PlanGrid plans={recruiterPlans} />
    </DashboardShell>
  );
}
