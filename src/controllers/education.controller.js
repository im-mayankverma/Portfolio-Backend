const Education = require("../models/Education");
const { createCrudControllers } = require("./crud.controller");

module.exports = createCrudControllers(Education);