import httpStatus from 'http-status';
import { hashedPassword } from '../../src/app/modules/auth/auth.utils';
import config from '../../src/config';
import ApiError from '../../src/errors/ApiError';
import prisma from '../../src/shared/prisma';

export const seedDemoEmployer = async () => {
  const email = 'employer@gmail.com';
  const password = await hashedPassword(config.super_admin.password!);
  const phoneNumber = '+8801402490507';
  try {
    if (!email || !password || !phoneNumber) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Employer configuration is missing in environment variables',
      );
    }

    await prisma.user.upsert({
      where: { email, phoneNumber },
      update: {},
      create: {
        email,
        password,
        phoneNumber,
        role: 'EMPLOYER',
        status: 'ACTIVE',
      },
    });

    console.log('Employer seeding completed');
  } catch (error) {
    console.error('Error seeding Employer:', error);
  }
};
