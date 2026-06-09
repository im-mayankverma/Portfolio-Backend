const Experience = require("../models/Experience");
const { createCrudControllers } = require("./crud.controller");

module.exports = createCrudControllers(Experience);