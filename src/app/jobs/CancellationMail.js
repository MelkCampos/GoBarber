import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancelationMail {
  // o "get" permite fazer 'Cancelation.key'
  get key() {
    // para cada "job" é necessarion uma chave unica
    return 'CancelationMail';
  }

  async handle({ data }) {

    const { appointment } = data;

    console.log("A fila executou!");

        // envio de email
      await  Mail.sendMail({
          // Remetente e Destinatario do email
          to: `${appointment.provider.name} <${appointment.provider.email}>`,
          subject: 'Agendamento Cancelado',
          template: 'cancellation',
          context: {
            provider: appointment.provider.name,
            user: appointment.user.name,
            date: format(
                parseISO(appointment.date), "'dia' dd 'de' MMMM', ás' H:mm'h'", {
             locale: pt,
            }),
          },
        });
  }
}

export default new CancelationMail();