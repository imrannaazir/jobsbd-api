import { Router } from 'express';
import AuthRoutes from '../modules/auth/auth.routes';
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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
