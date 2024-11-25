import { Router } from 'express';
import AddressRoute from '../modules/address/address.routes';
import AuthRoutes from '../modules/auth/auth.routes';

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
    path: '/address',
    route: AddressRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
