import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { errorHandler } from "../middlewares/errorHandler";

const router = Router();

router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);

router.use(errorHandler);
export default router;
