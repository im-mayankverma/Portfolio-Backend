const Project = require("../models/Project");
const { createCrudControllers } = require("./crud.controller");

module.exports = createCrudControllers(Project);