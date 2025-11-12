// src/config/db.js
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/las_aa_store';

const connectMongo = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB conectado');
  } catch (err) {
    console.error('Error conectando a MongoDB:', err);
    process.exit(1);
  }
};

module.exports = connectMongo;
