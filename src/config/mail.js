// yarn add nodemailer 
// Nodemailer: usado para o envio de e-mails

export default {
  host: process.env.MAIL_HOST , //  smtp: protocolo de envio de e-mails
  port: process.env.MAIL_PORT,
  secure: false, // SLL:padrão global em tecnologia de segurança
  // Ele cria um canal criptografado entre um servidor web e um navegador (browser)
  // para garantir que todos os dados transmitidos sejam sigilosos e seguros.
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  }, default: {
      from: 'Equipe GoBarber <noreply@gobarber.com>',
  },
}

