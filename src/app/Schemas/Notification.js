// Tabela x Schema
// na tabela cada registro/dados são iguais para todos na tabela

// Schema: Exemplo: um registro salvo por haver um campos "title" e outro não
// também conhecido como "Schema Free".

import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
    // conteúdo da notificação
    content:{
      type: String,
      required: true,
    },
    // usuário provedor de serviços
    user: {
      type: Number,
      required: true,
    },
    // "corpo da notificação" | se já foi lida ou não
    read: {
      type: Boolean,
      required: true,
      default: false, // inicializa como 'false'
    },
    
}, {
  // criação dos campos updated_at e created_at já criados automaticamente
  timestamps: true, 
});

export default mongoose.model('Notification', NotificationSchema);