import { Router } from "express";

import auth from "./auth.route";

const route: Router = Router();

route.use("/auth", auth);

route.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

export default route;
