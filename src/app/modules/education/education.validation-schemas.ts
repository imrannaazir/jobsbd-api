import { z } from 'zod';

export const educationValidationSchema = z.object({
  body: z.object({
    degree: z.string(),
    instituteName: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    currentlyStudying: z.boolean().optional(),
    grade: z.number(),
    fieldOfStudy: z.string(),
  }),
});
export const educationUpdateValidationSchema = z.object({
  body: z.object({
    degree: z.string().optional(),
    instituteName: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    currentlyStudying: z.boolean().optional(),
    grade: z.number().optional(),
    fieldOfStudy: z.string().optional(),
  }),
});

export const EducationValidations = {
  educationValidationSchema,
  educationUpdateValidationSchema,
};
