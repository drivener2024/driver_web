const Joi = require("joi");

const userBodySchema = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "El nombre de usuario no puede estar vacío.",
    "any.required": "El nombre de usuario es obligatorio.",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "El email no puede estar vacío.",
    "string.email": "El email no es válido.",
    "any.required": "El email es obligatorio.",
  }),
  password: Joi.string().required().messages({
    "string.empty": "La contraseña no puede estar vacía.",
    "any.required": "La contraseña es obligatoria.",
  }),
  roles: Joi.string().required().messages({
    "string.empty": "El rol no puede estar vacío.",
    "any.required": "El rol es obligatorio.",
  }),
});

module.exports = { userBodySchema };
