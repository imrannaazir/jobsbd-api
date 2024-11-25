import { z } from 'zod';

const createAddressValidationSchema = z.object({
  body: z.object({
    district: z.string({
      required_error: 'District is Required',
    }),
    addressLine: z.string({
      required_error: 'Address Line is Required',
    }),
  }),
});
const AddressValidations = {
  createAddressValidationSchema,
};
export default AddressValidations;
