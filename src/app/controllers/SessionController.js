// imortação de modulo
import jwt from 'jsonwebtoken';

import * as Yup from 'yup'; // pq não exports

import User from '../models/User';

import authConfig from '../../config/auth';

class SessionController {

  async store(req, res) {

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    // verificando se o "req.body" está pegando a validação acima
    if(!(await schema.isValid(req.body))) {

      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if(!user){
      return res.status(400).json({ error: 'User not found.' })
    }

    // verificação se a senha 'NÃO' está correta
    if(!await user.checkPassword(password)) {
    return res.status(401).json({ error: 'Password does not match' });
    }

    // login correto
    const { id, name } = user; // dados do usuário no BD

    return res.json({
      user: {
        id,
        name,
        email,
      },
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn, // o token inspira em 7 dias
        }),
    });

  }
}

export default new SessionController();