import prisma from '../../src/shared/prisma';

const departments = [
  { name: 'Accounting' },
  { name: 'Administration' },
  { name: 'Customer Service' },
  { name: 'Data Science' },
  { name: 'Design' },
  { name: 'Engineering' },
  { name: 'Finance' },
  { name: 'Human Resources' },
  { name: 'Information Technology' },
  { name: 'Legal' },
  { name: 'Marketing' },
  { name: 'Operations' },
  { name: 'Product Management' },
  { name: 'Public Relations' },
  { name: 'Quality Assurance' },
  { name: 'Research and Development' },
  { name: 'Sales' },
  { name: 'Security' },
  { name: 'Supply Chain' },
  { name: 'Training and Development' },
];

export async function seedDepartments() {
  for (const department of departments) {
    await prisma.department.upsert({
      where: { name: department.name },
      update: {},
      create: department,
    });
  }
  console.log('Seeded departments');
}
