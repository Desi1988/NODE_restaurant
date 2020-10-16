const express = require('express');
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const authenticateJWT = require('../middlewares/autentication');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const usuarioRouter = express.Router();

usuarioRouter.post('/',  (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, function(err, hash) {
        const usuario = new Usuario()

        usuario.username = username;
        usuario.password = hash;

        usuario.save()
            .then((newUsuario)=> {
                res.json(newUsuario);
            })
            .catch((error)=> {
                res.status(500).send(error);
            })
    });
});

usuarioRouter.post('/login',  (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    Usuario.findOne({ username : username })
    .then((user) => {
        if(user)
        {
            bcrypt.compare(password, user.password, function(err, result) {
                if(result)
                {
                    const accessToken = jwt.sign(
                        { userID: user._id, username: user.username }, 
                        process.env.JWT_SECRET);
                    
                    return res.json({ logged : true, token: accessToken})
                }
                else
                {
                    return res.status(404).json({ logged : false})
                }
            });
        }
        else
        {
            return res.status(404).json({ logged : false})
        }
    })
    .catch((err)=>{
        return res.status(404).json({ logged : false})
    })
});

usuarioRouter.get('/logout', authenticateJWT, (req, res)=> {

    const userData = req.user

    res.json({ loggedout : true, goodBye: userData.username})
})


module.exports = usuarioRouter;
