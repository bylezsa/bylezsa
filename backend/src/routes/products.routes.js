const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller'); 
const { auth, adminOnly } = require('../middlewares/auth');

// Listar productos (público)
router.get('/', productsController.getProducts);

// Obtener producto por ID (público)
router.get('/:id', productsController.getProductById);

// Obtener productos destacados (público)
router.get('/featured', productsController.getFeatured); 

// Obtener productos en oferta (público)
router.get('/onSale', productsController.getOnSale);     

// Obtener producto por ID o slug (público)
router.get('/:idOrSlug', productsController.getByIdOrSlug); 

// Crear producto (solo admin)
router.post('/', auth, adminOnly, productsController.createProduct);

// Actualizar producto (solo admin)
router.put('/:id', auth, adminOnly, productsController.updateProduct);

// Eliminar producto (solo admin)
router.delete('/:id', auth, adminOnly, productsController.removeProduct);

module.exports = router;
