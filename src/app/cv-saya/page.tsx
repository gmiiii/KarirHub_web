import { SiteChrome } from '@/components/chrome/SiteChrome';
import { ButtonLink } from '@/components/ui/Button';
import { CvDocument } from '@/components/cv/CvDocument';
import { PrintCvButton } from '@/components/cv/PrintCvButton';
import { cvData } from '@/lib/data';

export const metadata = { title: 'CV Saya - KarirHub' };

export default function CvSayaPage() {
  return (
    <SiteChrome>
      <section className="bg-surface-container-low py-xl">
        <div className="mx-auto flex max-w-app flex-col gap-md px-lg sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-headline-md text-on-surface">CV Saya</h1>
            <p className="mt-1 text-body-md text-on-surface-variant">
              Dokumen CV yang disusun otomatis dari profilmu. Cetak atau unduh sebagai Word.
            </p>
          </div>
          <div className="flex gap-sm">
            <ButtonLink href="/profil" variant="secondary" icon="arrow_back">
              Ke Profil
            </ButtonLink>
            <PrintCvButton />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-app px-lg py-xl">
        <CvDocument cv={cvData} />
      </div>
    </SiteChrome>
  );
}
