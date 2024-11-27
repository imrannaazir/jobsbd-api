import { z } from 'zod';

const languageValidationSchema = z.object({
  body: z.object({
    language: z.string(),
    proficiency: z.enum(['BASIC', 'FLUENT', 'NATIVE', 'CONVERSATIONAL']),
  }),
});
const languageUpdateValidationSchema = z.object({
  body: z.object({
    language: z.string().optional(),
    proficiency: z
      .enum(['BASIC', 'FLUENT', 'NATIVE', 'CONVERSATIONAL'])
      .optional(),
  }),
});

export const LanguageValidations = {
  languageValidationSchema,
  languageUpdateValidationSchema,
};
