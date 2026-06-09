const Skill = require("../models/Skill");
const { createCrudControllers } = require("./crud.controller");

module.exports = createCrudControllers(Skill);