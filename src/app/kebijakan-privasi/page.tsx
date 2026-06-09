import { DocPage, DocSection } from '@/components/chrome/DocPage';

export const metadata = { title: 'Kebijakan Privasi - KarirHub' };

export default function KebijakanPrivasiPage() {
  return (
    <DocPage
      title="Kebijakan Privasi"
      intro="Kami menjelaskan bagaimana data pribadimu dikumpulkan, digunakan, dan dilindungi."
      updated="9 Juni 2026"
    >
      <DocSection title="1. Data yang kami kumpulkan">
        <p>
          Kami mengumpulkan data yang kamu berikan saat mendaftar (nama, email, profil, CV) serta
          data penggunaan seperti riwayat lamaran dan transaksi.
        </p>
      </DocSection>
      <DocSection title="2. Penggunaan data">
        <p>
          Data digunakan untuk menyediakan layanan, mencocokkan kamu dengan lowongan atau jasa yang
          relevan, memproses pembayaran, dan meningkatkan kualitas platform.
        </p>
      </DocSection>
      <DocSection title="3. Berbagi data">
        <p>
          Profil dan CV kamu dapat dilihat rekruter saat kamu melamar. Kami tidak menjual data
          pribadimu kepada pihak ketiga.
        </p>
      </DocSection>
      <DocSection title="4. Keamanan">
        <p>
          Kami menerapkan enkripsi dan kontrol akses untuk melindungi data. Meski demikian, tidak
          ada sistem yang sepenuhnya bebas risiko.
        </p>
      </DocSection>
      <DocSection title="5. Hak kamu">
        <p>
          Kamu dapat mengakses, memperbarui, atau menghapus data pribadimu melalui halaman Profil,
          atau menghubungi kami di{' '}
          <a href="mailto:privasi@karirhub.id" className="font-semibold text-primary hover:underline">
            privasi@karirhub.id
          </a>
          .
        </p>
      </DocSection>
    </DocPage>
  );
}
