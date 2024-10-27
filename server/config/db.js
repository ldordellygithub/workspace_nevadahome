const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Cargar configuración desde el archivo .env
dotenv.config();

// Función para conectar la base de datos con Mongoose
const connectDB = async () => {
    try {
        // Almacenar la conexión
        const conn = await mongoose.connect(process.env.MONGO_URI);

        // Mostrar el host de la base de datos a la que te conectaste
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log(`MongoDB Connected: ${conn.connection.port}`)
        
    } catch (error) {
        console.error('Error de conexión a MongoDB:', error.message);
        process.exit(1);  // Detener la aplicación en caso de error de  conexion
    }
};

module.exports = connectDB;
