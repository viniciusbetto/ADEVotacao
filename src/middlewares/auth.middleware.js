import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { findByIdUsuarioService } from "../services/usuario.services.js";
dotenv.config();

export const authMiddeleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({ message: "Token não informado" });
    }

    const parts = authHeader.split(" ");

    if (!parts.length === 2) {
      return res.status(401).send({ message: "Token Inexistente" });
    }

    const [schema, token] = parts;

    if (!schema === "Bearer") {
      return res.status(401).send({ message: "Token mal formado" });
    }

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      if (error) {
        return res.status(401).send({ message: "Token Inválido" });
      }

      const usuario = await findByIdUsuarioService(decoded.id);

      if (!usuario || !usuario.id) {
        return res.status(401).send({
          message: "Usuário ou Senha Inválidos. Efetue o Login novamente!!",
        });
      }
      req.loginId = usuario.id;
      next();
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
