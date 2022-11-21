import { Candidatos } from "../models/candidatos.js";

//export const createCandidatoService = body => Candidatos.create(body);
export const createCandidatoService = (cargoId, userId, votos) =>
  Candidatos.create({ cargo: cargoId, usuario: userId, votos: votos });
export const findAllCandidatoService = () =>
  Candidatos.find().populate("cargo").populate("usuario");
export const findExistCandidatoService = (cargo, usuario) =>
  Candidatos.find({ cargo: cargo, usuario: usuario });
export const findByIdCandidatoService = id => Candidatos.findById(id);
export const updateCandidatoService = (id, votos) =>
  Candidatos.findOneAndUpdate({ _id: id }, { $inc: { votos: votos } });
export const deleteCandidatoService = id =>
  Candidatos.findOneAndDelete({ _id: id });
