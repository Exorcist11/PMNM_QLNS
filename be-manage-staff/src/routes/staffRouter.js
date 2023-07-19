import express from "express";
import * as staffController from "../controllers/staffController";
const router = express.Router();

router.get("/get-staff", staffController.createStaff);
export default router;
