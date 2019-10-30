// vai peagr todos os "Models" e mostra-los a aplicação toda
// esse arquivo faz a conectação com o bando de dados e carrega os Models

// conecção com o BD
import Sequelize from 'sequelize';
import mongoose from 'mongoose';

// importação de "Models"
import User from '../app/models/User';
import File from '../app/models/File';
import Appointments from '../app/models/Appointments';


// pegando configurações do banco de dados
import databaseConfig from '../config/database';

const models = [User, File, Appointments];

class Database {
  constructor() {
      this.init();
      this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    // pecorrendo Array- ele tem acesso aos arquivos descritos ems eu Array
    models
    .map(model => model.init(this.connection))
    .map(model => model.associate && model.associate(this.connection.models));
    // se o primeiro existir executa o segundo
  }

  mongo() {
    this.mongoConnection = mongoose.connect( process.env.MONGO_URL, { 
      useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true }
    );
  }
}


export default new Database();