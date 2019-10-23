// imortação de modulo
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import authConfig from '../../config/auth';

import User from '../models/User';

class SessionController {
  async store(req, res) {

    // dados para crianção de um sessão
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required()
    }); 

    // verificando se o "req.body" está pegando a validação acima
    if(!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Falied.' });
    }
    
    const { email, password } = req.body;

    // validação seo email é único e existente no sistema
    const user = await User.findOne({ where: { email } });

    if(!user) {
      return res.status(401).json({ error: 'User not found.' });
    }

    // verificação de senha existe ou se o campo está vazio
    if(!password || !(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    // login correto
    const { id, name } = user; // dados do usuário no BD

    return res.json({
      user: { 
        id,
        name,
        email  
      },
        token: jwt.sign({ id }, authConfig.secret, { 
          expiresIn: authConfig.expiresIn
        }),
    });

  }
}




export default new SessionController();