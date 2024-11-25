import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import AddressValidations from './addres.validation-schemas';
import AddressControllers from './address.controllers';

const router = Router();

router.post(
  '/create-address',
  validateRequest(AddressValidations.createAddressValidationSchema),
  AddressControllers.createAddress,
);

const AddressRoute = router;
export default AddressRoute;
