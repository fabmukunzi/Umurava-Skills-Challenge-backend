import { Router } from "express";
import ChallengeController from "../controllers/ChallengeController";
import { errorHandler } from "../middlewares/errorHandler";

const router = Router();

router.post("/signup", ChallengeController.signup);
router.post("/login", ChallengeController.login);

router.use(errorHandler);
export default router;
