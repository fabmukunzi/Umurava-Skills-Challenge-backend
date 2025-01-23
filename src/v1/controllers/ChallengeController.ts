import ChallengeService from "../services/ChallengeService";
import catchAsync from "../utils/catchAsync";
import Response from "../utils/response";
import { challengeSchema } from "../validations/Challenge.validation";

export default class ChallengeController {
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
    const updateChallenge = await ChallengeService.update(id, {
      ...data,
      deadline: new Date(data.deadline).toISOString(),
    });
    return Response.success(res, 200, "Updated Challenges", updateChallenge);
  });

  static deleteChallenge = catchAsync(async (req, res) => {
    const { id } = req.params;
    const challenge = await ChallengeService.findById(id);
    if (!challenge) return Response.error(res, 404, "challenge not found");
    const deleted = await ChallengeService.delete(id);
    return Response.success(res, 200, "Deleted Challenge", deleted);
  });
}
