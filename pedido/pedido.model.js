const mongoose = require("mongoose");

const schemaPedido = new mongoose.Schema({
    estado: {type: String, default: "En proceso", required: true},
    idSeller: {type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true},
    idBuyer: {type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true},
    idBooks: [{type: mongoose.Schema.Types.ObjectId, ref: "Libro", required: true}],
    borrado: {type: Date, default: null}
    }, {
    versionKey: false,
    timestamps: true,
});

const Model = mongoose.model('Pedido', schemaPedido);

module.exports = Model;