import User from '../models/User';
import Notification from '../Schemas/Notification';

class NotificationController {

  // Rota só pode ser acessivel por prestadores de serviços
  async index(req, res) {

  const checkIsProvider = await User.findOne({ 
    // id: req.userId: se usuário logado é um prestador de serviços "provider"
    where: { id: req.userId , provider: true },
   });

   if(!checkIsProvider) {
    return res
    .status(401)
    .json({ error: 'Only providers can load notifications'});
  }

  const notifications = await Notification.find({
    user: req.userId,

    // sort = order+
  })
  .sort({ createdAt: 'desc' })
  .limit(20);

    return res.json(notifications);
  }

  async update(req, res) {

  const notification = await Notification.findByIdAndUpdate(
    req.params.id,
    { read: true }, // atualizando notification como visualizada
    { new: true }, // carregar novo arquivo atualizado
    );


    return res.json(notification);
  }

}

export default new NotificationController();