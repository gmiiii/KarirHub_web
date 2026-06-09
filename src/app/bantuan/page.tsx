import Link from 'next/link';
import { DocPage, DocSection } from '@/components/chrome/DocPage';

export const metadata = { title: 'Pusat Bantuan - KarirHub' };

const faqs = [
  {
    q: 'Bagaimana cara melamar lowongan?',
    a: 'Buka halaman Lowongan, pilih posisi yang sesuai, lalu tekan "Lamar Sekarang". Pastikan profil dan CV kamu sudah lengkap agar peluang lolos lebih besar.',
  },
  {
    q: 'Apa itu kredit pembuatan CV?',
    a: '1 kredit dipakai untuk sekali membuat CV dengan AI (pasfoto formal dan ringkasan otomatis). Kamu mendapat kredit gratis dan bisa menambah lewat halaman Langganan.',
  },
  {
    q: 'Bagaimana cara menjadi seller jasa karir?',
    a: 'Pilih paket seller di halaman Langganan, lalu kelola jasa kamu di menu Layanan Saya. Pesanan yang masuk akan tampil di halaman Pesanan.',
  },
  {
    q: 'Apakah pembayaran di KarirHub aman?',
    a: 'Ya. Seluruh transaksi melewati kanal pembayaran terenkripsi dan dilindungi Jaminan KarirHub hingga pesanan selesai.',
  },
];

export default function BantuanPage() {
  return (
    <DocPage title="Pusat Bantuan" intro="Temukan jawaban cepat atas pertanyaan yang paling sering diajukan.">
      <DocSection title="Pertanyaan umum">
        <dl className="space-y-md">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
              <dt className="text-label-md font-semibold text-on-surface">{f.q}</dt>
              <dd className="mt-1 text-body-md text-on-surface-variant">{f.a}</dd>
            </div>
          ))}
        </dl>
      </DocSection>
      <DocSection title="Masih butuh bantuan?">
        <p>
          Hubungi tim dukungan kami di{' '}
          <a href="mailto:bantuan@karirhub.id" className="font-semibold text-primary hover:underline">
            bantuan@karirhub.id
          </a>
          . Kamu juga bisa membaca{' '}
          <Link href="/ketentuan" className="font-semibold text-primary hover:underline">
            Ketentuan Layanan
          </Link>{' '}
          dan{' '}
          <Link href="/kebijakan-privasi" className="font-semibold text-primary hover:underline">
            Kebijakan Privasi
          </Link>
          .
        </p>
      </DocSection>
    </DocPage>
  );
}
