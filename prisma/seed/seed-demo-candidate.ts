import httpStatus from 'http-status';
import { hashedPassword } from '../../src/app/modules/auth/auth.utils';
import config from '../../src/config';
import ApiError from '../../src/errors/ApiError';
import prisma from '../../src/shared/prisma';

export const seedDemoCandidate = async () => {
  const email = 'candidate@gmail.com';
  const password = await hashedPassword(config.super_admin.password!);
  const phoneNumber = '+8801403083415';
  try {
    if (!email || !password || !phoneNumber) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Candidate configuration is missing in environment variables',
      );
    }

    await prisma.$transaction(async tx => {
      const user = await tx.user.upsert({
        where: { email, phoneNumber },
        update: {},
        create: {
          email,
          password,
          phoneNumber,
          role: 'CANDIDATE',
          status: 'ACTIVE',
        },
      });

      await tx.candidate.upsert({
        where: {
          userId: user.id,
        },
        update: {},
        create: {
          userId: user.id,
          fullName: 'Demo Candidate',
        },
      });
    });
    console.log('Candidate seeding completed');
  } catch (error) {
    console.error('Error seeding candidate:', error);
  }
};
