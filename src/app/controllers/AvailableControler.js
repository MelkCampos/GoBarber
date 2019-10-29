import { startOfDay,
endOfDay,
setHours,
setMinutes,
setSeconds,
format,
isAfter,
 } from 'date-fns';

import { Op } from 'sequelize';
import Appointment from "../models/Appointments";

class AvailableController {
    async index(req, res) {

      const { date } = req.query;

      if(!date) {
        return res.status(400).json({ error: 'Invalid date'});
      }

      // transformando "date" em inteiro
      const searchDate = Number(date); // ou parseInt(date);

      const appointment = await Appointment.findAll({
        where: {
          provider_id: req.params.providerId,
          canceled_at: null,
          date: {
              [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
          },
        }
      });

      const schedule = [
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',    
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
      ];

       const available = schedule.map(time => {
        // desistruturação para fromação de horário - [ 08:00:00 ]
        const [hour, minute] = time.split(':');
        const value = setSeconds(
          setMinutes(setHours(searchDate, hour), minute), 
          0
          );

          // validações
          return {
            time,
            // formato de data e hora. Exemplo: "2019-10-29T18:00:00-03:00"
            value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
            available: 
            // verificando se o horário ainda há de vir
            isAfter(value, new Date()) &&

            // verificando se o horário está disponivel
            !appointment.find(appointment => 
              format(appointment.date, "HH:mm") === time
            ),
          };
       });

      // Usar para teste: "return res.json(avaiable);""
      return res.json(available);
    }
}

export default new AvailableController();