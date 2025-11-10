import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();

async function main() {
  // Contact info (single row)
  await prisma.contactInfo.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      officeName: 'Kantor Pusat',
      address1: 'Menara BCA, Grand Indonesia',
      address2: 'Jl. MH Thamrin No. 1',
      cityPostal: 'Jakarta 10310',
      locationLabel: 'Lokasi BCA Lainnya',
      locationUrl: '#',
    },
  });

  // Contact methods
  await prisma.contactMethod.deleteMany();
  await prisma.contactMethod.createMany({
    data: [
      { type: 'PHONE', label: 'Halo BCA', value: '1500888' },
      { type: 'EMAIL', label: 'Email', value: 'halobca@bca.co.id' },
      { type: 'WHATSAPP', label: 'WhatsApp', value: '62811500998' },
    ],
  });

  // Social links
  await prisma.socialLink.deleteMany();
  await prisma.socialLink.createMany({
    data: [
      { label: 'Goodlife BCA', url: '#', icon: 'globe', order: 1 },
      { label: 'Solusi BCA', url: '#', icon: 'globe', order: 2 },
      { label: '@goodlifebca', url: '#', icon: 'at', order: 3 },
      { label: '@halobca', url: '#', icon: 'at', order: 4 },
      { label: '@BankBCA', url: '#', icon: 'at', order: 5 },
    ],
  });

  // Quick links
  await prisma.quickLink.deleteMany();
  await prisma.quickLink.createMany({
    data: [
      { label: 'Individu', url: '#', order: 1 },
      { label: 'Bisnis', url: '#', order: 2 },
      { label: 'Tentang BCA', url: '#', order: 3 },
      { label: 'Karir', url: '#', order: 4 },
      { label: 'Promo', url: '#', order: 5 },
      { label: 'Lokasi', url: '#', order: 6 },
    ],
  });

  // Policy links
  await prisma.policyLink.deleteMany();
  await prisma.policyLink.createMany({
    data: [
      { label: 'SBDK', url: '#', order: 1 },
      { label: 'Kebijakan', url: '#', order: 2 },
      { label: 'Syarat dan Ketentuan', url: '#', order: 3 },
    ],
  });

  // News items (dummy)
  await prisma.news.deleteMany();
  await prisma.news.createMany({
    data: [
      { title: 'Telah Hadir, Batavia USD Money Market', date: new Date('2025-11-07'), category: 'Berita', imageUrl: 'https://www.bca.co.id/-/media/Feature/Card/Main-Banner-Card/Personal/20251104-KPR-Berjenjang-Nov-2025.png', url: '#', featured: true },
      { title: 'Pemberitahuan Penyesuaian Limit Nominal Transaksi', date: new Date('2025-10-21'), category: 'Berita', imageUrl: 'https://www.bca.co.id/-/media/Feature/Card/Main-Banner-Card/Personal/20251104-KPR-Berjenjang-Nov-2025.png', url: '#', featured: false },
      { title: 'BCA Raih Predikat "Marketer of the Year"', date: new Date('2025-10-22'), category: 'Berita', imageUrl: 'https://www.bca.co.id/-/media/Feature/Card/Main-Banner-Card/Personal/20251104-KPR-Berjenjang-Nov-2025.png', url: '#', featured: false }
    ]
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Seed completed');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });