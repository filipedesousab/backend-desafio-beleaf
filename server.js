const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');

// Liberar CORS para teste com o frontend em desenvolvimento
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

// Executa o auth apenas para rotas começando com o "/api/"
app.use('/api', require('./middlewares/auth'));

// Adiciona o controlador para rota do "/login"
app.use('/', require('./controllers/user')(router));

module.exports = app;
