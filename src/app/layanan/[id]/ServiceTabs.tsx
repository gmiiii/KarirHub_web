'use client';

import { useState } from 'react';
import { Icon } from '@/components/Icon';
import { StarRating } from '@/components/ui/StarRating';
import { AvatarInitial } from '@/components/Placeholder';
import type { Service } from '@/lib/data';

const tabs = ['Deskripsi', 'Apa yang Didapat', 'Ulasan'] as const;
type Tab = (typeof tabs)[number];

const deliverables = [
  'Revisi sesuai paket yang dipilih',
  'Komunikasi langsung via chat',
  'File hasil format profesional',
  'Garansi kepuasan atau revisi ulang',
];

const reviews = [
  { name: 'Ahmad Fauzi', text: 'Hasilnya rapi dan cepat, sangat membantu CV saya dilirik rekruter.' },
  { name: 'Citra Dewi', text: 'Komunikatif dan detail. Revisi ditanggapi dengan baik dan profesional.' },
];

export function ServiceTabs({ service }: { service: Service }) {
  const [active, setActive] = useState<Tab>('Deskripsi');

  return (
    <section className="rounded-xl border border-outline-variant bg-surface-container-lowest">
      <div role="tablist" aria-label="Detail jasa" className="flex gap-lg border-b border-outline-variant px-lg">
        {tabs.map((t) => {
          const selected = active === t;
          return (
            <button
              key={t}
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(t)}
              className={`relative -mb-px border-b-2 py-md text-label-md transition-colors ${
                selected
                  ? 'border-primary font-semibold text-primary'
                  : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      <div className="p-lg">
        {active === 'Deskripsi' && (
          <div className="space-y-md">
            <h3 className="text-title-lg text-on-surface">Optimalkan peluang karir Anda</h3>
            <p className="text-body-md leading-relaxed text-on-surface-variant">{service.description}</p>
            <p className="text-body-md leading-relaxed text-on-surface-variant">
              Banyak talenta berbakat gagal hanya karena profil mereka tidak menonjolkan pencapaian
              yang relevan. Saya membedah setiap poin pengalaman kerja Anda dengan metode STAR
              (Situation, Task, Action, Result) agar terlihat lebih berdampak.
            </p>
          </div>
        )}

        {active === 'Apa yang Didapat' && (
          <ul className="grid gap-sm sm:grid-cols-2">
            {deliverables.map((d) => (
              <li key={d} className="flex items-start gap-2 text-body-md text-on-surface-variant">
                <Icon name="check_circle" fill size={20} className="mt-0.5 flex-shrink-0 text-tertiary" /> {d}
              </li>
            ))}
          </ul>
        )}

        {active === 'Ulasan' && (
          <div className="space-y-md">
            <div className="flex items-center gap-md">
              <span className="text-display-lg font-bold leading-none tabular-nums text-on-surface">
                {service.rating.toLocaleString('id-ID', { minimumFractionDigits: 1 })}
              </span>
              <div>
                <StarRating value={service.rating} />
                <p className="text-caption text-on-surface-variant">{service.reviews} ulasan</p>
              </div>
            </div>
            <div className="space-y-md">
              {reviews.map((r) => (
                <div key={r.name} className="flex gap-md border-t border-outline-variant pt-md">
                  <AvatarInitial name={r.name} className="h-10 w-10 text-label-md" />
                  <div>
                    <p className="text-label-md font-semibold text-on-surface">{r.name}</p>
                    <StarRating value={5} size={14} />
                    <p className="mt-1 text-body-md text-on-surface-variant">{r.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
