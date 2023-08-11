import express from "express";
import userRouter from "./user";
import departmentRouter from "./department";
import roleRouter from "./role";
const router = express.Router();

let initWebRoutes = (app) => {
  app.use("/manage-staff", userRouter);
  app.use("/departments", departmentRouter);
  app.use("/roles", roleRouter);
  app.use("/", router);
};

export default initWebRoutes;
