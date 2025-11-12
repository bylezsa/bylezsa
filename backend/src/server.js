// src/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectMongo = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

// Rutas
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/users.routes');
const categoryRoutes = require('./routes/categories.routes');
const productRoutes = require('./routes/products.routes');
const orderRoutes = require('./routes/orders.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const statusRoutes = require('./routes/status.routes');

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/status', statusRoutes);

// Middleware de errores
app.use(errorHandler);

// Conexión a MongoDB y levantamiento del servidor
connectMongo().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});
