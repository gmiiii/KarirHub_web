import { SiteChrome } from '@/components/chrome/SiteChrome';
import { Icon } from '@/components/Icon';
import { ButtonLink } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <SiteChrome>
      <div className="mx-auto flex max-w-app flex-col items-center justify-center gap-md px-lg py-2xl text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-fixed text-primary">
          <Icon name="travel_explore" size={32} />
        </span>
        <h1 className="text-headline-lg text-on-surface">Halaman tidak ditemukan</h1>
        <p className="max-w-md text-body-md text-on-surface-variant">
          Maaf, halaman yang kamu cari tidak ada atau sudah dipindahkan.
        </p>
        <ButtonLink href="/" icon="home" className="mt-sm">Kembali ke beranda</ButtonLink>
      </div>
    </SiteChrome>
  );
}
