const User = require('../models/user.model');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Listar todos los usuarios (solo admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: err.message });
  }
};

// Obtener usuario por ID (admin o el mismo usuario)
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select('-password');
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    // Solo el mismo usuario o admin puede ver
    if (req.user.id !== id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Acceso denegado' });
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener usuario', error: err.message });
  }
};

// Actualizar usuario (solo admin o mismo usuario)
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    // Solo el mismo usuario o admin puede actualizar
    if (req.user.id !== id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Acceso denegado' });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);
    if (role && req.user.role === 'ADMIN') user.role = role;

    await user.save();
    res.json({ message: 'Usuario actualizado', user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar usuario', error: err.message });
  }
};
// Cambiar role de usuario (solo admin)
exports.changeRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de usuario inválido' });
    }

    if (!role || !['ADMIN', 'CLIENT'].includes(role.toUpperCase())) {
      return res.status(400).json({ message: 'Role inválido. Debe ser ADMIN o CLIENT' });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role: role.toUpperCase() },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    res.json({ message: 'Role actualizado correctamente', user });
  } catch (err) {
    res.status(500).json({ message: 'Error al cambiar role', error: err.message });
  }
};

// Eliminar usuario (solo admin)
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Acceso denegado' });
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    res.json({ message: 'Usuario eliminado', user });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar usuario', error: err.message });
  }
};
