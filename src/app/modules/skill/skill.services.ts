import { Skill } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { TSkillInput } from './skill.interfaces';

const addSkill = async (
  payload: TSkillInput,
  userId: string,
): Promise<Skill> => {
  const candidate = await prisma.candidate.findFirstOrThrow({
    where: {
      userId,
    },
  });

  const skill = await prisma.skill.create({
    data: {
      ...payload,
      candidateId: candidate?.id,
    },
  });

  return skill;
};

const getAllCandidateSkills = async (userId: string): Promise<Skill[]> => {
  const candidate = await prisma.candidate.findFirstOrThrow({
    where: {
      userId,
    },
  });

  const skills = await prisma.skill.findMany({
    where: {
      candidateId: candidate?.id,
    },
  });

  return skills;
};

const deleteSkillById = async (skillId: string, userId: string) => {
  const candidate = await prisma.candidate.findFirstOrThrow({
    where: {
      userId,
    },
  });

  const deletedSkill = await prisma.skill.delete({
    where: {
      id: skillId,
      candidateId: candidate?.id,
    },
  });

  return deletedSkill;
};

const updateSkillDuration = async (
  duration: number,
  skillId: string,
  userId: string,
): Promise<Skill> => {
  const candidate = await prisma.candidate.findFirstOrThrow({
    where: {
      userId,
    },
  });

  const deletedSkill = await prisma.skill.update({
    where: {
      id: skillId,
      candidateId: candidate?.id,
    },
    data: {
      duration,
    },
  });

  return deletedSkill;
};

const SkillServices = {
  addSkill,
  getAllCandidateSkills,
  deleteSkillById,
  updateSkillDuration,
};
export default SkillServices;
