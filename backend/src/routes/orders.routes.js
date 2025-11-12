// src/routes/orders.routes.js
const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders.controller');
const { auth, adminOnly } = require('../middlewares/auth');

// Crear orden (cliente)
router.post('/', auth, ordersController.createOrder);

// Obtener todas las órdenes (admin)
router.get('/', auth, adminOnly, ordersController.getOrders);

// Obtener orden por ID (admin o usuario dueño)
router.get('/:id', auth, ordersController.getOrderById);

module.exports = router;
