const Joi = require("joi");

const addUserSchema = Joi.object({
  name: Joi.string().alphanum().min(5).max(8).required(),
  last_name: Joi.string().alphanum().min(5).max(8).required(),
  email: Joi.string().email().required(),
  phone_number: Joi.string().min(10).max(13).required(),
  is_active: Joi.boolean(),
  salary: Joi.number(),
});

module.exports = { addUserSchema };
