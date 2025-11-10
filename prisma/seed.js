import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Contact info
  await prisma.contactInfo.upsert({
    where: { id: 1 },
    update: {},
    create: {
      officeName: 'BCA Main Office',
      address1: 'Jl. Jend. Sudirman No. 1',
      address2: 'Kebayoran Baru',
      cityPostal: 'Jakarta 12190',
      locationLabel: 'Google Maps',
      locationUrl: 'https://maps.google.com/?q=BCA',
    },
  });

  // Contact methods
  const contactMethods = [
    { type: 'PHONE', label: 'Halo BCA', value: '1500888' },
    { type: 'EMAIL', label: 'Support', value: 'support@bca.co.id' },
    { type: 'WHATSAPP', label: 'WhatsApp', value: '+628123456789' },
  ];
  for (const cm of contactMethods) {
    await prisma.contactMethod.create({ data: cm });
  }

  // Quick links
  const quickLinks = [
    { label: 'Kartu Kredit', url: '/kartu-kredit', order: 1 },
    { label: 'KPR', url: '/kpr', order: 2 },
    { label: 'Deposito', url: '/deposito', order: 3 },
  ];
  for (const q of quickLinks) {
    await prisma.quickLink.create({ data: q });
  }

  // Social links
  const socialLinks = [
    { label: 'Instagram', handle: 'bankbca', url: 'https://instagram.com/bankbca', icon: 'instagram', order: 1 },
    { label: 'Twitter', handle: 'bankbca', url: 'https://twitter.com/bankbca', icon: 'twitter', order: 2 },
  ];
  for (const s of socialLinks) {
    await prisma.socialLink.create({ data: s });
  }

  // Policy links
  const policyLinks = [
    { label: 'Syarat & Ketentuan', url: '/terms', order: 1 },
    { label: 'Kebijakan Privasi', url: '/privacy', order: 2 },
  ];
  for (const p of policyLinks) {
    await prisma.policyLink.create({ data: p });
  }

  // News
  const now = new Date();
  const newsItems = [
    { title: 'BCA Meluncurkan Fitur Baru', date: now, category: 'Pengumuman', imageUrl: null, url: '/news/1', featured: true },
    { title: 'Promo Akhir Tahun', date: new Date(now.getTime() - 86400000), category: 'Promo', imageUrl: null, url: '/news/2', featured: false },
  ];
  for (const n of newsItems) {
    await prisma.news.create({ data: n });
  }

  // Promos
  const promos = [
    {
      title: 'Diskon Belanja 20%',
      imageUrl: 'https://picsum.photos/seed/promo/800/400',
      periodFrom: new Date(now.getTime() - 7 * 86400000),
      periodTo: new Date(now.getTime() + 7 * 86400000),
      url: '/promo/1',
      featured: true,
    },
  ];
  for (const pr of promos) {
    await prisma.promo.create({ data: pr });
  }

  // Carousel slides
  const slides = [
    { title: 'Selamat Datang di BCA', imageUrl: 'https://picsum.photos/seed/slide1/1200/480', href: '/', order: 1 },
    { title: 'Kemudahan Transaksi', imageUrl: 'https://picsum.photos/seed/slide2/1200/480', href: '/produk', order: 2 },
  ];
  for (const sl of slides) {
    await prisma.carouselSlide.create({ data: sl });
  }

  // Currency rates
  const rates = [
    { code: 'USD', buy: 15800.5, sell: 16020.75, flagSrc: '/assets/flags/us.svg' },
    { code: 'EUR', buy: 16850.9, sell: 17010.35, flagSrc: '/assets/flags/eu.svg' },
    { code: 'JPY', buy: 105.2, sell: 106.1, flagSrc: '/assets/flags/jp.svg' },
  ];
  for (const r of rates) {
    await prisma.currencyRate.create({ data: r });
  }

  // Admin user
  const adminEmail = 'admin@example.com';
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: { email: adminEmail, name: 'Admin', passwordHash: adminPassword, role: 'admin' },
  });

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });