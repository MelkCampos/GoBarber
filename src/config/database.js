// usasse a sintaxe antiga, pelo fato que o Sequelize irá ler este arquivo
// e ele apenas le essa sintaxemi
module.exports = { 
    // configurando as credenciais
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'docker',
    database: 'gobarber',

    define: {
       // coluna 'createAt' and 'updateAt' dentro de cada tabela no BD
        timestamps: true, 

        // padrão de escrita do sequelize
        underscored: true,
        underscoredAll: true,
     },
};

