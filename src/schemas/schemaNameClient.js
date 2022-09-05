import Joi from "joi";

export const schemaNameClient = Joi.object({
  name: Joi.string().required(),
});
