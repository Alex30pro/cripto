const Transaction = require('../models/Transaction.js');
const User = require('../models/User.js');

exports.transferirMoeda = async (req, res) => {
    try {
        const { destinatarioEmail, valor } = req.body;
        const remetente = await User.findById(req.user.id);
        const destinatario = await User.findOne({ email: destinatarioEmail });

        if (!destinatario) return res.status(404).send("Destinatário não encontrado.");
        if (remetente.saldo < valor) return res.status(400).send("Saldo insuficiente.");

        remetente.saldo -= valor;
        destinatario.saldo += valor;

        const transacao = new Transaction({
            remetente: remetente._id,
            destinatario: destinatario._id,
            valor
        });

        await remetente.save();
        await destinatario.save();
        await transacao.save();

        res.json({ mensagem: "Transferência realizada com sucesso!" });
    } catch (err) {
        res.status(500).send("Erro no servidor.");
    }
};

exports.historicoTransacoes = async (req, res) => {
    try {
        const transacoes = await Transaction.find({ remetente: req.user.id })
            .populate("destinatario", "nome email")
            .exec();
        res.json(transacoes);
    } catch (err) {
        res.status(500).send("Erro no servidor.");
    }
};