import { Router } from "express";
import ChallengeController from "../controllers/ChallengeController";
import { errorHandler } from "../middlewares/errorHandler";

const router = Router();

router.post("/", ChallengeController.createChallenge);
router.get("/", ChallengeController.getAllChallenges);
router.get("/:id", ChallengeController.getOneChallenge);
router.put("/:id", ChallengeController.updateChallenge);
router.delete("/:id", ChallengeController.deleteChallenge);

router.use(errorHandler);
export default router;
