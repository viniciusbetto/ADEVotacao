import { Cargos } from "../models/cargos.js";

export const createCargoService = body => Cargos.create(body);
export const findAllCargoService = () => Cargos.find();
export const findByIdCargoService = id => Cargos.findById(id);
export const updateCargoService = (id, nome, titular) =>
  Cargos.findOneAndUpdate({ _id: id }, { nome, titular });
export const deleteCargoService = id => Cargos.findOneAndDelete({ _id: id });
