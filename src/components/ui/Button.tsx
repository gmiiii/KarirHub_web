import Link from 'next/link';
import { clsx } from '@/lib/clsx';
import { Icon } from '../Icon';

type Variant = 'primary' | 'secondary' | 'ghost' | 'tonal' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-[transform,box-shadow,background-color,color,filter] duration-200 ease-out-quint active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap';

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-on-primary hover:shadow-level-2',
  secondary: 'bg-surface-container-highest text-primary hover:bg-primary hover:text-on-primary',
  tonal: 'bg-primary-container text-on-primary hover:brightness-110',
  ghost: 'text-primary hover:bg-surface-container-low',
  danger: 'bg-error text-on-error hover:brightness-110',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-md text-label-md',
  md: 'h-11 px-lg text-label-md', // ≥44px touch target
  lg: 'h-12 px-xl text-title-lg',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  icon?: string;
  iconFill?: boolean;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconFill,
  fullWidth,
  className,
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={clsx(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
      {...rest}
    >
      {icon && <Icon name={icon} fill={iconFill} size={20} />}
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  icon,
  iconFill,
  fullWidth,
  className,
  href,
  children,
}: CommonProps & { href: string }) {
  return (
    <Link
      href={href}
      className={clsx(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
    >
      {icon && <Icon name={icon} fill={iconFill} size={20} />}
      {children}
    </Link>
  );
}
