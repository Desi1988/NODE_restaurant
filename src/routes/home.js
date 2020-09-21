const express = require('express');
const homeRouter = express.Router();

homeRouter.get('/', (req, res) => {
    res.send("Bienvenido al Restaurante.")
})
module.exports = homeRouter;
