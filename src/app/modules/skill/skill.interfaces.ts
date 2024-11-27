import { Skill } from '@prisma/client';

export type TSkillInput = Pick<Skill, 'skill' | 'duration'>;
