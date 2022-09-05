import { Router } from "express";
import { sendMessages } from "../controllers/messagesController.js";
import validatorSchemas from "../middlewares/validatorShemas.js";
import { schemaBodyMessage } from "../schemas/schemaBodyMessage.js";
import { getMessagesWithLimit } from "../controllers/messagesController.js";

const routerMessages = Router();

routerMessages.post(
  "/messages",
  validatorSchemas(schemaBodyMessage),
  sendMessages
);
routerMessages.get("/messages", getMessagesWithLimit);

export default routerMessages;
