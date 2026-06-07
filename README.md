# KarirHub - Web

Front-end statis **KarirHub**, platform karir Indonesia yang menggabungkan **job board**
(cari & lamar lowongan, pasang lowongan & kelola pelamar) dan **marketplace jasa karir**
ala Fiverr (review CV, AI foto CV, coaching interview, dll). Status: front-end statis dengan
data dummy - belum ada backend/database, jadi semua interaksi (login, checkout, lamar) masih
bersifat tampilan.

Aplikasi mobile-nya ada di repo terpisah: **KarirHub_mobile** (Expo / React Native).

## Fitur utama

- **Job board** - daftar lowongan dengan filter tipe & pengalaman, halaman detail lowongan,
  dan alur pasang lowongan untuk rekruter.
- **Marketplace jasa** - katalog layanan karir berkategori, halaman detail dengan tab,
  serta alur checkout.
- **AI Foto CV** - halaman khusus untuk layanan unggulan pembuatan foto CV.
- **Dua dashboard** - area **rekruter** (talenta, paket, transaksi) dan area **seller**
  (layanan saya, langganan, transaksi).
- **Auth tampilan** - halaman masuk, daftar, dan profil (state lokal, tanpa server).
- **Talent pool** - halaman `/talenta` untuk menelusuri kandidat.

## Stack

| Bagian        | Teknologi                                              |
| ------------- | ------------------------------------------------------ |
| Framework     | **Next.js 14.2** (App Router) + **React 18**           |
| Bahasa        | **TypeScript 5.5**                                     |
| Styling       | **Tailwind CSS v3.4** + PostCSS + Autoprefixer         |
| Design token  | Material 3, terpusat di [`tokens.js`](tokens.js)       |
| Ikon          | Material Symbols Outlined                              |
| Font          | Inter                                                  |
| Gambar        | Placeholder semua (komponen `Placeholder`)             |

## Menjalankan

```bash
npm install
npm run dev          # mode development  → http://localhost:3000
npm run build        # build produksi (terverifikasi: 29 halaman)
npm run start        # menjalankan hasil build produksi
npm run lint         # ESLint (next lint)
```

## Struktur proyek

```
KarirHub_web/
├── src/
│   ├── app/                     # App Router: setiap folder = satu rute
│   │   ├── layout.tsx           # root layout (font Inter, chrome global)
│   │   ├── page.tsx             # beranda
│   │   ├── not-found.tsx        # halaman 404
│   │   ├── lowongan/            # list + [id] detail lowongan
│   │   ├── layanan/             # list + [id] detail jasa (ServiceTabs)
│   │   ├── checkout/ · ai-foto-cv/ · talenta/ · pasang-lowongan/
│   │   ├── langganan/ · layanan-saya/ · pesanan/ · profil/ · transaksi/
│   │   ├── masuk/ · daftar/     # autentikasi (tampilan)
│   │   └── dashboard/
│   │       ├── rekruter/        # + paket, talenta, transaksi
│   │       └── seller/          # + langganan, transaksi
│   ├── components/
│   │   ├── ui/                  # Button, Badge, StarRating
│   │   ├── cards/               # JobCard, ServiceCard
│   │   ├── chrome/              # Navbar, Footer, MobileNav, Fab, SiteChrome, DashboardShell
│   │   ├── dashboard/           # PlanGrid, TalentGrid, TransactionPanel
│   │   ├── auth/                # AuthScreen
│   │   ├── Icon.tsx             # wrapper Material Symbols
│   │   └── Placeholder.tsx      # placeholder gambar
│   └── lib/
│       ├── data.ts             # seluruh data dummy + helper
│       ├── auth.tsx            # context auth (state lokal)
│       └── clsx.ts            # util gabung className
├── tokens.js                   # design token (sumber kebenaran, dipakai web & mobile)
├── tailwind.config.ts          # require tokens.js
├── next.config.mjs · postcss.config.mjs · tsconfig.json
```

## Rute

| Publik                         | Akun / transaksi                  | Dashboard                          |
| ------------------------------ | --------------------------------- | ---------------------------------- |
| `/` beranda                    | `/masuk` · `/daftar` · `/profil`  | `/dashboard/rekruter`              |
| `/lowongan` · `/lowongan/[id]` | `/checkout` · `/transaksi`        | `/dashboard/rekruter/talenta`      |
| `/layanan` · `/layanan/[id]`   | `/pesanan` · `/langganan`         | `/dashboard/rekruter/paket`        |
| `/ai-foto-cv`                  | `/layanan-saya`                   | `/dashboard/rekruter/transaksi`    |
| `/talenta`                     | `/pasang-lowongan`                | `/dashboard/seller`                |
|                                |                                   | `/dashboard/seller/langganan`      |
|                                |                                   | `/dashboard/seller/transaksi`      |

## Design token

[`tokens.js`](tokens.js) adalah satu sumber kebenaran untuk warna, spacing, radius, tipografi,
shadow, dan font - di-`require` oleh [`tailwind.config.ts`](tailwind.config.ts). File yang sama
disinkronkan ke repo **KarirHub_mobile** agar tampilan kedua platform identik. Jangan hardcode
hex di komponen; pakai class token (`bg-primary`, `text-on-surface`, `p-lg`, dst).

- `primary` `#004ac6` (CTA) · `primary-container` `#2563eb` (Royal Blue, hero/aktif)
- `tertiary` hijau = status Verified/sukses · `error` merah
- Spacing skala 4/8 (`base` 4 · `xs` 8 · `sm` 12 · `md` 16 · `lg` 24 · `xl` 32 · `2xl` 48)
- Radius base `0.5rem` (8px); pill (full) hanya untuk chip filter & status tag
- Tipografi Inter: display-lg 48 · headline-lg 32 · headline-md 24 · title-lg 20 ·
  body-lg 18 · body-md 16 · label-md 14 · caption 12

## Data dummy

Terpusat di [`src/lib/data.ts`](src/lib/data.ts). Bentuk data dijaga identik dengan
`KarirHub_mobile/src/data/index.ts` agar mudah disambungkan ke API nanti. Isi utama:

- **Tipe:** `Job`, `Service`, `JobType`, `SellerPlan`
- **Koleksi:** `jobs`, `services`, `talents`, `applicants`, `incomingOrders`,
  `transactions`, `myServices`, `sellerPlans`, `recruiterPlans`
- **Statistik dashboard:** `recruiterStats`, `sellerStats`
- **Opsi filter:** `jobTypes`, `experiences`, `serviceCategories`
- **Helper:** `getJob(id)`, `getService(id)`, `formatRupiah(n)`

Karena belum ada backend, mengganti sumber data nanti cukup dengan menukar isi `data.ts`
menjadi pemanggilan API tanpa mengubah komponen.

---

Tugas Besar - Manajemen Basis Data, Rekayasa Perangkat Lunak.
