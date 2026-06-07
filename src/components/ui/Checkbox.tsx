import { clsx } from '@/lib/clsx';
import { Icon } from '../Icon';

// Checkbox custom (centang putih saat aktif), dipakai pada filter.
export function Checkbox({
  label,
  defaultChecked,
  className,
  ...rest
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={clsx('group flex cursor-pointer select-none items-center gap-sm', className)}>
      <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
        <input
          type="checkbox"
          defaultChecked={defaultChecked}
          className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-outline-variant bg-surface-container-lowest transition-colors checked:border-primary checked:bg-primary hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          {...rest}
        />
        <Icon
          name="check"
          size={14}
          className="pointer-events-none absolute font-bold text-on-primary opacity-0 transition-opacity peer-checked:opacity-100"
        />
      </span>
      <span className="text-body-md text-on-surface transition-colors group-hover:text-primary">
        {label}
      </span>
    </label>
  );
}
