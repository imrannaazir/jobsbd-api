import { Role } from '@prisma/client';
import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import AppliedJobControllers from './applied-job.controllers';
import AppliedJobValidationSchemas from './applied-job.validations';

const router = Router();

router.post(
  '/apply',
  auth(Role.CANDIDATE),
  validateRequest(AppliedJobValidationSchemas.applyJobValidationSchema),
  AppliedJobControllers.applyJob,
);

router.get(
  '/me',
  auth(Role.CANDIDATE),
  AppliedJobControllers.getAllMyAppliedJobs,
);

router.get(
  '/applicants/:jobId',
  auth(Role.EMPLOYER),
  AppliedJobControllers.getAllApplicantsOfJob,
);

router.patch(
  '/update-status/:appliedJobId',
  auth(Role.EMPLOYER),
  validateRequest(
    AppliedJobValidationSchemas.updateApplyStatusValidationSchema,
  ),
  AppliedJobControllers.updateApplyStatus,
);

const AppliedJobRoutes = router;
export default AppliedJobRoutes;
