import { clsx } from '@/lib/clsx';

interface IconProps {
  name: string;
  className?: string;
  fill?: boolean;
  /** ukuran px opsional; default mengikuti font-size induk */
  size?: number;
  ariaHidden?: boolean;
  label?: string;
}

/** Material Symbols Outlined. Dekoratif by default (aria-hidden). */
export function Icon({ name, className, fill, size, ariaHidden = true, label }: IconProps) {
  return (
    <span
      className={clsx('material-symbols-outlined leading-none', fill && 'fill', className)}
      style={size ? { fontSize: size } : undefined}
      aria-hidden={label ? undefined : ariaHidden}
      role={label ? 'img' : undefined}
      aria-label={label}
    >
      {name}
    </span>
  );
}
