// yarn add nodemailer 
// Nodemailer: usado para o envio de e-mails

export default {
  host: 'smtp.mailtrap.io', //  smtp: protocolo de envio de e-mails
  port: '2525',
  secure: false, // SLL:padrão global em tecnologia de segurança
  // Ele cria um canal criptografado entre um servidor web e um navegador (browser)
  // para garantir que todos os dados transmitidos sejam sigilosos e seguros.
  auth: {
    user: 'cec9c64e5d1a95',
    pass: '06563e9e57224e',
  }, default: {
      fro3m: 'Equipe GoBarber <noreply@gobarber.com>',
  },
}

