import { Router } from "express";
import tokenAuthentication from "../middlewares/tokenAuthentication";
import checkRole from "../middlewares/checkRole";
import ChallengeController from "../controllers/ChallengeController";
import AuthController from "../controllers/AuthController";

const router = Router();

// router.put("", [tokenAuthentication]);
router.put(
  "/admin/assign_challenge",
  [tokenAuthentication, checkRole("admin", "create")],
  ChallengeController.assignChallenge
);

router.get("/", AuthController.getAllUsers);

export default router;
