import prisma from "../../client";
import ChallengeService from "../services/ChallengeService";
import UserService from "../services/UserService";
import catchAsync from "../utils/catchAsync";
import Response from "../utils/response";
import { challengeSchema } from "../validations/Challenge.validation";

export default class ChallengeController {
  static assignChallenge = catchAsync(async (req, res) => {
    const { participantId, challengeId } = req.body;
    // get participants who are working on the challenge
    const challengeData = await ChallengeService.findById(challengeId);
    const assignParticipantToTheChallenge = challengeData?.participantsIDs;

    const userData = await UserService.findUserById(participantId);
    const participantChallenge = userData?.challengeIDs;

    if (
      !assignParticipantToTheChallenge?.includes(participantId) &&
      challengeData?.status === "open"
    ) {
      if (!participantChallenge?.includes(challengeId)) {
        const updateChallenge = await prisma.challenge.update({
          where: { id: challengeId },
          data: { participants: { connect: { id: participantId } } },
        });
        const updateUser = await prisma.user.update({
          where: { id: participantId },
          data: { challenges: { connect: { id: challengeId } } },
        });

        // ✅ Add this success response to ensure a proper return
        return Response.success(res, 200, "Challenge assigned successfully", {
          updateChallenge,
          updateUser,
        });
      }
    }
  });

  static createChallenge = catchAsync(async (req, res) => {
    const data = req.body;
    const { error } = challengeSchema.validate(data);
    if (error) {
      const validationErrors = error.details.map((err) => err.message);
      return Response.error(res, 400, "Validation Error", {
        errors: validationErrors[0].replace(/"/g, ""),
      });
    }
    const titleExist = await ChallengeService.findByName(data.title);
    if (titleExist) {
      return Response.error(
        res,
        409,
        "Challenge with that title already exists",
        {}
      );
    }
    const challenge = await ChallengeService.create({
      ...data,
      deadline: new Date(data.deadline).toISOString(),
    });
    return Response.success(res, 201, "Challenge created", { challenge });
  });

  static getAllChallenges = catchAsync(async (req, res) => {
    const challenges = await ChallengeService.findAll();

    return Response.success(res, 200, "Retrieve Challenges", challenges);
  });

  static getOneChallenge = catchAsync(async (req, res) => {
    const { id } = req.params;
    const challenge = await ChallengeService.findById(id);
    if (!challenge) return Response.error(res, 404, "challenge not found");
    return Response.success(res, 200, "Retrieve Challenges", challenge);
  });

  static updateChallenge = catchAsync(async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const challenge = await ChallengeService.findById(id);
    if (!challenge) return Response.error(res, 404, "challenge not found");
    const updateChallenge = await ChallengeService.update(id, data);
    return Response.success(res, 200, "Updated Challenge", updateChallenge);
  });

  static deleteChallenge = catchAsync(async (req, res) => {
    const { id } = req.params;
    const challenge = await ChallengeService.findById(id);
    if (!challenge) return Response.error(res, 404, "product not found");
    const deleteChallenge = await ChallengeService.delete(id);
    return Response.success(res, 200, "Deleted Challenge", deleteChallenge);
  });

  static deleteAllChallenges = catchAsync(async (req, res) => {
    const challenge = await ChallengeService?.deleteAll();
    return Response.success(res, 200, challenge.message, {});
  });

  static adminAnalytics = catchAsync(async (req, res) => {
    const challenges = await prisma.challenge.count();
    const participants = await prisma.user.findMany({
      include: { _count: { select: { challenges: true } } },
    });
    const participantsNumbers = participants.length;
    const openChallengesNumber = await prisma.challenge.count({
      where: { status: "open" },
    });
    const ongoingChallengesNumber = await prisma.challenge.count({
      where: { status: "ongoing" },
    });
    const completedChallengesNumber = await prisma.challenge.count({
      where: { status: "completed" },
    });

    return Response.success(res, 200, "admin", {
      challenges,
      participantsNumbers,
      openChallengesNumber,
      completedChallengesNumber,
      ongoingChallengesNumber,
    });
  });
}
