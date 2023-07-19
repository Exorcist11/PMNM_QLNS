import express from "express";
//import staffRouter from "./staffRouter";
const router = express.Router();

let initWebRoutes = (app) => {
  //app.use("/manage-staff/staff", staffRouter);
  app.use("/", router);
};

export default initWebRoutes;
