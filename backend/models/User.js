import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // Librería para encriptar y comparar contraseñas

// Definición del esquema del modelo de usuario en MongoDB
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Nombre de usuario único
  password: { type: String, required: true }, // Contraseña del usuario
});

// Middleware que se ejecuta antes de guardar el usuario para encriptar la contraseña
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Si la contraseña no se modificó, continúa sin encriptar

  const salt = await bcrypt.genSalt(10); // Genera una "sal" para añadir seguridad
  this.password = await bcrypt.hash(this.password, salt); // Encripta la contraseña usando bcrypt y la "sal"
  next(); // Continúa con la operación de guardado
});

// Método del esquema para comparar contraseñas durante el login
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password); // Compara la contraseña proporcionada con la almacenada
};

// Crea el modelo de usuario a partir del esquema
const User = mongoose.model('User', UserSchema);

// Exportación del modelo para usarlo en otras partes de la aplicación
export default User;