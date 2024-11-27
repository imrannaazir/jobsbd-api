import { z } from 'zod';

const socialCreateValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    url: z.string(),
  }),
});
const socialUpdateValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    url: z.string().optional(),
  }),
});

export const SocialValidations = {
  socialCreateValidationSchema,
  socialUpdateValidationSchema,
};
