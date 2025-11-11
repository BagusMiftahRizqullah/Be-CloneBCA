# BCA Backend (API)

Backend ini menyediakan API untuk konten homepage (promo, news, rates, carousel) yang dikonsumsi oleh aplikasi frontend (Angular).

## Teknologi
- Node.js + Express
- Prisma ORM (MySQL/PostgreSQL kompatibel)
- Swagger/OpenAPI untuk dokumentasi API (`/api/docs`)
- Nodemon untuk pengembangan

## Prasyarat
- Node.js v18+ disarankan
- Database (MySQL/Postgres) yang dapat diakses

## Menjalankan Secara Lokal
1. Install dependencies:
   ```bash
   npm install
   ```
2. Konfigurasi environment variable (contoh):
   Buat file `.env` di root `bca-backend/` dengan isi minimal:
   ```env
   PORT=4000
   DATABASE_URL="mysql://user:pass@localhost:3306/bca_db"
   ```
3. Jalankan migrasi & seed (opsional) menggunakan Prisma:
   ```bash
   npx prisma migrate dev
   node prisma/seed.js
   ```
4. Start server pengembangan:
   ```bash
   npm run dev
   ```
   Server akan aktif di `http://localhost:4000/` dan dokumentasi API di `http://localhost:4000/api/docs`.

## Endpoints Utama
- `GET /api/promos` — daftar promo
- `GET /api/news` — daftar berita (query: `featured`, `limit`)
- `GET /api/rates` — daftar kurs
- `GET /api/carousel` — item carousel

## Struktur Direktori
```
bca-backend/
├── prisma/                # skema dan migrasi Prisma
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.js
├── src/
│   ├── server.js          # entrypoint Express
│   ├── logger.js          # konfigurasi logger
│   ├── middlewares/       # middleware (auth, error handler)
│   ├── validators/        # validasi request
│   └── swagger.js         # setup Swagger
├── logs/                  # log aplikasi
├── package.json
└── prisma.config.ts
```

## Pengembangan & Saran Struktur
- Pertimbangkan penambahan layer `routes/`, `controllers/`, `services/` untuk pemisahan concern.
- Tambahkan file `.env.example` agar developer lain mudah memulai.
- Lengkapi test (`jest`/`vitest`) untuk endpoint inti.
- Siapkan `docker-compose.yml` untuk memudahkan spin-up database lokal.

## Troubleshooting
- Jika Prisma gagal koneksi, cek `DATABASE_URL` dan hak akses user DB.
- Periksa log di `logs/error.log` untuk error runtime.