import { DashboardShell } from '@/components/chrome/DashboardShell';
import { TalentGrid } from '@/components/dashboard/TalentGrid';

export const metadata = { title: 'Cari Talenta - Dashboard Rekruter - KarirHub' };

export default function RecruiterTalentaPage() {
  return (
    <DashboardShell
      role="rekruter"
      title="Cari Talenta"
      subtitle="Jelajahi talent pool terkurasi dan hubungi kandidat yang terbuka untuk peluang."
    >
      <TalentGrid />
    </DashboardShell>
  );
}
