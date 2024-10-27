const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet'); // Añadido para mejorar la seguridad
const compression = require('compression'); // Añadido para optimizar rendimiento
const connectDb = require('./config/db');
const userRoutes = require('./routes/userRoutes'); // Importar las rutas de usuario

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDb();

// Crear una instancia de la aplicación Express
const app = express();

// Middleware para manejar JSON
app.use(express.json());

// Seguridad adicional con Helmet
app.use(helmet());

// Middleware para comprimir las respuestas HTTP
app.use(compression());

// Registro de solicitudes HTTP en modo de desarrollo
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rutas principales
app.use('/api/users', userRoutes); // Integrar las rutas de usuario

// Ruta raíz
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Manejo de rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  res.status(500).json({ message: 'Error en el servidor' });
});

// Definir el puerto
const PORT = process.env.PORT || 5000;



// Iniciar el servidor
try {
  app.listen(PORT, () => {
    console.log(`Server running in mode on port ${PORT}`);
  });
} catch (error) {
  console.error(`Error al iniciar el servidor: ${error.message}`);
  process.exit(1); // Detener el servidor en caso de error
}
