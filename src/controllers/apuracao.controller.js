import { compoeApuracao } from "../services/apuracao.services.js";

export const viewApuracao = async (req, res) => {
  try {
    const apuracao = await compoeApuracao();

    if (apuracao.length === 0) {
      return res.status(400).send({ message: "Não há votação a apurar !" });
    }
    return res.send({
      votos,
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
