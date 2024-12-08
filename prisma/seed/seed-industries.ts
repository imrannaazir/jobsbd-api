import prisma from '../../src/shared/prisma';

const industries = [
  { name: 'Agriculture' },
  { name: 'Automotive' },
  { name: 'Banking' },
  { name: 'Biotechnology' },
  { name: 'Chemicals' },
  { name: 'Construction' },
  { name: 'Consulting' },
  { name: 'Education' },
  { name: 'Electronics' },
  { name: 'Energy' },
  { name: 'Entertainment' },
  { name: 'Environmental' },
  { name: 'Fashion' },
  { name: 'Finance' },
  { name: 'Food and Beverage' },
  { name: 'Healthcare' },
  { name: 'Hospitality' },
  { name: 'Information Technology' },
  { name: 'Insurance' },
  { name: 'Legal' },
  { name: 'Manufacturing' },
  { name: 'Media' },
  { name: 'Mining' },
  { name: 'Non-Profit' },
  { name: 'Pharmaceuticals' },
  { name: 'Real Estate' },
  { name: 'Retail' },
  { name: 'Telecommunications' },
  { name: 'Transportation' },
  { name: 'Travel' },
  { name: 'Utilities' },
];

export async function seedIndustries() {
  console.log('Start industry seeding...');

  for (const industry of industries) {
    await prisma.industry.upsert({
      where: { name: industry.name },
      update: {},
      create: industry,
    });
  }
  console.log('Seeded industries');
}
