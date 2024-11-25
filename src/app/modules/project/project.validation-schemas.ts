import { z } from 'zod';

const createProjectValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Project Title is Required',
    }),
    description: z.string({
      required_error: 'Project description is Required',
    }),
    companyName: z.string({}).optional(),
    projectLink: z.string({}).optional(),
    startDate: z.string({
      required_error: 'Start Date is required',
    }),
    endDate: z.string({
      required_error: 'End Date is required',
    }),
    isWorking: z.boolean().default(false),
  }),
});

const updateProjectValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    companyName: z.string().optional(),
    projectLink: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    isWorking: z.boolean().optional(),
  }),
});
const ProjectValidation = {
  createProjectValidationSchema,
  updateProjectValidationSchema,
};
export default ProjectValidation;
