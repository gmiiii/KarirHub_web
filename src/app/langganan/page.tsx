import { SiteChrome } from '@/components/chrome/SiteChrome';
import { Icon } from '@/components/Icon';
import { Placeholder } from '@/components/Placeholder';
import { PlanGrid } from '@/components/dashboard/PlanGrid';
import { sellerPlans } from '@/lib/data';

export const metadata = { title: 'Langganan Seller — KarirHub' };

export default function LanggananPage() {
  return (
    <SiteChrome>
      <div className="mx-auto max-w-app px-lg py-2xl">
        <div className="max-w-2xl">
          <h1 className="text-headline-lg text-on-surface">Tingkatkan jangkauan Anda</h1>
          <p className="mt-sm text-body-lg text-on-surface-variant">
            Dapatkan lebih banyak eksposur, slot layanan tambahan, dan prioritas pencarian untuk
            menjangkau klien impian Anda di KarirHub.
          </p>
        </div>

        <div className="mt-xl">
          <PlanGrid plans={sellerPlans} />
        </div>

        <div className="mt-2xl grid gap-md md:grid-cols-2">
          <div className="flex flex-col justify-center rounded-xl bg-primary-fixed/50 p-lg">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-on-primary">
              <Icon name="trending_up" />
            </span>
            <h3 className="mt-md text-title-lg font-bold text-on-surface">Mengapa berlangganan?</h3>
            <p className="mt-sm text-body-md text-on-surface-variant">
              Seller dengan paket Standard ke atas melihat peningkatan kunjungan profil hingga 400%
              dibanding paket gratis.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-xl">
            <Placeholder
              icon="groups"
              color="#1e293b"
              className="h-full min-h-[200px] w-full"
              label="Komunitas seller KarirHub"
            />
            <p className="absolute bottom-lg left-lg text-title-lg font-bold text-white drop-shadow">
              Bergabunglah dengan 5.000+ seller sukses
            </p>
          </div>
        </div>
      </div>
    </SiteChrome>
  );
}
