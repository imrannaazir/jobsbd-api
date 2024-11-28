import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import CompanyServices from './company.services';

const updateCompany = catchAsync(async (req, res) => {
  const payload = req.body;
  const userId = req.user?.id;
  const result = await CompanyServices.updateCompany(payload, userId!);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Company details updated successfully.',
    data: result,
  });
});

const getMyCompany = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const result = await CompanyServices.getMyCompany(userId!);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Company details retrieved successfully.',
    data: result,
  });
});

const CompanyControllers = { updateCompany, getMyCompany };
export default CompanyControllers;
