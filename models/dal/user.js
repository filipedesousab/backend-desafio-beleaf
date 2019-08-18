const bcrypt = require('bcrypt');

const database = require('../../modules/database');

// Selecionar usuário para login
exports.select = ({ username, password }, callback = () => {}) => {
  // Iniciar conexão com banco de dados
  const connection = database.connect();

  try {
    connection.query(
      `SELECT * FROM user WHERE username='${username}' LIMIT 1`,
      (error, results) => {
        if (error) throw error;

        if (results.length > 0) {
          // Verifica se a hash cadastrada no banco de dados foi gerada por essa senha
          const pwHash = bcrypt.compareSync(password, results[0].hash);

          if (pwHash) {
            callback({
              id: results[0].user_id,
              name: results[0].name,
              username: results[0].username,
            });
          } else {
            callback(false);
          }
        } else {
          callback(false);
        }
      },
    );
  } finally {
    // Finalizar conexão com banco de dados
    connection.end();
  }
};

// Registrar usuário
exports.insert = ({ name, username, password }, callback = () => {}) => {
  // Iniciar conexão com banco de dados
  const connection = database.connect();

  try {
    // Gera hash a partir da senha
    const hash = bcrypt.hashSync(password, 10);

    connection.query(
      `INSERT INTO user (name, username, hash) VALUES ('${name}', '${username}', '${hash}')`,
      (error, results) => {
        if (error) throw error;

        callback({
          id: results.insertId,
          name,
          username,
        });
      },
    );
  } finally {
    // Finalizar conexão com banco de dados
    connection.end();
  }
};
