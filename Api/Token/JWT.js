const jwt = require('jsonwebtoken');
const { sequelize } = require('../Conexion/Conexion'); // Asegúrate de tener esta conexión correctamente exportada
const { DataTypes } = require('sequelize');

// Definir el modelo Token
const Token = sequelize.define('token', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  Token: {
    type: DataTypes.TEXT, // Utiliza TEXT para almacenar el JWT como un string largo
    allowNull: false
  },
  id_Usuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Expiracion: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'token', // Nombre de la tabla
  timestamps: false // Desactiva los timestamps
});

// Configuración del JWT
const secretKey = process.env.JWT_SECRET || 'Se_declarar_variables_pero_no_mi_amor_por_ELLA!'; // Usa una clave secreta segura
const algorithm = 'HS256'; // Algoritmo para firmar el JWT
const expiresIn = '1h'; // Tiempo de expiración del JWT

/**
 * Crea un JWT y lo guarda en la base de datos
 * @param {Object} payload - Los datos a incluir en el JWT
 * @param {number} userId - El ID del usuario asociado
 * @param {Date} expiration - La fecha de expiración del token
 * @returns {string} - El token generado
 */
const createToken = async (payload, userId, expiration) => {
  try {
    // Crear el JWT
    const token = jwt.sign(payload, secretKey, { algorithm, expiresIn });

    // Guardar el token en la base de datos
    await Token.create({
      Token: token,
      id_Usuario: userId,
      Expiracion: expiration
    });

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
const verifyToken = async (token) => {
    try {
      // Decodificar el token sin verificar para extraer el payload
      const decoded = jwt.decode(token, { complete: true });
      if (!decoded) throw new Error('Token inválido');
  
      // Buscar el token en la base de datos
      const tokenRecord = await Token.findOne({
        where: { Token: token }
      });
  
      // Verificar si el token existe en la base de datos y si no ha expirado
      if (tokenRecord && new Date(tokenRecord.Expiracion) > new Date()) {
        // Verificar el token con la clave secreta
        jwt.verify(token, secretKey);
        return tokenRecord;
      } else {
        throw new Error('Token no encontrado o expirado');
      }
    } catch (error) {
      console.error('Error al verificar el token:', error);
      throw new Error('Error al verificar el token');
    }
  };
/**
 * Elimina un JWT de la base de datos
 * @param {string} token - El JWT a eliminar
 * @returns {Promise} - Promesa resuelta cuando se elimina el token
 */
const deleteToken = async (token) => {
  try {
    const result = await Token.destroy({
      where: {
        Token: token
      }
    });

    // Devuelve true si se eliminó al menos una fila, de lo contrario false
    return result > 0;
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
