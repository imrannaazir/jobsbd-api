import { z } from 'zod';

const toggleSavedJobValidationSchema = z.object({
  body: z.object({
    jobId: z.string(),
  }),
});

const SavedJobValidations = { toggleSavedJobValidationSchema };
export default SavedJobValidations;
