const express = require('express');
const { transferirMoeda, historicoTransacoes } = require('../controllers/transactionController.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const router = express.Router();

router.post('/transferir', authMiddleware, transferirMoeda);
router.get('/historico', authMiddleware, historicoTransacoes);

module.exports = router;