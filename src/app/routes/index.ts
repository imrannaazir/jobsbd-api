import { Router } from 'express';
import AuthRoutes from '../modules/auth/auth.routes';
import CandidateRoutes from '../modules/candidate/candidate.routes';
import DepartmentRoutes from '../modules/department/department.routes';
import IndustryRoutes from '../modules/industry/industry.routes';

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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
