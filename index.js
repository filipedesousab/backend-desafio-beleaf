const app = require('./server');
const config = require('./config');

// Iniciar servidor
app.listen(process.env.PORT || config.PORT, () => {
  console.log(`Server started on port ${process.env.PORT || config.PORT}`);
});
