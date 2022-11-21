import { Router } from "express";
import {
  create,
  findAll,
  findById,
  findByNome,
  update,
  erase,
} from "../controllers/usuario.controller.js";
import { authMiddeleware } from "../middlewares/auth.middleware.js";

export const route = Router();

route.post("/", authMiddeleware, create);
route.get("/", authMiddeleware, findAll);
route.get("/:id", authMiddeleware, findById);
route.get("/usrnome/:nome", authMiddeleware, findByNome);
route.patch("/:id", authMiddeleware, update);
route.delete("/:id", authMiddeleware, erase);
