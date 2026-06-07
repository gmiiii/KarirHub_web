import { SiteChrome } from '@/components/chrome/SiteChrome';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/ui/Button';
import { formatRupiah } from '@/lib/data';

export const metadata = { title: 'AI Foto CV - KarirHub' };

const guide = [
  'Pencahayaan yang baik dan merata',
  'Wajah menghadap lurus ke kamera',
  'Latar belakang polos atau tidak ramai',
  'Tanpa kacamata hitam atau topi',
];

const photoPlans = [
  {
    id: 'hd',
    name: 'Foto HD',
    desc: 'Satu foto profesional resolusi tinggi',
    price: 15000,
    was: null as number | null,
    badge: null as string | null,
  },
  {
    id: 'pro',
    name: 'Paket Profesional 5 Foto',
    desc: '5 gaya / latar berbeda',
    price: 30000,
    was: 75000,
    badge: 'Paling Hemat',
  },
];

export default function AiFotoCvPage() {
  return (
    <SiteChrome>
      <div className="mx-auto max-w-app px-lg py-xl">
        <header className="max-w-2xl">
          <h1 className="text-headline-lg text-on-surface">AI Foto CV</h1>
          <p className="mt-sm text-body-lg text-on-surface-variant">
            Ubah foto selfie Anda menjadi foto profil profesional dalam waktu kurang dari 2 menit
            menggunakan teknologi AI tercanggih.
          </p>
        </header>

        {/* Uploader + panduan */}
        <div className="mt-lg grid gap-md lg:grid-cols-[1fr_360px]">
          <div className="flex flex-col items-center justify-center gap-md rounded-xl border-2 border-dashed border-outline-variant bg-surface-container-low px-lg py-2xl text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-fixed text-primary">
              <Icon name="cloud_upload" size={32} />
            </span>
            <div>
              <p className="text-title-lg font-semibold text-on-surface">Tarik dan lepas foto Anda di sini</p>
              <p className="mt-1 text-caption text-on-surface-variant">Format yang didukung: JPG, PNG (Maks. 5MB)</p>
            </div>
            <Button icon="add_a_photo">Unggah Foto Selfie</Button>
          </div>

          <aside className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
            <h2 className="flex items-center gap-2 text-title-lg text-on-surface">
              <Icon name="verified" className="text-primary" /> Panduan Kualitas Foto
            </h2>
            <ul className="mt-md space-y-sm">
              {guide.map((g) => (
                <li key={g} className="flex items-start gap-2 text-body-md text-on-surface-variant">
                  <Icon name="check_circle" fill size={20} className="mt-0.5 flex-shrink-0 text-tertiary" /> {g}
                </li>
              ))}
            </ul>
            <p className="mt-md flex items-start gap-2 rounded-lg bg-primary-fixed/50 p-md text-caption text-on-surface-variant">
              <Icon name="info" size={16} className="mt-0.5 flex-shrink-0 text-primary" />
              AI kami bekerja paling baik dengan foto wajah yang jelas.
            </p>
          </aside>
        </div>

        {/* Pilih paket */}
        <section className="mt-2xl">
          <h2 className="text-headline-md text-on-surface">Pilih paket foto</h2>
          <div className="mt-lg grid gap-md sm:grid-cols-2">
            {photoPlans.map((p, i) => (
              <label
                key={p.id}
                className="relative flex cursor-pointer items-start justify-between gap-md rounded-xl border border-outline-variant bg-surface-container-lowest p-lg transition-colors hover:border-primary has-[:checked]:border-2 has-[:checked]:border-primary has-[:checked]:bg-primary-fixed/30"
              >
                {p.badge && (
                  <span className="absolute -top-3 right-lg rounded-full bg-tertiary px-md py-1 text-caption font-bold text-on-tertiary shadow-level-1">
                    {p.badge}
                  </span>
                )}
                <div>
                  <p className="text-title-lg font-bold text-on-surface">{p.name}</p>
                  <p className="mt-1 text-body-md text-on-surface-variant">{p.desc}</p>
                  <p className="mt-md flex items-baseline gap-2">
                    <span className="text-headline-md font-bold tabular-nums text-primary">{formatRupiah(p.price)}</span>
                    {p.was && (
                      <span className="text-body-md text-outline line-through tabular-nums">{formatRupiah(p.was)}</span>
                    )}
                  </p>
                </div>
                <span className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-full border-2 border-outline-variant text-on-primary has-[:checked]:border-primary has-[:checked]:bg-primary">
                  <input type="radio" name="paket-foto" defaultChecked={i === 1} className="peer sr-only" />
                  <Icon name="check" size={16} className="opacity-0 peer-checked:opacity-100" />
                </span>
              </label>
            ))}
          </div>

          <div className="mt-lg flex justify-center">
            <Button size="lg" icon="auto_awesome" className="px-2xl">Proses Foto AI</Button>
          </div>
        </section>
      </div>
    </SiteChrome>
  );
}
