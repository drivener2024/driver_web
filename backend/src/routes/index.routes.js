"use strict";
const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes.js");
const userRoutes = require("./user.routes.js");

// Define tus rutas aquí
router.use("/auth", authRoutes);
router.use("/users", userRoutes);

module.exports = router;
