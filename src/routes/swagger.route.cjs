import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json"; //assert { type: "json" };

export const routeSwagger = Router();

routeSwagger.use("/", swaggerUi.serve);
routeSwagger.get("/", swaggerUi.setup(swaggerDocument));
