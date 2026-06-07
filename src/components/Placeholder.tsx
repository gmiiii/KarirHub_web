import { clsx } from '@/lib/clsx';
import { Icon } from './Icon';

interface PlaceholderProps {
  className?: string;
  icon?: string;
  /** warna latar token, mis. surface-container-highest atau hex via style */
  color?: string;
  label?: string;
  rounded?: string;
}

/**
 * Placeholder gambar - SEMUA gambar di proyek ini memakai placeholder (belum ada aset).
 * Menampilkan blok berwarna + ikon, bukan gambar kosong, agar layout tetap jelas.
 */
export function Placeholder({
  className,
  icon = 'image',
  color,
  label,
  rounded = 'rounded-lg',
}: PlaceholderProps) {
  return (
    <div
      className={clsx(
        'flex items-center justify-center overflow-hidden bg-surface-container-highest text-on-surface-variant/70',
        rounded,
        className,
      )}
      style={color ? { backgroundColor: color, color: '#ffffff' } : undefined}
      role="img"
      aria-label={label ?? 'Placeholder gambar'}
    >
      <Icon name={icon} className="opacity-90" />
    </div>
  );
}

/** Avatar inisial untuk orang (placeholder foto profil). */
export function AvatarInitial({
  name,
  className,
  color,
}: {
  name: string;
  className?: string;
  color?: string;
}) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();
  return (
    <div
      className={clsx(
        'flex items-center justify-center rounded-full bg-primary-container text-on-primary font-semibold',
        className,
      )}
      style={color ? { backgroundColor: color } : undefined}
      role="img"
      aria-label={`Foto ${name}`}
    >
      {initials}
    </div>
  );
}
