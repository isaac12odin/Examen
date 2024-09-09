const express = require('express');
const cors = require('cors');
const { app, startServer } = require('./Servidor/Servidor.js');
const { testConnection } = require('./Conexion/Conexion.js');
const loginRoutes = require('./Consulta/Login.js');
const clienteRoutes = require('./Consulta/Clientes.js');
const tokenRoutes = require('./Consulta/Token.js'); // Importa la nueva ruta de verificación de token

// Middleware para JSON y CORS
app.use(express.json());
app.use(cors()); // Habilita CORS

// Verifica la conexión a la base de datos
testConnection();

// Configura las rutas
app.use('/api', loginRoutes);
app.use('/api', clienteRoutes); // Usa las rutas de cliente
app.use('/api', tokenRoutes); // Usa la nueva ruta de verificación de token

// Inicia el servidor
startServer();
