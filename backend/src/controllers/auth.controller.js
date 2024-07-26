"use strict";
const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");
const AuthService = require("../services/auth.service");

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const [user, error] = await AuthService.login(email, password);

    if (error) return respondError(req, res, 400, error);
    respondSuccess(req, res, 200, user);
  } catch (error) {
    handleError(error, "auth.controller -> login");
    respondError(req, res, 500, "Error al iniciar sesión");
  }
}

async function logout(req, res) {
  try {
    // Implementa tu lógica de logout aquí
    respondSuccess(req, res, 200, "Logout exitoso");
  } catch (error) {
    handleError(error, "auth.controller -> logout");
    respondError(req, res, 500, "Error al cerrar sesión");
  }
}

async function refresh(req, res) {
  try {
    // Implementa tu lógica de refresh aquí
    respondSuccess(req, res, 200, "Token refrescado exitosamente");
  } catch (error) {
    handleError(error, "auth.controller -> refresh");
    respondError(req, res, 500, "Error al refrescar el token");
  }
}

module.exports = {
  login,
  logout,
  refresh
};
