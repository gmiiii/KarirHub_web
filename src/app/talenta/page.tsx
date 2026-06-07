import { SiteChrome } from '@/components/chrome/SiteChrome';
import { TalentGrid } from '@/components/dashboard/TalentGrid';

export const metadata = { title: 'Cari Talenta - KarirHub' };

export default function TalentPoolPage() {
  return (
    <SiteChrome>
      <section className="bg-primary-container px-lg py-xl">
        <div className="mx-auto max-w-app">
          <h1 className="text-headline-lg text-on-primary-container">Talent pool</h1>
          <p className="mt-2 max-w-xl text-body-md text-on-primary-container/90">
            Temukan kandidat terbaik untuk timmu. Hubungi langsung talenta yang terbuka untuk
            peluang baru.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-app px-lg py-xl">
        <TalentGrid />
      </div>
    </SiteChrome>
  );
}
