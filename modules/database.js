const mysql = require('mysql');

const config = require('../config');

exports.connect = () => {
  // Criar conexão com banco de dados
  const connection = mysql.createConnection({
    host: config.database.host,
    database: config.database.dbname,
    user: config.database.user,
    password: config.database.password,
  });

  return connection;
}
