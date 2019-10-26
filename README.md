<p align="center">
  <img width="150" height="100" src="https://github.com/Rocketseat/bootcamp-gostack-desafio-03/raw/master/.github/logo.png">
</p>   
 
 ## :rocket: Sobre o desafio
Aqui iremos começar a desenvolver um novo porjeto, o Gympoint.

Aplicação feita em Express, além de precisar configurar as seguintes ferramentas:

* Sucrase + Nodemon;
* ESLint + Prettier + EditorConfig;
* Sequelize (Utilize PostgreSQL ou MySQL);
* Funcionalidades
Abaixo estão descritas as funcionalidade também usadas.

### 1. Autenticação
Permitir que um usuário se autentique em sua aplicação utilizando e-mail e uma senha.

Crie um usuário administrador utilizando a funcionalidade de seeds do sequelize, essa funcionalidade serve para criarmos registros na base de dados de forma automatizada.

Para criar um seed utilize o comando:

``yarn sequelize seed:generate --name admin-user``
No arquivo gerado na pasta src/database/seeds adicione o código referente à criação de um usuário administrador:

`` const bcrypt = require("bcryptjs");``

``` module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      "users",
      [
        {
          name: "Administrador",
          email: "admin@gympoint.com",
          password_hash: bcrypt.hashSync("123456", 8),
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: () => {}
}; 
```
Agora execute:

``yarn sequelize db:seed:all``
Agora você tem um usuário na sua base de dados, utilize esse usuário para todos logins daqui pra frente.

A autenticação deve ser feita utilizando **JWT**.
Realize a validação dos dados de entrada;
### 2. Cadastro de alunos
Permita que alunos sejam mantidos (cadastrados/atualizados) na aplicação utilizando nome, email, idade, peso e altura.

* Utilize uma nova tabela no banco de dados chamada students.

* O cadastro de alunos só pode ser feito por administradores autenticados na aplicação.

* O aluno não pode se autenticar no sistema, ou seja, não possui senha.

### 📝 Licença
Esse projeto está sob a licença MIT.

