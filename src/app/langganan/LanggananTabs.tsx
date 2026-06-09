'use client';

import { useState } from 'react';
import { clsx } from '@/lib/clsx';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/ui/Button';
import { Placeholder } from '@/components/Placeholder';
import { PlanGrid } from '@/components/dashboard/PlanGrid';
import {
  cvCreditPlans,
  cvCreditTopups,
  sellerPlans,
  formatRupiah,
} from '@/lib/data';

type Tab = 'kredit' | 'seller';

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'kredit', label: 'Kredit CV', icon: 'auto_awesome' },
  { id: 'seller', label: 'Seller', icon: 'storefront' },
];

export function LanggananTabs() {
  const [tab, setTab] = useState<Tab>('kredit');

  return (
    <div className="mx-auto max-w-app px-lg py-2xl">
      {/* Pemilih segmen */}
      <div
        role="tablist"
        className="mb-xl inline-flex gap-1 rounded-full border border-outline-variant bg-surface-container p-1"
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={clsx(
              'flex items-center gap-2 rounded-full px-lg py-2 text-label-md font-medium transition-[background-color,color,box-shadow] duration-200 ease-out-quint',
              tab === t.id
                ? 'bg-surface-container-lowest text-primary shadow-level-1'
                : 'text-on-surface-variant hover:text-on-surface',
            )}
          >
            <Icon name={t.icon} size={18} /> {t.label}
          </button>
        ))}
      </div>

      {tab === 'kredit' ? <KreditPanel /> : <SellerPanel />}
    </div>
  );
}

function KreditPanel() {
  return (
    <div>
      <div className="max-w-2xl">
        <h1 className="text-headline-lg text-on-surface">Kredit pembuatan CV</h1>
        <p className="mt-sm text-body-lg text-on-surface-variant">
          1 kredit = 1x membuat CV dengan AI (pasfoto formal + ringkasan otomatis). Pilih paket
          bulanan untuk kuota rutin, atau beli kredit satuan sesuai kebutuhan.
        </p>
      </div>

      <div className="mt-xl">
        <PlanGrid plans={cvCreditPlans} />
      </div>

      {/* Top-up satuan */}
      <div className="mt-2xl">
        <h2 className="text-headline-md text-on-surface">Beli kredit satuan</h2>
        <p className="mt-1 text-body-md text-on-surface-variant">
          Tanpa langganan. Cocok untuk pemakaian sesekali.
        </p>
        <div className="mt-lg grid gap-md sm:grid-cols-3">
          {cvCreditTopups.map((t) => (
            <div
              key={t.credits}
              className="relative flex flex-col items-start rounded-xl border border-outline-variant bg-surface-container-lowest p-lg"
            >
              {t.note && (
                <span className="absolute right-lg top-lg rounded-full bg-tertiary px-sm py-0.5 text-caption font-bold text-on-tertiary">
                  {t.note}
                </span>
              )}
              <span className="flex items-center gap-2 text-title-lg font-bold text-on-surface">
                <Icon name="auto_awesome" size={20} className="text-primary" /> {t.credits} kredit
              </span>
              <p className="mt-sm text-headline-md font-bold tabular-nums text-primary">
                {formatRupiah(t.price)}
              </p>
              <p className="text-caption text-on-surface-variant">
                ~ {formatRupiah(Math.round(t.price / t.credits))} / kredit
              </p>
              <Button variant="secondary" fullWidth icon="shopping_cart" className="mt-lg">
                Beli
              </Button>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-xl flex items-start gap-2 rounded-lg bg-primary-fixed/50 p-md text-body-md text-on-surface-variant">
        <Icon name="info" size={18} className="mt-0.5 flex-shrink-0 text-primary" />
        Kredit dipakai otomatis saat kamu menekan "Generate" di fitur Buat CV dengan AI. Sisa kredit
        bisa kamu pantau di halaman tersebut.
      </p>
    </div>
  );
}

function SellerPanel() {
  return (
    <div>
      <div className="max-w-2xl">
        <h1 className="text-headline-lg text-on-surface">Tingkatkan jangkauan Anda</h1>
        <p className="mt-sm text-body-lg text-on-surface-variant">
          Dapatkan lebih banyak eksposur, slot layanan tambahan, dan prioritas pencarian untuk
          menjangkau klien impian Anda di KarirHub.
        </p>
      </div>

      <div className="mt-xl">
        <PlanGrid plans={sellerPlans} />
      </div>

      <div className="mt-2xl grid gap-md md:grid-cols-2">
        <div className="flex flex-col justify-center rounded-xl bg-primary-fixed/50 p-lg">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-on-primary">
            <Icon name="trending_up" />
          </span>
          <h3 className="mt-md text-title-lg font-bold text-on-surface">Mengapa berlangganan?</h3>
          <p className="mt-sm text-body-md text-on-surface-variant">
            Seller dengan paket Standard ke atas melihat peningkatan kunjungan profil hingga 400%
            dibanding paket gratis.
          </p>
        </div>
        <div className="relative overflow-hidden rounded-xl">
          <Placeholder
            icon="groups"
            color="#1e293b"
            className="h-full min-h-[200px] w-full"
            label="Komunitas seller KarirHub"
          />
          <p className="absolute bottom-lg left-lg text-title-lg font-bold text-white drop-shadow">
            Bergabunglah dengan 5.000+ seller sukses
          </p>
        </div>
      </div>
    </div>
  );
}
