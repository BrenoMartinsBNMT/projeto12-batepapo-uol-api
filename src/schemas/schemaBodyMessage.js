import Joi from "joi";

export const schemaBodyMessage = Joi.object({
  to: Joi.string().required(),
  text: Joi.string().required(),
  type: Joi.string().valid("private_message", "message").required(),
});
