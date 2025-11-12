// src/routes/users.routes.js
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const { auth, adminOnly } = require('../middlewares/auth');

// Obtener todos los usuarios (solo admin)
router.get('/', auth, adminOnly, usersController.getAllUsers);

// Obtener usuario por ID (solo admin)
router.get('/:id', auth, adminOnly, usersController.getUserById);

// Actualizar usuario (solo admin)
router.put('/:id', auth, adminOnly, usersController.updateUser);

// Eliminar usuario (solo admin)
router.delete('/:id', auth, adminOnly, usersController.deleteUser);

// Cambiar rol de usuario (solo admin)
router.patch('/:id/role', auth, adminOnly, usersController.changeRole);


module.exports = router;
