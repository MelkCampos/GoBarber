'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', { 
      id: {

        type: Sequelize.INTEGER,
        allowNull: false, // não permitir valor nulo - "not null"
        autoIncrement: true,
        primaryKey: true,

      },

      name:{
        type: Sequelize.STRING,
        allowNull: false,
      },

      email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // unique key - para não haver e-mails iguais.
      },
    
      password_hash:{
        type: Sequelize.STRING,
        allowNull: false,
      },

      provider:{
        type: Sequelize.BOOLEAN,

        // quando for o provedor de serviço se torna 'TRUE'. 
        defaultValue: false,
        allowNull: false,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

    });
  },

  down: queryInterface => {
      return queryInterface.dropTable('users');
  },
};
