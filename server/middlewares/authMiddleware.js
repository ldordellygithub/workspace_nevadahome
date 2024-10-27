const admin = require('../config/firebase');

// Middleware de autenticación
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1. Validar que el encabezado Authorization esté presente y tenga el formato correcto.
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no encontrado o inválido' });
  }

  // 2. Extraer el token de la cabecera Authorization.
  const token = authHeader.split(' ')[1];

  // 3. Validar que el token no esté vacío o malformado.
  if (token.length < 20) {  // Longitud arbitraria para tokens malformados
    return res.status(401).json({ message: 'Token inválido o malformado' });
  }

  try {
    // 4. Verificar el token usando Firebase Admin SDK.
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log(decodedToken); // Esto muestra el contenido del token para depuración.

    // 5. Adjuntar los datos del usuario al objeto `req.user` para uso posterior.
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name,           // Solo si 'name' está en el token
      role: decodedToken.role || 'user',  // Rol por defecto en caso de que no esté presente
    };

    // 6. Continuar con el siguiente middleware o controlador.
    next();
  } catch (error) {
    // Registrar el error solo en entorno de desarrollo.
    if (process.env.NODE_ENV === 'development') {
      console.error('Error al verificar el token:', error);
    }
    // 7. Responder con un mensaje de error si el token es inválido o ha expirado.
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

module.exports = authMiddleware;


