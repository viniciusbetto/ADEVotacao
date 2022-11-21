// CARGOS EXISTENTES A VOTAÇÃO
import mongoose from "mongoose";

const CargosSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  titular: {
    type: String,
    required: true,
    uppercase: true,
  },
});

export const Cargos = mongoose.model("Cargos", CargosSchema);

//export default Cargos;
