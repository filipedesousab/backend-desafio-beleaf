const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (router) => {
  router.post('/login', (req, res) => {
    // Checa usuário e senha
    if(req.body.username === 'admin' && req.body.password === 'admin') {
      res.json({
        id: 1,
        username: 'admin',
        name: 'Filipe Botelho',
        jwt: jwt.sign({ id: 1 }, config.JWT_SECRET, { expiresIn: 60*60 }),
      });
    } else {
      res.status(401).json({ error: { message: 'Wrong username or password!' } });
    }
  });

  return router;
};
