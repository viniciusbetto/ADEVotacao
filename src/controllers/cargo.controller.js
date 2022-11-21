import {
  createCargoService,
  findAllCargoService,
  findByIdCargoService,
  updateCargoService,
  deleteCargoService,
} from "../services/cargo.services.js";

export const create = async (req, res) => {
  try {
    const { nome, titular } = req.body;

    if (!nome || !titular) {
      return res.status(400).send({ message: "Preencha todos os campos" });
    }

    const cargo = await createCargoService(req.body);

    if (!cargo) {
      return res.status(400).send({ message: "Erro criando cargo" });
    }

    return res.status(201).send({
      message: "Cargo criado com sucesso",
      cargo: {
        id: cargo._id,
        nome,
        titular,
      },
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const findAll = async (req, res) => {
  try {
    const cargos = await findAllCargoService();

    if (cargos.length === 0) {
      return res.status(400).send({ message: "Não há cargos cadastrados !" });
    }

    return res.send(cargos);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const findById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ message: "Cargo não selecionado !" });
    }
    const cargo = await findByIdCargoService(id);
    if (!cargo) {
      return res.status(400).send({ message: "Cargo inexistente !" });
    }
    if (cargo._id != id) {
      return res.status(400).send({ message: "Cargo não encontrado !" });
    }
    return res.send(cargo);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const { nome, titular } = req.body;
    const { id } = req.params;

    if (!nome && !titular) {
      return res.status(400).send({
        message: "Digite os dados a serem alterados",
      });
    }

    const cargo = await findByCargoIdService(id);

    // FAZER TESTAR Se é ADM também
    if (cargo._id != id) {
      return res.status(400).send({
        message: "Cargo não encontrado",
      });
    }

    await updateCargoService(id, nome, titular);
    return res.send({ message: "Cargo alterado com sucesso" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const erase = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ message: "Cargo não selecionado !" });
    }
    const cargo = await deleteCargoService(id);
    if (!cargo) {
      return res.status(400).send({ message: "Cargo não encontrado !" });
    }
    if (cargo._id != id) {
      return res.status(400).send({ message: "Cargo com ID inexistente !" });
    }
    return res.status(201).send({ message: "Cargo excluido com cusesso" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
