import { z } from 'zod';

const createDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Department Name is Required',
    }),
  }),
});

const DepartmentValidations = {
  createDepartmentValidationSchema,
};
export default DepartmentValidations;
