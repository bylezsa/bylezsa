const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories.controller');
const { auth, adminOnly } = require('../middlewares/auth');

// Listar todas las categorías
router.get('/', categoriesController.getAllCategories);

// Obtener categoría por ID
router.get('/:id', categoriesController.getCategoryById);

// Obtener categorías destacadas (público)
router.get('/featured', categoriesController.getFeatured);

// Obtener categoría por ID o slug (público)
router.get('/:idOrSlug', categoriesController.getByIdOrSlug);

// Crear categoría (solo admin)
router.post('/', auth, adminOnly, categoriesController.createCategory);

// Actualizar categoría (solo admin)
router.put('/:id', auth, adminOnly, categoriesController.updateCategory);

// Eliminar categoría (solo admin)
router.delete('/:id', auth, adminOnly, categoriesController.deleteCategory);

module.exports = router;
