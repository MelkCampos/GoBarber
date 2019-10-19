import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {

  static init(sequelize) {
    // class pai de 'Model'. Chamando 'init' de 'Model'
    super.init(
      {
    // colonas da base de dados - Cadastramento de novo usuário
    // colocar apenas os tipos.
    
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.VIRTUAL, // virtual so exisate no código
      password_hash: Sequelize.STRING,
      provider: Sequelize.BOOLEAN,
    }, 

      {
        // segundo parâmetro - tem mais configurações a se fazer aqui
        // Exemplo: trocar o nome da tabela.
        sequelize,
      }
    );

    // funcionalidade do Sequelize
    // ativado atuamaticamente atráves do código

    // antes de salvar o "Novo Usuário", essa função ira rodas
    // obs: existem vários hoks: after, before, beforeUpdate, afterDestroy e etc
    this.addHook('beforeSave', async user => { 
        if(user.password) {
          // o "password_hash" só irá ser gerado quandoe stiver criando um novo usuário
          // no caso de atualizações na conta é gerado um novo "password_hash"

                                          // criptografia da senha
          user.password_hash = await bcrypt.hash(user.password, 8);
        }
    });

    return this;
  }


  // novo metados
  checkPassword(password) {
    // password: senha passada pelo usuario
    // password_hash: senha gravada no banco de dados
    // realiza a comparação entre as duas
    
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;