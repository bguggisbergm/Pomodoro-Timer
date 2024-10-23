import express from 'express'; // Framework para crear el servidor
import mongoose from 'mongoose'; // ODM para interactuar con MongoDB
import jwt from 'jsonwebtoken'; // Librería para generar y verificar JWT
import cors from 'cors'; // Middleware para permitir solicitudes cross-origin
import bodyParser from 'body-parser'; // Middleware para procesar los cuerpos de las solicitudes
import dotenv from 'dotenv'; // Librería para gestionar variables de entorno
import User from './models/User.js'; // Importa el modelo de usuario

dotenv.config(); // Carga las variables del archivo .env

const app = express(); // Crea una instancia de Express
const PORT = process.env.PORT || 3000; // Toma el puerto de las variables de entorno o usa el 3000

// Configuración de CORS para permitir solicitudes del cliente
app.use(cors({
  origin: 'http://localhost:5173', // Especifica la URL del cliente (en este caso, Vite)
  credentials: true, // Permite el envío de cookies y cabeceras de autenticación
}));

app.use(bodyParser.json()); // Habilita el parseo de JSON en el cuerpo de las solicitudes

// Conectar a MongoDB usando la URI del archivo .env
mongoose.connect(process.env.MONGODB_URI, {
})
  .then(() => console.log('MongoDB connected')) // Mensaje de éxito al conectar con MongoDB
  .catch((err) => console.error('Error al conectar a MongoDB:', err)); // Mensaje de error en caso de fallo

// Ruta para registrar un nuevo usuario
app.post('/register', async (req, res) => {
  const { username, password } = req.body; // Toma el nombre de usuario y contraseña del cuerpo de la solicitud
  try {
    let user = await User.findOne({ username }); // Busca si el usuario ya existe
    if (user) {
      return res.status(400).json({ message: 'Usuario ya existe' }); // Si el usuario ya existe, retorna un error
    }

    // Si no existe, crea un nuevo usuario y lo guarda en la base de datos
    user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'Usuario registrado correctamente' }); // Respuesta de éxito
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error }); // Respuesta de error en caso de fallo del servidor
  }
});

// Ruta para iniciar sesión (login)
app.post('/login', async (req, res) => {
  const { username, password } = req.body; // Toma el nombre de usuario y contraseña del cuerpo de la solicitud
  try {
    const user = await User.findOne({ username }); // Busca al usuario en la base de datos
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' }); // Si no se encuentra, retorna un error
    }

    const isMatch = await user.matchPassword(password); // Compara la contraseña proporcionada con la almacenada
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' }); // Si no coinciden, retorna un error
    }

    // Si la contraseña es correcta, genera un token JWT
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, message: 'Inicio de sesión correcto' }); // Retorna el token al cliente
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error }); // Error del servidor en caso de fallo
  }
});

// Ruta protegida para acceder al reloj Pomodoro (requiere autenticación)
app.get('/pomodoro', verifyToken, (req, res) => {
  res.json({ message: 'Bienvenido al reloj Pomodoro' }); // Respuesta exitosa si el token es válido
});

// Middleware para verificar el token JWT
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization']; // Toma el token de la cabecera de autorización
  if (!authHeader) {
    return res.status(403).json({ message: 'Acceso denegado' }); // Si no hay token, retorna un error
  }

  const token = authHeader.split(' ')[1]; // Extrae el token de la cabecera
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' }); // Si el token no es válido, retorna un error
    }
    req.userId = decoded.id; // Guarda el ID del usuario en la solicitud
    next(); // Pasa al siguiente middleware o ruta
  });
}

// Inicia el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Mensaje de éxito al iniciar el servidor
});