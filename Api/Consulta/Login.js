const express = require('express');
const { createToken, deleteToken } = require('../Token/JWT.js'); // Asegúrate de que la ruta es correcta
const router = express.Router();

// Define el modelo Usuario (mismo que antes)
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT
});

const Usuario = sequelize.define('usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  Correo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Contrasena: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'usuario',
  timestamps: false
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  const { Correo, Contrasena } = req.body;

  try {
    // Busca al usuario en la base de datos
    const usuario = await Usuario.findOne({
      where: { Correo, Contrasena }
    });

    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Define los datos del payload para el token
    const payload = { id: usuario.id, Correo: usuario.Correo };
    const expiration = new Date(new Date().getTime() + 60 * 60 * 1000); // 1 hora en el futuro

    // Crea el token
    const token = createToken(payload, usuario.id, expiration);

    // Responde con el token y el ID del usuario
    res.json({ token, id: usuario.id });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

// Ruta para cerrar sesión
router.post('/logout', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Asumiendo que el token se pasa en el header Authorization
    await deleteToken(token);
    res.status(200).json({ mensaje: 'Sesión cerrada correctamente' });
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    res.status(500).json({ mensaje: 'Error al cerrar sesión' });
  }
});

module.exports = router;
