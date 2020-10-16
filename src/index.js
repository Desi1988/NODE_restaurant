const express = require('express');
require('dotenv').config();

const pedidosRoutes = require('./routes/pedidos');
const platosRoutes = require('./routes/platos');
const homeRoutes = require('./routes/home');
const usuariosRoutes = require('./routes/usuario');
require('./db.js');

const PORT = process.env.PORT || 3000;
const server = express();
server.use(express.static('public'));

server.use(express.json());
server.use(express.urlencoded({extended: false}));

server.use('/pedidos', pedidosRoutes);
server.use('/platos', platosRoutes);
server.use('/users', usuariosRoutes)
server.use('/', homeRoutes)

server.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});
