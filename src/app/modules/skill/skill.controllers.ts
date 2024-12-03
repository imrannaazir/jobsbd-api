import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import SkillServices from './skill.services';

const addSkill = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const payload = req.body;
  const result = await SkillServices.addSkill(payload, userId!);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Skill added successfully.',
    data: result,
  });
});
const getAllCandidateSkills = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const result = await SkillServices.getAllCandidateSkills(userId!);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Skill retrieved successfully.',
    data: result,
  });
});
const deleteSkillById = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const skillId = req.params.skillId;
  const result = await SkillServices.deleteSkillById(skillId, userId!);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Skill deleted successfully.',
    data: result,
  });
});
const updateSkill = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const skillId = req.params.skillId;

  const result = await SkillServices.updateSkill(req.body, skillId, userId!);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Skill updated successfully.',
    data: result,
  });
});

const SkillControllers = {
  addSkill,
  getAllCandidateSkills,
  deleteSkillById,
  updateSkill,
};
export default SkillControllers;
