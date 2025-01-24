import { Router } from "express";
import ChallengeController from "../controllers/ChallengeController";
import { errorHandler } from "../middlewares/errorHandler";
import tokenAuthentication from "../middlewares/tokenAuthentication";
import checkRole from "../middlewares/checkRole";

const router = Router();

router.post(
  "/",
  //   [tokenAuthentication, checkRole("admin", "create")],
  ChallengeController.createChallenge
);
router.get("/", ChallengeController.getAllChallenges);
router.get("/:id", ChallengeController.getOneChallenge);
router.put("/:id", ChallengeController.updateChallenge);
router.delete("/:id", ChallengeController.deleteChallenge);

router.use(errorHandler);
export default router;
