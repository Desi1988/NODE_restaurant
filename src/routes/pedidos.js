const express = require('express');
const Pedido = require('../models/Pedido');
const authenticateJWT = require('../middlewares/autentication');

const pedidosRouter = express.Router();

pedidosRouter.post('/', authenticateJWT, (req, res) => {
    const mesa = req.body.mesa;
    const comanda = req.body.comanda;
    const camarero = req.user.username;
    const estaListo = req.body.estaListo;

    const pedido = new Pedido()

    pedido.mesa = mesa;
    pedido.comanda = comanda;
    pedido.camarero = camarero;
    pedido.estaListo = estaListo;


    pedido.save()
        .then((newPedido)=> {
            res.json(newPedido);
        })
        .catch((error)=> {
            res.status(500).send(error);
        })
});

pedidosRouter.get('/', authenticateJWT, (req, res) => {
    Pedido.find({}, {__v: 0, createdAt: 0, updatedAt: 0})
        .populate('comanda')
        .exec((err, pedidos) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.send(pedidos)
            }
        })
});

pedidosRouter.get('/:id', (req, res)=> {
    const id = req.params.id;
    Pedido.findById(id, {__v: 0, updatedAt: 0, createdAt: 0})
        .populate('comanda')
        .exec((err, pedido) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.send(pedido)
            }
        })
})

pedidosRouter.get('/mesa/:mesa', (req, res)=> {
    const mesa = req.params.mesa;
    Pedido.findOne({"mesa" : mesa}, {__v: 0, updatedAt: 0, createdAt: 0})
        .populate('comanda')
        .exec((err, pedido) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.send(pedido)
            }
        })
})

pedidosRouter.delete('/:id', (req, res)=> {
    const id = req.params.id;
    Pedido.findByIdAndDelete(id)
        .then((pedidoBorrado)=> {
            res.send({mensaje : `Se ha borrado correctamente el pedido con id ${id}`});
        })
        .catch((error)=> {
            res.status(500).send(error);
        })
})

pedidosRouter.put("/:id", (req, res)=> {
    const id = req.params.id;

    const mesa = req.body.mesa;
    const comanda = req.body.comanda;
    const camarero = req.body.camarero;
    const fecha = req.body.fecha;
    const estaListo = req.body.estaListo;

    Pedido.findByIdAndUpdate(id, {
        mesa: mesa,
        //comanda: comanda,
        camarero: camarero,
        fecha: fecha,
        estaListo: estaListo
    })
        .then(()=> {
            return Pedido.findById(id);
        })
        .then((pedidoActualizado)=> {
            res.send(pedidoActualizado);
        })
        .catch((error)=> {
            res.status(500).send(error);
        })
})

module.exports = pedidosRouter;
