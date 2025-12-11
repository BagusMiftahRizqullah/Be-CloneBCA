export default async function run(prisma) {
  const data = [
    { title: 'Selamat Datang di BCA', imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop', href: '/', order: 1 },
    { title: 'Kemudahan Transaksi', imageUrl: 'https://images.unsplash.com/photo-1485217988980-11786ced9454?q=80&w=1200&auto=format&fit=crop', href: '/produk', order: 2 },
    { title: 'Kartu Kredit BCA', imageUrl: 'https://images.unsplash.com/photo-1518655048521-f130df041f66?q=80&w=1200&auto=format&fit=crop', href: '/kartu-kredit', order: 3 },
    { title: 'BCA Mobile & QRIS', imageUrl: 'https://images.unsplash.com/photo-1548438294-1a788ea49c56?q=80&w=1200&auto=format&fit=crop', href: '/mbca', order: 4 },
    { title: 'KlikBCA Internet Banking', imageUrl: 'https://images.unsplash.com/photo-1556157396-2c3aa7e4a1b1?q=80&w=1200&auto=format&fit=crop', href: '/klikbca', order: 5 },
    { title: 'Promo Menarik Tiap Minggu', imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop', href: '/promo', order: 6 },
    { title: 'Solusi KPR Terbaik', imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop', href: '/kpr', order: 7 },
    { title: 'Deposito BCA', imageUrl: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1200&auto=format&fit=crop', href: '/deposito', order: 8 },
    { title: 'Flazz untuk Mobilitas', imageUrl: 'https://images.unsplash.com/photo-1473181488821-2d23949a045a?q=80&w=1200&auto=format&fit=crop', href: '/flazz', order: 9 },
    { title: 'Layanan 24/7 Halo BCA', imageUrl: 'https://images.unsplash.com/photo-1525186402429-b4ff38bedbec?q=80&w=1200&auto=format&fit=crop', href: '/kontak', order: 10 },
  ];
  await prisma.carouselSlide.deleteMany({});
  await prisma.carouselSlide.createMany({ data });
}

