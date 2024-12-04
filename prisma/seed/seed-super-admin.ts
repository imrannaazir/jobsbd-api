import httpStatus from 'http-status';
import { hashedPassword } from '../../src/app/modules/auth/auth.utils';
import config from '../../src/config';
import ApiError from '../../src/errors/ApiError';
import prisma from '../../src/shared/prisma';

export const seedSuperAdmin = async () => {
  const email = config.super_admin.email;
  const password = await hashedPassword(config.super_admin.password!);
  const phoneNumber = config.super_admin.phone_number;
  try {
    if (!email || !password || !phoneNumber) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'SUPER_ADMIN configuration is missing in environment variables',
      );
    }

    await prisma.user.upsert({
      where: { email, phoneNumber },
      update: {},
      create: {
        email,
        password,
        phoneNumber,
        role: 'SUPER_ADMIN',
        status: 'ACTIVE',
      },
    });

    console.log('SUPER_ADMIN seeding completed');
  } catch (error) {
    console.error('Error seeding SUPER_ADMIN:', error);
  }
};
