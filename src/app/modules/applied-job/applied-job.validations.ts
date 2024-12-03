import { z } from 'zod';

const applyJobValidationSchema = z.object({
  body: z.object({
    jobId: z.string(),
    resume: z.string().optional(),
  }),
});

const AppliedJobValidationSchemas = { applyJobValidationSchema };
export default AppliedJobValidationSchemas;
