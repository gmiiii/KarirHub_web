import { DashboardShell } from '@/components/chrome/DashboardShell';
import { PostJobForm } from './PostJobForm';

export const metadata = { title: 'Pasang Lowongan - KarirHub' };

export default function PostJobPage() {
  return (
    <DashboardShell role="rekruter" title="Pasang Lowongan" subtitle="Lengkapi detail di bawah untuk menayangkan lowongan baru.">
      <PostJobForm />
    </DashboardShell>
  );
}
