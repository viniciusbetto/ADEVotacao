import { User } from "../models/usuarios.js";

export const createUsuarioService = body => User.create(body);
export const findAllUsuarioService = () => User.find();
export const findByIdUsuarioService = id => User.findById(id);
export const findByNomeUsuarioService = nome =>
  User.find({
    nome: { $regex: `${nome || ""}`, $options: "i" },
  }).sort({ nome: 1 });
export const updateUsuarioService = (id, nome) =>
  User.findOneAndUpdate({ _id: id }, { nome });
export const deleteUsuarioService = id => User.findOneAndDelete({ _id: id });
