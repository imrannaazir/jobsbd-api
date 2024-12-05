import { PrismaClient } from '@prisma/client';
import { seedDemoCandidate } from './seed/seed-demo-candidate';
import { seedDemoEmployer } from './seed/seed-demo-employer';
import { seedDemoJob } from './seed/seed-demo-job';
import { seedDepartments } from './seed/seed-departments';
import { seedIndustries } from './seed/seed-industries';
import { seedSuperAdmin } from './seed/seed-super-admin';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  try {
    await seedIndustries();
    await seedDepartments();
    await seedDemoCandidate();
    await seedDemoEmployer();
    await seedSuperAdmin();
    await seedDemoJob();
    console.log('Seeding finished.');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});

// Execute the main function
main();
