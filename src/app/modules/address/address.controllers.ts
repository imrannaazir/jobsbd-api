import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import AddressServices from './address.services';

const createAddress = catchAsync(async (req, res) => {
  const result = await AddressServices.createAddress(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    data: result,
    message: 'Address Created Successfully',
  });
});
const AddressControllers = {
  createAddress,
};

export default AddressControllers;
