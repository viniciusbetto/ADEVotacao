import { Router } from "express";
import { viewApuracao } from "../controllers/apuracao.controller.js"

import { authMiddeleware } from "../middlewares/auth.middleware.js";

export const routeApuracao = Router();

routeApuracao.get("/", authMiddeleware, viewApuracao);
