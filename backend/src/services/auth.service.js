"use strict";

const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const {
  ACCESS_JWT_SECRET,
  REFRESH_JWT_SECRET,
} = require("../config/configEnv.js");
const { handleError } = require("../utils/errorHandler");

async function login(user) {
  try {
    const { email, password } = user;

    const userFound = await User.findOne({ email })
      .populate("roles")
      .exec();
    if (!userFound) {
      return [null, null, "El usuario y/o contraseña son incorrectos"];
    }

    const matchPassword = await User.comparePassword(password, userFound.password);

    if (!matchPassword) {
      return [null, null, "El usuario y/o contraseña son incorrectos"];
    }

    const accessToken = jwt.sign(
      { email: userFound.email, roles: userFound.roles },
      ACCESS_JWT_SECRET,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      { email: userFound.email },
      REFRESH_JWT_SECRET,
      { expiresIn: "7d" }
    );

    const userId = userFound._id.toString();
    return [userId, accessToken, refreshToken, null];
  } catch (error) {
    handleError(error, "auth.service -> login");
  }
}

async function refresh(cookies) {
  try {
    if (!cookies.jwt) return [null, "No hay autorización"];
    const refreshToken = cookies.jwt;

    const accessToken = await jwt.verify(
      refreshToken,
      REFRESH_JWT_SECRET,
      async (err, user) => {
        if (err) return [null, "La sesión ha caducado, vuelva a iniciar sesión"];

        const userFound = await User.findOne({
          email: user.email,
        })
          .populate("roles")
          .exec();

        if (!userFound) return [null, "Usuario no autorizado"];

        const accessToken = jwt.sign(
          { email: userFound.email, roles: userFound.roles },
          ACCESS_JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );

        return [accessToken, null];
      }
    );

    return accessToken;
  } catch (error) {
    handleError(error, "auth.service -> refresh");
  }
}

module.exports = {
  login,
  refresh,
};
