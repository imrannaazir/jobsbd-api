import { Router } from 'express';
import AuthRoutes from '../modules/auth/auth.routes';
import CandidateRoutes from '../modules/candidate/candidate.routes';

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
    path: '/candidates',
    route: CandidateRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
