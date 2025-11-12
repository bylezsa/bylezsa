// src/middlewares/auth.js
const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado o mal formado' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

exports.adminOnly = (req, res, next) => {
  if (req.user && ['ADMIN', 'admin'].includes(req.user.role)) return next();
  return res.status(403).json({ message: 'Acceso solo para administradores' });
};
