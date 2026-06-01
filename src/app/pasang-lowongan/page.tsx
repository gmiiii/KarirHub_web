import { DashboardShell } from '@/components/chrome/DashboardShell';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/ui/Button';
import { jobTypes, experiences } from '@/lib/data';

export const metadata = { title: 'Pasang Lowongan — KarirHub' };

export default function PostJobPage() {
  return (
    <DashboardShell role="rekruter" title="Pasang Lowongan" subtitle="Lengkapi detail di bawah untuk menayangkan lowongan baru.">
      <form className="grid gap-lg lg:grid-cols-[1fr_300px]">
        <div className="space-y-lg">
          <Card title="Informasi dasar">
            <Field label="Judul posisi" placeholder="mis. Senior UI/UX Designer" required />
            <div className="grid gap-md sm:grid-cols-2">
              <Field label="Nama perusahaan" placeholder="PT. Contoh Indonesia" required />
              <Field label="Lokasi" placeholder="Kota atau Remote" required />
            </div>
            <div className="grid gap-md sm:grid-cols-2">
              <SelectField label="Tipe pekerjaan" options={jobTypes} />
              <SelectField label="Pengalaman" options={experiences} />
            </div>
            <div className="grid gap-md sm:grid-cols-2">
              <Field label="Gaji minimum" type="number" placeholder="8000000" prefix="Rp" />
              <Field label="Gaji maksimum" type="number" placeholder="15000000" prefix="Rp" />
            </div>
          </Card>

          <Card title="Deskripsi & kualifikasi">
            <TextareaField label="Deskripsi pekerjaan" placeholder="Jelaskan peran, tim, dan tujuan posisi ini." rows={5} required />
            <TextareaField label="Tanggung jawab" placeholder="Tulis satu poin per baris." rows={4} />
            <TextareaField label="Kualifikasi" placeholder="Tulis satu poin per baris." rows={4} />
            <Field label="Keahlian (pisahkan dengan koma)" placeholder="Figma, Design System, Prototyping" />
          </Card>
        </div>

        <aside className="space-y-md">
          <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg lg:sticky lg:top-24">
            <h3 className="mb-md text-title-lg text-on-surface">Penayangan</h3>
            <label className="flex cursor-pointer items-center justify-between rounded-lg border border-outline-variant p-md has-[:checked]:border-primary has-[:checked]:bg-primary-fixed/40">
              <span>
                <span className="block text-label-md font-semibold text-on-surface">Sorot lowongan</span>
                <span className="block text-caption text-on-surface-variant">Tampil di urutan teratas selama 7 hari.</span>
              </span>
              <input type="checkbox" className="h-5 w-5 rounded text-primary focus:ring-primary" />
            </label>
            <div className="mt-md rounded-lg bg-surface-container-low p-md">
              <p className="flex items-center gap-2 text-caption text-on-surface-variant">
                <Icon name="info" size={16} className="text-primary" /> Lowongan ditinjau maksimal 1×24 jam sebelum tayang.
              </p>
            </div>
            <div className="mt-lg space-y-sm">
              <Button type="submit" fullWidth icon="publish">Tayangkan Lowongan</Button>
              <Button type="button" variant="ghost" fullWidth icon="visibility">Pratinjau</Button>
              <Button type="button" variant="secondary" fullWidth icon="save">Simpan Draf</Button>
            </div>
          </div>
        </aside>
      </form>
    </DashboardShell>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-md rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
      <h3 className="text-title-lg text-on-surface">{title}</h3>
      {children}
    </section>
  );
}

const inputCls =
  'w-full rounded-lg border border-outline-variant bg-surface px-md py-2.5 text-body-md outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30';

function Label({ label, required }: { label: string; required?: boolean }) {
  return (
    <span className="mb-1 block text-label-md font-medium text-on-surface">
      {label} {required && <span className="text-error">*</span>}
    </span>
  );
}

function Field({ label, type = 'text', placeholder, required, prefix }: { label: string; type?: string; placeholder?: string; required?: boolean; prefix?: string }) {
  return (
    <label className="block">
      <Label label={label} required={required} />
      <span className="flex items-center rounded-lg border border-outline-variant bg-surface focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30">
        {prefix && <span className="pl-md text-body-md text-on-surface-variant">{prefix}</span>}
        <input type={type} placeholder={placeholder} className="w-full bg-transparent px-md py-2.5 text-body-md outline-none" />
      </span>
    </label>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block">
      <Label label={label} />
      <select className={inputCls}>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function TextareaField({ label, placeholder, rows, required }: { label: string; placeholder?: string; rows?: number; required?: boolean }) {
  return (
    <label className="block">
      <Label label={label} required={required} />
      <textarea rows={rows} placeholder={placeholder} className={inputCls + ' resize-y'} />
    </label>
  );
}
