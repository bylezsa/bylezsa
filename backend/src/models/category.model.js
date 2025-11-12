// src/models/category.model.js
const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, unique: true },
  description: { type: String, default: '' },
  featured: { type: Boolean, default: false }, // destacado en home
}, { timestamps: true });

// Crear slug automáticamente al guardar
categorySchema.pre('save', function(next) {
  if (!this.slug) this.slug = slugify(this.name, { lower: true, strict: true });
  next();
});

module.exports = mongoose.model('Category', categorySchema);
