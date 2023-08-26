const express = require("express");
const auth = require("../routes/auth");
const users = require("../routes/users");
const projects = require("../routes/projects");
const gigs = require("../routes/gigs");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/projects", projects);
  app.use("/api/gigs", gigs);
  app.use(error);
};
