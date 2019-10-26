'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('appointments', { 
      id: {

        type: Sequelize.INTEGER,
        allowNull: false, // não permitir valor nulo - "not null"
        autoIncrement: true,
        primaryKey: true,

      },

      // data do agendamento
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },

      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
         // caso "CASCADE" excluiria todo seu historico, caso o usuário excluisse sua conta
        onDelete: 'SET NULL',
        allowNull: true,
      },

      provider_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },

      // caso o agendamento seja cancelado, ele não é excluido do BD.
      // ele continua salvo mais com alguma propiedade "null"
      canceled_at: {
        type: Sequelize.DATE
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
      return queryInterface.dropTable('appointments');
  },
};
