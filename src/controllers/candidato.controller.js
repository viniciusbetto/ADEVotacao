import {
  createCandidatoService,
  findAllCandidatoService,
  findExistCandidatoService,
  updateCandidatoService,
  deleteCandidatoService,
  findByIdCandidatoService,
} from "../services/candidato.services.js";
import { findByIdUsuarioService } from "../services/usuario.services.js";
import { findByIdCargoService } from "../services/cargo.services.js";

export const create = async (req, res) => {
  const { cargo, usuario } = req.body;
  const votos = 0;

  if (!cargo || !usuario) {
    return res.status(400).send({ message: "Preencha todos os campos" });
  }

  //Testamos a existencia do cargo
  const testacargo = await findByIdCargoService(cargo);
  if (!testacargo) {
    return res.status(400).send({ message: "Cargo Inválido" });
  }

  //Testamos a existencia do usuario
  const testausr = await findByIdUsuarioService(usuario);
  if (!testausr) {
    return res.status(400).send({ message: "Usuário Inválido" });
  }

  //Testamos se já existe a candidatura
  const testexist = await findExistCandidatoService(cargo, usuario);
  if (testexist.length > 0) {
    return res
      .status(400)
      .send({ message: "Usuário já cadastrado para o cargo" });
  }

  const candidato = await createCandidatoService(cargo, usuario, votos);

  if (!candidato) {
    return res
      .status(400)
      .send({ message: "Erro criando registro do Candidato" });
  }

  return res.status(201).send({
    message: "Candidato inserido com sucesso",
    candidato: { cargo, usuario, votos },
  });
};

export const findById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ message: "Candidatura não selecionado !" });
    }
    const candidato = await findByIdCandidatoService(id);
    if (!candidato) {
      return res.status(400).send({ message: "Candidatura não encontrado !" });
    }
    if (candidato._id != id) {
      return res.status(400).send({ message: "Candidato não encontrado !" });
    }
    return res.send(candidato);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const findAll = async (req, res) => {
  try {
    const candidatos = await findAllCandidatoService();

    if (candidatos.length === 0) {
      return res
        .status(400)
        .send({ message: "Não há candidatos cadastrados !" });
    }

    return res.send({
      candidatos,
      //results: candidatos.map(candidato => ({
      //  id: candidato._id,
      //  cargo: candidato.cargo,
      //  nomecargo: candidato.cargo.nome,
      //  usuario: candidato.usuario,
      //  usuarionome: candidato.usuario.nome,
      //  votos: candidato.votos,
      //})),
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const { votos } = req.body;
    const { id } = req.params;

    if (!votos) {
      return res.status(400).send({
        message: "Digite os dados a serem alterados",
      });
    }

    await updateCandidatoService(id, votos);
    return res.send({ message: "Voto alterado com sucesso" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const erase = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res
        .status(400)
        .send({ message: "Voto do usuário não selecionado !" });
    }
    const candidato = await deleteCandidatoService(id);
    if (!candidato) {
      return res
        .status(400)
        .send({ message: "Voto do usuário não encontrado !" });
    }
    if (candidato._id != id) {
      return res
        .status(400)
        .send({ message: "Voto do usuário com o ID inexistente !" });
    }
    return res.status(201).send({ message: "Candidato excluido com cusesso" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
