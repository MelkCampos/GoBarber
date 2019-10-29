import { startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';
import Appointment from "../models/Appointments";

class AvailableController {
    async index(req, res) {

      const { date } = req.query;

      if(!date) {
        return res.status(400).json({ error: 'Ivalid date'});
      }

      // transformando "date" em inteiro
      const searchDate = Number(date); // ou parseInt(date);

      const appointment = await Appointment.findAll({
        where: {
          provider_id: req.appointment.providerId,
          canceled_at: null,
          date: {
              [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
          },
        }
      });

      return res.json(appointment);
    }
}

export default new AvailableController();