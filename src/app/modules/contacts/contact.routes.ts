import { Role } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import ContactController from './contact.controllers';
import ContactValidations from './contact.validations';

const router = express.Router();

router.post(
  '/create-contact',
  validateRequest(ContactValidations.createContactValidationSchema),
  ContactController.createContact,
);

router.get(
  '/get-all-contacts',
  auth(Role.SUPER_ADMIN, Role.ADMIN),
  ContactController.getAllContacts,
);

router.delete(
  '/delete-contact/:id',
  auth(Role.SUPER_ADMIN, Role.ADMIN),
  ContactController.deleteContact,
);

const ContactRoutes = router;

export default ContactRoutes;
