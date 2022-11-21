import express from "express";
import connectDatabase from "./src/database/db.js";
import dotenv from "dotenv";
import { route } from "./src/routes/usuario.routes.js";
import { authRoute } from "./src/routes/auth.route.js";
import { routeCargo } from "./src/routes/cargo.routes.js";
import { routeCandidato } from "./src/routes/candidato.routes.js";
import { routeVotacao } from "./src/routes/votacao.route.js";
import { routeSwagger } from "./src/routes/swagger.route.js";

import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDatabase();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/usuario", route);
app.use("/cargo", routeCargo);
app.use("/candidato", routeCandidato);
app.use("/votacao", routeVotacao);
app.use("/doc", routeSwagger);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
