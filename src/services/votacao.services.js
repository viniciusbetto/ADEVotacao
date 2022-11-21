import { Votacao } from "../models/votacao.js";

export const createVotacaoService = (ano, loginId, candidatoId, data) =>
  Votacao.create({
    ano: ano,
    votante: loginId,
    candidato: candidatoId,
    data: data,
  });
export const findAllVotacaoService = () =>
  Votacao.find().populate("votante").populate("candidato");
export const findVotacaoService = (ano, loginId, candidatoId) =>
  Votacao.find({ ano: ano, votante: loginId, candidato: candidatoId });
export const deleteVotacaoService = id => Votacao.findOneAndDelete({ _id: id });
//export const encerraVotacaoService = () =>
//  Votacao.updateMany({ $set: { datafinal: "11/16/2022" } });
