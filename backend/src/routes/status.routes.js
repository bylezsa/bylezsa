// src/routes/status.routes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Servidor funcionando correctamente 🚀',
    timestamp: new Date(),
  });
});

module.exports = router;
