import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import IndustryServices from './industry.services';

const createIndustry = catchAsync(async (req, res) => {
  const result = await IndustryServices.createIndustry(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Industry Created Successfully',
    data: result,
  });
});
const getAllIndustry = catchAsync(async (req, res) => {
  const result = await IndustryServices.getAllIndustry();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Industry retrieved Successfully',
    data: result,
  });
});
const deleteAIndustry = catchAsync(async (req, res) => {
  const result = await IndustryServices.deleteAIndustry(req.params.industryId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Industry deleted Successfully',
    data: result,
  });
});
const IndustryControllers = {
  createIndustry,
  getAllIndustry,
  deleteAIndustry,
};
export default IndustryControllers;
