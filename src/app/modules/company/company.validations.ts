import { z } from 'zod';

const updateCompanyValidationSchema = z.object({
  body: z.object({
    companyName: z.string(),
    websiteLink: z.string().optional(),
    foundedDate: z
      .string()
      .transform(dateStr => new Date(dateStr))
      .optional(),
    businessType: z.string().optional(),
    numberOfEmployees: z.number().optional(),
    numberOfOffices: z.number().optional(),
    companyDetails: z.string().optional(),
    image: z.string().optional(),
    district: z.string(),
    addressLine: z.string(),
  }),
});

const CompanyValidationSchemas = {
  updateCompanyValidationSchema,
};
export default CompanyValidationSchemas;
