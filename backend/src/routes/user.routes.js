"use strict";
const express = require("express");
const userController = require("../controllers/user.controller.js");
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

const router = express.Router();

// Verifica que los controladores y middlewares estén importados correctamente
if (!userController || !authorizationMiddleware || !authenticationMiddleware) {
  throw new Error("Controladores o middlewares no están correctamente importados");
}

// Ruta de registro de usuario no requiere autenticación
router.post("/register", userController.createUser);

// Aplica el middleware de autenticación a las siguientes rutas
router.use(authenticationMiddleware);

router.get("/", userController.getUsers);
router.post("/", authorizationMiddleware.isAdmin, userController.createUser);
router.get("/:id", userController.getUserById);
router.put("/:id", authorizationMiddleware.isAdmin, userController.updateUser);
router.delete("/:id", authorizationMiddleware.isAdmin, userController.deleteUser);

module.exports = router;

