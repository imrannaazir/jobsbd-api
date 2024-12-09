import { AppliedJobStatus } from '@prisma/client';
import { z } from 'zod';

const applyJobValidationSchema = z.object({
  body: z.object({
    jobId: z.string(),
    resume: z.string().optional(),
  }),
});

const updateApplyStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum(Object.values(AppliedJobStatus) as [string]),
  }),
});
const AppliedJobValidationSchemas = {
  applyJobValidationSchema,
  updateApplyStatusValidationSchema,
};
export default AppliedJobValidationSchemas;
