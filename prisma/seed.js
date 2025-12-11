import { PrismaClient } from '@prisma/client';
import contactInfoSeeder from './seeders/ContactInfoSeeder.js';
import contactMethodSeeder from './seeders/ContactMethodSeeder.js';
import quickLinkSeeder from './seeders/QuickLinkSeeder.js';
import socialLinkSeeder from './seeders/SocialLinkSeeder.js';
import policyLinkSeeder from './seeders/PolicyLinkSeeder.js';
import newsSeeder from './seeders/NewsSeeder.js';
import promoSeeder from './seeders/PromoSeeder.js';
import carouselSlideSeeder from './seeders/CarouselSlideSeeder.js';
import currencyRateSeeder from './seeders/CurrencyRateSeeder.js';
import userSeeder from './seeders/UserSeeder.js';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  await contactInfoSeeder(prisma);
  await contactMethodSeeder(prisma);
  await quickLinkSeeder(prisma);
  await socialLinkSeeder(prisma);
  await policyLinkSeeder(prisma);
  await newsSeeder(prisma);
  await promoSeeder(prisma);
  await carouselSlideSeeder(prisma);
  await currencyRateSeeder(prisma);
  await userSeeder(prisma);
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
