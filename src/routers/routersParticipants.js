import { Router } from "express";
import {
  getActiveUsers,
  persistUser,
} from "../controllers/participantesController.js";
import validatorSchemas from "../middlewares/validatorShemas.js";
import { schemaNameClient } from "../schemas/schemaNameClient.js";

const routerParticipants = Router();

routerParticipants.post(
  "/participants",
  validatorSchemas(schemaNameClient),
  persistUser
);

routerParticipants.get("/participants", getActiveUsers);
export default routerParticipants;
