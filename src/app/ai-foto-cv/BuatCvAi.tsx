'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { clsx } from '@/lib/clsx';
import { Icon } from '@/components/Icon';
import { Button, ButtonLink } from '@/components/ui/Button';
import { CvDocument } from '@/components/cv/CvDocument';
import { cvData, FREE_CV_CREDITS, CREDIT_PER_GENERATE, type CvData } from '@/lib/data';

const guide = [
  'Pencahayaan yang baik dan merata',
  'Wajah menghadap lurus ke kamera',
  'Latar belakang polos atau tidak ramai',
  'Tanpa kacamata hitam atau topi',
];

/** Gaya foto formal yang dihasilkan AI dari foto yang diunggah. */
const PHOTO_STYLES = [
  { id: 'formal', name: 'Formal Kantor' },
  { id: 'kasual', name: 'Bisnis Kasual' },
  { id: 'biru', name: 'Latar Biru' },
  { id: 'abu', name: 'Latar Abu' },
];

/** Ringkasan "Tentang" disusun otomatis dari data yang diisi pengguna. */
function generateAbout(headline: string, location: string, skills: string[]): string {
  const topSkills = skills.slice(0, 3).join(', ');
  const skillPhrase = topSkills ? ` dengan keahlian utama di ${topSkills}` : '';
  return `${headline} yang berbasis di ${location}. Berpengalaman menghasilkan kerja yang rapi dan terukur${skillPhrase}. Terbiasa berkolaborasi lintas tim untuk mencapai target bersama.`;
}

export function BuatCvAi() {
  const fileRef = useRef<HTMLInputElement>(null);

  // Foto yang diunggah (boleh informal) dipakai sebagai masukan; AI menghasilkan
  // pasfoto formal sesuai gaya yang dipilih. Hasil formal disimulasikan dengan foto contoh.
  const [inputPhoto, setInputPhoto] = useState<string | null>(null);
  const [style, setStyle] = useState('formal');

  // Form diisi awal dengan data contoh agar pratinjau langsung lengkap saat dicoba.
  const [name, setName] = useState(cvData.name);
  const [headline, setHeadline] = useState(cvData.headline);
  const [location, setLocation] = useState(cvData.location);
  const [email, setEmail] = useState(cvData.contact.email);
  const [phone, setPhone] = useState(cvData.contact.phone);
  const [linkedin, setLinkedin] = useState(cvData.contact.linkedin);
  const [skills, setSkills] = useState(cvData.skills.join(', '));
  const [eduDegree, setEduDegree] = useState(cvData.education[0].degree);
  const [eduSchool, setEduSchool] = useState(cvData.education[0].school);
  const [eduPeriod, setEduPeriod] = useState(cvData.education[0].period);
  const [expRole, setExpRole] = useState(cvData.experience[0].role);
  const [expCompany, setExpCompany] = useState(cvData.experience[0].company);
  const [expPeriod, setExpPeriod] = useState(cvData.experience[0].period);

  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<CvData | null>(null);
  // Saldo kredit disimulasikan (front-end dummy). Pengguna baru dapat kredit gratis.
  const [credits, setCredits] = useState(FREE_CV_CREDITS);

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setInputPhoto(URL.createObjectURL(file));
  }

  const styleName = PHOTO_STYLES.find((s) => s.id === style)?.name ?? 'Formal Kantor';
  const hasCredit = credits >= CREDIT_PER_GENERATE;

  function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!hasCredit) return;
    setCredits((c) => c - CREDIT_PER_GENERATE);
    setGenerating(true);

    const skillList = skills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    // Simulasi proses AI (front-end dummy). Saat backend siap, ganti dengan panggilan API.
    setTimeout(() => {
      setResult({
        name,
        headline,
        location,
        // Pasfoto formal hasil AI (disimulasikan dengan foto contoh).
        photo: cvData.photo,
        contact: { email, phone, linkedin },
        about: generateAbout(headline, location, skillList),
        skills: skillList,
        experience: [
          {
            role: expRole,
            company: expCompany,
            period: expPeriod,
            bullets: [
              `Menjalankan peran ${expRole} di ${expCompany} dengan tanggung jawab penuh.`,
              'Berkolaborasi dengan tim lintas fungsi untuk mencapai target bersama.',
            ],
          },
        ],
        education: [{ degree: eduDegree, school: eduSchool, period: eduPeriod }],
      });
      setGenerating(false);
    }, 1200);
  }

  if (result) {
    return (
      <div className="mx-auto max-w-app px-lg py-xl">
        <header className="flex flex-col gap-md sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-headline-lg text-on-surface">CV kamu siap</h1>
            <p className="mt-1 text-body-lg text-on-surface-variant">
              Pasfoto formal (gaya {styleName}) dan ringkasan disusun otomatis oleh AI. Periksa,
              lalu simpan atau ulangi.
            </p>
          </div>
          <div className="flex gap-sm">
            <Button variant="secondary" icon="restart_alt" onClick={() => setResult(null)}>
              Ubah data
            </Button>
            <ButtonLink href="/cv-saya" icon="save">
              Simpan ke CV Saya
            </ButtonLink>
          </div>
        </header>

        <div className="mt-lg">
          <CvDocument cv={result} />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-app px-lg py-xl">
      <header className="flex flex-col gap-md sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          <h1 className="text-headline-lg text-on-surface">Buat CV dengan AI</h1>
          <p className="mt-sm text-body-lg text-on-surface-variant">
            Unggah fotomu (boleh foto biasa) dan isi data diri singkat. AI mengubah fotomu jadi
            pasfoto formal sesuai gaya pilihanmu, lalu menyusun ringkasan CV otomatis.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2 rounded-full border border-outline-variant bg-surface-container-lowest px-md py-2">
          <Icon name="auto_awesome" size={18} className="text-primary" />
          <span className="text-label-md font-semibold text-on-surface">{credits} kredit</span>
          <span className="text-caption text-on-surface-variant">· 1 / generate</span>
        </div>
      </header>

      <input
        ref={fileRef}
        type="file"
        accept="image/png,image/jpeg"
        onChange={handlePhoto}
        className="hidden"
      />

      <form onSubmit={handleGenerate} className="mt-lg grid gap-md lg:grid-cols-[1fr_360px]">
        {/* Kolom kiri: foto + data diri */}
        <div className="space-y-lg">
          {/* Unggah foto + pilih gaya */}
          <section className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
            <h2 className="text-title-lg font-semibold text-on-surface">Foto profil</h2>
            <p className="mt-1 text-body-md text-on-surface-variant">
              Tidak perlu foto formal. Unggah swafoto biasa, AI akan mengubahnya jadi pasfoto formal.
            </p>

            {inputPhoto ? (
              <div className="mt-md flex flex-col items-center gap-md sm:flex-row sm:items-start">
                <div className="relative aspect-[3/4] w-28 shrink-0 overflow-hidden rounded-lg border border-outline-variant bg-surface-container-highest">
                  <Image
                    src={inputPhoto}
                    alt="Foto yang diunggah"
                    fill
                    sizes="112px"
                    unoptimized
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex-1 space-y-sm text-center sm:text-left">
                  <p className="flex items-center justify-center gap-2 text-body-md text-on-surface sm:justify-start">
                    <Icon name="check_circle" fill size={18} className="text-tertiary" /> Foto siap diproses
                  </p>
                  <Button type="button" variant="secondary" icon="add_a_photo" onClick={() => fileRef.current?.click()}>
                    Ganti foto
                  </Button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="mt-md flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-outline-variant bg-surface-container-low px-lg py-xl text-center transition-colors hover:border-primary"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-fixed text-primary">
                  <Icon name="add_a_photo" size={28} />
                </span>
                <span className="text-label-md font-semibold text-on-surface">Unggah foto</span>
                <span className="text-caption text-on-surface-variant">JPG atau PNG, maksimal 5MB</span>
              </button>
            )}

            {/* Pilih gaya foto formal */}
            <p className="mt-lg mb-sm text-label-md font-medium text-on-surface">Gaya foto formal</p>
            <div className="grid grid-cols-2 gap-sm sm:grid-cols-4">
              {PHOTO_STYLES.map((s) => {
                const active = style === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setStyle(s.id)}
                    className={clsx(
                      'rounded-lg border px-sm py-2 text-label-md font-medium transition-colors',
                      active
                        ? 'border-primary bg-primary-fixed text-primary'
                        : 'border-outline-variant text-on-surface-variant hover:border-primary/40',
                    )}
                  >
                    {s.name}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Data diri */}
          <section className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
            <h2 className="text-title-lg font-semibold text-on-surface">Data diri</h2>
            <div className="mt-md grid gap-md sm:grid-cols-2">
              <LabeledInput label="Nama lengkap" value={name} onChange={setName} />
              <LabeledInput label="Posisi / headline" value={headline} onChange={setHeadline} />
              <LabeledInput label="Lokasi" value={location} onChange={setLocation} />
              <LabeledInput label="Email" type="email" value={email} onChange={setEmail} />
              <LabeledInput label="Telepon" value={phone} onChange={setPhone} />
              <LabeledInput label="LinkedIn" value={linkedin} onChange={setLinkedin} />
            </div>
            <div className="mt-md">
              <LabeledInput
                label="Keahlian (pisahkan dengan koma)"
                value={skills}
                onChange={setSkills}
              />
            </div>
          </section>

          {/* Pendidikan & pengalaman */}
          <section className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
            <h2 className="text-title-lg font-semibold text-on-surface">Pendidikan & pengalaman</h2>
            <div className="mt-md grid gap-md sm:grid-cols-2">
              <LabeledInput label="Jurusan / gelar" value={eduDegree} onChange={setEduDegree} />
              <LabeledInput label="Institusi" value={eduSchool} onChange={setEduSchool} />
              <LabeledInput label="Periode pendidikan" value={eduPeriod} onChange={setEduPeriod} />
              <LabeledInput label="Posisi terakhir" value={expRole} onChange={setExpRole} />
              <LabeledInput label="Perusahaan" value={expCompany} onChange={setExpCompany} />
              <LabeledInput label="Periode kerja" value={expPeriod} onChange={setExpPeriod} />
            </div>
          </section>

          {hasCredit ? (
            <>
              <Button type="submit" size="lg" icon="auto_awesome" fullWidth disabled={generating || !inputPhoto}>
                {generating ? 'Menyusun CV...' : 'Generate dengan AI (1 kredit)'}
              </Button>
              {!inputPhoto && (
                <p className="text-center text-caption text-on-surface-variant">
                  Unggah foto terlebih dahulu untuk mulai.
                </p>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center gap-sm rounded-xl border border-outline-variant bg-surface-container-low p-lg text-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-fixed text-primary">
                <Icon name="auto_awesome" size={22} />
              </span>
              <p className="text-title-lg font-semibold text-on-surface">Kredit kamu habis</p>
              <p className="max-w-sm text-body-md text-on-surface-variant">
                Dapatkan kredit lewat paket langganan atau beli satuan untuk terus membuat CV dengan AI.
              </p>
              <ButtonLink href="/langganan" icon="bolt" className="mt-1">
                Dapatkan kredit
              </ButtonLink>
            </div>
          )}
        </div>

        {/* Kolom kanan: panduan */}
        <aside className="h-fit rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
          <h2 className="flex items-center gap-2 text-title-lg text-on-surface">
            <Icon name="verified" className="text-primary" /> Panduan kualitas foto
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
            AI menyusun ringkasan dari data yang kamu isi. Kamu tetap bisa menyuntingnya sebelum disimpan.
          </p>
        </aside>
      </form>
    </div>
  );
}

function LabeledInput({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-label-md font-medium text-on-surface">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(
          'h-11 w-full rounded-lg border border-outline-variant bg-surface px-md text-body-md text-on-surface outline-none transition-colors',
          'focus:border-primary focus:ring-2 focus:ring-primary/30',
        )}
      />
    </label>
  );
}
