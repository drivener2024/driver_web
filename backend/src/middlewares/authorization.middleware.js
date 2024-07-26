"use strict";

const { respondError } = require("../utils/resHandler");

const isAdmin = (req, res, next) => {
  const roles = req.roles;
  if (!roles || !roles.includes("admin")) {
    return respondError(req, res, 403, "No autorizado");
  }
  next();
};

module.exports = { isAdmin };
