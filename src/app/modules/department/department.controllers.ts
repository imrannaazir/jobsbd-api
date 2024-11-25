import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import DepartmentServices from './department.services';

const createDepartment = catchAsync(async (req, res) => {
  const result = await DepartmentServices.createDepartment(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Department Created Successfully',
    data: result,
  });
});

const getAllDepartment = catchAsync(async (req, res) => {
  const result = await DepartmentServices.getAllDepartment();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department retrieved Successfully',
    data: result,
  });
});

const deleteADepartment = catchAsync(async (req, res) => {
  const result = await DepartmentServices.deleteADepartment(
    req.params.departmentId,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department deleted Successfully',
    data: result,
  });
});

const DepartmentControllers = {
  createDepartment,
  getAllDepartment,
  deleteADepartment,
};
export default DepartmentControllers;
