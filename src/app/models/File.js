import Sequelize, { Model } from 'sequelize';

class File extends Model {

  static init(sequelize) {
    // class pai de 'Model'. Chamando 'init' de 'Model'
    super.init(
      {
    // colonas da base de dados - Cadastramento de novo usuário
    // colocar apenas os tipos.
    
      name: Sequelize.STRING,
      path: Sequelize.STRING,
    
    }, 

      {
        // segundo parâmetro - tem mais configurações a se fazer aqui
        // Exemplo: trocar o nome da tabela.
        sequelize,
      }
    );

    return this;
  }



}

export default File;