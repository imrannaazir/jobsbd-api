import JobsServices from '../../src/app/modules/jobs/jobs.services';
import prisma from '../../src/shared/prisma';

export const seedDemoJob = async () => {
  console.log('Start job seeding...');

  try {
    const industry = await prisma.industry.findFirstOrThrow({
      where: {},
    });

    const department = await prisma.department.findFirstOrThrow({
      where: {},
    });

    const user = await prisma.user.findFirstOrThrow({
      where: {
        role: 'EMPLOYER',
      },
    });
    const payload: any = {
      title: 'Devs',
      vacancy: 5,
      deadline: '2024-12-31T23:59:59.000Z',
      minSalary: 10,
      maxSalary: 600,
      experienceInMonths: 12,
      jobType: 'FULL_TIME',
      minAge: 21,
      jobDescription: 'Develop and maintain software solutions for clients.',
      jobRequirements:
        'Proficiency in JavaScript, React, and Node.js. Strong problem-solving skills.',
      degreeName: 'Computer Science',
      degreeTitle: "Bachelor's Degree",
      compensationBenefits:
        'Health insurance, remote work options, annual bonus.',
      negotiable: true,
      industryId: industry.id,
      departmentId: department.id,
      district: 'Khulna',
      addressLine: 'Khulna,Bangladesh',
      skills: [
        {
          skill: 'JavaScript',
          duration: 6,
        },
        {
          skill: 'React',
          duration: 7,
        },
        {
          skill: 'Next js',
          duration: 12,
        },
      ],
    };
    await JobsServices.createJob(payload, user.id);

    console.log('Job seeding completed');
  } catch (error) {
    console.error('Error seeding job:', error);
  }
};
