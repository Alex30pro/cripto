const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signup = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        const novoUsuario = new User({ nome, email, senha });
        await novoUsuario.save();
        res.status(201).json({ mensagem: "Usuário criado com sucesso" });
    } catch (err) {
        res.status(500).send("Erro no servidor.");
    }
};

exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const usuario = await User.findOne({ email });
        if (!usuario || !(await usuario.compararSenhas(senha))) {
            return res.status(400).send("Credenciais inválidas.");
        }
        console.log(process.env.JWT_SECRET)
        const token = jwt.sign({ id: usuario._id }, "leigo" , { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.log(err)
        res.status(500).send("Erro no servidor.");
    }
};