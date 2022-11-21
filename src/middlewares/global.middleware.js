import { loginService } from "../services/auth.services.js";
import mongoose from "mongoose";

export const validId = (req, res, next) => {
  try {
    const id = req.params.loginId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "ID Inválido !" });
    }
    //req.id = id;
    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const validUser = async (req, res, next) => {
  try {
    const id = req.params.loginEmail;
    const usuario = await loginService(id);
    if (!usuario) {
      return res.status(400).send({ message: "Usuário não encontrado" });
    }
    req.id = id;
    req.usuario = usuario;
    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
