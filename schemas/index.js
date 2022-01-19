const Joi = require("joi");

const addUserSchema = Joi.object({
  id: Joi.number().min(1).max(10).required(),
  name: Joi.string().alphanum().min(5).max(8).required(),
});

module.exports = { addUserSchema };
