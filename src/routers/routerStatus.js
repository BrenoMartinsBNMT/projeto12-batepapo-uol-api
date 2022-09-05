import { Router } from "express";
import { updateStatus } from "../controllers/statusController.js";

const routerStatus = Router();

routerStatus.post("/status", updateStatus);

export default routerStatus;
