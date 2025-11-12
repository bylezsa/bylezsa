// src/controllers/orders.controller.js
const Order = require('../models/order.model');
const Product = require('../models/product.model');
const mongoose = require('mongoose');

exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || !items.length) {
      return res.status(400).json({ message: 'No hay productos en la orden' });
    }

    let total = 0;

    // Validar productos y calcular total
    for (const item of items) {
      if (!mongoose.Types.ObjectId.isValid(item.product)) {
        return res.status(400).json({ message: `ID de producto inválido: ${item.product}` });
      }
      const product = await Product.findById(item.product);
      if (!product) return res.status(404).json({ message: `Producto no encontrado: ${item.product}` });
      total += product.price * item.quantity;
    }

    const order = await Order.create({
      user: req.user.id,
      items,
      total
    });

    res.status(201).json({ message: 'Orden creada', order });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear pedido', error: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product', 'name price');
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener órdenes', error: err.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'ID inválido' });

    const order = await Order.findById(id)
      .populate('user', 'name email')
      .populate('items.product', 'name price');

    if (!order) return res.status(404).json({ message: 'Orden no encontrada' });

    res.json({ order });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener la orden', error: err.message });
  }
};
