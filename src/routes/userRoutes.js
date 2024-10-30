const express = require('express');
const { consultarSaldo } = require('../controllers/userController.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const router = express.Router();

router.get('/saldo', authMiddleware, consultarSaldo);

module.exports = router;