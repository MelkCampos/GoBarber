// vai peagr todos os "Models" e mostra-los a aplicação toda
// esse arquivo faz a conectação com o bando de dados e carrega os Models

// conecção com o BD
import Sequelize from 'sequelize';

// importação de "Models"
import User from '../app/models/User';
import File from '../app/models/File';

// pegando configurações do banco de dados
import databaseConfig from '../config/database';

const models = [User, File];

class Database {
  constructor() {
      this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    // pecorrendo Array- ele tem acesso aos arquivos descritos ems eu Array
    models
    .map(model => model.init(this.connection))
    .map(model => model.associate && model.associate(this.connection.models));
    // se o primeiro existir executa o segundo
  }
}


export default new Database();