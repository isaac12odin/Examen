const { createToken, verifyToken } = require('./JWT.js');

// Ejemplo de uso
const payload = { username: 'exampleUser' };
const userId = 1;
const expiration = new Date(new Date().getTime() + 60 * 60 * 1000); // 1 hora en el futuro

// Creación del token y almacenamiento en una variable
createToken(payload, userId, expiration)
  .then(token => {
    console.log('Token creado y almacenado:', token);

    // Ejemplo de verificación
    try {
      const decoded = verifyToken(token);
      console.log('Token verificado:', decoded);
    } catch (error) {
      console.error('Error al verificar el token:', error);
    }
  })
  .catch(error => {
    console.error('Error al crear el token:', error);
  });
