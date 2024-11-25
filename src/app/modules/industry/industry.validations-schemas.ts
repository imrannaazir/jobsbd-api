import { z } from 'zod';

const createIndustryValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Industry Name is Required',
    }),
  }),
});

const IndustryValidations = {
  createIndustryValidationSchema,
};
export default IndustryValidations;
