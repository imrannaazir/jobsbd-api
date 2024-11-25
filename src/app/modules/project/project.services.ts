import { Project } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createProject = async (payload: Project, userId: string) => {
  const candidate = await prisma.candidate.findUnique({
    where: {
      userId: userId,
    },
  });
  if (!candidate) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Candidate not found');
  }
  const result = await prisma.project.create({
    data: {
      ...payload,
      startDate: new Date(payload.startDate),
      endDate: new Date(payload.endDate),
      candidateId: candidate.id,
    },
  });
  return result;
};

const getAllProjects = async (userId: string) => {
  const candidate = await prisma.candidate.findUnique({
    where: {
      userId: userId,
    },
  });
  if (!candidate) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Candidate not found');
  }

  const projects = await prisma.project.findMany({
    where: {
      candidateId: candidate.id,
    },
  });
  return projects;
};

const getSingleProject = async (projectId: string, userId: string) => {
  const candidate = await prisma.candidate.findUnique({
    where: {
      userId: userId,
    },
  });
  if (!candidate) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Candidate not found');
  }
  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
      candidateId: candidate.id,
    },
  });

  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  return project;
};

const updateProject = async (projectId: string, payload: Project) => {
  const existingProject = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!existingProject) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }

  const updatedProject = await prisma.project.update({
    where: { id: projectId },
    data: {
      ...payload,
      startDate: payload.startDate
        ? new Date(payload.startDate)
        : existingProject.startDate,
      endDate: payload.endDate
        ? new Date(payload.endDate)
        : existingProject.endDate,
    },
  });
  return updatedProject;
};

const deleteProject = async (projectId: string, userId: string) => {
  const candidate = await prisma.candidate.findUnique({
    where: {
      userId: userId,
    },
  });
  if (!candidate) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Candidate not found');
  }
  const existingProject = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!existingProject) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }

  const result = await prisma.project.delete({
    where: { id: projectId, candidateId: candidate.id },
  });
  return result;
};

const ProjectServices = {
  createProject,
  getAllProjects,
  deleteProject,
  updateProject,
  getSingleProject,
};
export default ProjectServices;
