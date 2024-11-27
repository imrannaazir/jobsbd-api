import { z } from 'zod';

const createExperienceValidationSchema = z.object({
  body: z.object({
    designation: z.string({
      required_error: 'Designation is required',
    }),
    companyName: z.string({
      required_error: 'Company name is required',
    }),
    startDate: z.string({
      required_error: 'Start Date is required',
    }),
    endDate: z.string({
      required_error: 'End Date is required',
    }),
    isWorking: z.boolean().default(false),
    industryId: z.string({
      required_error: 'Industry ID is required',
    }),
    jobResponsibilities: z.string({
      required_error: 'Job Responsibility is required',
    }),
    departmentId: z.string({
      required_error: 'Department ID is required',
    }),

    employmentType: z.enum(['FULL_TIME', 'PART_TIME', 'INTERNSHIP'], {
      required_error: 'Employment type is required',
    }),
  }),
});

const updateExperienceValidationSchema = z.object({
  body: z.object({
    designation: z.string().optional(),
    companyName: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    isWorking: z.boolean().optional(),
    industryId: z.string().optional(),
    jobResponsibilities: z.string().optional(),
    departmentId: z.string().optional(),
    employmentType: z.enum(['FULL_TIME', 'PART_TIME', 'INTERNSHIP']).optional(),
    district: z.string().optional(),
    addressLine: z.string().optional(),
  }),
});

const ExperienceValidation = {
  createExperienceValidationSchema,
  updateExperienceValidationSchema,
};

export default ExperienceValidation;
