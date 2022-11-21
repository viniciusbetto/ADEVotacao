import { Router } from "express";
import {
  create,
  findAll,
  erase,
  //  update,
} from "../controllers/votacao.controller.js";

import { authMiddeleware } from "../middlewares/auth.middleware.js";

export const routeVotacao = Router();

routeVotacao.get("/", authMiddeleware, findAll);
routeVotacao.post("/", authMiddeleware, create);
routeVotacao.delete("/:id", authMiddeleware, erase);
//routeVotacao.patch("/", authMiddeleware, update);
