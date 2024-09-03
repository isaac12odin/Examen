const express = require('express');
const cors = require('cors');
const { app, startServer } = require('./Servidor/Servidor.js');
const { testConnection } = require('./Conexion/Conexion.js');
const loginRoutes = require('./Consulta/Login.js');
const clienteRoutes = require('./Consulta/Clientes.js'); // Importa las rutas de cliente
const { verifyToken } = require('./Token/JWT.js'); // Importa la función verifyToken

// Middleware para JSON y CORS
app.use(express.json());
app.use(cors()); // Habilita CORS

// Verifica la conexión a la base de datos
testConnection();

// Configura las rutas
app.use('/api', loginRoutes);
app.use('/api', clienteRoutes); // Usa las rutas de cliente

// Nueva ruta para verificar el token
app.get('/api/verifyToken', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Suponiendo que el token se pasa en el header Authorization
  
  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }
  
  try {
    const tokenRecord = await verifyToken(token);
    res.status(200).json({ mensaje: 'Token válido', data: tokenRecord });
  } catch (error) {
    res.status(401).json({ mensaje: 'Token no válido o expirado' });
  }
});

// Inicia el servidor
startServer();
