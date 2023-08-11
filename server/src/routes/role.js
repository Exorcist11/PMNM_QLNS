import express from "express";
import * as roleController from "../controllers/roleController";

const router = express.Router();
router.post("/createNewRole", roleController.createNewRole);
router.get("/getAllRole", roleController.getAllRole);

export default router;
