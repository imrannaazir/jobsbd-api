import { AppliedJob, AppliedJobStatus, NotificationType } from '@prisma/client';
import { IOptions, paginationHelpers } from '../../../helpers/paginationHelper';
import prisma from '../../../shared/prisma';
import NotificationServices from '../notification/notification.services';
import { TNotificationPayload } from '../notification/notification.types';
import { TAppliedJobInput } from './applied-job.types';

const applyJob = async (
  payload: TAppliedJobInput,
  userId: string,
): Promise<AppliedJob> => {
  const candidate = await prisma.candidate.findFirstOrThrow({
    where: {
      userId,
    },
  });

  const job = await prisma.job.findFirstOrThrow({
    where: {
      id: payload.jobId,
    },
    include: {
      company: true,
    },
  });

  const resume = await prisma.resume.findFirstOrThrow({
    where: {
      candidateId: candidate.id,
      isDefault: true,
    },
  });
  const appliedJob = await prisma.appliedJob.create({
    data: {
      resumeId: resume.id,
      candidateId: candidate.id,
      jobId: payload.jobId,
      companyId: job.companyId,
    },
  });

  const notificationPayload: TNotificationPayload = {
    title: 'New Job Application Received',
    message: `You have received a new application for the job post: ${job.title}. Check the candidate's profile now.`,
    type: NotificationType.APPLIED,
    redirectUrl: `/recruiter/dashboard`,
    receiverId: job?.company?.userId,
    senderId: candidate?.userId,
  };

  if (appliedJob.id) {
    await NotificationServices.sendNotification(notificationPayload);
  }

  return appliedJob;
};

const getAllMyAppliedJobs = async (
  userId: string,
  options: IOptions,
): Promise<AppliedJob[]> => {
  const candidate = await prisma.candidate.findFirstOrThrow({
    where: {
      userId,
    },
  });

  const { limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const appliedJobs = await prisma.appliedJob.findMany({
    where: {
      candidateId: candidate.id,
    },
    skip,
    take: limit,
    include: {
      job: {
        include: {
          company: true,
          address: true,
        },
      },
    },
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  return appliedJobs;
};

const getAllApplicantsOfJob = async (jobId: string, userId: string) => {
  const company = await prisma.company.findFirstOrThrow({
    where: {
      userId,
    },
  });

  await prisma.job.findFirstOrThrow({
    where: {
      companyId: company.id,
      id: jobId,
    },
  });

  const appliedJobs = await prisma.appliedJob.findMany({
    where: {
      companyId: company.id,
      jobId,
    },
    include: {
      candidate: {
        include: {
          educations: {
            select: {
              instituteName: true,
            },
          },
          skills: true,
          user: {
            select: {
              phoneNumber: true,
            },
          },
        },
      },
    },
  });
  return appliedJobs;
};

const updateApplyStatus = async (
  appliedJobId: string,
  status: AppliedJobStatus,
  userId: string,
) => {
  const company = await prisma.company.findFirstOrThrow({
    where: {
      userId,
    },
  });

  const appliedJob = await prisma.appliedJob.findFirstOrThrow({
    where: {
      id: appliedJobId,
      companyId: company.id,
    },
    include: {
      job: true,
      candidate: true,
    },
  });

  const updatedAppliedJob = await prisma.appliedJob.update({
    where: {
      id: appliedJob.id,
    },
    data: {
      status,
    },
  });

  if (status !== appliedJob.status) {
    let title: string = '';
    let message: string = '';
    if (updatedAppliedJob?.status === 'ACCEPTED') {
      title = 'Your Application Has Been Accepted';
      message = `Great news! Your application for the job: ${appliedJob?.job?.title} has been accepted by ${company.companyName}. Prepare for the next steps.`;
    } else if (updatedAppliedJob?.status === 'SHORT_LISTED') {
      title = 'You Have Been Shortlisted!';
      message = `Great news! You have been shortlisted for the job: ${appliedJob?.job?.title}. Stay tuned for further updates from ${company.companyName}.`;
    } else if (updatedAppliedJob?.status === 'HIRED') {
      title = 'You’ve Been Hired!';
      message = `Congratulations! You have been hired for the position: ${appliedJob?.job?.title} by ${company.companyName}. Welcome aboard!`;
    } else if (updatedAppliedJob?.status === 'REJECTED') {
      title = 'Application Update: Not Selected';
      message = `We regret to inform you that your application for the job: ${appliedJob?.job?.title} was not selected by ${company.companyName}. Don’t lose hope—keep applying!`;
    }

    const notificationPayload: TNotificationPayload = {
      title,
      message,
      receiverId: appliedJob?.candidate?.userId,
      senderId: company?.userId,
      redirectUrl: '/candidate-dashboard/applied-job',
      type: status as NotificationType,
    };

    await NotificationServices.sendNotification(notificationPayload);
  }

  return updatedAppliedJob;
};

const AppliedJobServices = {
  applyJob,
  getAllMyAppliedJobs,
  getAllApplicantsOfJob,
  updateApplyStatus,
};
export default AppliedJobServices;
