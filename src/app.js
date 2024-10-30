const express = require('express');
const connectDB = require('./config/db.js');
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());

// Rotas
app.use('/api/auth', require('./routes/authRoutes.js'));
app.use('/api/user', require('./routes/userRoutes.js'));
app.use('/api/transaction', require('./routes/transactionRoutes.js'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));