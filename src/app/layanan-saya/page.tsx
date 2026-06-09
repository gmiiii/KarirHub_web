import { DashboardShell } from '@/components/chrome/DashboardShell';
import { Icon } from '@/components/Icon';
import { ButtonLink } from '@/components/ui/Button';
import { ToastButton, ToggleButton } from '@/components/ui/ActionButtons';
import { Badge } from '@/components/ui/Badge';
import { Placeholder } from '@/components/Placeholder';
import { myServices, services, formatRupiah } from '@/lib/data';

export const metadata = { title: 'Layanan Saya - KarirHub' };

export default function MyServicesPage() {
  return (
    <DashboardShell
      role="seller"
      title="Layanan Saya"
      subtitle="Kelola, aktifkan, atau jeda layanan yang kamu tawarkan."
      action={<ToastButton icon="add" message="Form tambah layanan akan segera tersedia" tone="info">Tambah Layanan</ToastButton>}
    >
      <div className="space-y-md">
        {myServices.map((m) => {
          const thumb = services.find((s) => s.id === m.id)?.thumbColor ?? '#2563eb';
          return (
            <article key={m.id} className="flex flex-col gap-md rounded-xl border border-outline-variant bg-surface-container-lowest p-lg sm:flex-row sm:items-center">
              <Placeholder icon="brush" color={thumb} className="h-20 w-full flex-shrink-0 sm:h-16 sm:w-24" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-sm">
                  <h3 className="truncate text-label-md font-bold text-on-surface">{m.title}</h3>
                  <Badge tone={m.active ? 'verified' : 'neutral'}>{m.active ? 'Aktif' : 'Dijeda'}</Badge>
                </div>
                <div className="mt-1 flex flex-wrap gap-x-lg gap-y-1 text-caption text-on-surface-variant">
                  <span className="flex items-center gap-1"><Icon name="shopping_bag" size={14} /> {m.orders} pesanan</span>
                  <span className="flex items-center gap-1"><Icon name="visibility" size={14} /> {m.impressions} dilihat</span>
                  <span className="flex items-center gap-1"><Icon name="sell" size={14} /> Mulai {formatRupiah(m.price)}</span>
                </div>
              </div>
              <div className="flex items-center gap-sm">
                <ToastButton variant="secondary" size="sm" icon="edit" message={`Membuka editor untuk "${m.title}"`} tone="info">Edit</ToastButton>
                <ToggleButton
                  variant="ghost"
                  size="sm"
                  initialOn={m.active}
                  onState={{ label: 'Jeda', icon: 'pause', message: `"${m.title}" diaktifkan` }}
                  offState={{ label: 'Aktifkan', icon: 'play_arrow', message: `"${m.title}" dijeda` }}
                />
              </div>
            </article>
          );
        })}
      </div>

      {/* Empty-state hint untuk slot kosong */}
      <div className="mt-lg flex flex-col items-center justify-center gap-sm rounded-xl border-2 border-dashed border-outline-variant p-2xl text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-fixed text-primary">
          <Icon name="add" size={26} />
        </span>
        <p className="text-label-md font-semibold text-on-surface">Tawarkan layanan baru</p>
        <p className="max-w-sm text-caption text-on-surface-variant">
          Paket Pro memungkinkan layanan tak terbatas. Tambah jasa untuk menjangkau lebih banyak pembeli.
        </p>
        <ButtonLink href="/langganan" variant="secondary" size="sm" className="mt-sm">Lihat paket</ButtonLink>
      </div>
    </DashboardShell>
  );
}
