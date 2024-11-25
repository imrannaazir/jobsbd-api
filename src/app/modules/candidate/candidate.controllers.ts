import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import CandidateServices from './candidate.services';

const updateCandidate = catchAsync(async (req, res) => {
  const payload = req.body;
  const userId = req.user?.id;
  const result = await CandidateServices.updateCandidate(payload, userId!);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Candidate updated successfully.',
    data: result,
  });
});
const CandidateControllers = { updateCandidate };

export default CandidateControllers;
