const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: String,
  email: { type: String, unique: true },
  password: String,
  rol: { type: String, enum: ['cliente', 'admin'], default: 'cliente' },
  preguntaSeguridad: String,
  respuestaSeguridad: String
});

module.exports = mongoose.model('User', userSchema);
