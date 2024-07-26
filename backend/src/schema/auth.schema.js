const Joi = require("joi");

const authLoginBodySchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "El email no puede estar vacío.",
    "string.email": "El email no es válido.",
    "any.required": "El email es obligatorio.",
  }),
  password: Joi.string().required().messages({
    "string.empty": "La contraseña no puede estar vacía.",
    "any.required": "La contraseña es obligatoria.",
  }),
});

module.exports = { authLoginBodySchema };
