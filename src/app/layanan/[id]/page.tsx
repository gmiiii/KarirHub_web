import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SiteChrome } from '@/components/chrome/SiteChrome';
import { Icon } from '@/components/Icon';
import { ButtonLink, Button } from '@/components/ui/Button';
import { VerifiedBadge } from '@/components/ui/Badge';
import { StarRating } from '@/components/ui/StarRating';
import { Placeholder, AvatarInitial } from '@/components/Placeholder';
import { getService, services, formatRupiah } from '@/lib/data';
import { ServiceTabs } from './ServiceTabs';

export function generateStaticParams() {
  return services.map((s) => ({ id: s.id }));
}

const reasons = [
  { icon: 'workspace_premium', text: 'Top Rated Seller KarirHub' },
  { icon: 'groups', text: 'Membantu 500+ talenta' },
  { icon: 'bolt', text: 'Respon cepat (< 1 jam)' },
];

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const service = getService(params.id);
  if (!service) notFound();

  const featured = service.packages[1] ?? service.packages[0];

  return (
    <SiteChrome>
      <div className="mx-auto max-w-app px-lg py-lg">
        <nav className="mb-lg flex items-center gap-2 text-caption text-on-surface-variant" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-primary">Beranda</Link>
          <Icon name="chevron_right" size={14} />
          <Link href="/layanan" className="hover:text-primary">Layanan</Link>
          <Icon name="chevron_right" size={14} />
          <span className="text-on-surface">{service.category}</span>
        </nav>

        <div className="grid gap-xl lg:grid-cols-[1fr_360px]">
          <div className="space-y-lg">
            {/* Galeri */}
            <Placeholder icon="brush" color={service.thumbColor} label={service.title} className="aspect-[16/9] w-full" rounded="rounded-xl" />
            <div className="grid grid-cols-3 gap-md">
              {[service.thumbColor, '#1e293b', '#0f766e'].map((c, i) => (
                <Placeholder key={i} icon="image" color={c} className="aspect-[4/3] w-full" rounded="rounded-lg" label={`Pratinjau ${i + 1}`} />
              ))}
            </div>

            {/* Tabs */}
            <ServiceTabs service={service} />
          </div>

          {/* Sidebar penawaran */}
          <aside className="space-y-md">
            <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg lg:sticky lg:top-24">
              <h1 className="text-title-lg font-bold leading-snug text-on-surface">{service.title}</h1>
              <div className="mt-sm flex flex-wrap items-center gap-x-md gap-y-2">
                <span className="flex items-center gap-2">
                  <AvatarInitial name={service.seller} className="h-7 w-7 text-[11px]" color={service.thumbColor} />
                  <span className="text-label-md font-semibold text-primary">{service.seller}</span>
                </span>
                {service.verified && <VerifiedBadge label="" />}
                <StarRating value={service.rating} reviews={service.reviews} size={14} />
              </div>

              <div className="mt-lg flex items-center justify-between border-t border-outline-variant pt-md">
                <span className="text-body-md text-on-surface-variant">Harga layanan</span>
                <span className="text-title-lg font-bold tabular-nums text-primary">{formatRupiah(featured.price)}</span>
              </div>

              <dl className="mt-md space-y-sm rounded-lg bg-surface-container-low p-md text-label-md">
                <div className="flex items-center gap-2">
                  <Icon name="schedule" size={18} className="text-on-surface-variant" />
                  <dt className="text-on-surface-variant">Estimasi:</dt>
                  <dd className="font-semibold text-on-surface">{service.deliveryDays} hari kerja</dd>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="autorenew" size={18} className="text-on-surface-variant" />
                  <dt className="text-on-surface-variant">Revisi:</dt>
                  <dd className="font-semibold text-on-surface">Maks. 2 kali</dd>
                </div>
              </dl>

              <div className="mt-lg space-y-sm">
                <ButtonLink href="/checkout" fullWidth icon="shopping_cart">Pesan Sekarang</ButtonLink>
                <Button variant="secondary" fullWidth icon="chat">Hubungi {service.seller.split(' ')[0]}</Button>
              </div>
              <p className="mt-sm text-center text-caption text-on-surface-variant">
                Pembayaran aman dengan Jaminan KarirHub.
              </p>
            </div>

            {/* Mengapa memilih seller */}
            <div className="rounded-xl border border-outline-variant bg-surface-container-low p-lg">
              <h2 className="text-label-md font-bold text-on-surface">Mengapa memilih {service.seller.split(' ')[0]}?</h2>
              <ul className="mt-md space-y-sm">
                {reasons.map((r) => (
                  <li key={r.text} className="flex items-center gap-2 text-body-md text-on-surface-variant">
                    <Icon name={r.icon} size={20} className="text-primary" /> {r.text}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </SiteChrome>
  );
}
