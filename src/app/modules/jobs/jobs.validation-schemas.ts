import { z } from 'zod';

const createJobValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Job Title is required',
    }),
    vacancy: z
      .number({
        required_error: 'Vacancy is required',
      })
      .int()
      .positive('Vacancy must be a positive integer'),
    deadline: z.string({
      required_error: 'Deadline is required',
    }),
    minSalary: z
      .number({
        required_error: 'Minimum salary is required',
      })
      .nonnegative('Minimum salary must be a non-negative number'),
    maxSalary: z
      .number({
        required_error: 'Maximum salary is required',
      })
      .nonnegative('Maximum salary must be a non-negative number'),
    experienceInMonths: z.number({}).int().optional(),
    jobType: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT'], {
      required_error: 'Job type is required',
    }),
    minAge: z.number().int().optional(),
    jobDescription: z.string().optional(),
    jobRequirements: z.string().optional(),
    degreeName: z.string({
      required_error: 'Degree name is required',
    }),
    degreeTitle: z.string({
      required_error: 'Degree title is required',
    }),
    compensationBenefits: z.string().optional(),
    negotiable: z.boolean().default(false),
    industryId: z.string({
      required_error: 'Industry ID is required',
    }),
    departmentId: z.string({
      required_error: 'Department ID is required',
    }),
    district: z.string({
      required_error: 'District is required',
    }),
    addressLine: z.string({
      required_error: 'Address line is required',
    }),
    skills: z
      .array(
        z.object({
          skill: z.string({
            required_error: 'Skill name is required',
          }),
          duration: z
            .number({
              required_error: 'Duration is required',
            })
            .positive('Duration must be a positive number'),
        }),
      )
      .optional(),
  }),
});

const JobValidations = {
  createJobValidationSchema,
};

export default JobValidations;
