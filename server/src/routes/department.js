import express from "express";
import * as middlewareController from "../controllers/middlewareController";
import * as departmentController from "../controllers/departmentController";

const router = express.Router();

router.get(
  "/getAllDepartment",
  //middlewareController.verifyToken,
  departmentController.getAllDepartment
);
router.post("/createNewDepartment", departmentController.createNewDepartment);
router.put("/:departmentID", departmentController.updateDepartment);
router.delete("/:departmentID", departmentController.deleteDepartment);

export default router;
