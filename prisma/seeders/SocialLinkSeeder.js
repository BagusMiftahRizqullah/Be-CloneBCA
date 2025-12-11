export default async function run(prisma) {
  const data = [
    { label: 'Instagram', handle: 'bankbca', url: 'https://instagram.com/bankbca', icon: 'instagram', order: 1 },
    { label: 'Twitter', handle: 'bankbca', url: 'https://twitter.com/bankbca', icon: 'twitter', order: 2 },
    { label: 'Facebook', handle: 'Bank BCA', url: 'https://facebook.com/BankBCA', icon: 'facebook', order: 3 },
    { label: 'YouTube', handle: 'Bank BCA', url: 'https://www.youtube.com/@BankBCA', icon: 'youtube', order: 4 },
    { label: 'LinkedIn', handle: 'PT Bank Central Asia Tbk', url: 'https://www.linkedin.com/company/bank-bca', icon: 'linkedin', order: 5 },
    { label: 'TikTok', handle: 'bankbca', url: 'https://www.tiktok.com/@bankbca', icon: 'tiktok', order: 6 },
    { label: 'WhatsApp', handle: 'Halo BCA', url: 'https://wa.me/628111500888', icon: 'whatsapp', order: 7 },
    { label: 'Telegram', handle: 'BCA Info', url: 'https://t.me/s/BCAOfficial', icon: 'telegram', order: 8 },
    { label: 'Medium', handle: 'BCA', url: 'https://medium.com/tag/bca', icon: 'medium', order: 9 },
    { label: 'Reddit', handle: 'r/bca', url: 'https://www.reddit.com/r/Indonesia', icon: 'reddit', order: 10 },
  ];
  await prisma.socialLink.deleteMany({});
  await prisma.socialLink.createMany({ data });
}

