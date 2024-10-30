const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    nome: String,
    email: { type: String, unique: true },
    senha: String,
    saldo: { type: Number, default: 0 }
});

// Encriptação da senha
userSchema.pre('save', async function(next) {
    if (!this.isModified('senha')) return next();
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
});

userSchema.methods.compararSenhas = function(senha) {
    return bcrypt.compare(senha, this.senha);
};

module.exports = mongoose.model('User', userSchema);

