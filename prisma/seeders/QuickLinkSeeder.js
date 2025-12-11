export default async function run(prisma) {
  const data = [
    { label: 'Kartu Kredit', url: '/kartu-kredit', order: 1 },
    { label: 'KPR', url: '/kpr', order: 2 },
    { label: 'Deposito', url: '/deposito', order: 3 },
    { label: 'Tahapan', url: '/tahapan', order: 4 },
    { label: 'Flazz', url: '/flazz', order: 5 },
    { label: 'KlikBCA', url: '/klikbca', order: 6 },
    { label: 'm-BCA', url: '/mbca', order: 7 },
    { label: 'BCA Mobile', url: '/bca-mobile', order: 8 },
    { label: 'Sakuku', url: '/sakuku', order: 9 },
    { label: 'Blu', url: '/blu', order: 10 },
  ];
  await prisma.quickLink.deleteMany({});
  await prisma.quickLink.createMany({ data });
}
