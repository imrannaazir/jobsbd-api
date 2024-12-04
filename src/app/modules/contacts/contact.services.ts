import { Contact } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createContact = async (payload: Contact) => {
  const result = await prisma.contact.create({
    data: payload,
  });
  return result;
};

const getAllContacts = async () => {
  const result = await prisma.contact.findMany();
  return result;
};

const deleteContact = async (id: string) => {
  const isContactExists = prisma.contact.findUnique({
    where: {
      id,
    },
  });
  if (!isContactExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Contact not found');
  }
  const result = await prisma.contact.delete({
    where: {
      id,
    },
  });
  return result;
};

const ContactServices = {
  createContact,
  getAllContacts,
  deleteContact,
};
export default ContactServices;
