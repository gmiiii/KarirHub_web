import Link from 'next/link';
import type { Service } from '@/lib/data';
import { formatRupiah } from '@/lib/data';
import { Icon } from '../Icon';
import { VerifiedBadge } from '../ui/Badge';
import { StarRating } from '../ui/StarRating';
import { Placeholder, AvatarInitial } from '../Placeholder';

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/layanan/${service.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest transition-[transform,border-color,box-shadow] duration-200 ease-out-quint hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-level-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <div className="relative overflow-hidden">
        <Placeholder
          icon="brush"
          color={service.thumbColor}
          label={service.title}
          rounded="rounded-none"
          className="aspect-[16/10] w-full transition-transform duration-300 ease-out-quint group-hover:scale-[1.03]"
        />
        {service.verified && (
          <span className="absolute right-3 top-3">
            <VerifiedBadge label="Terverifikasi" />
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-sm p-md">
        <div className="flex items-center gap-2">
          <AvatarInitial name={service.seller} className="h-7 w-7 text-[11px]" color={service.thumbColor} />
          <span className="text-caption text-on-surface-variant">{service.seller}</span>
        </div>
        <h3 className="line-clamp-2 text-label-md font-semibold text-on-surface transition-colors group-hover:text-primary">
          {service.title}
        </h3>
        <StarRating value={service.rating} reviews={service.reviews} />
        <div className="mt-auto flex items-center justify-between border-t border-outline-variant pt-sm">
          <span className="flex items-center gap-1 text-caption text-on-surface-variant">
            <Icon name="schedule" size={14} /> {service.deliveryDays} hari
          </span>
          <span className="text-caption text-on-surface-variant">
            Mulai{' '}
            <span className="text-label-md font-bold text-on-surface tabular-nums">
              {formatRupiah(service.priceFrom)}
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
