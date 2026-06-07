'use client';

import { useEffect, useRef, useState } from 'react';
import { clsx } from '@/lib/clsx';
import { Icon } from '../Icon';

type Variant = 'inline' | 'field';

const triggerBase =
  'flex items-center justify-between gap-2 rounded-lg border border-outline-variant transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30';

const triggerVariants: Record<Variant, string> = {
  // Kompak, untuk kontrol inline seperti "Urutkan:".
  inline: 'bg-surface-container-lowest px-3 py-1.5 text-label-md font-medium text-primary hover:border-primary/40',
  // Selebar input form, selaras dengan gaya field lain.
  field: 'w-full bg-surface px-md py-2.5 text-body-md text-on-surface focus-visible:border-primary',
};

// Dropdown pilih (pengganti <select> native), uncontrolled. Varian inline & field.
export function Select({
  options,
  defaultValue,
  onChange,
  ariaLabel,
  variant = 'inline',
  fullWidth,
  className,
}: {
  options: string[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  ariaLabel?: string;
  variant?: Variant;
  fullWidth?: boolean;
  className?: string;
}) {
  const [value, setValue] = useState(defaultValue ?? options[0]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const choose = (opt: string) => {
    setValue(opt);
    setOpen(false);
    onChange?.(opt);
  };

  return (
    <div ref={ref} className={clsx('relative', fullWidth ? 'w-full' : 'inline-block')}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        className={clsx(triggerBase, triggerVariants[variant], fullWidth && 'w-full', className)}
      >
        <span className="truncate">{value}</span>
        <Icon
          name="expand_more"
          size={18}
          className={clsx('shrink-0 text-on-surface-variant transition-transform', open && 'rotate-180')}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className={clsx(
            'absolute z-[var(--z-dropdown)] mt-2 max-h-64 overflow-auto rounded-lg border border-outline-variant bg-surface-container-lowest p-1 shadow-level-3',
            variant === 'field' ? 'left-0 right-0' : 'right-0 min-w-[11rem]',
          )}
        >
          {options.map((opt) => {
            const selected = opt === value;
            return (
              <li key={opt}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => choose(opt)}
                  className={clsx(
                    'flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-label-md transition-colors',
                    selected
                      ? 'bg-primary-fixed font-semibold text-primary'
                      : 'text-on-surface hover:bg-surface-container-low',
                  )}
                >
                  <span className="truncate">{opt}</span>
                  {selected && <Icon name="check" size={16} className="shrink-0 text-primary" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
