// Verificando se o usário está logado na rota =>
// routes.put('/users', UserController.update);

import jwt from 'jsonwebtoken';
import { promisify } from 'util'; // poder usar função asicrona
import authConfig from '../../config/auth';

export default async (req, res, next) => {

   const authHeader = req.headers.authorization; 

  if(!authHeader) {
    // 401: UNAUTHORIZED -  sem permissão para realizar aquilo. 
    return res.status(401).json({ error: 'Token not provided.' });
  }
  

  // usando a posição 01 do Array apenas
  const [, token] = authHeader.split(' '); // retorando o token

  try {  
    // decoded: condigo criptogrado 'jtw' / id do usuário
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // incluir "id" do usuário no "req"
     req.userId = decoded.id;


    return next();
  } catch(error) {
    return res.status(401).json({ error: 'Token invalid.' });
  }
};