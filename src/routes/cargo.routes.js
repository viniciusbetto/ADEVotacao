import { Router } from "express";
import {
  create,
  findAll,
  findById,
  update,
  erase,
} from "../controllers/cargo.controller.js";

import { authMiddeleware } from "../middlewares/auth.middleware.js";
//import { validId, validUser } from "../middlewares/global.middleware.js";

export const routeCargo = Router();

routeCargo.post("/", authMiddeleware, create);
routeCargo.get("/", authMiddeleware, findAll);
routeCargo.get("/:id", authMiddeleware, findById);
routeCargo.patch("/:id", authMiddeleware, update);
routeCargo.delete("/:id", authMiddeleware, erase);
