import express from "express";
import { applyTherapist } from "../controllers/therapistController.js";

const therapistRouter = express.Router();

therapistRouter.post("/", applyTherapist);

export default therapistRouter;
