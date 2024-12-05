import httpStatus from 'http-status';
import { OptionsFields } from '../../../helpers/paginationHelper';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { CompanyFilterableFields } from './company.constants';
import CompanyServices from './company.services';
import { TCompanyFilters } from './company.types';

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
const getAllCompanies = catchAsync(async (req, res) => {
  const options = pick(req.query, OptionsFields);
  const filters = pick(req.query, CompanyFilterableFields) as TCompanyFilters;
  const result = await CompanyServices.getAllCompanies(filters, options);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All companies retrieved successfully.',
    data: result,
  });
});

const CompanyControllers = { updateCompany, getMyCompany, getAllCompanies };
export default CompanyControllers;
