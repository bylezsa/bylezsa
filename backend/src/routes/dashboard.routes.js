const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');
const { auth } = require('../middlewares/auth');
const { adminOnly } = require('../middlewares/adminOnly');

router.get('/metrics', auth, adminOnly, dashboardController.metrics);

module.exports = router;
