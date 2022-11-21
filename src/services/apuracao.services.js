import { Votacao } from "../models/votacao.js";

export const compoeApuracao = ano => {
  Votacao.find({ ano: ano }).populate(votante).populate(candidato);
};
