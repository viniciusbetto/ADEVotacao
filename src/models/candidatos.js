// CANDIDADOS CONCORRENTES POR CARGO
import mongoose from "mongoose";

const CandidatosSchema = new mongoose.Schema({
  cargo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cargos",
    required: true,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  votos: {
    type: Number,
    required: true,
  },
});

export const Candidatos = mongoose.model("Candidatos", CandidatosSchema);
