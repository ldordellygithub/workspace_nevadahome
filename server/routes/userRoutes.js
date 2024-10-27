const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Ruta protegida para obtener el perfil de usuario
router.get('/profile', authMiddleware, getUserProfile);

// Ruta protegida para actualizar el perfil de usuario con validación de entrada
router.put(
  '/profileUser',
  authMiddleware,
  [
    // Validaciones para los campos de perfil
    body('name').isString().withMessage('El nombre debe ser un texto'),
    body('email').isEmail().withMessage('Debe ser un email válido'),
  ],
  (req, res, next) => {
    // Verificar si hay errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next(); // Pasa al controlador si no hay errores
  },
  updateUserProfile
);

module.exports = router;
