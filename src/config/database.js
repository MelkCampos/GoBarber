require('dotenv/config');

// usasse a sintaxe antiga, pelo fato que o Sequelize irá ler este arquivo
// e ele apenas le essa sintaxemi
module.exports = { 
    // configurando as credenciais
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,

    define: {
       // coluna 'createAt' and 'updateAt' dentro de cada tabela no BD
        timestamps: true, 

        // padrão de escrita do sequelize
        underscored: true,
        underscoredAll: true,
     },
};

