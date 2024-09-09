const jwt = require('jsonwebtoken');

// Configuración del JWT
const secretKey = process.env.JWT_SECRET || 'Se_declarar_variables_pero_no_mi_amor_por_ELLA!'; // Usa una clave secreta segura
const algorithm = 'HS256'; // Algoritmo para firmar el JWT
const expiresIn = '1h'; // Tiempo de expiración del JWT

// Objeto en memoria para almacenar tokens activos
const activeTokens = {};

/**
 * Crea un JWT y lo guarda en memoria
 * @param {Object} payload - Los datos a incluir en el JWT
 * @param {number} userId - El ID del usuario asociado
 * @param {Date} expiration - La fecha de expiración del token
 * @returns {string} - El token generado
 */
const createToken = (payload, userId, expiration) => {
  try {
    // Crear el JWT
    const token = jwt.sign(payload, secretKey, { algorithm, expiresIn });

    // Guardar el token en memoria
    activeTokens[token] = { userId, expiration };

    return token;
  } catch (error) {
    console.error('Error al crear el token:', error);
    throw new Error('Error al crear el token');
  }
};

/**
 * Verifica si un JWT es válido
 * @param {string} token - El JWT a verificar
 * @returns {Object|null} - El registro del token si es válido, de lo contrario null
 */
const verifyToken = (token) => {
  try {
    // Verificar el token con la clave secreta
    const decoded = jwt.verify(token, secretKey);

    // Verificar si el token existe en memoria y no ha expirado
    const tokenData = activeTokens[token];
    if (tokenData && tokenData.expiration > Date.now()) {
      return decoded; // Token válido
    } else {
      throw new Error('Token no válido o expirado');
    }
  } catch (error) {
    console.error('Error al verificar el token:', error);
    throw new Error('Token no válido');
  }
};

/**
 * Elimina un JWT de la memoria
 * @param {string} token - El JWT a eliminar
 * @returns {boolean} - True si el token fue eliminado, de lo contrario false
 */
const deleteToken = (token) => {
  try {
    if (activeTokens[token]) {
      delete activeTokens[token];
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error al eliminar el token:', error);
    throw new Error('Error al eliminar el token');
  }
};

module.exports = {
  createToken,
  verifyToken,
  deleteToken
};
