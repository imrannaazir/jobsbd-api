import { Router } from 'express';
import AppliedJobRoutes from '../modules/applied-job/applied-job.routes';
import AuthRoutes from '../modules/auth/auth.routes';
import CandidateRoutes from '../modules/candidate/candidate.routes';
import CompanyRoutes from '../modules/company/company.routes';
import ContactRoutes from '../modules/contacts/contact.routes';
import DepartmentRoutes from '../modules/department/department.routes';
import EducationRoutes from '../modules/education/education.routes';
import ExperienceRoutes from '../modules/experience/experience.routes';
import IndustryRoutes from '../modules/industry/industry.routes';
import JobsRoutes from '../modules/jobs/jobs.routes';
import LanguageRoutes from '../modules/language/language.routes';
import ProjectRoutes from '../modules/project/project.routes';
import SkillRoutes from '../modules/skill/skill.routes';
import SocialRoutes from '../modules/social/social.routes';
import TrainingRoutes from '../modules/training/training.routes';

const router = Router();
type TRouteModule = {
  path: string;
  route: Router;
};
const moduleRoutes: TRouteModule[] = [
  {
    path: '/auth',
    route: AuthRoutes,
  },

  {
    path: '/industry',
    route: IndustryRoutes,
  },
  {
    path: '/candidates',
    route: CandidateRoutes,
  },
  {
    path: '/department',
    route: DepartmentRoutes,
  },
  {
    path: '/project',
    route: ProjectRoutes,
  },
  {
    path: '/trainings',
    route: TrainingRoutes,
  },
  {
    path: '/education',
    route: EducationRoutes,
  },
  {
    path: '/languages',
    route: LanguageRoutes,
  },
  {
    path: '/socials',
    route: SocialRoutes,
  },
  {
    path: '/experience',
    route: ExperienceRoutes,
  },
  {
    path: '/skills',
    route: SkillRoutes,
  },
  {
    path: '/companies',
    route: CompanyRoutes,
  },
  {
    path: '/job',
    route: JobsRoutes,
  },
  {
    path: '/applied-jobs',
    route: AppliedJobRoutes,
  },
  {
    path: '/contacts',
    route: ContactRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
