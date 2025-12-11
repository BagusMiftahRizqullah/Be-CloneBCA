export default async function run(prisma) {
  const today = new Date();
  const daysFrom = (n) => new Date(today.getTime() - n * 24 * 60 * 60 * 1000);
  const daysTo = (n) => new Date(today.getTime() + n * 24 * 60 * 60 * 1000);
  const data = [
    { title: 'Diskon Belanja 20%', imageUrl: 'https://images.unsplash.com/photo-1556745753-b290469acf12?q=80&w=1200&auto=format&fit=crop', periodFrom: daysFrom(7), periodTo: daysTo(7), url: '/promo/diskon-belanja-20', featured: true },
    { title: 'Cashback 10% Pembayaran Tagihan', imageUrl: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=1200&auto=format&fit=crop', periodFrom: daysFrom(3), periodTo: daysTo(10), url: '/promo/cashback-tagihan', featured: true },
    { title: 'Gratis Biaya Admin Bulan Ini', imageUrl: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1200&auto=format&fit=crop', periodFrom: daysFrom(1), periodTo: daysTo(30), url: '/promo/gratis-biaya-admin', featured: false },
    { title: 'Diskon Travel dengan Kartu Kredit', imageUrl: 'https://images.unsplash.com/photo-1497366811353-9b7f0c1f7b3a?q=80&w=1200&auto=format&fit=crop', periodFrom: daysFrom(10), periodTo: daysTo(20), url: '/promo/diskon-travel', featured: false },
    { title: 'Promo Makan Hemat', imageUrl: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=1200&auto=format&fit=crop', periodFrom: daysFrom(5), periodTo: daysTo(15), url: '/promo/makan-hemat', featured: false },
    { title: 'Diskon Belanja Online 15%', imageUrl: 'https://images.unsplash.com/photo-1518081461904-9ac6f3165c3b?q=80&w=1200&auto=format&fit=crop', periodFrom: daysFrom(2), periodTo: daysTo(12), url: '/promo/belanja-online-15', featured: false },
    { title: 'Cicilan 0% Hingga 12 Bulan', imageUrl: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?q=80&w=1200&auto=format&fit=crop', periodFrom: daysFrom(8), periodTo: daysTo(8), url: '/promo/cicilan-nol', featured: false },
    { title: 'Voucher Belanja Rp100.000', imageUrl: 'https://images.unsplash.com/photo-1509475826633-fed577a456f5?q=80&w=1200&auto=format&fit=crop', periodFrom: daysFrom(4), periodTo: daysTo(14), url: '/promo/voucher-belanja', featured: false },
    { title: 'Diskon Hotel 25%', imageUrl: 'https://images.unsplash.com/photo-1556767576-c8f8c464c6de?q=80&w=1200&auto=format&fit=crop', periodFrom: daysFrom(12), periodTo: daysTo(12), url: '/promo/diskon-hotel', featured: false },
    { title: 'Promo Transportasi', imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop', periodFrom: daysFrom(6), periodTo: daysTo(16), url: '/promo/transportasi', featured: false },
  ];
  await prisma.promo.deleteMany({});
  await prisma.promo.createMany({ data });
}

