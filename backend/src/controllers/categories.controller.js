// src/controllers/categories.controller.js
const Category = require('../models/category.model');
const slugify = require('slugify');

exports.getAll = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener categorías', error: err.message });
  }
};

exports.getFeatured = async (req, res) => {
  try {
    const categories = await Category.find({ featured: true });
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener categorías destacadas', error: err.message });
  }
};

exports.getByIdOrSlug = async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    let category;

    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      category = await Category.findById(idOrSlug);
    }
    if (!category) category = await Category.findOne({ slug: idOrSlug });

    if (!category) return res.status(404).json({ message: 'Categoría no encontrada' });
    res.json({ category });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener categoría', error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, description, featured } = req.body;
    const category = await Category.create({
      name,
      slug: slugify(name, { lower: true, strict: true }),
      description: description || '',
      featured: featured || false
    });
    res.status(201).json({ message: 'Categoría creada', category });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear categoría', error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    if (updateData.name) updateData.slug = slugify(updateData.name, { lower: true, strict: true });

    const category = await Category.findByIdAndUpdate(id, updateData, { new: true });
    if (!category) return res.status(404).json({ message: 'Categoría no encontrada' });

    res.json({ message: 'Categoría actualizada', category });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar categoría', error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) return res.status(404).json({ message: 'Categoría no encontrada' });
    res.json({ message: 'Categoría eliminada', category });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar categoría', error: err.message });
  }
};
