import { z } from 'zod';

const createContactValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z
      .string({
        required_error: 'Name is required',
      })
      .email(),
    message: z.string({
      required_error: 'Message is required',
    }),
  }),
});

const ContactValidations = {
  createContactValidationSchema,
};
export default ContactValidations;
