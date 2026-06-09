const Certificate = require("../models/Certificate");
const { createCrudControllers } = require("./crud.controller");

module.exports = createCrudControllers(Certificate);