import { Training } from '@prisma/client';

export type TTrainingInput = Omit<
  Training,
  'id' | 'candidateId' | 'createdAt' | 'updatedAt'
>;
