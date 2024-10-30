const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    remetente: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    destinatario: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    valor: Number,
    data: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);