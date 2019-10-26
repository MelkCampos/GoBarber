import Sequelize, { Model } from 'sequelize';

class Appointments extends Model {

  static init(sequelize) {
    // class pai de 'Model'. Chamando 'init' de 'Model'
    super.init(
      {
      date: Sequelize.DATE,
      canceled_at: Sequelize.DATE,
    }, 

      {
        // segundo parâmetro - tem mais configurações a se fazer aqui
        // Exemplo: trocar o nome da tabela.
        sequelize,
      }
    );

    return this;
  }

  // associação entre tabelas.
  // metado já sendo chamado no "loader de models", dentro de "index.js"
  static associate(models) {
    // usuário marcando o agendamendo
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });

    // ps: quando uma tabela tem relacionamento 2 vezes com outra tabela, é obrigatorio 
    // dar apelidos (as: apelido_da_tabela) a tabela
  }


}

export default Appointments;