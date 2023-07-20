import express from "express";
import * as userController from "../controllers/userController";

const router = express.Router();

router.get("/getAllStaff", userController.getAllStaff);

export default router;
