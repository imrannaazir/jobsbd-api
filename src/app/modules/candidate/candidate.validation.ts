import { EMPLOYMENT_TYPE, JOB_LEVEL } from '@prisma/client';
import { z } from 'zod';

const updateCandidateValidationSchema = z.object({
  body: z.object({
    addressLine: z.string().optional(),
    bio: z.string().optional(),
    currentSalary: z.number().optional(),
    expectedSalary: z.number().optional(),
    district: z.string().optional(),
    employmentType: z
      .enum(Object.keys(EMPLOYMENT_TYPE) as [string, ...string[]])
      .optional(),
    fullName: z.string().optional(),
    jobLevel: z
      .enum(Object.keys(JOB_LEVEL) as [string, ...string[]])
      .optional(),
    resume: z.string().optional(),
    totalExperience: z.number().optional(),
  }),
});

const CandidateValidationSchema = {
  updateCandidateValidationSchema,
};
export default CandidateValidationSchema;
