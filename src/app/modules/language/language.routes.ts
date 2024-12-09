import { Role } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { LanguageValidations } from './language.validation-schemas';
import { LanguageController } from './language.controller';

const router = express.Router();

router.get(
  '/all',
  auth(Role.CANDIDATE),
  LanguageController.getCandidateLanguages,
);

router.post(
  '/create-language',
  auth(Role.CANDIDATE),
  validateRequest(LanguageValidations.languageValidationSchema),
  LanguageController.createCandidateLanguage,
);

router.patch(
  '/update-language/:languageId',
  auth(Role.CANDIDATE),
  validateRequest(LanguageValidations.languageUpdateValidationSchema),
  LanguageController.updateCandidateLanguage,
);

router.delete(
  '/delete-language/:languageId',
  auth(Role.CANDIDATE),
  LanguageController.deleteCandidateLanguage,
);

const LanguageRoutes = router;
export default LanguageRoutes;
