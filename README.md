# KarirHub — Web

Front-end statis **KarirHub**, platform karir Indonesia yang menggabungkan **job board**
(cari & lamar lowongan, pasang lowongan & kelola pelamar) dan **marketplace jasa karir**
ala Fiverr (review CV, AI foto CV, coaching interview, dll). Status: front-end statis dengan
data dummy — belum ada backend/database.

Aplikasi mobile-nya ada di repo terpisah: **KarirHub_mobile** (Expo / React Native).

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS v3** dengan design token Material 3 terpusat di [`tokens.js`](tokens.js)
- Ikon: Material Symbols Outlined · Font: Inter · Semua gambar memakai placeholder

## Menjalankan

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # build statis (terverifikasi: 29 halaman)
```

## Rute

`/` · `/lowongan` `/lowongan/[id]` · `/layanan` `/layanan/[id]` · `/checkout` · `/ai-foto-cv` ·
`/dashboard/rekruter` `/dashboard/seller` · `/talenta` · `/pasang-lowongan` · `/langganan` ·
`/layanan-saya` · `/pesanan` · `/profil` · `/transaksi`.

## Design token

[`tokens.js`](tokens.js) adalah satu sumber kebenaran untuk warna, spacing, radius, tipografi,
shadow, dan font — di-`require` oleh [`tailwind.config.ts`](tailwind.config.ts). File yang sama
disinkronkan ke repo **KarirHub_mobile** agar tampilan kedua platform identik. Jangan hardcode
hex di komponen; pakai class token (`bg-primary`, `text-on-surface`, `p-lg`, dst).

- `primary` `#004ac6` (CTA) · `primary-container` `#2563eb` (Royal Blue, hero/aktif)
- `tertiary` hijau = status Verified/sukses · `error` merah
- Spacing skala 4/8 (`base`/`xs`/`sm`/`md`/`lg`/`xl`/`2xl`)

## Data dummy

Terpusat di [`src/lib/data.ts`](src/lib/data.ts), bentuknya dijaga identik dengan
`KarirHub_mobile/src/data/index.ts` agar mudah disambungkan ke API nanti.

---

Tugas Besar — Manajemen Basis Data, Rekayasa Perangkat Lunak.
