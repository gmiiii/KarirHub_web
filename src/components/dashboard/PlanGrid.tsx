import { Icon } from '@/components/Icon';
import { Button } from '@/components/ui/Button';
import { formatRupiah, type SellerPlan } from '@/lib/data';

/** Grid kartu paket langganan — dipakai langganan seller & paket premium rekruter. */
export function PlanGrid({ plans }: { plans: SellerPlan[] }) {
  return (
    <div className="grid items-start gap-lg md:grid-cols-3">
      {plans.map((p) => (
        <div
          key={p.name}
          className={`relative flex flex-col rounded-xl bg-surface-container-lowest p-lg transition-shadow ${
            p.highlight
              ? 'border-2 border-primary shadow-level-2 md:-mt-2 md:pt-xl'
              : 'border border-outline-variant hover:shadow-level-1'
          }`}
        >
          {p.highlight && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-md py-1 text-caption font-bold uppercase tracking-wider text-on-primary shadow-level-1">
              Rekomendasi
            </span>
          )}
          <h2 className="text-title-lg font-bold text-on-surface">{p.name}</h2>
          <p className="mt-sm flex items-baseline gap-1">
            <span className="text-headline-lg font-bold tabular-nums text-on-surface">
              {formatRupiah(p.price)}
            </span>
            <span className="text-body-md text-on-surface-variant">/{p.period}</span>
          </p>

          <ul className="mt-lg flex-1 space-y-sm">
            {p.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-body-md text-on-surface">
                <Icon name="check_circle" fill size={20} className="text-tertiary" /> {f}
              </li>
            ))}
            {p.disabled.map((f) => (
              <li key={f} className="flex items-center gap-2 text-body-md text-on-surface-variant/70">
                <Icon name="block" size={20} className="text-outline" /> {f}
              </li>
            ))}
          </ul>

          <Button variant={p.highlight ? 'primary' : 'secondary'} fullWidth className="mt-lg">
            {p.cta}
          </Button>
        </div>
      ))}
    </div>
  );
}
