const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb://localhost:27017/cripto`);
        console.log("MongoDB conectado.");
    } catch (err) {
        console.error("Erro ao conectar com o MongoDB:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;