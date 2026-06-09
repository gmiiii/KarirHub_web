import { SiteChrome } from '@/components/chrome/SiteChrome';
import { services } from '@/lib/data';
import { ServiceMarketClient } from './ServiceMarketClient';

export const metadata = { title: 'Jasa Karir - KarirHub' };

export default function LayananPage({ searchParams }: { searchParams?: { kategori?: string; q?: string } }) {
  return (
    <SiteChrome>
      <ServiceMarketClient
        services={services}
        initialCategory={searchParams?.kategori}
        initialKeyword={searchParams?.q ?? ''}
      />
    </SiteChrome>
  );
}
