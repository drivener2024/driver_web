"use strict";
const mongoose = require("mongoose");
const { DB_URL } = require("./configEnv");
const { handleError } = require("../utils/errorHandler");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

async function setupDB() {
  try {
    await mongoose.connect(DB_URL, options);
    console.log("=> Conectado a la base de datos");
  } catch (err) {
    handleError(err, "/configDB.js -> setupDB");
  }
}

module.exports = { setupDB };
