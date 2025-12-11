export default async function run(prisma) {
  const today = new Date();
  const days = (n) => new Date(today.getTime() - n * 24 * 60 * 60 * 1000);
  const data = [
    { title: 'BCA Luncurkan Fitur Transfer Instan', date: days(1), category: 'Pengumuman', imageUrl: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1200&auto=format&fit=crop', url: '/news/transfer-instan', featured: true },
    { title: 'Promo Akhir Tahun untuk Pengguna Kartu Kredit', date: days(3), category: 'Promo', imageUrl: 'https://images.unsplash.com/photo-1518081461904-9ac6f3165c3b?q=80&w=1200&auto=format&fit=crop', url: '/news/promo-akhir-tahun', featured: true },
    { title: 'Peningkatan Keamanan KlikBCA', date: days(5), category: 'Keamanan', imageUrl: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=1200&auto=format&fit=crop', url: '/news/keamanan-klikbca', featured: false },
    { title: 'BCA Mobile Menambahkan Fitur QRIS', date: days(7), category: 'Produk', imageUrl: 'https://images.unsplash.com/photo-1556745753-b290469acf12?q=80&w=1200&auto=format&fit=crop', url: '/news/bca-mobile-qris', featured: false },
    { title: 'Layanan Customer Service 24 Jam', date: days(9), category: 'Layanan', imageUrl: 'https://images.unsplash.com/photo-1525186402429-b4ff38bedbec?q=80&w=1200&auto=format&fit=crop', url: '/news/cs-24-jam', featured: false },
    { title: 'Program Edukasi Literasi Finansial', date: days(11), category: 'Edukasi', imageUrl: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1200&auto=format&fit=crop', url: '/news/literasi-finansial', featured: false },
    { title: 'Pembaruan Aplikasi Sakuku', date: days(13), category: 'Produk', imageUrl: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?q=80&w=1200&auto=format&fit=crop', url: '/news/pembaruan-sakuku', featured: false },
    { title: 'Kolaborasi dengan Merchant Nasional', date: days(15), category: 'Kemitraan', imageUrl: 'https://images.unsplash.com/photo-1497366811353-9b7f0c1f7b3a?q=80&w=1200&auto=format&fit=crop', url: '/news/kolaborasi-merchant', featured: false },
    { title: 'Peningkatan Limit Transaksi', date: days(17), category: 'Pengumuman', imageUrl: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?q=80&w=1200&auto=format&fit=crop', url: '/news/limit-transaksi', featured: false },
    { title: 'BCA Peduli: Program CSR Terbaru', date: days(19), category: 'CSR', imageUrl: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=1200&auto=format&fit=crop', url: '/news/csr-terbaru', featured: false },
  ];
  await prisma.news.deleteMany({});
  await prisma.news.createMany({ data });
}

