import express from "express";
import * as userController from "../controllers/userController";

const router = express.Router();

router.get("/getAllStaff", userController.getAllStaff);
router.post("/createNewEmp", userController.creatStaff);
router.post("/login", userController.loginUser);
router.delete("/:employeeID", userController.deleteEmployess);

export default router;
