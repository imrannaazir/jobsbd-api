import { z } from 'zod';

const addSkillValidationSchema = z.object({
  body: z.object({
    skill: z.string(),
    duration: z.number(),
  }),
});
const updateSkillValidationSchema = z.object({
  body: z.object({
    duration: z.number().optional(),
    skill: z.string().optional(),
  }),
});

const SkillValidationSchemas = {
  addSkillValidationSchema,
  updateSkillValidationSchema,
};
export default SkillValidationSchemas;
