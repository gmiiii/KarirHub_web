import { clsx } from '@/lib/clsx';
import { Icon } from '../Icon';

type Tone = 'neutral' | 'verified' | 'type' | 'info' | 'warning' | 'danger';

const tones: Record<Tone, string> = {
  neutral: 'bg-surface-container-low text-on-surface-variant',
  verified: 'bg-tertiary-fixed text-on-tertiary-fixed',
  type: 'bg-secondary-fixed text-on-secondary-fixed',
  info: 'bg-primary-fixed text-on-primary-fixed',
  warning: 'bg-[#fff3d6] text-[#7a4f00]',
  danger: 'bg-error-container text-on-error-container',
};

export function Badge({
  children,
  tone = 'neutral',
  icon,
  iconFill,
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  icon?: string;
  iconFill?: boolean;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full px-sm py-1 text-caption font-medium',
        tones[tone],
        className,
      )}
    >
      {icon && <Icon name={icon} fill={iconFill} size={14} />}
      {children}
    </span>
  );
}

/** Badge "Verified" konsisten dengan centang hijau (DESIGN.md). */
export function VerifiedBadge({ label = 'Verified' }: { label?: string }) {
  return (
    <Badge tone="verified" icon="verified" iconFill>
      {label}
    </Badge>
  );
}
