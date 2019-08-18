const app = require('./server');
const config = require('./config');

// Iniciar servidor
app.listen(config.PORT);
