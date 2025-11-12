// src/controllers/products.controller.js
const Product = require('../models/product.model');
const Category = require('../models/category.model');
const mongoose = require('mongoose');
const slugify = require('slugify');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('category', 'name slug')
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json({ products });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener productos', error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
      .populate('category', 'name slug')
      .populate('user', 'name email');
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ product });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener producto', error: err.message });
  }
};

exports.getFeatured = async (req, res) => {
  try {
    const products = await Product.find({ featured: true })
      .populate('category', 'name slug')
      .populate('user', 'name email');
    res.json({ products });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener productos destacados', error: err.message });
  }
};

exports.getOnSale = async (req, res) => {
  try {
    const products = await Product.find({ onSale: true })
      .populate('category', 'name slug')
      .populate('user', 'name email');
    res.json({ products });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener productos en oferta', error: err.message });
  }
};

exports.getByIdOrSlug = async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    let product;

    if (mongoose.Types.ObjectId.isValid(idOrSlug)) {
      product = await Product.findById(idOrSlug)
        .populate('category', 'name slug')
        .populate('user', 'name email');
    } 
    if (!product) {
      product = await Product.findOne({ slug: idOrSlug })
        .populate('category', 'name slug')
        .populate('user', 'name email');
    }

    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ product });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener producto', error: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, featured, onSale, discount, images, tags } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const categoryExists = await Category.findById(category);
    if (!categoryExists) return res.status(404).json({ message: 'Categoría no encontrada' });

    const product = await Product.create({
      name,
      slug: slugify(name, { lower: true, strict: true }),
      description,
      price,
      stock: stock || 0,
      category,
      user: req.user.id,
      featured: featured || false,
      onSale: onSale || false,
      discount: onSale ? discount || 0 : 0,
      images: images || [],
      tags: tags || []
    });

    res.status(201).json({ message: 'Producto creado', product });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear producto', error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (updateData.name) {
      updateData.slug = slugify(updateData.name, { lower: true, strict: true });
    }

    if (updateData.onSale === false) updateData.discount = 0;

    const product = await Product.findByIdAndUpdate(id, updateData, { new: true });
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

    res.json({ message: 'Producto actualizado', product });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar producto', error: err.message });
  }
};

exports.removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado', product });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar producto', error: err.message });
  }
};
