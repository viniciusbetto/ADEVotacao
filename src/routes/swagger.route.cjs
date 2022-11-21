const Router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json"); //assert { type: "json" };

routeSwagger.use("/", swaggerUi.serve);
routeSwagger.get("/", swaggerUi.setup(swaggerDocument));

module.exports = routeSwagger;
