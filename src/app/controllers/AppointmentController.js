import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import User from '../models/User';
import File from '../models/File';
import Appointment from '../models/Appointments';
import Notification from '../Schemas/Notification';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class AppointmentController {
  // listagem de usuários logados, com agendamento não cancelado
  // ordenados por data
  // seleção atributos as serem ixibidos
  // relacionamento com o prestador de serviços
 // e o avatar do "provider" (prestador de serviços)

  async index(req, res) {

    // se não for informado, por padrão o usuário estará na página 1
    const { page = 1 } = req.query;

    const appointments = await Appointment.findAll({ 
       where: { user_id: req.userId , canceled_at: null },
       // ordenação da tabela ( assim como se faz por exemplo em sql )
       order: ['date'], // ordenando por data
       attributes: ['id', 'date', 'past', 'cancelable'],
       limit: 20,
       offset: (page - 1) * 20,
       include: [
         {
            model: User,
            as: 'provider',
            attributes: ['id', 'name'], // dados que quero mostrar.
            include: [
              {
                model: File,
                as: 'avatar',
                attributes: ['id', 'path', 'url'],
                // path é a informação do avatar pego do banco de dados (BD)
              },
            ],
         },
        ],
       });

    return res.json(appointments);
  }
  
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
     
     else if(provider_id == req.userId) {
        return res.status(401).json({ error: 'You can not create a appointment with you.' });
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
      date,
    });


    const user = await User.findByPk(req.userId);
    const formatDate = format( 
      hourStart,
      "'dia' dd 'de' MMMM', ás' H:mm'h'",
      { locale: pt }
    );

    // notificar prestador de serviços
    await Notification.create({ 
      content: `Novo agendamento de ${user.name} para ${formatDate} `,
      user: provider_id,
     });
    

    return res.json(appointment);
  }

  async delete(req, res) {
      // validação: Se o usuário que está tentando excluir o appointment
      // foi o mesmo que o criou

      const appointment = await Appointment.findByPk(req.params.id, {
        include: [{
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        }, 
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        }
      ],
      });

      if(appointment.user_id !== req.userId) {
        return res
        .status(401)
        .json({
        error: "You don't have permission to cancel this appointment." });
      }

      // validação: O usuário só poderá realizar o cancelamento de seu "appointment"
      // até 2h antes. SOMENTE.

                                    // não precissa usar o Parse.ISO()
                                    // pois quandoa "date" está vindo do banco de dados
                                    // ela vêm formatada 
        const dateWithSub = subHours(appointment.date, 2); // diminuindo 2 horas

        if(isBefore(dateWithSub, new Date())) {
          return res
          .status(401)
          .json({ error: 'You can only cancel appointments 2 hours in advance.' });
        }

        // se caso estiver dentre o prazo de 2h
        appointment.canceled_at = new Date();

        await appointment.save();

        await Queue.add(CancellationMail.key, {
              appointment,
        });

    return res.json(appointment);
  }
}

export default new AppointmentController();

