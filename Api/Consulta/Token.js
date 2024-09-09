const express = require('express');
const { verifyToken } = require('../Token/JWT.js'); // Asegúrate de que la ruta es correcta
const router = express.Router();

// Ruta para verificar el token
router.post('/verify-token', async (req, res) => {
  const { token } = req.body;

  try {
    // Verifica el token
    await verifyToken(token);
    res.status(200).json({ message: 'Token válido' });
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.status(401).json({ message: 'Token no válido' });
  }
});

module.exports = router;
