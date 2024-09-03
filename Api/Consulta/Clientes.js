const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const router = express.Router();

// Configura la conexión a la base de datos
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT
});

// Define el modelo Cliente
const Cliente = sequelize.define('Cliente', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  Nombre: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  Apellido_Ma: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  Apellido_Pa: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  Domicilio: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  Correo: {
    type: DataTypes.STRING(100),
    allowNull: true
  }
}, {
  tableName: 'cliente',
  timestamps: false
});

// Ruta para obtener todos los clientes
router.get('/clientes', async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

// Ruta para buscar clientes por nombre
router.get('/clientes/buscar', async (req, res) => {
  const { nombre } = req.query;
  try {
    const clientes = await Cliente.findAll({
      where: {
        Nombre: {
          [Sequelize.Op.like]: `%${nombre}%`
        }
      }
    });
    res.json(clientes);
  } catch (error) {
    console.error('Error al buscar clientes:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

// Ruta para obtener un cliente por ID
router.get('/clientes/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
    res.json(cliente);
  } catch (error) {
    console.error('Error al obtener el cliente:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

// Ruta para agregar un nuevo cliente
router.post('/clientes', async (req, res) => {
  const { Nombre, Apellido_Ma, Apellido_Pa, Domicilio, Correo } = req.body;
  try {
    const nuevoCliente = await Cliente.create({ Nombre, Apellido_Ma, Apellido_Pa, Domicilio, Correo });
    res.status(201).json(nuevoCliente);
  } catch (error) {
    console.error('Error al agregar el cliente:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

// Ruta para actualizar un cliente por ID
router.put('/clientes/:id', async (req, res) => {
  const { Nombre, Apellido_Ma, Apellido_Pa, Domicilio, Correo } = req.body;
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
    await cliente.update({ Nombre, Apellido_Ma, Apellido_Pa, Domicilio, Correo });
    res.json(cliente);
  } catch (error) {
    console.error('Error al actualizar el cliente:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

// Ruta para eliminar un cliente por ID
router.delete('/clientes/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
    await cliente.destroy();
    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error al eliminar el cliente:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

module.exports = router;
