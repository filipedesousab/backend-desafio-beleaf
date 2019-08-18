const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
  // Checa se ha cabeçalho de autorização
  if(req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization')) {
    try {
      // Verifica o token JWT
      req.user = jwt.verify(req.headers['authorization'], config.JWT_SECRET);
    } catch(err) {
      // Se o token não for válido
      return res.status(401).json({ error: { msg: 'Failed to authenticate token!' }  });
    }
  } else {
    // Se não houver cabeçalho de autorização
    return res.status(401).json({ error: { msg: 'No token!' } });
  }

  next();
  return;
};
