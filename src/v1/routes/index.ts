import { Router } from "express";

import auth from "./auth.route";
import challenge from "./challenge.route";

const route: Router = Router();

route.use("/auth", auth);
route.use("/challenge", challenge);

route.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

export default route;
