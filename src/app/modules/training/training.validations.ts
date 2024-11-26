import { z } from 'zod';

const createTrainingValidationSchema = z.object({
  body: z.object({
    certificateName: z.string(),
    certificateUrl: z.string().optional(),
    description: z.string().optional(),
    duration: z.string(),
    institution: z.string(),
    endDate: z.string(),
    startDate: z.string(),
  }),
});

const updateTrainingValidationSchema = z.object({
  body: z.object({
    certificateName: z.string().optional(),
    certificateUrl: z.string().optional(),
    description: z.string().optional(),
    duration: z.string().optional(),
    institution: z.string().optional(),
    endDate: z.string().optional(),
    startDate: z.string().optional(),
  }),
});

const TrainingValidationSchemas = {
  createTrainingValidationSchema,
  updateTrainingValidationSchema,
};
export default TrainingValidationSchemas;
