const User = require('../models/User');

// Crear o buscar un usuario
const createOrFindUser = async (firebaseUser) => {
  try {
    let user = await User.findOne({ uid: firebaseUser.uid });
    if (!user) {
      user = new User({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.name || 'No Name',
      });
      await user.save();
      console.log('Nuevo usuario creado:', user);
    } else {
      console.log('Usuario encontrado:', user);
    }
    return user;
  } catch (error) {
    console.error('Error al crear o encontrar el usuario:', error);
    throw new Error('Error al crear o encontrar el usuario');
  }
};

// Obtener el perfil del usuario autenticado
const getUserProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({
      uid: user.uid,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    res.status(500).json({ message: 'Error al obtener el perfil del usuario' });
  }
};

// Actualizar perfil del usuario
const updateUserProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    const updatedUser = await user.save();
    res.json({
      uid: updatedUser.uid,
      email: updatedUser.email,
      name: updatedUser.name,
      role: updatedUser.role,
      createdAt: updatedUser.createdAt,
    });
  } catch (error) {
    console.error('Error al actualizar el perfil del usuario:', error);
    res.status(500).json({ message: 'Error al actualizar el perfil del usuario' });
  }
};

module.exports = { createOrFindUser, getUserProfile, updateUserProfile };
