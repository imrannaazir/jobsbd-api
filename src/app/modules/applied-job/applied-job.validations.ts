import { z } from 'zod';

const applyJobValidationSchema = z.object({
  body: z.object({
    jobId: z.string(),
    resume: z.string(),
  }),
});

const AppliedJobValidationSchemas = { applyJobValidationSchema };
export default AppliedJobValidationSchemas;
