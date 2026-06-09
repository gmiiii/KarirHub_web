import { DocPage, DocSection } from '@/components/chrome/DocPage';

export const metadata = { title: 'Ketentuan Layanan - KarirHub' };

export default function KetentuanPage() {
  return (
    <DocPage
      title="Ketentuan Layanan"
      intro="Ketentuan ini mengatur penggunaan platform KarirHub oleh seluruh pengguna."
      updated="9 Juni 2026"
    >
      <DocSection title="1. Penerimaan ketentuan">
        <p>
          Dengan membuat akun atau menggunakan layanan KarirHub, kamu menyetujui ketentuan ini.
          Bila tidak setuju, mohon untuk tidak menggunakan layanan kami.
        </p>
      </DocSection>
      <DocSection title="2. Akun pengguna">
        <p>
          Kamu bertanggung jawab menjaga kerahasiaan kata sandi dan seluruh aktivitas pada akunmu.
          Data yang kamu berikan harus akurat dan terkini.
        </p>
      </DocSection>
      <DocSection title="3. Lowongan dan jasa">
        <p>
          Rekruter bertanggung jawab atas keakuratan lowongan yang dipasang, dan seller bertanggung
          jawab atas jasa yang ditawarkan. KarirHub berperan sebagai perantara dan tidak menjamin
          hasil rekrutmen maupun jasa tertentu.
        </p>
      </DocSection>
      <DocSection title="4. Pembayaran">
        <p>
          Transaksi layanan berbayar diproses melalui kanal pembayaran resmi. Pengembalian dana
          mengikuti kebijakan masing-masing layanan dan Jaminan KarirHub.
        </p>
      </DocSection>
      <DocSection title="5. Larangan">
        <p>
          Pengguna dilarang mengunggah konten palsu, melanggar hukum, atau merugikan pengguna lain.
          Pelanggaran dapat berakibat penangguhan akun.
        </p>
      </DocSection>
      <DocSection title="6. Perubahan ketentuan">
        <p>
          KarirHub dapat memperbarui ketentuan ini sewaktu-waktu. Perubahan berlaku sejak
          dipublikasikan pada halaman ini.
        </p>
      </DocSection>
    </DocPage>
  );
}
