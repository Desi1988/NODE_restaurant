const express = require('express');
const Plato = require('../models/Plato');

const platosRouter = express.Router();

platosRouter.post('/',  (req, res) => {
    const tipo = req.body.tipo;
    const nombre = req.body.nombre;
    const precio = req.body.precio;
    const esVegetariano = req.body.esVegetariano;
    const descripcion = req.body.descripcion;
    const foto = req.body.foto;

    const plato = new Plato()

    plato.tipo = tipo;
    plato.nombre = nombre;
    plato.precio = precio;
    plato.esVegetariano = esVegetariano;
    plato.descripcion = descripcion;
    plato.foto = foto;

    plato.save()
        .then((newPlato)=> {
            res.json(newPlato);
        })
        .catch((error)=> {
            res.status(500).send(error);
        })
});

platosRouter.get('/', (req, res) => {
    Plato.find({}, {__v: 0, createdAt: 0, updatedAt: 0})
        .then((platos)=>{
            res.send(platos)
        })
        .catch((error)=>{
            res.status(500).send(error)
        })
});

platosRouter.get('/:id', (req, res)=> {
    const id = req.params.id;
    Plato.findById(id, {__v: 0, updatedAt: 0, createdAt: 0})
        .then((plato)=> {
            res.json(plato);
        })
        .catch((error)=> {
            res.status(500).send(error);
        })

})

platosRouter.delete('/:id', (req, res)=> {
    const id = req.params.id;
    Plato.findByIdAndDelete(id)
        .then((platoBorrado)=> {
            res.send({mensaje : `Se ha borrado correctamente el plato con id ${id}`});
        })
        .catch((error)=> {
            res.status(500).send(error);
        })
})

platosRouter.put("/:id", (req, res)=> {
    const id = req.params.id;

    const tipo = req.body.tipo;
    const nombre = req.body.nombre;
    const precio = req.body.precio;
    const esVegetariano = req.body.esVegetariano;
    const descripcion = req.body.descripcion;
    const foto = req.body.foto;

    /*const fieldsToUpdate = {};
    if(req.body.tipo != undefined) {
        fieldsToUpdate.tipo = req.body.tipo;
    }*/

    Plato.findByIdAndUpdate(id, {
        tipo: tipo,
        nombre: nombre,
        precio: precio,
        esVegetariano: esVegetariano,
        descripcion: descripcion,
        foto: foto
    })
        .then(()=> {
            return Plato.findById(id);
        })
        .then((platoActualizado)=> {
            res.send(platoActualizado);
        })
        .catch((error)=> {
            res.status(500).send(error);
        })
})

module.exports = platosRouter;
