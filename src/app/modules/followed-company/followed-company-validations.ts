import { z } from 'zod';

const followCompanyValidationSchema = z.object({
  body: z.object({
    companyId: z.string(),
  }),
});

const FollowedCompanyValidations = {
  followCompanyValidationSchema,
};

export default FollowedCompanyValidations;
