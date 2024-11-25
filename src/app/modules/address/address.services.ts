import prisma from '../../../shared/prisma';
import { TAddress } from './address.types';

const createAddress = async (payload: TAddress) => {
  const result = await prisma.address.create({
    data: payload,
  });
  return result;
};

const AddressServices = {
  createAddress,
};
export default AddressServices;
