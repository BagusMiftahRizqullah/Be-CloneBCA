export default async function run(prisma) {
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
}
