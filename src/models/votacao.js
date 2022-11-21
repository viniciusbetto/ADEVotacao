//CONTROLE DE QUEM VOTOU E EM QUEM VOTOU
import mongoose from "mongoose";

const VotacaoSchema = new mongoose.Schema({
  ano: {
    type: String,
    required: true,
  },
  votante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  candidato: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Candidato",
    required: true,
  },
  data: {
    type: Date,
    required: true,
  },
});

export const Votacao = mongoose.model("Votacao", VotacaoSchema);
