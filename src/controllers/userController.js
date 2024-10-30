const User = require('../models/User.js');

exports.consultarSaldo = async (req, res) => {
    try {
        const usuario = await User.findById(req.user.id);
        res.json({ saldo: usuario.saldo });
    } catch (err) {
        res.status(500).send("Erro no servidor.");
    }
};