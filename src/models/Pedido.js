const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pedidoSchema = new Schema(
    {
        mesa: { type: Number, required: true },
        comanda: [{ type: Schema.Types.ObjectId, ref: 'Plato' }],
        camarero: { type: String, required: true },
        fecha: {type: Date, default: Date.now()},
        estaListo : {type: String, default: "En proceso"}
    },
    {
        timestamps: true,
    }
);

const Pedido = mongoose.model('Pedido', pedidoSchema);
module.exports = Pedido;
