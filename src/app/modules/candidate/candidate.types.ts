import { Candidate } from '@prisma/client';

export type CandidateUpdatePayload = Partial<
  Omit<Candidate, 'id' | 'userId'>
> & {
  addressLine?: string;
  district?: string;
};
