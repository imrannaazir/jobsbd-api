import { z } from 'zod';

const addResumeValidationSchema = z.object({
  body: z.object({
    url: z.string(),
    file_name: z.string(),
  }),
});

const ResumeValidations = { addResumeValidationSchema };
export default ResumeValidations;
