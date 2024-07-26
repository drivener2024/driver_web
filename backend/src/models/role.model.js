"use strict";
const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Role = mongoose.model("Role", roleSchema);
module.exports = Role;
