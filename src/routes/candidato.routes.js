import { Router } from "express";
import { create, findAll, findById, update, erase } from "../controllers/candidato.controller.js";

import { authMiddeleware } from "../middlewares/auth.middleware.js";

export const routeCandidato = Router();

routeCandidato.get("/", authMiddeleware, findAll);
routeCandidato.get("/:id", authMiddeleware, findById)
routeCandidato.post("/", authMiddeleware, create);
routeCandidato.patch("/:id", authMiddeleware, update)
routeCandidato.delete("/:id", authMiddeleware, erase)
