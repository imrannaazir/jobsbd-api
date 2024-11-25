import { Role } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import ProjectControllers from './project.controllers';
import ProjectValidation from './project.validation-schemas';

const router = express.Router();

router.post(
  '/create-project',
  auth(Role.CANDIDATE),
  validateRequest(ProjectValidation.createProjectValidationSchema),
  ProjectControllers.createProject,
);

router.get('/', auth(Role.CANDIDATE), ProjectControllers.getAllProjects);

router.get(
  '/:projectId',
  auth(Role.CANDIDATE),
  ProjectControllers.getSingleProject,
);

router.put(
  '/:projectId',
  auth(Role.CANDIDATE),
  validateRequest(ProjectValidation.createProjectValidationSchema),
  ProjectControllers.updateProject,
);

router.delete(
  '/:projectId',
  auth(Role.CANDIDATE),
  ProjectControllers.deleteProject,
);

const ProjectRoutes = router;
export default ProjectRoutes;
