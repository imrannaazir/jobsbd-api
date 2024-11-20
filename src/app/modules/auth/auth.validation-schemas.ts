import { Role } from '@prisma/client';
import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required.',
      })
      .email(),
    password: z.string({
      required_error: 'Password is required.',
    }),
  }),
});

const registerValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required.',
      })
      .email(),
    password: z.string({
      required_error: 'Password is required.',
    }),
    phoneNumber: z.string({
      required_error: 'Phone number is required.',
    }),
    role: z.enum(Object.keys(Role) as [string, ...string[]]),
    companyName: z.string().optional(),
    fullName: z.string().optional(),
  }),
});

const verifyAccountValidationSchema = z.object({
  body: z.object({
    token: z.string({ required_error: 'Token is required.' }),
  }),
});

const AuthValidation = {
  loginValidationSchema,
  registerValidationSchema,
  verifyAccountValidationSchema,
};
export default AuthValidation;
