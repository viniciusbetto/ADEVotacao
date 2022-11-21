import {
  createVotacaoService,
  findAllVotacaoService,
  findVotacaoService,
  deleteVotacaoService,
  //encerraVotacaoService,
} from "../services/votacao.services.js";
//import { findByIdUsuarioService } from "../services/usuario.services.js";
import {
  findByIdCandidatoService,
  updateCandidatoService,
} from "../services/candidato.services.js";

export const create = async (req, res) => {
  //Pegamos no body ano, id do usuario que esta votando, id da candidatura e a data
  const { ano, candidato, data } = req.body;
  const votante = req.loginId;

  if (!ano || !votante || !candidato || !data) {
    return res.status(400).send({ message: "Preencha todos os campos" });
  }

  //Testamos a existencia da candidatura
  const testacandidato = await findByIdCandidatoService(candidato);
  if (!testacandidato) {
    return res.status(400).send({ message: "Candidatura Inexistente !!" });
  }

  //Testamos se o usuario logado já votou no candidato
  const testavoto = await findVotacaoService(ano, votante, candidato);
  if (testavoto.length > 0) {
    return res
      .status(400)
      .send({ message: "Você já votou neste candidato para este cargo!!" });
  }

  //if (testavoto.datafinal < Date.now) {
  //  return res.status(400).send({ message: "Votação já encerrada!!" });
  //}

  const voto = await createVotacaoService(ano, votante, candidato, data);

  if (!voto) {
    return res.status(400).send({ message: "Erro criando registro do Votoo" });
  }

  const somaVoto = await updateCandidatoService(candidato, 1);

  if (!somaVoto) {
    return res
      .status(400)
      .send({ message: "Erro adicionando voto ao candidato" });
  }

  return res.status(201).send({
    message: "Voto inserido com sucesso",
    voto,
  });
};

export const findAll = async (req, res) => {
  try {
    const votos = await findAllVotacaoService();

    if (votos.length === 0) {
      return res.status(400).send({ message: "Não há Votos computados !" });
    }

    return res.send({
      votos,
      /*       results: votos.map(voto => ({
        id: voto._id,
        //votante: voto.usuario.nome,
        cargo: voto.candidato.cargo,
        //candidato: voto.candidato.usuario,
        data: voto.data,
      })),
 */
    });
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
    const voto = await deleteVotacaoService(id);
    if (!voto) {
      return res
        .status(400)
        .send({ message: "Voto do usuário não encontrado !" });
    }
    if (voto._id != id) {
      return res
        .status(400)
        .send({ message: "Voto do usuário com o ID inexistente !" });
    }
    return res.status(201).send({ message: "Voto excluido com cusesso" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const voto = await encerraVotacaoService();
    if (!voto) {
      return res
        .status(400)
        .send({ message: "Não foi possível encerrar a votação !" });
    }
    return res.status(201).send({ message: "Votação encerrada com cusesso" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
