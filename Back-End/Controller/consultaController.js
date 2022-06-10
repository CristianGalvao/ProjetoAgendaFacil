//Importando o Express
const express = require('express');

//Importando o Model da Cadastro para manipularmos
const consultaTeste = require("../Model/agendar");

const router = express.Router();

router.get('/consulta/listarConsultas', (req, res)=>{

    consultaTeste.findAll().then(
        (consulta)=>{
            res.send(consulta)
        }
    );
})

module.exports = router;