import catchAsync from "../utils/catchAsync";

export default class ChallengeController {
  static createChallenge = catchAsync(async (req, res) => {
    const data = req.body;
  });
}
