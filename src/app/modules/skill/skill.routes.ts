import { Role } from '@prisma/client';
import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import SkillControllers from './skill.controllers';
import SkillValidationSchemas from './skill.validations';

const router = Router();

router.post(
  '/add',
  auth(Role.CANDIDATE),
  validateRequest(SkillValidationSchemas.addSkillValidationSchema),
  SkillControllers.addSkill,
);
router.get(
  '/all',
  auth(Role.CANDIDATE),
  SkillControllers.getAllCandidateSkills,
);
router.delete(
  '/delete/:skillId',
  auth(Role.CANDIDATE),
  SkillControllers.deleteSkillById,
);
router.patch(
  '/update/:skillId',
  auth(Role.CANDIDATE),
  validateRequest(SkillValidationSchemas.updateSkillValidationSchema),
  SkillControllers.updateSkill,
);

const SkillRoutes = router;
export default SkillRoutes;
