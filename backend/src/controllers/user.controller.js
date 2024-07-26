"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");
const UserServices = require("../services/user.service");

async function createUser(req, res) {
  try {
    const { body } = req;
    const [newUser, errorUser] = await UserServices.createUser(body);

    if (errorUser) return respondError(req, res, 400, errorUser);
    respondSuccess(req, res, 201, newUser);
  } catch (error) {
    handleError(error, "user.controller -> createUser");
    respondError(req, res, 500, "No se pudo crear el usuario");
  }
}

async function getUsers(req, res) {
  try {
    const [users, errorUsers] = await UserServices.getUsers();

    if (errorUsers) return respondError(req, res, 400, errorUsers);
    respondSuccess(req, res, 200, users);
  } catch (error) {
    handleError(error, "user.controller -> getUsers");
    respondError(req, res, 500, "No se pudieron obtener los usuarios");
  }
}

async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const [user, errorUser] = await UserServices.getUserById(id);

    if (errorUser) return respondError(req, res, 400, errorUser);
    respondSuccess(req, res, 200, user);
  } catch (error) {
    handleError(error, "user.controller -> getUserById");
    respondError(req, res, 500, "No se pudo obtener el usuario");
  }
}

async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { body } = req;
    const [updatedUser, errorUser] = await UserServices.updateUser(id, body);

    if (errorUser) return respondError(req, res, 400, errorUser);
    respondSuccess(req, res, 200, updatedUser);
  } catch (error) {
    handleError(error, "user.controller -> updateUser");
    respondError(req, res, 500, "No se pudo actualizar el usuario");
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const [deletedUser, errorUser] = await UserServices.deleteUser(id);

    if (errorUser) return respondError(req, res, 400, errorUser);
    respondSuccess(req, res, 200, deletedUser);
  } catch (error) {
    handleError(error, "user.controller -> deleteUser");
    respondError(req, res, 500, "No se pudo eliminar el usuario");
  }
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
