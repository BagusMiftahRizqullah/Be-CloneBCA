export default async function run(prisma) {
  const data = [
    { label: 'Syarat & Ketentuan', url: '/terms', order: 1 },
    { label: 'Kebijakan Privasi', url: '/privacy', order: 2 },
    { label: 'Kebijakan Cookie', url: '/cookies', order: 3 },
    { label: 'Keamanan Data', url: '/security', order: 4 },
    { label: 'Hak & Kewajiban Nasabah', url: '/customer-rights', order: 5 },
    { label: 'Informasi Produk', url: '/product-info', order: 6 },
    { label: 'Penyelesaian Sengketa', url: '/dispute-resolution', order: 7 },
    { label: 'Transparansi Biaya', url: '/fees-transparency', order: 8 },
    { label: 'Anti Penipuan', url: '/anti-fraud', order: 9 },
    { label: 'Kontak & Bantuan', url: '/help', order: 10 },
  ];
  await prisma.policyLink.deleteMany({});
  await prisma.policyLink.createMany({ data });
}

