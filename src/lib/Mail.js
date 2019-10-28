import nodemailer from 'nodemailer';

// diretorio do node onde estão os tamplates dos emails
import { resolve } from 'path';

import expressHandle from 'express-handlebars';
import nodemailerHande from 'nodemailer-express-handlebars';
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

      this.configTemplates();
    }

    configTemplates() {

      // caminhos para templates
      const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

      // compile: modo de como será formatada a imagem (email)
      this.transporter.use(
        'compile',
         nodemailerHande({
        viewEngine: expressHandle.create({
            layoutsDir: resolve(viewPath, 'layouts'),
            partialsDir: resolve(viewPath, 'partials'),
            defaultLayout: 'default',
            extname: '.hbs'
        }),
        viewPath,
        extName: '.hbs', 
      }));
    }

    // envio de email
    sendMail(message) {
      return this.transporter.sendMail({
        ...mailConfig.default, //Ex: [ ... ] tudo de mailConfig
        ...message,
      });
    }

}
export default new Mail();