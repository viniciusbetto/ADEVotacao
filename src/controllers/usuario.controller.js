import {
  createUsuarioService,
  findAllUsuarioService,
  findByIdUsuarioService,
  findByNomeUsuarioService,
  updateUsuarioService,
  deleteUsuarioService,
} from "../services/usuario.services.js";

export const create = async (req, res) => {
  try {
    const { nome, email, password } = req.body;

    if (!nome || !email || !password) {
      return res.status(400).send({ message: "Preencha todos os campos" });
    }

    const usuario = await createUsuarioService(req.body);

    if (!usuario) {
      return res.status(400).send({ message: "Erro criando usuário" });
    }

    return res.status(201).send({
      message: "Usuário criado com sucesso",
      usuario: {
        id: usuario._id,
        nome,
        email,
        password,
      },
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const findAll = async (req, res) => {
  try {
    const usuarios = await findAllUsuarioService();

    if (usuarios.length === 0) {
      return res.status(400).send({ message: "Não há usuários cadastrados !" });
    }

    return res.send(usuarios);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const findById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ message: "Usuário não selecionado !" });
    }
    const usuario = await findByIdUsuarioService(id);
    if (!usuario) {
      return res.status(400).send({ message: "Usuário não encontrado !" });
    }
    if (usuario._id != id) {
      return res.status(400).send({ message: "Usuário não encontrado !" });
    }
    return res.send(usuario);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const findByNome = async (req, res) => {
  try {
    const nome = req.params.nome;
    if (!nome) {
      return res.status(400).send({ message: "Usuário não selecionado !" });
    }
    const usuario = await findByNomeUsuarioService(nome);
    if (!usuario) {
      return res.status(400).send({ message: "Usuário não encontrado !" });
    }
    return res.send(usuario);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const update = async (req, res) => {
  try {
    let { nome } = req.body;
    const { id } = req.params;

    if (!nome) {
      return res.status(400).send({
        message: "Digite o nome do cargo a ser alterado",
      });
    }

    const usuario = await findByIdUsuarioService(id);

    // FAZER TESTAR Se é ADM também
    if (usuario._id != id) {
      return res.status(400).send({
        message: "Usuário não encontrado",
      });
    }

    await updateUsuarioService(id, nome);
    return res.send({ message: "Usuário alterado com sucesso" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const erase = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ message: "Usuário não selecionado !" });
    }
    const usuario = await deleteUsuarioService(id);
    if (!usuario) {
      return res.status(400).send({ message: "Usuário não encontrado !" });
    }
    if (usuario._id != id) {
      return res.status(400).send({ message: "Usuário com ID inexistente !" });
    }
    return res.status(201).send({ message: "Usuario excluido com susesso" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
