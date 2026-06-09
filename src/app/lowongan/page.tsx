import { SiteChrome } from '@/components/chrome/SiteChrome';
import { jobs } from '@/lib/data';
import { JobBoardClient } from './JobBoardClient';

export const metadata = { title: 'Lowongan Kerja - KarirHub' };

export default function JobBoardPage({ searchParams }: { searchParams?: { q?: string } }) {
  return (
    <SiteChrome>
      <JobBoardClient jobs={jobs} initialKeyword={searchParams?.q ?? ''} />
    </SiteChrome>
  );
}
