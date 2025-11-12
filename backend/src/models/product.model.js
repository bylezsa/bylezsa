// src/models/product.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true }, // URL amigable
  description: { type: String, default: '' },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0, min: 0 },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // quién creó el producto
  featured: { type: Boolean, default: false }, // destacado
  onSale: { type: Boolean, default: false },   // en oferta
  discount: { type: Number, default: 0, min: 0, max: 100 }, // % descuento
  images: [{ type: String }],
  tags: [{ type: String }],
}, { timestamps: true });

// Validación: discount solo si onSale es true
productSchema.pre('save', function(next) {
  if (!this.onSale) this.discount = 0;
  next();
});

module.exports = mongoose.model('Product', productSchema);
