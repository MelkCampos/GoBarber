import { startOfDay, endOfDay, parseISO } from 'date-fns'
import { Op } from 'sequelize';

import User from '../models/User';
import Appointment from '../models/Appointments';

// lista de agendamentos
class ScheduleController{

  // verificação se o usuário logado é mesmo um provedor de serviços (provider)
  async index(req, res) {
    const checkUserProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if(!checkUserProvider) {
      return res.status(401).json({ error: 'User is not a provider.' });
    }

    const { date } = req.query;
    // parse: analisar
    const parseDate = parseISO(date);

    // utilizar apenas os dias do "date"
    // com foco de mostrar ao cliente o dia PRESENTE.

    const appointment = await Appointment.findAll({
      where: {
        // provider sendo igual ao usuário logado - verificação
        provider_id: req.userId, 
        canceled_at: null,
        date: {
          // listando todos os agendamentos desde o primeiro segundo do dia
          // ao último
          [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)],
        },
      },
      order: ['date'],
    });



    return res.json(appointment);
  }
}

export default new ScheduleController();