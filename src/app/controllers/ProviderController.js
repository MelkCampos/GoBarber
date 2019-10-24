import User from '../models/User';
import File from '../models/File';


class ProviderController {
  async index(req, res) {
    // listagemd e provedores de serviços
    // validação de o usuário está salvo como "provider" no Banco de Dados
    const providers = await User.findAll({
          where: { provider: true },
          attributes: [ 'id', 'name', 'email', 'avatar_id' ],
          include: [
            { 
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url' ],
           }
          ],
      });
    
     return res.json(providers);

  }
}

export default new ProviderController();