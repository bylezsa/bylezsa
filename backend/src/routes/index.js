// src/routes/index.js
const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const userRoutes = require('./users.routes');
const productRoutes = require('./products.routes');
const categoryRoutes = require('./categories.routes');
const statusRoutes = require('./status.routes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/', statusRoutes);

module.exports = router;
