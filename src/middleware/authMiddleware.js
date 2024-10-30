const jwt = require('jsonwebtoken');
require('dotenv').config();

function authMiddleware(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send("Acesso negado. Token não fornecido.");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).send("Token inválido.");
    }
}

module.exports = authMiddleware;