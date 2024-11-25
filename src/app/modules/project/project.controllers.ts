import { Request } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import ProjectServices from './project.services';

const createProject = catchAsync(async (req: Request & { user?: any }, res) => {
  const user = req.user.id;
  const result = await ProjectServices.createProject(req.body, user);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Project Created successfully',
    data: result,
    success: true,
  });
});

const getAllProjects = catchAsync(
  async (req: Request & { user?: any }, res) => {
    const user = req.user.id;
    const result = await ProjectServices.getAllProjects(user);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Projects fetched successfully',
      data: result,
      success: true,
    });
  },
);
const getSingleProject = catchAsync(
  async (req: Request & { user?: any }, res) => {
    const { projectId } = req.params;
    const user = req.user.id;
    const result = await ProjectServices.getSingleProject(projectId, user);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Project fetched successfully',
      data: result,
      success: true,
    });
  },
);

const updateProject = catchAsync(async (req: Request, res) => {
  const { projectId } = req.params;
  const result = await ProjectServices.updateProject(projectId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Project updated successfully',
    data: result,
    success: true,
  });
});

const deleteProject = catchAsync(async (req: Request & { user?: any }, res) => {
  const { projectId } = req.params;
  const user = req.user.id;
  const result = await ProjectServices.deleteProject(projectId, user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Project deleted successfully',
    success: true,
    data: result,
  });
});

const ProjectControllers = {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
  getSingleProject,
};

export default ProjectControllers;
