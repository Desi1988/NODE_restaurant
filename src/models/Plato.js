const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const platoSchema = new Schema(
    {
        tipo: { type: String, required: true },
        nombre: { type: String, required: true },
        precio: { type: Number, required: true },
        esVegetariano: {type: Boolean, default: false, required: true},
        descripcion: {type: String, required: true},
        foto: {type: String, required: true}
    },
    {
        timestamps: true,
    }
);

const Plato = mongoose.model('Plato', platoSchema);
module.exports = Plato;
