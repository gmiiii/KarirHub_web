import { SiteChrome } from '@/components/chrome/SiteChrome';
import { LanggananTabs } from './LanggananTabs';

export const metadata = { title: 'Langganan - KarirHub' };

export default function LanggananPage() {
  return (
    <SiteChrome>
      <LanggananTabs />
    </SiteChrome>
  );
}
