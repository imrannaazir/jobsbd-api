import { Role, User } from '@prisma/client';

export type TLogin = Pick<User, 'email' | 'password'>;
export type TRegister = {
  email: string;
  password: string;
  phoneNumber: string;
  role: Role;
  fullName?: string;
  companyName?: string;
};
