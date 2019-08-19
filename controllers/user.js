const jwt = require('jsonwebtoken');

const config = require('../config');
const userDal = require('../models/dal/user');

module.exports = (router) => {
  router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Checa usuário e senha
    userDal.select(
      { username, password },
      (user) => {
        // Se os dados do login estiverem correto retornará o usuário
        if(user) {
          res.json({
            ...user,
            jwt: jwt.sign({ id: user.id }, config.JWT_SECRET, { expiresIn: 60*60 }),
          });
        } else {
          res.status(401).json({ error: { message: 'Wrong username or password!' } });
        }
      }
    );
  });

  router.post('/insert', (req, res) => {
    const { name, username, password } = req.body;

    // Insere um usuário
    userDal.insert(
      { name, username, password },
      (user) => {
        // Se o cadastro for efetuado com sucesso retornará o usuário
        if(!user.error) {
          res.json({
            ...user,
            jwt: jwt.sign({ id: user.id }, config.JWT_SECRET, { expiresIn: 60*60 }),
          });
        } else if (user.error === 'duplicate') {
          res.status(401).json({ error: { message: 'Duplicate username!' } });
        } else {
          res.status(500).json({ error: { message: 'Failed to register user!' } });
        }
      }
    );
  });

  return router;
};
