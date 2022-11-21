import bcrypt from "bcryptjs";
import { generateToken, loginService } from "../services/auth.services.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //Testamos o usuário
    const usuario = await loginService(email);
    if (!usuario) {
      return res.status(404).send({ message: "Usuário ou Senha Inválidos !" });
    }

    //Testamos a senha
    const passwordIsValid = await bcrypt.compare(password, usuario.password);
    if (!passwordIsValid) {
      return res.status(400).send({ message: "Usuário ou Senha Inválidos !" });
    }

    const token = generateToken(usuario.id);

    res.send({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
