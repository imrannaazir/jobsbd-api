import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import ContactServices from './contact.services';

const createContact = catchAsync(async (req, res) => {
  const result = await ContactServices.createContact(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Contact created successfully',
    data: result,
    success: true,
  });
});

const getAllContacts = catchAsync(async (req, res) => {
  const result = await ContactServices.getAllContacts();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Contacts retrieved successfully',
    data: result,
    success: true,
  });
});

const deleteContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ContactServices.deleteContact(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Contact deleted successfully',
    data: result,
    success: true,
  });
});

const ContactController = {
  createContact,
  getAllContacts,
  deleteContact,
};
export default ContactController;
