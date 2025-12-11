export default async function run(prisma) {
  const data = [
    { type: 'PHONE', label: 'Halo BCA', value: '1500888' },
    { type: 'EMAIL', label: 'Support', value: 'support@bca.co.id' },
    { type: 'WHATSAPP', label: 'WhatsApp', value: '+628111500888' },
    { type: 'PHONE', label: 'Kantor Cabang', value: '0211234567' },
    { type: 'EMAIL', label: 'Info Produk', value: 'info@bca.co.id' },
    { type: 'WHATSAPP', label: 'CS 1', value: '+6281212345678' },
    { type: 'WHATSAPP', label: 'CS 2', value: '+6281298765432' },
    { type: 'PHONE', label: 'Layanan KPR', value: '0217654321' },
    { type: 'EMAIL', label: 'Karir', value: 'karir@bca.co.id' },
    { type: 'EMAIL', label: 'Kemitraan', value: 'partner@bca.co.id' },
  ];
  await prisma.contactMethod.deleteMany({});
  await prisma.contactMethod.createMany({ data });
}
