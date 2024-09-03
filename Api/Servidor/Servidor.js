const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Función para iniciar el servidor
const startServer = () => {
  app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
  });
};

module.exports = { app, startServer };
