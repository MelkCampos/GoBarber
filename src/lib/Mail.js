import nodemailer from 'nodemailer';
import mailConfig from '../config/mail';

// configurações geral de envio de  e-mail.
class Mail{
    constructor() {

      const { host, port, secure, auth } = mailConfig;

      this.transporter = nodemailer.createTransport({
        host, 
        port, 
        secure,
         auth: auth.user ? auth : null, // verificação se há um usuário
      });
    }
}
export default new Mail();