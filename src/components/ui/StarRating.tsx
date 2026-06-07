import { clsx } from '@/lib/clsx';
import { Icon } from '../Icon';

/** Rating bintang - amber terisi, abu kosong (DESIGN.md). */
export function StarRating({
  value,
  reviews,
  size = 16,
  className,
}: {
  value: number;
  reviews?: number;
  size?: number;
  className?: string;
}) {
  return (
    <span className={clsx('inline-flex items-center gap-1', className)}>
      <Icon name="star" fill size={size} className="text-warning" />
      <span className="text-label-md font-semibold text-on-surface tabular-nums">
        {value.toLocaleString('id-ID', { minimumFractionDigits: 1 })}
      </span>
      {reviews !== undefined && (
        <span className="text-caption text-on-surface-variant">({reviews.toLocaleString('id-ID')})</span>
      )}
    </span>
  );
}
