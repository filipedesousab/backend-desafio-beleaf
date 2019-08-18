const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');

// Liberar CORS para teste com o frontend em desenvolvimento
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  }
  else {
    next();
  }
});

app.use(bodyParser.json());

// Executa o auth apenas para rotas começando com o "/api/"
app.use('/api', require('./middlewares/auth'));

// Adiciona rota para inserir e alterar marmita
app.use('/api/lunchbox', require('./controllers/lunchBox').insertAndUpdate(router));

// Adiciona rota para selecionar marmita
app.use('/lunchbox/:id', require('./controllers/lunchBox').get);
// Adiciona rota para selecionar todas as marmitas
app.use('/lunchbox', require('./controllers/lunchBox').get);

// Adiciona o controlador para rota do "/login"
app.use('/', require('./controllers/user')(router));

module.exports = app;
