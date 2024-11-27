import { z } from 'zod';

const addSkillValidationSchema = z.object({
  body: z.object({
    skill: z.string(),
    duration: z.number(),
  }),
});
const updateSkillDurationValidationSchema = z.object({
  body: z.object({
    duration: z.number(),
  }),
});

const SkillValidationSchemas = {
  addSkillValidationSchema,
  updateSkillDurationValidationSchema,
};
export default SkillValidationSchemas;
