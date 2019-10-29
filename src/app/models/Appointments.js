import Sequelize, { Model } from 'sequelize';
import { isBefore, subHours } from 'date-fns';
 

class Appointments extends Model {

  static init(sequelize) {
    // class pai de 'Model'. Chamando 'init' de 'Model'
    super.init(
      {
      date: Sequelize.DATE,
      canceled_at: Sequelize.DATE,
      past: {
        type: Sequelize.VIRTUAL,    
        get() {
          return isBefore(this.date, new Date());
        },
      },

      cancelable: {
        type: Sequelize.VIRTUAL,

        // [ 1 ] - validando novamente se o horário que o cliente deseja desmarca ja passou.
        // [ 2 ] - E se ainda não estiver passado, se ele está duas horas antes desse horário.
        // [ ps ]: regra de negócio do sistema: O Cancelamento só poderá ser cancelado com
        // no minimo 2 horas de antecedência.

        get() {
          return isBefore(new Date(), subHours(this.date, 2));
        },
      },
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