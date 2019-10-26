import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import User from '../models/User';
import Appointment from '../models/Appointments';


class AppointmentController {

  // async index(req, res) {
  //   const appointments = await Appointment.findAll({ 
  //      where: { user_id: req.userId , canceled_at: null },
  //      });

  //   return res.json(appointments);
  // }
  
  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    // validação de campos
    if(!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    // recebendo os valores  
    const { provider_id, date } = req.body;

    // validação se o usuário é um provedor de serviços ou não
    const checkIsProvider = await User.findOne({ 
      where: { id: provider_id, provider: true },
     });

     if(!checkIsProvider) {
       return res
       .status(401)
       .json({ error: 'You can only create appointments with providers.'});
     }
    
    
     // configurações de horários na aplicação 

     // parseISO(date) - transfere para um objeto 'date' do javaScript 
     // startOfHour: sempre pega a hora exata. Exemplo:
     // se o usuário passar 19:30, ele transformará para 19:00
     const hourStart = startOfHour(parseISO(date));

     // isBefore: se "hourStart" está - antes - de de new Date()
     // ou seja se a horá passada está antes da data atual.
     // caso o usuário passe uma data passada

     if(isBefore(hourStart, new Date())) {
        return res.status(400).json({ error: 'Past dates are not permitted.' });
     }
     
     // validação se horário já não está sendo usado
     const checkIsAvalilability = await Appointment.findOne({
        where: {
          provider_id, // provider que está criando o agendamento
          canceled_at: null, // se caso for cancelado, tal data se torna disponível
          date: hourStart, 
        },
      });

     if(checkIsAvalilability) {
       return res
       .status(400)
       .json({ error: 'Appointmet date is not available' });
     }


     // criação de um agendamento

    const appointment = await Appointment.create({
       // user_id: usuário que está marcando esse "appointmet".
     // ele é pego de "userId", que é gerado pelo "auth" assim que um usuário é criado
      user_id: req.userId,
      provider_id,
      date: hourStart,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();